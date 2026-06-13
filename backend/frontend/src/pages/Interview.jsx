import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Interview() {
  const location = useLocation();
  const navigate = useNavigate();

  const questions = location.state?.questions || [];
  const interviewId = location.state?.interviewId;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [evaluation, setEvaluation] = useState("");
  const [loading, setLoading] = useState(false);

  const currentQuestion = questions[currentIndex] || "No question found";
  const progress =
    questions.length > 0 ? ((currentIndex + 1) / questions.length) * 100 : 0;

  const submitAnswer = async () => {
    try {
      setLoading(true);

      const res = await axios.post("http://localhost:5000/api/evaluation/evaluate", {
        question: currentQuestion,
        answer,
      });

      const evaluationText = res.data.evaluation;
      setEvaluation(evaluationText);

      let score = 0;
      const scoreMatch = evaluationText.match(/Score:\s*(\d+)\/10/i);

      if (scoreMatch) {
        score = Number(scoreMatch[1]);
      }

      await axios.post("http://localhost:5000/api/interview-session/save-answer", {
        interviewId,
        question: currentQuestion,
        answer,
        score,
        feedback: evaluationText,
      });
    } catch (error) {
      console.error(error);
      alert("Evaluation Failed");
    } finally {
      setLoading(false);
    }
  };

  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setAnswer("");
      setEvaluation("");
      return;
    }

    navigate("/result", {
      state: {
        interviewId,
      },
    });
  };

  const endInterview = () => {
    navigate("/result", {
      state: {
        interviewId,
      },
    });
  };

  return (
    <main className="app-page">
      <div className="section-shell">
        <div className="hero-glass">
          <div className="d-flex flex-column flex-lg-row justify-content-between gap-3 mb-4">
            <div>
              <p className="eyebrow">Live practice</p>
              <h1 className="page-title">AI Interview Simulator</h1>
            </div>

            <div className="status-chip align-self-lg-end">
              Question {questions.length ? currentIndex + 1 : 0} of {questions.length}
            </div>
          </div>

          <div className="progress mb-4" style={{ height: "10px" }}>
            <div
              className="progress-bar"
              style={{ width: `${progress}%` }}
              role="progressbar"
              aria-valuenow={progress}
              aria-valuemin="0"
              aria-valuemax="100"
            />
          </div>

          <div className="row g-4">
            <div className="col-lg-7">
              <div className="app-card h-100">
                <p className="eyebrow">Question</p>
                <h3 className="interview-question">{currentQuestion}</h3>

                <label className="form-label mt-4 text-muted-soft" htmlFor="answer">
                  Your answer
                </label>
                <textarea
                  id="answer"
                  className="form-control answer-box"
                  rows="8"
                  placeholder="Type your answer here..."
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                />

                <div className="d-flex flex-wrap gap-3 mt-4">
                  <button
                    className="btn btn-gradient px-4"
                    onClick={submitAnswer}
                    disabled={loading || !answer.trim()}
                  >
                    {loading ? "Evaluating..." : "Submit Answer"}
                  </button>

                  <button className="btn btn-outline-light px-4" onClick={endInterview}>
                    End Interview
                  </button>
                </div>
              </div>
            </div>

            <div className="col-lg-5">
              <div className="app-card h-100">
                <p className="eyebrow">AI evaluation</p>

                {evaluation ? (
                  <>
                    <pre
                      className="mb-4 text-muted-soft"
                      style={{ whiteSpace: "pre-wrap" }}
                    >
                      {evaluation}
                    </pre>

                    <button className="btn btn-primary w-100" onClick={nextQuestion}>
                      {currentIndex === questions.length - 1
                        ? "View Results"
                        : "Next Question"}
                    </button>
                  </>
                ) : (
                  <div className="text-muted-soft">
                    Submit an answer to receive a score, strengths, weaknesses,
                    and an improved answer.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Interview;
