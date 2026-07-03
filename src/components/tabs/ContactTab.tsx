import { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { personalData } from "@/data/portfolio";

interface FormState {
  name: string;
  email: string;
  message: string;
}

const CONTACT_CARDS = [
  {
    icon: <Mail    size={18} strokeWidth={1.8} />,
    label: "Email",
    value: personalData.email,
    href: `mailto:${personalData.email}`,
  },
  {
    icon: <Phone   size={18} strokeWidth={1.8} />,
    label: "Phone",
    value: personalData.phone,
    href: `tel:${personalData.phone}`,
  },
  {
    icon: <MapPin  size={18} strokeWidth={1.8} />,
    label: "Location",
    value: personalData.location,
    href: undefined,
  },
];

const ContactTab = () => {
  const [form, setForm] = useState<FormState>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [sent, setSent] = useState(false);

  const validate = () => {
    const e: Partial<FormState> = {};
    if (!form.name.trim())            e.name    = "Name is required";
    if (!form.email.trim())           e.email   = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email";
    if (!form.message.trim())         e.message = "Message is required";
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    // Open mailto as the send mechanism
    const subject = encodeURIComponent(`Portfolio Contact from ${form.name}`);
    const body    = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`);
    window.location.href = `mailto:${personalData.email}?subject=${subject}&body=${body}`;
    setSent(true);
    setForm({ name: "", email: "", message: "" });
    setErrors({});
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
  };

  return (
    <article className="tab-panel">
      <h2 className="section-title">Contact</h2>

      {/* Contact info cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: 12,
          marginBottom: 36,
        }}
      >
        {CONTACT_CARDS.map((card) => (
          <div
            key={card.label}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "14px 16px",
              background: "rgba(255,255,255,0.025)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 14,
            }}
          >
            <div className="icon-box">{card.icon}</div>
            <div style={{ minWidth: 0 }}>
              <p style={{ fontSize: "0.68rem", fontWeight: 600, color: "#555", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 3 }}>
                {card.label}
              </p>
              {card.href ? (
                <a
                  href={card.href}
                  style={{ fontSize: "0.82rem", color: "#d4d4d4", wordBreak: "break-all" }}
                >
                  {card.value}
                </a>
              ) : (
                <span style={{ fontSize: "0.82rem", color: "#d4d4d4" }}>{card.value}</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Contact form */}
      <div
        style={{
          padding: "28px 24px",
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: 18,
        }}
      >
        <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "#fff", marginBottom: 22 }}>
          Send a Message
        </h3>

        {sent && (
          <div
            style={{
              padding: "12px 18px",
              background: "rgba(255,177,0,0.1)",
              border: "1px solid rgba(255,177,0,0.3)",
              borderRadius: 12,
              marginBottom: 20,
              fontSize: "0.88rem",
              color: "#ffb100",
            }}
          >
            ✓ Your message was prepared! Your email client should open shortly.
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 16,
              marginBottom: 16,
            }}
          >
            {/* Name */}
            <div>
              <label htmlFor="contact-name" className="form-label">Full Name</label>
              <input
                id="contact-name"
                type="text"
                name="name"
                placeholder="Praveen Kumar"
                value={form.name}
                onChange={handleChange}
                className="form-input"
                autoComplete="name"
              />
              {errors.name && (
                <p style={{ fontSize: "0.73rem", color: "#f87171", marginTop: 4 }}>{errors.name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="contact-email" className="form-label">Email Address</label>
              <input
                id="contact-email"
                type="email"
                name="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                className="form-input"
                autoComplete="email"
              />
              {errors.email && (
                <p style={{ fontSize: "0.73rem", color: "#f87171", marginTop: 4 }}>{errors.email}</p>
              )}
            </div>
          </div>

          {/* Message */}
          <div style={{ marginBottom: 22 }}>
            <label htmlFor="contact-message" className="form-label">Message</label>
            <textarea
              id="contact-message"
              name="message"
              rows={5}
              placeholder="Write your message here…"
              value={form.message}
              onChange={handleChange}
              className="form-input"
              style={{ resize: "vertical", minHeight: 120 }}
            />
            {errors.message && (
              <p style={{ fontSize: "0.73rem", color: "#f87171", marginTop: 4 }}>{errors.message}</p>
            )}
          </div>

          <button type="submit" className="btn-primary">
            <Send size={15} strokeWidth={1.8} />
            Send Message
          </button>
        </form>
      </div>
    </article>
  );
};

export default ContactTab;
