import { motion } from "framer-motion";
import { Shield, Globe, Search, FileText, Building, PenTool, Users, Briefcase, Scale, Book, Flag, Landmark, Gavel, Target, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { useLanguage } from "@/contexts/LanguageContext";
import { Highlight } from "@/lib/highlight";

// Premium easing curve
const smoothEase = [0.25, 0.1, 0.25, 1.0];

export function StatsPanel() {
  const { t } = useLanguage();
  return (
    <div className="flex justify-end">
      <motion.div 
        initial={{ opacity: 0, x: 100, y: 50 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 1, ease: smoothEase }}
        viewport={{ margin: "-100px", once: true }}
        className="w-full md:w-1/2 glass-panel p-8 rounded-2xl border-l-4 border-l-primary"
      >
        <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-primary">
          <div className="h-2 w-2 bg-primary rounded-full" />
          {t("stats.impact")}
        </h3>
        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-1">
            <div className="text-4xl font-black text-[#C8141E] tracking-tight">60k+</div>
            <div className="text-sm text-muted-foreground uppercase tracking-wider">{t("stats.clients")}</div>
          </div>
          <div className="space-y-1">
            <div className="text-4xl font-black text-primary tracking-tight">1M+</div>
            <div className="text-sm text-muted-foreground uppercase tracking-wider">{t("stats.reached")}</div>
          </div>
          <div className="space-y-1">
            <div className="text-4xl font-black text-[#C8141E] tracking-tight">1000+</div>
            <div className="text-sm text-muted-foreground uppercase tracking-wider">{t("stats.lawyers")}</div>
          </div>
          <div className="space-y-1">
            <div className="text-4xl font-black text-primary tracking-tight">{t("stats.global")}</div>
            <div className="text-sm text-muted-foreground uppercase tracking-wider">{t("stats.globalDesc")}</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function ServicesPanel() {
  const { t } = useLanguage();
  return (
    <div className="flex justify-start">
      <motion.div 
        initial={{ opacity: 0, x: -100, y: 50 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 1, ease: smoothEase }}
        viewport={{ margin: "-100px", once: true }}
        className="w-full md:w-3/4 glass-panel p-10 rounded-2xl border-r-4 border-r-primary relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 p-4 opacity-20">
          <Shield className="h-32 w-32 text-primary" />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold mb-8">{t("services.title")}</h2>
        <div className="grid md:grid-cols-2 gap-8 relative z-10">
          {[
            {
              icon: Scale,
              title: t("services.litigation"),
              desc: t("services.litigationDesc")
            },
            {
              icon: Globe,
              title: t("services.immigration"),
              desc: t("services.immigrationDesc")
            },
            {
              icon: Search,
              title: t("services.research"),
              desc: t("services.researchDesc")
            },
            {
              icon: FileText,
              title: t("services.drafting"),
              desc: t("services.draftingDesc")
            },
            {
              icon: Building,
              title: t("services.dueDiligence"),
              desc: t("services.dueDiligenceDesc")
            },
            {
              icon: PenTool,
              title: t("services.arbitration"),
              desc: t("services.arbitrationDesc")
            }
          ].map((feature, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 + 0.3, duration: 0.5 }}
              viewport={{ once: true }}
              className="flex gap-4 items-start group"
            >
              <div className="mt-1 h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-colors duration-300 shrink-0">
                <feature.icon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2 text-white">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export function ChiefPatronSection() {
  const { t } = useLanguage();
  return (
    <div className="w-full flex justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 50 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1, ease: smoothEase }}
        viewport={{ margin: "-100px", once: true }}
        className="w-full max-w-5xl glass-panel p-8 md:p-12 rounded-3xl border border-primary/20 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/5 via-transparent to-primary/5 pointer-events-none" />
        
        <div className="flex flex-col md:flex-row items-center gap-12 relative z-10">
          {/* Image Container with Gold Frame Effect */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="relative shrink-0"
          >
            <div className="absolute -inset-4 border border-primary/30 rounded-xl rotate-3" />
            <div className="absolute -inset-4 border border-primary/30 rounded-xl -rotate-3" />
            <div className="relative h-80 w-full md:w-72 rounded-lg overflow-hidden shadow-[0_0_30px_rgba(255,215,0,0.15)] border-2 border-primary/50">
              <img 
                src="https://harmless-tapir-303.convex.cloud/api/storage/15d8cde7-8dd3-4ebd-8459-c2870e85c949" 
                alt="Honourable Mr. Justice K.G. Balakrishnan" 
                className="h-full w-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </motion.div>

          {/* Text Content */}
          <div className="text-center md:text-left space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-bold tracking-widest uppercase mb-4">
                {t("patron.title")}
              </div>
              <h2 className="text-3xl md:text-5xl font-bold mb-2 leading-tight">
                <Highlight
                  text={t("patron.name")}
                  keywords={["Justice", "K.G. Balakrishnan"]}
                />
              </h2>
              <div className="h-1 w-24 bg-gradient-to-r from-[#C8141E] via-primary to-transparent mx-auto md:mx-0 rounded-full my-6" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="space-y-3"
            >
              <div className="flex items-center gap-3 justify-center md:justify-start text-lg md:text-xl text-muted-foreground">
                <Gavel className="h-5 w-5 text-primary shrink-0" />
                <span>
                  <Highlight
                    text={t("patron.role1")}
                    keywords={["Chief Justice of India", "Chief Justice"]}
                  />
                </span>
              </div>
              <div className="flex items-center gap-3 justify-center md:justify-start text-lg md:text-xl text-muted-foreground">
                <Scale className="h-5 w-5 text-primary shrink-0" />
                <span>
                  <Highlight
                    text={t("patron.role2")}
                    keywords={["National Human Rights Commission"]}
                  />
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function MissionVisionSection() {
  const { t } = useLanguage();
  return (
    <div className="w-full grid md:grid-cols-2 gap-8">
      {/* Mission */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: smoothEase }}
        viewport={{ margin: "-50px", once: true }}
        className="glass-panel p-8 rounded-2xl border-t-4 border-t-primary relative overflow-hidden group"
      >
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
          <Target className="h-32 w-32 text-primary" />
        </div>
        <div className="relative z-10">
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-6 text-primary">
            <Target className="h-6 w-6" />
          </div>
          <h3 className="text-2xl font-bold mb-4 text-white">{t("mission.title")}</h3>
          <p className="text-muted-foreground text-lg leading-relaxed">
            <Highlight
              text={t("mission.desc")}
              keywords={["convenient", "secure", "cost-effective", "legal solution"]}
            />
          </p>
        </div>
      </motion.div>

      {/* Vision */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: smoothEase }}
        viewport={{ margin: "-50px", once: true }}
        className="glass-panel p-8 rounded-2xl border-t-4 border-t-primary relative overflow-hidden group"
      >
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
          <Eye className="h-32 w-32 text-primary" />
        </div>
        <div className="relative z-10">
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-6 text-primary">
            <Eye className="h-6 w-6" />
          </div>
          <h3 className="text-2xl font-bold mb-4 text-white">{t("vision.title")}</h3>
          <p className="text-muted-foreground text-lg leading-relaxed">
            <Highlight
              text={t("vision.desc")}
              keywords={["one roof", "click of button", "internationally", "domestically"]}
            />
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export function UserSegments() {
  const { t } = useLanguage();
  return (
    <div className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: smoothEase }}
        viewport={{ margin: "-50px", once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl font-bold mb-4">{t("segments.title")}</h2>
        <p className="text-muted-foreground">{t("segments.subtitle")}</p>
      </motion.div>
      
      <div className="grid md:grid-cols-3 gap-6">
        {[
          { icon: Users, title: t("segments.individuals"), desc: t("segments.individualsDesc"), action: t("segments.getHelp") },
          { icon: Briefcase, title: t("segments.corporates"), desc: t("segments.corporatesDesc"), action: t("segments.solutions") },
          { icon: Scale, title: t("segments.interns"), desc: t("segments.internsDesc"), action: t("segments.joinUs") }
        ].map((segment, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2, duration: 0.8, ease: smoothEase }}
            viewport={{ margin: "-50px", once: true }}
            className="group relative overflow-hidden rounded-xl glass-panel p-8 hover:bg-white/5 transition-all duration-500 border border-white/5 hover:border-primary/50"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <segment.icon className="h-12 w-12 text-primary mb-6 group-hover:scale-110 transition-transform duration-300" />
            <h3 className="text-2xl font-bold mb-2">{segment.title}</h3>
            <p className="text-muted-foreground mb-8 h-12">{segment.desc}</p>
            <Button variant="outline" className="w-full border-primary/30 hover:bg-primary hover:text-black transition-all duration-300">
              {segment.action}
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function ConstitutionSection() {
  const { t } = useLanguage();
  return (
    <div className="w-full">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 50 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1, ease: smoothEase }}
        viewport={{ margin: "-100px", once: true }}
        className="glass-panel p-8 md:p-12 rounded-3xl border border-white/10 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
        <div className="absolute -right-10 -top-10 opacity-10">
          <Landmark className="h-64 w-64 text-primary" />
        </div>

        <div className="relative z-10">
          <div className="text-center mb-12">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-4"
            >
              <Flag className="h-3 w-3" />
              {t("const.badge")}
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-3xl md:text-5xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#C8141E] via-[#A6812A] to-[#C8141E] tracking-tight"
            >
              {t("const.title")}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed"
            >
              <Highlight
                text={t("const.desc")}
                keywords={["supreme law", "26 November 1949", "26 January 1950", "Constitution of India"]}
              />
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: "Longest Written Constitution", desc: "Over 448 articles, 12 schedules, and multiple amendments. Draws inspiration from various global constitutions.", icon: Book },
              { title: "Sovereign, Socialist, Secular, Democratic Republic", desc: "India is independent, values social justice, respects all religions, and follows a democratic system where leaders are elected by the people.", icon: Flag },
              { title: "Fundamental Rights", desc: "Guarantees essential freedoms: Equality, Freedom, Against Exploitation, Religion, Cultural & Educational Rights, and Constitutional Remedies.", icon: Shield },
              { title: "Directive Principles of State Policy", desc: "Guidelines for government to create social and economic welfare. Not enforceable by law but fundamental to governance.", icon: FileText },
              { title: "Fundamental Duties", desc: "Moral obligations for every citizen, such as respecting the national flag, protecting public property, and promoting harmony.", icon: Users },
              { title: "Federal Structure with Unitary Features", desc: "Power shared between Centre and States, but Constitution makes the Centre stronger in emergencies.", icon: Building },
              { title: "Separation of Powers", desc: "Power distributed among Legislature, Executive, Judiciary, ensuring checks and balances.", icon: Scale },
              { title: "Independent Judiciary", desc: "Supreme Court at the top; ensures justice and protects the Constitution. Judicial Review power to strike down unconstitutional laws.", icon: Gavel },
              { title: "Universal Adult Franchise", desc: "Every Indian citizen aged 18+ has the right to vote, regardless of gender, caste, religion, or status.", icon: Users },
              { title: "Amendability", desc: "Constitution can be amended to adapt to changing needs, ensuring flexibility.", icon: PenTool }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30, y: 20 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 0.5 + (i * 0.1), duration: 0.6, ease: "easeOut" }}
                viewport={{ margin: "-50px", once: true }}
                className="flex gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5"
              >
                <div className="shrink-0 h-12 w-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center text-primary">
                  <item.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1 text-white">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function FinalCTA() {
  const { t } = useLanguage();
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9, y: 50 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 1, ease: smoothEase }}
      viewport={{ margin: "-50px", once: true }}
      className="glass-panel p-12 rounded-3xl text-center relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/10" />
      <div className="relative z-10">
        <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">
          <Highlight
            text={t("cta.title")}
            keywords={["Simpler.", "Quicker.", "Resourceful."]}
          />
        </h2>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          <Highlight
            text={t("cta.desc")}
            keywords={["60,000 clients", "justice", "path to justice"]}
          />
        </p>
        <Link to="/find-lawyer">
          <Button size="lg" className="bg-white text-black hover:bg-white/90 text-lg px-10 h-14 rounded-full font-bold shadow-[0_0_30px_rgba(255,255,255,0.3)]">
            {t("cta.button")}
          </Button>
        </Link>
      </div>
    </motion.div>
  );
}