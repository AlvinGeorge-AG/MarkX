import React from "react";
import "./Insight.css";
import Footer from "../components/Footer";

const Insight = () => {
  return (
    <>
    <div className="insight-page">

      <section className="insight-hero fade-in">
        <span className="insight-badge">Strategic Brand Intelligence</span>
        <h1>What is<span color="red"> MarkX Insight</span>?</h1>
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
       <marquee direction="left"><h2 className="section-title">How <span color="red">MarkX Insight</span> Works</h2></marquee>

        <div className="process-line">
          <div className="process-card slide-left">
            <span className="step" align="center">1</span>
            <h4>Understand the Brand</h4>
            <p>
              We analyze your tone, positioning,
              and emotional hooks.
            </p>
          </div>

          <div className="process-card slide-right">
            <span className="step"align="center">2</span>
            <h4>Audit Your Platform</h4>
            <p>
              Content types, posting habits,
              and performance clarity.
            </p>
          </div>

          <div className="process-card slide-left">
            <span className="step"align="center">3</span>
            <h4>Audience Behavior</h4>
            <p>
              Deep dive into what turns followers
              into loyal advocates.
            </p>
          </div>

          <div className="process-card slide-right">
            <span className="step"align="center">4</span>
            <h4>Recommend Levers</h4>
            <p>
              Clear growth recommendations —
              what to push and what to pause.
            </p>
          </div>
        </div>
      </section>

      <section className="features-section">
        <h2 className="section-title">Advanced Features</h2>

        <div className="features-grid">
          <div className="feature-card">⚡ Tailored Workflows</div>
          <div className="feature-card">👁 Custom Views</div>
          <div className="feature-card">🔍 Smart Filters</div>
          <div className="feature-card">⏱ Auto SLAs</div>
        </div>
      </section>

      <section className="cta-section zoom-in">
        <h2>Ready to Transform Your Brand Strategy?</h2>
        <p>
          Let MarkX Insight™ unlock the psychology behind
          your audience’s behavior and accelerate growth.
        </p>
       <button
  className="cta-button"
  onClick={() => window.location.href = "/contact"}
>
  Start Your Insight Journey
</button>

      </section>

    </div>
    <Footer />
    </>
  );
};

export default Insight;
