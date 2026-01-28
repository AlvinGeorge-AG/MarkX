import { Link } from "react-router-dom";
import "./SecondBanner.css";

const SecondBanner = () => {
  return (
    <section className="second-banner">
      <h2>
        <marquee direction="left">Why We're <span className="markx-span">Different?</span></marquee>
      </h2>

      <p className="subtitle">
        We don't follow trends. We create them using data-driven insights and
        proven psychology.
      </p>

      <div className="card-container">
        <Link to="/ai-psychology" className="card">
          <div className="icon">⚡</div>
          <h3>AI + Psychology Engine</h3>
          <p>
            We don't guess. We audit, analyze, and scale using audience behavior
            and growth science.
          </p>
        </Link>

        <Link to="/audience-strategy" className="card active">
          <div className="icon">👁️</div>
          <h3>Audience-First Strategy</h3>
          <p>
            Your growth isn't based on trends — it's built from what your
            audience actually wants.
          </p>
        </Link>

        <Link to="/content-system" className="card">
          <div className="icon">🧠</div>
          <h3>Smart Content System</h3>
          <p>
            Every caption, post, and plan is rooted in brand psychology and
            systemized storytelling.
          </p>
        </Link>
      </div>
    </section>
  );
};

export default SecondBanner;
