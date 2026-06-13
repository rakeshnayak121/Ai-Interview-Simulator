import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function SelectInterview() {
  const [selectedRole, setSelectedRole] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const questions = location.state?.questions || [];
  const interviewId = location.state?.interviewId || "";
  const resumeData = location.state?.resumeData || {};
resumeData.role
  const roles = [
    {
      title: "Frontend Developer",
      tech: "React, HTML, CSS, JavaScript",
      icon: "FE",
    },
    {
      title: "MERN Stack Developer",
      tech: "MongoDB, Express, React, Node",
      icon: "ME",
    },
    {
      title: "Backend Developer",
      tech: "Node.js, Express, APIs",
      icon: "BE",
    },
    {
      title: "Java Developer",
      tech: "Core Java, OOP, Spring",
      icon: "JV",
    },
    {
      title: "Full Stack Developer",
      tech: "Frontend plus backend systems",
      icon: "FS",
    },
    {
      title: "Data Analyst",
      tech: "SQL, Python, Analytics",
      icon: "DA",
    },
  ];

  const handleStartInterview = () => {
    navigate("/voice-interview", {
      state: {
        selectedRole,
        questions,
        interviewId,
        resumeData,
      },
    });
  };

  return (
    <main className="app-page">
      <div className="section-shell">
        <div className="hero-glass">
          <div className="text-center mb-5">
            <p className="eyebrow">Interview setup</p>
            <h1 className="page-title">Select Interview Type</h1>
            <p className="mt-3 text-muted-soft">
              Choose the role you want to practice for.
            </p>
          </div>

          <div className="row g-4">
            {roles.map((role) => (
              <div key={role.title} className="col-md-6 col-lg-4">
                <button
                  type="button"
                  className={`role-card w-100 ${
                    selectedRole === role.title ? "role-card-active" : ""
                  }`}
                  onClick={() => setSelectedRole(role.title)}
                >
                  {selectedRole === role.title && (
                    <div className="selected-badge">OK</div>
                  )}

                  <div className="icon-badge mx-auto mb-3">{role.icon}</div>
                  <h5>{role.title}</h5>
                  <p className="text-muted-soft small mb-0">{role.tech}</p>
                </button>
              </div>
            ))}
          </div>

          <div className="text-center mt-5">
            <button
              className="btn btn-gradient px-5 py-2"
              disabled={!selectedRole}
              onClick={handleStartInterview}
            >
              Start Interview
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default SelectInterview;
