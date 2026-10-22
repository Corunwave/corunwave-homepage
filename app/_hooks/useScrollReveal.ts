import { useEffect } from "react";
import type { RefObject } from "react";

/* Scroll reveal: marks every [data-reveal-item] under `rootRef` as pending, then visible once it enters the viewport.
 * Without JS (or with reduced motion) nothing is marked, so the items stay visible. */
export const useScrollReveal = (rootRef: RefObject<HTMLElement | null>) => {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) return;

    const items = root.querySelectorAll<HTMLElement>("[data-reveal-item]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          (entry.target as HTMLElement).dataset.reveal = "visible";
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -8%" },
    );

    items.forEach((item) => {
      item.dataset.reveal = "pending";
      observer.observe(item);
    });

    return () => observer.disconnect();
  }, [rootRef]);
};
