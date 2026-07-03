import { useState } from "react";
import { ExternalLink, Github } from "lucide-react";

type Category = "All" | "Web Dev" | "AI/ML" | "Mobile";

const FILTERS: Category[] = ["All", "Web Dev", "AI/ML", "Mobile"];

/* Project-level data (images + multi-category support) */
const PROJECTS = [
  {
    title: "WASTE CLASSIFIER",
    description:
      "Developed an intelligent, Flask-based web system for real-time image recognition of municipal solid waste. Integrated a deep learning model to automate waste categorization, improving potential recycling efficiency by 25%.",
    tech: "Flask, OpenCV, Anaconda Prompt, VGG16",
    categories: ["AI/ML", "Web Dev"] as Category[],
    image:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=460&h=230&fit=crop&q=80",
    github:
      "https://github.com/Silapareddy-Praveen-Kumar-Reddy/Waste-classification-using-Trasfer-Learning",
    live: "https://waste-classification-using-trasfer-yrk0.onrender.com/",
  },
  {
    title: "AGRIBRIDGE",
    description:
      "Designed and developed an app facilitating seamless connectivity for Farmers and Consumers using Flutter and Dart. Uses Firebase for authentication.",
    tech: "Flutter, Dart, Firebase, FastAPI",
    categories: ["Mobile"] as Category[],
    image:
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=460&h=230&fit=crop&q=80",
    github:
      "https://github.com/Silapareddy-Praveen-Kumar-Reddy/Agribridge",
  },
  {
    title: "TRASH TO TREASURE",
    description:
      "Developed a MERN stack application to help with trash maintenance and waste segregation. Implemented a gamification system, increasing user engagement by 25%.",
    tech: "NodeJS, ExpressJS, Firebase, FastAPI",
    categories: ["Web Dev"] as Category[],
    image:
      "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=460&h=230&fit=crop&q=80",
    github:
      "https://github.com/Silapareddy-Praveen-Kumar-Reddy/TRASH-TO-TRESURE",
    live: "https://trash-to-treasure.netlify.app/",
  },
  {
    title: "FACE RECOGNITION",
    description:
      "Built an app where users can upload an image to get a prediction using a pre-trained model. Achieved 96% accuracy and optimized detection algorithm with 30% faster processing.",
    tech: "Python, OpenCV, MediaPipe",
    categories: ["AI/ML"] as Category[],
    image:
      "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=460&h=230&fit=crop&q=80",
    github:
      "https://github.com/silapareddy/Face-Detection-Image-Processing-",
  },
];

const PortfolioTab = () => {
  const [active, setActive] = useState<Category>("All");

  const filtered =
    active === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.categories.includes(active));

  return (
    <article className="tab-panel">
      <h2 className="section-title">Portfolio</h2>

      {/* Filter bar */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 24 }}>
        {FILTERS.map((f) => (
          <button
            key={f}
            className={`filter-btn${active === f ? " active" : ""}`}
            onClick={() => setActive(f)}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Project grid */}
      <div className="project-grid">
        {filtered.map((project) => (
          <article key={project.title} className="project-card">
            {/* ── Cover image with category badges ── */}
            <div style={{ position: "relative", overflow: "hidden" }}>
              <img
                src={project.image}
                alt={project.title}
                style={{
                  width: "100%",
                  height: 200,
                  objectFit: "cover",
                  display: "block",
                  transition: "transform 0.4s ease",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLImageElement).style.transform =
                    "scale(1.04)")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLImageElement).style.transform =
                    "scale(1)")
                }
              />

              {/* Category badges — top right, overlaid on image */}
              <div
                style={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                  display: "flex",
                  gap: 5,
                  flexWrap: "wrap",
                  justifyContent: "flex-end",
                }}
              >
                {project.categories.map((cat) => (
                  <span
                    key={cat}
                    style={{
                      fontSize: "0.68rem",
                      fontWeight: 700,
                      color: "#1a1a1f",
                      background: "#ffb100",
                      borderRadius: 6,
                      padding: "3px 9px",
                      letterSpacing: "0.02em",
                    }}
                  >
                    {cat}
                  </span>
                ))}
              </div>
            </div>

            {/* ── Card body ── */}
            <div style={{ padding: "16px 18px 18px" }}>
              <h3
                style={{
                  fontSize: "0.95rem",
                  fontWeight: 700,
                  color: "#fff",
                  marginBottom: 8,
                  letterSpacing: "0.02em",
                }}
              >
                {project.title}
              </h3>

              <p
                style={{
                  fontSize: "0.82rem",
                  color: "#777",
                  lineHeight: 1.7,
                  marginBottom: 12,
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {project.description}
              </p>

              {/* Tech stack — orange text, comma-separated */}
              <p
                style={{
                  fontSize: "0.8rem",
                  fontWeight: 500,
                  color: "#ffb100",
                  marginBottom: 14,
                  lineHeight: 1.5,
                }}
              >
                {project.tech}
              </p>

              {/* Action links */}
              <div style={{ display: "flex", gap: 8 }}>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline"
                >
                  <Github size={13} strokeWidth={1.8} />
                  Code
                </a>
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline"
                  >
                    <ExternalLink size={13} strokeWidth={1.8} />
                    Live
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>

      {filtered.length === 0 && (
        <p
          style={{
            textAlign: "center",
            color: "#444",
            marginTop: 48,
            fontSize: "0.9rem",
          }}
        >
          No projects in this category yet.
        </p>
      )}
    </article>
  );
};

export default PortfolioTab;
