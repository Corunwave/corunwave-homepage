"use client";

import { useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import Image from "next/image";

type CustomerId = "public" | "enterprise" | "startup" | "university";

type CustomerProposal = {
  id: CustomerId;
  label: string;
  description: string;
  image: string;
  offerings: string[];
};

const CUSTOMER_PROPOSALS: CustomerProposal[] = [
  {
    id: "public",
    label: "공공/정부기관",
    description:
      "정책 목표와 운영 환경을 반영한 AI 인프라와 디지털 인재 양성을 함께 제안합니다.",
    image: "/images/partner/public.png",
    offerings: ["국가 DX 전략 사업", "AI 인프라 구축", "디지털 인재 양성 사업"],
  },
  {
    id: "enterprise",
    label: "대기업/중견기업",
    description:
      "전사 DX와 AI 활용을 위해 인프라 변화와 직무별 역량 개발을 같은 로드맵에서 추진합니다.",
    image: "/images/partner/enterprise.png",
    offerings: [
      "전사 DX 전환 컨설팅",
      "프라이빗 클라우드 구축",
      "임직원 맞춤형 DX 교육",
    ],
  },
  {
    id: "startup",
    label: "스타트업/중소기업",
    description:
      "한정된 예산과 인력 안에서 필요한 인프라부터 시작하고 운영과 실무교육을 단계적으로 확장합니다.",
    image: "/images/partner/startup.png",
    offerings: [
      "AI 도입 인프라 매칭",
      "초기 IT 아웃소싱(ITO)",
      "실무 인재 조기 전력화 교육",
    ],
  },
  {
    id: "university",
    label: "대학교",
    description:
      "연구용 AI 인프라와 학과별 실습, PBL·산학협력 프로그램을 하나의 교육·연구 환경으로 구성합니다.",
    image: "/images/partner/university.png",
    offerings: [
      "연구용 AI 인프라(HPC) 구축",
      "재학생 DX 실무 역량 강화 교육",
      "산학 연계 캡스톤 프로젝트",
    ],
  },
];

/* Customer proposals "고객 유형별 제안" (preview .partner-customers; Figma 876:28790 / 876:29988, states 876:30096).
 * Tab state is local (no URL sync); tabs follow the WAI-ARIA tablist pattern with roving tabIndex. */
const CustomerProposalsSection = () => {
  const [activeId, setActiveId] = useState<CustomerId>("public");
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const select = (index: number) => {
    setActiveId(CUSTOMER_PROPOSALS[index].id);
    const tab = tabRefs.current[index];
    tab?.focus();
    tab?.scrollIntoView({ block: "nearest", inline: "nearest" });
  };

  const handleKeyDown = (event: KeyboardEvent, index: number) => {
    const count = CUSTOMER_PROPOSALS.length;
    const next =
      event.key === "ArrowRight"
        ? (index + 1) % count
        : event.key === "ArrowLeft"
          ? (index + count - 1) % count
          : event.key === "Home"
            ? 0
            : event.key === "End"
              ? count - 1
              : null;
    if (next === null) return;
    event.preventDefault();
    select(next);
  };

  return (
    <section
      id="partner-customers"
      className="partner-section partner-section--customers"
      aria-labelledby="partner-customers-title"
    >
      <div className="partner-inner">
        <h2 id="partner-customers-title" className="partner-heading">
          고객 유형별 제안
        </h2>

        <div
          className="partner-tabs"
          role="tablist"
          aria-labelledby="partner-customers-title"
        >
          {CUSTOMER_PROPOSALS.map(({ id, label }, index) => (
            <button
              key={id}
              ref={(node) => {
                tabRefs.current[index] = node;
              }}
              type="button"
              role="tab"
              id={`partner-tab-${id}`}
              className="partner-tab"
              aria-selected={id === activeId}
              aria-controls={`partner-panel-${id}`}
              tabIndex={id === activeId ? 0 : -1}
              onClick={() => select(index)}
              onKeyDown={(event) => handleKeyDown(event, index)}
            >
              {label}
            </button>
          ))}
        </div>

        {CUSTOMER_PROPOSALS.map(
          ({ id, label, description, image, offerings }) => (
            <div
              key={id}
              role="tabpanel"
              id={`partner-panel-${id}`}
              className="partner-customer-panel"
              aria-labelledby={`partner-tab-${id}`}
              tabIndex={0}
              hidden={id !== activeId}
            >
              <div
                className={`partner-customer-intro partner-customer-intro--${id}`}
              >
                <h3 className="partner-customer-intro__title">{label}</h3>
                <p className="partner-customer-intro__description">
                  {description}
                </p>
                <Image
                  className="partner-customer-intro__image"
                  src={image}
                  alt=""
                  aria-hidden="true"
                  width={1024}
                  height={1024}
                  sizes="(max-width: 1024px) 210px, 240px"
                />
              </div>
              <ol className="partner-offerings">
                {offerings.map((offering) => (
                  <li key={offering}>
                    <h4 className="partner-offerings__title">{offering}</h4>
                  </li>
                ))}
              </ol>
            </div>
          ),
        )}
      </div>
    </section>
  );
};

export default CustomerProposalsSection;
