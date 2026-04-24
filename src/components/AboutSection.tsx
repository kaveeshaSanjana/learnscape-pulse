import { motion, type Variants } from "framer-motion";
import { BookOpen, GraduationCap, Video, FileText, Mic, Clock } from "lucide-react";
import { useState, type CSSProperties } from "react";

const features = [
  {
    icon: Video,
    titleEn: "Live Online Classes",
    titleSi: "සජීවී අන්තර්ජාල පන්තිය",
    descEn: "Interactive sessions with real-time Q&A and discussion.",
    descSi: "සිසුන්ට ප්‍රශ්න විමසීමට සහ සාකච්ඡා කිරීමට අවස්ථා සමඟ අන්තර්ක්‍රියාකාරී සැසි",
  },
  {
    icon: FileText,
    titleEn: "Structured Notes",
    titleSi: "ව්‍යුහගත සටහන්",
    descEn: "Comprehensive study materials crafted for A/L & O/L syllabi.",
    descSi: "A/L සහ O/L විෂයවලට සකස් කරන ලද සම්පූර්ණ අධ්‍යයන ද්‍රව්‍ය",
  },
  {
    icon: Mic,
    titleEn: "Speaking Practice",
    titleSi: "කතා කිරීමේ පුහුණුව",
    descEn: "Build fluency through guided conversation exercises.",
    descSi: "මඟපෙන්වන සංවාද අභ්‍යාස හරහා කතා කිරීමේ දක්ෂතාවය සහ ස්වයංවිශ්වාසය වර්ධනය කරගන්න",
  },
  {
    icon: GraduationCap,
    titleEn: "Exam Strategy",
    titleSi: "පරීක්‍ෂණ උපක්‍රමය",
    descEn: "Proven techniques to maximize marks in every paper.",
    descSi: "සෑම පත්‍රයකම ලකුණු උපරිම කිරීම සඳහා සනාථ කළ ක්‍රමවේද",
  },
  {
    icon: BookOpen,
    titleEn: "Grammar Mastery",
    titleSi: "ව්‍යාකරණ දක්ෂතා",
    descEn: "Clear, simplified approach to English grammar rules.",
    descSi: "ඉංග්‍රීසි ව්‍යාකරණ නියම පිළිබඳ පැහැදිලි සරල ක්‍රමවේදය",
  },
  {
    icon: Clock,
    titleEn: "Class Recordings",
    titleSi: "පන්ති පටිගත කිරීම්",
    descEn: "Students who miss classes get access to recorded sessions.",
    descSi: "පන්තියට නොපැමිණෙන සිසුන්ට පටිගත කරන ලද සැසි සමඟ ප්‍රවේශය ලබා දේ",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  },
};

const centerVariants: Variants = {
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, type: "spring" as const, stiffness: 100, damping: 12 },
  },
};

const pulseRingVariants: Variants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, delay: 0.2 + i * 0.15, ease: "easeOut" as const },
  }),
};

const sectionTheme = {
  "--background": "206 78% 97%",
  "--foreground": "216 38% 18%",
  "--card": "0 0% 100%",
  "--card-foreground": "216 38% 18%",
  "--primary": "206 88% 56%",
  "--primary-foreground": "0 0% 100%",
  "--secondary": "205 80% 92%",
  "--secondary-foreground": "210 70% 32%",
  "--muted": "206 60% 94%",
  "--muted-foreground": "214 22% 44%",
  "--accent": "192 88% 45%",
  "--accent-foreground": "0 0% 100%",
  "--border": "206 38% 86%",
  "--input": "206 38% 86%",
  "--ring": "206 88% 56%",
} as React.CSSProperties;

const FeatureCard = ({ feature, index }: { feature: (typeof features)[0]; index: number }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      variants={cardVariants}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative"
    >
      <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-card/80 backdrop-blur-sm p-6 transition-all duration-500 hover:-translate-y-1 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/10">
        <motion.div
          animate={{ opacity: hovered ? 0.08 : 0, scale: hovered ? 1.2 : 0.8 }}
          transition={{ duration: 0.5 }}
          className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-primary blur-3xl"
        />

        <div className="absolute right-4 top-4">
          <span className="select-none text-5xl font-extrabold text-foreground/[0.04]" style={{ fontFamily: "var(--font-heading)" }}>
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <motion.div
          animate={{ rotate: hovered ? 8 : 0, scale: hovered ? 1.1 : 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
          className="relative z-10 mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 transition-colors duration-500 group-hover:border-primary group-hover:bg-primary"
        >
          <feature.icon className="h-7 w-7 text-primary transition-colors duration-500 group-hover:text-primary-foreground" />
        </motion.div>

        <div className="relative z-10">
          <h3
            className="mb-1 text-lg font-bold text-foreground transition-colors duration-300 group-hover:text-primary"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {feature.titleEn}
          </h3>
          <h3 className="mb-3 text-sm font-semibold text-primary/80" style={{ fontFamily: "var(--font-body)" }}>
            {feature.titleSi}
          </h3>
          <p className="mb-2 text-sm leading-relaxed text-muted-foreground">{feature.descEn}</p>
          <p className="text-xs leading-relaxed text-muted-foreground/80">{feature.descSi}</p>
        </div>

        <motion.div
          animate={{ scaleX: hovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          className="absolute bottom-0 left-0 right-0 h-[3px] origin-left bg-gradient-to-r from-primary to-accent"
        />
      </div>
    </motion.div>
  );
};

const AboutSection = () => (
  <section className="relative overflow-hidden py-24 md:py-32" id="about" style={sectionTheme}>
    <div className="absolute inset-0 bg-background" />
    <div
      className="absolute inset-0 opacity-[0.015]"
      style={{
        backgroundImage: `radial-gradient(hsl(var(--primary)) 1px, transparent 1px)`,
        backgroundSize: "28px 28px",
      }}
    />

    <motion.div
      animate={{ y: [0, -40, 0], x: [0, 30, 0], scale: [1, 1.1, 1] }}
      transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      className="absolute left-[-10%] top-10 h-[400px] w-[400px] rounded-full bg-primary/5 blur-[100px]"
    />
    <motion.div
      animate={{ y: [0, 30, 0], x: [0, -20, 0], scale: [1, 1.15, 1] }}
      transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      className="absolute bottom-10 right-[-10%] h-[350px] w-[350px] rounded-full bg-accent/5 blur-[100px]"
    />

    <div className="container relative z-10 mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-20 text-center"
      >
        <h2
          className="text-4xl font-extrabold leading-tight text-foreground md:text-5xl lg:text-6xl"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          What Makes Us{" "}
          <span className="relative inline-block">
            <span className="relative z-10 bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent">
              Different
            </span>
            <motion.span
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.6, ease: "easeOut" }}
              className="absolute -bottom-2 left-0 right-0 h-3 origin-left rounded-full bg-primary/10"
            />
          </span>
        </h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mx-auto mt-4 max-w-lg text-sm text-muted-foreground md:text-base"
        >
          We combine innovative teaching methods with personalized attention to deliver exceptional results
        </motion.p>
      </motion.div>

      <div className="hidden lg:block">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="relative mx-auto max-w-6xl"
        >
          <div className="grid grid-cols-3 items-start gap-6">
            <div className="space-y-6 pt-8">
              {features.slice(0, 2).map((f, i) => (
                <FeatureCard key={f.titleEn} feature={f} index={i} />
              ))}
            </div>

            <div className="flex flex-col items-center gap-8">
              <motion.div variants={centerVariants} className="relative">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    variants={pulseRingVariants}
                    custom={i}
                    className="absolute inset-0 rounded-full border border-primary/10"
                    style={{ transform: `scale(${1.3 + i * 0.25})` }}
                  />
                ))}

                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  className="absolute -inset-6 rounded-full border-2 border-dashed border-primary/15"
                />

                <div className="relative flex h-48 w-48 items-center justify-center rounded-full bg-gradient-to-br from-primary via-primary to-accent shadow-2xl shadow-primary/30">
                  <motion.div
                    animate={{ rotate: [-10, 10, -10] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-2 rounded-full bg-gradient-to-tr from-white/20 to-transparent"
                  />
                  <div className="relative z-10 text-center text-primary-foreground">
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 1, duration: 0.5 }}
                      className="text-5xl font-extrabold leading-none"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      6+
                    </motion.p>
                    <motion.p
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 0.9 }}
                      viewport={{ once: true }}
                      transition={{ delay: 1.2, duration: 0.5 }}
                      className="mt-1.5 text-[10px] font-bold uppercase tracking-[0.2em]"
                    >
                      Key Features
                    </motion.p>
                  </div>
                </div>
              </motion.div>

              {features.slice(2, 4).map((f, i) => (
                <FeatureCard key={f.titleEn} feature={f} index={i + 2} />
              ))}
            </div>

            <div className="space-y-6 pt-8">
              {features.slice(4, 6).map((f, i) => (
                <FeatureCard key={f.titleEn} feature={f} index={i + 4} />
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <div className="hidden md:block lg:hidden">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mx-auto grid max-w-3xl grid-cols-2 gap-5"
        >
          {features.map((f, i) => (
            <FeatureCard key={f.titleEn} feature={f} index={i} />
          ))}
        </motion.div>
      </div>

      <div className="md:hidden">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mx-auto max-w-sm space-y-4"
        >
          <motion.div variants={centerVariants} className="mb-6 flex justify-center">
            <div className="flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent shadow-xl shadow-primary/20">
              <div className="text-center text-primary-foreground">
                <p className="text-3xl font-extrabold leading-none" style={{ fontFamily: "var(--font-heading)" }}>6+</p>
                <p className="mt-1 text-[8px] font-bold uppercase tracking-widest opacity-90">Features</p>
              </div>
            </div>
          </motion.div>

          {features.map((f, i) => (
            <FeatureCard key={f.titleEn} feature={f} index={i} />
          ))}
        </motion.div>
      </div>
    </div>
  </section>
);

export default AboutSection;
