import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UploadResume() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a resume");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("resume", file);

      const res = await axios.post(
        "http://localhost:5000/api/resumes/upload",
        formData
      );

      console.log("UPLOAD RESPONSE");
      console.log(res.data);

      const analysis = res.data.analysis;

      const questionArray =
        analysis.questions || [];

      const interviewRes = await axios.post(
        "http://localhost:5000/api/interview-session/create",
        {
          resumeText: res.data.resumeText,
          questions: questionArray,
        }
      );

      const resumeData = {
        name: analysis.name || "Not Found",
        email: analysis.email || "Not Found",
        phone: analysis.phone || "Not Found",
        github: analysis.github || "Not Found",
        linkedin: analysis.linkedin || "Not Found",
        role: analysis.role || "Not Found",
        score: analysis.score || 0,
        strengths: analysis.strengths || [],
        weaknesses: analysis.weaknesses || [],
        suggestions: analysis.suggestions || [],
      };

      console.log("RESUME DATA SENT");
      console.log(resumeData);

      localStorage.setItem(
        "resumeData",
        JSON.stringify(resumeData)
      );

      navigate("/resume-analysis", {
        state: {
          questions: questionArray,
          interviewId:
            interviewRes.data.interviewId,
          resumeData,
        },
      });
    } catch (error) {
      console.error(error);
      alert("Upload Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="app-page">
      <div className="section-shell">
        <div className="hero-glass">

          <div className="row g-4 align-items-center">

            <div className="col-lg-6">

              <p className="eyebrow">
                Resume First Workflow
              </p>

              <h1 className="page-title">
                Upload Your Resume
              </h1>

              <p className="mt-3 fs-5 text-muted-soft">
                Upload your resume and receive
                AI-powered analysis, strengths,
                weaknesses, suggestions and
                personalized interview questions.
              </p>

            </div>

            <div className="col-lg-6">

              <div className="app-card">

                <h4 className="mb-3">
                  Resume PDF
                </h4>

                <input
                  type="file"
                  accept=".pdf"
                  className="form-control mb-4"
                  onChange={(e) =>
                    setFile(e.target.files[0])
                  }
                />

                {file && (
                  <p className="small text-muted-soft">
                    Selected: {file.name}
                  </p>
                )}

                <button
                  className="btn btn-gradient btn-lg w-100"
                  onClick={handleUpload}
                  disabled={loading}
                >
                  {loading
                    ? "Analyzing Resume..."
                    : "Analyze Resume"}
                </button>

              </div>

            </div>

          </div>

        </div>
      </div>
    </main>
  );
}

export default UploadResume;