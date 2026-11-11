import { Link } from "react-router-dom";
import { PageTransition } from "../components/PageTransition";
import { useAppState } from "../context/AppState";

export function Privacy() {
  const { resetAll } = useAppState();

  return (
    <PageTransition>
      <section className="panel stack stack-lg">
        <div>
          <div className="eyebrow">Privacy</div>
          <h1 style={{ fontSize: "clamp(1.7rem, 4vw, 2.3rem)" }}>
            Local-first by design
          </h1>
          <p className="lead" style={{ marginTop: "0.55rem" }}>
            Socair is built so your checklist answers live in this browser. We do
            not connect to myAccount and we do not ask for your PPSN.
          </p>
        </div>

        <div className="stack">
          <h2 style={{ fontSize: "1.2rem" }}>What we store on your device</h2>
          <ul className="muted">
            <li>Tax year and checklist answers (localStorage)</li>
            <li>Selected reliefs and optional “step done” ticks</li>
            <li>
              Estimate amounts in session storage by default; only kept longer if
              you tick “Remember these figures”
            </li>
          </ul>
        </div>

        <div className="stack">
          <h2 style={{ fontSize: "1.2rem" }}>What we don’t do</h2>
          <ul className="muted">
            <li>No cloud account in this version</li>
            <li>No medical document uploads</li>
            <li>No ads in this build (consent tooling will arrive if ads are added)</li>
          </ul>
        </div>

        <div className="disclaimer">
          Clearing site data in your browser, or using the button below, removes
          Socair’s saved progress on this device.
        </div>

        <div className="row">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              resetAll();
              window.alert("Local Socair data cleared on this device.");
            }}
          >
            Clear all local data
          </button>
          <Link className="btn btn-ghost" to="/">
            Back home
          </Link>
        </div>
      </section>
    </PageTransition>
  );
}
