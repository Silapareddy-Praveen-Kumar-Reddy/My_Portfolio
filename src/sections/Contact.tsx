import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, Github, Linkedin, Send } from "lucide-react";
import { personalData } from "@/data/portfolio";

type FormState = {
  name: string;
  email: string;
  message: string;
};

type Status = "idle" | "success" | "error";

const contactLinks = [
  { icon: Mail, label: "Email", value: personalData.email, href: `mailto:${personalData.email}`, gradient: "from-primary to-accent" },
  { icon: Phone, label: "Phone", value: personalData.phone, href: `tel:${personalData.phone}`, gradient: "from-accent to-primary" },
  { icon: Github, label: "GitHub", value: "View Profile", href: personalData.github, gradient: "from-primary to-accent", external: true },
  { icon: Linkedin, label: "LinkedIn", value: "Connect", href: personalData.linkedin, gradient: "from-accent to-primary", external: true },
] as const;

const ContactLink = ({ icon: Icon, label, value, href, gradient, external }: typeof contactLinks[number]) => (
  <a
    href={href}
    target={external ? "_blank" : undefined}
    rel={external ? "noopener noreferrer" : undefined}
    className="flex items-center gap-4 p-4 rounded-lg bg-secondary/50 border border-border/50 hover:bg-secondary hover:border-white transition-all"
  >
    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center flex-shrink-0`}>
      <Icon className="w-6 h-6 text-primary-foreground" />
    </div>
    <div className={value === personalData.email ? "overflow-hidden" : ""}>
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className={`font-semibold text-foreground ${value === personalData.email ? "truncate" : ""}`}>
        {value}
      </p>
    </div>
  </a>
);

const Contact = () => {
  const [formState, setFormState] = useState<FormState>({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");

  const updateField = (field: keyof FormState) => 
    ({ target }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormState(prev => ({ ...prev, [field]: target.value }));
    };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const subject = `Portfolio Contact from ${formState.name || "Visitor"}`;
    const body = `Name: ${formState.name}\nEmail: ${formState.email}\n\nMessage:\n${formState.message}`;
    const mailtoUrl = `mailto:${personalData.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    try {
      window.location.href = mailtoUrl;
      setStatus("success");
      setFormState({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  const statusMessages = {
    success: "Email client opened. Thank you for reaching out!",
    error: "Something went wrong. Please try emailing me directly.",
  };

  return (
    <section id="contact" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-4 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold">
              <span className="text-gradient">Get In Touch</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Feel free to reach out for collaborations or just a friendly chat
            </p>
          </div>

          <Card className="p-8 card-glow bg-card/50 backdrop-blur animate-fade-in">
            <div className="grid md:grid-cols-2 gap-6">
              {contactLinks.map((link) => (
                <ContactLink key={link.label} {...link} />
              ))}
            </div>

            <div className="mt-8 text-center">
              <Button
                size="lg"
                className="border border-primary bg-primary/10 hover:bg-white hover:text-black hover:border-white transition-all"
                asChild
              >
                <a href={`mailto:${personalData.email}`}>Send Me an Email</a>
              </Button>
            </div>
          </Card>

          <Card className="p-8 card-glow bg-card/60 backdrop-blur space-y-6 animate-fade-in">
            <div className="space-y-2 text-center">
              <p className="uppercase tracking-[0.35em] text-xs text-primary font-semibold">
                Let's Connect
              </p>
              <h3 className="text-3xl font-bold">Quick Contact Form</h3>
              <p className="text-muted-foreground text-sm">
                Drop a message and I'll get back to you shortly.
              </p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="John Doe"
                    value={formState.name}
                    onChange={updateField("name")}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={formState.email}
                    onChange={updateField("email")}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Share your idea, collaboration request, or question..."
                  rows={5}
                  value={formState.message}
                  onChange={updateField("message")}
                  required
                />
              </div>

              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <p className="text-xs text-muted-foreground">
                  By submitting, I'll prepare a response directly to your email.
                </p>
                <Button
                  type="submit"
                  size="lg"
                  className="border border-primary bg-primary/10 hover:bg-white hover:text-black hover:border-white transition-all flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Send Message
                </Button>
              </div>

              {status !== "idle" && (
                <p className={`text-sm text-center ${status === "success" ? "text-green-500" : "text-red-500"}`}>
                  {statusMessages[status]}
                </p>
              )}
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;
