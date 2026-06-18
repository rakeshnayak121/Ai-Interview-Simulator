import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function VoiceInterview() {
  const location = useLocation();
  const navigate = useNavigate();

  const selectedRole = location.state?.selectedRole || "MERN Stack Developer";
  const questions = location.state?.questions || [];

  const [recognition, setRecognition] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [transcript, setTranscript] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [answers, setAnswers] = useState([]);

  const currentQuestion = questions[currentIndex] || "No question available";

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition not supported. Use Chrome.");
      return;
    }

    if (isListening && recognition) {
      recognition.stop();
      return;
    }

    const recog = new SpeechRecognition();

    recog.continuous = false;
    recog.interimResults = false;
    recog.lang = "en-US";

    recog.onstart = () => {
      setIsListening(true);
    };

    recog.onresult = (event) => {
      setTranscript(event.results[0][0].transcript);
    };

    recog.onend = () => {
      setIsListening(false);
    };

    setRecognition(recog);
    recog.start();

    setTimeout(() => {
      recog.stop();
    }, 15000);
  };

  const saveCurrentAnswer = () => {
    const updatedAnswers = [...answers];

    updatedAnswers[currentIndex] = {
      question: currentQuestion,
      answer: transcript,
    };

    setAnswers(updatedAnswers);
    return updatedAnswers;
  };

  const nextQuestion = () => {
    const updatedAnswers = saveCurrentAnswer();

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setTranscript("");
      return;
    }

    navigate("/results", {
      state: {
        answers: updatedAnswers,
        selectedRole,
      },
    });
  };

  const previousQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setTranscript("");
    }
  };

  return (
    <main className="app-page">
      <div className="section-shell">
        <div className="hero-glass">
          <div className="mb-4">
            <p className="eyebrow">Voice practice</p>
            <h1 className="page-title">Voice Interview</h1>
            <p className="mt-3 text-muted-soft">Role: {selectedRole}</p>
          </div>

          <div className="row g-4">
            <div className="col-lg-8">
              <div className="app-card h-100">
                <p className="text-muted-soft">
                  Question {questions.length ? currentIndex + 1 : 0} of {questions.length}
                </p>

                <h3 className="interview-question mb-5">{currentQuestion}</h3>

                <div
                  className={`wave-container mb-5 ${!isListening ? "paused-wave" : ""}`}
                  style={{ height: "100px" }}
                >
                  <div className="wave"></div>
                  <div className="wave"></div>
                  <div className="wave"></div>
                  <div className="wave"></div>
                  <div className="wave"></div>
                </div>

                <div className="text-center">
                  <button
                    type="button"
                    className="mic-circle border-0"
                    onClick={startListening}
                  >
                    MIC
                  </button>

                  <p className="mt-3 mb-1">
                    {isListening ? "Recording..." : "Click mic to start"}
                  </p>

                  <small className="text-warning">Auto stops after 15 sec</small>
                </div>

                <div className="d-flex justify-content-between mt-5">
                  <button
                    className="btn btn-outline-light"
                    onClick={previousQuestion}
                    disabled={currentIndex === 0}
                  >
                    Previous
                  </button>

                  <button className="btn btn-gradient" onClick={nextQuestion}>
                    {currentIndex === questions.length - 1 ? "Finish Interview" : "Next"}
                  </button>
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="app-card h-100">
                <h5 className="mb-4">Live Transcript</h5>

                <div
                  className="text-muted-soft"
                  style={{
                    height: "350px",
                    overflowY: "auto",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {transcript || "Your spoken answer will appear here..."}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default VoiceInterview;
