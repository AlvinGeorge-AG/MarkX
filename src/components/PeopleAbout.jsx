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
    wordsForMarkX:
      "MarkX is a next-generation marketing intelligence company building AI-driven systems that turn data, psychology, and creativity into scalable brand growth. Our vision is to redefine how the world markets—replacing guesswork with intelligence and empowering brands, creators, and businesses to grow smarter,faster, and globally.",
    highlight: true
  },
  {
    name: "Yashika Pandita",
    role: "COO, MarkX",
    image: CoFounder,
    about:
      "Yashika Pandita leads operations, execution strategy, and structural growth at MarkX.",
    wordsForMarkX:
      "MarkX is a future-focused marketing intelligence company where strategy, data, and AI come together to drive meaningful brand growth.Our vision is to build a scalable global ecosystem that transforms marketing from manual execution into intelligent, insight led decision-making for businesses of every size.",
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
              {person.wordsForMarkX && (
                <>
                  <h3 className="words-title">Words for MarkX:</h3>
                  <p>{person.wordsForMarkX}</p>
                </>
              )}
            </div>

          </div>
        </div>
      ))}
    </div>

  </section>
);

};

export default PeopleAbout;
