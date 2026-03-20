import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Report.css";

const BACKEND_URL = import.meta.env.VITE_API_URL || "https://markxbackendapify-production.up.railway.app";

const Report = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isDownloading, setIsDownloading] = useState(false);
    const [activeDay, setActiveDay] = useState(0);

    const auditResult = location.state?.auditResult;
    const profile = auditResult?.profile_data || {};
    const stats = auditResult?.metadata_summary || {};
    const report = auditResult?.analysis_report || {};

    useEffect(() => {
        if (!auditResult) navigate("/insight");
    }, [auditResult, navigate]);

    if (!auditResult) return null;

    // ── Derived shortcuts ────────────────────────────────────────────────────
    const bench = stats.niche_benchmarking || {};
    const diag = report.growth_diagnosis || {};
    const optimal = report.optimal_strategy || {};
    const roadmap = report.growth_roadmap || {};
    const niche = report.niche_standing || {};
    const fmtPerf = stats.format_performance || {};
    const mix = stats.content_mix || {};
    const recMix = optimal.content_mix || {};

    const fmt = (n) => {
        const num = parseInt(n);
        if (isNaN(num)) return n ?? "—";
        if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
        if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`;
        return String(num);
    };

    const scoreColor = (s) => {
        const n = parseInt(s);
        if (n >= 8) return "#c9a84c";
        if (n >= 6) return "#4caf7d";
        return "#e05555";
    };

    // ── PDF — backend generation (WeasyPrint, real PDF) ──────────────────────
    const downloadPDF = async () => {
        setIsDownloading(true);
        try {
            const response = await fetch(`${BACKEND_URL}/generate-pdf`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    profile_data: profile,
                    metadata_summary: stats,
                    analysis_report: report,
                }),
            });

            if (!response.ok) {
                const err = await response.json().catch(() => ({}));
                throw new Error(err.detail || "PDF generation failed");
            }

            // Stream the binary PDF and trigger browser download
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = `MarkX_Strategy_${profile.profile}.pdf`;
            document.body.appendChild(link);
            link.click();
            link.remove();
            URL.revokeObjectURL(url);
        } catch (err) {
            console.error("PDF download failed:", err);
            alert(`PDF Error: ${err.message}`);
        } finally {
            setIsDownloading(false);
        }
    };

    return (
        <div className="report-page fade-in">
            <div className="report-container">

                {/* ACTION BAR */}
                <header className="report-header">
                    <div className="header-left">
                        <p className="report-eyebrow">MarkX Strategic Engine v2</p>
                        <h1 className="report-title">Premium Growth Roadmap</h1>
                        <p className="report-subtitle">
                            Personalised for <span className="highlight">@{profile.profile}</span>
                        </p>
                    </div>
                    <div className="header-actions">
                        <button className="download-btn" onClick={downloadPDF} disabled={isDownloading}>
                            {isDownloading ? "Generating…" : "↓ Download PDF"}
                        </button>
                        <button className="back-btn" onClick={() => navigate("/insight")}>
                            New Audit
                        </button>
                    </div>
                </header>

                <div id="report-to-pdf" className="report-content">

                    {/* ── 1. PROFILE IDENTITY CARD ────────────────────────── */}
                    <div className="profile-card">
                        <AvatarWithFallback
                            src={profile.profile_pic_url}
                            name={profile.full_name || profile.profile}
                        />
                        <div className="profile-meta">
                            <div className="profile-name-row">
                                <h2 className="profile-name">{profile.full_name}</h2>
                                {profile.is_verified && (
                                    <span className="verified-badge" title="Verified">✓</span>
                                )}
                                {profile.is_business && (
                                    <span className="biz-badge">Business</span>
                                )}
                            </div>
                            <p className="profile-handle">@{profile.profile}</p>
                            {profile.account_category && (
                                <p className="profile-category">{profile.account_category}</p>
                            )}
                            <p className="profile-bio">{profile.bio}</p>
                            {profile.website && (
                                <a
                                    href={profile.website}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="profile-website"
                                >
                                    🔗 {profile.website.replace(/^https?:\/\//, "")}
                                </a>
                            )}
                        </div>
                        <div className="profile-stats-row">
                            <div className="pstat">
                                <span className="pstat-val">{fmt(profile.followers)}</span>
                                <span className="pstat-label">Followers</span>
                            </div>
                            <div className="pstat">
                                <span className="pstat-val">{fmt(profile.following)}</span>
                                <span className="pstat-label">Following</span>
                            </div>
                            <div className="pstat">
                                <span className="pstat-val">{fmt(profile.posts_count)}</span>
                                <span className="pstat-label">Posts</span>
                            </div>
                            <div className="pstat accent">
                                <span className="pstat-val">{bench.account_tier || "—"}</span>
                                <span className="pstat-label">Tier</span>
                            </div>
                        </div>
                    </div>

                    {/* ── 2. KEY METRICS BAR ──────────────────────────────── */}
                    <div className="metrics-bar">
                        <div className="metric-box">
                            <span className="m-label">Niche Score</span>
                            <span className="m-val" style={{ color: scoreColor(niche.score) }}>
                                {niche.score}/10
                            </span>
                            <span className="m-sub">{niche.level}</span>
                        </div>
                        <div className="metric-box">
                            <span className="m-label">Engagement Rate</span>
                            <span className="m-val">{bench.engagement_rate}</span>
                            <span className="m-sub">{bench.benchmark_score} · {bench.verdict}</span>
                        </div>
                        <div className="metric-box highlighted">
                            <span className="m-label">Golden Hour</span>
                            <span className="m-val">{stats.best_time_to_post}</span>
                            <span className="m-sub">Peak IST engagement</span>
                        </div>
                        <div className="metric-box">
                            <span className="m-label">Avg Likes</span>
                            <span className="m-val">{stats.average_likes?.toLocaleString() ?? "—"}</span>
                            <span className="m-sub">{stats.average_comments ?? "—"} avg comments</span>
                        </div>
                        <div className="metric-box">
                            <span className="m-label">Avg Reel Views</span>
                            <span className="m-val">
                                {stats.average_reel_views > 0
                                    ? stats.average_reel_views.toLocaleString()
                                    : "—"}
                            </span>
                            <span className="m-sub">Short-form reach</span>
                        </div>
                        <div className="metric-box">
                            <span className="m-label">Post Frequency</span>
                            <span className="m-val">{stats.posting_frequency || "—"}</span>
                            <span className="m-sub">Current cadence</span>
                        </div>
                    </div>

                    <div className="report-grid">

                        {/* ── 3. MARKET POSITION ──────────────────────────── */}
                        <div className="report-card">
                            <h3>📍 Market Position</h3>
                            <p className="niche-insight">{niche.insight}</p>
                        </div>

                        {/* ── 4. GROWTH DIAGNOSIS ─────────────────────────── */}
                        <div className="report-card">
                            <h3>🔍 Growth Diagnosis</h3>
                            <div className="diag-item strength">
                                <span className="diag-label">Strength</span>
                                <p>{diag.strength}</p>
                            </div>
                            <div className="diag-item weakness">
                                <span className="diag-label">Bottleneck</span>
                                <p>{diag.weakness}</p>
                            </div>
                            <div className="diag-item opportunity">
                                <span className="diag-label">Opportunity</span>
                                <p>{diag.opportunity}</p>
                            </div>
                        </div>

                        {/* ── 5. CONTENT ANALYTICS ────────────────────────── */}
                        <div className="report-card">
                            <h3>📊 Content Analytics</h3>
                            <p className="mix-title">Current Mix</p>
                            <MixBar reels={mix.reels} carousel={mix.carousel} stat={mix.static} />

                            <div className="fmt-verdict-box">
                                <span className="fmt-label">Format Intel</span>
                                <p>{fmtPerf.verdict}</p>
                                <div className="fmt-compare">
                                    <div className="fmt-stat">
                                        <span>{fmtPerf.avg_reel_engagement?.toLocaleString() ?? "—"}</span>
                                        <small>Avg Reel Eng.</small>
                                    </div>
                                    <div className="fmt-vsep">vs</div>
                                    <div className="fmt-stat">
                                        <span>{fmtPerf.avg_static_engagement?.toLocaleString() ?? "—"}</span>
                                        <small>Avg Static Eng.</small>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ── 6. OPTIMAL STRATEGY ─────────────────────────── */}
                        <div className="report-card">
                            <h3>🎯 Recommended Strategy</h3>
                            <div className="strategy-pills">
                                <div className="spill">
                                    <span className="spill-label">Frequency</span>
                                    <span className="spill-val">{optimal.recommended_frequency || "—"}</span>
                                </div>
                                <div className="spill">
                                    <span className="spill-label">Best Time</span>
                                    <span className="spill-val">{optimal.best_posting_time || "—"}</span>
                                </div>
                            </div>
                            <p className="mix-title" style={{ marginTop: 16 }}>Recommended Mix</p>
                            <MixBar reels={recMix.reels} carousel={recMix.carousel} stat={recMix.static} />
                        </div>

                        {/* ── 7. 7-DAY CALENDAR ───────────────────────────── */}
                        <div className="report-card full-width">
                            <h3>🗓️ 7-Day Tactical Execution Plan</h3>

                            {/* Mobile tab row */}
                            <div className="day-tabs">
                                {report.seven_day_plan?.map((_, idx) => (
                                    <button
                                        key={idx}
                                        className={`day-tab${activeDay === idx ? " active" : ""}`}
                                        onClick={() => setActiveDay(idx)}
                                    >
                                        D{idx + 1}
                                    </button>
                                ))}
                            </div>

                            <div className="calendar-grid">
                                {report.seven_day_plan?.map((item, idx) => (
                                    <div
                                        key={idx}
                                        className={`calendar-day${activeDay === idx ? " active-day" : ""}`}
                                        onClick={() => setActiveDay(idx)}
                                    >
                                        <span className="day-num">{item.day}</span>
                                        <span className={`day-type type-${item.content_type?.toLowerCase()}`}>
                                            {item.content_type}
                                        </span>
                                        <p className="day-topic">{item.idea}</p>
                                        <span className="day-time">⏰ {item.posting_time}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* ── 8. ROADMAP ──────────────────────────────────── */}
                        <div className="report-card full-width">
                            <h3>🚀 Growth Roadmap</h3>
                            <div className="roadmap-content">
                                <div className="road-col">
                                    <h4>Immediate Actions</h4>
                                    <ul className="action-list">
                                        {roadmap.immediate_actions?.map((a, i) => (
                                            <li key={i}>
                                                <span className="action-num">
                                                    {String(i + 1).padStart(2, "0")}
                                                </span>
                                                {a}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="road-col">
                                    <h4>6-Month Vision</h4>
                                    <p className="vision-text">{roadmap.long_term_vision}</p>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="pdf-footer">
                        Generated by MarkX Strategic Engine v2 · Confidential Growth Audit · @{profile.profile}
                    </div>
                </div>
            </div>
        </div>
    );
};

// ── Avatar with initials fallback (Instagram CDN blocks cross-origin) ───────
const AvatarWithFallback = ({ src, name }) => {
    const [failed, setFailed] = useState(false);
    const initials = (name || "?")
        .split(" ")
        .map((w) => w[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();

    if (!src || failed) {
        return (
            <div className="profile-avatar avatar-fallback">
                {initials}
            </div>
        );
    }

    return (
        <img
            src={src}
            alt={name}
            className="profile-avatar"
            onError={() => setFailed(true)}
        />
    );
};

// ── Reusable mix bar sub-component ──────────────────────────────────────────
const MixBar = ({ reels = 0, carousel = 0, stat = 0 }) => (
    <div className="mix-bar-wrap">
        <div className="mix-bar">
            <div className="mix-fill reels" style={{ width: `${reels}%` }} title={`Reels ${reels}%`} />
            <div className="mix-fill carousels" style={{ width: `${carousel}%` }} title={`Carousel ${carousel}%`} />
            <div className="mix-fill static" style={{ width: `${stat}%` }} title={`Static ${stat}%`} />
        </div>
        <div className="mix-legend">
            <span><i className="dot reels" />    Reels {reels}%</span>
            <span><i className="dot carousels" /> Carousel {carousel}%</span>
            <span><i className="dot static" />   Static {stat}%</span>
        </div>
    </div>
);

export default Report;