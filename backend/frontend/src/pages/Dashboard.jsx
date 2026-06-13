import React from "react";

function Dashboard() {
const resumeData =
JSON.parse(
localStorage.getItem("resumeData")
) || {};

const interviewResult =
JSON.parse(
localStorage.getItem(
"latestInterviewResult"
)
) || {};

const questionsAnswered =
localStorage.getItem(
"questionsAnswered"
) || 0;

const selectedRole =
localStorage.getItem(
"selectedRole"
) || resumeData.role || "N/A";

const stats = [
{
value:
interviewResult.overallScore || 0,
label: "Overall Score",
},
{
value: questionsAnswered,
label: "Questions Answered",
},
{
value:
resumeData.score || 0,
label: "Resume Score",
},
{
value:
interviewResult.confidence || 0,
label: "Confidence",
},
];

const skills = [
{
label: "Communication",
value:
interviewResult.communication || 0,
},
{
label: "Technical Skills",
value:
interviewResult.technicalSkills || 0,
},
{
label: "Confidence",
value:
interviewResult.confidence || 0,
},
{
label: "Resume Score",
value:
resumeData.score || 0,
},
];

const recommendations =
interviewResult.weaknesses || [];

return ( <main className="app-page"> <div className="section-shell"> <div className="hero-glass">

```
      <div className="mb-5">

        <p className="eyebrow">
          Progress Overview
        </p>

        <h1 className="page-title">
          Interview Dashboard
        </h1>

        <p className="text-muted-soft">
          {resumeData.name ||
            "Candidate"}
        </p>

        <p className="text-muted-soft">
          Target Role: {selectedRole}
        </p>

      </div>

      <div className="row g-4">

        {stats.map((stat) => (
          <div
            key={stat.label}
            className="col-md-6 col-xl-3"
          >
            <div className="stat-card">

              <div className="stat-value">
                {stat.value}
              </div>

              <p className="mb-0">
                {stat.label}
              </p>

            </div>
          </div>
        ))}

      </div>

      <div className="app-card mt-4">

        <h4 className="mb-4">
          Skill Analysis
        </h4>

        {skills.map((skill) => (
          <div
            key={skill.label}
            className="mb-4"
          >

            <div className="d-flex justify-content-between mb-2">

              <span>
                {skill.label}
              </span>

              <span>
                {skill.value}%
              </span>

            </div>

            <div
              className="progress"
              style={{
                height: "10px",
              }}
            >

              <div
                className="progress-bar"
                style={{
                  width: `${skill.value}%`,
                }}
              />

            </div>

          </div>
        ))}

      </div>

      <div className="app-card mt-4">

        <h4 className="mb-3">
          Improvement Areas
        </h4>

        {recommendations.length >
        0 ? (
          <ul className="clean-list">

            {recommendations.map(
              (item, index) => (
                <li key={index}>
                  {item}
                </li>
              )
            )}

          </ul>
        ) : (
          <p>
            No recommendations yet
          </p>
        )}

      </div>

    </div>
  </div>
</main>


);
}

export default Dashboard;
