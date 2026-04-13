import { useState, useEffect, useRef, Suspense, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Link } from "react-router";
import { ArrowRight, ChevronDown, Scale } from "lucide-react";
import { JudicialModel } from "@/components/JudicialModel";
import { Stars } from "@react-three/drei";
import { StatsPanel, ServicesPanel, UserSegments, ConstitutionSection, FinalCTA, ChiefPatronSection, MissionVisionSection } from "@/components/LandingSections";
import { LawsSection } from "@/components/LawsSection";
import { GallerySection } from "@/components/GallerySection";
import { useLanguage } from "@/contexts/LanguageContext";
import { WebGLErrorBoundary } from "@/components/WebGLErrorBoundary";
import { isWebGLAvailable } from "@/lib/utils";
import { Highlight } from "@/lib/highlight";

const TRAIL_LENGTH = 32;

type TrailSegment = { id: number; x: number; y: number; angle: number; length: number };

function SideWords() {
  const [step, setStep] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const leftWord = "JUSTICE";
  const rightWord = "SECURE";
  const maxLength = Math.max(leftWord.length, rightWord.length);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (showAll) {
      timer = setTimeout(() => {
        setShowAll(false);
        setStep(0);
      }, 1000);
    } else {
      timer = setTimeout(() => {
        if (step < maxLength - 1) {
          setStep(s => s + 1);
        } else {
          setShowAll(true);
        }
      }, 300);
    }

    return () => clearTimeout(timer);
  }, [step, showAll, maxLength]);

  return (
    <>
      <div className="fixed left-4 lg:left-8 top-1/2 -translate-y-1/2 flex flex-col gap-2 lg:gap-4 z-40 hidden md:flex pointer-events-none">
        {leftWord.split('').map((char, i) => (
          <motion.span 
            key={i}
            className="text-2xl lg:text-4xl font-black text-primary drop-shadow-[0_0_10px_rgba(255,215,0,0.5)]"
            initial={{ opacity: 0, x: -20 }}
            animate={{ 
              opacity: showAll ? 1 : (i === step ? 1 : 0),
              x: showAll ? 0 : (i === step ? 0 : -10),
              scale: showAll ? 1 : (i === step ? 1.2 : 0.8),
              filter: showAll ? "blur(0px)" : (i === step ? "blur(0px)" : "blur(4px)")
            }}
            transition={{ duration: 0.2 }}
          >
            {char}
          </motion.span>
        ))}
      </div>

      <div className="fixed right-4 lg:right-8 top-1/2 -translate-y-1/2 flex flex-col gap-2 lg:gap-4 z-40 hidden md:flex pointer-events-none">
        {rightWord.split('').map((char, i) => (
          <motion.span 
            key={i}
            className="text-2xl lg:text-4xl font-black text-primary drop-shadow-[0_0_10px_rgba(255,215,0,0.5)]"
            initial={{ opacity: 0, x: 20 }}
            animate={{ 
              opacity: showAll ? 1 : (i === step ? 1 : 0),
              x: showAll ? 0 : (i === step ? 0 : 10),
              scale: showAll ? 1 : (i === step ? 1.2 : 0.8),
              filter: showAll ? "blur(0px)" : (i === step ? "blur(0px)" : "blur(4px)")
            }}
            transition={{ duration: 0.2 }}
          >
            {char}
          </motion.span>
        ))}
      </div>
    </>
  );
}

export default function Landing() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [glowPosition, setGlowPosition] = useState({ x: 50, y: 50 });
  const [trailSegments, setTrailSegments] = useState<TrailSegment[]>([]);
  const trailIdRef = useRef(0);
  const lastPointerRef = useRef<{ x: number; y: number } | null>(null);
  const glowRaf = useRef<number | null>(null);
  const idleTimeoutRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
  const [isMobile, setIsMobile] = useState(false);
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    setHasWebGL(isWebGLAvailable());
    const updateIsMobile = () => setIsMobile(window.innerWidth < 768);
    updateIsMobile();
    window.addEventListener("resize", updateIsMobile);
    return () => window.removeEventListener("resize", updateIsMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const scrolled = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(scrolled / (window.innerHeight * 0.8), 1); // Normalize to first viewport height
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const scheduleTrailClear = () => {
      if (idleTimeoutRef.current) window.clearTimeout(idleTimeoutRef.current);
      idleTimeoutRef.current = window.setTimeout(() => setTrailSegments([]), 80);
    };

    const handlePointerMove = (event: PointerEvent) => {
      const { clientX, clientY } = event;
      if (glowRaf.current) cancelAnimationFrame(glowRaf.current);
      glowRaf.current = window.requestAnimationFrame(() => {
        setGlowPosition({
          x: (clientX / window.innerWidth) * 100,
          y: (clientY / window.innerHeight) * 100,
        });

        const previousPoint = lastPointerRef.current;
        lastPointerRef.current = { x: clientX, y: clientY };

        if (!previousPoint) return;

        const dx = clientX - previousPoint.x;
        const dy = clientY - previousPoint.y;
        const distance = Math.hypot(dx, dy);

        if (distance < 1) {
          scheduleTrailClear();
          return;
        }

        const steps = Math.max(1, Math.floor(distance / 6));
        const segmentsToAdd: TrailSegment[] = [];

        for (let step = 0; step < steps; step++) {
          const startT = step / steps;
          const endT = (step + 1) / steps;
          const startX = previousPoint.x + dx * startT;
          const startY = previousPoint.y + dy * startT;
          const endX = previousPoint.x + dx * endT;
          const endY = previousPoint.y + dy * endT;
          const segDX = endX - startX;
          const segDY = endY - startY;
          const segLength = Math.hypot(segDX, segDY);

          if (!segLength) continue;

          segmentsToAdd.push({
            id: trailIdRef.current++,
            x: startX + segDX / 2,
            y: startY + segDY / 2,
            angle: Math.atan2(segDY, segDX),
            length: segLength,
          });
        }

        if (segmentsToAdd.length) {
          setTrailSegments((prev) => {
            const next = [...prev, ...segmentsToAdd];
            return next.length > TRAIL_LENGTH ? next.slice(next.length - TRAIL_LENGTH) : next;
          });
          scheduleTrailClear();
        }
      });
    };

    const handlePointerLeave = () => {
      lastPointerRef.current = null;
      setTrailSegments([]);
      if (idleTimeoutRef.current) window.clearTimeout(idleTimeoutRef.current);
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      if (glowRaf.current) cancelAnimationFrame(glowRaf.current);
      if (idleTimeoutRef.current) window.clearTimeout(idleTimeoutRef.current);
    };
  }, []);

  // Premium easing curve (similar to Apple/Tesla smooth ease)
  const smoothEase = [0.25, 0.1, 0.25, 1.0];
  const cameraConfig = useMemo(
    () => ({
      position: [0, isMobile ? 0.12 : 0, isMobile ? 12.5 : 9] as [number, number, number],
      fov: isMobile ? 60 : 45,
    }),
    [isMobile],
  );

  const FallbackBalance = () => (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
      <div className="relative animate-pulse">
        {/* Glow effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 blur-[100px] rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-secondary/20 blur-[80px] rounded-full" />
        
        {/* Large Scale Icon mimicking the 3D model */}
        <Scale 
          className="relative w-64 h-64 md:w-96 md:h-96 text-primary drop-shadow-[0_0_30px_rgba(247,201,72,0.6)] opacity-90" 
          strokeWidth={0.8}
        />
        
        {/* Animated rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[500px] md:h-[500px] border border-primary/10 rounded-full animate-[spin_10s_linear_infinite]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] md:w-[600px] md:h-[600px] border border-primary/5 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary selection:text-primary-foreground">
      <Navbar />
      <SideWords />
      
      {/* 3D Background Layer */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {hasWebGL ? (
          <WebGLErrorBoundary fallback={<FallbackBalance />}>
            <Canvas 
              className="absolute inset-0"
              camera={cameraConfig} 
              dpr={[1, 1.5]} 
              gl={{ 
                antialias: true, 
                alpha: true, 
                powerPreference: "default",
                failIfMajorPerformanceCaveat: false
              }}
            >
              {/* Gold/White tinted stars for black background */}
              <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
              <Suspense fallback={null}>
                <JudicialModel scrollProgress={scrollProgress} isMobile={isMobile} />
              </Suspense>
              {/* Creamy ivory fog — blends 3D model into the heritage paper background */}
              <fog attach="fog" args={['#F7F0DF', 5, 30]} />
            </Canvas>
          </WebGLErrorBoundary>
        ) : (
          <FallbackBalance />
        )}
        
        <div
          className="absolute inset-0 z-20 pointer-events-none mix-blend-multiply"
          style={{
            background: `radial-gradient(circle at ${glowPosition.x}% ${glowPosition.y}%, rgba(166, 129, 42, 0.30), rgba(200, 20, 30, 0.10) 40%, transparent 70%)`,
            filter: "blur(90px)",
            opacity: 0.8,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#F4EDDB]/25 to-[#F7F0DF]/85 z-10" />
        <div className="absolute inset-0 digital-grid opacity-20 z-0" />
      </div>

      <div className="fixed inset-0 pointer-events-none z-30 mix-blend-screen">
        {trailSegments.map((segment, index) => {
          const opacity = (index + 1) / trailSegments.length;
          return (
            <span
              key={segment.id}
              className="absolute block"
              style={{
                left: `${segment.x}px`,
                top: `${segment.y}px`,
                width: `${segment.length}px`,
                height: "2px",
                opacity,
                transform: `translate(-50%, -50%) rotate(${(segment.angle * 180) / Math.PI}deg)`,
                background: "linear-gradient(90deg, rgba(166,129,42,0), rgba(166,129,42,0.85), rgba(200,20,30,0.6), rgba(166,129,42,0))",
                boxShadow: "0 0 18px rgba(166,129,42,0.35)",
                borderRadius: "999px",
              }}
            />
          );
        })}
      </div>

      {/* Scrollable Content */}
      <div ref={containerRef} className="relative z-10">
        
        {/* Hero Section - Centered initially */}
        <section className="min-h-screen flex flex-col items-center justify-center relative px-4 pt-28 pb-16 md:pt-20 md:pb-0">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1 - scrollProgress * 1.5, scale: 1 - scrollProgress * 0.2, y: 0 }}
            transition={{ duration: 1, ease: smoothEase }}
            className="text-center max-w-6xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary mb-8 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="text-sm font-medium tracking-wider uppercase">{t("hero.systemOnline")}</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter mb-6 holographic-text">
              <span className="bg-clip-text text-transparent bg-gradient-to-br from-[#C9A74A] via-[#A6812A] to-[#7A5F1B]">24x7</span>
              <span className="bg-clip-text text-transparent bg-gradient-to-br from-[#C8141E] via-[#E02636] to-[#8B0E16]">NYAYA</span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-8 max-w-4xl mx-auto leading-relaxed">
              <Highlight
                text={t("hero.subtitle")}
                keywords={["India's", "Legal Assistance", "Legal Consultations", "Counselling", "leading"]}
              />
              <br />
              <span className="text-[#C8141E] font-semibold italic">
                {t("hero.bridge")}
              </span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center w-full max-w-md mx-auto">
              <Link to="/find-lawyer" className="w-full">
                <Button size="lg" className="w-full bg-primary hover:bg-primary/90 text-background font-bold text-lg h-14 rounded-xl shadow-[0_0_20px_rgba(var(--primary),0.3)] hover:shadow-[0_0_30px_rgba(var(--primary),0.5)] transition-all duration-300">
                  {t("hero.cta")}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div 
            animate={{ y: [0, 10, 0], opacity: 1 - scrollProgress * 3 }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 text-muted-foreground flex flex-col items-center gap-2"
          >
            <span className="text-xs uppercase tracking-widest">{t("hero.scroll")}</span>
            <ChevronDown className="h-6 w-6 text-primary" />
          </motion.div>
        </section>

        {/* Content Panels - Sliding in from sides */}
        <div className="container mx-auto px-4 py-24 space-y-32">
          
          <StatsPanel />

          <ServicesPanel />

          <ChiefPatronSection />

          <MissionVisionSection />

          <div className="grid gap-12 xl:gap-16 lg:grid-cols-2 items-start">
            <div className="h-full">
              <LawsSection />
            </div>
            <div className="h-full">
              <GallerySection />
            </div>
          </div>

          <UserSegments />

          <ConstitutionSection />

          <FinalCTA />

        </div>

        {/* Footer */}
        <footer className="on-dark relative overflow-hidden border-t border-[#A6812A]/45 bg-gradient-to-b from-[#8B0E16] via-[#4A060B] to-[#1F0305] mt-24">
          {/* Decorative Elements */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 left-0 w-96 h-96 bg-primary rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary rounded-full blur-3xl" />
          </div>

          <div className="container mx-auto px-4 py-16 relative z-10">
            {/* Main Footer Content */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
              {/* Brand Section */}
              <div className="lg:col-span-2">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-[0_0_20px_rgba(255,215,0,0.3)]">
                    <Scale className="h-7 w-7 text-black" />
                  </div>
                  <div>
                    <span className="text-2xl font-bold tracking-tight">24x7<span className="text-primary">NYAYA</span></span>
                    <p className="text-xs text-primary font-semibold tracking-wider">{t("footer.tagline")}</p>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-6 max-w-md">
                  {t("footer.description")}
                </p>
              </div>

              {/* Office Info */}
              <div>
                <h3 className="text-lg font-bold mb-4 text-white flex items-center gap-2">
                  <div className="h-1 w-8 bg-primary rounded-full" />
                  {t("footer.mainOffice")}
                </h3>
                <p className="text-muted-foreground mb-6">{t("footer.location")}</p>
                
                <h3 className="text-lg font-bold mb-4 text-white flex items-center gap-2">
                  <div className="h-1 w-8 bg-primary rounded-full" />
                  {t("footer.contactDetails")}
                </h3>
                <div className="space-y-2">
                  <a href="mailto:info@24x7nyaya.com" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group">
                    <span className="text-primary group-hover:scale-110 transition-transform">✉</span>
                    {t("footer.email")}
                  </a>
                  <a href="tel:+918090302222" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group">
                    <span className="text-primary group-hover:scale-110 transition-transform">📞</span>
                    {t("footer.phone")}
                  </a>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="text-lg font-bold mb-4 text-white flex items-center gap-2">
                  <div className="h-1 w-8 bg-primary rounded-full" />
                  {t("footer.quickLinks")}
                </h3>
                <ul className="space-y-3">
                  <li>
                    <a href="#" className="text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 inline-block">
                      {t("footer.services")}
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 inline-block">
                      {t("footer.about")}
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 inline-block">
                      {t("footer.contact")}
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 inline-block">
                      {t("footer.terms")}
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 inline-block">
                      {t("footer.privacy")}
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 inline-block">
                      {t("footer.disclaimer")}
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="pt-8 border-t border-white/10">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-sm text-muted-foreground text-center md:text-left">
                  {t("footer.rights")}
                </p>
                <div className="flex gap-4">
                  <a href="#" className="h-10 w-10 rounded-full bg-white/5 hover:bg-primary hover:text-black flex items-center justify-center transition-all duration-300 hover:scale-110 border border-white/10 hover:border-primary">
                    <span className="text-lg">𝕏</span>
                  </a>
                  <a href="#" className="h-10 w-10 rounded-full bg-white/5 hover:bg-primary hover:text-black flex items-center justify-center transition-all duration-300 hover:scale-110 border border-white/10 hover:border-primary">
                    <span className="text-lg">in</span>
                  </a>
                  <a href="#" className="h-10 w-10 rounded-full bg-white/5 hover:bg-primary hover:text-black flex items-center justify-center transition-all duration-300 hover:scale-110 border border-white/10 hover:border-primary">
                    <span className="text-lg">f</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}