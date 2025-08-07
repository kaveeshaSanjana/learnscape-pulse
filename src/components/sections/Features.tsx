import { BookOpen, ShieldCheck, Sparkles, Users } from "lucide-react";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";
import { BurstButton } from "./BurstButton";

const items = [
  {
    icon: Sparkles,
    title: "Interactive UI",
    desc: "Smooth micro-interactions keep learners engaged across devices.",
  },
  {
    icon: BookOpen,
    title: "Rich Content",
    desc: "Embed videos, quizzes, and docs with ease and structure.",
  },
  {
    icon: Users,
    title: "Collaborative",
    desc: "Learners and instructors connect with real-time feedback.",
  },
  {
    icon: ShieldCheck,
    title: "Secure",
    desc: "Best practices ensure reliability and data protection.",
  },
];

const Features = () => {
  const sectionRef = useRevealOnScroll<HTMLElement>();

  return (
    <section
      ref={sectionRef}
      id="features"
      className="min-h-screen flex items-center bg-background"
      aria-label="Features section"
    >
      <div className="container mx-auto px-6 md:px-8">
        <header className="max-w-3xl mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Powerful Features</h2>
          <p className="text-muted-foreground text-lg">
            Everything you need to deliver an exceptional learning experience.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {items.map((it) => (
            <article key={it.title} className="bg-card border rounded-lg p-6 shadow-sm hover-scale">
              <it.icon className="mb-3" />
              <h3 className="text-xl font-semibold mb-2">{it.title}</h3>
              <p className="text-muted-foreground">{it.desc}</p>
            </article>
          ))}
        </div>

        <div className="flex items-center gap-6">
          <BurstButton label="Click Me" />
          <p className="text-sm text-muted-foreground">
            Tap to see a modern burst effect that radiates around the button.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Features;
