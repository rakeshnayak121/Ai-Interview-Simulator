
import ReportPreview from "./pages/ReportPreview";
import InterviewHistory from "./pages/InterviewHistory";
import Results from "./pages/Results";
import Dashboard from "./pages/Dashboard";
import AIFollowUp from "./pages/AIFollowUp";
import VoiceInterview from "./pages/VoiceInterview";
import SelectInterview from "./pages/SelectInterview";
import ResumeAnalysis from "./pages/ResumeAnalysis";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import UploadResume from "./pages/UploadResume";
import Interview from "./pages/Interview";
import Result from "./pages/Result";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
       <Navbar />
      <Routes>
       
        <Route
  path="/history"
  element={
    <InterviewHistory />
  }
/>
        <Route path="/report" element={<ReportPreview />} />
        <Route path="/history" element={<InterviewHistory />} />
        <Route path="/results" element={<Results />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/ai-followup" element={<AIFollowUp />} />
        <Route path="/voice-interview" element={<VoiceInterview />} />
        <Route path="/select-interview" element={<SelectInterview />} />
        <Route path="/resume-analysis" element={<ResumeAnalysis />} />
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<UploadResume />} />
        <Route path="/interview" element={<Interview />} />
        <Route path="/result" element={<Result />} />
      </Routes>
        <Footer />
    </BrowserRouter>
  );
}

export default App;
