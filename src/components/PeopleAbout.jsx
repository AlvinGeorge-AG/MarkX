import React, { useState, useEffect } from "react";
import "./PeopleAbout.css";
import Founder from "../assets/founder.jpeg";
import CoFounder from "../assets/ceo.jpeg";

const people = [
  {
    name: "Shubhrajyoti Adhikary",
    role: "Founder and CEO, MarkX",
    image: Founder,
    about:
      "Shubhrajyoti Adhikary is a multifaceted AI-driven digital and performance marketing strategist and visionary founder of MarkX.",
    highlight: true
  },
  {
    name: "Yashika Pandita",
    role: "COO, MarkX",
    image: CoFounder,
    about:
      "Yashika Pandita leads operations, execution strategy, and structural growth at MarkX.",
    highlight: false
  }
];

const PeopleAbout = () => {
  const [current, setCurrent] = useState(0);

  // Auto Slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % people.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

 return (
  <section className="people-section">
<p></p>
<p></p>
<p></p>
<p></p>
    {/* ===== SECTION HEADING ===== */}
    <div className="people-section-header">
      <h2 className="people-heading">The Minds Behind MarkX</h2>
      <p className="people-subheading">
        Strategy, creativity, psychology — combined into one growth engine.
      </p>
    </div>

    {/* ===== SLIDER ===== */}
    <div className="slider-wrapper">
      {people.map((person, index) => (
        <div
          key={index}
          className={`founder-id-card ${
            index === current ? "active" : "inactive"
          }`}
        >
          {/* LEFT VERTICAL ROLE */}
          <div className="vertical-text">
            {person.highlight ? "FOUNDER" : "COO"}
          </div>

          {/* MAIN CARD CONTENT */}
          <div className="card-main">

            <div className="top-info">
              <h2>{person.name}</h2>
              <h4>{person.role}</h4>
            </div>

            <div className="photo-container">
              <div className="photo-glow-ring"></div>
              <div className="photo-glow-ring-2"></div>
              <div className="photo-wrapper">
                <img src={person.image} alt={person.name} />
              </div>
            </div>

            <div className="about-section">
              <h3>About:</h3>
              <p>{person.about}</p>
            </div>

          </div>
        </div>
      ))}
    </div>

  </section>
);

};

export default PeopleAbout;
