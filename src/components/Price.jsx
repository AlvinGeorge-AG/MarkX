import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import TiltCard from "./TiltCard";
import "./Price.css";

const plans = [
  {
    id: "launch-pad",
    title: "Launch Pad",
    subtitle: "Best for First-time Clients",
    price: "₹5,999",
    features: [
      "6 static/carousel posts",
      "1 reel",
      "Profile & bio optimization",
      "Hashtag & caption strategy",
    ],
  },
  {
    id: "growth-boost",
    title: "Growth Boost",
    subtitle: "Most Popular",
    price: "₹9,999",
    popular: true,
    features: [
      "10 posts",
      "3 reels",
      "Community engagement",
      "Content calendar & approval system",
    ],
  },
  {
    id: "scale-up-pro",
    title: "Scale Up Pro",
    subtitle: "Designed for Hustling Brands",
    price: "₹17,999",
    features: [
      "12 posts",
      "5 reels",
      "Ad budget management up to ₹5,000",
      "Influencer shortlisting & outreach",
    ],
  },
  {
    id: "dominate",
    title: "Dominate Plan",
    subtitle: "For High-Impact Brands",
    price: "₹29,999",
    features: [
      "15 posts",
      "8+ reels",
      "Paid ads setup & optimization",
      "360° growth execution",
    ],
  },
];

const Price = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-slide logic
  React.useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex, isPaused]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % plans.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + plans.length) % plans.length);
  };

  return (
    <section 
      className="pricing-section"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <motion.h1
        className="pricing-title"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Pricing
      </motion.h1>
      <motion.p
        className="pricing-subtitle"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
      >
        Simple pricing, serious growth. Upgrade to unlock full potential.
      </motion.p>

      <div className="pricing-slider-container">
        <button className="slider-arrow left" onClick={prevSlide} aria-label="Previous">
          <ChevronLeft size={32} />
        </button>

        <div className="slider-viewport">
          <motion.div
            className="slider-track"
            animate={{ x: `-${currentIndex * (100 / (window.innerWidth < 768 ? 1 : 3))}%` }}
            transition={{ type: "spring", stiffness: 180, damping: 25, mass: 1 }}
          >
            {plans.map((plan) => (
              <div key={plan.id} className="slider-item">
                <TiltCard>
                  <motion.div
                    className={`price-card ${plan.popular ? "popular" : ""}`}
                    onClick={() => navigate(`/pricing/${plan.id}`)}
                    whileHover={{ 
                      scale: 1.02, 
                      borderColor: "rgba(47, 124, 255, 1)",
                      boxShadow: "0 20px 60px rgba(47, 124, 255, 0.4)"
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  >
                    {plan.popular && <span className="badge">Most Popular</span>}

                    <h3>{plan.title}</h3>
                    <p className="plan-subtitle">{plan.subtitle}</p>

                    <div className="price">
                      {plan.price}
                      <span>/month</span>
                    </div>

                    <ul>
                      {plan.features.map((feature, i) => (
                        <li key={i}>✔ {feature}</li>
                      ))}
                    </ul>

                    <motion.button
                      className="choose-btn"
                      whileHover={{ scale: 1.05, background: "white", color: "black" }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Choose Plan
                    </motion.button>
                  </motion.div>
                </TiltCard>
              </div>
            ))}
          </motion.div>
        </div>

        <button className="slider-arrow right" onClick={nextSlide} aria-label="Next">
          <ChevronRight size={32} />
        </button>
      </div>

      <div className="slider-dots">
        {plans.map((_, i) => (
          <div
            key={i}
            className={`dot ${i === currentIndex ? "active" : ""}`}
            onClick={() => setCurrentIndex(i)}
          />
        ))}
      </div>
    </section>
  );
};

export default Price;


