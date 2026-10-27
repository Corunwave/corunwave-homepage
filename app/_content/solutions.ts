export type SolutionsPageContent = {
  title: string;
  description: string;
};

export const solutionsPage: SolutionsPageContent = {
  title: "솔루션",
  description:
    "인프라 설계부터 운영과 조달, 인재 육성에 이르기까지 단절 없는 End-to-End 서비스를 제공합니다.",
};

export type AxServiceId =
  | "arm-server"
  | "data-security"
  | "network-security"
  | "erp"
  | "media-synthesis"
  | "esg"
  | "app-dev"
  | "ito";

export type BulletItem = {
  text: string;
  /** Sub-bullets: the "제목: 내용" copy is split into the title bullet and its content one level below. */
  children?: readonly string[];
};

/* Map card body: groups of bullets. A group heading is a bold line without a bullet. */
export type AxMapGroup = {
  heading?: string;
  items: readonly BulletItem[];
};

export type AxMap = {
  title: string;
  /** Highlighted line above the groups (centered, bold, accent color). */
  quote?: string;
  /** Lay the groups out side by side, each in its own container. */
  parallel?: boolean;
  groups: readonly AxMapGroup[];
};

/* Detail accordion body: a bold lead sentence, then title bullets with their content one level below. */
export type AxDetail = {
  title: string;
  lead: string;
  items: readonly BulletItem[];
};

export type AxService = {
  /** Map card (Figma "AX / 1026 / Diagram") */
  map: AxMap;
  /** Detail accordion (Figma "AX / 1026 / Detail") */
  detail: AxDetail;
};

export type AxInfraContent = {
  title: string;
  intro: string;
  /** Two-line flow steps joined by down chevrons. */
  flow: readonly string[];
  internalLabel: string;
  externalLabel: string;
  aiEnvironment: string;
  detailAction: string;
  detailOrder: readonly AxServiceId[];
  services: Record<AxServiceId, AxService>;
};

/* Line breaks follow Figma (1191:35163 / 1191:35166). */
export const axInfra: AxInfraContent = {
  title: "AX Infra",
  intro:
    "고객 맞춤형 AI 인프라 구축부터 유연한 아키텍처 설계, 보안, 운영 아웃소싱까지\n복잡한 AX(AI Transformation) 챌린지를 해소하고 기업의 기술 내재화를 실현합니다.",
  flow: [
    "맞춤형 AX 인프라 제공\n고객의 기술 내재화 실현",
    "유연한 아키텍처 설계\nAX 챌린지 해소",
    "검증 중심의 서비스\n엔터프라이즈 페이스메이커",
  ],
  internalLabel: "내부망",
  externalLabel: "외부망",
  aiEnvironment: "국외 : ChatGPT 등\n국내 : 모두의 AI",
  detailAction: "상세 보기",
  detailOrder: [
    "arm-server",
    "data-security",
    "network-security",
    "erp",
    "media-synthesis",
    "esg",
    "app-dev",
    "ito",
  ],
  services: {
    "arm-server": {
      map: {
        title: "Arm Based 서버",
        groups: [
          {
            items: [
              { text: "구축형 AX 교육/추론 분야 활용" },
              { text: "전성비 효율의 극대화" },
              { text: "국내 기술로 제품 설계" },
              { text: "메모리 공급 부족에 대한 효율적 대안" },
              { text: "저탄소 정책에 적합한 제품" },
              { text: "작게 시작하는 예산 적합형" },
              { text: "다양한 운영체제 지원 가능" },
            ],
          },
        ],
      },
      detail: {
        title: "01. Arm Based 서버 인프라",
        lead: "전성비 극대화 기반의 효율적인 구축형 AI 서버 솔루션으로 구축형 AX 교육 및 AI 추론(Inference) 전용 인프라로 구현",
        items: [
          {
            text: "핵심 강점",
            children: [
              "국산 기술 기반의 전성비(전력 대비 성능) 극대화 설계",
              "메모리 수급 불안정 및 비용 부담을 완화하는 경제적 대안",
              "저탄소·친환경 정책에 부합하는 저전력 솔루션",
              "소규모 예산으로 즉시 시작 가능한 유연성 & 다양한 OS 지원",
            ],
          },
        ],
      },
    },
    "data-security": {
      map: {
        title: "데이터 저장 및 보안",
        groups: [
          {
            heading: "IBM TAPE",
            items: [
              { text: "내부 중요 데이터 백업" },
              { text: "LTO10 기술 활용 비용 절감" },
              { text: "막대한 비정형 데이터의 보관" },
              { text: "Airgap 개념의 네트워크 분리" },
              { text: "페타바이트 단위 확장" },
              { text: "콘솔을 활용한 간편한 복원" },
            ],
          },
          {
            heading: "IBM Safeguarded Copy",
            items: [
              { text: "중요 파일 랜섬웨어 방지 솔루션" },
              { text: "주기별 스냅샷 기반 파일 복구" },
              { text: "즉각적 복구 지원" },
              {
                text: "장애 대응 및 복구 회복 목표 지원\n(IBM 스토리지 일부 제품 지원)",
              },
            ],
          },
        ],
      },
      detail: {
        title: "02. 데이터 저장 및 랜섬웨어 보안",
        lead: "페타바이트급 비정형 데이터의 안전한 보관과 강력한 복구 체계",
        items: [
          {
            text: "IBM TAPE Solution",
            children: [
              "LTO10 기술 기반의 대용량 백업",
              "Airgap 물리적 네트워크 분리로 비정형 데이터 안전 보관 및 백업 비용 획기적 절감",
            ],
          },
          {
            text: "IBM Safeguarded Copy",
            children: [
              "주기적 스냅샷 기반으로 랜섬웨어 감염 시 즉각적인 파일 복구 지원",
              "RTO/RPO 최적화로 비즈니스 회복력 완벽 보장",
            ],
          },
        ],
      },
    },
    "network-security": {
      map: {
        title: "네트워크 보안",
        groups: [
          {
            items: [
              { text: "AI 인프라 및 LLM 전용 보안 패키지" },
              { text: "AI 워크로드 및 GPU 클러스터 보안" },
              { text: "AI 데이터 유출 방지, 프롬프트 보안" },
            ],
          },
        ],
      },
      detail: {
        title: "03. AI 네트워크 & LLM 보안",
        lead: "GPU 클러스터 및 AI 워크로드 전용 보안 패키지",
        items: [
          {
            text: "핵심 강점",
            children: [
              "AI 인프라 및 LLM 전용 보안 패키지 적용",
              "GPU 클러스터 및 AI 워크로드의 실시간 위험 차단",
              "프롬프트 보안 및 AI 데이터 유출 방지(DLP) 솔루션 제공",
            ],
          },
        ],
      },
    },
    erp: {
      map: {
        title: "ERP / 오픈소스",
        groups: [
          {
            items: [
              { text: "재고 관리, CRM, 인사 부문 활용" },
              { text: "모듈화로 필요 기능만 전개 가능" },
              { text: "그래픽 인터페이스 채택" },
              { text: "업계 통용 워크플로우 자동 전개" },
              { text: "실시간 보고 및 인사이트 획득" },
              { text: "유연한 비용 구조로 과도한 지출 방지" },
              { text: "모바일 및 PC 기본 지원" },
              { text: "구축형, 구독형, SaaS 구축 지원" },
              { text: "인공지능 기본 탑재" },
              {
                text: "글로벌 레퍼런스\n(유럽 및 일본 지역에서 널리 사용)",
              },
            ],
          },
        ],
      },
      detail: {
        title: "04. 엔터프라이즈 ERP & 오픈소스",
        lead: "AI가 탑재된 유연한 모듈형 통합 경영 관리 솔루션",
        items: [
          {
            text: "적용 분야",
            children: ["재고 관리, CRM, HR(인사) 등 기업 핵심 워크플로우"],
          },
          {
            text: "핵심 강점",
            children: [
              "직관적인 GUI 기반으로 업계 통용 프로세스 자동 전개",
              "구축형(On-Premise), 구독형, SaaS 등 유연한 비용 모델 제공",
              "실시간 리포팅 및 AI 기반 비즈니스 인사이트 제공",
              "글로벌 레퍼런스 보유 (유럽/일본 등)",
            ],
          },
        ],
      },
    },
    "media-synthesis": {
      map: {
        title: "음성 /\n영상 합성",
        groups: [
          {
            items: [
              { text: "목소리 학습 기반" },
              { text: "제작 시간 단축" },
              { text: "영상 합성으로 확장" },
            ],
          },
        ],
      },
      detail: {
        title: "05. 음성 & 영상 합성 AI",
        lead: "음성 학습 기반의 차세대 디지털 콘텐츠 생성 인프라",
        items: [
          {
            text: "주요 기능",
            children: [
              "목소리 학습 기반의 콘텐츠 제작 시간 단축 및 고품질 영상 합성 확장",
            ],
          },
          {
            text: "유연한 환경",
            children: [
              "내부망 보안 환경(모두의 AI 등)부터 외부망(ChatGPT 연동)까지 완벽 대응",
            ],
          },
        ],
      },
    },
    esg: {
      map: {
        title: "ESG Reporting",
        groups: [
          {
            items: [
              { text: "환경 평가 지표 완벽 대응" },
              { text: "탄소중립 행정 구현" },
            ],
          },
        ],
      },
      detail: {
        title: "06. ESG & 탄소중립 리포팅",
        lead: "글로벌 환경 평가 지표 완벽 대응 솔루션",
        items: [
          {
            text: "핵심 가치",
            children: [
              "탄소중립 행정 구현 및 글로벌 ESG 공시 기준에 부합하는 체계적인 리포팅 지원",
            ],
          },
        ],
      },
    },
    "app-dev": {
      map: {
        title: "앱 개발",
        groups: [
          {
            items: [
              { text: "앱/사무용 애플리케이션 개발" },
              { text: "국내 및 베트남 개발자 활용" },
              { text: "피그마 작업 지원 가능" },
              { text: "AI 활용을 통한 투여 개발자 최적화" },
              { text: "PM 등을 설정하여 자체 관리" },
              { text: "일별·주별 상황 관리 가능" },
              { text: "기존 경험을 바탕으로 신속 개발" },
              { text: "(V) 컴플라이언스 노하우 적용" },
              { text: "(V) 개발 능력 한국 대비 우수" },
              { text: "(V) AI 부분 개발 지원 가능" },
            ],
          },
        ],
      },
      detail: {
        title: "07. AI 앱 & 비즈니스 애플리케이션 개발",
        lead: "국내외 우수 인력 기반의 신속하고 최적화된 앱 개발",
        items: [
          {
            text: "개발 체계",
            children: [
              "국내 및 베트남 우수 개발자 Full Pool 활용",
              "Figma 연동 디자인 지원",
            ],
          },
          {
            text: "특징",
            children: [
              "전담 PM을 통한 일일/주별 투명한 진행 관리",
              "컴플라이언스 노하우 보유",
              "AI 연동 앱 개발 최적화",
            ],
          },
        ],
      },
    },
    ito: {
      map: {
        title: "ITO (전략적 IT 아웃소싱)",
        quote: "“채용 Risk Zero, 준비된 핵심 IT 인재를 즉시 가동”",
        parallel: true,
        groups: [
          {
            heading: "서비스 체계",
            items: [
              {
                text: "전문가 그룹(시스템 관리, 개발 인력) 지원을 통한 고객의 서비스 공백 해결",
              },
              { text: "안정적인 서비스 운영 및 프로젝트 성과 창출" },
            ],
          },
          {
            heading: "서비스 안정화 및 효율화",
            items: [
              {
                text: "운영 숙련도 편차 및 누적된 기술 부채로 인한 운영 리스크 최소화",
              },
              { text: "표준화 운영 프로세스 적용으로 SLA 준수 및 책임 운영" },
              {
                text: "고객의 운영 부담을 제거하고 고객이 핵심 가치 창출에 집중하도록 지원",
              },
            ],
          },
        ],
      },
      detail: {
        title: "08. ITO (전략적 IT 아웃소싱)",
        lead: "채용 Risk Zero, 준비된 핵심 IT 인재의 즉시 가동",
        items: [
          {
            text: "핵심 서비스",
            children: [
              "전문 기술 인력(시스템 관리, 전문 개발진) 투입을 통한 서비스 공백 해소",
            ],
          },
          {
            text: "운영 품질",
            children: [
              "표준화된 프로세스로 SLA 준수",
              "기술 부채 및 운영 리스크 최소화",
            ],
          },
          {
            text: "고객 가치",
            children: [
              "운영 부담 제거로 고객이 핵심 비즈니스 가치 창출에만 집중할 수 있도록 지원",
            ],
          },
        ],
      },
    },
  },
};

export type LearningStageRow = {
  stage: string;
  value: string;
  system: readonly BulletItem[];
};

export type LearningDetail = {
  title: string;
  body: readonly BulletItem[];
};

export type LearningServiceContent = {
  title: string;
  lead: string;
  support: readonly string[];
  pillars: readonly string[];
  marketTitle: string;
  trends: readonly string[];
  tableLabel: string;
  tableHead: readonly [string, string, string];
  rows: readonly LearningStageRow[];
  /** Closing sentence: the stage chain is emphasized, `rest` continues it. */
  process: { highlight: string; rest: string };
  details: readonly LearningDetail[];
};

/* Copy follows the preview (.learning-bpo; Figma 1206:39515 / 1206:39591). */
export const learningService: LearningServiceContent = {
  title: "Learning Service & BPO",
  lead: "“기술과 사람을 연결해 기업의 AX전환과 비즈니스 성장을 이끄는 최적의 인재육성 파트너”",
  support: [
    "단순한 지식 전달을 넘어 최신 기술과 사람을 연결하여 기업의 실질적인 디지털 전환(AX)을 이끄는 기술중심 교육서비스를 제공합니다.",
    "현장에서 검증된 학습 방법론을 바탕으로 고객의 비즈니스 성장을 가속화할 최적의 인재육성 방안을 제시합니다.",
  ],
  pillars: [
    "기술 트렌드를 반영한\n전략적 인재양성 파트너",
    "AX Infra 연계\n현업 밀착형 교육 서비스",
    "안정적 교육운영으로\n성과창출 극대화",
  ],
  marketTitle: "Market Trend",
  trends: [
    "기술 격차의 심화\n경제적 손실 가속화",
    "성장 중심 문화의 확산\n인재 육성이 기업 경쟁력",
    "AI 리터러시 채용 트렌드",
    "에이전트 중심 협업미래",
  ],
  tableLabel: "서비스 체계",
  tableHead: ["단계", "핵심 가치", "서비스 체계"],
  rows: [
    {
      stage: "기획",
      value: "전략적 분석 및 목표설정",
      system: [
        {
          text: "비즈니스 목표와 인재 육성 전략을 정렬하여 실질적인 성과 로드맵을 수립",
        },
      ],
    },
    {
      stage: "설계",
      value: "방법론 혁신",
      system: [
        {
          text: "성과 극대화를 위한 Hybrid Learning 적용, 최적의 학습 방법론과 커리큘럼 구조화",
        },
      ],
    },
    {
      stage: "개발",
      value: "실무 적합성",
      system: [
        {
          text: "과정 및 기술 전문가와 협업하여 현업 밀착형 실무 콘텐츠 제작",
        },
      ],
    },
    {
      stage: "운영",
      value: "품질 및 효율보장",
      system: [
        {
          text: "데이터 기반의 통합 운영 위탁(BPO)을 통해 교육의 품질을 관리하고 성과 창출",
        },
        {
          text: "Learning BPO",
          children: [
            "교육 행정부터 학습자 관리까지 전문 인력을 통한 전 과정 통합 운영 위탁",
          ],
        },
        {
          text: "LMS/CMS 최적화",
          children: [
            "중단 없는 학습 환경을 위한 인프라 구축 및 사용자 경험(UX) 중심의 시스템 운영",
          ],
        },
        {
          text: "성과 가시화 보고 및 지속적 개선",
          children: [
            "학습 데이터를 분석하여 개인별 성장 리포트 및 비즈니스 성과 기여도 최종 검증 (Feedback Loop)",
          ],
        },
      ],
    },
  ],
  process: {
    highlight: "기획 → 설계 → 개발 → 운영",
    rest: "으로 이어지는 교육 전 과정을 통합 관리하여 고객의 교육 니즈를 해결하고\n고객의 상황에 맞는 단계별 교육서비스로 운영효율과 학습품질을 동시에 보장함으로써 실질적인 업무역량 성장을 견인합니다.",
  },
  details: [
    {
      title: "1. AX & AI 리터러시 현업 밀착형 교육",
      body: [
        {
          text: "AX Infra 연계 훈련",
          children: [
            "기업의 내부 기술/시스템 인프라와 연계된 실전형 AI 교육",
          ],
        },
        {
          text: "직무별 AI 에이전트 협업",
          children: [
            "영업, 마케팅, 개발, HR 등 직무별 Agentic Workflow 구현",
          ],
        },
        {
          text: "PBL 기반 실무 프로젝트",
          children: [
            "현업 이슈를 직접 해결하는 문제 해결형 워크숍 및 부트캠프",
          ],
        },
      ],
    },
    {
      title: "2. Hybrid Learning & 맞춤형 커리큘럼 개발",
      body: [
        {
          text: "온·오프라인 결합 설계",
          children: [
            "이론 습득과 실습·피드백이 유기적으로 연결된 하이브리드 학습",
          ],
        },
        {
          text: "도메인 특화 콘텐츠",
          children: ["산업군별 맞춤형 실무 아티팩트 및 템플릿 개발"],
        },
      ],
    },
    {
      title: "3. All-in-One Learning BPO (통합 운영 위탁 서비스)",
      body: [
        {
          text: "교육 행정 & 운영 BPO",
          children: [
            "기획, 학습자 관리, 강사 수급, 평가까지 전 과정 위탁 운영",
          ],
        },
        {
          text: "LMS / CMS 인프라 최적화",
          children: [
            "중단 없는 안심 학습 환경과 사용자 경험(UX) 중심의 시스템 운용",
          ],
        },
        {
          text: "Data-driven Feedback Loop",
          children: [
            "학습 데이터를 분석하여 개인별 성장 리포트 및 비즈니스 성과 기여도를 검증하는 최종 성과 보고서 제공",
          ],
        },
      ],
    },
  ],
};
