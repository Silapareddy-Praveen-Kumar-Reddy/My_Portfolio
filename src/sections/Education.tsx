import { Card } from "@/components/ui/card";
import { educationTimeline, experiences } from "@/data/portfolio";
import { GraduationCap, Briefcase } from "lucide-react";

const Education = () => {
  return (
    <section id="education" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="space-y-8">
          <div className="text-center space-y-4 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold">
              <span className="text-gradient">My Resume</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Education and experience milestones
            </p>
          </div>

          <div className="grid gap-10 lg:grid-cols-2">
            <div className="space-y-6">
              <div className="text-left space-y-2">
                <p className="uppercase tracking-[0.35em] text-xs text-primary font-semibold">
                  2020 - 2026
                </p>
                <h3 className="text-3xl font-bold">Education Quality</h3>
              </div>
              <div className="relative pl-6">
                <div className="absolute left-3 top-0 bottom-0 w-px bg-border" />
                <div className="space-y-8">
                  {educationTimeline.map((item, idx) => (
                    <Card
                      key={item.title}
                      className="group relative overflow-hidden p-6 bg-card/60 border border-white/5 backdrop-blur animate-fade-in transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:bg-card"
                      style={{ animationDelay: `${idx * 0.1}s` }}
                    >
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      <div className="absolute -left-3 top-8 w-4 h-4 rounded-full border-4 border-background bg-primary shadow-lg" />
                      <div className="relative flex items-center justify-between gap-4 mb-4">
                        <div>
                          <h4 className="text-xl font-bold">{item.title}</h4>
                          <p className="text-primary font-semibold">{item.institution}</p>
                          <p className="text-sm text-muted-foreground">{item.period}</p>
                        </div>
                        <span className="px-3 py-1 text-sm rounded-full bg-accent/10 text-accent font-semibold">
                          {item.score}
                        </span>
                      </div>
                      <p className="relative text-sm text-muted-foreground">{item.description}</p>
                    </Card>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="text-left space-y-2">
                <p className="uppercase tracking-[0.35em] text-xs text-primary font-semibold">
                  2024 - Present
                </p>
                <h3 className="text-3xl font-bold">Professional Experience</h3>
              </div>
              <div className="relative pl-6">
                <div className="absolute left-3 top-0 bottom-0 w-px bg-border" />
                <div className="space-y-8">
                  {experiences.map((exp, idx) => (
                    <Card
                      key={`${exp.company}-${exp.date}`}
                      className="group relative overflow-hidden p-6 bg-card/60 border border-white/5 backdrop-blur animate-fade-in transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:bg-card"
                      style={{ animationDelay: `${idx * 0.1}s` }}
                    >
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      <div className="absolute -left-3 top-8 w-4 h-4 rounded-full border-4 border-background bg-primary shadow-lg" />
                      <div className="relative flex items-center justify-between gap-4 mb-4">
                        <div>
                          <h4 className="text-xl font-bold">{exp.role}</h4>
                          <p className="text-primary font-semibold">{exp.company}</p>
                          <p className="text-sm text-muted-foreground">{exp.date}</p>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                          <Briefcase className="w-5 h-5 text-primary-foreground" />
                        </div>
                      </div>
                      <ul className="relative space-y-2 text-sm text-muted-foreground">
                        {exp.duties.map((duty, dutyIdx) => (
                          <li key={dutyIdx} className="flex gap-2">
                            <span className="text-accent">•</span>
                            <span>{duty}</span>
                          </li>
                        ))}
                      </ul>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
