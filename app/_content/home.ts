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
  graphic?: string;
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
    "AX Infra와 Learning Service를 연결해 기술 도입부터\n운영, 인재 육성까지 이어지는 서비스를 제공합니다.",
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
      graphic: "/images/proposal/targets/enterprise-cloud.png",
    },
    {
      modifier: "public",
      tags: "#공공 #정부기관",
      title: "AI 인프라 구축과\n디지털 인재 양성",
      description: "국가 DX 전략 사업 · AI 인프라 구축 · 디지털 인재 양성 사업",
      graphic: "/images/proposal/targets/public-ai-infra.png",
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
      graphic: "/images/proposal/targets/startup-ai-chip.png",
    },
  ],
  explanation: {
    title: "기술과 사람을\n연결하는 서비스",
    description:
      "고객의 복잡한 난제를 해결하기 위한 가장 적합한 전문가와 솔루션을 연결하고 상생협력을 조율하는 비즈니스 허브",
    link: { label: "자세히보기", href: "/partner-strategy" },
  },
};

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
