import { bio, whatImDoing, codingProfiles } from "@/data/portfolio";
import { ExternalLink, Star } from "lucide-react";

const AboutTab = () => {
  return (
    <article
      id="panel-about"
      role="tabpanel"
      aria-labelledby="tab-about"
      className="tab-panel"
      style={{ display: "flex", flexDirection: "column", gap: 36 }}
    >
      {/* About Me */}
      <section>
        <h2 className="section-title">About Me</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {bio.map((para, i) => (
            <p
              key={i}
              style={{
                color: "#b0b0b0",
                lineHeight: 1.8,
                fontSize: "0.92rem",
                fontWeight: 300,
              }}
            >
              {para}
            </p>
          ))}
        </div>
      </section>

      {/* What I'm Doing */}
      <section>
        <h2 className="section-title">What I'm Doing</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: 16,
          }}
        >
          {whatImDoing.map((item, i) => (
            <div
              key={i}
              style={{
                background: "#1a1a1f",
                borderRadius: 16,
                padding: "20px 22px",
                display: "flex",
                gap: 16,
                alignItems: "flex-start",
                border: "1px solid rgba(255,255,255,0.06)",
                transition: "border-color 0.2s, transform 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,177,0,0.3)";
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.06)";
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
              }}
            >
              <div
                style={{
                  fontSize: "1.8rem",
                  flexShrink: 0,
                  lineHeight: 1,
                  marginTop: 2,
                }}
              >
                {item.icon}
              </div>
              <div>
                <h3
                  style={{
                    fontSize: "0.95rem",
                    fontWeight: 600,
                    color: "#ffffff",
                    marginBottom: 6,
                  }}
                >
                  {item.title}
                </h3>
                <p
                  style={{
                    fontSize: "0.82rem",
                    color: "#9a9a9a",
                    lineHeight: 1.65,
                    fontWeight: 300,
                  }}
                >
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Coding Profiles */}
      <section>
        <h2 className="section-title">Coding Profiles</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            gap: 16,
          }}
        >
          {codingProfiles.map((profile) => (
            <div
              key={profile.name}
              style={{
                background: "#1a1a1f",
                borderRadius: 16,
                padding: "18px 20px",
                border: "1px solid rgba(255,255,255,0.06)",
                transition: "border-color 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,177,0,0.3)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.06)";
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 12,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <img
                    src={profile.icon}
                    alt={profile.name}
                    style={{ width: 28, height: 28, objectFit: "contain" }}
                  />
                  <span
                    style={{ fontWeight: 600, fontSize: "0.9rem", color: "#ffffff" }}
                  >
                    {profile.name}
                  </span>
                </div>
                <a
                  href={profile.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: "#ffb100",
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                    fontSize: "0.75rem",
                    fontWeight: 500,
                    textDecoration: "none",
                  }}
                >
                  Visit <ExternalLink size={11} />
                </a>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {profile.stats.map((stat) => (
                  <div
                    key={stat.label}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: "0.8rem",
                    }}
                  >
                    <span style={{ color: "#9a9a9a" }}>{stat.label}</span>
                    <span style={{ fontWeight: 600, color: "#e8e8e8" }}>{stat.value}</span>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", gap: 3, marginTop: 10 }}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={13}
                    style={{
                      color: i < profile.rating ? "#ffb100" : "rgba(255,255,255,0.15)",
                      fill: i < profile.rating ? "#ffb100" : "none",
                    }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </article>
  );
};

export default AboutTab;
