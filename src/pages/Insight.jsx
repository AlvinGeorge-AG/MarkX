import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Insight.css";
import Footer from "../components/Footer";
import { Zap, Eye, Search, Clock } from "lucide-react";

const Insight = () => {
  const navigate = useNavigate();

  // --- STATE MANAGEMENT ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("Initializing AI...");
  const [error, setError] = useState(null);

  // --- LOADING ANIMATION ---
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

  // --- API CALL ---
  const handleGetAudit = async () => {
    if (!username.trim()) return;
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("https://markx-backend-apify.onrender.com/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: username }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Failed to analyze profile.");
      }

      // ✅ NAVIGATE TO NEW PAGE WITH DATA
      navigate("/report", { state: { auditResult: data } });

    } catch (err) {
      setError(err.message);
      setIsLoading(false); // Stop loading only on error
    }
  };

  return (
    <>
      {/* WRAPPER DIV for Blur Effect */}
      <div className={`insight-page ${isModalOpen ? "blur-background" : ""}`}>

        <section className="insight-hero fade-in">
          <span className="insight-badge">Strategic Brand Intelligence</span>
          <h1>What is<span style={{ background: "linear-gradient(45deg, #f09433, #fd5949, #d6249f, #285AEB)", backgroundSize: "200% auto", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent", display: "inline-block" }}> MarkX Insight</span>?</h1>
          <p>
            A strategic brand-auditing tool powered by psychology and performance logic.
            <br />
            It’s not just about what works — it’s about understanding
            <strong> why your audience responds</strong>.
          </p>
        </section>

        <section className="audience-card slide-up">
          <h2>Audience-First Strategy</h2>
          <p>
            Most audits look at reach, likes, and trends.
            MarkX Insight flips that.
            We start with what your audience actually wants —
            then reverse-engineer your content, offer, and ecosystem.
          </p>
        </section>

        <section className="modules-section">
          <h2 className="section-title">Core Modules</h2>

          <div className="modules-grid">
            <div className="module-card slide-left">
              <h3> Brand Psychology</h3>
              <p>
                Analyze your voice, vibe, and values —
                then align them with audience triggers.
              </p>
            </div>

            <div className="module-card slide-right">
              <h3> Content & Platform Audit</h3>
              <p>
                Review formats, posting frequency,
                analytics, and platform strategy.
              </p>
            </div>

            <div className="module-card slide-left">
              <h3> Audience Deep Dive</h3>
              <p>
                Study who your followers are,
                what they respond to, and what builds loyalty.
              </p>
            </div>

            <div className="module-card slide-right">
              <h3> Growth Lever Mapping</h3>
              <p>
                Identify what’s actually worth scaling —
                based on your real goals.
              </p>
            </div>
          </div>
        </section>

        <section className="process-section">
          <marquee direction="left">
            <h2 className="section-title">How <span style={{ color: "red" }}>MarkX Insight</span> Works</h2>
          </marquee>

          <div className="process-line">
            <div className="process-card slide-left">
              <span className="step" align="center">1</span>
              <h4>Understand the Brand</h4>
              <p>We analyze your tone, positioning, and emotional hooks.</p>
            </div>

            <div className="process-card slide-right">
              <span className="step" align="center">2</span>
              <h4>Audit Your Platform</h4>
              <p>Content types, posting habits, and performance clarity.</p>
            </div>

            <div className="process-card slide-left">
              <span className="step" align="center">3</span>
              <h4>Audience Behavior</h4>
              <p>Deep dive into what turns followers into loyal advocates.</p>
            </div>

            <div className="process-card slide-right">
              <span className="step" align="center">4</span>
              <h4>Recommend Levers</h4>
              <p>Clear growth recommendations — what to push and what to pause.</p>
            </div>
          </div>
        </section>

        <section className="features-section">
          <h2 className="section-title">Advanced Features</h2>
          <div className="features-grid">
            <div className="feature-card"><Zap size={20} className="feature-icon" /> Tailored Workflows</div>
            <div className="feature-card"><Eye size={20} className="feature-icon" /> Custom Views</div>
            <div className="feature-card"><Search size={20} className="feature-icon" /> Smart Filters</div>
            <div className="feature-card"><Clock size={20} className="feature-icon" /> Auto SLAs</div>
          </div>
        </section>

        <section className="cta-section zoom-in">
          <h2>Ready to Transform Your Brand Strategy?</h2>
          <p>
            Let MarkX Insight™ unlock the psychology behind
            your audience’s behavior and accelerate growth.
          </p>
          {/* ✅ FIXED: Opens the Modal instead of redirecting to contact */}
          <button
            className="cta-button"
            onClick={() => setIsModalOpen(true)}
          >
            Start Your Insight Journey
          </button>
        </section>

      </div>
      <Footer />

      {/* --- MODAL OVERLAY (THE MISSING PART) --- */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content slide-up">
            <button className="close-btn" onClick={() => setIsModalOpen(false)}>&times;</button>

            {/* INPUT STATE */}
            {!isLoading ? (
              <>
                <h2>Audit Your Profile</h2>
                <p style={{ marginBottom: "20px", color: "#ccc" }}>Enter your Instagram username to generate a comprehensive AI growth report.</p>
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
              /* LOADING STATE */
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

export default Insight;