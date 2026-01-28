import React, { useState, useEffect } from "react";
import "./contactus.css";
import Footer from "../components/Footer";
import logo from "../assets/logo2.png";

const ContactUs = () => {
  const [showModal, setShowModal] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(false);
    const timer = setTimeout(() => {
      setAnimate(true);
    }, 50);
    return () => clearTimeout(timer);
  }, []);

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

            <div className={`col-md-6 slide-right ${animate && "show"}`}>
              <div className="service-card profile-card">

                <img
                  src={logo}
                  alt="MarkX"
                  className="profile-image"
                />

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
            <p>join the next generation of brands that are redefining degital market</p>
            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=markxoffice@gmail.com"><button><span className="sty1">Start Your Journey →</span></button></a>
          </div>

        </div>



        {/* Modal */}
        {showModal && (
          <div className="modal-overlay" onClick={() => setShowModal(false)}>
            <div className="modal-box" onClick={(e) => e.stopPropagation()}>
              <button className="close-btn" onClick={() => setShowModal(false)}>×</button>

              <h2>Send us a message</h2>
              <form className="email-form">
                <input type="text" placeholder="Your Name" required />
                <input type="email" placeholder="Your Email" required />
                <textarea rows="4" placeholder="Your Message" required />
                <button type="submit">Send Message </button>
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