import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const images = [
  "https://harmless-tapir-303.convex.cloud/api/storage/fc8dcb07-46fb-4477-b4f1-c6973f502363",
  "https://harmless-tapir-303.convex.cloud/api/storage/228f947a-0a15-4a1a-a846-b99012e80944",
  "https://harmless-tapir-303.convex.cloud/api/storage/52b91dcb-1e23-4539-bbbc-a39e9cad83b5",
  "https://harmless-tapir-303.convex.cloud/api/storage/04255cc0-95cd-4c60-9131-d25d84bc21c4",
  "https://harmless-tapir-303.convex.cloud/api/storage/81ed818c-a3a8-40db-8b59-92255426b042",
  "https://harmless-tapir-303.convex.cloud/api/storage/d4c3939e-07eb-4a41-afd1-ffdea151342d",
  "https://harmless-tapir-303.convex.cloud/api/storage/e02db37b-15b1-47e1-9482-df76cda028b6",
  "https://harmless-tapir-303.convex.cloud/api/storage/32c42407-0ca7-4014-841a-1eaa170fb75f",
  "https://harmless-tapir-303.convex.cloud/api/storage/d6a41298-be25-4b0a-868e-586d5a215681",
  "https://harmless-tapir-303.convex.cloud/api/storage/c25f0504-d120-45ca-a096-e1c0419e7b8e",
];

const AUTOPLAY_INTERVAL = 2500;

export function GallerySection() {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const autoplay = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
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
      if (nextIndex < 0) nextIndex = images.length - 1;
      if (nextIndex >= images.length) nextIndex = 0;
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
          <Camera className="h-3 w-3" />
          Our Journey
        </div>
        <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-primary to-white">
          {t("gallery.title")}
        </h2>
      </motion.div>

      <div className="relative w-full max-w-4xl mx-auto px-4 h-[280px] sm:h-[360px] md:h-[600px] flex items-center justify-center">
        {/* Navigation Buttons */}
        <div className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 z-20">
          <Button
            variant="outline"
            size="icon"
            className="h-12 w-12 rounded-full bg-black/50 border-primary/30 hover:bg-primary hover:text-black backdrop-blur-sm transition-all"
            onClick={() => paginate(-1)}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
        </div>
        
        <div className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-20">
          <Button
            variant="outline"
            size="icon"
            className="h-12 w-12 rounded-full bg-black/50 border-primary/30 hover:bg-primary hover:text-black backdrop-blur-sm transition-all"
            onClick={() => paginate(1)}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>

        {/* Carousel Container */}
        <div className="relative w-full h-full overflow-hidden rounded-2xl border border-white/10 bg-black/40 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
          <AnimatePresence initial={false} custom={direction}>
            <motion.img
              key={currentIndex}
              src={images[currentIndex]}
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
              className="absolute w-full h-full object-contain p-4"
              alt={`Gallery image ${currentIndex + 1}`}
            />
          </AnimatePresence>
          
          {/* Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {images.map((_, index) => (
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