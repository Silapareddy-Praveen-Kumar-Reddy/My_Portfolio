import { Button } from "@/components/ui/button";
import { Github, Linkedin, Download } from "lucide-react";
import { personalData } from "@/data/portfolio";
import { useTypewriter } from "@/hooks/use-typewriter";

const scrollToSection = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};

const downloadResume = () => {
  const link = document.createElement("a");
  link.href = "/resume.pdf";
  link.download = "resume.pdf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const Hero = () => {
  const heroRoles = ["ML Engineer", "Professional Coder", "Flutter Developer", "Full-Stack Developer", "Problem Solver", "Open Source Contributor"];
  const { text: typedRole } = useTypewriter(heroRoles);

  return (
    <section className="min-h-[90vh] flex items-center">
      <div className="container mx-auto px-4">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6 animate-fade-in">
            <p className="uppercase tracking-[0.4em] text-xs text-primary font-semibold">
              Welcome to my world
            </p>
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Hi, I'm <span className="text-gradient">{personalData.name.split(" ")[0]}</span>
              </h1>
              <h2 className="text-2xl md:text-4xl font-semibold text-muted-foreground flex items-center gap-3">
                <span className="text-gradient">{typedRole}</span>
                <span className="h-7 w-px bg-primary animate-pulse" aria-hidden />
              </h2>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Passionate about building intelligent products that blend AI, machine learning, and full-stack
              craftsmanship to solve real-world problems with creativity and impact.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className="px-10 py-6 rounded-full text-lg border border-primary bg-primary/10 hover:bg-white hover:text-black hover:border-white transition-all"
                onClick={() => scrollToSection("contact")}
              >
                Hire Me.
              </Button>
              <Button
                size="lg"
                variant="secondary"
                className="px-10 py-6 rounded-full text-lg border border-border hover:border-white hover:text-white transition-all"
                onClick={downloadResume}
              >
                <Download className="w-4 h-4 mr-2" />
                Download Resume
              </Button>
            </div>
            <div className="flex gap-5 pt-4">
              <a
                href={personalData.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-white hover:border-white transition-all"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href={personalData.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-white hover:border-white transition-all"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="relative max-w-sm ml-auto">
            <div className="relative rounded-[32px] bg-card/40 backdrop-blur-lg shadow-[0_20px_80px_rgba(0,0,0,0.4)] overflow-hidden">
              <img
                src="/profile.png"
                alt={personalData.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
