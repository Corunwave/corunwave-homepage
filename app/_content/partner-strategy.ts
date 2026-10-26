export type PartnerStrategyPageContent = {
  title: string;
  description: string;
  keywords: readonly string[];
  openGraphTitle: string;
};

export type CooperationStepTexts = readonly [string, string, string, string];

export type CooperationRoleContent = {
  id: "corunwave" | "sales" | "ax-infra" | "learning";
  /** Shown as the role title; the corunwave row uses it as the logo alt. */
  name: string;
  subName?: string;
  accent: "logo" | "primary" | "cyan" | "lavender";
  /** Same order as `stages`. "\n" is a desktop line break. */
  steps: CooperationStepTexts;
};

export type CooperationModelsContent = {
  title: string;
  /** "\n" is a desktop line break. */
  description: string;
  stages: CooperationStepTexts;
  roles: readonly CooperationRoleContent[];
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

export type PartnershipBenefitContent = {
  id: "scale" | "operation" | "integration" | "resource";
  title: string;
  /** "\n" is a line break kept from Figma. */
  subtitle: string;
  bullets: readonly [string, string];
  /** Temporary Unsplash stock photo exported from Figma. */
  image: string;
};

export type PartnershipBenefitsContent = {
  title: string;
  benefits: readonly PartnershipBenefitContent[];
};

export type ToBeStageContent = {
  id: "short" | "mid" | "long";
  term: string;
  title: string;
  /** "\n" is a desktop line break. */
  description: string;
};

export type ToBeStrategyContent = {
  title: string;
  stages: readonly [ToBeStageContent, ToBeStageContent, ToBeStageContent];
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
  description:
    "코런웨이브는 각 분야 전문가를 모십니다.\n투명한 협업 절차에 따라 새로운 비즈니스 가치를 창출하고 함께 성장할 수 있는 협력모델을 제안합니다.",
  stages: ["기회 발굴", "전략 및 제안", "구축 및 수행", "성과 공유"],
  roles: [
    {
      id: "corunwave",
      name: "코런웨이브",
      accent: "logo",
      steps: [
        "사업 타당성 검토 및\n제안 컨소시엄 구성",
        "제안서 준비 리딩,\nTCO 분석 및 비즈니스 모델링",
        "프로젝트 리딩, 운영 행정,\n품질 보증(QA), 학습자 관리",
        "투명한 프로젝트 성과 평가,\n공유 및 레퍼런스 공동 자산화",
      ],
    },
    {
      id: "sales",
      name: "Sales 파트너",
      subName: "(Infra 및 Learning 영역)",
      accent: "primary",
      steps: [
        "네트워크 활용 고객발굴 및 확보(Infra 및 Learning 서비스 영역)",
        "고객사 핵심 이해관계자 분석 및 의사결정 지원",
        "프로젝트 진척 관리 모니터링 및 고객 소통",
        "고객 만족도 관리 및\n추가 사업 기회 확보",
      ],
    },
    {
      id: "ax-infra",
      name: "AX Infra 파트너",
      accent: "cyan",
      steps: [
        "기술 트렌드 기반 인프라 도입\n니즈 파악 및 공유",
        "H/W·S/W 사이징 및\n하드웨어 / AI솔루션\n아키텍처 설계",
        "인프라 구축 및 기술 지원",
        "기술 고도화 제안 및\n유지보수 파이프라인 확보",
      ],
    },
    {
      id: "learning",
      name: "Learning 파트너",
      accent: "lavender",
      steps: [
        "기술 트렌드 기반 고객 대상별\n인재 육성 니즈 파악 및 공유",
        "커리큘럼 기획, 설계 및 영역별\n전문가 매칭",
        "강의 구성 및 콘텐츠 제작,\n성과평가 지표",
        "성과 분석 및 교육 데이터\n기반 차기 교육 로드맵 제안",
      ],
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

export const partnershipBenefits: PartnershipBenefitsContent = {
  title: "파트너십 기대효과",
  benefits: [
    {
      id: "scale",
      title: "비즈니스 규모의 확장",
      subtitle:
        "단절 없는 인프라와 검증된 러닝 솔루션의 결합으로 시장 지배력을 전방위로 확장합니다",
      bullets: [
        "파트너십을 통해 인프라 구축부터 인재 역량 강화까지 커버리지 영역을 즉시 확장합니다.",
        "신규 시장 진입 장벽을 낮추고 신속한 시장 침투로 양사의 비즈니스 스케일업을 가속화합니다.",
      ],
      image: "/images/partner/benefits/scale.jpg",
    },
    {
      id: "operation",
      title: "운영 탁월성 확보",
      subtitle:
        "표준화된 AX 인프라와 리딩 커리큘럼으로 운영 공백 없는 완벽한 실행력을 구현합니다",
      bullets: [
        "축적된 AX 인프라 운영 노하우와 커스텀 학습 프로세스를 결합하여 운영 리스크를 최소화합니다.",
        "리소스 투입 대비 최상의 실행 속도와 안정적인 품질을 동시에 확보합니다.",
      ],
      image: "/images/partner/benefits/operation.jpg",
    },
    {
      id: "integration",
      title: "통합 솔루션의 완성",
      subtitle:
        "인프라 구성부터 기술역량까지 단 하나의 패키지로 완결되는\nAX Transformation을 제공합니다",
      bullets: [
        "하드웨어·소프트웨어 인프라 구성부터 실무 적용을 위한 AX 학습 체계까지 원스톱(One-stop)으로 제공합니다.",
        "고객에게 파편화되지 않은 최고의 통합 사용자 경험(UX)과 명확한 ROI를 제시합니다",
      ],
      image: "/images/partner/benefits/integration.jpg",
    },
    {
      id: "resource",
      title: "전략적 자원 최적화",
      subtitle:
        "핵심 역량 집중과 시너지 창출로 투자 효율성과 비즈니스 경쟁력을 극대화합니다",
      bullets: [
        "각 사의 독보적인 강점에 집중함으로써 중복 투자와 기술 개발 시간을 획기적으로 줄입니다.",
        "최적화된 자원 배분으로 더 높은 시장 경쟁력과 지속 가능한 성장 동력을 확보합니다.",
      ],
      image: "/images/partner/benefits/resource.jpg",
    },
  ],
};

export const toBeStrategy: ToBeStrategyContent = {
  title: "파트너십 성공을 위한 To-be 전략",
  stages: [
    {
      id: "short",
      term: "short-term",
      title: "레퍼런스 공유 및 공동 수주",
      description:
        "파트너의 기존 레퍼런스를\n코런웨이브의 기획력으로 재구성하여\n신규 시장을 공동 개척합니다.",
    },
    {
      id: "mid",
      term: "mid-term",
      title: "서비스 표준화 및 패키징",
      description:
        "개별 프로젝트 단위의 협업을 넘어\n공동의 서비스를 개발하여\n시장 지배력을 높입니다.",
    },
    {
      id: "long",
      term: "long-term",
      title: "비즈니스 생태계 완성",
      description:
        "협업 파트너와 비즈니스 목표를 설정하고\n공동의 사업 제안 및 성과를 나누는\n선순환 구조를 완성합니다.",
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
