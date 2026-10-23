type ProcessStage = {
  name: string;
  /** 코런웨이브 / Sales / AX Infra / Learning 파트너 순서 */
  roles: [string, string, string, string];
};

const ROLE_NAMES = [
  "코런웨이브",
  "Sales 파트너",
  "AX Infra 파트너",
  "Learning 파트너",
];

const PROCESS_STAGES: ProcessStage[] = [
  {
    name: "기회발굴",
    roles: [
      "사업 타당성 검토 및 컨소시엄 구성",
      "네트워크 활용 고객발굴 및 확보",
      "인프라 도입 니즈 및 기술 트렌드 정보 공유",
      "기업 교육 트렌드 및 인재 육성 니즈 공유",
    ],
  },
  {
    name: "전략 및 제안",
    roles: [
      "제안서 총괄 작성, TCO 분석 및 비즈니스 모델링",
      "고객사 핵심 이해관계자 분석 및 의사결정 지원",
      "H/W·S/W 사이징, 하드웨어/AI솔루션 아키텍처 설계",
      "커리큘럼 설계, SME(전문가) 매칭",
    ],
  },
  {
    name: "구축 및 수행",
    roles: [
      "전체 PM, 운영 행정, 품질 보증(QA)",
      "프로젝트 진척 관리 보조 및 고객 소통 창구",
      "인프라 설치, 클라우드 마이그레이션, 기술 지원",
      "강의 진행, 콘텐츠 제작, 학습자 관리(LXM)",
    ],
  },
  {
    name: "성과 공유",
    roles: [
      "투명한 성과 공유체계정산 및 수익 배분, 공동 레퍼런스 자산화 리포트",
      "고객 만족도 관리 및 차기 사업 기회 확보",
      "기술 고도화 제안 및 유지보수 파이프라인 확보",
      "성과 분석 데이터 기반 차기 교육 로드맵 제안",
    ],
  },
];

/* Collaboration process "협업 프로세스" (preview .partner-flow / .partner-process-step; Figma 876:28731 / 876:29925, states 925:30454~).
 * Static server component: the accordion is native <details> (initially closed, several can stay open) — no client JS. */
const CollaborationProcessSection = () => {
  return (
    <section
      id="partner-process"
      className="partner-section"
      aria-labelledby="partner-process-title"
    >
      <div className="partner-inner">
        <h2 id="partner-process-title" className="partner-heading">
          협업 프로세스
        </h2>

        <ol className="partner-flow" aria-label="협업 프로세스 단계">
          {PROCESS_STAGES.map(({ name }) => (
            <li key={name} className="partner-flow__stage">
              {name}
            </li>
          ))}
        </ol>

        <div className="partner-process-list">
          {PROCESS_STAGES.map(({ name, roles }) => (
            <details key={name} className="partner-process-step">
              <summary className="partner-process-step__summary">
                {name}
              </summary>
              <div className="partner-process-step__body">
                <div className="partner-role-grid">
                  {ROLE_NAMES.map((role, index) => (
                    <div key={role} className="partner-role">
                      <h4 className="partner-role__name">{role}</h4>
                      <p className="partner-role__text">{roles[index]}</p>
                    </div>
                  ))}
                </div>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CollaborationProcessSection;
