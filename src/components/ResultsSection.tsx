import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

// ── Same spreadsheet, "Reviews" sheet tab ──────────────────────────────────
const REVIEWS_CSV_URL =
  "https://docs.google.com/spreadsheets/d/1hlT8eo643lur8Ac1JzX313dm1Pj4MP65Q4eoPPN1lLM/export?format=csv&sheet=Reviews";
// ──────────────────────────────────────────────────────────────────────────────

const FALLBACK_TESTIMONIALS = [
  { name: "කවිෂා P.", quote: "තිලින සර්ගේ ඉගැන්වීමේ විලාසය ව්‍යාකරණය තේරුම් ගැනීම ඉතා පහසු කළා. මගේ A/L ඉංග්‍රීසියට A ලැබුණා!", rating: 5 },
  { name: "නෙත්මි R.", quote: "කතා කිරීමේ ඉංග්‍රීසි සැසි මගේ ආත්ම විශ්වාසය ඉහළ නැංවුවා. මම සහභාගී වූ හොඳම ඉංග්‍රීසි පන්තිය.", rating: 5 },
  { name: "දිල්ෂාන් M.", quote: "සටහන් පුදුමාකාරයි, පන්ති සැමවිටම විනෝදජනකයි. Eazy English අනිවාර්යයෙන්ම නිර්දේශ කරනවා!", rating: 5 },
];

const results = [
  { year: "2024 A/L", aGrades: 42, bGrades: 85, passRate: "99%" },
  { year: "2023 A/L", aGrades: 38, bGrades: 78, passRate: "98%" },
  { year: "2024 O/L", aGrades: 120, bGrades: 200, passRate: "100%" },
];

interface Testimonial {
  name: string;
  quote: string;
  rating: number;
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
      result.push(current.trim());
      current = "";
    } else {
      current += ch;
    }
  }
  result.push(current.trim());
  return result;
}

function parseReviewsCsv(text: string): Testimonial[] {
  const lines = text.trim().split(/\r?\n/).filter((l) => l.trim() !== "");
  if (lines.length < 2) return [];
  const headers = parseCsvLine(lines[0]).map((h) => h.toLowerCase());
  const nameIdx = headers.indexOf("name");
  const quoteIdx = headers.indexOf("quote");
  const ratingIdx = headers.indexOf("rating");

  return lines.slice(1).map((line) => {
    const cols = parseCsvLine(line);
    const rating = ratingIdx >= 0 ? Math.min(5, Math.max(1, parseInt(cols[ratingIdx] ?? "5", 10) || 5)) : 5;
    return {
      name: nameIdx >= 0 ? cols[nameIdx] ?? "" : "",
      quote: quoteIdx >= 0 ? cols[quoteIdx] ?? "" : "",
      rating,
    };
  }).filter((t) => t.name || t.quote);
}

const ResultsSection = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(REVIEWS_CSV_URL)
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.text();
      })
      .then((text) => {
        const parsed = parseReviewsCsv(text);
        setTestimonials(parsed.length > 0 ? parsed : FALLBACK_TESTIMONIALS);
      })
      .catch(() => setTestimonials(FALLBACK_TESTIMONIALS))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-20 bg-background" id="results">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-2" style={{ fontFamily: 'var(--font-body)' }}>ප්‍රතිඵල</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">ඔප්පු කළ ජයග්‍රහණ</h2>
        </motion.div>

        {/* Results cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16">
          {results.map((r, i) => (
            <motion.div
              key={r.year}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              className="bg-card border border-border rounded-2xl p-6 text-center hover:border-primary/40 transition-colors"
            >
              <p className="text-sm font-semibold text-primary mb-3" style={{ fontFamily: 'var(--font-body)' }}>{r.year}</p>
              <p className="text-4xl font-extrabold text-foreground mb-1">{r.passRate}</p>
              <p className="text-xs text-muted-foreground mb-4">සමත් අනුපාතය</p>
              <div className="flex justify-center gap-6 text-sm">
                <div>
                  <p className="font-bold text-foreground">{r.aGrades}</p>
                  <p className="text-muted-foreground text-xs">A සාමාර්ථ</p>
                </div>
                <div className="w-px bg-border" />
                <div>
                  <p className="font-bold text-foreground">{r.bGrades}</p>
                  <p className="text-muted-foreground text-xs">B සාමාර්ථ</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Testimonials heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h3 className="text-2xl font-bold text-foreground">සිසුන් කියන දේ</h3>
        </motion.div>

        {/* Loading skeleton */}
        {loading && (
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[0, 1, 2].map((i) => (
              <div key={i} className="bg-card border border-border rounded-2xl p-6 animate-pulse">
                <div className="flex gap-1 mb-3">
                  {[0,1,2,3,4].map((j) => <div key={j} className="w-4 h-4 rounded bg-muted" />)}
                </div>
                <div className="h-3 bg-muted rounded mb-2 w-full" />
                <div className="h-3 bg-muted rounded mb-2 w-4/5" />
                <div className="h-3 bg-muted rounded w-1/3 mt-4" />
              </div>
            ))}
          </div>
        )}

        {/* Review cards */}
        {!loading && (
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {testimonials.map((t, i) => (
              <motion.div
                key={`${t.name}-${i}`}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="bg-card border border-border rounded-2xl p-6"
              >
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                  {Array.from({ length: 5 - t.rating }).map((_, j) => (
                    <Star key={`e-${j}`} className="w-4 h-4 text-muted-foreground/30" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed italic">"{t.quote}"</p>
                <p className="text-sm font-bold text-foreground" style={{ fontFamily: 'var(--font-body)' }}>— {t.name}</p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ResultsSection;
