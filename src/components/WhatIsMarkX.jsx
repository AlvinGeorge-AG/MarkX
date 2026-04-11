import { motion } from "framer-motion";
import { Gift, Sparkles, Percent, Zap, Target, Heart, Award, Shield, Globe } from "lucide-react";
import TiltCard from "./TiltCard";
import "./WhatIsMarkX.css";

const WhatIsMarkX = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="markx-section">
      <div className="markx-header">
        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <marquee direction="left">What is <span className="markx-span">MarkX?</span></marquee>
        </motion.h2>
        <motion.p 
          className="tagline"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          A Strategic Revolution in Modern Marketing.
        </motion.p>
      </div>

      <motion.div 
        className="highlight-quote"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ type: "spring", damping: 15 }}
      >
        <p>
          “<span className="markx-span">MarkX</span> — the world’s first agency with an in-house AI Instagram
          Marketing Expert.”
        </p>
      </motion.div>

      <motion.div 
        className="stats-container"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.div variants={itemVariants}>
          <TiltCard>
            <div className="stat-card">
              <Award className="icon-pulse mb-2" size={32} style={{ color: '#ffcc00' }} />
              <h3>200+</h3>
              <p>Clients Globally</p>
            </div>
          </TiltCard>
        </motion.div>

        <motion.div variants={itemVariants}>
          <TiltCard>
            <div className="stat-card">
              <Zap className="icon-float mb-2" size={32} style={{ color: '#00ccff' }} />
              <h3>AI</h3>
              <p>Powered Solutions</p>
            </div>
          </TiltCard>
        </motion.div>

        <motion.div variants={itemVariants}>
          <TiltCard>
            <div className="stat-card">
              <Globe className="icon-rotate mb-2" size={32} style={{ color: '#ff7ad9' }} />
              <h3>24 X 7</h3>
              <p>Marketing Expert</p>
            </div>
          </TiltCard>
        </motion.div>
      </motion.div>

      <div className="origin">
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          The Origin of <span>MarkX</span>
        </motion.h3>
        <motion.p 
          className="origin-text"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <span className="markx-span">MarkX</span> was born out of a simple but powerful belief:
        </motion.p>

        <motion.div 
          className="origin-quote"
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
        >
          <p>
            “In the digital world, attention is cheap — but influence is earned.”
          </p>
        </motion.div>
      </div>

      <div className="difference">
        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          What Makes <span className="markx-span">MarkX</span> Different?
        </motion.h2>

        <motion.div 
          className="difference-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={itemVariants} className="w-100">
            <TiltCard>
              <div className="diff-card diff-left">
                <Shield className="icon-float mb-2" size={28} />
                <h4>Most Agencies</h4>
                <ul>
                  <li>Focus on volume</li>
                  <li>Sell services</li>
                  <li>Trend-chasing</li>
                  <li>Rigid packages</li>
                  <li>Metrics-first</li>
                </ul>
              </div>
            </TiltCard>
          </motion.div>

          <motion.div variants={itemVariants} className="w-100">
            <TiltCard>
              <div className="diff-card diff-right">
                <Target className="icon-pulse mb-2" size={28} />
                <h4><span className="markx-span">MarkX</span></h4>
                <ul>
                  <li>Focus on value + impact</li>
                  <li>Build marketing systems</li>
                  <li>Psychology + UGC first</li>
                  <li>Custom scalable frameworks</li>
                  <li>Emotion + retention first</li>
                </ul>
              </div>
            </TiltCard>
          </motion.div>
        </motion.div>
      </div>

      <div className="offers">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Offers & <span>Perks</span>
        </motion.h2>
        <motion.p 
          className="offers-sub"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Exclusive benefits and seasonal promotions for our valued clients
        </motion.p>

        <motion.div 
          className="offers-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={itemVariants}>
            <TiltCard>
              <div className="offer-card">
                <span className="badge new">New Client</span>
                <div className="offer-icon"><Gift className="icon-float" size={42} /></div>
                <h4>Free first audit for all new clients</h4>
                <p>Complete strategy review</p>
              </div>
            </TiltCard>
          </motion.div>

          <motion.div variants={itemVariants}>
            <TiltCard>
              <div className="offer-card">
                <span className="badge seasonal">Seasonal</span>
                <div className="offer-icon"><Sparkles className="icon-pulse" size={42} /></div>
                <h4>Seasonal campaigns & festival drops</h4>
                <p>Diwali, month-end & launch focused marketing</p>
              </div>
            </TiltCard>
          </motion.div>

          <motion.div variants={itemVariants}>
            <TiltCard>
              <div className="offer-card">
                <span className="badge save">Save 10%</span>
                <div className="offer-icon"><Percent className="icon-float" size={42} /></div>
                <h4>10% off your first service</h4>
                <p>Exclusive first-time discount</p>
              </div>
            </TiltCard>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhatIsMarkX;

