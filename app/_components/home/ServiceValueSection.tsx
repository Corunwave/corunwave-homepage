"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import { renderText } from "../../_lib/content/renderText";
import type { ServiceValuesContent } from "../../_content/home";

type ServiceValueSectionProps = { content: ServiceValuesContent };

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

const subscribeReducedMotion = (onChange: () => void) => {
  const query = window.matchMedia(REDUCED_MOTION_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
};

const readReducedMotion = () => window.matchMedia(REDUCED_MOTION_QUERY).matches;

/* Server and no-JS render the stacked (static) layout. */
const readReducedMotionOnServer = () => true;

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

const stateOf = (index: number, activeIndex: number) => {
  if (index === activeIndex) return "active";
  return index < activeIndex ? "before" : "after";
};

const ServiceValueSection = ({ content }: ServiceValueSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    readReducedMotion,
    readReducedMotionOnServer,
  );
  const mode = reducedMotion ? "static" : "pinned";

  useEffect(() => {
    if (reducedMotion) return;

    const section = sectionRef.current;
    const sticky = stickyRef.current;
    if (!section || !sticky) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const stickyTop = parseFloat(getComputedStyle(sticky).top) || 0;
      const travel = Math.max(1, section.offsetHeight - sticky.offsetHeight);
      const progress = clamp(
        (stickyTop - section.getBoundingClientRect().top) / travel,
        0,
        1,
      );
      const next = Math.min(
        content.values.length - 1,
        Math.floor(progress * content.values.length),
      );
      setActiveIndex(next);
    };
    const schedule = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [reducedMotion, content.values.length]);

  return (
    <section
      id="service-values"
      ref={sectionRef}
      className="service-values-section"
      aria-labelledby="service-values-title"
      data-mode={mode}
    >
      <div ref={stickyRef} className="service-values-sticky">
        <div className="service-values-stage">
          <header className="service-values-header">
            <h2 id="service-values-title" className="service-values-title">
              {content.title}
            </h2>
            <p className="service-values-intro">
              {content.intro}
            </p>
          </header>

          <ol className="service-values-list">
            {content.values.map(({ id, word, title, description, image }, index) => (
              <li
                key={id}
                className="service-value"
                data-state={stateOf(index, activeIndex)}
              >
                <span className="service-value__word" aria-hidden="true">
                  {word}
                </span>
                <div className="service-value__visual">
                  <Image
                    className="service-value__image"
                    src={image}
                    alt=""
                    aria-hidden="true"
                    fill
                    sizes="(max-width: 1024px) 76vw, 617px"
                  />
                </div>
                <article className="service-value__copy">
                  <h3 className="service-value__title">{title}</h3>
                  <p className="service-value__description">
                    {renderText(description, {
                      breakClassName: "service-value__break",
                    })}
                  </p>
                </article>
              </li>
            ))}
          </ol>

          <div className="service-values-dots" aria-hidden="true">
            {content.values.map(({ id }, index) => (
              <span key={id} data-active={index === activeIndex} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceValueSection;
