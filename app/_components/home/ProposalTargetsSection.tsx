"use client";

import { ReactNode, useEffect, useRef } from "react";
import LinkButton from "../commons/buttons/LinkButton";
import Image from "next/image";

interface ProposalCard {
  modifier: "enterprise" | "public" | "university" | "startup";
  tags: string;
  title: ReactNode;
  description: string;
  graphic?: string;
}

const CARDS: ProposalCard[] = [
  {
    modifier: "enterprise",
    tags: "#대기업 #중견기업",
    title: (
      <>
        AX Infra &amp;
        <br />
        IT Outsourcing
      </>
    ),
    description:
      "전사 DX 전환 컨설팅 · 프라이빗 클라우드 구축 · 임직원 맞춤형 DX 교육",
    graphic: "/images/proposal/targets/enterprise-cloud.png",
  },
  {
    modifier: "public",
    tags: "#공공 #정부기관",
    title: (
      <>
        AI 인프라 구축과
        <br />
        디지털 인재 양성
      </>
    ),
    description: "국가 DX 전략 사업 · AI 인프라 구축 · 디지털 인재 양성 사업",
    graphic: "/images/proposal/targets/public-ai-infra.png",
  },
  {
    modifier: "university",
    tags: "#대학교 #컴퓨터공학과",
    title: (
      <>
        대학 맞춤형
        <br />
        AI Platform
      </>
    ),
    description: "서버 도입부터 프로그래밍 교육까지",
  },
  {
    modifier: "startup",
    tags: "#스타트업 #중소기업",
    title: (
      <>
        AI 도입부터
        <br />
        실무 인재 조기 전력화
      </>
    ),
    description:
      "AI 도입 인프라 매칭 · 초기 IT 아웃소싱(ITO) · 실무 인재 조기 전력화 교육",
    graphic: "/images/proposal/targets/startup-ai-chip.png",
  },
];

const ProposalTargetsSection = () => {
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
            AX 전환 원스톱 파트너
          </h2>
          <p className="proposal-description">
            기술 도입에 그치지 않고 교육을 통해 사람이 주도하는 휴먼 인프라
            혁신을 지향합니다.
          </p>
        </header>
        <div ref={gridRef} className="proposal-grid">
          {CARDS.map(({ modifier, tags, title, description, graphic }) => (
            <article
              key={modifier}
              className={`proposal-card proposal-card--${modifier}`}
            >
              <div className="proposal-card__content">
                <p className="proposal-card__tags">{tags}</p>
                <h3 className="proposal-card__title">{title}</h3>
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
              기술과 사람을
              <br />
              연결하는 서비스
            </h3>
            <p className="proposal-explanation__description">
              고객의 복잡한 난제를 해결하기 위한 가장 적합한 전문가와 솔루션을
              연결하고 상생협력을 조율하는 비즈니스 허브
            </p>
            <LinkButton
              href="/partner-strategy"
              className="proposal-detail-link"
            >
              자세히보기
              <span aria-hidden="true">→</span>
            </LinkButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProposalTargetsSection;
