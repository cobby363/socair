import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { PageTransition } from "../components/PageTransition";
import { useAppState } from "../context/AppState";
import { visibleQuestions } from "../data/questions";
import type { ChecklistAnswers } from "../lib/types";

export function Checklist() {
  const { state, setAnswer, completeChecklist } = useAppState();
  const navigate = useNavigate();
  const questions = useMemo(() => visibleQuestions(state.answers), [state.answers]);
  const [index, setIndex] = useState(0);
  const [showHelp, setShowHelp] = useState(false);

  const safeIndex = Math.min(index, Math.max(0, questions.length - 1));
  const current = questions[safeIndex];
  const progress = questions.length ? ((safeIndex + 1) / questions.length) * 100 : 0;
  const value = current ? state.answers[current.id] : undefined;

  useEffect(() => {
    setShowHelp(false);
  }, [current?.id]);

  if (!current) {
    return (
      <PageTransition>
        <section className="panel stack">
          <h1>Checklist</h1>
          <p className="muted">No questions available.</p>
        </section>
      </PageTransition>
    );
  }

  const onPick = (v: string) => {
    setAnswer(current.id, v as ChecklistAnswers[typeof current.id]);
    window.setTimeout(() => {
      if (safeIndex < questions.length - 1) setIndex(safeIndex + 1);
    }, 180);
  };

  const finish = () => {
    completeChecklist();
    navigate("/results");
  };

  return (
    <PageTransition>
      <section className="panel stack stack-lg">
        <div className="stack">
          <div className="eyebrow">
            {current.section} · {safeIndex + 1} of {questions.length}
          </div>
          <div className="progress" aria-hidden>
            <motion.span
              initial={false}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.35 }}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -14 }}
            transition={{ duration: 0.22 }}
            className="stack"
          >
            <h1 style={{ fontSize: "clamp(1.45rem, 3.5vw, 2rem)" }}>{current.prompt}</h1>

            <button
              type="button"
              className={`btn ${showHelp ? "btn-secondary" : "btn-ghost"} explain-btn`}
              onClick={() => setShowHelp((s) => !s)}
            >
              {showHelp ? "Hide “What does this mean?”" : "What does this mean?"}
            </button>

            <AnimatePresence initial={false}>
              {showHelp && (
                <motion.div
                  className="help-card"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.22 }}
                >
                  <div className="help-card-inner stack">
                    <div className="row" style={{ justifyContent: "space-between" }}>
                      <h2 style={{ fontSize: "1.15rem" }}>{current.help.title}</h2>
                      <button
                        type="button"
                        className="btn btn-ghost"
                        onClick={() => setShowHelp(false)}
                      >
                        Close
                      </button>
                    </div>
                    <p>{current.help.summary}</p>
                    {current.help.bullets && (
                      <ul>
                        {current.help.bullets.map((b) => (
                          <li key={b}>{b}</li>
                        ))}
                      </ul>
                    )}
                    {current.help.where && (
                      <div className="stack">
                        <h3 style={{ fontSize: "0.95rem" }}>Where to check</h3>
                        <p className="muted small">{current.help.where}</p>
                      </div>
                    )}
                    {current.help.tip && (
                      <div className="disclaimer">
                        <strong>Tip: </strong>
                        {current.help.tip}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="choice-grid">
              {current.options.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  className={`choice ${value === opt.value ? "active" : ""}`}
                  onClick={() => onPick(opt.value)}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {state.answers.q_paye === "no" && (
          <p className="disclaimer">
            This version focuses on PAYE. If you’re fully self-assessed, use ROS /
            Form 11 with an accountant — Socair won’t estimate that path yet.
          </p>
        )}

        <div className="row" style={{ flexWrap: "wrap" }}>
          <button
            type="button"
            className="btn btn-secondary"
            disabled={safeIndex === 0}
            onClick={() => setIndex((i) => Math.max(0, i - 1))}
          >
            Back
          </button>
          {safeIndex < questions.length - 1 ? (
            <button
              type="button"
              className="btn btn-primary"
              disabled={value == null}
              onClick={() => setIndex((i) => i + 1)}
            >
              Next
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-primary"
              disabled={value == null}
              onClick={finish}
            >
              See my results
            </button>
          )}
          <Link className="btn btn-ghost" to="/">
            Home
          </Link>
        </div>
      </section>
    </PageTransition>
  );
}
