import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";
import { projects } from "@/data/portfolio";

const Projects = () => {
  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-4 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold">
              <span className="text-gradient">My Projects</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              A selection of the products, experiments, and collaborations I've shipped recently.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project, idx) => (
              <Card
                key={project.title}
                className="p-6 card-glow bg-card/50 backdrop-blur space-y-4 animate-fade-in"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-foreground">
                    {project.title}
                  </h3>
                  <p className="text-primary text-sm font-mono">{project.tech}</p>
                </div>

                <p className="text-muted-foreground leading-relaxed">
                  {project.description}
                </p>

                <div className="flex gap-4 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                    asChild
                  >
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <Github className="w-4 h-4" />
                      View Code
                    </a>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
