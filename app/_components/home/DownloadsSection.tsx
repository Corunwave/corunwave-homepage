"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import LinkButton from "../commons/buttons/LinkButton";

interface DownloadItem {
  href: string;
  label: string;
}

const DOWNLOADS: DownloadItem[] = [
  {
    href: "/downloads/corunwave-company-profile.pdf",
    label: "회사소개서 PDF 다운로드",
  },
  {
    href: "/downloads/corunwave-portfolio.pdf",
    label: "포트폴리오 PDF 다운로드",
  },
];

const DownloadsSection = () => {
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
            코런웨이브의 자료를 확인하세요
          </h2>
          <p className="downloads-description">
            회사소개서와 포트폴리오를 PDF로 다운로드할 수 있습니다.
          </p>
          <div className="downloads-actions">
            {DOWNLOADS.map(({ href, label }) => (
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
