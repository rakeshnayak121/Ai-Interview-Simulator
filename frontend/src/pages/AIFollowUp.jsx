function AIFollowUp() {
  const messages = [
    {
      sender: "AI",
      text: "Tell me about your React project.",
      time: "10:30 AM",
    },
    {
      sender: "You",
      text: "I built an Employee Management System using React and Node.js.",
      time: "10:31 AM",
    },
    {
      sender: "AI",
      text: "How did you manage state in your application?",
      time: "10:31 AM",
    },
    {
      sender: "You",
      text: "I used Context API for state management.",
      time: "10:32 AM",
    },
    {
      sender: "AI",
      text: "Why did you choose Context API over Redux?",
      time: "10:33 AM",
    },
  ];

  return (
    <main className="app-page">
      <div className="section-shell">
        <div className="hero-glass">
          <div className="mb-4">
            <p className="eyebrow">Adaptive practice</p>
            <h1 className="page-title">AI Follow-Up Questions</h1>
          </div>

          <div className="app-card" style={{ height: "600px", overflowY: "auto" }}>
            {messages.map((msg) => (
              <div
                key={`${msg.sender}-${msg.time}-${msg.text}`}
                className={`d-flex mb-3 ${
                  msg.sender === "You" ? "justify-content-end" : "justify-content-start"
                }`}
              >
                <div className={msg.sender === "You" ? "chat-user" : "chat-ai"}>
                  <small className="text-muted-soft">{msg.sender}</small>
                  <p className="mb-1 mt-1">{msg.text}</p>
                  <small className="text-muted-soft">{msg.time}</small>
                </div>
              </div>
            ))}
          </div>

          <div className="d-flex justify-content-between align-items-center mt-4">
            <button className="btn btn-outline-light">End Interview</button>
            <div className="text-muted-soft">AI is typing...</div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default AIFollowUp;
