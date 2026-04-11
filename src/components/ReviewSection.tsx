import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const SHEET_CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vS-2yuQgo-0SSFVFrQWqKrxoyOWXEk4oTs4lS8R0ix8O_52Jxn3CqwreJuieKEE6K4HrDUHxNAWh2KD/pub?gid=800599048&single=true&output=csv";

interface ReviewItem {
  name: string;
  review: string;
  rating: number;
  avatar: string;
}

function parseCsvLine(line: string): string[] {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') { current += '"'; i++; }
      else inQuotes = !inQuotes;
    } else if (ch === "," && !inQuotes) {
      result.push(current.trim()); current = "";
    } else {
      current += ch;
    }
  }
  result.push(current.trim());
  return result;
}

function parseCsv(text: string): ReviewItem[] {
  const lines = text.trim().split(/\r?\n/).filter((l) => l.trim() !== "");
  if (lines.length < 2) return [];
  const headers = parseCsvLine(lines[0]).map((h) => h.toLowerCase().trim());
  const nameIdx = headers.indexOf("name");
  const reviewIdx = headers.indexOf("review");
  const ratingIdx = headers.indexOf("rating");
  const avatarIdx = headers.indexOf("avatar");

  return lines.slice(1).map((line) => {
    const cols = parseCsvLine(line);
    const rating = ratingIdx >= 0 ? parseInt(cols[ratingIdx] ?? "5", 10) : 5;
    return {
      name: nameIdx >= 0 ? cols[nameIdx] ?? "Student" : "Student",
      review: reviewIdx >= 0 ? cols[reviewIdx] ?? "" : "",
      rating: isNaN(rating) ? 5 : Math.min(5, Math.max(1, rating)),
      avatar: avatarIdx >= 0 ? cols[avatarIdx] ?? "" : "",
    };
  }).filter((r) => r.review.length > 0);
}

function StarRating({ rating, size = "sm" }: { rating: number; size?: "sm" | "md" }) {
  const s = size === "md" ? "w-4 h-4" : "w-3 h-3";
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`${s} ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground/20"}`} />
      ))}
    </div>
  );
}

function Initials({ name, size = "sm" }: { name: string; size?: "sm" | "md" | "lg" }) {
  const parts = name.trim().split(" ");
  const initials = parts.length >= 2 ? parts[0][0] + parts[parts.length - 1][0] : name.slice(0, 2);
  const sizeClass = size === "lg" ? "w-12 h-12 text-base" : size === "md" ? "w-10 h-10 text-sm" : "w-8 h-8 text-xs";
  return (
    <div className={`${sizeClass} rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold flex-shrink-0`}>
      {initials.toUpperCase()}
    </div>
  );
}

// Layout patterns for collage effect
// Cards auto-size based on content, no fixed row heights
const layoutPatterns = [
  { textSize: "text-sm md:text-lg", clamp: "line-clamp-5 md:line-clamp-6", nameSize: "text-sm", avatarSize: "lg" as const, starSize: "md" as const },
  { textSize: "text-xs md:text-sm", clamp: "line-clamp-3 md:line-clamp-4", nameSize: "text-xs", avatarSize: "sm" as const, starSize: "sm" as const },
  { textSize: "text-xs md:text-sm", clamp: "line-clamp-4", nameSize: "text-xs", avatarSize: "sm" as const, starSize: "sm" as const },
  { textSize: "text-sm md:text-base", clamp: "line-clamp-4 md:line-clamp-5", nameSize: "text-sm", avatarSize: "md" as const, starSize: "md" as const },
  { textSize: "text-xs md:text-sm", clamp: "line-clamp-3", nameSize: "text-xs", avatarSize: "sm" as const, starSize: "sm" as const },
  { textSize: "text-sm md:text-lg", clamp: "line-clamp-5 md:line-clamp-6", nameSize: "text-sm", avatarSize: "lg" as const, starSize: "md" as const },
  { textSize: "text-xs md:text-sm", clamp: "line-clamp-4", nameSize: "text-xs", avatarSize: "sm" as const, starSize: "sm" as const },
  { textSize: "text-sm md:text-base", clamp: "line-clamp-4", nameSize: "text-sm", avatarSize: "md" as const, starSize: "md" as const },
];

const cardStyles = [
  "bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-primary/20",
  "bg-gradient-to-br from-blue-500/10 via-blue-500/5 to-transparent border-blue-500/20",
  "bg-gradient-to-br from-emerald-500/10 via-emerald-500/5 to-transparent border-emerald-500/20",
  "bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent border-amber-500/20",
  "bg-gradient-to-br from-rose-500/10 via-rose-500/5 to-transparent border-rose-500/20",
  "bg-gradient-to-br from-violet-500/10 via-violet-500/5 to-transparent border-violet-500/20",
  "bg-gradient-to-br from-cyan-500/10 via-cyan-500/5 to-transparent border-cyan-500/20",
  "bg-gradient-to-br from-pink-500/10 via-pink-500/5 to-transparent border-pink-500/20",
];

const ReviewSection = () => {
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 10_000);
    fetch(SHEET_CSV_URL, { signal: controller.signal })
      .then((res) => { if (!res.ok) throw new Error(); return res.text(); })
      .then((text) => { clearTimeout(timer); setReviews(parseCsv(text)); setLoading(false); })
      .catch(() => { clearTimeout(timer); setError(true); setLoading(false); });
    return () => { clearTimeout(timer); controller.abort(); };
  }, []);

  // Slow auto-scroll upward
  useEffect(() => {
    const el = scrollRef.current;
    if (!el || reviews.length === 0) return;
    let raf: number;
    let lastTime = 0;
    const speed = 0.3; // px per frame at 60fps

    const tick = (time: number) => {
      if (lastTime && !paused) {
        const delta = (time - lastTime) * 0.06;
        el.scrollTop += speed * delta;
        // Loop back when reaching end
        if (el.scrollTop >= el.scrollHeight - el.clientHeight - 2) {
          el.scrollTop = 0;
        }
      }
      lastTime = time;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reviews, paused]);

  return (
    <section className="py-20 overflow-hidden bg-muted/30" id="reviews">
      <div className="container mx-auto px-4 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="text-primary font-semibold text-sm uppercase tracking-[0.2em] mb-3" style={{ fontFamily: "var(--font-body)" }}>
            ✦ Student Reviews ✦
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight" style={{ fontFamily: "var(--font-heading)" }}>
            What Our Students{" "}
            <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
              Say
            </span>
          </h2>
          <p className="text-muted-foreground mt-4 text-base md:text-lg max-w-xl mx-auto" style={{ fontFamily: "var(--font-body)" }}>
            Real feedback from students who transformed their English with us
          </p>
        </motion.div>
      </div>

      {loading && (
        <div className="flex justify-center py-12">
          <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
        </div>
      )}
      {error && <p className="text-center text-muted-foreground py-12">Could not load reviews. Please check back later.</p>}
      {!loading && !error && reviews.length === 0 && <p className="text-center text-muted-foreground py-12">No reviews found.</p>}

      {!loading && !error && reviews.length > 0 && (
        <div className="relative container mx-auto px-4 max-w-7xl">
          {/* Edge fades */}
          <div className="pointer-events-none absolute left-0 top-0 w-full h-16 z-10 bg-gradient-to-b from-muted/30 to-transparent" />
          <div className="pointer-events-none absolute left-0 bottom-0 w-full h-24 z-10 bg-gradient-to-t from-muted/30 to-transparent" />

          <div
            ref={scrollRef}
            className="overflow-hidden max-h-[650px] md:max-h-[700px] scroll-smooth"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onTouchStart={() => setPaused(true)}
            onTouchEnd={() => setPaused(false)}
            style={{ scrollbarWidth: "none" }}
          >
            {/* Duplicate reviews for seamless loop */}
            {[0, 1].map((setIdx) => (
              <div
                key={setIdx}
                className="columns-2 md:columns-3 lg:columns-4 gap-3 md:gap-4 mb-3 md:mb-4 space-y-3 md:space-y-4"
              >
                {reviews.map((review, i) => {
                  const layout = layoutPatterns[i % layoutPatterns.length];
                  const cardStyle = cardStyles[i % cardStyles.length];

                  return (
                    <motion.div
                      key={`${setIdx}-${review.name}-${i}`}
                      initial={{ opacity: 0, y: 30, scale: 0.95 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      viewport={{ once: false, margin: "-10px" }}
                      transition={{ duration: 0.5, delay: Math.min(i * 0.04, 0.3) }}
                      whileHover={{
                        scale: 1.03,
                        zIndex: 30,
                        transition: { duration: 0.25 },
                      }}
                      className={`${cardStyle} border backdrop-blur-sm rounded-2xl p-4 md:p-5 flex flex-col justify-between cursor-default transition-all duration-300 hover:shadow-2xl hover:shadow-primary/15 relative overflow-hidden group break-inside-avoid`}
                    >
                      {/* Big decorative quote */}
                      <Quote className="absolute -top-2 -right-2 w-16 h-16 text-foreground/[0.04] rotate-12 transition-all duration-700 group-hover:rotate-0 group-hover:text-foreground/[0.08] group-hover:scale-110" />

                      {/* Glow on hover */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/5 via-transparent to-transparent rounded-2xl" />

                      {/* Content */}
                      <div className="flex-1 flex flex-col gap-2 relative z-10">
                        <Quote className="w-5 h-5 text-primary/40 flex-shrink-0" />
                        <p
                          className={`text-foreground/80 ${layout.textSize} leading-relaxed flex-1 ${layout.clamp} font-medium`}
                          style={{ fontFamily: "var(--font-body)" }}
                        >
                          "{review.review}"
                        </p>
                      </div>

                      {/* Author row */}
                      <div className="flex items-center justify-between gap-2 relative z-10 mt-2 pt-2 border-t border-foreground/5">
                        <div className="flex items-center gap-2 min-w-0">
                          {review.avatar ? (
                            <img
                              src={review.avatar}
                              alt={review.name}
                              loading="lazy"
                              className={`rounded-full object-cover flex-shrink-0 ring-2 ring-background shadow-md ${layout.avatarSize === "lg" ? "w-11 h-11" : layout.avatarSize === "md" ? "w-9 h-9" : "w-7 h-7"}`}
                            />
                          ) : (
                            <Initials name={review.name} size={layout.avatarSize} />
                          )}
                          <span
                            className={`text-foreground font-bold ${layout.nameSize} truncate`}
                            style={{ fontFamily: "var(--font-body)" }}
                          >
                            {review.name}
                          </span>
                        </div>
                        <StarRating rating={review.rating} size={layout.starSize} />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default ReviewSection;
