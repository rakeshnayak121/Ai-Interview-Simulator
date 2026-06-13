import { Link } from "react-router-dom";
import heroImg from "../assets/AI Image.png";

function HeroSection() {
  const highlights = [
    { label: "Resume Analysis", icon: "CV" },
    { label: "AI Interviews", icon: "AI" },
    { label: "Smart Feedback", icon: "FB" },
    { label: "Track Progress", icon: "PR" },
  ];

  const stats = [
    { value: "50+", label: "Interview Questions", note: "Role-aware technical prompts" },
    { value: "20+", label: "Job Roles", note: "Frontend, MERN, Java, Python" },
    { value: "95%", label: "AI Accuracy", note: "Structured answer evaluation" },
    { value: "100+", label: "Practice Sessions", note: "Built for repeated practice" },
  ];

  return (
    <>
      <section className="app-page">
        <div className="section-shell">
          <div className="hero-glass">
            <div className="row align-items-center g-5">
              <div className="col-lg-6">
                <p className="eyebrow">AI interview preparation</p>

                <h1 className="hero-title">
                  Practice interviews with focused AI feedback.
                </h1>

               

                <div className="d-flex gap-3 mt-4 flex-wrap">
                  <Link className="btn btn-gradient px-4 py-2" to="/upload">
                    Upload Resume
                  </Link>

                  <Link className="btn btn-outline-light px-4 py-2" to="/select-interview">
                    Start Without Resume
                  </Link>
                </div>

                <div className="row mt-5 g-3">
                  {highlights.map((item) => (
                    <div key={item.label} className="col-6 col-md-3">
                      <div className="feature-card text-center">
                        <div className="icon-badge mx-auto mb-3">{item.icon}</div>
                        <p className="mb-0 small text-muted-soft">{item.label}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="col-lg-6">
                <div className="hero-media">
                  <div className="status-chip position-absolute top-0 start-0">
                    Live feedback ready
                  </div>
                  <img src={heroImg} alt="AI interview dashboard preview" />
                </div>
              </div>
            </div>
          </div>

          <div className="row g-3 mt-4">
            {stats.map((stat) => (
              <div key={stat.label} className="col-md-6 col-xl-3">
                <div className="stat-card">
                  <div className="stat-value">{stat.value}</div>
                  <h5 className="mt-3 mb-2">{stat.label}</h5>
                  <p className="mb-0 small">{stat.note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default HeroSection;
