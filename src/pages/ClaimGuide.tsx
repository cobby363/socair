import { Link, useParams } from "react-router-dom";
import { PageTransition } from "../components/PageTransition";
import { useAppState } from "../context/AppState";
import { CLAIM_STEPS, RELIEF_BY_ID, RELIEFS } from "../data/reliefs";
import { claimModeForYear } from "../lib/estimate";
import type { ReliefId } from "../lib/types";

export function ClaimGuide() {
  const { reliefId } = useParams();
  const { state, setStepTick } = useAppState();
  const mode = claimModeForYear(state.taxYear);

  const orderedSelected = RELIEFS.filter((r) =>
    state.selectedReliefIds.includes(r.id),
  ).sort((a, b) => a.claimOrder - b.claimOrder);

  const focusId = (reliefId as ReliefId) || orderedSelected[0]?.id;
  const focus = focusId ? RELIEF_BY_ID[focusId] : undefined;
  const guide = focusId ? CLAIM_STEPS[focusId] : undefined;
  const steps = guide
    ? mode === "inYear"
      ? guide.stepsInYear
      : guide.stepsPrior
    : [];

  const others = RELIEFS.filter((r) => r.id !== focusId);

  return (
    <PageTransition>
      <section className="panel stack stack-lg">
        <div>
          <div className="eyebrow">
            Claim guides · {state.taxYear} ·{" "}
            {mode === "inYear" ? "in-year path" : "prior-year path"}
          </div>
          <h1 style={{ fontSize: "clamp(1.6rem, 4vw, 2.2rem)" }}>
            {focus?.title ?? "How to claim"}
          </h1>
          <p className="lead" style={{ marginTop: "0.5rem" }}>
            Selected items stay pinned. Screenshots below are illustrative
            placeholders of the myAccount journey.
          </p>
        </div>

        {orderedSelected.length > 0 && (
          <div className="row">
            {orderedSelected.map((r) => (
              <Link
                key={r.id}
                className={`btn ${r.id === focusId ? "btn-primary" : "btn-secondary"}`}
                to={`/claim/${r.id}`}
              >
                {r.title}
              </Link>
            ))}
          </div>
        )}

        {guide && (
          <>
            <div>
              <h2 style={{ fontSize: "1.2rem", marginBottom: "0.55rem" }}>
                What you’ll need
              </h2>
              <ul className="muted small">
                {guide.need.map((n) => (
                  <li key={n}>{n}</li>
                ))}
              </ul>
            </div>

            <ol className="steps">
              {steps.map((step, i) => {
                const key = `${focusId}:${i}`;
                const done = !!state.stepTicks[key];
                return (
                  <li key={key}>
                    <div>
                      <div>{step}</div>
                      {i === 0 && (
                        <div className="shot">
                          Illustration: myAccount home → PAYE Services card
                          highlighted. (Replace with real cropped screenshots
                          before launch.)
                        </div>
                      )}
                    </div>
                    <button
                      type="button"
                      className="btn btn-ghost"
                      onClick={() => setStepTick(key, !done)}
                    >
                      {done ? "Done" : "Mark done"}
                    </button>
                  </li>
                );
              })}
            </ol>

            <p className="small">
              Official reference:{" "}
              <a href="https://www.revenue.ie" target="_blank" rel="noreferrer">
                revenue.ie
              </a>
            </p>
          </>
        )}

        <details className="other-guides">
          <summary>Other claim guides</summary>
          <div className="card-list" style={{ marginTop: "0.75rem" }}>
            {others.map((r) => (
              <Link key={r.id} to={`/claim/${r.id}`} className="relief-card">
                <h3>{r.title}</h3>
                <p className="small muted">{r.oneLiner}</p>
              </Link>
            ))}
          </div>
        </details>

        <div className="row">
          <Link className="btn btn-secondary" to="/results">
            Back to results
          </Link>
          <Link className="btn btn-primary" to="/estimate">
            Estimate tax back
          </Link>
        </div>
      </section>
    </PageTransition>
  );
}
