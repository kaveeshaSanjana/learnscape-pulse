import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import g01 from "@/assets/gallery/g01.jpeg";
import g02 from "@/assets/gallery/g02.jpeg";
import g03 from "@/assets/gallery/g03.jpeg";
import g04 from "@/assets/gallery/g04.jpeg";
import g05 from "@/assets/gallery/g05.jpeg";
import g06 from "@/assets/gallery/g06.jpeg";
import g07 from "@/assets/gallery/g07.jpeg";
import g08 from "@/assets/gallery/g08.jpeg";
import g09 from "@/assets/gallery/g09.jpeg";
import g10 from "@/assets/gallery/g10.jpeg";
import g11 from "@/assets/gallery/g11.jpeg";

const images: { src: string; alt: string }[] = [
  { src: g01, alt: "Phonetics class on the whiteboard" },
  { src: g02, alt: "Birthday celebration with students" },
  { src: g03, alt: "Engaged students in classroom" },
  { src: g04, alt: "One-on-one tutoring session" },
  { src: g05, alt: "Media interview" },
  { src: g06, alt: "Lecture hall full of students" },
  { src: g07, alt: "Free O/L batch session" },
  { src: g08, alt: "Vocabulary practice — kitchen items" },
  { src: g09, alt: "Student notes and study materials" },
  { src: g10, alt: "Packed classroom in session" },
  { src: g11, alt: "Eazy English moments" },
];

const ImageGallerySection = () => {
  const [active, setActive] = useState(0);

  return (
    <section className="py-20 bg-secondary/30" id="gallery">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p
            className="text-primary font-semibold text-sm uppercase tracking-wider mb-2"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Our Moments
          </p>
          <h2
            className="text-3xl md:text-4xl font-extrabold text-foreground"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Our Gallery
          </h2>
          <p
            className="text-muted-foreground mt-3 text-sm md:text-base max-w-lg mx-auto"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Moments from our classes, events and student achievements
          </p>
        </motion.div>

        {/* Featured image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl bg-muted"
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={active}
              src={images[active].src}
              alt={images[active].alt}
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </AnimatePresence>

          {/* Bottom gradient + caption */}
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 p-5 md:p-7">
            <p
              className="text-white/70 text-xs uppercase tracking-[0.2em] mb-1"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {String(active + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
            </p>
            <h3
              className="text-white text-xl md:text-2xl font-bold drop-shadow-lg"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Student Moments &amp; Events
            </h3>
          </div>
        </motion.div>

        {/* Thumbnails */}
        <div className="mt-5 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-thin">
          <div className="flex gap-3 min-w-max">
            {images.map((img, i) => {
              const isActive = i === active;
              return (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  aria-label={`Show image ${i + 1}`}
                  className={`relative shrink-0 w-24 h-20 sm:w-28 sm:h-24 md:w-32 md:h-24 rounded-lg overflow-hidden transition-all duration-300 group ${
                    isActive
                      ? "ring-2 ring-primary ring-offset-2 ring-offset-background scale-105"
                      : "ring-1 ring-border hover:ring-primary/50"
                  }`}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    loading="lazy"
                    className={`w-full h-full object-cover transition-all duration-300 ${
                      isActive
                        ? "brightness-100"
                        : "brightness-75 group-hover:brightness-110 group-hover:scale-110"
                    }`}
                  />
                  {!isActive && (
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImageGallerySection;
