import { Link, Outlet } from "react-router-dom";

export function Layout() {
  return (
    <div className="app-shell">
      <header className="topbar">
        <Link to="/" className="brand" aria-label="Socair home">
          <span className="brand-mark">Socair</span>
          <span className="brand-tag">PAYE relief helper</span>
        </Link>
        <nav className="nav-links">
          <Link to="/year">Tax year</Link>
          <Link to="/privacy">Privacy</Link>
        </nav>
      </header>
      <Outlet />
      <p className="footer-note">
        Socair is an independent guide — not Revenue, not a tax agent. Estimates are
        indicative only. Official rules live on{" "}
        <a href="https://www.revenue.ie" target="_blank" rel="noreferrer">
          revenue.ie
        </a>
        .
      </p>
    </div>
  );
}
