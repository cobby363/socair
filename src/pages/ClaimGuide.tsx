import { Link, useParams } from "react-router-dom";
import { PageTransition } from "../components/PageTransition";
import { useAppState } from "../context/AppState";
import { CLAIM_GUIDES } from "../data/claimGuides";
import { RELIEF_BY_ID, RELIEFS } from "../data/reliefs";
import { reliefAvailableInYear } from "../data/yearAvailability";
import { claimModeForYear } from "../lib/estimate";
import type { ReliefId } from "../lib/types";

export function ClaimGuide() {
  const { reliefId } = useParams();
  const { state, setStepTick } = useAppState();
  const mode = claimModeForYear(state.taxYear);

  const orderedSelected = RELIEFS.filter(
    (r) =>
      state.selectedReliefIds.includes(r.id) &&
      reliefAvailableInYear(r.id, state.taxYear),
  ).sort((a, b) => a.claimOrder - b.claimOrder);

  const focusId = (reliefId as ReliefId) || orderedSelected[0]?.id;
  const focus = focusId ? RELIEF_BY_ID[focusId] : undefined;
  const guide = focusId ? CLAIM_GUIDES[focusId] : undefined;
  const steps = guide
    ? mode === "inYear"
      ? guide.stepsInYear
      : guide.stepsPrior
    : [];

  const available = RELIEFS.filter((r) =>
    reliefAvailableInYear(r.id, state.taxYear),
  ).sort((a, b) => a.claimOrder - b.claimOrder);
  const others = available.filter((r) => r.id !== focusId);
  const browseOnly = !reliefId && orderedSelected.length === 0;

  return (
    <PageTransition>
      <section className="panel stack stack-lg">
        <div className="stack">
          <div className="eyebrow">
            Claim guides · {state.taxYear} ·{" "}
            {mode === "inYear" ? "in-year path" : "prior-year path"}
          </div>
          <h1 style={{ fontSize: "clamp(1.6rem, 4vw, 2.2rem)" }}>
            {browseOnly
              ? "Claim guides"
              : (guide?.title ?? focus?.title ?? "How to claim")}
          </h1>
          {browseOnly ? (
            <p className="lede">
              Step-by-step myAccount paths for common PAYE reliefs — no checklist
              needed. Pick a guide below.
            </p>
          ) : (
            guide && <p className="lede">{guide.overview}</p>
          )}
        </div>

        {browseOnly && (
          <div className="card-list">
            {available.map((r) => (
              <Link key={r.id} to={`/claim/${r.id}`} className="relief-card">
                <h3>{r.title}</h3>
                <p className="small muted">{r.oneLiner}</p>
              </Link>
            ))}
          </div>
        )}

        {orderedSelected.length > 0 && (
          <div className="row" style={{ flexWrap: "wrap" }}>
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

        {guide && !browseOnly && (
          <>
            <div className="stack">
              <h2 style={{ fontSize: "1.15rem" }}>Who this is for</h2>
              <ul className="muted small">
                {guide.eligibility.map((n) => (
                  <li key={n}>{n}</li>
                ))}
              </ul>
            </div>

            <div className="stack">
              <h2 style={{ fontSize: "1.15rem" }}>What you’ll need</h2>
              <ul className="muted small">
                {guide.need.map((n) => (
                  <li key={n}>{n}</li>
                ))}
              </ul>
            </div>

            {guide.tips.length > 0 && (
              <div className="disclaimer">
                <strong>Before you start: </strong>
                {guide.tips.join(" ")}
              </div>
            )}

            <div className="stack">
              <h2 style={{ fontSize: "1.15rem" }}>
                Steps ({mode === "inYear" ? "current year" : "prior year"})
              </h2>
              <p className="small muted">
                Mark each step when you’ve done it — tap again to undo if you need
                to revisit.
              </p>
              <ol className="steps">
                {steps.map((step, i) => {
                  const key = `${focusId}:${i}`;
                  const done = !!state.stepTicks[key];
                  return (
                    <li key={key} className={done ? "step-done" : undefined}>
                      <div className="stack" style={{ gap: "0.5rem" }}>
                        <div>
                          <strong>{step.title}</strong>
                          <p className="small muted" style={{ marginTop: "0.25rem" }}>
                            {step.detail}
                          </p>
                        </div>
                        {step.image && (
                          <figure className="step-shot">
                            <img
                              src={step.image.src}
                              alt={step.image.caption}
                              loading="lazy"
                            />
                            <figcaption>{step.image.caption}</figcaption>
                          </figure>
                        )}
                      </div>
                      <button
                        type="button"
                        className={`btn step-toggle ${done ? "step-toggle-done" : "btn-ghost"}`}
                        onClick={() => setStepTick(key, !done)}
                        aria-pressed={done}
                      >
                        {done ? "✓ Done — undo" : "Mark done"}
                      </button>
                    </li>
                  );
                })}
              </ol>
            </div>

            <p className="small">
              Official reference:{" "}
              <a href="https://www.revenue.ie" target="_blank" rel="noreferrer">
                {guide.officialPath}
              </a>
            </p>
          </>
        )}

        {!browseOnly && others.length > 0 && (
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
        )}

        <div className="row" style={{ flexWrap: "wrap" }}>
          {browseOnly ? (
            <Link className="btn btn-ghost" to="/">
              Home
            </Link>
          ) : (
            <Link className="btn btn-secondary" to="/results">
              Back to results
            </Link>
          )}
          <Link className="btn btn-primary" to="/estimate">
            Estimate tax back
          </Link>
          {!browseOnly && (
            <Link className="btn btn-ghost" to="/claim">
              All guides
            </Link>
          )}
        </div>
      </section>
    </PageTransition>
  );
}
