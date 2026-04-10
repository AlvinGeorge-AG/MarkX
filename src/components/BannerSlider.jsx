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

const BannerSlider = ({ onAuditClick }) => {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  const handleSlideAction = (link) => {
    if (link === "/audit") {
      onAuditClick();
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
            style={{
              opacity: index === current ? 1 : 0,
              pointerEvents: index === current ? "auto" : "none",
              visibility: index === current ? "visible" : "hidden"
            }}
          >
            <h1>
              {slide.title}
              <span>{slide.highlight}</span>
              <br />
              {slide.subtitle}
            </h1>

            <button className="slide-btn" onClick={() => handleSlideAction(slide.link)}>
              {slide.button}
            </button>
          </div>
        ))}
      </section>

      {/* Repositioned Get Audit Section - "Under the page" */}
      <div className="insta-cta-section">
        <div className="container text-center">
            <button
            className="insta-btn magnet-btn"
            onClick={onAuditClick}
            >
            Get Audit Now ⚡
            </button>
        </div>
      </div>
    </>
  );
};

export default BannerSlider;
