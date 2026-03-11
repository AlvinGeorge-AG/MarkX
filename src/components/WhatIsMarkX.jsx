import "./WhatIsMarkX.css";
import { Gift, Sparkles, Percent } from "lucide-react";

const WhatIsMarkX = () => {
  return (
    <section className="markx-section">

      <div className="markx-header">
        <h2>
        <marquee direction="left">What is <span className="markx-span">MarkX?</span></marquee>
        </h2>
        <p className="tagline">
          A Strategic Revolution in Modern Marketing.
        </p>
      </div>

      <div className="highlight-quote">
        <p>
          “<span className="markx-span">MarkX</span> — the world’s first agency with an in-house AI Instagram
          Marketing Expert.”
        </p>
      </div>

      <div className="stats-container">
        <div className="stat-card">
          <h3>200+</h3>
          <p>Clients Globally</p>
        </div>

        <div className="stat-card">
          <h3>AI</h3>
          <p>Powered Solutions</p>
        </div>

        <div className="stat-card">
          <h3>24 X 7</h3>
          <p>Marketing Expert</p>
        </div>
      </div>

      <div className="origin">
        <h3>The Origin of <span>MarkX</span></h3>
        <p className="origin-text">
          <span className="markx-span">MarkX</span> was born out of a simple but powerful belief:
        </p>

        <div className="origin-quote">
          <p>
            “In the digital world, attention is cheap — but influence is earned.”
          </p>
        </div>
      </div>

      <div className="difference">
        <h2>What Makes <span className="markx-span">MarkX</span> Different?</h2>

        <div className="difference-grid">
          <div className="diff-card diff-left">
            <h4>Most Agencies</h4>
            <ul>
              <li>Focus on volume</li>
              <li>Sell services</li>
              <li>Trend-chasing</li>
              <li>Rigid packages</li>
              <li>Metrics-first</li>
            </ul>
          </div>

          <div className="diff-card diff-right">
            <h4><span className="markx-span">MarkX</span></h4>
            <ul>
              <li>Focus on value + impact</li>
              <li>Build marketing systems</li>
              <li>Psychology + UGC first</li>
              <li>Custom scalable frameworks</li>
              <li>Emotion + retention first</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="offers">
        <h2>Offers & <span>Perks</span></h2>
        <p className="offers-sub">
          Exclusive benefits and seasonal promotions for our valued clients
        </p>

        <div className="offers-grid">
          <div className="offer-card">
            <span className="badge new">New Client</span>
            <div className="offer-icon"><Gift size={42} /></div>
            <h4>Free first audit for all new clients</h4>
            <p>Complete strategy review</p>
          </div>

          <div className="offer-card">
            <span className="badge seasonal">Seasonal</span>
            <div className="offer-icon"><Sparkles size={42} /></div>
            <h4>Seasonal campaigns & festival drops</h4>
            <p>Diwali, month-end & launch focused marketing</p>
          </div>

          <div className="offer-card">
            <span className="badge save">Save 10%</span>
            <div className="offer-icon"><Percent size={42} /></div>
            <h4>10% off your first service</h4>
            <p>Exclusive first-time discount</p>
          </div>
        </div>
      </div>

    </section>
  );
};

export default WhatIsMarkX;
