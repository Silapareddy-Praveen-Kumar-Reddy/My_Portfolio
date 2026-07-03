import { useState, useEffect, useRef } from "react";
import { ExternalLink } from "lucide-react";
import {
  educationTimeline,
  experiences,
  skillProficiencies,
  certificates,
} from "@/data/portfolio";

/* ── Animated skill progress bar ─────────────────────────── */
const SkillBar = ({ name, percent }: { name: string; percent: number }) => {
  const [width, setWidth] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setWidth(percent), 120);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [percent]);

  return (
    <div ref={ref} style={{ marginBottom: 18 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          marginBottom: 4,
        }}
      >
        <span style={{ fontSize: "0.86rem", fontWeight: 500, color: "#d4d4d4" }}>
          {name}
        </span>
        <span style={{ fontSize: "0.78rem", fontWeight: 600, color: "#ffb100" }}>
          {percent}%
        </span>
      </div>
      <div className="skill-bar-track">
        <div className="skill-bar-fill" style={{ width: `${width}%` }} />
      </div>
    </div>
  );
};

/* ── Timeline entry ───────────────────────────────────────── */
interface TimelineProps {
  title: string;
  subtitle: string;
  period: string;
  score?: string;
  bullets?: string[];
  href?: string;
  prLink?: string;
}

const TimelineItem = ({
  title, subtitle, period, score, bullets, href, prLink,
}: TimelineProps) => (
  <div className="timeline-item">
    <div className="timeline-dot" />

    {/* Period badge */}
    <p
      style={{
        fontSize: "0.72rem",
        fontWeight: 600,
        color: "#ffb100",
        textTransform: "uppercase",
        letterSpacing: "0.08em",
        marginBottom: 5,
      }}
    >
      {period}
    </p>

    {/* Title */}
    <h4 style={{ fontSize: "0.95rem", fontWeight: 600, color: "#fff", marginBottom: 3 }}>
      {title}
    </h4>

    {/* Subtitle / company */}
    <p style={{ fontSize: "0.82rem", color: "#777", marginBottom: score ? 6 : 10 }}>
      {href ? (
        <a href={href} target="_blank" rel="noopener noreferrer" style={{ color: "#888" }}>
          {subtitle}
        </a>
      ) : (
        subtitle
      )}
      {prLink && (
        <>
          {" "}·{" "}
          <a
            href={prLink}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#ffb100", fontSize: "0.78rem" }}
          >
            PR #17964 ↗
          </a>
        </>
      )}
    </p>

    {/* Score (education) */}
    {score && (
      <p
        style={{
          fontSize: "0.78rem",
          color: "#ffb100",
          fontWeight: 600,
          marginBottom: 8,
        }}
      >
        Score: {score}
      </p>
    )}

    {/* Bullet points (experience) */}
    {bullets && bullets.length > 0 && (
      <ul style={{ display: "flex", flexDirection: "column", gap: 5, paddingLeft: 2 }}>
        {bullets.map((b, i) => (
          <li
            key={i}
            style={{
              fontSize: "0.82rem",
              color: "#8e8e8e",
              lineHeight: 1.65,
              paddingLeft: 14,
              position: "relative",
            }}
          >
            <span
              style={{
                position: "absolute",
                left: 0,
                top: "0.55em",
                width: 5,
                height: 5,
                borderRadius: "50%",
                background: "rgba(255,177,0,0.5)",
                flexShrink: 0,
              }}
            />
            {b}
          </li>
        ))}
      </ul>
    )}
  </div>
);

/* ── Resume Tab ───────────────────────────────────────────── */
const ResumeTab = () => (
  <article className="tab-panel">

    {/* ── Education ────────────────────────────────────────── */}
    <section style={{ marginBottom: 40 }}>
      <h2 className="section-title">Education</h2>
      <div className="timeline">
        {educationTimeline.map((ed) => (
          <TimelineItem
            key={ed.title}
            title={ed.title}
            subtitle={ed.institution}
            period={ed.period}
            score={ed.score}
          />
        ))}
      </div>
    </section>

    {/* ── Experience ───────────────────────────────────────── */}
    <section style={{ marginBottom: 40 }}>
      <h2 className="section-title">Experience</h2>
      <div className="timeline">
        {experiences.map((exp) => (
          <TimelineItem
            key={exp.role}
            title={exp.role}
            subtitle={exp.company}
            period={exp.date}
            bullets={exp.duties}
            href={(exp as any).companyLink}
            prLink={(exp as any).prLink}
          />
        ))}
      </div>
    </section>

    {/* ── Skills ───────────────────────────────────────────── */}
    <section style={{ marginBottom: 40 }}>
      <h2 className="section-title">My Skills</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          columnGap: 40,
        }}
      >
        {skillProficiencies.map((sk) => (
          <SkillBar key={sk.name} name={sk.name} percent={sk.percent} />
        ))}
      </div>
    </section>

    {/* ── Certifications ───────────────────────────────────── */}
    <section>
      <h2 className="section-title">Certifications</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {certificates.map((cert) => (
          <div key={cert.name} className="cert-card">
            <div>
              <p style={{ fontSize: "0.9rem", fontWeight: 600, color: "#fff", marginBottom: 2 }}>
                {cert.name}
              </p>
              <p style={{ fontSize: "0.78rem", color: "#777" }}>{cert.issuer}</p>
            </div>
            {cert.link && (
              <a
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
                style={{ flexShrink: 0 }}
              >
                <ExternalLink size={13} strokeWidth={1.8} />
                View
              </a>
            )}
          </div>
        ))}
      </div>
    </section>

  </article>
);

export default ResumeTab;
