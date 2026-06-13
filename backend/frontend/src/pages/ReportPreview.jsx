function ReportPreview() {
  const summary = [
    "Overall Score: 85/100",
    "Communication: 90%",
    "Technical Skills: 82%",
    "Confidence: 88%",
  ];

  const strengths = [
    "Strong React knowledge",
    "Good communication",
    "Clear explanations",
  ];

  const improvements = [
    "System Design",
    "Advanced JavaScript",
    "Database Optimization",
  ];

  return (
    <main className="app-page">
      <div className="section-shell">
        <div className="hero-glass">
          <div className="mb-4">
            <p className="eyebrow">Export preview</p>
            <h1 className="page-title">Interview Report</h1>
          </div>

          <div className="app-card">
            <div className="row g-4">
              <div className="col-lg-4">
                <h4>Candidate Details</h4>
                <p>Name: Rakesh</p>
                <p>Role: MERN Stack Developer</p>
                <p>Date: 10 Jun 2026</p>
              </div>

              <div className="col-lg-8">
                <h4>Performance Summary</h4>
                <ul className="report-list">
                  {summary.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <hr className="border-secondary my-4" />

            <div className="row g-4">
              <div className="col-md-6">
                <h4>Strengths</h4>
                <ul className="report-list">
                  {strengths.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="col-md-6">
                <h4>Areas for Improvement</h4>
                <ul className="report-list">
                  {improvements.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="text-center mt-5">
              <button className="btn btn-gradient btn-lg px-5">Export PDF</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ReportPreview;
