import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "./Report.css";

const Report = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isDownloading, setIsDownloading] = useState(false);
    const auditResult = location.state?.auditResult;

    useEffect(() => {
        if (!auditResult) navigate("/insight");
    }, [auditResult, navigate]);

    if (!auditResult) return null;

    const { profile_data, analysis_report } = auditResult;
    const growth = analysis_report?.growth_plan || {};
    const bioStats = analysis_report?.bio_analysis || {};
    const nicheStats = analysis_report?.niche_analysis || {};

    // --- THE FIX: GHOST CLONE TECHNIQUE ---
    const downloadPDF = async () => {
        setIsDownloading(true);
        const element = document.getElementById("report-to-pdf");

        try {
            // 1. Create a clone of the report
            const clone = element.cloneNode(true);

            // 2. Style the clone to look like Desktop (Fixed Width)
            // This forces the PDF to look good even if clicked from a Mobile Phone
            clone.style.width = "1024px";
            clone.style.position = "absolute";
            clone.style.top = "-9999px"; // Hide it off-screen
            clone.style.left = "0";
            clone.style.background = "#050505";
            clone.style.color = "white";
            clone.style.padding = "40px";

            // Add the clone to the document body temporarily
            document.body.appendChild(clone);

            // 3. Capture the CLONE (not the original squished mobile view)
            const canvas = await html2canvas(clone, {
                scale: 2,
                useCORS: true,
                backgroundColor: "#050505",
                windowWidth: 1024 // Force render width
            });

            // 4. Remove the clone
            document.body.removeChild(clone);

            // 5. Generate PDF with Dynamic Height (No White Space)
            const imgData = canvas.toDataURL("image/png");
            const imgWidth = 210; // A4 width in mm
            const pageHeight = (canvas.height * imgWidth) / canvas.width; // Calculate exact height needed

            const pdf = new jsPDF("p", "mm", [imgWidth, pageHeight]); // Custom page size

            pdf.addImage(imgData, "PNG", 0, 0, imgWidth, pageHeight);
            pdf.save(`MarkX_Audit_${profile_data.profile}.pdf`);

        } catch (err) {
            console.error("PDF generation failed:", err);
            alert("Could not generate PDF. Please try on a Desktop.");
        } finally {
            setIsDownloading(false);
        }
    };

    const renderValue = (value) => {
        if (!value) return "N/A";
        if (typeof value === "string") return value;
        if (Array.isArray(value)) return value.join(", ");
        if (typeof value === "object") {
            return (
                <div className="nested-obj">
                    {Object.entries(value).map(([key, val]) => (
                        <div key={key} className="nested-row">
                            <strong className="nested-key">{key.replace(/_/g, " ")}:</strong>
                            <span className="nested-val">{renderValue(val)}</span>
                        </div>
                    ))}
                </div>
            );
        }
        return value.toString();
    };

    return (
        <div className="report-page fade-in">
            <div className="report-container">

                {/* HEADER (Not included in PDF) */}
                <header className="report-header">
                    <div className="header-left">
                        <br></br>
                        <p className="report-eyebrow">MarkX Intelligence</p>
                        <h1 className="report-title">Growth Audit Report</h1>
                        <p className="report-subtitle">
                            Generated for <span className="highlight">@{profile_data.profile}</span>
                        </p>
                        <div className="report-meta">
                            <span className="meta-pill">Followers: {profile_data.followers}</span>
                            <span className="meta-pill">Following: {profile_data.following}</span>
                            <span className="meta-pill">Posts: {profile_data.posts_count}</span>
                        </div>
                    </div>

                    <div className="header-actions">
                        <button className="download-btn" onClick={downloadPDF} disabled={isDownloading}>
                            {isDownloading ? "⏳ Preparing..." : "📥 Download PDF"}
                        </button>
                        <button className="back-btn" onClick={() => navigate("/insight")}>Close</button>
                    </div>
                </header>

                {/* --- PDF CONTENT AREA --- */}
                <div className="screen-view">
                    <div id="report-to-pdf" className="report-content">

                        {/* Logo for PDF Branding */}
                        <div className="pdf-only-logo">
                            <h2>MarkX AI Analysis</h2>
                        </div>

                        <div className="report-grid">
                            {/* 1. SNAPSHOT */}
                            <div className="report-card stats-card">
                                <h3>📊 Profile Snapshot</h3>
                                <div className="stat-row">
                                    <div className="stat-item">
                                        <span className="stat-val">{profile_data.followers}</span>
                                        <span className="stat-label">Followers</span>
                                    </div>
                                    <div className="stat-item">
                                        <span className="stat-val">{profile_data.following}</span>
                                        <span className="stat-label">Following</span>
                                    </div>
                                    <div className="stat-item">
                                        <span className="stat-val">{profile_data.posts_count}</span>
                                        <span className="stat-label">Posts</span>
                                    </div>
                                </div>
                                <div className="bio-box"><strong>Bio:</strong> {profile_data.bio}</div>
                            </div>

                            {/* 2. BRAND PSYCHOLOGY */}
                            <div className="report-card ai-card">
                                <h3>🧠 Brand Psychology</h3>
                                <ul className="insight-list">
                                    <li><strong>🎭 Archetype:</strong> {renderValue(bioStats.persona)}</li>
                                    <li><strong>🗣️ Tone:</strong> {renderValue(bioStats.tone)}</li>
                                    <li><strong>🎯 Goal:</strong> {renderValue(bioStats.goal)}</li>
                                    <li><strong>🔑 Keywords:</strong> {renderValue(bioStats.key_themes)}</li>
                                </ul>
                            </div>

                            {/* 3. NICHE */}
                            <div className="report-card niche-card">
                                <h3>📍 Niche & Audience</h3>
                                <p><strong>Primary Niche:</strong> {renderValue(nicheStats.primary_niche)}</p>
                                <div className="tag-container">
                                    {Array.isArray(nicheStats.sub_niches)
                                        ? nicheStats.sub_niches.map((tag, i) => <span key={i} className="tag">{tag}</span>)
                                        : renderValue(nicheStats.sub_niches)}
                                </div>
                                <p className="mt-15"><strong>Audience:</strong> {renderValue(growth?.overall_growth_plan?.target_audience)}</p>
                            </div>

                            {/* 4. STRATEGY */}
                            <div className="report-card strategy-card full-width">
                                <h3>🚀 Growth Roadmap</h3>
                                <div className="strategy-content">
                                    <div className="strategy-column">
                                        <h4>Content Strategy</h4>
                                        {renderValue(growth.content_strategy)}
                                    </div>
                                    <div className="strategy-column">
                                        <h4>Engagement Tactics</h4>
                                        {renderValue(growth.engagement_strategy)}
                                    </div>
                                </div>
                            </div>

                            {/* 5. WARNINGS */}
                            <div className="report-card warning-card full-width">
                                <h3>⚠️ Growth Optimization</h3>
                                {renderValue(growth.growth_warnings)}
                            </div>

                            <div className="pdf-footer">Generated by MarkX AI</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Report;
