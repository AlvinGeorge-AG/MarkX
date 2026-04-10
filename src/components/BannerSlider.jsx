import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./BannerSlider.css";

const slides = [
  {
    title: "Not Just Another ",
    highlight: "Agency.",
    subtitle: "We are a Growth System.",
    button: "Get Your Free Audit",
    link: "/contact",
  },
  {
    title: "We Build ",
    highlight: "Brands",
    subtitle: "That Scale Faster.",
    button: "Start Growing",
    link: "/insight",
  },
  {
    title: "Strategy. Design. ",
    highlight: "Growth.",
    subtitle: "Everything Under One Roof.",
    button: "Book a Call",
    link: "/contact",
  },
];

const BannerSlider = () => {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("Initializing AI...");
  const [error, setError] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!isLoading) return;
    const messages = [
      "📡 Connecting to Instagram...",
      "🔍 Scraping public metrics...",
      "🧠 Analyzing Brand Persona...",
      "🎯 Identifying Target Audience...",
      "🚀 Generating Growth Strategy...",
      "✨ Finalizing Report..."
    ];
    let i = 0;
    setLoadingText(messages[0]);
    const interval = setInterval(() => {
      i = (i + 1) % messages.length;
      setLoadingText(messages[i]);
    }, 2500);
    return () => clearInterval(interval);
  }, [isLoading]);

  const handleGetAudit = async () => {
    if (!username.trim()) return;
    setIsLoading(true);
    setError(null);

    try {
      //https://markx-backend-apify.onrender.com
      
      const response = await fetch("https://markx-backend-apify.onrender.com/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: username }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Failed to analyze profile.");
      }

      navigate("/report", { state: { auditResult: data } });
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsLoading(false);
    setError(null);
  };

  const handleSlideAction = (link) => {
    if (link === "/audit") {
      setIsModalOpen(true);
      return;
    }
    navigate(link);
  };

  return (
    <>
      <section className="hero">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`slide ${index === current ? "active" : ""}`}
          >
            <h1>
              {slide.title}
              <span>{slide.highlight}</span>
              <br />
              {slide.subtitle}
            </h1>

            <button style={{ color: "dark white" }} onClick={() => handleSlideAction(slide.link)}>
              {slide.button}
            </button>
          </div>
        ))}

        <div className="insta-cta">
          <button
            className="insta-btn"
            onClick={() => setIsModalOpen(true)}
          >
            Get Audit
          </button>
        </div>
      </section>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content slide-up">
            <button className="close-btn" onClick={handleCloseModal}>&times;</button>

            {!isLoading ? (
              <>
                <h2>Audit Your Profile</h2>
                <p>Enter your Instagram username to generate a comprehensive AI growth report.</p>
                <input
                  type="text"
                  placeholder="@username"
                  className="modal-input"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <button className="modal-submit-btn" onClick={handleGetAudit}>Generate Report 🚀</button>
                {error && <p className="error-text">{error}</p>}
              </>
            ) : (
              <div className="loading-state">
                <div className="spinner"></div>
                <h3>Processing Data...</h3>
                <p className="loading-text">{loadingText}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default BannerSlider;
