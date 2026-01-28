import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./BannerSlider.css";

const slides = [
  {
    title: "Not Just Another ",
    highlight: "Agency.",
    subtitle: "We're a Growth System.",
    button: "Get Your Free Audit",
    link: "/audit",
  },
  {
    title: "We Build ",
    highlight: "Brands",
    subtitle: "That Scale Faster.",
    button: "Start Growing",
    link: "/audit",
  },
  {
    title: "Strategy. Design. ",
    highlight: "Growth.",
    subtitle: "Everything Under One Roof.",
    button: "Book a Call",
    link: "/audit",
  },
];

const BannerSlider = () => {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return (
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

          <button style={{ color: "dark white" }} onClick={() => navigate(slide.link)}>
            {slide.button}
          </button>
        </div>
      ))}

      <div className="insta-cta">
        <button
          className="insta-btn"
          onClick={() => navigate("/audit")}
        >
          get audit
        </button>
      </div>
    </section>
  );
};

export default BannerSlider;
