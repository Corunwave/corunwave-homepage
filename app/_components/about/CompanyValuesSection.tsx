"use client";

import { Fragment, useEffect, useRef } from "react";
import Image from "next/image";
import { renderText } from "../../_lib/content/renderText";
import type { CompanyValuesContent } from "../../_content/about";

type CompanyValuesSectionProps = { content: CompanyValuesContent };

/* Company values "CoRunWave = Cooperation + Run + Wave" (preview .company-values-section; Figma 662:20146 / 662:20180). Client component only for the scroll reveal. */
const CompanyValuesSection = ({ content }: CompanyValuesSectionProps) => {
  const cardsRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const cards = cardsRef.current;
    if (!cards) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) {
      cards.dataset.reveal = "visible";
      return;
    }

    cards.dataset.reveal = "pending";
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          cards.dataset.reveal = "visible";
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -8%" },
    );
    observer.observe(cards);

    return () => observer.disconnect();
  }, []);

  return (
    <section className="values-section" aria-labelledby="values-title">
      <div className="values-inner">
        <header className="values-header">
          <h2 id="values-title" className="values-title">
            {content.titleLines.map((line, index) => (
              <Fragment key={line}>
                {index > 0 && " "}
                <span className="values-keep">{line}</span>
              </Fragment>
            ))}
          </h2>
          <p className="values-intro">
            {content.intro}
          </p>
        </header>

        <ul ref={cardsRef} className="values-cards">
          {content.values.map(({ id, en, ko, description, image }) => (
            <li key={id} className={`value-card value-card--${id}`}>
              <div className="value-card__art" aria-hidden="true">
                <Image src={image} alt="" width={1536} height={1024} sizes="320px" />
              </div>
              <div className="value-card__glass" aria-hidden="true" />
              <Image
                className="value-card__object"
                src={image}
                alt=""
                aria-hidden="true"
                width={1536}
                height={1024}
                sizes="(max-width: 1024px) 164px, 194px"
              />
              <div className="value-card__heading">
                <p className="value-card__en">{en}</p>
                <h3 className="value-card__ko">{ko}</h3>
              </div>
              <p className="value-card__description">
                {renderText(description)}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default CompanyValuesSection;
