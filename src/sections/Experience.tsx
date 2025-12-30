import { Card } from "@/components/ui/card";
import { Briefcase, CheckCircle } from "lucide-react";
import { experiences } from "@/data/portfolio";

const Experience = () => (
  <section id="experience" className="py-20 bg-secondary/30">
    <div className="container mx-auto px-4">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-4 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold">
            <span className="text-gradient">Experience</span>
          </h2>
          <p className="text-muted-foreground text-lg">My professional journey</p>
        </div>

        <div className="space-y-6">
          {experiences.map((exp, idx) => (
            <Card
              key={`${exp.company}-${exp.date}`}
              className="p-6 card-glow bg-card/50 backdrop-blur animate-fade-in"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                    <Briefcase className="w-6 h-6 text-primary-foreground" />
                  </div>
                </div>

                <div className="flex-1 space-y-3">
                  <div>
                    <h3 className="text-xl font-bold text-foreground">{exp.role}</h3>
                    <p className="text-primary font-semibold">{exp.company}</p>
                    <p className="text-sm text-muted-foreground">{exp.date}</p>
                  </div>

                  <ul className="space-y-2">
                    {exp.duties.map((duty, dutyIdx) => (
                      <li key={dutyIdx} className="flex items-start gap-2 text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                        <span>{duty}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default Experience;
