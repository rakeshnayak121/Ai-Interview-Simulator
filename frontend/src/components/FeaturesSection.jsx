import { useNavigate } from "react-router-dom";

function FeaturesSection() {
  const navigate = useNavigate();

  const features = [
    {
      title: "Resume Analysis",
      icon: "CV",
      desc: "AI-powered resume scoring and feedback",
      route: "/resume-analysis",
    },
    {
      title: "Interview Selection",
      icon: "RL",
      desc: "Choose your target interview role",
      route: "/select-interview",
    },
    {
      title: "Voice Interview",
      icon: "VC",
      desc: "Practice with voice-based interviews",
      route: "/voice-interview",
    },
    {
      title: "AI Follow-Up Questions",
      icon: "AI",
      desc: "Dynamic follow-up questions during practice",
      route: "/ai-followup",
    },
    {
      title: "Live Dashboard",
      icon: "DB",
      desc: "Track progress and interview score",
      route: "/dashboard",
    },
    {
      title: "Final Results",
      icon: "RS",
      desc: "Detailed interview performance report",
      route: "/results",
    },
    {
      title: "Interview History",
      icon: "HS",
      desc: "View previous interviews and scores",
      route: "/history",
    },
    {
      title: "PDF Reports",
      icon: "PDF",
      desc: "Preview professional interview reports",
      route: "/report",
    },
    {
      title: "AI Career Coach",
      icon: "CC",
      desc: "Guidance for the next skill to improve",
      route: "/dashboard",
    },
  ];

  return (
    <section className="section-shell pb-5">
      <div className="hero-glass">
        <p className="eyebrow text-center">Platform tools</p>

        <h2 className="page-title text-center mb-2">
          Explore Platform Features
        </h2>

        <p className="text-center text-muted-soft mb-5">
          Everything you need to prepare, practice, and improve.
        </p>

        <div className="row g-4">
          {features.map((feature) => (
            <div key={feature.title} className="col-md-6 col-lg-4">
              <button
                type="button"
                className="feature-card text-center w-100"
                onClick={() => navigate(feature.route)}
              >
                <div className="icon-badge mx-auto mb-3">{feature.icon}</div>
                <h5>{feature.title}</h5>
                <p className="text-muted-soft mb-0">{feature.desc}</p>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;
