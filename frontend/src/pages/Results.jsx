import { useLocation } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";

function Results() {
const location = useLocation();

const answers = useMemo(
() => location.state?.answers || [],
[location.state]
);

const selectedRole =
location.state?.selectedRole ||
"MERN Stack Developer";

const [evaluation, setEvaluation] =
useState(null);

const [loading, setLoading] =
useState(true);

useEffect(() => {
const evaluateInterview = async () => {
try {
if (answers.length === 0) {
setLoading(false);
return;
}


    const res = await axios.post(
      "http://localhost:5000/api/evaluation/evaluate",
      {
        answers,
      }
    );

    const result =
      res.data.result;

    setEvaluation(result);

    localStorage.setItem(
      "latestInterviewResult",
      JSON.stringify(result)
    );

    localStorage.setItem(
      "questionsAnswered",
      answers.length
    );

    localStorage.setItem(
      "selectedRole",
      selectedRole
    );
  } catch (error) {
    console.error(
      "Evaluation Error:",
      error
    );
  } finally {
    setLoading(false);
  }
};

evaluateInterview();


}, [answers, selectedRole]);

const scoreCards = [
{
label: "Overall Score",
value:
evaluation?.overallScore || 0,
},
{
label: "Communication",
value:
evaluation?.communication || 0,
},
{
label: "Technical Skills",
value:
evaluation?.technicalSkills || 0,
},
{
label: "Confidence",
value:
evaluation?.confidence || 0,
},
];

return ( <main className="app-page"> <div className="section-shell">


    <div className="hero-glass">

      <div className="text-center mb-5">

        <p className="eyebrow">
          Voice Interview Report
        </p>

        <h1 className="page-title">
          Interview Results
        </h1>

        <p className="mt-3 text-muted-soft">
          Role: {selectedRole}
        </p>

      </div>

      <div className="app-card mb-4">

        <h3 className="text-center mb-4">
          AI Evaluation
        </h3>

        {loading ? (
          <p className="text-center">
            Evaluating answers...
          </p>
        ) : (
          <>
            <div className="row g-4">

              {scoreCards.map(
                (card) => (
                  <div
                    key={card.label}
                    className="col-md-6 col-xl-3"
                  >
                    <div className="stat-card text-center">

                      <div className="stat-value">
                        {card.value}
                      </div>

                      <p className="mb-0">
                        {card.label}
                      </p>

                    </div>
                  </div>
                )
              )}

            </div>

            <div className="row mt-4 g-4">

              <div className="col-md-6">

                <div className="app-card h-100">

                  <h4 className="text-success">
                    Strengths
                  </h4>

                  {evaluation?.strengths
                    ?.length ? (
                    <ul className="clean-list">

                      {evaluation.strengths.map(
                        (
                          item,
                          index
                        ) => (
                          <li
                            key={index}
                          >
                            {item}
                          </li>
                        )
                      )}

                    </ul>
                  ) : (
                    <p>
                      No strengths
                      identified
                    </p>
                  )}

                </div>

              </div>

              <div className="col-md-6">

                <div className="app-card h-100">

                  <h4 className="text-danger">
                    Weaknesses
                  </h4>

                  {evaluation?.weaknesses
                    ?.length ? (
                    <ul className="clean-list">

                      {evaluation.weaknesses.map(
                        (
                          item,
                          index
                        ) => (
                          <li
                            key={index}
                          >
                            {item}
                          </li>
                        )
                      )}

                    </ul>
                  ) : (
                    <p>
                      No weaknesses
                      identified
                    </p>
                  )}

                </div>

              </div>

            </div>

            <div className="app-card mt-4">

              <h4>
                AI Feedback
              </h4>

              <p className="mb-0">
                {evaluation?.feedback ||
                  "No feedback generated"}
              </p>

            </div>
          </>
        )}

      </div>

      <div className="app-card">

        <h3 className="mb-4 text-center">
          Questions & Answers
        </h3>

        {answers.length === 0 ? (
          <p className="text-center">
            No answers found.
          </p>
        ) : (
          answers.map(
            (
              item,
              index
            ) => (
              <div
                key={index}
                className="mb-4 pb-4 border-bottom"
              >

                <h5 className="text-info">
                  Question{" "}
                  {index + 1}
                </h5>

                <p>
                  {item.question}
                </p>

                <h6 className="text-success mt-3">
                  Your Answer
                </h6>

                <p className="text-muted-soft">
                  {item.answer ||
                    "No answer provided"}
                </p>

              </div>
            )
          )
        )}

      </div>

    </div>

  </div>
</main>


);
}

export default Results;
