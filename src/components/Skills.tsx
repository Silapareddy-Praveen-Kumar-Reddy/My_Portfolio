import { Card } from "@/components/ui/card";
import { codingProfiles, personalSkills } from "@/data/portfolio";
import { CheckCircle2, Globe, Star } from "lucide-react";
import { cn } from "@/lib/utils";

const Skills = () => {
  return (
    <section id="skills" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="text-center space-y-4 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold">
              <span className="text-gradient">Skills & Expertise</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Technologies and tools I work with
            </p>
          </div>

          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-start">
            <div className="space-y-6">
              <div className="space-y-2">
                <p className="uppercase tracking-[0.35em] text-xs text-primary font-semibold">
                  Features
                </p>
                <h3 className="text-3xl md:text-4xl font-bold">
                  Personal Skill
                </h3>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {personalSkills.map((skill, idx) => (
                  <Card
                    key={skill.name}
                    className="flex items-center gap-3 rounded-2xl shadow-lg animate-fade-in border border-white/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-primary/40 px-4 py-3 md:px-5 md:py-4"
                    style={{
                      animationDelay: `${idx * 0.05}s`,
                      backgroundColor: skill.color,
                      color: skill.textColor ?? "#ffffff",
                    }}
                  >
                    <div className="w-12 h-12 rounded-xl bg-black/15 flex items-center justify-center">
                      <img
                        src={skill.icon}
                        alt={skill.name}
                        className="w-8 h-8 object-contain drop-shadow"
                        loading="lazy"
                      />
                    </div>
                    <p className="text-sm font-semibold tracking-wide uppercase">
                      {skill.name}
                    </p>
                  </Card>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <p className="uppercase tracking-[0.35em] text-xs text-primary font-semibold">
                  Features
                </p>
                <h3 className="text-3xl md:text-4xl font-bold">
                  Coding Profile
                </h3>
              </div>
              <div className="space-y-6">
                {codingProfiles.map((profile, idx) => (
                  <Card
                    key={profile.name}
                    className="p-6 bg-card/70 border border-white/5 rounded-3xl space-y-4 animate-fade-in"
                    style={{ animationDelay: `${idx * 0.08}s` }}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={profile.icon}
                          alt={profile.name}
                          className="w-10 h-10 object-contain"
                          loading="lazy"
                        />
                        <h4 className="text-2xl font-bold uppercase tracking-wide">
                          {profile.name}
                        </h4>
                      </div>
                      <a
                        href={profile.link}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 text-sm text-primary font-semibold hover:underline"
                      >
                        <Globe className="w-4 h-4" />
                        Profile
                      </a>
                    </div>

                    <div className="space-y-2">
                      {profile.stats.map((stat) => (
                        <div
                          key={`${profile.name}-${stat.label}`}
                          className="flex items-center gap-3 text-sm"
                        >
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                          <span className="text-muted-foreground">{stat.label}:</span>
                          <span className="font-semibold text-foreground">{stat.value}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center gap-2 pt-2">
                      {Array.from({ length: 5 }).map((_, starIndex) => (
                        <Star
                          key={`${profile.name}-star-${starIndex}`}
                          className={cn(
                            "w-4 h-4",
                            starIndex < profile.rating
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-muted-foreground/50"
                          )}
                        />
                      ))}
                    </div>

                    {profile.grade && (
                      <div className="flex items-center gap-3 pt-1 text-sm text-muted-foreground">
                        <span className="font-semibold text-foreground">Grade: {profile.grade}</span>
                        <span>Overall GitHub activity score</span>
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
