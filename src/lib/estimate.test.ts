import { describe, expect, it } from "vitest";
import { TY2026 } from "../data/taxYear2026";
import { claimModeForYear, runEstimate } from "./estimate";
import type { ChecklistAnswers } from "./types";

const single: ChecklistAnswers = { q_status: "single" };
const marriedJoint: ChecklistAnswers = { q_status: "married_joint" };

/** Round like the engine (2 dp euros). */
function euro(n: number) {
  return Math.max(0, Math.round(n * 100) / 100);
}

describe("runEstimate golden cases", () => {
  it("single 20% earner: health expenses only = 20% of net spend", () => {
    const healthNetPaid = 1000;
    const result = runEstimate(["health_expenses"], single, {
      grossPay: 35_000,
      healthNetPaid,
    });

    expect(result.marginalRate).toBe(0.2);
    expect(result.bandUsed).toBe(TY2026.bandSingle);
    expect(result.lines).toHaveLength(1);
    expect(result.lines[0]).toMatchObject({
      id: "health_expenses",
      amount: 200,
    });
    expect(result.extraReliefTotal).toBe(200);
  });

  it("higher-rate earner: remote working uses Revenue-style formula × 40%", () => {
    const utilityBillsYear = 2400;
    const remoteDays = 100;
    const employerWfhPay = 0;
    const allowable = euro(
      ((utilityBillsYear * remoteDays) / TY2026.daysInYear - employerWfhPay) *
        TY2026.wfhAllowablePct,
    );
    const expectedTaxValue = euro(allowable * TY2026.higherRate);

    const result = runEstimate(["remote_working"], single, {
      grossPay: 60_000,
      utilityBillsYear,
      remoteDays,
      employerWfhPay,
    });

    expect(result.marginalRate).toBe(0.4);
    expect(result.lines).toHaveLength(1);
    expect(result.lines[0].id).toBe("remote_working");
    expect(result.lines[0].amount).toBe(expectedTaxValue);
    expect(result.extraReliefTotal).toBe(expectedTaxValue);
    // Hand check: ((2400×100)/365)×0.3 ≈ 197.26 → ×40% ≈ 78.90
    expect(result.lines[0].amount).toBe(78.9);
  });

  it("rent credit caps at €1,000 single; FRE tax value at marginal rate", () => {
    const result = runEstimate(
      ["rent_tax_credit", "flat_rate_expense"],
      single,
      {
        grossPay: 40_000,
        rentPaidYear: 6_000, // 20% = 1200 → capped at 1000
        freAmount: 733,
        freOccupation: "Nurse / Midwife (general)",
      },
    );

    const rent = result.lines.find((l) => l.id === "rent_tax_credit");
    const fre = result.lines.find((l) => l.id === "flat_rate_expense");

    expect(rent?.amount).toBe(1000);
    expect(fre?.amount).toBe(euro(733 * 0.2)); // 146.6
    expect(result.extraReliefTotal).toBe(euro(1000 + 146.6));
    expect(result.marginalRate).toBe(0.2);
  });

  it("joint rent cap is €2,000", () => {
    const result = runEstimate(["rent_tax_credit"], marriedJoint, {
      grossPay: 50_000,
      rentPaidYear: 12_000,
    });

    expect(result.lines[0].amount).toBe(TY2026.rentCreditMaxJoint);
    expect(result.bandUsed).toBe(TY2026.bandMarriedOneIncome);
  });

  it("expected refund ≈ tax paid − simplified tax-due sketch", () => {
    // Sketch: gross 35k, single band, personal+PAYE credits, health relief 200
    // at20 = 35000*0.2 = 7000
    // credits = 2000 + 2000 = 4000
    // sketch = 7000 - 4000 - 200 = 2800
    // taxPaid 3500 → refund 700
    const result = runEstimate(["health_expenses"], single, {
      grossPay: 35_000,
      taxPaid: 3_500,
      healthNetPaid: 1_000,
    });

    expect(result.incomeTaxSketch).toBe(2800);
    expect(result.indicativeRefund).toBe(700);
  });

  it("no taxPaid → no indicative refund; extras still calculated", () => {
    const result = runEstimate(["health_expenses"], single, {
      grossPay: 35_000,
      healthNetPaid: 500,
    });

    expect(result.extraReliefTotal).toBe(100);
    expect(result.indicativeRefund).toBeNull();
    expect(result.incomeTaxSketch).not.toBeNull();
  });

  it("age credit amounts follow status", () => {
    const singleAge = runEstimate(["age_credit"], single, { grossPay: 30_000 });
    const jointAge = runEstimate(["age_credit"], marriedJoint, {
      grossPay: 30_000,
    });

    expect(singleAge.lines[0].amount).toBe(TY2026.ageCreditSingle);
    expect(jointAge.lines[0].amount).toBe(TY2026.ageCreditMarried);
  });
});

describe("claimModeForYear", () => {
  it("treats 2026 as in-year and earlier years as prior-year", () => {
    expect(claimModeForYear(2026)).toBe("inYear");
    expect(claimModeForYear(2025)).toBe("priorYear");
    expect(claimModeForYear(2022)).toBe("priorYear");
  });
});

describe("remote working year gate", () => {
  it("still calculates remote working for TY 2022+ (statutory formula years)", () => {
    const result = runEstimate(
      ["remote_working"],
      single,
      { grossPay: 40_000, utilityBillsYear: 2400, remoteDays: 100, employerWfhPay: 0 },
      2022,
    );
    expect(result.lines.some((l) => l.id === "remote_working")).toBe(true);
  });
});
