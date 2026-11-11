import { useNavigate } from "react-router-dom";
import { PageTransition } from "../components/PageTransition";
import { useAppState } from "../context/AppState";
import type { TaxYear } from "../lib/types";

const YEARS: { year: TaxYear; blurb: string }[] = [
  { year: 2026, blurb: "Current year — real-time credits path (default)" },
  { year: 2025, blurb: "Last closed year — common for reviews" },
  { year: 2024, blurb: "Still within the 4-year window" },
  { year: 2023, blurb: "Prior year claim" },
  { year: 2022, blurb: "Last year still claimable in many cases" },
];

export function TaxYearPage() {
  const { state, setTaxYear } = useAppState();
  const navigate = useNavigate();

  return (
    <PageTransition>
      <section className="panel stack stack-lg">
        <div>
          <div className="eyebrow">Step 1</div>
          <h1 style={{ fontSize: "clamp(1.7rem, 4vw, 2.3rem)" }}>Pick a tax year</h1>
          <p className="lead" style={{ marginTop: "0.6rem" }}>
            You can usually review the previous four years. Guides change slightly
            for in-year (2026) vs prior-year returns.
          </p>
        </div>

        <div className="year-grid">
          {YEARS.map((y) => (
            <button
              key={y.year}
              type="button"
              className={`year-card ${state.taxYear === y.year ? "active" : ""}`}
              onClick={() => setTaxYear(y.year)}
            >
              <strong>{y.year}</strong>
              <span className="small muted">{y.blurb}</span>
            </button>
          ))}
        </div>

        <div className="row">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => navigate("/checklist")}
          >
            Continue to checklist
          </button>
          <button type="button" className="btn btn-ghost" onClick={() => navigate("/")}>
            Back
          </button>
        </div>
      </section>
    </PageTransition>
  );
}
