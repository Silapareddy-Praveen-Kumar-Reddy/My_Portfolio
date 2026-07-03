import { useState } from "react";
import { projects } from "@/data/portfolio";
import { Github, ExternalLink, X } from "lucide-react";

type Category = "All" | "Web Dev" | "AI/ML" | "Mobile";

const PROJECT_CATEGORIES: Record<string, Category[]> = {
  "WASTE CLASSIFIER": ["AI/ML", "Web Dev"],
  AGRIBRIDGE: ["Mobile"],
  "TRASH TO TREASURE": ["Web Dev"],
  "FACE RECOGNITION": ["AI/ML"],
};

const PROJECT_IMAGES: Record<string, string> = {
  "WASTE CLASSIFIER":
    "https://images.unsplash.com/photo-1591696205602-2f950c417cb9?w=600&q=80",
  AGRIBRIDGE:
    "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600&q=80",
  "TRASH TO TREASURE":
    "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600&q=80",
  "FACE RECOGNITION":
    "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&q=80",
};

const FILTERS: Category[] = ["All", "Web Dev", "AI/ML", "Mobile"];

const PortfolioTab = () => {
  const [activeFilter, setActiveFilter] = useState<Category>("All");
  const [modalProject, setModalProject] = useState<(typeof projects)[0] | null>(null);

  const filtered = projects.filter((p) => {
    if (activeFilter === "All") return true;
    return PROJECT_CATEGORIES[p.title]?.includes(activeFilter);
  });

  return (
    <article
      id="panel-portfolio"
      role="tabpanel"
      aria-labelledby="tab-portfolio"
      className="tab-panel"
    >
      {/* Filter buttons */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 28 }}>
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`filter-btn ${activeFilter === f ? "active" : ""}`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Project grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: 20,
        }}
      >
        {filtered.map((project) => (
          <div
            key={project.title}
            onClick={() => setModalProject(project)}
            style={{
              background: "#1a1a1f",
              borderRadius: 16,
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.06)",
              cursor: "pointer",
              transition: "transform 0.25s, border-color 0.25s, box-shadow 0.25s",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLDivElement;
              el.style.transform = "translateY(-5px)";
              el.style.borderColor = "rgba(255,177,0,0.35)";
              el.style.boxShadow = "0 12px 32px rgba(255,177,0,0.12)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLDivElement;
              el.style.transform = "translateY(0)";
              el.style.borderColor = "rgba(255,255,255,0.06)";
              el.style.boxShadow = "none";
            }}
          >
            {/* Thumbnail */}
            <div style={{ position: "relative", paddingTop: "58%", overflow: "hidden" }}>
              <img
                src={PROJECT_IMAGES[project.title]}
                alt={project.title}
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "transform 0.4s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLImageElement).style.transform = "scale(1.06)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLImageElement).style.transform = "scale(1)";
                }}
              />
              {/* Category badge */}
              <div
                style={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                  display: "flex",
                  gap: 5,
                  flexWrap: "wrap",
                }}
              >
                {PROJECT_CATEGORIES[project.title]?.map((cat) => (
                  <span
                    key={cat}
                    style={{
                      fontSize: "0.68rem",
                      fontWeight: 600,
                      background: "#ffb100",
                      color: "#1a1a1f",
                      padding: "2px 8px",
                      borderRadius: 6,
                    }}
                  >
                    {cat}
                  </span>
                ))}
              </div>
            </div>

            {/* Card body */}
            <div style={{ padding: "16px 18px" }}>
              <h3
                style={{
                  fontSize: "0.95rem",
                  fontWeight: 600,
                  color: "#ffffff",
                  marginBottom: 6,
                }}
              >
                {project.title}
              </h3>
              <p
                style={{
                  fontSize: "0.78rem",
                  color: "#9a9a9a",
                  lineHeight: 1.55,
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {project.description}
              </p>
              <p
                style={{
                  fontSize: "0.72rem",
                  color: "#ffb100",
                  marginTop: 8,
                  fontWeight: 500,
                }}
              >
                {project.tech}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalProject && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={modalProject.title}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.75)",
            backdropFilter: "blur(6px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            padding: 20,
          }}
          onClick={() => setModalProject(null)}
        >
          <div
            style={{
              background: "#212429",
              borderRadius: 20,
              overflow: "hidden",
              width: "100%",
              maxWidth: 540,
              maxHeight: "90vh",
              overflowY: "auto",
              border: "1px solid rgba(255,177,0,0.2)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal image */}
            <div style={{ position: "relative", paddingTop: "50%", overflow: "hidden" }}>
              <img
                src={PROJECT_IMAGES[modalProject.title]}
                alt={modalProject.title}
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
              <button
                onClick={() => setModalProject(null)}
                aria-label="Close modal"
                style={{
                  position: "absolute",
                  top: 12,
                  right: 12,
                  background: "rgba(0,0,0,0.6)",
                  border: "none",
                  borderRadius: "50%",
                  width: 34,
                  height: 34,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  color: "#ffffff",
                }}
              >
                <X size={16} />
              </button>
            </div>

            {/* Modal content */}
            <div style={{ padding: "24px 26px" }}>
              <h3
                style={{
                  fontSize: "1.15rem",
                  fontWeight: 700,
                  color: "#ffffff",
                  marginBottom: 6,
                }}
              >
                {modalProject.title}
              </h3>
              <p
                style={{
                  fontSize: "0.78rem",
                  color: "#ffb100",
                  fontWeight: 600,
                  marginBottom: 14,
                }}
              >
                {modalProject.tech}
              </p>
              <p
                style={{
                  fontSize: "0.87rem",
                  color: "#b0b0b0",
                  lineHeight: 1.75,
                  marginBottom: 20,
                }}
              >
                {modalProject.description}
              </p>

              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <a
                  href={modalProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "8px 18px",
                    background: "rgba(255,255,255,0.06)",
                    borderRadius: 10,
                    color: "#e8e8e8",
                    fontSize: "0.84rem",
                    fontWeight: 500,
                    textDecoration: "none",
                    border: "1px solid rgba(255,255,255,0.1)",
                    transition: "background 0.2s",
                  }}
                >
                  <Github size={15} /> View Code
                </a>
                {(modalProject as any).liveLink && (
                  <a
                    href={(modalProject as any).liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      padding: "8px 18px",
                      background: "#ffb100",
                      borderRadius: 10,
                      color: "#1a1a1f",
                      fontSize: "0.84rem",
                      fontWeight: 600,
                      textDecoration: "none",
                      transition: "background 0.2s",
                    }}
                  >
                    <ExternalLink size={15} /> Live Demo
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </article>
  );
};

export default PortfolioTab;
