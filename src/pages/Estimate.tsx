import { FormEvent, ReactNode, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PageTransition } from "../components/PageTransition";
import { InfoPanel } from "../components/InfoPanel";
import { MoneyInput, CountInput } from "../components/MoneyInput";
import { useAppState } from "../context/AppState";
import { RELIEF_BY_ID } from "../data/reliefs";
import { FRE_PRESETS } from "../data/taxYear2026";
import {
  ESTIMATE_FIELD_HELP,
  type EstimateFieldId,
} from "../data/estimateFieldHelp";
import { formatEuro, runEstimate } from "../lib/estimate";

function FieldWithHelp({
  fieldId,
  label,
  children,
  onExplain,
}: {
  fieldId: EstimateFieldId;
  label: string;
  children: ReactNode;
  onExplain: (id: EstimateFieldId) => void;
}) {
  const help = ESTIMATE_FIELD_HELP[fieldId];
  return (
    <div className="field">
      <div className="field-label-row">
        <label htmlFor={fieldId}>{label}</label>
        <button
          type="button"
          className="btn btn-ghost explain-btn"
          onClick={() => onExplain(fieldId)}
          aria-label={`Explain ${help.title}`}
        >
          Explain
        </button>
      </div>
      {children}
    </div>
  );
}

export function Estimate() {
  const { state, amounts, setAmounts } = useAppState();
  const navigate = useNavigate();
  const selected = state.selectedReliefIds;
  const [openField, setOpenField] = useState<EstimateFieldId | null>(null);

  const result = useMemo(
    () => runEstimate(selected, state.answers, amounts),
    [selected, state.answers, amounts],
  );

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    navigate("/estimate/results");
  };

  const openExplain = (id: EstimateFieldId) => setOpenField(id);
  const helpContent = openField ? ESTIMATE_FIELD_HELP[openField] : null;

  return (
    <PageTransition>
      <section className="panel stack stack-lg">
        <div className="stack">
          <div className="eyebrow">Estimate · TY{state.taxYear}</div>
          <h1>Enter amounts</h1>
          <p className="lede">
            Use each <strong>Explain</strong> button for what to include and where
            to find the figure on Revenue. Nothing leaves this device. Euro
            amounts accept cents (e.g. 1234.56).
          </p>
          <p className="disclaimer">
            <strong>Enter annual totals for tax year {state.taxYear}</strong>
            — year figures from Employment Detail Summary or statements where
            you can.
          </p>
        </div>

        <form className="stack stack-lg" onSubmit={onSubmit}>
          <FieldWithHelp
            fieldId="grossPay"
            label="Annual gross pay from employment (€)"
            onExplain={openExplain}
          >
            <MoneyInput
              id="grossPay"
              value={amounts.grossPay}
              onValueChange={(n) => setAmounts({ grossPay: n })}
            />
          </FieldWithHelp>

          <FieldWithHelp
            fieldId="taxPaid"
            label="Annual income tax already paid (€) — optional"
            onExplain={openExplain}
          >
            <MoneyInput
              id="taxPaid"
              value={amounts.taxPaid}
              onValueChange={(n) => setAmounts({ taxPaid: n })}
            />
            <p className="tiny muted">
              Income tax only — not USC, PRSI, or pension. Tap Explain for the
              full breakdown.
            </p>
          </FieldWithHelp>

          {selected.includes("rent_tax_credit") && (
            <FieldWithHelp
              fieldId="rentPaidYear"
              label="Annual qualifying rent paid (€)"
              onExplain={openExplain}
            >
              <MoneyInput
                id="rentPaidYear"
                value={amounts.rentPaidYear}
                onValueChange={(n) => setAmounts({ rentPaidYear: n })}
              />
            </FieldWithHelp>
          )}

          {selected.includes("health_expenses") && (
            <fieldset className="stack" style={{ border: 0, padding: 0 }}>
              <h2 style={{ fontSize: "1.15rem" }}>
                {RELIEF_BY_ID.health_expenses.title}
              </h2>
              <FieldWithHelp
                fieldId="healthNetPaid"
                label="Annual net health spend after reclaim (€)"
                onExplain={openExplain}
              >
                <MoneyInput
                  id="healthNetPaid"
                  value={amounts.healthNetPaid}
                  onValueChange={(n) => setAmounts({ healthNetPaid: n })}
                />
              </FieldWithHelp>
            </fieldset>
          )}

          {selected.includes("nursing_home") && (
            <fieldset className="stack" style={{ border: 0, padding: 0 }}>
              <h2 style={{ fontSize: "1.15rem" }}>
                {RELIEF_BY_ID.nursing_home.title}
              </h2>
              <FieldWithHelp
                fieldId="nursingHomeNetPaid"
                label="Annual net nursing home fees (€)"
                onExplain={openExplain}
              >
                <MoneyInput
                  id="nursingHomeNetPaid"
                  value={amounts.nursingHomeNetPaid}
                  onValueChange={(n) => setAmounts({ nursingHomeNetPaid: n })}
                />
              </FieldWithHelp>
            </fieldset>
          )}

          {selected.includes("remote_working") && (
            <fieldset className="stack" style={{ border: 0, padding: 0 }}>
              <h2 style={{ fontSize: "1.15rem" }}>
                {RELIEF_BY_ID.remote_working.title}
              </h2>
              <FieldWithHelp
                fieldId="utilityBillsYear"
                label="Annual electricity + heating + broadband (€)"
                onExplain={openExplain}
              >
                <MoneyInput
                  id="utilityBillsYear"
                  value={amounts.utilityBillsYear}
                  onValueChange={(n) => setAmounts({ utilityBillsYear: n })}
                />
              </FieldWithHelp>
              <FieldWithHelp
                fieldId="remoteDays"
                label="Remote working days in the tax year"
                onExplain={openExplain}
              >
                <CountInput
                  id="remoteDays"
                  value={amounts.remoteDays}
                  onValueChange={(n) => setAmounts({ remoteDays: n })}
                />
              </FieldWithHelp>
              <FieldWithHelp
                fieldId="employerWfhPay"
                label="Annual employer remote-working allowance (€)"
                onExplain={openExplain}
              >
                <MoneyInput
                  id="employerWfhPay"
                  value={amounts.employerWfhPay}
                  onValueChange={(n) => setAmounts({ employerWfhPay: n })}
                />
              </FieldWithHelp>
            </fieldset>
          )}

          {selected.includes("flat_rate_expense") && (
            <fieldset className="stack" style={{ border: 0, padding: 0 }}>
              <h2 style={{ fontSize: "1.15rem" }}>
                {RELIEF_BY_ID.flat_rate_expense.title}
              </h2>
              <FieldWithHelp
                fieldId="freOccupation"
                label="Occupation preset"
                onExplain={openExplain}
              >
                <select
                  id="freOccupation"
                  value={amounts.freOccupation ?? ""}
                  onChange={(e) => {
                    const preset = FRE_PRESETS.find(
                      (p) => p.label === e.target.value,
                    );
                    setAmounts({
                      freOccupation: e.target.value,
                      freAmount: preset?.amount || amounts.freAmount,
                    });
                  }}
                >
                  <option value="">Choose an example…</option>
                  {FRE_PRESETS.map((p) => (
                    <option key={p.label} value={p.label}>
                      {p.label}
                      {p.amount ? ` (€${p.amount})` : ""}
                    </option>
                  ))}
                </select>
              </FieldWithHelp>
              <FieldWithHelp
                fieldId="freAmount"
                label="Annual FRE amount (€)"
                onExplain={openExplain}
              >
                <MoneyInput
                  id="freAmount"
                  value={amounts.freAmount}
                  onValueChange={(n) => setAmounts({ freAmount: n })}
                />
              </FieldWithHelp>
            </fieldset>
          )}

          {selected.includes("mortgage_interest_credit") && (
            <FieldWithHelp
              fieldId="mortgageInterestPaid"
              label="Annual qualifying mortgage interest (€)"
              onExplain={openExplain}
            >
              <MoneyInput
                id="mortgageInterestPaid"
                value={amounts.mortgageInterestPaid}
                onValueChange={(n) => setAmounts({ mortgageInterestPaid: n })}
              />
            </FieldWithHelp>
          )}

          {selected.includes("home_carer_credit") && (
            <FieldWithHelp
              fieldId="homeCarerIncome"
              label="Annual home carer’s income (€)"
              onExplain={openExplain}
            >
              <MoneyInput
                id="homeCarerIncome"
                value={amounts.homeCarerIncome}
                onValueChange={(n) => setAmounts({ homeCarerIncome: n })}
              />
            </FieldWithHelp>
          )}

          {selected.includes("incapacitated_child_credit") && (
            <FieldWithHelp
              fieldId="incapChildCount"
              label="Number of qualifying children"
              onExplain={openExplain}
            >
              <CountInput
                id="incapChildCount"
                value={amounts.incapChildCount}
                onValueChange={(n) => setAmounts({ incapChildCount: n })}
              />
            </FieldWithHelp>
          )}

          {selected.includes("dependent_relative_credit") && (
            <FieldWithHelp
              fieldId="depRelativeCount"
              label="Number of dependent relatives"
              onExplain={openExplain}
            >
              <CountInput
                id="depRelativeCount"
                value={amounts.depRelativeCount}
                onValueChange={(n) => setAmounts({ depRelativeCount: n })}
              />
            </FieldWithHelp>
          )}

          <label className="row small" style={{ gap: "0.5rem" }}>
            <input
              type="checkbox"
              checked={!!amounts.rememberAmounts}
              onChange={(e) => setAmounts({ rememberAmounts: e.target.checked })}
            />
            Remember these figures on this device until I clear them
          </label>

          <p className="tiny muted">
            Live preview of extra relief value:{" "}
            <strong>{formatEuro(result.extraReliefTotal)}</strong>
          </p>

          <div className="row">
            <button type="submit" className="btn btn-primary">
              See full estimate
            </button>
            <Link className="btn btn-ghost" to="/results">
              Back
            </Link>
          </div>
        </form>
      </section>

      <InfoPanel
        open={openField !== null}
        onClose={() => setOpenField(null)}
        content={helpContent}
      />
    </PageTransition>
  );
}
