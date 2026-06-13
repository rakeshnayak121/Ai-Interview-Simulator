
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top"
      style={{
        backdropFilter: "blur(10px)",
        background: "rgba(0,0,0,0.85)",
      }}
    >
      <div className="container">
        <Link
          className="navbar-brand fw-bold"
          to="/"
        >
          🤖 AI Interview
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse"
          id="navbarNav"
        >
          <ul className="navbar-nav ms-auto align-items-center">

            <li className="nav-item">
              <a
                className="nav-link"
                href="#home"
              >
                Home
              </a>
            </li>

            <li className="nav-item">
              <a
                className="nav-link"
                href="#features"
              >
                Features
              </a>
            </li>

            <li className="nav-item">
              <a
                className="nav-link"
                href="#dashboard"
              >
                Dashboard
              </a>
            </li>

            <li className="nav-item">
              <a
                className="nav-link"
                href="#how-it-works"
              >
                How It Works
              </a>
            </li>

            <li className="nav-item ms-3">
              <Link
                to="/upload"
                className="btn btn-primary px-4"
              >
                Start Practice
              </Link>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

