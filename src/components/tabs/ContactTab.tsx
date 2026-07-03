import { useState } from "react";
import { personalData } from "@/data/portfolio";
import { Send, CheckCircle, AlertCircle } from "lucide-react";

const ContactTab = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.name.trim()) newErrors.name = "Name is required.";
    if (!form.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Enter a valid email address.";
    }
    if (!form.message.trim()) newErrors.message = "Message cannot be empty.";
    return newErrors;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    try {
      const subject = `Portfolio Contact from ${form.name}`;
      const body = `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`;
      window.location.href = `mailto:${personalData.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  const inputStyle = (hasError: boolean): React.CSSProperties => ({
    width: "100%",
    background: "#1a1a1f",
    border: `1px solid ${hasError ? "#ef4444" : "rgba(255,255,255,0.1)"}`,
    borderRadius: 12,
    padding: "12px 16px",
    color: "#e8e8e8",
    fontSize: "0.88rem",
    fontFamily: "'Poppins', sans-serif",
    outline: "none",
    transition: "border-color 0.2s",
  });

  return (
    <article
      id="panel-contact"
      role="tabpanel"
      aria-labelledby="tab-contact"
      className="tab-panel"
      style={{ display: "flex", flexDirection: "column", gap: 36 }}
    >
      {/* Map */}
      <section>
        <h2 className="section-title">Location</h2>
        <div
          style={{
            borderRadius: 16,
            overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.08)",
            height: 240,
          }}
        >
          <iframe
            title="Bhimavaram, Andhra Pradesh location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30680.27752!2d81.5211!3d16.5448!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a37d4f2c3f0fcf7%3A0xc9eba0fa72fa5d36!2sBhimavaram%2C%20Andhra%20Pradesh!5e0!3m2!1sen!2sin!4v1699000000000!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0, display: "block", filter: "invert(90%) hue-rotate(180deg)" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>

      {/* Contact Form */}
      <section>
        <h2 className="section-title">Send a Message</h2>
        <form onSubmit={handleSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          {/* Name + Email row */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
              gap: 16,
            }}
          >
            <div>
              <label
                htmlFor="contact-name"
                style={{ fontSize: "0.8rem", color: "#9a9a9a", marginBottom: 6, display: "block", fontWeight: 500 }}
              >
                Full Name
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                placeholder="John Doe"
                value={form.name}
                onChange={handleChange}
                style={inputStyle(!!errors.name)}
                onFocus={(e) => {
                  if (!errors.name) (e.target as HTMLInputElement).style.borderColor = "#ffb100";
                }}
                onBlur={(e) => {
                  if (!errors.name) (e.target as HTMLInputElement).style.borderColor = "rgba(255,255,255,0.1)";
                }}
              />
              {errors.name && (
                <p style={{ color: "#ef4444", fontSize: "0.75rem", marginTop: 4 }}>{errors.name}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="contact-email"
                style={{ fontSize: "0.8rem", color: "#9a9a9a", marginBottom: 6, display: "block", fontWeight: 500 }}
              >
                Email Address
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                style={inputStyle(!!errors.email)}
                onFocus={(e) => {
                  if (!errors.email) (e.target as HTMLInputElement).style.borderColor = "#ffb100";
                }}
                onBlur={(e) => {
                  if (!errors.email) (e.target as HTMLInputElement).style.borderColor = "rgba(255,255,255,0.1)";
                }}
              />
              {errors.email && (
                <p style={{ color: "#ef4444", fontSize: "0.75rem", marginTop: 4 }}>{errors.email}</p>
              )}
            </div>
          </div>

          {/* Message */}
          <div>
            <label
              htmlFor="contact-message"
              style={{ fontSize: "0.8rem", color: "#9a9a9a", marginBottom: 6, display: "block", fontWeight: 500 }}
            >
              Your Message
            </label>
            <textarea
              id="contact-message"
              name="message"
              rows={5}
              placeholder="Share your idea, project, or question..."
              value={form.message}
              onChange={handleChange}
              style={{ ...inputStyle(!!errors.message), resize: "vertical" }}
              onFocus={(e) => {
                if (!errors.message) (e.target as HTMLTextAreaElement).style.borderColor = "#ffb100";
              }}
              onBlur={(e) => {
                if (!errors.message) (e.target as HTMLTextAreaElement).style.borderColor = "rgba(255,255,255,0.1)";
              }}
            />
            {errors.message && (
              <p style={{ color: "#ef4444", fontSize: "0.75rem", marginTop: 4 }}>{errors.message}</p>
            )}
          </div>

          {/* Submit */}
          <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
            <button type="submit" className="btn-orange" style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Send size={15} /> Send Message
            </button>

            {status === "success" && (
              <span style={{ display: "flex", alignItems: "center", gap: 6, color: "#22c55e", fontSize: "0.85rem" }}>
                <CheckCircle size={16} /> Email client opened!
              </span>
            )}
            {status === "error" && (
              <span style={{ display: "flex", alignItems: "center", gap: 6, color: "#ef4444", fontSize: "0.85rem" }}>
                <AlertCircle size={16} /> Something went wrong. Email me directly.
              </span>
            )}
          </div>
        </form>
      </section>
    </article>
  );
};

export default ContactTab;
