import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AuditModal.css";

const AuditModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("Initializing AI...");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isLoading) return;
    const messages = [
      "📡 Connecting to Instagram...",
      "🔍 Scraping public metrics...",
      "🧠 Analyzing Brand Persona...",
      "🎯 Identifying Target Audience...",
      "🚀 Generating Growth Strategy...",
      "✨ Finalizing Report..."
    ];
    let i = 0;
    setLoadingText(messages[0]);
    const interval = setInterval(() => {
      i = (i + 1) % messages.length;
      setLoadingText(messages[i]);
    }, 2500);
    return () => clearInterval(interval);
  }, [isLoading]);

  const handleGetAudit = async () => {
    if (!username.trim()) return;
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("https://markx-backend-apify.onrender.com/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: username }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Failed to analyze profile.");
      }

      navigate("/report", { state: { auditResult: data } });
      onClose(); // Close modal after success
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content slide-up">
        <button className="close-btn" onClick={onClose}>&times;</button>

        {!isLoading ? (
          <>
            <h2>Audit Your Profile</h2>
            <p>Enter your Instagram username to generate a comprehensive AI growth report.</p>
            <input
              type="text"
              placeholder="@username"
              className="modal-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <button className="modal-submit-btn" onClick={handleGetAudit}>Generate Report 🚀</button>
            {error && <p className="error-text">{error}</p>}
          </>
        ) : (
          <div className="loading-state">
            <div className="spinner"></div>
            <h3>Processing Data...</h3>
            <p className="loading-text">{loadingText}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuditModal;
