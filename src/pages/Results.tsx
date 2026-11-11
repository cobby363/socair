import { Link, useNavigate } from "react-router-dom";
import { PageTransition } from "../components/PageTransition";
import { Disclaimer } from "../components/Disclaimer";
import { useAppState } from "../context/AppState";
import { RELIEFS } from "../data/reliefs";

export function Results() {
  const { state, toggleRelief } = useAppState();
  const navigate = useNavigate();

  const selected = RELIEFS.filter((r) => state.selectedReliefIds.includes(r.id)).sort(
    (a, b) => a.claimOrder - b.claimOrder,
  );
  const other = RELIEFS.filter((r) => !state.selectedReliefIds.includes(r.id));

  return (
    <PageTransition>
      <section className="panel stack stack-lg">
        <div>
          <div className="eyebrow">Your results · TY {state.taxYear}</div>
          <h1 style={{ fontSize: "clamp(1.7rem, 4vw, 2.35rem)" }}>
            Based on your answers, check these first
          </h1>
          <p className="lead" style={{ marginTop: "0.55rem" }}>
            You can edit the list, open claim guides, or run an indicative estimate.
          </p>
        </div>

        <Disclaimer />

        <div className="card-list">
          {selected.length === 0 && (
            <p className="muted">
              No strong matches yet. Open “Other guides” below or{" "}
              <Link to="/checklist">edit your answers</Link>.
            </p>
          )}
          {selected.map((r) => (
            <article key={r.id} className="relief-card">
              <h3>{r.title}</h3>
              <p className="small muted">{r.oneLiner}</p>
              <div className="row" style={{ marginTop: "0.45rem" }}>
                <Link className="btn btn-secondary" to={`/claim/${r.id}`}>
                  Claim guide
                </Link>
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={() => toggleRelief(r.id)}
                >
                  Remove
                </button>
              </div>
            </article>
          ))}
        </div>

        <details className="other-guides">
          <summary>Other guides (usually not for you)</summary>
          <div className="card-list" style={{ marginTop: "0.85rem" }}>
            {other.map((r) => (
              <article key={r.id} className="relief-card">
                <h3>{r.title}</h3>
                <p className="small muted">{r.oneLiner}</p>
                <div className="row" style={{ marginTop: "0.45rem" }}>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => toggleRelief(r.id)}
                  >
                    Add to my list
                  </button>
                  <Link className="btn btn-ghost" to={`/claim/${r.id}`}>
                    View guide
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </details>

        <div className="row">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => navigate("/estimate")}
            disabled={selected.length === 0}
          >
            Estimate tax back
          </button>
          <Link className="btn btn-secondary" to="/claim">
            How to claim selected
          </Link>
          <Link className="btn btn-ghost" to="/checklist">
            Edit answers
          </Link>
        </div>
      </section>
    </PageTransition>
  );
}
