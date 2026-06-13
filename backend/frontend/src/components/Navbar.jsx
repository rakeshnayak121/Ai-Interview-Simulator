import { Link } from "react-router-dom";

function Navbar() {
  const links = [
    { label: "Home", to: "/" },
    { label: "Dashboard", to: "/dashboard" },
    { label: "History", to: "/history" },
    { label: "Report", to: "/report" },
  ];

  return (
    <nav className="navbar navbar-expand-lg fixed-top app-navbar">
      <div className="container">
        <Link
          className="navbar-brand text-white fw-bold d-flex align-items-center"
          to="/"
        >
          <span className="brand-mark">AI</span>
          Interview Simulator
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
          aria-controls="mainNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="mainNavbar">
          <div className="navbar-nav ms-auto align-items-lg-center gap-lg-1">
            {links.map((link) => (
              <Link
                key={link.to}
                className="nav-link app-nav-link"
                to={link.to}
              >
                {link.label}
              </Link>
            ))}

            <Link className="btn btn-gradient ms-lg-3 mt-3 mt-lg-0" to="/upload">
              Upload Resume
            </Link>

            <div className="avatar-dot ms-lg-3 mt-3 mt-lg-0">R</div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
