import {
  useLocation,
  useNavigate,
} from "react-router-dom";

function ResumeAnalysis() {
  const location = useLocation();
  const navigate = useNavigate();

  const questions =
    location.state?.questions || [];

  const interviewId =
    location.state?.interviewId || "";

  const resumeData =
    location.state?.resumeData ||
    JSON.parse(
      localStorage.getItem("resumeData")
    ) ||
    {};

  console.log("LOCATION STATE");
  console.log(location.state);

  console.log("RESUME DATA");
  console.log(resumeData);

  const startInterview = () => {
    navigate("/select-interview", {
      state: {
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

            <p className="eyebrow">
              Resume Intelligence
            </p>

            <h1 className="page-title">
              Resume Analysis
            </h1>

          </div>

          <div className="row g-4">

            <div className="col-lg-4">

              <div className="app-card h-100">

                <div className="icon-badge mb-3">
                  👤
                </div>

                <h3>
                  {resumeData.name ||
                    "Candidate"}
                </h3>

                <p className="text-muted-soft">
                  {resumeData.role ||
                    "Software Developer"}
                </p>

                <hr />

                <p>
                  📧{" "}
                  {resumeData.email ||
                    "Not Available"}
                </p>

                <p>
                  📱{" "}
                  {resumeData.phone ||
                    "Not Available"}
                </p>

                <p
                  style={{
                    wordBreak:
                      "break-word",
                  }}
                >
                  🌐{" "}
                  {resumeData.github ||
                    "Not Available"}
                </p>

                <p
                  style={{
                    wordBreak:
                      "break-word",
                  }}
                >
                  💼{" "}
                  {resumeData.linkedin ||
                    "Not Available"}
                </p>

              </div>

            </div>

            <div className="col-lg-8">

              <div className="app-card h-100 text-center">

                <div className="score-circle">

                  <div>

                    <h1 className="mb-0">
                      {resumeData.score ||
                        0}
                    </h1>

                    <small>
                      /100
                    </small>

                  </div>

                </div>

                <h4 className="mt-4">
                  Resume Score
                </h4>

              </div>

            </div>

          </div>

          <div className="row mt-4 g-4">

            <div className="col-md-4">

              <div className="app-card h-100">

                <h5 className="text-success">
                  Strengths
                </h5>

                <ul>

                  {(resumeData.strengths ||
                    []).map(
                    (
                      item,
                      index
                    ) => (
                      <li key={index}>
                        {item}
                      </li>
                    )
                  )}

                </ul>

              </div>

            </div>

            <div className="col-md-4">

              <div className="app-card h-100">

                <h5 className="text-danger">
                  Weaknesses
                </h5>

                <ul>

                  {(resumeData.weaknesses ||
                    []).map(
                    (
                      item,
                      index
                    ) => (
                      <li key={index}>
                        {item}
                      </li>
                    )
                  )}

                </ul>

              </div>

            </div>

            <div className="col-md-4">

              <div className="app-card h-100">

                <h5 className="text-warning">
                  Suggestions
                </h5>
                

                <ul>

                  {(resumeData.suggestions ||
                    []).map(
                    (
                      item,
                      index
                    ) => (
                      <li key={index}>
                        {item}
                      </li>
                    )
                  )}

                </ul>

              </div>

            </div>

          </div>

          <div className="text-center mt-5">

            <button
              className="btn btn-gradient btn-lg px-5"
              onClick={startInterview}
            >
              Continue Interview →
            </button>

          </div>

        </div>

      </div>
    </main>
  );
}

export default ResumeAnalysis;