export type PartnerStrategyPageContent = {
  title: string;
  description: string;
  keywords: readonly string[];
  openGraphTitle: string;
};

export type CooperationModelContent = {
  title: string;
  image: string;
  description: string;
};

export type CooperationModelsContent = {
  title: string;
  models: readonly CooperationModelContent[];
};

export type CustomerProposalContent = {
  id: "public" | "enterprise" | "startup" | "university";
  label: string;
  description: string;
  image: string;
  offerings: readonly string[];
};

export type CustomerProposalsContent = {
  title: string;
  proposals: readonly CustomerProposalContent[];
};

export type ProcessStageContent = {
  name: string;
  /** Same order as `roleNames`. */
  roles: readonly [string, string, string, string];
};

export type CollaborationProcessContent = {
  title: string;
  flowLabel: string;
  roleNames: readonly [string, string, string, string];
  stages: readonly ProcessStageContent[];
};

export type PartnershipBenefitsContent = {
  title: string;
  benefits: readonly { title: string; english: string }[];
  strategyHeading: string;
  strategies: readonly {
    term: string;
    title: string;
    description: string;
  }[];
};

export type UniversityProposalContent = {
  label: string;
  title: string;
  link: { label: string; href: string };
  description: string;
};

export type PartnerLogoContent = {
  id: string;
  name: string;
  src: string;
  /** Intrinsic size, so next/image keeps the file's aspect ratio. */
  width: number;
  height: number;
  /** false hides the logo without deleting it. */
  visible: boolean;
};

export type PartnerLogosContent = {
  /** false skips the whole section. */
  enabled: boolean;
  title: string;
  ariaLabel: string;
  logos: readonly PartnerLogoContent[];
};

export const partnerStrategyPage: PartnerStrategyPageContent = {
  title: "파트너 전략",
  description:
    "코런웨이브는 각 분야의 전문가들이 자신의 전문성을 가장 가치있게 발휘할 수 있는 솔루션 허브를 목표로 협업합니다.\n파트너의 독립적 전문성을 존중하며 파트너십을 통해 기술적 한계를 넘고 인적 성장을 통해 비즈니스 연속성을 실현하는 전략적 동반자입니다.",
  keywords: [
    "코런웨이브",
    "파트너 전략",
    "AX Infra",
    "Learning Service",
    "BPO",
    "ITO",
    "협력모델",
  ],
  openGraphTitle: "파트너 전략 · 코런웨이브",
};

export const cooperationModels: CooperationModelsContent = {
  title: "우리가 제안하는 협력모델",
  models: [
  {
    title: "The Orchestrator",
    image: "/images/partner/orchestrator-soft.png",
    description:
      "글로벌 IT 교육 및 인프라 기획 역량을 바탕으로 프로젝트 전체를 설계하고 조율합니다.",
  },
  {
    title: "The Specialist",
    image: "/images/partner/specialist-soft.png",
    description:
      "파트너 여러분은 자신의 핵심 역량(영업, 강의, 콘텐츠 개발, 인프라 구축 등)에만 집중하십시오.",
  },
  {
    title: "Win-Win Growth",
    image: "/images/partner/growth-soft.png",
    description:
      "코런웨이브가 확보한 서비스를 통해 파트너의 전문성이 시장에 안정적으로 공급되도록 지원합니다.",
  },
],
};

export const customerProposals: CustomerProposalsContent = {
  title: "고객 유형별 제안",
  proposals: [
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
],
};

export const collaborationProcess: CollaborationProcessContent = {
  title: "협업 프로세스",
  flowLabel: "협업 프로세스 단계",
  roleNames: [
    "코런웨이브",
    "Sales 파트너",
    "AX Infra 파트너",
    "Learning 파트너",
  ],
  stages: [
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
],
};

export const partnershipBenefits: PartnershipBenefitsContent = {
  title: "파트너십 기대효과",
  benefits: [
  { title: "비즈니스 규모의 확장", english: "Scalability & Reliability" },
  { title: "운영 탁월성 확보", english: "Operational Excellence" },
  { title: "통합 솔루션의 완성", english: "Value Integration" },
  { title: "전략적 자원 최적화", english: "Resource Efficiency" },
],
  strategyHeading: "파트너십 성공을 위한 To-be 전략",
  strategies: [
  {
    term: "short-term",
    title: "레퍼런스 공유 및 공동 수주",
    description:
      "파트너사의 기존 레퍼런스를 코런웨이브의 기획력으로 재포장하여 신규 시장을 공동 개척합니다.",
  },
  {
    term: "mid-term",
    title: "서비스 표준화 및 패키징",
    description:
      "개별 프로젝트 단위의 협업을 넘어 공동 브랜드 상품을 개발하여 시장 지배력을 높입니다.",
  },
  {
    term: "long-term",
    title: "플랫폼 생태계 완성",
    description:
      "협업 파트너들이 자발적으로 기회를 제안하고 성과를 나누는 선순환 구조를 완성합니다.",
  },
],
};

export const universityProposal: UniversityProposalContent = {
  label: "협력 제안",
  title: "대학 맞춤형\nAI Platform",
  link: { label: "문의하기", href: "#" },
  description:
    "AX 인프라 및 Leaning 기업 “코런웨이브(CORUNWAVE)”가 국산 서버, AI컴퓨팅 솔루션 기업인 “엑세스랩(XSLAB)”과 손잡고 대학 교육 및 연구에 최적화된 저전력, 고성능 AI통합솔루션을 제안합니다.",
};

export const partnerLogos: PartnerLogosContent = {
  enabled: true,
  title: "파트너사",
  ariaLabel: "파트너사 로고, 포커스 시 흐름 일시정지",
  logos: [
    {
      id: "paloalto",
      name: "Palo Alto Networks",
      src: "/images/partner/logos/paloalto.svg",
      width: 348,
      height: 65,
      visible: true,
    },
    {
      id: "heygen",
      name: "HeyGen",
      src: "/images/partner/logos/heygen.svg",
      width: 241,
      height: 143,
      visible: true,
    },
    {
      id: "xslab",
      name: "XSLAB(엑세스랩)",
      src: "/images/partner/logos/xslab.png",
      width: 1780,
      height: 303,
      visible: true,
    },
    {
      id: "odoo",
      name: "Odoo",
      src: "/images/partner/logos/odoo.svg",
      width: 919,
      height: 495,
      visible: true,
    },
    {
      id: "ibm",
      name: "IBM",
      src: "/images/partner/logos/ibm.svg",
      width: 1306,
      height: 734,
      visible: true,
    },
  ],
};
