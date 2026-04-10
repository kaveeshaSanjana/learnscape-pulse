import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

// ─── CONFIG ──────────────────────────────────────────────────────────────────
// Same spreadsheet, separate "Reviews" sheet tab.
// Sheet columns: name | review | rating | avatar
//   name    — student's name
//   review  — their message
//   rating  — number 1–5 (optional, defaults to 5)
//   avatar  — image URL (optional)
//
// How to get the published CSV URL:
//   1. Add a new tab in your spreadsheet (call it "Reviews")
//   2. File → Share → Publish to web → select "Reviews" tab → CSV → Publish
//   3. Copy the URL and paste it below.
const SHEET_CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vS-2yuQgo-0SSFVFrQWqKrxoyOWXEk4oTs4lS8R0ix8O_52Jxn3CqwreJuieKEE6K4HrDUHxNAWh2KD/pub?gid=800599048&single=true&output=csv";
// ─────────────────────────────────────────────────────────────────────────────

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
  const nameIdx   = headers.indexOf("name");
  const reviewIdx = headers.indexOf("review");
  const ratingIdx = headers.indexOf("rating");
  const avatarIdx = headers.indexOf("avatar");

  return lines.slice(1).map((line) => {
    const cols = parseCsvLine(line);
    const rating = ratingIdx >= 0 ? parseInt(cols[ratingIdx] ?? "5", 10) : 5;
    return {
      name:   nameIdx   >= 0 ? cols[nameIdx]   ?? "Student" : "Student",
      review: reviewIdx >= 0 ? cols[reviewIdx]  ?? "" : "",
      rating: isNaN(rating) ? 5 : Math.min(5, Math.max(1, rating)),
      avatar: avatarIdx >= 0 ? cols[avatarIdx]  ?? "" : "",
    };
  }).filter((r) => r.review.length > 0);
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-3.5 h-3.5 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground/30"}`}
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
    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm flex-shrink-0">
      {initials.toUpperCase()}
    </div>
  );
}

const ReviewSection = () => {
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [paused, setPaused] = useState(false);

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

  // Build a track long enough to always overflow the viewport
  const minItems = 10;
  const copies = reviews.length > 0 ? Math.ceil(minItems / reviews.length) + 1 : 0;
  const baseTrack = reviews.length > 0
    ? Array.from({ length: copies }, () => reviews).flat()
    : [];
  const track = [...baseTrack, ...reviews];
  const animPct = reviews.length > 0 ? (100 / (copies + 1)).toFixed(4) : "50";
  const durationSec = Math.max(25, reviews.length * 6);

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
            Student Reviews
          </p>
          <h2
            className="text-3xl md:text-4xl font-extrabold text-foreground"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            What Our Students Say
          </h2>
          <p
            className="text-muted-foreground mt-3 text-sm md:text-base max-w-lg mx-auto"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Real feedback from students who transformed their English with us
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
          Could not load reviews. Please check back later.
        </p>
      )}
      {!loading && !error && reviews.length === 0 && (
        <p className="text-center text-muted-foreground py-12">
          No reviews found. Add rows to your Reviews sheet and refresh.
        </p>
      )}

      {/* Auto-scrolling carousel */}
      {!loading && !error && reviews.length > 0 && (
        <div
          className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={() => setPaused(true)}
          onTouchEnd={() => setPaused(false)}
        >
          {/* Fade edges */}
          <div className="pointer-events-none absolute left-0 top-0 h-full w-16 z-10 bg-gradient-to-r from-muted/30 to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 h-full w-16 z-10 bg-gradient-to-l from-muted/30 to-transparent" />

          <div
            className="flex gap-5 w-max px-4"
            style={{
              animation: `scroll-rtl-custom ${durationSec}s linear infinite`,
              animationPlayState: paused ? "paused" : "running",
              ["--scroll-pct" as string]: `-${animPct}%`,
            }}
          >
            {track.map((review, i) => (
              <div
                key={`${review.name}-${i}`}
                className="flex-shrink-0 w-[280px] md:w-[320px] bg-card border border-border rounded-2xl p-5 shadow-sm flex flex-col gap-3"
              >
                {/* Quote icon */}
                <Quote className="w-5 h-5 text-primary/40 flex-shrink-0" />

                {/* Review text */}
                <p
                  className="text-foreground/80 text-sm leading-relaxed flex-1 line-clamp-5"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {review.review}
                </p>

                {/* Stars */}
                <StarRating rating={review.rating} />

                {/* Author */}
                <div className="flex items-center gap-3 mt-1">
                  {review.avatar ? (
                    <img
                      src={review.avatar}
                      alt={review.name}
                      loading="lazy"
                      className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                    />
                  ) : (
                    <Initials name={review.name} />
                  )}
                  <span
                    className="text-foreground font-semibold text-sm"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {review.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default ReviewSection;
