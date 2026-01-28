import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import this
import "./contactus.css";
import Footer from "../components/Footer";
import logo from "../assets/logo2.png";

const ContactUs = () => {
  const navigate = useNavigate(); // ✅ Initialize navigation

  // --- STATE ---
  const [showModal, setShowModal] = useState(false);
  const [animate, setAnimate] = useState(false);

  // Form States
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSending, setIsSending] = useState(false);
  const [statusMsg, setStatusMsg] = useState(null); // { type: 'success'|'error', text: '' }

  // --- ANIMATION EFFECT ---
  useEffect(() => {
    setAnimate(false);
    const timer = setTimeout(() => {
      setAnimate(true);
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  // --- HANDLE INPUT CHANGE ---
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // --- HANDLE FORM SUBMIT ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);
    setStatusMsg(null);

    try {
      // ✅ Replace with your actual Render URL
      const response = await fetch("https://markx-backend-apify.onrender.com/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to send message.");
      }

      // Success
      setStatusMsg({ type: "success", text: "Message sent successfully! ✅" });
      setFormData({ name: "", email: "", message: "" }); // Clear form

      // Close modal automatically after 2 seconds
      setTimeout(() => {
        setShowModal(false);
        setStatusMsg(null);
      }, 2000);

    } catch (error) {
      console.error(error);
      setStatusMsg({ type: "error", text: "Something went wrong. Try again. ❌" });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
      <div className="contact-page">
        <div className="container py-5">
          {/* Header */}
          <div className={`text-center mb-5 fade-up ${animate && "show"}`}>
            <h1 className="title sty1">Contact</h1>
            <p className="subtitle">Let’s create something amazing together</p>
          </div>

          <div className="row g-5 align-items-start">
            {/* Left */}
            <div className={`col-md-6 slide-left ${animate && "show"}`}>
              <h1 className="title sty2">MarkX</h1>
              <p className="brand-text">
                We’re not just another marketing agency.
                MarkX engineers growth systems with creativity, strategy, and soul.
              </p>

              <div className="contact-info">
                <p><strong>Email:</strong> markxoffice@gmail.com</p>
                <button className="email-btn" onClick={() => setShowModal(true)}>
                  Send Email →
                </button>
                <button
                  className="cta-button"
                  onClick={() => navigate("/audit")}
                >
                  Get Audit
                </button>
              </div>
            </div>

            {/* Right */}
            <div className={`col-md-6 slide-right ${animate && "show"}`}>
              <div className="service-card profile-card">
                <img src={logo} alt="MarkX" className="profile-image" />
                <h3 className="profile-name">MarkX </h3>
                <p className="profile-text">
                  We’re not just another marketing agency.
                  MarkX engineers growth systems with creativity, strategy, and soul.
                </p>
                <div className="profile-links">
                  <a
                    href="https://www.instagram.com/markxofficial?igsh=MTdrZDFieXZpNjk3Mw=="
                    target="_blank"
                    rel="noreferrer"
                    className="social-icon instagram"
                  >
                    📸
                  </a>

                  <a
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=markxoffice@gmail.com"
                    className="social-icon gmail"
                  >
                    ✉️
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className={`service-card bottom-hero my-5 text-center fade-up ${animate && "show"}`} >
            <h2>Ready to Transform Your Brand?</h2>
            <p>Join the next generation of brands that are redefining digital market</p>
            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=markxoffice@gmail.com"><button><span className="sty1">Start Your Journey →</span></button></a>
          </div>
        </div>

        {/* --- MODAL --- */}
        {showModal && (
          <div className="modal-overlay" onClick={() => setShowModal(false)}>
            <div className="modal-box" onClick={(e) => e.stopPropagation()}>
              <button className="close-btn" onClick={() => setShowModal(false)}>×</button>

              <h2>Send us a message</h2>

              <form className="email-form" onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <textarea
                  name="message"
                  rows="4"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />

                <button type="submit" disabled={isSending}>
                  {isSending ? "Sending..." : "Send Message"}
                </button>

                {/* Status Message Display */}
                {statusMsg && (
                  <p style={{
                    marginTop: "10px",
                    color: statusMsg.type === "success" ? "#4caf50" : "#f44336",
                    fontWeight: "bold"
                  }}>
                    {statusMsg.text}
                  </p>
                )}
              </form>
            </div>
          </div>
        )}

      </div>
      <Footer />
    </>
  );
};

export default ContactUs;