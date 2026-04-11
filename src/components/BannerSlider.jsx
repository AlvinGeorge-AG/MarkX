import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
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
    }, 4500);

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
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 1.1, rotateX: 10 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            exit={{ opacity: 0, scale: 0.95, rotateX: -10 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="slide active"
          >
            <motion.h1
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              {slides[current].title}
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                {slides[current].highlight}
              </motion.span>
              <br />
              <motion.span
                className="subtitle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                {slides[current].subtitle}
              </motion.span>
            </motion.h1>

            <motion.button
              whileHover={{ scale: 1.1, boxShadow: "0 0 20px rgba(100, 108, 255, 0.4)" }}
              whileTap={{ scale: 0.9 }}
              className="slide-btn"
              onClick={() => handleSlideAction(slides[current].link)}
            >
              {slides[current].button}
            </motion.button>
          </motion.div>
        </AnimatePresence>
      </section>

      <motion.div 
        className="insta-cta-section"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="container text-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="insta-btn magnet-btn"
              onClick={onAuditClick}
            >
            Get Audit Now ⚡
            </motion.button>
        </div>
      </motion.div>
    </>
  );
};

export default BannerSlider;

