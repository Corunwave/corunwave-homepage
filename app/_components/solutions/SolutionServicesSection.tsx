"use client";

import { useRef } from "react";
import type { KeyboardEvent, ReactNode } from "react";
import { useSearchParams } from "next/navigation";
import { useScrollReveal } from "../../_hooks/useScrollReveal";

type TabId = "ax-infra" | "learning";

type ServiceItem = {
  title: string;
  subtitle?: string;
  /** 서비스 체계 / 산업적용 체계 / 기대효과 */
  columns: [string, string, string];
};

type ServiceTab = {
  id: TabId;
  label: string;
  intro: ReactNode;
  items: ServiceItem[];
};

const DEFAULT_TAB: TabId = "ax-infra";
const COLUMN_TITLES = ["서비스 체계", "산업적용 체계", "기대효과"];

const SERVICE_TABS: ServiceTab[] = [
  {
    id: "ax-infra",
    label: "AX Infra & IT Outsourcing",
    intro: (
      <>
        AI 도입을 위한 하드웨어 아키텍처 설계부터{" "}
        <br className="solution-services__break" />
        “전문 인력을 통한 선제적 AIOps와 Zero-Trust 보안 기반의 통합 ITO
        서비스”까지 지원하여{" "}
        <br className="solution-services__break" />
        고객이 본질적 성장에 집중할 수 있도록 지원 합니다.
      </>
    ),
    items: [
      {
        title: "최적의 Vendor 솔루션 매칭",
        columns: [
          "고객요구에 최적화된 솔루션 매칭 및 기술규격 실증(PoC)지원",
          "인프라 현대화 및 확장\nPain Point : 노후 장비 성능저하, 유지비용증가\n→ 클라우드 마이그레이션 및 하이브리드 아키텍처 전환",
          "TCO 절감\n워크로드 특성에 최적화된 하드웨어 사이징으로 Capex를 최적화하고 중복 투자를 방지하여 자원 활용률을 극대화",
        ],
      },
      {
        title: "AI기반의 지능형 인프라 고도화",
        columns: [
          "AIOps 기반 선제적 장애 사전 예측 및 워크로드 최적화 시스템 구축",
          "지능형 자율운영 전환\nPain Point : 수동운영에 따른 장애 리스크\n→ AIOps 도입 및 IaC기반 자동화 파이프라인 구축",
          "운영효율\nML 기반의 실시간 이상징후 탐지로 MTTD를 최소화하고 패턴분석을 통한 예방적 유지관리로 인프라 가용성 확보",
        ],
      },
      {
        title: "안정적인 하이브리드 인프라 관리",
        columns: [
          "퍼블릭 클라우드(AWS, Azure, GCP)와 온프레미스의 유기적 통합 및 마이그레이션",
          "안정적 하이브리드\nPain Point : 보안 규제 준수와 클라우드 확장성 간 불균형\n→ 하이브리드 데이터 패브릭 및 통합 운영 거버넌스 최적화",
          "유연성 및 데이터 주권\n중요 데이터는 온프레미스에, 탄력적 워크로드를 클라우드에 분산 배치하여 비즈니스 변화에 유연하게 대응",
        ],
      },
      {
        title: "Zero-Trust 기반 보안 에코시스템",
        columns: [
          "Identity 중심의 '지속적 인증' 기반 제로 트러스트 보안 환경 구축",
          "데이터 보안 및 신뢰 강화\nPain Point : 보안규제 대응 및 내부정보 유출 우려\n→ Zero-Trust 에코시스템 및 AI위협 탐지적용",
          "보안신뢰성 및 비즈니스 연속성\nNIST SP 800-207 기반의 철저한 검증으로 내부 횡적 이동을 원천 차단하여 전방위 보안체계 구축",
        ],
      },
      {
        title: "전략적 IT 아웃소싱",
        subtitle: "(Managed ITO)",
        columns: [
          "전문가 그룹(엔지니어,시스템 관리, 개발인력)지원을 통해 고객의 서비스 공백을 해결하고 안정적인 서비스 운영 및 프로젝트 성과 창출을 보장",
          "비즈니스 성과창출과 서비스 효율화\nPain Point : 운영 숙련도 편차 및 누적된 기술부채로 인한 운영 리스크 증가\n→ 표준화된 운영 프로세스 적용 및 AI 기반 숙련 전문 인력 투입으로 기술 격차 해소",
          "실행력 극대화\n전문 기술 리더십 기반의 SLA(SVC Level Agreement) 준수 및 책임운영을 통해 고객이 핵심 비즈니스에 집중할 수 있는 환경 제공",
        ],
      },
    ],
  },
  {
    id: "learning",
    label: "Learning Service & BPO",
    intro:
      "단순한 지식 전달을 넘어 최신 기술과 사람을 연결하여 기업의 실질적인 디지털 전환(DX)을 이끄는 기술중심 교육서비스를 제공합니다. 현장에서 검증된 학습 방법론을 바탕으로 고객의 비즈니스 성장을 가속화할 최적의 인재육성 방안을 제시합니다.",
    items: [
      {
        title: "교육기획 및 컨설팅",
        subtitle: "(성과중심 교육기획)",
        columns: [
          "Global Standard 활용\n전략분석 및 니즈 분석\n성과측정 지표 설계 및 교육 로드맵 수립(AI기반 Skill Inventory)",
          "Pain Point: 교육내용과 실무 성과 간의 불일치로 인한 교육 투자 효율 저하 및 비즈니스 성과와의 단절\n→ 산업별 특화 직무 역량 재정립 및 역량 Gap 분석 기반의 체계적 교육 전략 수립",
          "성과 중심 교육 체계 확보:\n교육 투자 대비 실질적 비즈니스 ROI 실현 및 전략적 인재 육성 기반 마련",
        ],
      },
      {
        title: "역량중심 맞춤형 콘텐츠 개발",
        subtitle: "(고품질 실전 콘텐츠)",
        columns: [
          "Customized Design\n직무별 역량과정 설계\nSME 협업 기반의 맞춤형 콘텐츠 개발",
          "Pain Point: 최신 기술 트렌드와 현업 요구사항을 반영하지 못하는 정체된 이론 위주의 교육\n→ 기술전문가 협업을 통한 실무 시나리오 개발 및 조직의 실무 지식을 검증하는 애자일 커리큘럼 개발",
          "조직 실무 지식 자산화:\n교육 내용의 즉각적인 현업 적용을 통한 기술 격차 해소 및 신규 인력의 조기 전력화 기틀 마련",
        ],
      },
      {
        title: "맞춤형 학습 방법론",
        columns: [
          "Hybrid Learning\n고객 최적화 다양한 학습방법 제공\n온/오프라인, Blended\n현업사례 기반 PBL 제공",
          "Pain Point: 획일적 교육방식에 따른 학습 몰입도 저하 및 고객업무환경과의 충돌\n→ 조직의 규모와 환경에 최적화된 맞춤형 학습 환경 및 실전 역량 확보를 위한 문제 해결형 설계",
          "학습효율 최적화 및 성과 가속화:\n상황 맞춤형 학습제공으로 이탈방지 및 현업 문제해결 역량 확보",
        ],
      },
      {
        title: "차별화된 교육운영 서비스",
        subtitle: "(Learning BPO)",
        columns: [
          "Operational Excellence\n인프라(LMS/CMS)구축\n프로세스 위탁 및 최적화 등 SLA 기반의 토털 러닝(MSP)체계 수립\n데이터기반 지능형 운영",
          "Pain Point: 운영 인력 부족 및 성과 분석 미흡\n→ 대기업, 공공기관 등 대상별 규모별 맞춤형 운영 설계 및 데이터 기반의 전문 운영 서비스 제공\n→ 표준운영절차 적용으로 서비스 일관성, 안정성 확보",
          "운영 효율성 및 품질 향상:\n운영업무 부담 제거 및 데이터 기반 성과 분석을 통한 교육품질 확보\n→ 반복적 행정업무 제거로 인적자원의 효율적 배치와 업무효율 향상\n→ 고객 담당자 변경과 상관없이 표준운영 프로토콜 확립",
        ],
      },
    ],
  },
];

const isTabId = (value: string | null): value is TabId =>
  SERVICE_TABS.some(({ id }) => id === value);

type SolutionServicesProps = {
  activeId: TabId;
  onSelect?: (id: TabId) => void;
};

const SolutionServices = ({ activeId, onSelect }: SolutionServicesProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  useScrollReveal(sectionRef);

  const select = (index: number) => {
    const tab = SERVICE_TABS[index];
    onSelect?.(tab.id);
    tabRefs.current[index]?.focus();
  };

  const handleKeyDown = (event: KeyboardEvent, index: number) => {
    const last = SERVICE_TABS.length - 1;
    const next =
      event.key === "ArrowRight"
        ? (index + 1) % SERVICE_TABS.length
        : event.key === "ArrowLeft"
          ? (index + last) % SERVICE_TABS.length
          : event.key === "Home"
            ? 0
            : event.key === "End"
              ? last
              : null;
    if (next === null) return;
    event.preventDefault();
    select(next);
  };

  return (
    <section
      ref={sectionRef}
      id="solution-services"
      className="solution-services"
      aria-labelledby="solution-services-title"
    >
      <div className="solution-services__inner">
        <h2
          id="solution-services-title"
          className="solution-heading"
          data-reveal-item
        >
          솔루션 상세
        </h2>

        <div
          className="solution-tabs"
          role="tablist"
          aria-labelledby="solution-services-title"
          data-reveal-item
        >
          {SERVICE_TABS.map(({ id, label }, index) => (
            <button
              key={id}
              ref={(node) => {
                tabRefs.current[index] = node;
              }}
              type="button"
              role="tab"
              id={`solution-tab-${id}`}
              className="solution-tab"
              aria-selected={id === activeId}
              aria-controls={`solution-panel-${id}`}
              tabIndex={id === activeId ? 0 : -1}
              onClick={() => select(index)}
              onKeyDown={(event) => handleKeyDown(event, index)}
            >
              {label}
            </button>
          ))}
        </div>

        {SERVICE_TABS.map(({ id, intro, items }) => (
          <div
            key={id}
            role="tabpanel"
            id={`solution-panel-${id}`}
            className="solution-panel"
            aria-labelledby={`solution-tab-${id}`}
            hidden={id !== activeId}
          >
            <p className="solution-panel__intro" data-reveal-item>
              {intro}
            </p>
            <div className="solution-service-list">
              {items.map(({ title, subtitle, columns }) => (
                <details key={title} className="solution-service" data-reveal-item>
                  <summary className="solution-service__summary">
                    <h3 className="solution-service__title">
                      {title}
                      {subtitle && (
                        <>
                          {" "}
                          <span className="solution-service__subtitle">
                            {subtitle}
                          </span>
                        </>
                      )}
                    </h3>
                    <span
                      className="solution-service__toggle"
                      aria-hidden="true"
                    />
                  </summary>
                  <div className="solution-service__body">
                    {columns.map((text, columnIndex) => (
                      <section
                        key={COLUMN_TITLES[columnIndex]}
                        className="solution-service__column"
                      >
                        <h4 className="solution-service__column-title">
                          {COLUMN_TITLES[columnIndex]}
                        </h4>
                        <p className="solution-service__column-text">{text}</p>
                      </section>
                    ))}
                  </div>
                </details>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

/* Suspense fallback: same markup with the default tab, so the prerendered shell is complete. */
export const SolutionServicesFallback = () => (
  <SolutionServices activeId={DEFAULT_TAB} />
);

/* Solution services "솔루션 상세" (preview .solution-services; Figma 847:27561 / 847:28662).
 * Tab state lives in `?tab=` so the home cards can deep-link; history.replaceState is synced with useSearchParams by Next.
 * The accordion is native <details>. */
const SolutionServicesSection = () => {
  const tabParam = useSearchParams().get("tab");
  const activeId = isTabId(tabParam) ? tabParam : DEFAULT_TAB;

  const handleSelect = (id: TabId) => {
    window.history.replaceState(null, "", `?tab=${id}`);
  };

  return <SolutionServices activeId={activeId} onSelect={handleSelect} />;
};

export default SolutionServicesSection;
