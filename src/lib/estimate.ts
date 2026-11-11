import { TY2026 } from "../data/taxYear2026";
import { reliefAvailableInYear } from "../data/yearAvailability";
import type {
  ChecklistAnswers,
  EstimateAmounts,
  PersonalStatus,
  ReliefId,
  TaxYear,
} from "./types";

export type ReliefLine = {
  id: ReliefId;
  label: string;
  amount: number;
  note?: string;
};

export type EstimateResult = {
  lines: ReliefLine[];
  extraReliefTotal: number;
  marginalRate: number;
  bandUsed: number;
  incomeTaxSketch: number | null;
  indicativeRefund: number | null;
  assumptions: string[];
};

function euro(n: number) {
  return Math.max(0, Math.round(n * 100) / 100);
}

function statusBand(status: PersonalStatus | undefined): number {
  switch (status) {
    case "lone_parent":
      return TY2026.bandLoneParent;
    case "married_joint":
      return TY2026.bandMarriedOneIncome;
    default:
      return TY2026.bandSingle;
  }
}

function marginalRate(gross: number, band: number): number {
  return gross > band ? TY2026.higherRate : TY2026.standardRate;
}

function personalCredit(status: PersonalStatus | undefined): number {
  if (status === "married_joint") return TY2026.creditMarriedPersonal;
  return TY2026.creditSinglePersonal;
}

export function runEstimate(
  selected: ReliefId[],
  answers: ChecklistAnswers,
  amounts: EstimateAmounts,
  taxYear: TaxYear = 2026,
): EstimateResult {
  const status = answers.q_status;
  const band = statusBand(status);
  const gross = amounts.grossPay ?? 0;
  const rate = marginalRate(gross || band + 1, band);
  const active = selected.filter((id) => reliefAvailableInYear(id, taxYear));
  const lines: ReliefLine[] = [];
  const assumptions: string[] = [
    `Using TY ${TY2026.label} rates and credits (selected year TY ${taxYear}).`,
    `Assumed standard rate band ≈ €${band.toLocaleString("en-IE")} for your status (simplified).`,
    `Marginal rate used for rate-sensitive reliefs: ${(rate * 100).toFixed(0)}%.`,
    "Does not model BIK, pension relief, emergency tax, or full jointly-assessed splits.",
    "Remote working relief (current statutory formula) applies from tax year 2022.",
  ];

  if (active.includes("rent_tax_credit") && (amounts.rentPaidYear ?? 0) > 0) {
    const max =
      status === "married_joint" ? TY2026.rentCreditMaxJoint : TY2026.rentCreditMaxSingle;
    const credit = Math.min((amounts.rentPaidYear ?? 0) * TY2026.rentCreditRate, max);
    lines.push({
      id: "rent_tax_credit",
      label: "Rent tax credit",
      amount: euro(credit),
      note: `Capped at €${max.toLocaleString("en-IE")}`,
    });
  }

  if (active.includes("health_expenses") && (amounts.healthNetPaid ?? 0) > 0) {
    lines.push({
      id: "health_expenses",
      label: "Health expenses relief (20%)",
      amount: euro((amounts.healthNetPaid ?? 0) * TY2026.healthReliefRate),
    });
  }

  if (active.includes("nursing_home") && (amounts.nursingHomeNetPaid ?? 0) > 0) {
    lines.push({
      id: "nursing_home",
      label: "Nursing home relief",
      amount: euro((amounts.nursingHomeNetPaid ?? 0) * rate),
      note: `At ${(rate * 100).toFixed(0)}%`,
    });
  }

  if (active.includes("remote_working") && (amounts.utilityBillsYear ?? 0) > 0) {
    const A = amounts.utilityBillsYear ?? 0;
    const B = amounts.remoteDays ?? 0;
    const C = TY2026.daysInYear;
    const D = amounts.employerWfhPay ?? 0;
    const allowable = Math.max(0, ((A * B) / C - D) * TY2026.wfhAllowablePct);
    lines.push({
      id: "remote_working",
      label: "Remote working relief",
      amount: euro(allowable * rate),
      note: `Allowable cost ≈ €${euro(allowable).toLocaleString("en-IE")} · ${B} remote days · employer allowance €${euro(D).toLocaleString("en-IE")}`,
    });
  }

  if (active.includes("flat_rate_expense") && (amounts.freAmount ?? 0) > 0) {
    lines.push({
      id: "flat_rate_expense",
      label: "Flat-rate expense (indicative)",
      amount: euro((amounts.freAmount ?? 0) * rate),
      note: amounts.freOccupation || undefined,
    });
  }

  if (active.includes("mortgage_interest_credit") && (amounts.mortgageInterestPaid ?? 0) > 0) {
    const credit = Math.min(
      amounts.mortgageInterestPaid ?? 0,
      TY2026.mortgageInterestCreditMax,
    );
    lines.push({
      id: "mortgage_interest_credit",
      label: "Mortgage interest credit (max-aware)",
      amount: euro(credit),
      note: "Eligibility conditions not verified by this tool",
    });
  }

  if (active.includes("home_carer_credit")) {
    const income = amounts.homeCarerIncome ?? 0;
    let credit: number = TY2026.homeCarerCreditMax;
    if (income > 7200) {
      // Simplified taper message — full taper is complex
      credit = Math.max(0, TY2026.homeCarerCreditMax - (income - 7200) * 0.5);
    }
    lines.push({
      id: "home_carer_credit",
      label: "Home carer credit (simplified)",
      amount: euro(Math.min(credit, TY2026.homeCarerCreditMax)),
      note: "Taper simplified — confirm on Revenue",
    });
  }

  if (active.includes("age_credit")) {
    const credit =
      status === "married_joint" ? TY2026.ageCreditMarried : TY2026.ageCreditSingle;
    lines.push({ id: "age_credit", label: "Age tax credit", amount: euro(credit) });
  }

  if (active.includes("incapacitated_child_credit")) {
    const n = Math.max(1, amounts.incapChildCount ?? 1);
    lines.push({
      id: "incapacitated_child_credit",
      label: "Incapacitated child credit",
      amount: euro(n * TY2026.incapChildCredit),
    });
  }

  if (active.includes("dependent_relative_credit")) {
    const n = Math.max(1, amounts.depRelativeCount ?? 1);
    lines.push({
      id: "dependent_relative_credit",
      label: "Dependent relative credit",
      amount: euro(n * TY2026.depRelativeCredit),
      note: `Relative income limit €${TY2026.depRelativeIncomeLimit.toLocaleString("en-IE")}`,
    });
  }

  const extraReliefTotal = euro(lines.reduce((s, l) => s + l.amount, 0));

  let incomeTaxSketch: number | null = null;
  let indicativeRefund: number | null = null;

  if (gross > 0) {
    const freDeduction = active.includes("flat_rate_expense") ? amounts.freAmount ?? 0 : 0;
    const taxable = Math.max(0, gross - freDeduction);
    const at20 = Math.min(taxable, band) * TY2026.standardRate;
    const at40 = Math.max(0, taxable - band) * TY2026.higherRate;
    const credits =
      personalCredit(status) +
      TY2026.creditEmployeePAYE +
      lines
        .filter((l) =>
          [
            "rent_tax_credit",
            "age_credit",
            "home_carer_credit",
            "incapacitated_child_credit",
            "dependent_relative_credit",
            "mortgage_interest_credit",
          ].includes(l.id),
        )
        .reduce((s, l) => s + l.amount, 0);
    const reliefAsTaxReduce = lines
      .filter((l) =>
        ["health_expenses", "nursing_home", "remote_working", "flat_rate_expense"].includes(
          l.id,
        ),
      )
      .reduce((s, l) => s + l.amount, 0);

    incomeTaxSketch = euro(Math.max(0, at20 + at40 - credits - reliefAsTaxReduce));
    assumptions.push(
      "Full-year sketch assumes personal + PAYE credits already apply, then layers your selected extras.",
    );

    if (typeof amounts.taxPaid === "number") {
      indicativeRefund = euro(Math.max(0, amounts.taxPaid - incomeTaxSketch));
    }
  }

  return {
    lines,
    extraReliefTotal,
    marginalRate: rate,
    bandUsed: band,
    incomeTaxSketch,
    indicativeRefund,
    assumptions,
  };
}

export function claimModeForYear(year: number): "priorYear" | "inYear" {
  return year >= 2026 ? "inYear" : "priorYear";
}

export function formatEuro(n: number) {
  return n.toLocaleString("en-IE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  });
}
