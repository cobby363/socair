import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { PageTransition } from "../components/PageTransition";
import { Disclaimer } from "../components/Disclaimer";
import { InfoPanel } from "../components/InfoPanel";
import { useAppState } from "../context/AppState";
import { RELIEF_BY_ID, RELIEFS } from "../data/reliefs";
import { RESULT_METRIC_HELP } from "../data/estimateResultHelp";
import type { HelpContent } from "../data/questions";
import { formatEuro, runEstimate } from "../lib/estimate";
import type { ReliefId } from "../lib/types";

type MetricKey = keyof typeof RESULT_METRIC_HELP;

export function EstimateResults() {
  const { state, amounts } = useAppState();
  const result = runEstimate(state.selectedReliefIds, state.answers, amounts);
  const [openMetric, setOpenMetric] = useState<MetricKey | null>(null);

  const calculatedIds = new Set(result.lines.map((l) => l.id));
  const selectedReliefs = RELIEFS.filter((r) =>
    state.selectedReliefIds.includes(r.id),
  ).sort((a, b) => a.claimOrder - b.claimOrder);
  const missingAmounts = selectedReliefs.filter((r) => !calculatedIds.has(r.id));

  const panelContent: HelpContent | null = openMetric
    ? RESULT_METRIC_HELP[openMetric]
    : null;

  return (
    <PageTransition>
      <section className="panel stack stack-lg">
        <div className="stack">
          <div className="eyebrow">Indicative result · TY {state.taxYear}</div>
          <h1 style={{ fontSize: "clamp(1.7rem, 4vw, 2.4rem)" }}>
            {result.indicativeRefund != null
              ? "Your indicative estimate"
              : "Extra relief value"}
          </h1>
          <p className="lede">
            Based on the annual figures you entered. Use{" "}
            <strong>Explain</strong> for what each number means — then confirm on
            Revenue before relying on it.
          </p>
        </div>

        <Disclaimer />

        {result.indicativeRefund != null && (
          <motion.div
            className="stat stack result-hero-stat"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="tiny muted">Expected refund (indicative)</span>
            <strong style={{ fontSize: "2rem" }}>
              {formatEuro(result.indicativeRefund)}
            </strong>
            <p className="small muted">
              Rough expected refund from the figures you gave — tax paid minus
              Socair’s simplified tax-due sketch. Not a Revenue confirmation.
            </p>
            <button
              type="button"
              className="btn btn-ghost explain-btn"
              onClick={() => setOpenMetric("refund")}
            >
              Explain
            </button>
          </motion.div>
        )}

        <div className="stat-grid">
          <motion.div
            className="stat stack"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
          >
            <span className="tiny muted">Selected extras</span>
            <strong>{formatEuro(result.extraReliefTotal)}</strong>
            <button
              type="button"
              className="btn btn-ghost explain-btn"
              onClick={() => setOpenMetric("extras")}
            >
              Explain
            </button>
          </motion.div>

          <div className="stat stack">
            <span className="tiny muted">Marginal rate used</span>
            <strong>{(result.marginalRate * 100).toFixed(0)}%</strong>
            <button
              type="button"
              className="btn btn-ghost explain-btn"
              onClick={() => setOpenMetric("marginal")}
            >
              Explain
            </button>
          </div>
        </div>

        <div className="stack">
          <h2 style={{ fontSize: "1.2rem" }}>Breakdown</h2>
          <div className="card-list">
            {result.lines.length === 0 && (
              <p className="muted">
                No calculated lines yet — go back and enter annual amounts for
                your selected reliefs.
              </p>
            )}
            {result.lines.map((line, i) => {
              const meta = RELIEF_BY_ID[line.id as ReliefId];
              return (
                <motion.article
                  key={line.id}
                  className="relief-card"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i }}
                >
                  <div className="row" style={{ justifyContent: "space-between" }}>
                    <h3>{line.label}</h3>
                    <strong>{formatEuro(line.amount)}</strong>
                  </div>
                  {meta?.oneLiner && <p className="small muted">{meta.oneLiner}</p>}
                  {line.note && <p className="small muted">{line.note}</p>}
                  {line.id === "remote_working" && (
                    <p className="small muted">
                      Formula Socair used: ((annual bills × remote days) ÷ 365 −
                      employer allowance) × 30% = allowable cost, then × your
                      marginal rate for estimated tax value.
                    </p>
                  )}
                  <Link className="btn btn-ghost" to={`/claim/${line.id}`}>
                    How to claim this
                  </Link>
                </motion.article>
              );
            })}
          </div>
        </div>

        {missingAmounts.length > 0 && (
          <div className="stack">
            <h2 style={{ fontSize: "1.2rem" }}>Also on your list</h2>
            <p className="small muted">
              Selected on your results, but no euro figure here yet (usually
              because an amount wasn’t entered). Claim guides still apply.
            </p>
            <div className="card-list">
              {missingAmounts.map((r) => (
                <article key={r.id} className="relief-card">
                  <h3>{r.title}</h3>
                  <p className="small muted">{r.oneLiner}</p>
                  <div className="row" style={{ marginTop: "0.35rem" }}>
                    <Link className="btn btn-secondary" to={`/claim/${r.id}`}>
                      How to claim this
                    </Link>
                    {r.estimateSupported && (
                      <Link className="btn btn-ghost" to="/estimate">
                        Add amounts
                      </Link>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {result.incomeTaxSketch != null && (
          <div className="stack">
            <p className="small muted">
              Simplified income-tax sketch after credits/reliefs:{" "}
              <strong>{formatEuro(result.incomeTaxSketch)}</strong>
            </p>
            <button
              type="button"
              className="btn btn-ghost explain-btn"
              onClick={() => setOpenMetric("sketch")}
            >
              Explain
            </button>
          </div>
        )}

        <details className="other-guides">
          <summary>Assumptions Socair used</summary>
          <ul className="small muted" style={{ marginTop: "0.75rem" }}>
            {result.assumptions.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
        </details>

        <div className="row" style={{ flexWrap: "wrap" }}>
          <Link className="btn btn-primary" to="/claim">
            Open claim guides
          </Link>
          <Link className="btn btn-secondary" to="/estimate">
            Edit figures
          </Link>
          <Link className="btn btn-ghost" to="/results">
            Results hub
          </Link>
        </div>
      </section>

      <InfoPanel
        open={openMetric !== null}
        onClose={() => setOpenMetric(null)}
        content={panelContent}
      />
    </PageTransition>
  );
}
