import { motion } from "framer-motion";
import { MapPin, Users, Monitor, Wifi } from "lucide-react";
import worldMapSketch from "@/assets/world-map-sketch.png";
import winsLogo from "@/assets/wins-logo.png";

const sihasmaLogo: string | null = null;

// Sketch-style fonts
const FONT_HAND = "'Patrick Hand', 'Caveat', cursive";
const FONT_SCRIPT = "'Caveat', cursive";
const FONT_SKETCH = "'Architects Daughter', 'Patrick Hand', cursive";

// Pin positions on the long world map (Europe, Africa, Middle East, S.Asia, SE Asia)
const locations = [
  { top: "32%", left: "52%" },  // Europe
  { top: "55%", left: "55%" },  // Africa
  { top: "45%", left: "62%" },  // Middle East
  { top: "50%", left: "72%" },  // South Asia
  { top: "60%", left: "80%" },  // SE Asia
  { top: "35%", left: "78%" },  // East Asia
];

// Hand-drawn wavy border (top decoration)
const WavyBorder = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 1200 40" className={className} preserveAspectRatio="none" fill="none">
    <path
      d="M0,20 Q50,5 100,20 T200,20 T300,20 T400,20 T500,20 T600,20 T700,20 T800,20 T900,20 T1000,20 T1100,20 T1200,20"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M0,28 Q50,15 100,30 T200,28 T300,30 T400,28 T500,30 T600,28 T700,30 T800,28 T900,30 T1000,28 T1100,30 T1200,28"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      fill="none"
      opacity="0.5"
    />
  </svg>
);

// Rough hand-drawn rectangle border (SVG outline that wraps content)
const SketchBox = ({
  children,
  className = "",
  rotate = 0,
}: {
  children: React.ReactNode;
  className?: string;
  rotate?: number;
}) => (
  <div className={`relative ${className}`} style={{ transform: `rotate(${rotate}deg)` }}>
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      preserveAspectRatio="none"
      viewBox="0 0 100 100"
      fill="none"
    >
      <path
        d="M2,3 Q1,2 3,2 L50,1.5 Q70,2 97,2.5 Q99,3 98,5 L98.5,50 Q99,75 97.5,97 Q98,99 95,98 L50,98.5 Q25,99 3,97.5 Q1,98 2,95 L1.5,50 Q2,25 2,3 Z"
        stroke="hsl(var(--foreground))"
        strokeWidth="0.4"
        fill="none"
        vectorEffect="non-scaling-stroke"
        style={{ strokeWidth: "2px" }}
      />
    </svg>
    <div className="relative">{children}</div>
  </div>
);

// Hand-drawn pin
const SketchPin = () => (
  <svg viewBox="0 0 24 32" className="w-7 h-9" fill="none">
    <path
      d="M12 2 Q4 3 4 12 Q4 18 12 30 Q20 18 20 12 Q20 3 12 2 Z"
      stroke="hsl(var(--foreground))"
      strokeWidth="1.8"
      strokeLinejoin="round"
      fill="hsl(var(--primary) / 0.85)"
    />
    <circle cx="12" cy="12" r="3.5" stroke="hsl(var(--foreground))" strokeWidth="1.5" fill="hsl(var(--background))" />
  </svg>
);

// Hand-drawn Zoom-style icon
const SketchZoom = () => (
  <svg viewBox="0 0 60 60" className="w-full h-full" fill="none">
    <path
      d="M5,15 Q4,10 10,10 L36,11 Q42,10 41,16 L42,42 Q42,48 36,47 L10,48 Q4,48 5,42 Z"
      stroke="hsl(var(--foreground))"
      strokeWidth="2"
      strokeLinejoin="round"
      fill="hsl(217 91% 60% / 0.25)"
    />
    <path
      d="M44,22 L56,15 Q57,15 57,17 L56,42 Q56,44 54,43 L44,37 Z"
      stroke="hsl(var(--foreground))"
      strokeWidth="2"
      strokeLinejoin="round"
      fill="hsl(217 91% 60% / 0.25)"
    />
  </svg>
);

// Hand-drawn YouTube-style icon
const SketchYouTube = () => (
  <svg viewBox="0 0 60 60" className="w-full h-full" fill="none">
    <path
      d="M5,18 Q4,12 11,11 Q30,9 50,11 Q56,12 55,18 L56,42 Q56,48 49,48 Q30,50 11,48 Q4,48 5,42 Z"
      stroke="hsl(var(--foreground))"
      strokeWidth="2"
      strokeLinejoin="round"
      fill="hsl(0 84% 60% / 0.25)"
    />
    <path
      d="M25,21 L25,40 L42,30 Z"
      stroke="hsl(var(--foreground))"
      strokeWidth="1.8"
      strokeLinejoin="round"
      fill="hsl(var(--foreground))"
    />
  </svg>
);

// Sketchy underline scribble
const Scribble = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 200 12" className={className} fill="none" preserveAspectRatio="none">
    <path
      d="M2,6 Q20,2 40,7 T80,6 T120,7 T160,5 T198,6"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      fill="none"
    />
  </svg>
);

const stats = [
  { icon: <Users className="w-5 h-5" />, value: "2000+", label: "Students" },
  { icon: <Monitor className="w-5 h-5" />, value: "Live", label: "Classes" },
  { icon: <Wifi className="w-5 h-5" />, value: "මුලු ලන්කාවටම", label: "Reach" },
];

const institutes = [
  {
    logo: winsLogo as string | null,
    name: "WINS උසස් අධ්‍යාපන ආයතනය",
    sublabel: "සාලින්ද සුපර් අසල",
    location: "වේයංගොඩ",
    phone: ["077 873 7664", "076 688 2353"],
  },
  {
    logo: sihasmaLogo,
    name: "සිහස්මා උසස් අධ්‍යාපන ආයතනය",
    sublabel: null,
    location: "වැලිවේරිය",
    phone: ["077 365 5614", "071 766 9363"],
  },
];

const InstitutesSection = () => (
  <section
    id="institutes"
    className="py-20 overflow-hidden bg-background relative"
    style={{
      backgroundImage:
        "radial-gradient(hsl(var(--foreground) / 0.05) 1px, transparent 1px)",
      backgroundSize: "22px 22px",
    }}
  >
    {/* Top wavy hand-drawn border */}
    <div className="text-foreground mb-10">
      <WavyBorder className="w-full h-10" />
    </div>

    <div className="container mx-auto px-4 max-w-7xl">

      {/* ── Heading ── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-14"
      >
        {/* Sketched pill tag */}
        <div className="inline-block relative px-6 py-2 mb-6">
          <svg
            className="absolute inset-0 w-full h-full"
            preserveAspectRatio="none"
            viewBox="0 0 200 50"
            fill="none"
          >
            <path
              d="M20,5 Q10,5 8,15 Q5,25 8,38 Q12,46 25,46 L175,45 Q188,46 192,36 Q195,25 192,12 Q188,4 175,5 Z"
              stroke="hsl(var(--foreground))"
              strokeWidth="2"
              fill="hsl(var(--primary) / 0.1)"
            />
          </svg>
          <span
            className="relative flex items-center gap-2 text-foreground text-xs font-bold uppercase tracking-[0.2em]"
            style={{ fontFamily: FONT_HAND }}
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Online & Island-wide
          </span>
        </div>

        {/* Heading inside sketched box */}
        <div className="relative inline-block px-8 py-4 max-w-3xl">
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            preserveAspectRatio="none"
            viewBox="0 0 400 100"
            fill="none"
          >
            <path
              d="M5,8 Q3,3 10,4 L200,2 Q395,4 396,8 Q398,50 395,92 Q396,98 388,96 L100,97 Q5,96 4,92 Q2,50 5,8 Z"
              stroke="hsl(var(--foreground))"
              strokeWidth="2"
              fill="none"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
          <h2
            className="relative text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight"
            style={{ fontFamily: FONT_SKETCH }}
          >
            ලෝකේ ඔනේම තැනක ඉදන්
            <span className="text-primary"> ආසාවෙන් ඉගෙනගන්න</span>
          </h2>
        </div>

        <p
          className="text-foreground/70 mt-5 text-base md:text-lg max-w-xl mx-auto"
          style={{ fontFamily: FONT_HAND }}
        >
          Join live sessions online via Zoom & YouTube, or walk into one of our trusted partner institutes near you.
        </p>
      </motion.div>

      {/* ── Big hand-drawn world map ── */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative max-w-5xl mx-auto mb-16"
      >
        {/* Sketch frame around map */}
        <div className="relative p-4 sm:p-6">
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            preserveAspectRatio="none"
            viewBox="0 0 400 200"
            fill="none"
          >
            <path
              d="M4,6 Q2,2 8,3 L200,2 Q395,3 396,7 Q398,100 395,193 Q396,198 388,197 L100,198 Q4,197 3,193 Q2,100 4,6 Z"
              stroke="hsl(var(--foreground))"
              strokeWidth="2"
              fill="hsl(var(--background))"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
          <div className="relative aspect-[2.5/1] w-full">
            <img
              src={worldMapSketch}
              alt="Hand-drawn world map showing global reach"
              className="w-full h-full object-contain dark:invert"
              style={{ filter: "contrast(1.1)" }}
            />
            {locations.map((loc, i) => (
              <motion.div
                key={i}
                className="absolute -translate-x-1/2 -translate-y-full"
                style={{ top: loc.top, left: loc.left }}
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.4 + i * 0.1, type: "spring" }}
              >
                <motion.div
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
                >
                  <SketchPin />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ── Two columns: Online | Physical ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">

        {/* LEFT — Online Platforms */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-5"
        >
          {/* Hand-painted label */}
          <div className="text-center mb-2">
            <h3
              className="text-3xl md:text-4xl font-bold text-foreground inline-block relative"
              style={{ fontFamily: FONT_SCRIPT }}
            >
              Online Platforms
              <Scribble className="absolute -bottom-2 left-0 w-full h-3 text-primary" />
            </h3>
          </div>

          {/* Zoom card */}
          <div className="relative p-5">
            <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none" viewBox="0 0 300 100" fill="none">
              <path
                d="M5,7 Q3,3 10,4 L150,3 Q295,4 296,8 Q298,50 295,93 Q296,97 288,96 L100,97 Q4,96 3,92 Q2,50 5,7 Z"
                stroke="hsl(var(--foreground))" strokeWidth="2" fill="hsl(var(--card))" vectorEffect="non-scaling-stroke"
              />
            </svg>
            <div className="relative flex items-center gap-4">
              <div className="w-14 h-14 flex-shrink-0"><SketchZoom /></div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-foreground text-lg" style={{ fontFamily: FONT_HAND }}>Zoom</span>
                  <span className="bg-blue-500 text-white text-[10px] font-bold uppercase px-2 py-0.5 rounded-full" style={{ fontFamily: FONT_HAND }}>Live</span>
                </div>
                <p className="text-foreground/70 text-sm" style={{ fontFamily: FONT_HAND }}>
                  Interactive live sessions with real-time Q&A
                </p>
              </div>
            </div>
          </div>

          {/* YouTube card */}
          <div className="relative p-5">
            <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none" viewBox="0 0 300 100" fill="none">
              <path
                d="M4,8 Q3,3 12,4 L150,2 Q296,3 297,8 Q298,50 295,93 Q297,98 285,97 L100,96 Q3,97 4,92 Q2,50 4,8 Z"
                stroke="hsl(var(--foreground))" strokeWidth="2" fill="hsl(var(--card))" vectorEffect="non-scaling-stroke"
              />
            </svg>
            <div className="relative flex items-center gap-4">
              <div className="w-14 h-14 flex-shrink-0"><SketchYouTube /></div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-foreground text-lg" style={{ fontFamily: FONT_HAND }}>YouTube</span>
                  <span className="bg-red-500 text-white text-[10px] font-bold uppercase px-2 py-0.5 rounded-full" style={{ fontFamily: FONT_HAND }}>Live</span>
                </div>
                <p className="text-foreground/70 text-sm" style={{ fontFamily: FONT_HAND }}>
                  Watch recorded lessons anytime at your pace
                </p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3">
            {stats.map((s, idx) => (
              <div key={s.label} className="relative p-3 text-center">
                <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none" viewBox="0 0 100 100" fill="none">
                  <path
                    d={
                      idx % 2 === 0
                        ? "M5,7 Q3,3 10,4 L50,3 Q95,4 96,8 Q98,50 95,93 Q96,97 88,96 L50,97 Q4,96 3,92 Q2,50 5,7 Z"
                        : "M4,8 Q3,3 12,4 L50,2 Q96,3 97,8 Q98,50 95,93 Q97,98 85,97 L50,96 Q3,97 4,92 Q2,50 4,8 Z"
                    }
                    stroke="hsl(var(--foreground))" strokeWidth="2" fill="hsl(var(--primary) / 0.05)" vectorEffect="non-scaling-stroke"
                  />
                </svg>
                <div className="relative flex flex-col items-center gap-1 py-2">
                  <div className="text-primary">{s.icon}</div>
                  <p className="font-bold text-foreground text-sm leading-tight" style={{ fontFamily: FONT_HAND }}>{s.value}</p>
                  <p className="text-foreground/60 text-[10px] uppercase tracking-wider" style={{ fontFamily: FONT_HAND }}>{s.label}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* RIGHT — Physical Partner Institutes */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-5"
        >
          {/* Hand-painted label */}
          <div className="text-center mb-2">
            <h3
              className="text-3xl md:text-4xl font-bold text-foreground inline-block relative"
              style={{ fontFamily: FONT_SCRIPT }}
            >
              Physical Partner Institutes
              <Scribble className="absolute -bottom-2 left-0 w-full h-3 text-primary" />
            </h3>
          </div>

          {institutes.map((inst, i) => (
            <motion.div
              key={inst.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -3 }}
              className="relative p-5"
            >
              <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none" viewBox="0 0 300 120" fill="none">
                <path
                  d={
                    i % 2 === 0
                      ? "M5,7 Q3,3 10,4 L150,3 Q295,4 296,8 Q298,60 295,113 Q296,117 288,116 L100,117 Q4,116 3,112 Q2,60 5,7 Z"
                      : "M4,8 Q3,3 12,4 L150,2 Q296,3 297,8 Q298,60 295,113 Q297,118 285,117 L100,116 Q3,117 4,112 Q2,60 4,8 Z"
                  }
                  stroke="hsl(var(--foreground))" strokeWidth="2" fill="hsl(var(--card))" vectorEffect="non-scaling-stroke"
                />
              </svg>
              <div className="relative flex gap-4 items-center">
                {/* Logo box (sketched) */}
                <div className="relative w-20 h-16 flex-shrink-0 flex items-center justify-center p-1">
                  <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none" viewBox="0 0 100 100" fill="none">
                    <path
                      d="M5,7 Q3,3 10,4 L50,3 Q95,4 96,8 Q98,50 95,93 Q96,97 88,96 L50,97 Q4,96 3,92 Q2,50 5,7 Z"
                      stroke="hsl(var(--foreground))" strokeWidth="2" fill="hsl(var(--background))" vectorEffect="non-scaling-stroke"
                    />
                  </svg>
                  {inst.logo ? (
                    <img src={inst.logo} alt={inst.name} className="relative w-full h-full object-contain" />
                  ) : (
                    <div
                      className="relative bg-red-600 text-white font-bold text-xs px-2 py-1 rounded text-center"
                      style={{ fontFamily: FONT_HAND }}
                    >
                      සිහස්මා
                    </div>
                  )}
                </div>
                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-foreground text-base leading-snug" style={{ fontFamily: FONT_HAND }}>
                    {inst.name}
                  </p>
                  {inst.sublabel && (
                    <p className="text-foreground/60 text-sm mt-0.5" style={{ fontFamily: FONT_HAND }}>{inst.sublabel}</p>
                  )}
                  <div className="flex items-center gap-1 mt-1 text-foreground/70 text-sm" style={{ fontFamily: FONT_HAND }}>
                    <MapPin className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                    <span>{inst.location}</span>
                  </div>
                  <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1.5">
                    {inst.phone.map((p) => (
                      <a
                        key={p}
                        href={`tel:${p.replace(/\s/g, "")}`}
                        className="text-primary font-semibold text-sm hover:underline"
                        style={{ fontFamily: FONT_HAND }}
                      >
                        {p}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          <p
            className="text-foreground/50 text-sm text-center mt-1"
            style={{ fontFamily: FONT_HAND }}
          >
            More partner institutes coming soon across Sri Lanka
          </p>
        </motion.div>
      </div>
    </div>

    {/* Bottom wavy hand-drawn border */}
    <div className="text-foreground mt-12">
      <WavyBorder className="w-full h-10 rotate-180" />
    </div>
  </section>
);

export default InstitutesSection;
