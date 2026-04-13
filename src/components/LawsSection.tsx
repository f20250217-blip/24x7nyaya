import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const lawsData = [
  {
    title: "Motor Vehicles Act, 1988",
    description: "Section 134: It is the duty of the driver in case of an accident and injury to a person to take all reasonable steps to secure medical attention for the injured person."
  },
  {
    title: "Code of Criminal Procedure, 1973",
    description: "Section 46(4): No woman shall be arrested after sunset and before sunrise, except in exceptional circumstances and with the prior permission of a Judicial Magistrate."
  },
  {
    title: "Maternity Benefit Act, 1961",
    description: "It is illegal for an employer to dismiss or discharge a woman employee during or on account of her absence from work in accordance with the provisions of this Act."
  },
  {
    title: "Indian Sarais Act, 1867",
    description: "Any individual can request water and use the washroom in any hotel or restaurant for free, regardless of whether they are a customer or not."
  },
  {
    title: "Police Act, 1861",
    description: "Police officers are considered to be always on duty and may be employed in any part of the general police district."
  }
];

const AUTOPLAY_INTERVAL = 2500;

export function LawsSection() {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const autoplay = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % lawsData.length);
    }, AUTOPLAY_INTERVAL);

    return () => clearInterval(autoplay);
  }, []);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      let nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) nextIndex = lawsData.length - 1;
      if (nextIndex >= lawsData.length) nextIndex = 0;
      return nextIndex;
    });
  };

  return (
    <div className="w-full py-12">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ margin: "-50px", once: true }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-4">
          <BookOpen className="h-3 w-3" />
          Legal Awareness
        </div>
        <h2 className="text-3xl md:text-5xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#8D1812] via-[#A6812A] to-[#8D1812] tracking-tight">
          {t("laws.title")}
        </h2>
      </motion.div>

      <div className="relative w-full max-w-4xl mx-auto px-4 h-[280px] sm:h-[360px] md:h-[400px] flex items-center justify-center">
        {/* Navigation Buttons */}
        <div className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 z-20">
          <Button
            variant="outline"
            size="icon"
            className="h-12 w-12 rounded-full bg-black/20 border-primary/30 hover:bg-primary hover:text-black backdrop-blur-sm transition-all"
            onClick={() => paginate(-1)}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
        </div>
        
        <div className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-20">
          <Button
            variant="outline"
            size="icon"
            className="h-12 w-12 rounded-full bg-black/20 border-primary/30 hover:bg-primary hover:text-black backdrop-blur-sm transition-all"
            onClick={() => paginate(1)}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>

        {/* Carousel Container */}
        <div className="relative w-full h-full overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-[0_0_30px_rgba(0,0,0,0.2)] backdrop-blur-sm">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);

                if (swipe < -swipeConfidenceThreshold) {
                  paginate(1);
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(-1);
                }
              }}
              className="absolute w-full h-full flex flex-col items-center justify-center p-8 sm:p-12 text-center"
            >
              <h3 className="text-2xl md:text-3xl font-bold text-primary mb-6 drop-shadow-lg">
                {lawsData[currentIndex].title}
              </h3>
              <p className="text-lg md:text-xl text-white leading-relaxed max-w-2xl drop-shadow-md">
                {lawsData[currentIndex].description}
              </p>
            </motion.div>
          </AnimatePresence>
          
          {/* Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {lawsData.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? "w-8 bg-primary" : "w-2 bg-white/30 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}