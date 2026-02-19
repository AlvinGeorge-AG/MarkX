import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "./Report.css";

const Report = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isDownloading, setIsDownloading] = useState(false);

    // Updated Data Extraction to match our new Backend JSON
    const auditResult = location.state?.auditResult;
    const profile = auditResult?.profile_data || {};
    const stats = auditResult?.metadata_summary || {};
    const report = auditResult?.analysis_report || {};

    useEffect(() => {
        if (!auditResult) navigate("/insight");
    }, [auditResult, navigate]);

    if (!auditResult) return null;

    const downloadPDF = async () => {
        setIsDownloading(true);
        const element = document.getElementById("report-to-pdf");
        try {
            const clone = element.cloneNode(true);
            clone.style.width = "1100px"; // Slightly wider for the calendar grid
            clone.style.position = "absolute";
            clone.style.top = "-9999px";
            clone.style.left = "0";
            clone.style.background = "#050505";
            clone.style.padding = "40px";
            document.body.appendChild(clone);

            const canvas = await html2canvas(clone, {
                scale: 1.5,
                useCORS: true,
                backgroundColor: "#050505",
                windowWidth: 1100
            });

            document.body.removeChild(clone);
            const imgData = canvas.toDataURL("image/png");
            const imgWidth = 210;
            const pageHeight = (canvas.height * imgWidth) / canvas.width;
            const pdf = new jsPDF("p", "mm", [imgWidth, pageHeight]);
            pdf.addImage(imgData, "PNG", 0, 0, imgWidth, pageHeight);
            pdf.save(`MarkX_Strategy_${profile.profile}.pdf`);
        } catch (err) {
            console.error(err);
        } finally {
            setIsDownloading(false);
        }
    };

    return (
        <div className="report-page fade-in">
            <div className="report-container">

                {/* TOP ACTION BAR */}
                <header className="report-header">
                    <div className="header-left">
                        <p className="report-eyebrow">MarkX Strategic Engine v2</p>
                        <h1 className="report-title">Premium Growth Roadmap</h1>
                        <p className="report-subtitle">Personalized for <span className="highlight">@{profile.profile}</span></p>
                    </div>
                    <div className="header-actions">
                        <button className="download-btn" onClick={downloadPDF} disabled={isDownloading}>
                            {isDownloading ? "Generating..." : "Download Strategy PDF"}
                        </button>
                        <button className="back-btn" onClick={() => navigate("/insight")}>New Audit</button>
                    </div>
                </header>

                <div className="screen-view">
                    <div id="report-to-pdf" className="report-content">

                        {/* 1. TOP KEY METRICS (Numbers from ML Layer) */}
                        <div className="metrics-bar">
                            <div className="metric-box">
                                <span className="m-label">Niche Standing</span>
                                <span className="m-val">{report.niche_standing?.score}/10</span>
                                <span className="m-sub">{report.niche_standing?.level}</span>
                            </div>
                            <div className="metric-box">
                                <span className="m-label">Avg Engagement</span>
                                <span className="m-val">{stats.niche_benchmarking?.engagement_rate}</span>
                                <span className="m-sub">{stats.niche_benchmarking?.verdict}</span>
                            </div>
                            <div className="metric-box highlighted">
                                <span className="m-label">Golden Posting Hour</span>
                                <span className="m-val">{stats.best_time_to_post}</span>
                                <span className="m-sub">India Standard Time (IST)</span>
                            </div>
                        </div>

                        <div className="report-grid">
                            {/* 2. NICHE ANALYSIS */}
                            <div className="report-card">
                                <h3>📍 Market Position</h3>
                                <p className="niche-insight">{report.niche_standing?.insight}</p>
                                <div className="pill-container">
                                    {report.niche_analysis?.content_pillars?.map((p, i) => (
                                        <span key={i} className="content-pill">{p}</span>
                                    ))}
                                </div>
                                <div className="edge-box">
                                    <strong>Competitive Edge:</strong> {report.niche_analysis?.competitive_edge}
                                </div>
                            </div>

                            {/* 3. GROWTH DIAGNOSIS */}
                            <div className="report-card">
                                <h3>🔍 Growth Diagnosis</h3>
                                <div className="diag-item">
                                    <span className="diag-label">Core Strength</span>
                                    <p>{report.growth_diagnosis?.strength}</p>
                                </div>
                                <div className="diag-item">
                                    <span className="diag-label">Primary Bottleneck</span>
                                    <p>{report.growth_diagnosis?.weakness}</p>
                                </div>
                            </div>

                            {/* 4. OPTIMAL CONTENT MIX */}
                            <div className="report-card">
                                <h3>📊 Content Strategy</h3>
                                <p>Recommended Frequency: <strong>{report.optimal_strategy?.recommended_frequency}</strong></p>
                                <div className="mix-container">
                                    <div className="mix-bar">
                                        <div className="mix-fill reels" style={{ width: `${report.optimal_strategy?.content_mix?.reels}%` }}></div>
                                        <div className="mix-fill carousels" style={{ width: `${report.optimal_strategy?.content_mix?.carousel}%` }}></div>
                                    </div>
                                    <div className="mix-legend">
                                        <span><i className="dot reels"></i> Reels ({report.optimal_strategy?.content_mix?.reels}%)</span>
                                        <span><i className="dot carousels"></i> Other ({report.optimal_strategy?.content_mix?.carousel + report.optimal_strategy?.content_mix?.static}%)</span>
                                    </div>
                                </div>
                            </div>

                            {/* 5. THE 7-DAY CALENDAR */}
                            <div className="report-card full-width">
                                <h3>🗓️ 7-Day Tactical Execution Plan</h3>
                                <div className="calendar-grid">
                                    {/* CHANGE: 'seven_day_calendar' to 'seven_day_plan' */}
                                    {report.seven_day_plan?.map((item, idx) => (
                                        <div key={idx} className="calendar-day">
                                            <span className="day-num">Day {idx + 1}</span>
                                            {/* CHANGE: 'type' to 'content_type' */}
                                            <span className="day-type">{item.content_type}</span>
                                            {/* CHANGE: 'topic' to 'idea' (since our AI prompt changed) */}
                                            <p className="day-topic">{item.idea}</p>
                                            {/* CHANGE: 'timing' to 'posting_time' */}
                                            <span className="day-time">⏰ {item.posting_time}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* 6. ROADMAP */}
                            <div className="report-card full-width">
                                <h3>🚀 Long-term Roadmap</h3>
                                <div className="roadmap-content">
                                    <div className="road-col">
                                        <h4>Immediate Actions</h4>
                                        <ul>
                                            {report.growth_roadmap?.immediate_actions?.map((a, i) => <li key={i}>{a}</li>)}
                                        </ul>
                                    </div>
                                    <div className="road-col">
                                        <h4>Strategic Vision</h4>
                                        <p>{report.growth_roadmap?.long_term_vision}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="pdf-footer">Generated by MarkX Strategic Engine • Confidential Growth Audit</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Report;