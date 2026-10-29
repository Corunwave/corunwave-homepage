export type HomeHeroContent = {
  title: string;
  description: string;
  cta: { label: string; href: string };
};

export type ProposalCardContent = {
  modifier: "enterprise" | "public" | "university" | "startup";
  tags: string;
  title: string;
  description: string;
};

export type ProposalTargetsContent = {
  title: string;
  description: string;
  cards: readonly ProposalCardContent[];
  explanation: {
    title: string;
    description: string;
    link: { label: string; href: string };
  };
};

export type ServiceValueContent = {
  id: "trust" | "insight" | "partnership";
  word: string;
  title: string;
  description: string;
  image: string;
};

export type ServiceValuesContent = {
  title: string;
  intro: string;
  values: readonly ServiceValueContent[];
};

export type DownloadsContent = {
  title: string;
  description: string;
  items: readonly { href: string; label: string }[];
};

export const homeHero: HomeHeroContent = {
  title: "Innovation Together,\nCreating Waves",
  description:
    "AX Infra와 Learning Service를 연결해 기술 도입부터 운영,\n인재 육성까지 이어지는 서비스를 제공합니다.",
  cta: { label: "솔루션 바로보기", href: "/solutions" },
};

export const proposalTargets: ProposalTargetsContent = {
  title: "AX 전환 원스톱 파트너",
  description:
    "기술 도입에 그치지 않고 교육을 통해 사람이 주도하는 휴먼 인프라 혁신을 지향합니다.",
  cards: [
    {
      modifier: "enterprise",
      tags: "#대기업 #중견기업",
      title: "AX Infra &\nIT Outsourcing",
      description:
        "전사 DX 전환 컨설팅 · 프라이빗 클라우드 구축 · 임직원 맞춤형 DX 교육",
    },
    {
      modifier: "public",
      tags: "#공공 #정부기관",
      title: "AI 인프라 구축·\n디지털 인재 양성",
      description: "국가 DX 전략 사업 · AI 인프라 구축 · 디지털 인재 양성 사업",
    },
    {
      modifier: "university",
      tags: "#대학교 #컴퓨터공학과",
      title: "대학 맞춤형\nAI Platform",
      description: "서버 도입부터 프로그래밍 교육까지",
    },
    {
      modifier: "startup",
      tags: "#스타트업 #중소기업",
      title: "AI 도입부터\n실무 인재 조기 전력화",
      description:
        "AI 도입 인프라 매칭 · 초기 IT 아웃소싱(ITO) · 실무 인재 조기 전력화 교육",
    },
  ],
  explanation: {
    title: "기술과 사람을\n연결하는 서비스",
    description:
      "고객의 복잡한 난제를 해결하기 위한 가장 적합한 전문가와 솔루션을 연결하고 상생협력을 조율하는 [[솔루션 허브]]",
    link: { label: "자세히보기", href: "/partner-strategy" },
  },
};

/* Description breaks are desktop-only; the space before each `\n` keeps words apart once the <br /> is hidden. */
export const serviceValues: ServiceValuesContent = {
  title: "서비스 가치",
  intro:
    "코런웨이브는 전문가와의 협업과 고객 중심의 소통으로 비즈니스 가치를 함께 만듭니다.",
  values: [
    {
      id: "trust",
      word: "TRUST",
      title: "신뢰",
      description:
        "신뢰는 서비스 결과로 증명되고 고객 만족으로 완성됩니다. \n약속은 반드시 지키고 과정은 투명하게 공개하는 것, \n이것이 “코런웨이브”가 흔들림 없이 고객의 신뢰를 쌓아가는 단 하나의 원칙입니다.",
      image: "/images/service-values/service-trust-3d.png",
    },
    {
      id: "insight",
      word: "INSIGHT",
      title: "통찰",
      description:
        "진정한 통찰은 깊은 공감에서 시작됩니다. \n고객의 상황을 이해하고 비즈니스 환경을 면밀하게 분석하여 \n남들이 보지 못한 성장의 기회를 발굴함으로써 \n가장 확실한 성공 솔루션을 제공합니다.",
      image: "/images/service-values/service-insight-3d.png",
    },
    {
      id: "partnership",
      word: "PARTNERSHIP",
      title: "동행",
      description:
        "비즈니스는 관계의 연속입니다. \n고객과 함께 관계를 발전시키고 이어가는 것, 지속 가능한 협력 로드맵을 통해 \n동반성장의 가치를 현실화 하는 상생파트너로 고객과 함께 하겠습니다.",
      image: "/images/service-values/service-partnership-3d.png",
    },
  ],
};

export const downloads: DownloadsContent = {
  title: "코런웨이브의 자료를 확인하세요",
  description: "회사소개서와 포트폴리오를 PDF로 다운로드할 수 있습니다.",
  items: [
    {
      href: "/downloads/corunwave-company-profile.pdf",
      label: "회사소개서 PDF 다운로드",
    },
    {
      href: "/downloads/corunwave-portfolio.pdf",
      label: "포트폴리오 PDF 다운로드",
    },
  ],
};

export type SolutionCardContent = {
  id: "ax-infra" | "learning";
  title: string;
  description: string;
  items: readonly string[];
};

export type ProcessStageContent = {
  name: string;
  ax: string;
  learning: string;
};

export type SolutionsContent = {
  title: string;
  description: string;
  processLabel: string;
  axLabel: string;
  learningLabel: string;
  stages: readonly ProcessStageContent[];
  solutions: readonly SolutionCardContent[];
};

/* Table labels and the AX card title break at "&"; the Learning card title keeps a soft break. */
const AX_LABEL = "AX Infra\u00a0&\nIT Outsourcing";
const LEARNING_LABEL = "Learning Service\u00a0&<wbr> BPO";
const LEARNING_TRACK_LABEL = "Learning Service\u00a0&\nBPO";

export const solutions: SolutionsContent = {
  title: "통합 [[End-to-End]] 서비스",
  description:
    "AX Infra와 Learning Service를 하나의 과정으로 연결해 기술 운영과 조직의 역량 개발을 함께 지원합니다.",
  processLabel: "통합 End-to-End 서비스 단계",
  axLabel: AX_LABEL,
  learningLabel: LEARNING_TRACK_LABEL,
  stages: [
    {
      name: "기획",
      ax: "비즈니스·인프라 진단\n기술 로드맵",
      learning: "조직·직무 역량 진단\n교육 로드맵",
    },
    {
      name: "설계",
      ax: "아키텍처와\n보안·운영 체계 설계",
      learning: "과정·학습 방법론과\n성과지표 설계",
    },
    {
      name: "구축·개발",
      ax: "인프라 구축, 통합,\n마이그레이션",
      learning: "콘텐츠 개발\nPBL·실습 환경 구축",
    },
    {
      name: "운영",
      ax: "AIOps, 유지관리\nManaged ITO",
      learning: "교육 운영, 학습자 관리\nLearning BPO",
    },
  ],
  solutions: [
    {
      id: "ax-infra",
      title: AX_LABEL,
      description:
        "설계부터 책임 운영까지,\n비즈니스 연속성을 완성하는 AX 인프라 파트너",
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
      description: "기술 트렌드를 반영한 전략적 인재양성 파트너",
      items: [
        "• 교육 기획 및 컨설팅",
        "• 역량 중심 콘텐츠 개발",
        "• 맞춤형 학습 방법론",
        "• 교육 운영 및 Learning BPO",
      ],
    },
  ],
};
