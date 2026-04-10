import { motion, useMotionValue, useTransform } from "framer-motion";
import { BookOpen, Users, GraduationCap, Video, FileText, Mic, ArrowRight } from "lucide-react";
import { useRef } from "react";

const features = [
  { icon: Video, title: "සජීවී මාර්ගගත පන්ති", desc: "තත්‍ය කාලීන ප්‍රශ්න සහ සාකච්ඡා සමඟ අන්තර්ක්‍රියාකාරී සැසි.", accent: "213 80% 50%" },
  { icon: FileText, title: "ව්‍යුහගත සටහන්", desc: "A/L සහ O/L විෂය නිර්දේශ සඳහා සකස් කළ සවිස්තර අධ්‍යයන ද්‍රව්‍ය.", accent: "200 90% 55%" },
  { icon: Users, title: "කුඩා කණ්ඩායම්", desc: "එක් පන්තියකට සීමිත සිසුන් සමඟ පුද්ගලික අවධානය.", accent: "170 80% 45%" },
  { icon: Mic, title: "කතා කිරීමේ පුහුණුව", desc: "මඟ පෙන්වීම් සහිත සංවාද අභ්‍යාස තුළින් නිපුණතාව ගොඩ නගන්න.", accent: "280 70% 55%" },
  { icon: GraduationCap, title: "විභාග උපාය මාර්ග", desc: "සෑම ප්‍රශ්න පත්‍රයකම ලකුණු උපරිම කිරීමේ ඔප්පු කළ ක්‍රම.", accent: "35 90% 55%" },
  { icon: BookOpen, title: "ව්‍යාකරණ ප්‍රවීණතාව", desc: "ඉංග්‍රීසි ව්‍යාකරණ රීති සඳහා පැහැදිලි, සරල කළ ප්‍රවේශය.", accent: "350 75% 55%" },
];

const FeatureCard = ({ feature, index }: { feature: typeof features[0]; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isEven ? -60 : 60, rotateY: isEven ? -8 : 8 }}
      whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group relative"
    >
      <div
        className="relative overflow-hidden rounded-3xl p-[1px] transition-all duration-500"
        style={{
          background: `linear-gradient(135deg, hsl(${feature.accent} / 0.3), transparent 60%)`,
        }}
      >
        <div className="relative rounded-3xl bg-card p-6 sm:p-8 overflow-hidden transition-all duration-500 group-hover:bg-card/80">
          {/* Glow orb */}
          <div
            className="absolute -top-16 -right-16 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-700"
            style={{ background: `hsl(${feature.accent})` }}
          />

          {/* Number watermark */}
          <span
            className="absolute top-3 right-5 text-[5rem] font-extrabold leading-none opacity-[0.04] select-none pointer-events-none"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>

          <div className="relative z-10 flex items-start gap-5">
            {/* Icon */}
            <motion.div
              whileHover={{ rotate: 12, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg"
              style={{
                background: `linear-gradient(135deg, hsl(${feature.accent}), hsl(${feature.accent} / 0.7))`,
              }}
            >
              <feature.icon className="w-7 h-7 text-white" />
            </motion.div>

            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-bold text-foreground mb-1.5 group-hover:text-primary transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.desc}
              </p>

              {/* Hover reveal arrow */}
              <motion.div
                className="mt-3 flex items-center gap-1.5 text-xs font-semibold opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                style={{ color: `hsl(${feature.accent})` }}
              >
                තව දැන ගන්න <ArrowRight className="w-3.5 h-3.5" />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const AboutSection = () => (
  <section className="relative py-24 overflow-hidden" id="about">
    {/* Background pattern */}
    <div className="absolute inset-0 bg-background" />
    <div
      className="absolute inset-0 opacity-[0.02]"
      style={{
        backgroundImage: `radial-gradient(hsl(var(--primary)) 1px, transparent 1px)`,
        backgroundSize: "32px 32px",
      }}
    />

    {/* Floating gradient blobs */}
    <motion.div
      animate={{ y: [0, -30, 0], x: [0, 20, 0] }}
      transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      className="absolute top-20 -left-32 w-72 h-72 rounded-full bg-primary/5 blur-3xl"
    />
    <motion.div
      animate={{ y: [0, 20, 0], x: [0, -15, 0] }}
      transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      className="absolute bottom-20 -right-32 w-80 h-80 rounded-full bg-accent/5 blur-3xl"
    />

    <div className="container mx-auto px-4 relative z-10">
      {/* Header with asymmetric layout */}
      <div className="max-w-3xl mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-4"
        >
          <div className="h-[2px] w-12 bg-primary rounded-full" />
          <p className="text-primary font-semibold text-sm uppercase tracking-widest">
            අපව තෝරා ගන්නේ ඇයි
          </p>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          අපව{" "}
          <span className="relative inline-block">
            <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              වෙනස්
            </span>
            <motion.span
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="absolute -bottom-1 left-0 right-0 h-3 bg-primary/10 rounded-full origin-left"
            />
          </span>
          {" "}කරන්නේ කුමක්ද?
        </motion.h2>
      </div>

      {/* Staggered masonry-style grid */}
      <div className="grid md:grid-cols-2 gap-5 max-w-5xl">
        {/* Left column - offset up */}
        <div className="space-y-5">
          {features.filter((_, i) => i % 2 === 0).map((f, i) => (
            <FeatureCard key={f.title} feature={f} index={i * 2} />
          ))}
        </div>
        {/* Right column - offset down */}
        <div className="space-y-5 md:pt-12">
          {features.filter((_, i) => i % 2 !== 0).map((f, i) => (
            <FeatureCard key={f.title} feature={f} index={i * 2 + 1} />
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default AboutSection;
