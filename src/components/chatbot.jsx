import React, { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import "./chatbot.css";
import bot from "../assets/markx-bot.png";

const faqs = [
  {
    q: "What is MarkX?",
    a: "MarkX is a new-age creative marketing agency helping brands, influencers, and startups grow through content, storytelling, influencer marketing, and AI-driven insights."
  },
  {
    q: "What services do you offer?",
    a: "We offer social media content, influencer & UGC campaigns, paid ads, brand positioning, and AI-powered audits & strategy systems."
  },
  {
    q: "Who are your services for?",
    a: "We work with beauty & fashion brands, creators, D2C startups, and local businesses looking to scale digitally."
  },
  {
    q: "Why should I choose MarkX?",
    a: "Founder-led execution, startup-friendly pricing, AI-powered systems, creator-first mindset, and global delivery with Indian roots."
  },
  {
    q: "What makes MarkX different?",
    a: "We’re building a creator + brand ecosystem that makes agency-level growth accessible worldwide."
  },
  {
    q: "How does pricing work?",
    a: "We offer 4 transparent plans from ₹5,999 to ₹29,999/month, with custom options available."
  },
  {
    q: "Can I book a free consultation?",
    a: "Yes! We offer a free Instagram audit or a 15-minute strategy call for every potential client."
  },
  {
    q: "Where is your team based?",
    a: "Our core team is based in India, working globally with remote collaborators."
  },
  {
    q: "Can students or freelancers work with MarkX?",
    a: "Yes! We offer internships and collaborations in content, sales, design, video, strategy, and AI automation."
  },
  {
    q: "How can I contact MarkX?",
    a: "Email: markxoffice@gmail.com | Instagram | LinkedIn | or via the Contact page."
  }
];

const ChatBot = ({ onAuditClick }) => {
  const [open, setOpen] = useState(false);
  const [menuType, setMenuType] = useState(null);
  const [active, setActive] = useState(null);

  // Motion values for tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [15, -15]));
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-15, 15]));

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set(clientX - innerWidth / 2);
    mouseY.set(clientY - innerHeight / 2);
  };

  React.useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      <motion.div 
        className="bot-group"
        drag
        dragMomentum={false}
        initial={{ y: 0 }}
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      >
        <motion.div 
          className="bot-qn-btn"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => { setMenuType("qn"); setOpen(true); }}
        >
          Q & N
        </motion.div>

        <motion.div 
          className="bot-float"
          whileHover={{ scale: 1.1, rotateZ: 5 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => { setMenuType("audit"); setOpen(true); }}
        >
          <div className="bot-icon-wrapper" style={{ pointerEvents: "none" }}>
            <div className="bot-pulse-1"></div>
            <div className="bot-pulse-2"></div>
            <img src={bot} alt="MarkX Bot" style={{ transform: "translateZ(20px)" }} />
          </div>
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.div 
            className="bot-chat"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
          >
            <div className="bot-header">
              {menuType === "qn" ? "Q & N" : "Free Audit"}
              <span onClick={() => { setOpen(false); setActive(null); }}>×</span>
            </div>

            <div className="bot-body">
              {menuType === "qn" ? (
                <>
                  {!active && (
                    <>
                      <p className="bot-hint">Frequently Asked Questions 👇</p>
                      {faqs.map((item, i) => (
                        <motion.div
                          key={i}
                          className="bot-question"
                          whileHover={{ x: 10, backgroundColor: "rgba(100, 108, 255, 0.1)" }}
                          onClick={() => setActive(item)}
                        >
                          {item.q}
                        </motion.div>
                      ))}
                    </>
                  )}

                  {active && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                    >
                      <div className="bot-answer">{active.a}</div>
                      <button className="bot-back" onClick={() => setActive(null)}>
                        ← Back
                      </button>
                    </motion.div>
                  )}
                </>
              ) : (
                <div className="bot-audit-content">
                  <h3>Get Your Free Content Audit! 🚀</h3>
                  <p>Want to scale your brand? Our experts will analyze your Instagram/Website and provide a personalized strategy.</p>
                  <motion.div 
                    className="bot-audit-action magnet-btn" 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onAuditClick}
                  >
                    Get Audit Now ⚡
                  </motion.div>
                  <p className="bot-hint" style={{ marginTop: '15px' }}>Average response time: 2-4 hours</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;

