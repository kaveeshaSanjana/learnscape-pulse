import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";

const videos = [
  { id: 1, title: "Course Overview", subtitle: "Get started fast", poster: "/placeholder.svg" },
  { id: 2, title: "Interactive Lesson", subtitle: "Hands-on learning", poster: "/placeholder.svg" },
  { id: 3, title: "Expert Talk", subtitle: "Learn from pros", poster: "/placeholder.svg" },
  { id: 4, title: "Project Demo", subtitle: "Build real apps", poster: "/placeholder.svg" },
];

const Card = ({ v, idx, tilt = 0 }: { v: typeof videos[number]; idx: number; tilt: number }) => {
  return (
    <article
      className="relative bg-card border rounded-xl overflow-hidden min-w-[80%] sm:min-w-[55%] md:min-w-[40%] lg:min-w-[30%] mr-6 shadow-sm will-change-transform"
      style={{ transform: `perspective(1000px) rotateY(${tilt * 8}deg)` }}
      aria-label={`${v.title} card`}
    >
      <div className="aspect-video bg-muted" aria-hidden>
        <img src={v.poster} alt={`${v.title} thumbnail`} className="w-full h-full object-cover" loading="lazy" />
      </div>
      <div className="p-5">
        <h3 className="text-xl font-semibold">{v.title}</h3>
        <p className="text-muted-foreground mb-4">{v.subtitle}</p>
        <Button variant="secondary" size="sm">Watch</Button>
      </div>
    </article>
  );
};

const VideoShowcase = () => {
  const sectionRef = useRevealOnScroll<HTMLElement>();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, dragFree: true });
  const tiltRefs = useRef<number[]>(videos.map(() => 0));
  const setTilt = useCallback((index: number, value: number) => {
    tiltRefs.current[index] = value;
  }, []);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  const onScroll = useCallback(() => {
    const api = emblaApi;
    if (!api) return;
    const engine = (api as any).internalEngine();
    const scrollProgress = api.scrollProgress();
    engine.slideRegistry.forEach((slideIndexes: number[]) => {
      slideIndexes.forEach((slideIdx: number) => {
        const node = cardsRef.current[slideIdx];
        if (!node) return;
        const progress = api.scrollSnapList()[slideIdx] - scrollProgress;
        const tilt = Math.max(-1, Math.min(1, progress));
        node.style.transform = `perspective(1000px) rotateY(${tilt * -12}deg)`;
      });
    });
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("scroll", onScroll);
    emblaApi.on("reInit", onScroll);
    onScroll();
  }, [emblaApi, onScroll]);

  return (
    <section ref={sectionRef} id="videos" className="min-h-screen flex items-center bg-background" aria-label="Video showcase section">
      <div className="container mx-auto px-6 md:px-8 w-full">
        <header className="max-w-3xl mb-8">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Video Showcase</h2>
          <p className="text-muted-foreground text-lg">Scroll horizontally to explore featured videos. Smooth, responsive, and with depth.</p>
        </header>

        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {videos.map((v, i) => (
                <div key={v.id} className="embla__slide" ref={(el) => { if (el) cardsRef.current[i] = el; }}>
                  <Card v={v} idx={i} tilt={tiltRefs.current[i]} />
                </div>
              ))}
            </div>
          </div>
          <div className="absolute inset-y-0 left-0 flex items-center pl-2">
            <Button variant="outline" size="icon" aria-label="Previous" onClick={() => emblaApi?.scrollPrev()}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Button>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2">
            <Button variant="outline" size="icon" aria-label="Next" onClick={() => emblaApi?.scrollNext()}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoShowcase;
