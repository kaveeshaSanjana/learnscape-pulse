import { useCallback } from "react";
import { Button } from "@/components/ui/button";

// Creates multiple outward rings around the button
export const BurstButton = ({ label = "Click Me" }: { label?: string }) => {
  const onClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const container = e.currentTarget.parentElement; // wrapper is relative
    if (!container) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    const centerX = rect.left - containerRect.left + rect.width / 2;
    const centerY = rect.top - containerRect.top + rect.height / 2;

    const rings = 12; // number of circles
    const radius = Math.max(rect.width, rect.height) * 0.8; // starting offset

    for (let i = 0; i < rings; i++) {
      const angle = (i / rings) * Math.PI * 2;
      const tx = Math.cos(angle) * radius;
      const ty = Math.sin(angle) * radius;
      const txEnd = Math.cos(angle) * radius * 1.8;
      const tyEnd = Math.sin(angle) * radius * 1.8;

      const ring = document.createElement("span");
      ring.className = "pointer-events-none absolute rounded-full border border-primary opacity-90 animate-burst";
      ring.style.left = `${centerX}px`;
      ring.style.top = `${centerY}px`;
      ring.style.width = `14px`;
      ring.style.height = `14px`;
      ring.style.transform = `translate(${tx}px, ${ty}px) scale(0.6)`;
      ring.style.setProperty("--tx", `${tx}px`);
      ring.style.setProperty("--ty", `${ty}px`);
      ring.style.setProperty("--txEnd", `${txEnd}px`);
      ring.style.setProperty("--tyEnd", `${tyEnd}px`);
      ring.style.setProperty("--burst-duration", `${550 + i * 12}ms`);

      container.appendChild(ring);

      ring.addEventListener(
        "animationend",
        () => {
          ring.remove();
        },
        { once: true }
      );
    }
  }, []);

  return (
    <div className="relative inline-flex text-primary">
      <Button variant="cta" size="lg" onClick={onClick} aria-label={label}>
        {label}
      </Button>
    </div>
  );
};
