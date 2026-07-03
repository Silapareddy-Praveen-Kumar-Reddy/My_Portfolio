import { useState } from "react";
import { Mail, Phone, Calendar, MapPin, Github, Linkedin, Code2, ChevronDown, Globe } from "lucide-react";
import { personalData } from "@/data/portfolio";

const Sidebar = () => {
  const [showContacts, setShowContacts] = useState(false);

  return (
    <aside
      className="surface p-6 flex flex-col gap-0"
      style={{ minHeight: "fit-content" }}
    >
      {/* Avatar + Name + Title */}
      <div className="flex flex-col items-center text-center gap-4 pb-5">
        <div
          className="relative"
          style={{
            width: 110,
            height: 110,
            borderRadius: "50%",
            padding: 3,
            background: "linear-gradient(135deg, #ffb100, #ff8c00)",
          }}
        >
          <img
            src="/profile.jpg"
            alt="Praveen Kumar Reddy"
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              objectFit: "cover",
              objectPosition: "center top",
              border: "3px solid #1a1a1f",
            }}
          />
        </div>

        <div>
          <h1
            style={{
              fontSize: "1.2rem",
              fontWeight: 700,
              color: "#ffffff",
              lineHeight: 1.3,
              marginBottom: 6,
            }}
          >
            Praveen Kumar Reddy
          </h1>
          <p
            style={{
              fontSize: "0.78rem",
              fontWeight: 500,
              color: "#9a9a9a",
              background: "rgba(255,255,255,0.05)",
              borderRadius: 8,
              padding: "4px 12px",
              letterSpacing: "0.03em",
            }}
          >
            Software Engineer | ML Engineer
          </p>
        </div>

        {/* Show Contacts Button */}
        <button
          onClick={() => setShowContacts(!showContacts)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            fontSize: "0.82rem",
            fontWeight: 600,
            color: showContacts ? "#ffb100" : "#9a9a9a",
            background: "rgba(255,177,0,0.08)",
            border: "1px solid rgba(255,177,0,0.2)",
            borderRadius: 10,
            padding: "7px 16px",
            cursor: "pointer",
            transition: "all 0.2s",
            fontFamily: "'Poppins', sans-serif",
          }}
          aria-expanded={showContacts}
          aria-controls="sidebar-contacts"
        >
          Show Contacts
          <ChevronDown
            size={14}
            style={{
              transition: "transform 0.3s",
              transform: showContacts ? "rotate(180deg)" : "rotate(0deg)",
            }}
          />
        </button>
      </div>

      {/* Collapsible contacts */}
      <div
        id="sidebar-contacts"
        style={{
          maxHeight: showContacts ? "400px" : "0px",
          opacity: showContacts ? 1 : 0,
          overflow: "hidden",
          transition: "max-height 0.4s ease, opacity 0.35s ease",
        }}
      >
        <div className="separator" />

        <ul style={{ display: "flex", flexDirection: "column", gap: 16, padding: "4px 0" }}>
          {[
            {
              icon: <Mail size={16} />, label: "Email",
              value: personalData.email,
              href: `mailto:${personalData.email}`,
              isLink: true,
            },
            {
              icon: <Phone size={16} />, label: "Phone",
              value: personalData.phone,
              href: `tel:${personalData.phone}`,
              isLink: true,
            },
            {
              icon: <Calendar size={16} />, label: "Birthday",
              value: personalData.dob,
              isLink: false,
            },
            {
              icon: <MapPin size={16} />, label: "Location",
              value: personalData.location,
              isLink: false,
            },
          ].map((item) => (
            <li key={item.label} style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  background: "rgba(255,177,0,0.1)",
                  borderRadius: 10,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#ffb100",
                  flexShrink: 0,
                }}
              >
                {item.icon}
              </div>
              <div>
                <p style={{ fontSize: "0.72rem", color: "#9a9a9a", marginBottom: 2, fontWeight: 500 }}>
                  {item.label}
                </p>
                {item.isLink ? (
                  <a
                    href={item.href}
                    style={{
                      fontSize: "0.82rem",
                      color: "#e8e8e8",
                      fontWeight: 500,
                      textDecoration: "none",
                      wordBreak: "break-all",
                    }}
                  >
                    {item.value}
                  </a>
                ) : (
                  <span style={{ fontSize: "0.82rem", color: "#e8e8e8", fontWeight: 500 }}>
                    {item.value}
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>

        <div className="separator" />

        {/* Social links */}
        <ul style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
          {[
            { href: personalData.linkedin, icon: <Linkedin size={17} />, label: "LinkedIn" },
            { href: personalData.github, icon: <Github size={17} />, label: "GitHub" },
            { href: personalData.leetcode, icon: <Code2 size={17} />, label: "LeetCode" },
            { href: personalData.portfolio, icon: <Globe size={17} />, label: "Portfolio" },
          ].map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn"
                title={s.label}
                aria-label={s.label}
              >
                {s.icon}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
