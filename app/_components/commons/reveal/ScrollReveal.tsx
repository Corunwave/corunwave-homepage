"use client";

import { useRef } from "react";
import type { ReactNode } from "react";
import { useScrollReveal } from "../../../_hooks/useScrollReveal";

/* Client-only scope for scroll reveal, so static server sections can mark children with data-reveal-item. Renders display: contents. */
const ScrollReveal = ({ children }: { children: ReactNode }) => {
  const scopeRef = useRef<HTMLDivElement>(null);
  useScrollReveal(scopeRef);

  return (
    <div ref={scopeRef} className="scroll-reveal-scope">
      {children}
    </div>
  );
};

export default ScrollReveal;
