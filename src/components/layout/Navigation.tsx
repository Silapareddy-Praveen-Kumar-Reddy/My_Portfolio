import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "projects", label: "Projects" },
  { href: "education", label: "My Resume" },
  { href: "skills", label: "Skills" },
  { href: "certificates", label: "Certificates" },
  { href: "contact", label: "Contact" },
];

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + 100;
      const section = navLinks.find(({ href }) => {
        const el = document.getElementById(href);
        if (!el) return false;
        const { offsetTop, offsetHeight } = el;
        return scrollY >= offsetTop && scrollY < offsetTop + offsetHeight;
      });
      if (section) setActiveSection(section.href);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-xl font-bold text-gradient cursor-pointer hover:text-white transition-colors"
          >
            PKR
          </button>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(({ href, label }) => (
              <Button
                key={href}
                variant="ghost"
                onClick={() => scrollToSection(href)}
                className={activeSection === href 
                  ? "text-primary" 
                  : "text-muted-foreground hover:text-white"
                }
              >
                {label}
              </Button>
            ))}
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </Button>
        </div>

        {isOpen && (
          <div className="md:hidden py-4 space-y-2 animate-fade-in">
            {navLinks.map(({ href, label }) => (
              <Button
                key={href}
                variant="ghost"
                onClick={() => scrollToSection(href)}
                className={`w-full justify-start ${
                  activeSection === href
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-white"
                }`}
              >
                {label}
              </Button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
