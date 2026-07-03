import { useState } from "react";
import { Mail, Phone, Calendar, MapPin, Github, Linkedin, Code2, Globe, ChevronDown } from "lucide-react";
import { personalData } from "@/data/portfolio";

const CONTACTS = [
  { icon: <Mail    size={15} strokeWidth={1.8} />, label: "Email",    value: personalData.email,    href: `mailto:${personalData.email}`,   isLink: true },
  { icon: <Phone   size={15} strokeWidth={1.8} />, label: "Phone",    value: personalData.phone,    href: `tel:${personalData.phone}`,      isLink: true },
  { icon: <Calendar size={15} strokeWidth={1.8}/>, label: "Birthday", value: personalData.dob,                                             isLink: false },
  { icon: <MapPin  size={15} strokeWidth={1.8} />, label: "Location", value: personalData.location,                                        isLink: false },
];

const SOCIALS = [
  { href: personalData.linkedin,  icon: <Linkedin size={15} strokeWidth={1.8} />, label: "LinkedIn" },
  { href: personalData.github,    icon: <Github   size={15} strokeWidth={1.8} />, label: "GitHub" },
  { href: personalData.leetcode,  icon: <Code2    size={15} strokeWidth={1.8} />, label: "LeetCode" },
  { href: personalData.portfolio, icon: <Globe    size={15} strokeWidth={1.8} />, label: "Portfolio" },
];

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  return (
    <aside className="glass-card sidebar-card" style={{ overflow: "hidden" }}>

      {/* ── TOP SECTION ── avatar · name · title · chevron btn ── */}
      <div className="sidebar-top">

        {/* Avatar (rounded square) */}
        <div className="sidebar-avatar-wrap">
          <img
            src="/profile.png"
            alt="Praveen Kumar Reddy"
            className="sidebar-avatar-img"
          />
        </div>

        {/* Name + title */}
        <div className="sidebar-identity">
          <h1 className="sidebar-name">Praveen Kumar Reddy</h1>
          <span className="sidebar-title-pill">Software Engineer | ML Engineer</span>
        </div>

        {/* Toggle button — text on desktop, icon-only on mobile */}
        <button
          className="sidebar-toggle-btn"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Hide contacts" : "Show contacts"}
        >
          {/* Desktop: "Show Contacts" text */}
          <span className="toggle-label">{open ? "Hide" : "Show"} Contacts</span>
          {/* Icon always shown */}
          <ChevronDown
            size={14}
            strokeWidth={2.2}
            className="toggle-chevron"
            style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
          />
        </button>

      </div>

      {/* ── CONTACTS + SOCIALS (toggle ≤900px / always ≥901px) ── */}
      <div
        className="sidebar-contacts-wrapper"
        style={{
          maxHeight: open ? "600px" : "0px",
          opacity: open ? 1 : 0,
          overflow: "hidden",
          transition: "max-height 0.45s ease, opacity 0.35s ease",
        }}
      >
        <div className="separator" style={{ margin: "24px 0" }} />

        <ul className="contacts-list">
          {CONTACTS.map((c) => (
            <li key={c.label} className="contact-item">
              <div className="icon-box">{c.icon}</div>
              <div className="contact-info">
                <span className="contact-label">{c.label}</span>
                {c.isLink ? (
                  <a href={(c as any).href} className="contact-value" title={c.value}>
                    {c.value}
                  </a>
                ) : (
                  <span className="contact-value" title={c.value}>{c.value}</span>
                )}
              </div>
            </li>
          ))}
        </ul>

        {/* Removed bottom separator to match reference */}
        
        <ul className="social-list" style={{ marginTop: 28 }}>
          {SOCIALS.map((s) => (
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
