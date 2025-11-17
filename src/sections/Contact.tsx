import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, Github, Linkedin, Send } from "lucide-react";
import { personalData } from "@/data/portfolio";

const Contact = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const subject = `Portfolio Contact from ${formState.name || "Visitor"}`;
      const body = `Name: ${formState.name}\nEmail: ${formState.email}\n\nMessage:\n${formState.message}`;
      window.location.href = `mailto:${personalData.email}?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`;
      setStatus("success");
      setFormState({ name: "", email: "", message: "" });
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
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
              <a
                href={`mailto:${personalData.email}`}
                className="flex items-center gap-4 p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-primary-foreground" />
                </div>
                <div className="overflow-hidden">
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-semibold text-foreground truncate">
                    {personalData.email}
                  </p>
                </div>
              </a>

              <a
                href={`tel:${personalData.phone}`}
                className="flex items-center gap-4 p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-semibold text-foreground">
                    {personalData.phone}
                  </p>
                </div>
              </a>

              <a
                href={personalData.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
                  <Github className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">GitHub</p>
                  <p className="font-semibold text-foreground">View Profile</p>
                </div>
              </a>

              <a
                href={personalData.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center flex-shrink-0">
                  <Linkedin className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">LinkedIn</p>
                  <p className="font-semibold text-foreground">Connect</p>
                </div>
              </a>
            </div>

            <div className="mt-8 text-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground"
                asChild
              >
                <a href={`mailto:${personalData.email}`}>
                  Send Me an Email
                </a>
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
                Drop a message and I’ll get back to you shortly.
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
                    onChange={handleChange}
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
                    onChange={handleChange}
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
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <p className="text-xs text-muted-foreground">
                  By submitting, I’ll prepare a response directly to your email.
                </p>
                <Button
                  type="submit"
                  size="lg"
                  className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Send Message
                </Button>
              </div>
              {status === "success" && (
                <p className="text-sm text-green-500 text-center">
                  Email client opened. Thank you for reaching out!
                </p>
              )}
              {status === "error" && (
                <p className="text-sm text-red-500 text-center">
                  Something went wrong. Please try emailing me directly.
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
