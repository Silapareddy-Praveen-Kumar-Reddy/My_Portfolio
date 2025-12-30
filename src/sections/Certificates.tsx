import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Award, ExternalLink } from "lucide-react";
import { certificates } from "@/data/portfolio";

const Certificates = () => (
  <section id="certificates" className="py-20">
    <div className="container mx-auto px-4">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-4 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold">
            <span className="text-gradient">Certificates</span>
          </h2>
          <p className="text-muted-foreground text-lg">Achievements and certifications</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {certificates.map((cert, idx) => (
            <Card
              key={cert.name}
              className="p-6 card-glow bg-card/50 backdrop-blur animate-fade-in"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center">
                    <Award className="w-6 h-6 text-primary-foreground" />
                  </div>
                </div>

                <div className="flex-1 space-y-3">
                  <div>
                    <h3 className="text-lg font-bold text-foreground">{cert.name}</h3>
                    <p className="text-sm text-primary">{cert.issuer}</p>
                  </div>

                  {cert.link && cert.link !== "#" && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-primary hover:text-white p-0 h-auto border-0 hover:underline transition-colors"
                      asChild
                    >
                      <a href={cert.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                        View Certificate
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default Certificates;
