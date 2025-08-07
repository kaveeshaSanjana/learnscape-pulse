import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";

const About = () => {
  const sectionRef = useRevealOnScroll<HTMLElement>();
  return (
    <section ref={sectionRef} id="about" className="min-h-screen flex items-center bg-background" aria-label="About section">
      <div className="container mx-auto px-6 md:px-8 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">About Our LMS</h2>
          <p className="text-lg text-muted-foreground mb-6">
            We craft modern learning experiences with performance, accessibility, and delightful motion. This template demonstrates a clean structure for home, features, videos, and about.
          </p>
          <ul className="space-y-2 text-muted-foreground">
            <li>• Full-page responsive sections</li>
            <li>• Smooth re-triggering scroll animations</li>
            <li>• Parallax video carousel and burst interactions</li>
          </ul>
        </div>
        <div className="bg-card border rounded-xl p-6 shadow-sm">
          <h3 className="text-xl font-semibold mb-2">Why it works</h3>
          <p className="text-muted-foreground">A strong design system, semantic HTML, and optimized motion result in a premium feel suitable for education platforms.</p>
        </div>
      </div>
    </section>
  );
};

export default About;
