"use client";

import { MouseEvent, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { renderText } from "../../_lib/content/renderText";
import type {
  SolutionCardContent,
  SolutionsContent,
} from "../../_content/home";

type SolutionId = SolutionCardContent["id"];

type SolutionsSectionProps = { content: SolutionsContent };

const readMobileQuery = () => {
  const breakpoint = getComputedStyle(document.documentElement)
    .getPropertyValue("--header-mobile-breakpoint")
    .trim();
  return window.matchMedia(`(max-width: ${breakpoint || "760px"})`);
};

const SolutionsSection = ({ content }: SolutionsSectionProps) => {
  const axLabel = renderText(content.axLabel);
  const learningLabel = renderText(content.learningLabel);
  const headerRef = useRef<HTMLElement>(null);
  const processRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const mobileQueryRef = useRef<MediaQueryList | null>(null);
  const [activeId, setActiveId] = useState<SolutionId | null>(null);

  useEffect(() => {
    const mobileQuery = readMobileQuery();
    mobileQueryRef.current = mobileQuery;

    const resetActive = () => setActiveId(null);
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") resetActive();
    };
    mobileQuery.addEventListener("change", resetActive);
    document.addEventListener("keydown", closeOnEscape);

    return () => {
      mobileQuery.removeEventListener("change", resetActive);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  useEffect(() => {
    const targets = [headerRef.current, processRef.current, listRef.current];
    const nodes = targets.filter((node): node is HTMLElement => node !== null);

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) {
      nodes.forEach((node) => (node.dataset.reveal = "visible"));
      return;
    }

    nodes.forEach((node) => (node.dataset.reveal = "pending"));
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
    nodes.forEach((node) => observer.observe(node));

    return () => observer.disconnect();
  }, []);

  const isMobile = () => mobileQueryRef.current?.matches ?? false;

  const handleEnter = (id: SolutionId) => {
    if (!isMobile()) setActiveId(id);
  };

  const handleLeave = () => {
    if (!isMobile()) setActiveId(null);
  };

  /* Mobile: the first tap expands the card, a tap on the expanded card navigates. */
  const handleClick = (
    event: MouseEvent<HTMLAnchorElement>,
    id: SolutionId,
  ) => {
    if (!isMobile() || activeId === id) return;
    event.preventDefault();
    setActiveId(id);
  };

  return (
    <section
      id="solutions"
      className="solutions-section"
      aria-labelledby="solutions-title"
    >
      <div className="solutions-inner">
        <header ref={headerRef} className="solutions-header">
          <h2 id="solutions-title" className="solutions-title">
            {content.title}
          </h2>
          <p className="solutions-description">
            {content.description}
          </p>
        </header>

        <div
          ref={processRef}
          className="solutions-process"
          aria-label={content.processLabel}
        >
          <div className="solutions-process__desktop">
            <div />
            {content.stages.map(({ name }) => (
              <div key={name} className="solutions-process__stage-head">
                <span>{name}</span>
              </div>
            ))}
            <div className="solutions-process__track-label">{axLabel}</div>
            {content.stages.map(({ name, ax }) => (
              <div key={name} className="solutions-process__track-cell">
                {renderText(ax)}
              </div>
            ))}
            <div className="solutions-process__track-label solutions-process__track-label--last">
              {learningLabel}
            </div>
            {content.stages.map(({ name, learning }) => (
              <div
                key={name}
                className="solutions-process__track-cell solutions-process__track-cell--last"
              >
                {renderText(learning)}
              </div>
            ))}
            {[1, 2, 3].map((order) => (
              <span
                key={order}
                className={`solutions-process__chevron solutions-process__chevron--${order}`}
                aria-hidden="true"
              />
            ))}
          </div>

          <div className="solutions-process__mobile">
            {content.stages.map(({ name, ax, learning }) => (
              <article key={name} className="solutions-process__stage">
                <h3>{name}</h3>
                <p>
                  <strong>{axLabel}</strong>
                  <br />
                  {renderText(ax)}
                </p>
                <p>
                  <strong>{learningLabel}</strong>
                  <br />
                  {renderText(learning)}
                </p>
              </article>
            ))}
          </div>
        </div>

        <div
          ref={listRef}
          className="solutions-list"
          data-active-card={activeId ?? "none"}
        >
          {content.solutions.map(({ id, title, image, description, items }) => {
            const active = activeId === id;
            return (
              <Link
                key={id}
                href={`/solutions#${id}`}
                className={`solution-card solution-card--${id}`}
                data-active={active}
                onMouseEnter={() => handleEnter(id)}
                onMouseLeave={handleLeave}
                onFocus={() => handleEnter(id)}
                onBlur={handleLeave}
                onClick={(event) => handleClick(event, id)}
              >
                <span className="solution-card__content">
                  <span className="solution-card__meta" aria-hidden="true">
                    {active ? "↗" : "+"}
                  </span>
                  <Image
                    className="solution-card__image"
                    src={image}
                    width={1254}
                    height={1254}
                    sizes="224px"
                    alt=""
                    aria-hidden="true"
                    loading="eager"
                  />
                  <span className="solution-card__summary">
                    <span className="solution-card__title">
                      {renderText(title)}
                    </span>
                    <span className="solution-card__description">
                      {renderText(description)}
                    </span>
                    <span className="solution-card__panel">
                      <span className="solution-card__list">
                        {items.map((item, index) => (
                          <span key={index}>{item}</span>
                        ))}
                      </span>
                    </span>
                  </span>
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SolutionsSection;
