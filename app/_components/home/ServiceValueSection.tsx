"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";

type ServiceValueId = "trust" | "insight" | "partnership";

interface ServiceValue {
  id: ServiceValueId;
  word: string;
  title: string;
  description: string;
  image: string;
}

const SERVICE_VALUES: ServiceValue[] = [
  {
    id: "trust",
    word: "TRUST",
    title: "신뢰",
    description:
      "신뢰는 서비스 결과로 증명되고 고객 만족으로 완성됩니다. 약속은 반드시 지키고 과정은 투명하게 공개하는 것, 이것이 “코런웨이브”가 흔들림 없이 고객신뢰를 쌓아가는 단 하나의 원칙입니다.",
    image: "/images/service-values/service-trust-3d.png",
  },
  {
    id: "insight",
    word: "INSIGHT",
    title: "통찰",
    description:
      "진정한 통찰은 깊은 공감에서 시작됩니다. 고객의 상황을 이해하고 비즈니스 환경을 면밀하게 분석하여 남들이 보지 못한 성장의 기회를 발굴함으로써 가장 확실한 성공 솔루션을 제공합니다.",
    image: "/images/service-values/service-insight-3d.png",
  },
  {
    id: "partnership",
    word: "PARTNERSHIP",
    title: "동행",
    description:
      "비즈니스는 관계의 연속입니다. 고객과 함께 관계를 발전시키고 이어가는 것, 지속 가능한 협력 로드맵을 통해 동반성장의 가치를 현실화 하는 상생파트너로 고객과 함께 하겠습니다.",
    image: "/images/service-values/service-partnership-3d.png",
  },
];

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

const ServiceValueSection = () => {
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
        SERVICE_VALUES.length - 1,
        Math.floor(progress * SERVICE_VALUES.length),
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
  }, [reducedMotion]);

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
              서비스 가치
            </h2>
            <p className="service-values-intro">
              코런웨이브는 전문가와의 협업과 고객 중심의 소통으로 비즈니스
              가치를 함께 만듭니다.
            </p>
          </header>

          <ol className="service-values-list">
            {SERVICE_VALUES.map(({ id, word, title, description, image }, index) => (
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
                  <p className="service-value__description">{description}</p>
                </article>
              </li>
            ))}
          </ol>

          <div className="service-values-dots" aria-hidden="true">
            {SERVICE_VALUES.map(({ id }, index) => (
              <span key={id} data-active={index === activeIndex} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceValueSection;
