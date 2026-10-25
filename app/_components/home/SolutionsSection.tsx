"use client";

import { MouseEvent, ReactNode, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

type SolutionId = "ax-infra" | "learning";

interface ProcessStage {
  name: string;
  ax: ReactNode;
  learning: ReactNode;
}

interface Solution {
  id: SolutionId;
  title: ReactNode;
  image: string;
  description?: string;
  items: ReactNode[];
}

const LEARNING_LABEL = (
  <>
    Learning Service&nbsp;&amp;
    <wbr /> BPO
  </>
);

/* Table labels break at "&" so the two tracks read as separate items. */
const AX_TRACK_LABEL = (
  <>
    AX Infra&nbsp;&amp;
    <br />
    IT Outsourcing
  </>
);

const LEARNING_TRACK_LABEL = (
  <>
    Learning Service&nbsp;&amp;
    <br />
    BPO
  </>
);

const PROCESS_STAGES: ProcessStage[] = [
  {
    name: "기획",
    ax: (
      <>
        비즈니스·인프라 진단
        <br />
        기술 로드맵
      </>
    ),
    learning: (
      <>
        조직·직무 역량 진단
        <br />
        교육 로드맵
      </>
    ),
  },
  {
    name: "설계",
    ax: (
      <>
        아키텍처와
        <br />
        보안·운영 체계 설계
      </>
    ),
    learning: (
      <>
        과정·학습 방법론과
        <br />
        성과지표 설계
      </>
    ),
  },
  {
    name: "구축·개발",
    ax: (
      <>
        인프라 구축, 통합,
        <br />
        마이그레이션
      </>
    ),
    learning: (
      <>
        콘텐츠 개발
        <br />
        PBL·실습 환경 구축
      </>
    ),
  },
  {
    name: "운영",
    ax: (
      <>
        AIOps, 유지관리
        <br />
        Managed ITO
      </>
    ),
    learning: (
      <>
        교육 운영, 학습자 관리
        <br />
        Learning BPO
      </>
    ),
  },
];

const SOLUTIONS: Solution[] = [
  {
    id: "ax-infra",
    title: AX_TRACK_LABEL,
    image: "/images/solution/ax-infra-card.jpg",
    items: [
      "• 맞춤형 AX 인프라 제공",
      "• 고객의 기술 내재화 실현",
      "• 유연한 아키텍처 설계",
      "• AX 챌린지 해소",
      "• 검증 중심의 서비스",
      "• 엔터프라이즈 페이스메이커",
    ],
  },
  {
    id: "learning",
    title: LEARNING_LABEL,
    image: "/images/solution/learning-card.jpg",
    description: "기술 트렌드를 반영한 전략적 인재양성 파트너",
    items: [
      "• 교육 기획 및 컨설팅",
      "• 역량 중심 콘텐츠 개발",
      "• 맞춤형 학습 방법론",
      "• 교육 운영 및 Learning BPO",
    ],
  },
];

const readMobileQuery = () => {
  const breakpoint = getComputedStyle(document.documentElement)
    .getPropertyValue("--header-mobile-breakpoint")
    .trim();
  return window.matchMedia(`(max-width: ${breakpoint || "760px"})`);
};

const SolutionsSection = () => {
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
            통합 End-to-End 서비스
          </h2>
          <p className="solutions-description">
            AX Infra와 Learning Service를 하나의 과정으로 연결해 기술 운영과
            조직의 역량 개발을 함께 지원합니다.
          </p>
        </header>

        <div
          ref={processRef}
          className="solutions-process"
          aria-label="통합 End-to-End 서비스 단계"
        >
          <div className="solutions-process__desktop">
            <div />
            {PROCESS_STAGES.map(({ name }) => (
              <div key={name} className="solutions-process__stage-head">
                <span>{name}</span>
              </div>
            ))}
            <div className="solutions-process__track-label">
              {AX_TRACK_LABEL}
            </div>
            {PROCESS_STAGES.map(({ name, ax }) => (
              <div key={name} className="solutions-process__track-cell">
                {ax}
              </div>
            ))}
            <div className="solutions-process__track-label solutions-process__track-label--last">
              {LEARNING_TRACK_LABEL}
            </div>
            {PROCESS_STAGES.map(({ name, learning }) => (
              <div
                key={name}
                className="solutions-process__track-cell solutions-process__track-cell--last"
              >
                {learning}
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
            {PROCESS_STAGES.map(({ name, ax, learning }) => (
              <article key={name} className="solutions-process__stage">
                <h3>{name}</h3>
                <p>
                  <strong>{AX_TRACK_LABEL}</strong>
                  <br />
                  {ax}
                </p>
                <p>
                  <strong>{LEARNING_TRACK_LABEL}</strong>
                  <br />
                  {learning}
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
          {SOLUTIONS.map(({ id, title, image, description, items }) => {
            const active = activeId === id;
            return (
              <Link
                key={id}
                href={`/solutions?tab=${id}`}
                className="solution-card"
                data-active={active}
                onMouseEnter={() => handleEnter(id)}
                onMouseLeave={handleLeave}
                onFocus={() => handleEnter(id)}
                onBlur={handleLeave}
                onClick={(event) => handleClick(event, id)}
              >
                <Image
                  className="solution-card__image"
                  src={image}
                  alt=""
                  aria-hidden="true"
                  fill
                  sizes="(max-width: 760px) 100vw, 616px"
                />
                <span className="solution-card__content">
                  <span className="solution-card__meta" aria-hidden="true">
                    {active ? "↗" : "+"}
                  </span>
                  <span className="solution-card__summary">
                    <span className="solution-card__title">{title}</span>
                    <span className="solution-card__panel">
                      {description && (
                        <span className="solution-card__description">
                          {description}
                        </span>
                      )}
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
