import { Button } from "@/components/ui/button";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";

const Hero = () => {
  const sectionRef = useRevealOnScroll<HTMLElement>();

  return (
    <section
      ref={sectionRef}
      id="home"
      className="min-h-screen bg-hero text-foreground flex items-center relative overflow-hidden"
      aria-label="Home section"
    >
      <div className="container mx-auto px-6 md:px-8">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
            Modern LMS for Interactive Learning
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8">
            Build engaging courses, showcase content beautifully, and delight learners with smooth animations.
          </p>
          <div className="flex gap-4 flex-wrap">
            <Button variant="hero" size="lg" asChild>
              <a href="#features" aria-label="Explore Features">Explore Features</a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="#videos" aria-label="See Videos">See Videos</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
