export type AboutPageContent = {
  title: string;
  description: string;
};

export type CeoMessageContent = {
  title: string;
  paragraphs: readonly string[];
  role: string;
  name: string;
};

export type BusinessDirectionContent = {
  /** Each inner array is one title line; phrases never break internally. */
  titleLines: readonly (readonly string[])[];
  descriptionLead: string;
  descriptionEmphasis: string;
  descriptionTail: string;
  hubLogo: { src: string; width: number; height: number; alt: string };
  values: readonly { title: string; body: string }[];
};

export type ChallengeContent = {
  id: "internalization" | "orchestration" | "continuity";
  title: string;
  body: string;
  image: string;
};

export type CoreChallengesContent = {
  title: string;
  navLabel: string;
  challenges: readonly ChallengeContent[];
};

export type CompanyValueContent = {
  id: "cooperation" | "run" | "wave";
  en: string;
  ko: string;
  description: string;
  image: string;
};

export type CompanyValuesContent = {
  titleLines: readonly string[];
  intro: string;
  values: readonly CompanyValueContent[];
};

export const aboutPage: AboutPageContent = {
  title: "회사 소개",
  description: "코런웨이브는 “기술과 사람을 연결하는 서비스”를 제공합니다.",
};

export const ceoMessage: CeoMessageContent = {
  title: "드리는 말씀",
  paragraphs: [
    "안녕하십니까,",
    "AX 인프라 구축부터 기술의 조직 내재화까지 급변하는 기술전환 시대의 비즈니스 과제는 단일 솔루션만으로 해결되지 않습니다.\n이제 기업들의 핵심 화두는 “어떻게 최신 기술을 사람의 역량으로 내재화하고 이를 안정적인 인프라로 뒷받침할 것인가”로 집약됩니다.",
    "코런웨이브는 현업 일선에서 쌓아온 IT 서비스 및 교육 서비스 경험을 통해 기업 성장의 동력은 사람과 조직, 그리고 검증된 파트너와의 [[“긴밀한 협력(Cooperation)”]]에 있음을 확신합니다.",
    "유연함과 민첩성을 강점으로 특정 레퍼런스나 솔루션에 얽매이지 않고 고객의 문제를 해결할 수 있는 전문가와 솔루션을 연결하는 [[“비즈니스 허브(Business Hub)”]] 역할을 수행하고자 합니다.\n현장에서 체득한 통찰력을 바탕으로 기술이 사람의 가능성을 확장하고 비즈니스 시너지를 극대화하는 해답을 고객 및 파트너 여러분과 함께 설계하고 실행해 나가겠습니다.",
    "코런웨이브가 추구하는 비즈니스 여정은 단순히 서비스를 제공하는 공급자를 넘어 고객과 함께 달리는(Run) 페이스메이커이자 조직의 변화를 이끄는 작은 물결(Wave)의 시작점이 되겠습니다.\n코런웨이브의 전문성이 고객의 가능성과 만날 때 일어날 혁신적인 변화, 그 여정에 여러분을 초대합니다.",
  ],
  role: "코런웨이브(주) 대표이사",
  name: "윤준용",
};

export const businessDirection: BusinessDirectionContent = {
  titleLines: [
    ["고객과 함께", "기술과 사람의", "선순환을 이끄는"],
    ["지능형 AX", "오케스트레이터"],
  ],
  descriptionLead:
    "단순한 서비스 공급자가 아닌 기술과 교육을 융합하고 전문가 네트워크를 연결해 시장의 격차를 해소하는",
  descriptionEmphasis: "“솔루션 허브”",
  descriptionTail: " 가 되겠습니다",
  hubLogo: {
    src: "/images/logos/corunwave-ko-en-color.png",
    width: 120,
    height: 40,
    alt: "코런웨이브",
  },
  /* Value body breaks are hidden on mobile; the space before each `\n` keeps words apart there. */
  values: [
    {
      title: "Human-Centric Tech",
      body: "기술 도입에 그치지 않고 교육을 통해 \n사람이 주도하는 [[휴먼 인프라 혁신을]] 지향합니다.",
    },
    {
      title: "Integrated Value",
      body: "인프라 설계부터 운영과 조달, 인재 육성에 이르기까지 \n[[단절 없는]] [[End-to-End 서비스 가치를]] 창출합니다.",
    },
    {
      title: "Sustainable Growth",
      body: "각 분야 전문가와의 협업을 통해 급변하는 트렌드에 \n가장 민첩하게 대응하며 [[고객과 동반 성장하겠습니다.]]",
    },
  ],
};

export const coreChallenges: CoreChallengesContent = {
  title: "코런웨이브가 해결하고자 하는 핵심과제",
  navLabel: "핵심과제 항목 선택",
  challenges: [
    {
      id: "internalization",
      title: "기술 내재화의 공백",
      body: "현업에 필요한 역량과 현재 역량의 차이를 진단(TNA)하고, 부족한 역량에 맞춰 인프라와 교육을 설계해 현장 문제를 해결하는 실습(PBL)으로 연결합니다.\n실무 역량을 높여 기술과 인재의 격차를 줄이고, 기술 도입 리스크를 최소화합니다.",
      image: "/images/company/challenge-abstract-internalization.jpg",
    },
    {
      id: "orchestration",
      title: "전략적 조율의 부재",
      body: "적합한 장비와 소프트웨어를 선정(Vendor Solution Matching)하고, 도입 전 검증(PoC)과 총소유비용(TCO) 절감 설계를 하나의 관리 창구에서 조율합니다.\n특정 공급사에 종속되지 않는 솔루션 설계와 통합 관리로 투자 불확실성을 줄입니다.",
      image: "/images/company/challenge-abstract-orchestration.jpg",
    },
    {
      id: "continuity",
      title: "지속 가능성의 한계",
      body: "정기적인 인프라 성능 분석과 학습 성과 검증(Feedback Loop)을 바탕으로 운영 경험을 교육과 인프라 고도화에 반영합니다.\n서비스를 유연하게 확장하고 역량을 지속적으로 개선(Continuous Improvement)해 비즈니스 연속성을 강화합니다.",
      image: "/images/company/challenge-abstract-continuity.jpg",
    },
  ],
};

export const companyValues: CompanyValuesContent = {
  titleLines: ["CoRunWave =", "Cooperation + Run + Wave"],
  intro: "기술과 사람을 연결하는 서비스를 만듭니다.",
  values: [
    {
      id: "cooperation",
      en: "Cooperation",
      ko: "협업",
      description:
        "모든 고객 및 파트너, 직원과 열린 소통으로 협력(Cooperation)하는 기업",
      image: "/images/values/cooperation-3d.png",
    },
    {
      id: "run",
      en: "Run",
      ko: "실행",
      description:
        "고객의 니즈를 파악하고 협업을 통해\n실행(Run)하는 역동적인 조직",
      image: "/images/values/run-3d.png",
    },
    {
      id: "wave",
      en: "Wave",
      ko: "확산",
      description:
        "지속가능한 성장 모멘텀을 고객과 사회에 공유하고 확산(Wave)하여 상생하는 기업",
      image: "/images/values/wave-3d.png",
    },
  ],
};
