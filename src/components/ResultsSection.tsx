import { motion } from "framer-motion";
import { Star } from "lucide-react";

const results = [
  { year: "2024 A/L", aGrades: 42, bGrades: 85, passRate: "99%" },
  { year: "2023 A/L", aGrades: 38, bGrades: 78, passRate: "98%" },
  { year: "2024 O/L", aGrades: 120, bGrades: 200, passRate: "100%" },
];

const testimonials = [
  { name: "Kavisha P.", quote: "Thilina sir's teaching style made grammar so easy to understand. Got an A for my A/L English!", rating: 5 },
  { name: "Nethmi R.", quote: "The spoken English sessions boosted my confidence. Best English class I've ever attended.", rating: 5 },
  { name: "Dilshan M.", quote: "Notes are amazing and classes are always fun. Highly recommend Eazy English!", rating: 5 },
];

const ResultsSection = () => (
  <section className="py-20 bg-background" id="results">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-14"
      >
        <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-2" style={{ fontFamily: 'var(--font-body)' }}>Results</p>
        <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">Proven Track Record</h2>
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
            <p className="text-xs text-muted-foreground mb-4">Pass Rate</p>
            <div className="flex justify-center gap-6 text-sm">
              <div>
                <p className="font-bold text-foreground">{r.aGrades}</p>
                <p className="text-muted-foreground text-xs">A Grades</p>
              </div>
              <div className="w-px bg-border" />
              <div>
                <p className="font-bold text-foreground">{r.bGrades}</p>
                <p className="text-muted-foreground text-xs">B Grades</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Testimonials */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-10"
      >
        <h3 className="text-2xl font-bold text-foreground">What Students Say</h3>
      </motion.div>
      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="bg-card border border-border rounded-2xl p-6"
          >
            <div className="flex gap-0.5 mb-3">
              {Array.from({ length: t.rating }).map((_, j) => (
                <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed italic">"{t.quote}"</p>
            <p className="text-sm font-bold text-foreground" style={{ fontFamily: 'var(--font-body)' }}>— {t.name}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ResultsSection;
