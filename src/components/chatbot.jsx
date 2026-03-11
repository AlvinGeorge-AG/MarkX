import React, { useState, useRef } from "react";
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

const ChatBot = () => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragInfo = useRef({ startX: 0, startY: 0, initialX: 0, initialY: 0, isDragging: false });

  const handlePointerDown = (e) => {
    e.target.setPointerCapture(e.pointerId);
    dragInfo.current = {
      startX: e.clientX,
      startY: e.clientY,
      initialX: position.x,
      initialY: position.y,
      isDragging: false,
    };
  };

  const handlePointerMove = (e) => {
    if (!e.target.hasPointerCapture(e.pointerId)) return;
    
    const dx = e.clientX - dragInfo.current.startX;
    const dy = e.clientY - dragInfo.current.startY;
    
    if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
      dragInfo.current.isDragging = true;
      setIsDragging(true);
    }

    if (dragInfo.current.isDragging) {
      setPosition({
        x: dragInfo.current.initialX + dx,
        y: dragInfo.current.initialY + dy
      });
    }
  };

  const handlePointerUp = (e) => {
    e.target.releasePointerCapture(e.pointerId);
    if (!dragInfo.current.isDragging) {
      setOpen(!open);
    }
    setIsDragging(false);
    dragInfo.current.isDragging = false;
  };

  return (
    <>
      <div 
        className={`bot-float ${isDragging ? "dragging" : ""}`} 
        style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <div className="bot-icon-wrapper" style={{ pointerEvents: "none" }}>
          <div className="bot-pulse-1"></div>
          <div className="bot-pulse-2"></div>
          <img src={bot} alt="MarkX Bot" />
        </div>
      </div>


      {open && (
        <div className="bot-chat">
          <div className="bot-header">
            MarkX
            <span onClick={() => setOpen(false)}>×</span>
          </div>

          <div className="bot-body">
            {!active && (
              <>
                <p className="bot-hint">Ask me anything 👇</p>
                {faqs.map((item, i) => (
                  <div
                    key={i}
                    className="bot-question"
                    onClick={() => setActive(item)}
                  >
                    {item.q}
                  </div>
                ))}
              </>
            )}

            {active && (
              <>
                <div className="bot-answer">{active.a}</div>
                <button className="bot-back" onClick={() => setActive(null)}>
                  ← Back
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
