import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Result() {
  const location = useLocation();
  const interviewId = location.state?.interviewId;

  const [interview, setInterview] = useState(null);

  useEffect(() => {
    const fetchInterview = async () => {
      if (!interviewId) {
        setInterview({ answers: [], totalScore: 0 });
        return;
      }

      try {
        const res = await axios.get(
          `http://localhost:5000/api/interview-session/${interviewId}`
        );

        setInterview(res.data.interview);
      } catch (error) {
        console.error(error);
        setInterview({ answers: [], totalScore: 0 });
      }
    };

    fetchInterview();
  }, [interviewId]);

  if (!interview) {
    return (
      <main className="app-page">
        <div className="section-shell">
          <div className="hero-glass text-center">
            <h2>Loading results...</h2>
          </div>
        </div>
      </main>
    );
  }

  const answeredCount = interview.answers.length;
  const averageScore =
    answeredCount > 0 ? (interview.totalScore / answeredCount).toFixed(1) : 0;

  return (
    <main className="app-page">
      <div className="section-shell">
        <div className="hero-glass">
          <div className="text-center mb-5">
            <p className="eyebrow">Performance report</p>
            <h1 className="page-title">Interview Result</h1>
            <p className="mt-3 text-muted-soft">
              Review your score, saved answers, and AI feedback.
            </p>
          </div>

          <div className="row g-4 align-items-center mb-5">
            <div className="col-lg-4">
              <div className="result-score-circle">
                <div className="text-center">
                  <h1 className="mb-0">{averageScore}</h1>
                  <small className="text-muted-soft">average /10</small>
                </div>
              </div>
            </div>

            <div className="col-lg-8">
              <div className="row g-3">
                <div className="col-md-6">
                  <div className="stat-card">
                    <div className="stat-value">{interview.totalScore}</div>
                    <p className="mb-0">Total Score</p>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="stat-card">
                    <div className="stat-value">{answeredCount}</div>
                    <p className="mb-0">Questions Answered</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <h2 className="mb-4">Detailed Report</h2>

          {answeredCount === 0 ? (
            <div className="app-card text-center">
              <p className="mb-0">No answers were saved for this interview.</p>
            </div>
          ) : (
            interview.answers.map((item, index) => (
              <div key={`${item.question}-${index}`} className="app-card mb-4">
                <div className="d-flex flex-column flex-md-row justify-content-between gap-3">
                  <h4>Question {index + 1}</h4>
                  <span className="status-chip align-self-md-start">
                    Score {item.score}/10
                  </span>
                </div>

                <p className="mt-3">
                  <strong className="text-white">Question:</strong> {item.question}
                </p>

                <p>
                  <strong className="text-white">Your answer:</strong>{" "}
                  {item.answer || "No answer provided"}
                </p>

                <pre className="text-muted-soft mb-0" style={{ whiteSpace: "pre-wrap" }}>
                  {item.feedback}
                </pre>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}

export default Result;
