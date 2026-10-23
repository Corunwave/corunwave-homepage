"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import type { DownloadsContent } from "../../_content/home";
import LinkButton from "../commons/buttons/LinkButton";

type DownloadsSectionProps = { content: DownloadsContent };

const DownloadsSection = ({ content }: DownloadsSectionProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) {
      card.dataset.reveal = "visible";
      return;
    }

    card.dataset.reveal = "pending";
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          card.dataset.reveal = "visible";
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -8%" },
    );
    observer.observe(card);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="downloads"
      className="downloads-section"
      aria-labelledby="downloads-title"
    >
      <div className="downloads-inner">
        <div ref={cardRef} className="downloads-card">
          <div className="downloads-graphic" aria-hidden="true">
            <Image
              className="downloads-graphic__image"
              src="/images/downloads/corunwave-downloads-icon.png"
              alt=""
              fill
              sizes="(width <= 760px) 76vw, 39vw"
            />
          </div>
          <h2 id="downloads-title" className="downloads-title">
            {content.title}
          </h2>
          <p className="downloads-description">
            {content.description}
          </p>
          <div className="downloads-actions">
            {content.items.map(({ href, label }) => (
              <LinkButton
                key={href}
                href={href}
                className="download-button"
                prefetch={false}
                download
              >
                {label}
                <span aria-hidden="true">↓</span>
              </LinkButton>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DownloadsSection;
