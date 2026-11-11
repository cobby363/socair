import { AnimatePresence, motion } from "framer-motion";
import type { HelpContent } from "../data/questions";
import type { FieldHelp } from "../data/estimateFieldHelp";

type Props = {
  open: boolean;
  onClose: () => void;
  content: HelpContent | FieldHelp | null;
};

function isFieldHelp(c: HelpContent | FieldHelp): c is FieldHelp {
  return "where" in c && Array.isArray((c as FieldHelp).where);
}

export function InfoPanel({ open, onClose, content }: Props) {
  return (
    <AnimatePresence>
      {open && content && (
        <>
          <motion.button
            type="button"
            className="info-backdrop"
            aria-label="Close explanation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.aside
            className="info-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="info-panel-title"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 380, damping: 36 }}
          >
            <div className="info-panel-head">
              <h2 id="info-panel-title">{content.title}</h2>
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Close
              </button>
            </div>

            <div className="info-panel-body stack">
              <p>{content.summary}</p>

              {"bullets" in content && content.bullets && content.bullets.length > 0 && (
                <div className="stack">
                  <h3>Details</h3>
                  <ul>
                    {content.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </div>
              )}

              {isFieldHelp(content) && content.includes && content.includes.length > 0 && (
                <div className="stack">
                  <h3>Include</h3>
                  <ul>
                    {content.includes.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </div>
              )}

              {isFieldHelp(content) && content.excludes && content.excludes.length > 0 && (
                <div className="stack">
                  <h3>Do not include</h3>
                  <ul>
                    {content.excludes.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </div>
              )}

              {isFieldHelp(content) ? (
                <div className="stack">
                  <h3>Where to find this</h3>
                  <ul>
                    {content.where.map((w) => (
                      <li key={w}>{w}</li>
                    ))}
                  </ul>
                </div>
              ) : content.where ? (
                <div className="stack">
                  <h3>Where to find this</h3>
                  <p className="muted">{content.where}</p>
                </div>
              ) : null}

              {content.tip && (
                <div className="disclaimer">
                  <strong>Tip: </strong>
                  {content.tip}
                </div>
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
