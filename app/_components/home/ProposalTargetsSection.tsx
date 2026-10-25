"use client";

import { useEffect, useRef } from "react";
import { renderText } from "../../_lib/content/renderText";
import type { ProposalTargetsContent } from "../../_content/home";
import LinkButton from "../commons/buttons/LinkButton";
import Image from "next/image";

type ProposalTargetsSectionProps = { content: ProposalTargetsContent };

const ProposalTargetsSection = ({ content }: ProposalTargetsSectionProps) => {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) {
      grid.dataset.reveal = "visible";
      return;
    }

    grid.dataset.reveal = "pending";
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          grid.dataset.reveal = "visible";
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -8%" },
    );
    observer.observe(grid);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="proposal"
      className="proposal-section"
      aria-labelledby="proposal-title"
    >
      <div className="proposal-inner">
        <header className="proposal-header">
          <h2 id="proposal-title" className="proposal-title">
            {content.title}
          </h2>
          <p className="proposal-description">
            {content.description}
          </p>
        </header>
        <div ref={gridRef} className="proposal-grid">
          {content.cards.map(({ modifier, tags, title, description, graphic }) => (
            <article
              key={modifier}
              className={`proposal-card proposal-card--${modifier}`}
            >
              <div className="proposal-card__content">
                <p className="proposal-card__tags">{tags}</p>
                <h3 className="proposal-card__title">
                  {renderText(title)}
                </h3>
                <p className="proposal-card__description">{description}</p>
              </div>
              {graphic && (
                <Image
                  className="proposal-graphic"
                  src={graphic}
                  alt=""
                  aria-hidden="true"
                  decoding="async"
                  width={150}
                  height={150}
                />
              )}
            </article>
          ))}
          <div className="proposal-explanation">
            <h3 className="proposal-explanation__title">
              {renderText(content.explanation.title)}
            </h3>
            <p className="proposal-explanation__description">
              {content.explanation.description}
            </p>
            <LinkButton
              href={content.explanation.link.href}
              className="proposal-detail-link"
            >
              {content.explanation.link.label}
              <span aria-hidden="true">→</span>
            </LinkButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProposalTargetsSection;
