import React, { useEffect, useRef, useState } from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import { Link } from "react-router-dom";
import "./Hero.css";

const Hero = ({
  image = "/image1.jpg",
  badgeText = "Content Creator",
  link = null,
  title = "🌼 Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
  description = "Quickly design and customize responsive mobile-first sites with Bootstrap, the world’s most popular front-end toolkit...",
  stats = ["2k view", "2k Engagement", "Brand Loyalty"],
  reverse = false // for Hero2 layout
}) => {
  const heroRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      let percent = ((windowHeight - rect.top) / (windowHeight + rect.height)) * 100;
      percent = Math.min(Math.max(percent, 0), 100);
      setProgress(percent);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // initialize
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={heroRef} className={`hero-container fade-in my-5`}>
      <div className={`row align-items-start g-5 ${reverse ? "flex-row-reverse" : ""}`}>
        {/* Image */}
        <div className="col-12 col-md-6">
          <div className="hero-image-wrapper position-relative">
            {link ? (
              <Link to={link}>
                <img src={image} className="img-fluid rounded-3 shadow-lg w-100" alt="Hero" />
                <span className="hero-badge">{badgeText}</span>
              </Link>
            ) : (
              <>
                <img src={image} className="img-fluid rounded-3 shadow-lg w-100" alt="Hero" />
                <span className="hero-badge">{badgeText}</span>
              </>
            )}
          </div>
        </div>

        {/* Text */}
        <div className="col-12 col-md-6">
          <h3 className="hero-title">{title}</h3>

          <div className="d-flex flex-wrap gap-2 mb-3">
            {stats.map((stat, i) => (
              <span key={i} className="tags">{stat}</span>
            ))}
          </div>

          <p className="text-start hero-description">{description}</p>

          <div className="mt-3 progress-bar-wrapper">
            <ProgressBar
              now={progress}
              className="custom-progress"
              style={{ height: "6px", borderRadius: "10px" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;