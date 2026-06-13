
function InterviewHistory() {
  const interviews = [
    {
      role: "MERN Stack Developer",
      score: 85,
      date: "10 Jun 2026",
      status: "Excellent",
    },
    {
      role: "Frontend Developer",
      score: 78,
      date: "08 Jun 2026",
      status: "Good",
    },
    {
      role: "Java Developer",
      score: 69,
      date: "05 Jun 2026",
      status: "Average",
    },
  ];

  return (
    <main className="app-page">
      <div className="section-shell">
        <div className="hero-glass">
          <div className="mb-4">
            <p className="eyebrow">Previous practice</p>
            <h1 className="page-title">Interview History</h1>
          </div>

          <div className="app-card">
            <div className="table-responsive">
              <table className="table table-dark table-hover align-middle mb-0">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Role</th>
                    <th>Score</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {interviews.map((item) => (
                    <tr key={`${item.date}-${item.role}`}>
                      <td>{item.date}</td>
                      <td>{item.role}</td>
                      <td>{item.score}/100</td>
                      <td>
                        <span className="badge bg-success">{item.status}</span>
                      </td>
                      <td>
                        <button className="btn btn-sm btn-primary">View Report</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}


export default InterviewHistory;
 