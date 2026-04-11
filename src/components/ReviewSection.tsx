import { useEffect, useState } from "react";
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

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-3 h-3 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground/30"}`}
        />
      ))}
    </div>
  );
}

function Initials({ name }: { name: string }) {
  const parts = name.trim().split(" ");
  const initials = parts.length >= 2
    ? parts[0][0] + parts[parts.length - 1][0]
    : name.slice(0, 2);
  return (
    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs flex-shrink-0">
      {initials.toUpperCase()}
    </div>
  );
}

// Collage size patterns - creates visual variety
const sizePatterns = [
  "col-span-2 row-span-2", // large
  "col-span-1 row-span-1", // small
  "col-span-1 row-span-2", // tall
  "col-span-2 row-span-1", // wide
  "col-span-1 row-span-1", // small
  "col-span-1 row-span-1", // small
  "col-span-2 row-span-1", // wide
  "col-span-1 row-span-2", // tall
  "col-span-1 row-span-1", // small
  "col-span-1 row-span-1", // small
];

// Color accents for variety
const accentColors = [
  "from-primary/10 to-primary/5",
  "from-blue-500/10 to-blue-500/5",
  "from-emerald-500/10 to-emerald-500/5",
  "from-amber-500/10 to-amber-500/5",
  "from-rose-500/10 to-rose-500/5",
  "from-violet-500/10 to-violet-500/5",
  "from-cyan-500/10 to-cyan-500/5",
  "from-orange-500/10 to-orange-500/5",
];

const quoteAccents = [
  "text-primary/50",
  "text-blue-500/50",
  "text-emerald-500/50",
  "text-amber-500/50",
  "text-rose-500/50",
  "text-violet-500/50",
  "text-cyan-500/50",
  "text-orange-500/50",
];

const ReviewSection = () => {
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 10_000);

    fetch(SHEET_CSV_URL, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error("fetch failed");
        return res.text();
      })
      .then((text) => {
        clearTimeout(timer);
        setReviews(parseCsv(text));
        setLoading(false);
      })
      .catch(() => {
        clearTimeout(timer);
        setError(true);
        setLoading(false);
      });

    return () => { clearTimeout(timer); controller.abort(); };
  }, []);

  return (
    <section className="py-20 overflow-hidden bg-muted/30" id="reviews">
      <div className="container mx-auto px-4 mb-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p
            className="text-primary font-semibold text-sm uppercase tracking-wider mb-2"
            style={{ fontFamily: "var(--font-body)" }}
          >
            සිසු අත්දැකීම්
          </p>
          <h2
            className="text-3xl md:text-4xl font-extrabold text-foreground"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            අපේ සිසුන් කියන දේ
          </h2>
          <p
            className="text-muted-foreground mt-3 text-sm md:text-base max-w-lg mx-auto"
            style={{ fontFamily: "var(--font-body)" }}
          >
            අප සමඟ ඉංග්‍රීසි ඉගෙන ගත් සිසුන්ගේ සැබෑ ප්‍රතිචාර
          </p>
        </motion.div>
      </div>

      {/* States */}
      {loading && (
        <div className="flex justify-center py-12">
          <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
        </div>
      )}
      {error && (
        <p className="text-center text-muted-foreground py-12">
          සමාලෝචන පූරණය කළ නොහැක. කරුණාකර පසුව නැවත උත්සාහ කරන්න.
        </p>
      )}
      {!loading && !error && reviews.length === 0 && (
        <p className="text-center text-muted-foreground py-12">
          සමාලෝචන හමු නොවීය.
        </p>
      )}

      {/* Collage masonry grid */}
      {!loading && !error && reviews.length > 0 && (
        <div className="relative container mx-auto px-4 max-w-7xl">
          {/* Fade edges for overflow effect */}
          <div className="pointer-events-none absolute left-0 top-0 h-full w-8 z-10 bg-gradient-to-r from-muted/30 to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 h-full w-8 z-10 bg-gradient-to-l from-muted/30 to-transparent" />
          <div className="pointer-events-none absolute left-0 bottom-0 w-full h-20 z-10 bg-gradient-to-t from-muted/30 to-transparent" />

          <div
            className="grid gap-3 overflow-hidden max-h-[700px] md:max-h-[600px]"
            style={{
              gridTemplateColumns: "repeat(4, 1fr)",
              gridAutoRows: "100px",
            }}
          >
            {reviews.map((review, i) => {
              const sizeClass = sizePatterns[i % sizePatterns.length];
              const accent = accentColors[i % accentColors.length];
              const quoteColor = quoteAccents[i % quoteAccents.length];
              const isLarge = sizeClass.includes("col-span-2") && sizeClass.includes("row-span-2");

              return (
                <motion.div
                  key={`${review.name}-${i}`}
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true, margin: "-20px" }}
                  transition={{ duration: 0.4, delay: Math.min(i * 0.05, 0.4) }}
                  whileHover={{ scale: 1.03, zIndex: 20 }}
                  className={`${sizeClass} bg-gradient-to-br ${accent} backdrop-blur-sm border border-border/50 rounded-2xl p-4 flex flex-col justify-between gap-2 cursor-default transition-shadow duration-300 hover:shadow-xl hover:shadow-primary/10 relative overflow-hidden group`}
                >
                  {/* Decorative quote watermark */}
                  <Quote className={`absolute -top-1 -right-1 w-12 h-12 ${quoteColor} opacity-30 rotate-12 transition-transform duration-500 group-hover:rotate-0 group-hover:opacity-50`} />

                  {/* Quote icon + review */}
                  <div className="flex-1 flex flex-col gap-1.5 relative z-10">
                    <Quote className={`w-4 h-4 ${quoteColor} flex-shrink-0`} />
                    <p
                      className={`text-foreground/80 leading-relaxed flex-1 ${isLarge ? "text-sm line-clamp-6" : "text-xs line-clamp-3"}`}
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {review.review}
                    </p>
                  </div>

                  {/* Bottom: stars + author */}
                  <div className="flex items-center justify-between gap-2 relative z-10 mt-auto">
                    <div className="flex items-center gap-2 min-w-0">
                      {review.avatar ? (
                        <img
                          src={review.avatar}
                          alt={review.name}
                          loading="lazy"
                          className="w-7 h-7 rounded-full object-cover flex-shrink-0 ring-2 ring-background"
                        />
                      ) : (
                        <Initials name={review.name} />
                      )}
                      <span
                        className="text-foreground font-semibold text-xs truncate"
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        {review.name}
                      </span>
                    </div>
                    <StarRating rating={review.rating} />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
};

export default ReviewSection;
