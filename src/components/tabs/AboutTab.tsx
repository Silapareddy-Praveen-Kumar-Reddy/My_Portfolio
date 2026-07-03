import { ExternalLink } from "lucide-react";
import { bio, whatImDoing, codingProfiles } from "@/data/portfolio";

/* Show only LeetCode + GFG (not GitHub Stats) */
const CODING_CARDS = codingProfiles.slice(0, 2);

const AboutTab = () => (
  <article className="tab-panel">

    {/* ── About Me ───────────────────────────────────────────── */}
    <h2 className="section-title">About Me</h2>

    <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 40 }}>
      {bio.map((para, i) => (
        <p
          key={i}
          style={{ fontSize: "0.88rem", lineHeight: 1.82, color: "#999", maxWidth: "70ch" }}
        >
          {para}
        </p>
      ))}
    </div>

    {/* ── What I'm Doing ─────────────────────────────────────── */}
    <h3 className="sub-title">What I'm Doing</h3>

    <div className="service-grid" style={{ marginBottom: 44 }}>
      {whatImDoing.map((item) => (
        <div key={item.title} className="service-card">
          {/* Emoji icon — large, in a glass box */}
          <div
            className="service-icon-box"
            style={{ fontSize: "1.35rem", lineHeight: 1 }}
          >
            {item.icon}
          </div>

          <div>
            <h4
              style={{
                fontSize: "0.92rem",
                fontWeight: 600,
                color: "#fff",
                marginBottom: 6,
              }}
            >
              {item.title}
            </h4>
            <p style={{ fontSize: "0.82rem", color: "#6e6e6e", lineHeight: 1.72 }}>
              {item.description}
            </p>
          </div>
        </div>
      ))}
    </div>

    {/* ── Coding Profiles ────────────────────────────────────── */}
    <h3 className="sub-title">Coding Profiles</h3>

    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 14,
      }}
      className="coding-profiles-grid"
    >
      {CODING_CARDS.map((profile) => (
        <div key={profile.name} className="coding-profile-card">
          {/* Header: logo + name + visit link */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 16,
              paddingBottom: 14,
              borderBottom: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <img
                src={profile.icon}
                alt={profile.name}
                style={{
                  width: 26,
                  height: 26,
                  objectFit: "contain",
                  borderRadius: 4,
                }}
              />
              <span
                style={{
                  fontSize: "0.95rem",
                  fontWeight: 600,
                  color: "#fff",
                }}
              >
                {profile.name}
              </span>
            </div>

            <a
              href={profile.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 5,
                fontSize: "0.78rem",
                fontWeight: 600,
                color: "#ffb100",
                textDecoration: "none",
                transition: "opacity 0.2s",
              }}
            >
              Visit <ExternalLink size={12} strokeWidth={2} />
            </a>
          </div>

          {/* Stats rows */}
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {profile.stats.map((stat, idx) => (
              <div
                key={stat.label}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "8px 0",
                  borderBottom:
                    idx < profile.stats.length - 1
                      ? "1px solid rgba(255,255,255,0.04)"
                      : "none",
                }}
              >
                <span style={{ fontSize: "0.83rem", color: "#666" }}>
                  {stat.label}
                </span>
                <span
                  style={{
                    fontSize: "0.88rem",
                    fontWeight: 700,
                    color: "#fff",
                  }}
                >
                  {stat.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>

  </article>
);

export default AboutTab;
