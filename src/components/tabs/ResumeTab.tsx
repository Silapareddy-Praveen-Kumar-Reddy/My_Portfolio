import { educationTimeline, experiences, certificates, skillProficiencies } from "@/data/portfolio";
import { GraduationCap, Briefcase, Award, ExternalLink } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const TimelineItem = ({
  icon,
  title,
  subtitle,
  date,
  badge,
  bullets,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  date: string;
  badge?: string;
  bullets?: string[];
}) => (
  <div
    style={{
      display: "flex",
      gap: 16,
      paddingBottom: 28,
      position: "relative",
    }}
  >
    {/* Left icon + line */}
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: 12,
          background: "rgba(255,177,0,0.12)",
          border: "1px solid rgba(255,177,0,0.3)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#ffb100",
          flexShrink: 0,
        }}
      >
        {icon}
      </div>
      <div
        style={{
          width: 1,
          flex: 1,
          background: "rgba(255,255,255,0.07)",
          marginTop: 8,
          minHeight: 20,
        }}
      />
    </div>

    {/* Content */}
    <div style={{ flex: 1, paddingBottom: 4 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          flexWrap: "wrap",
          gap: 8,
          marginBottom: 4,
        }}
      >
        <div>
          <h4
            style={{
              fontWeight: 600,
              fontSize: "0.95rem",
              color: "#ffffff",
              marginBottom: 3,
            }}
          >
            {title}
          </h4>
          <p style={{ fontSize: "0.82rem", color: "#ffb100", fontWeight: 500 }}>{subtitle}</p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
          <span
            style={{
              fontSize: "0.75rem",
              color: "#9a9a9a",
              background: "rgba(255,255,255,0.06)",
              padding: "3px 10px",
              borderRadius: 8,
              whiteSpace: "nowrap",
            }}
          >
            {date}
          </span>
          {badge && (
            <span
              style={{
                fontSize: "0.75rem",
                color: "#ffb100",
                background: "rgba(255,177,0,0.1)",
                padding: "2px 10px",
                borderRadius: 8,
                fontWeight: 600,
              }}
            >
              {badge}
            </span>
          )}
        </div>
      </div>
      {bullets && bullets.length > 0 && (
        <ul style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 5 }}>
          {bullets.map((b, i) => (
            <li
              key={i}
              style={{
                display: "flex",
                gap: 8,
                fontSize: "0.82rem",
                color: "#9a9a9a",
                lineHeight: 1.6,
              }}
            >
              <span style={{ color: "#ffb100", flexShrink: 0, marginTop: 1 }}>▸</span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  </div>
);

const SkillBar = ({ name, percent }: { name: string; percent: number }) => {
  const barRef = useRef<HTMLDivElement>(null);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimated(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (barRef.current) observer.observe(barRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={barRef} style={{ marginBottom: 14 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 6,
        }}
      >
        <span style={{ fontSize: "0.88rem", fontWeight: 500, color: "#e8e8e8" }}>{name}</span>
        <span style={{ fontSize: "0.82rem", fontWeight: 600, color: "#ffb100" }}>{percent}%</span>
      </div>
      <div
        style={{
          height: 6,
          background: "rgba(255,255,255,0.06)",
          borderRadius: 6,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: animated ? `${percent}%` : "0%",
            background: "linear-gradient(90deg, #ffb100, #ff8c00)",
            borderRadius: 6,
            transition: "width 1s ease",
          }}
        />
      </div>
    </div>
  );
};

const ResumeTab = () => {
  return (
    <article
      id="panel-resume"
      role="tabpanel"
      aria-labelledby="tab-resume"
      className="tab-panel"
      style={{ display: "flex", flexDirection: "column", gap: 40 }}
    >
      {/* Education */}
      <section>
        <h2 className="section-title">Education</h2>
        {educationTimeline.map((item) => (
          <TimelineItem
            key={item.title}
            icon={<GraduationCap size={18} />}
            title={item.title}
            subtitle={item.institution}
            date={item.period}
            badge={item.score}
          />
        ))}
      </section>

      {/* Experience */}
      <section>
        <h2 className="section-title">Experience</h2>
        {experiences.map((exp) => (
          <TimelineItem
            key={`${exp.company}-${exp.date}`}
            icon={<Briefcase size={18} />}
            title={exp.role}
            subtitle={exp.company}
            date={exp.date}
            bullets={exp.duties}
          />
        ))}
      </section>

      {/* Skills */}
      <section>
        <h2 className="section-title">My Skills</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          {skillProficiencies.map((group) => (
            <div key={group.category}>
              {/* Category label */}
              <p
                style={{
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "#ffb100",
                  marginBottom: 12,
                  paddingBottom: 6,
                  borderBottom: "1px solid rgba(255,177,0,0.15)",
                }}
              >
                {group.category}
              </p>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
                  gap: "0 32px",
                }}
              >
                {group.skills.map((skill) => (
                  <SkillBar key={skill.name} name={skill.name} percent={skill.percent} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Certificates */}
      <section>
        <h2 className="section-title">Certifications</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: 14,
          }}
        >
          {certificates.map((cert) => (
            <div
              key={cert.name}
              style={{
                background: "#1a1a1f",
                borderRadius: 14,
                padding: "16px 18px",
                display: "flex",
                gap: 14,
                alignItems: "flex-start",
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
                  width: 38,
                  height: 38,
                  background: "rgba(255,177,0,0.1)",
                  borderRadius: 10,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#ffb100",
                  flexShrink: 0,
                }}
              >
                <Award size={18} />
              </div>
              <div style={{ flex: 1 }}>
                <h4
                  style={{ fontSize: "0.88rem", fontWeight: 600, color: "#ffffff", marginBottom: 3 }}
                >
                  {cert.name}
                </h4>
                <p style={{ fontSize: "0.78rem", color: "#9a9a9a", marginBottom: 8 }}>{cert.issuer}</p>
                {cert.link && cert.link !== "#" && (
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 4,
                      fontSize: "0.76rem",
                      color: "#ffb100",
                      fontWeight: 500,
                      textDecoration: "none",
                    }}
                  >
                    View Certificate <ExternalLink size={11} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </article>
  );
};

export default ResumeTab;
