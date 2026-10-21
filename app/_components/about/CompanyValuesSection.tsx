"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

interface CompanyValue {
  id: "cooperation" | "run" | "wave";
  en: string;
  ko: string;
  description: string;
  image: string;
}

const COMPANY_VALUES: CompanyValue[] = [
  {
    id: "cooperation",
    en: "Cooperation",
    ko: "협업",
    description:
      "모든 고객 및 파트너, 직원과 열린 소통으로 협력(Cooperation)하는 기업",
    image: "/images/values/cooperation-3d.png",
  },
  {
    id: "run",
    en: "Run",
    ko: "실행",
    description:
      "고객의 니즈를 파악하고 협업을 통해 실행(Run)하는 역동적인 조직",
    image: "/images/values/run-3d.png",
  },
  {
    id: "wave",
    en: "Wave",
    ko: "확산",
    description:
      "지속가능한 성장 모멘텀을 고객과 사회에 공유하고 확산(Wave)하여 상생하는 기업",
    image: "/images/values/wave-3d.png",
  },
];

/* Company values "CoRunWave = Cooperation + Run + Wave" (preview .company-values-section; Figma 662:20146 / 662:20180). Client component only for the scroll reveal. */
const CompanyValuesSection = () => {
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
            <span className="values-keep">CoRunWave =</span>{" "}
            <span className="values-keep">Cooperation + Run + Wave</span>
          </h2>
          <p className="values-intro">
            기술과 사람을 연결하는 서비스를 만듭니다.
          </p>
        </header>

        <ul ref={cardsRef} className="values-cards">
          {COMPANY_VALUES.map(({ id, en, ko, description, image }) => (
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
              <p className="value-card__description">{description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default CompanyValuesSection;
