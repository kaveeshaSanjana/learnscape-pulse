import { motion } from "framer-motion";
import postLiveClass from "@/assets/post-live-class.jpg";
import postStudents from "@/assets/post-students.jpg";
import postResults from "@/assets/post-results.jpg";

const posts = [
  { image: postStudents, label: "LIVE CLASSES", rotate: -6, translateY: 40 },
  { image: postLiveClass, label: "ONLINE SESSIONS", rotate: 0, translateY: 0, featured: true },
  { image: postResults, label: "EXAM RESULTS", rotate: 5, translateY: 50 },
];

const PostSection = () => (
  <section className="relative py-16 md:py-24 overflow-hidden" style={{ background: "var(--hero-gradient)" }}>
    {/* Subtle dot pattern */}
    <div
      className="absolute inset-0 opacity-[0.03]"
      style={{
        backgroundImage: `radial-gradient(hsl(var(--primary)) 1px, transparent 1px)`,
        backgroundSize: "24px 24px",
      }}
    />

    <div className="container mx-auto px-4 relative z-10">
      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex justify-center mb-4 md:mb-6"
      >
        <span className="inline-flex items-center gap-2 px-4 py-1.5 md:px-5 md:py-2 rounded-full border border-primary/30 bg-primary/5 text-primary text-[10px] md:text-xs font-bold uppercase tracking-[0.2em]">
          <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-primary animate-pulse" />
          Eazy English
        </span>
      </motion.div>

      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-center mb-3 md:mb-4"
      >
        <h2
          className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight px-2"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          ඔබත් ඊළඟ සාර්ථක කතාව වෙන්න
        </h2>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-center text-muted-foreground text-xs md:text-base mb-10 md:mb-16 max-w-md mx-auto"
      >
        අදම අප සමඟ එකතු වන්න
      </motion.p>

      {/* MOBILE: Stacked cards with slight rotation */}
      <div className="flex flex-col items-center gap-6 md:hidden">
        {posts.map((post, i) => (
          <motion.div
            key={post.label}
            initial={{ opacity: 0, y: 40, rotate: post.rotate }}
            whileInView={{ opacity: 1, y: 0, rotate: post.rotate / 2 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 * i }}
            className="group"
          >
            <div className="relative overflow-hidden rounded-2xl shadow-xl w-[280px] h-[360px] sm:w-[320px] sm:h-[400px]">
              <img
                src={post.image}
                alt={post.label}
                loading="lazy"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <span
                  className="text-white/90 text-xs font-bold uppercase tracking-[0.15em]"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {post.label}
                </span>
                <div className="mt-2 h-[2px] w-8 bg-primary rounded-full opacity-80" />
              </div>
              <div className="absolute inset-0 rounded-2xl ring-2 ring-white/10" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* DESKTOP: Overlapping tilted image gallery */}
      <div className="relative hidden md:flex items-center justify-center min-h-[500px] lg:min-h-[550px]">
        {posts.map((post, i) => (
          <motion.div
            key={post.label}
            initial={{ opacity: 0, y: 60, rotate: post.rotate * 2 }}
            whileInView={{ opacity: 1, y: post.translateY, rotate: post.rotate }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              delay: 0.15 * i,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            whileHover={{
              rotate: 0,
              scale: 1.05,
              y: post.translateY - 10,
              zIndex: 30,
              transition: { duration: 0.3 },
            }}
            className="absolute cursor-pointer group"
            style={{
              zIndex: post.featured ? 20 : 10 + i,
              left: i === 0 ? "8%" : i === 1 ? "50%" : undefined,
              right: i === 2 ? "8%" : undefined,
              transform: i === 1 ? "translateX(-50%)" : undefined,
            }}
          >
            <div
              className={`relative overflow-hidden rounded-3xl shadow-2xl transition-shadow duration-300 group-hover:shadow-[0_25px_60px_-12px_rgba(0,0,0,0.35)] ${
                post.featured
                  ? "w-[300px] h-[400px] lg:w-[380px] lg:h-[480px]"
                  : "w-[240px] h-[340px] lg:w-[320px] lg:h-[420px]"
              }`}
            >
              <img
                src={post.image}
                alt={post.label}
                loading="lazy"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <span
                  className="text-white/90 text-sm font-bold uppercase tracking-[0.15em]"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {post.label}
                </span>
                <div className="mt-2 h-[2px] w-8 bg-primary rounded-full opacity-80" />
              </div>
              <div className="absolute inset-0 rounded-3xl ring-2 ring-white/10 group-hover:ring-primary/40 transition-all duration-300" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default PostSection;
