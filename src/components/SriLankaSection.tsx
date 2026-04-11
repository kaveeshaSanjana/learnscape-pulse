import { motion } from "framer-motion";
import sriLankaMap from "@/assets/sri-lanka-map.png";

const SriLankaSection = () => (
  <section className="relative overflow-hidden bg-primary/5 py-20 md:py-28" id="sri-lanka">
    {/* Scrolling background text - row 1 moving right */}
    <div className="absolute top-[8%] left-0 w-full overflow-hidden">
      <motion.div
        animate={{ x: ["-50%", "0%"] }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        className="flex whitespace-nowrap gap-12"
      >
        {Array.from({ length: 6 }).map((_, i) => (
          <span key={i} className="text-[6rem] md:text-[10rem] font-black text-primary/[0.07] uppercase tracking-widest select-none">
            Online Classes
          </span>
        ))}
      </motion.div>
    </div>

    {/* Scrolling background text - row 2 (CENTER) moving left + rotating */}
    <div className="absolute top-[38%] left-0 w-full overflow-hidden">
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
        className="flex whitespace-nowrap gap-12"
        style={{ transform: "rotate(-3deg)", transformOrigin: "center center" }}
      >
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.span
            key={i}
            animate={{ rotate: [-3, 3, -3] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="text-[7rem] md:text-[11rem] font-black text-primary/[0.09] uppercase tracking-widest select-none"
          >
            Eazy English
          </motion.span>
        ))}
      </motion.div>
    </div>

    {/* Scrolling background text - row 3 moving right */}
    <div className="absolute top-[68%] left-0 w-full overflow-hidden">
      <motion.div
        animate={{ x: ["-50%", "0%"] }}
        transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
        className="flex whitespace-nowrap gap-12"
      >
        {Array.from({ length: 6 }).map((_, i) => (
          <span key={i} className="text-[6rem] md:text-[10rem] font-black text-primary/[0.07] uppercase tracking-widest select-none">
            Zoom · YouTube
          </span>
        ))}
      </motion.div>
    </div>

    {/* Center map */}
    <div className="container mx-auto px-4 relative z-10 flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, type: "spring", bounce: 0.2 }}
        className="relative"
      >
        <div className="absolute inset-0 bg-primary/10 blur-[80px] rounded-full scale-90" />

        <img
          src={sriLankaMap}
          alt="Sri Lanka"
          className="relative z-10 w-[260px] md:w-[360px] lg:w-[420px] drop-shadow-2xl"
          loading="lazy"
          style={{ filter: 'brightness(0)' }}
        />
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="mt-10 text-sm md:text-base text-muted-foreground tracking-widest uppercase font-medium"
        style={{ fontFamily: 'var(--font-body)' }}
      >
        Easy English · Across Sri Lanka
      </motion.p>
    </div>
  </section>
);

export default SriLankaSection;
