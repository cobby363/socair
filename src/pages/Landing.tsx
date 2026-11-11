import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { PageTransition } from "../components/PageTransition";
import { Disclaimer } from "../components/Disclaimer";
import { useAppState } from "../context/AppState";

export function Landing() {
  const { state } = useAppState();
  const continueTo = state.checklistComplete
    ? "/results"
    : Object.keys(state.answers).length
      ? "/checklist"
      : "/year";

  return (
    <PageTransition>
      <section className="panel hero-panel stack stack-lg">
        <div>
          <div className="eyebrow">Ireland · PAYE · Local-first</div>
          <motion.h1
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            style={{ fontSize: "clamp(2.4rem, 6vw, 3.6rem)", maxWidth: "10ch" }}
          >
            Socair
          </motion.h1>
          <p className="lead" style={{ marginTop: "0.75rem", maxWidth: "34ch" }}>
            Find tax reliefs you might have missed — a plain-English PAYE
            checklist, claim guides, and an indicative estimate, without logging
            into Revenue.
          </p>
        </div>

        <ul className="stack small muted" style={{ paddingLeft: "1.1rem" }}>
          <li>No myAccount login or PPSN</li>
          <li>Progress stays on this device</li>
          <li>Updated for Budget / tax year 2026 rules in the calculator</li>
        </ul>

        <Disclaimer />

        <div className="row" style={{ flexWrap: "wrap" }}>
          <Link className="btn btn-primary" to={continueTo}>
            {state.checklistComplete ? "Back to your results" : "Start free checklist"}
          </Link>
          <Link className="btn btn-secondary" to="/claim">
            Browse claim guides
          </Link>
          <Link className="btn btn-ghost" to="/privacy">
            How privacy works
          </Link>
        </div>
      </section>
    </PageTransition>
  );
}
