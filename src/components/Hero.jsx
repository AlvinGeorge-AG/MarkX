import React, { useEffect, useRef, useState } from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import { Link } from "react-router-dom";
import { Sparkles, TrendingUp, Users, Heart } from "lucide-react";
import { motion } from "framer-motion";
import TiltCard from "./TiltCard";
import "./Hero.css";

const Hero = ({
  image = "/image1.jpg",
  badgeText = "Content Creator",
  link = null,
  title = "🌼 Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
  description = "Quickly design and customize responsive mobile-first sites with Bootstrap, the world’s most popular front-end toolkit...",
  stats = ["2k view", "2k Engagement", "Brand Loyalty"],
  reverse = false
}) => {
  const heroRef = useRef(null);
  const [progress, setProgress] = useState(0);

  const iconMap = {
    "2k view": <TrendingUp size={16} className="icon-pulse" />,
    "2k Engagement": <Heart size={16} className="icon-pulse" />,
    "Brand Loyalty": <Users size={16} className="icon-pulse" />,
  };

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
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div 
      ref={heroRef} 
      className={`hero-container my-5`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className={`row align-items-center g-5 ${reverse ? "flex-row-reverse" : ""}`}>
        {/* Image with 3D Tilt */}
        <div className="col-12 col-md-6">
          <TiltCard>
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
          </TiltCard>
        </div>

        {/* Text */}
        <div className="col-12 col-md-6">
          <motion.h3 
            className="hero-title"
            initial={{ opacity: 0, x: reverse ? 30 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Sparkles className="icon-float" size={32} style={{ color: '#ff7ad9', marginRight: '10px' }} />
            {title.replace("🌼", "")}
          </motion.h3>

          <div className="d-flex flex-wrap gap-2 mb-3">
            {stats.map((stat, i) => (
              <motion.span 
                key={i} 
                className="tags"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + (i * 0.1) }}
              >
                {iconMap[stat] || <Sparkles size={16} />} {stat}
              </motion.span>
            ))}
          </div>

          <motion.p 
            className="text-start hero-description"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            {description}
          </motion.p>

          <div className="mt-3 progress-bar-wrapper">
            <ProgressBar
              now={progress}
              className="custom-progress"
              style={{ height: "6px", borderRadius: "10px" }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Hero;