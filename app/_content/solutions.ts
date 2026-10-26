export type SolutionServiceItem = {
  title: string;
  subtitle?: string;
  /** 서비스 체계 / 산업적용 체계 / 기대효과 */
  columns: readonly [string, string, string];
};

export type SolutionServiceTab = {
  id: "ax-infra" | "learning";
  label: string;
  intro: string;
  items: readonly SolutionServiceItem[];
};

export type SolutionServicesContent = {
  title: string;
  defaultTab: SolutionServiceTab["id"];
  columnTitles: readonly [string, string, string];
  tabs: readonly SolutionServiceTab[];
};

export type SolutionsPageContent = {
  title: string;
  description: string;
};

export const solutionsPage: SolutionsPageContent = {
  title: "솔루션",
  description:
    "인프라 설계부터 운영과 조달,인재 육성에 이르기까지 단절 없는 End-to-End 서비스 가치를 창출합니다.",
};

const serviceTabs: readonly SolutionServiceTab[] = [
  {
    id: "ax-infra",
    label: "AX Infra & IT Outsourcing",
    intro:
      "AI 도입을 위한 하드웨어 아키텍처 설계부터 \n“전문 인력을 통한 선제적 AIOps와 Zero-Trust 보안 기반의 통합 ITO 서비스”까지 지원하여 \n고객이 본질적 성장에 집중할 수 있도록 지원 합니다.",
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

export const solutionServices: SolutionServicesContent = {
  title: "솔루션 상세",
  defaultTab: "ax-infra",
  columnTitles: ["서비스 체계", "산업적용 체계", "기대효과"],
  tabs: serviceTabs,
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

export type AxService = {
  /** Map card (Figma "AX / 1026 / Diagram") */
  mapTitle: string;
  mapBody: string;
  /** Detail accordion (Figma "AX / 1026 / Detail") */
  detailTitle: string;
  detailBody: string;
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
      mapTitle: "Arm Based 서버",
      mapBody:
        "구축형 AX 교육/추론 분야 활용\n전성비 효율의 극대화\n국내 기술로 제품 설계\n메모리 공급 부족 효율적 대안\n저탄소 정책에 적합한 제품\n작게 시작하는 예산 적합형\n다양한 운영체제 지원 가능",
      detailTitle: "01. Arm Based 서버 인프라",
      detailBody:
        "전성비 극대화 기반의 효율적인 구축형 AI 서버 솔루션으로 구축형 AX 교육 및 AI 추론(Inference) 전용 인프라로 구현\n핵심 강점:\n국산 기술 기반의 전성비(전력 대비 성능) 극대화 설계\n메모리 수급 불안정 및 비용 부담을 완화하는 경제적 대안\n저탄소·친환경 정책에 부합하는 저전력 솔루션\n소규모 예산으로 즉시 시작 가능한 유연성 & 다양한 OS 지원",
    },
    "data-security": {
      mapTitle: "데이터 저장 및 보안",
      mapBody:
        "IBM TAPE\n내부 중요 데이터 백업\nLTO10 기술 활용 비용절감\n막대한 비정형 데이터의 보관\nAirgap 개념의 네트워크 분리\n페타바이트 단위 확장\n콘솔 활용 간편한 복원\n\nIBM Safeguarded Copy\n중요파일 랜섬웨어 방지 솔루션\n주기별 스냅샷 기반 파일 복구\n즉각적 복구 지원\n장애대응 및 복구 회복 목표 지원(IBM 스토리지 일부 제품 지원)",
      detailTitle: "02. 데이터 저장 및 랜섬웨어 보안",
      detailBody:
        "페타바이트급 비정형 데이터의 안전한 보관과 강력한 복구 체계\nIBM TAPE Solution: LTO10 기술 기반의 대용량 백업, Airgap 물리적 네트워크 분리로 비정형 데이터 안전 보관 및 백업 비용 획기적 절감\nIBM Safeguarded Copy: 주기적 스냅샷 기반으로 랜섬웨어 감염 시 즉각적인 파일 복구 지원, RTO/RPO 최적화로 비즈니스 회복력 완벽 보장",
    },
    "network-security": {
      mapTitle: "네트워크 보안",
      mapBody:
        "AI인프라 및 LLM 전용 보안 패키지\nAI 워크로드 및 GPU클러스트 보안\nAI 데이터 유출 방지, 프롬프트 보안",
      detailTitle: "03. AI 네트워크 & LLM 보안",
      detailBody:
        "GPU 클러스터 및 AI 워크로드 전용 보안 패키지\n핵심 강점:\nAI 인프라 및 LLM 전용 보안 패키지 적용\nGPU 클러스터 및 AI 워크로드의 실시간 위험 차단\n프롬프트 보안 및 AI 데이터 유출 방지(DLP) 솔루션 제공",
    },
    erp: {
      mapTitle: "ERP / 오픈소스",
      mapBody:
        "재고관리, CRM, 인사 부분 활용\n모듈화로 필요 기능만 전개 가능\n그래픽 인터페이스 채택\n업계 통용 워크플로우 자동 전개\n실시간 보고 및 인사이트 획득\n유연 비용 구조로 과도 지출 방지\n모바일 및 PC 기본 지원\n구축형, 구독형, SaaS 구축 지원\n인공지능 기본 탑재\n글로벌 레퍼런스\n    (유럽 및 일본 지역 널리 사용)",
      detailTitle: "04. 엔터프라이즈 ERP & 오픈소스",
      detailBody:
        "AI가 탑재된 유연한 모듈형 통합 경영 관리 솔루션\n적용 분야: 재고관리, CRM, HR(인사) 등 기업 핵심 워크플로우\n핵심 강점:\n직관적인 GUI 기반으로 업계 통용 프로세스 자동 전개\n구축형(On-Premise), 구독형, SaaS 등 유연한 비용 모델 제공\n실시간 리포팅 및 AI 기반 비즈니스 인사이트 제공 (유럽/일본 등 글로벌 레퍼런스 보유)",
    },
    "media-synthesis": {
      mapTitle: "음성/영상 합성",
      mapBody: "목소리 학습기반\n제작시간 단축\n영상합성으로 확장",
      detailTitle: "05. 음성 & 영상 합성 AI",
      detailBody:
        "음성 학습 기반의 차세대 디지털 콘텐츠 생성 인프라\n주요 기능: 목소리 학습 기반의 콘텐츠 제작 시간 단축 및 고품질 영상 합성 확장\n유연한 환경: 내부망 보안 환경(모두의 AI 등)부터 외부망(ChatGPT 연동)까지 완벽 대응",
    },
    esg: {
      mapTitle: "ESG Reporting",
      mapBody: "환경 평가 지표 완벽 대응\n탄소중립 행정 구현",
      detailTitle: "06. ESG & 탄소중립 리포팅",
      detailBody:
        "글로벌 환경 평가 지표 완벽 대응 솔루션\n핵심 가치: 탄소중립 행정 구현 및 글로벌 ESG 공시 기준에 부합하는 체계적인 리포팅 지원",
    },
    "app-dev": {
      mapTitle: "앱 개발",
      mapBody:
        "앱/사무용 어플리케이션 개발\n국내 및 베트남 개발자 활용\n피그마 작업 지원 가능\nAI 활용 투여 개발자의 최적화\nPM 등 설정하여 자체 관리\n일일 주별 상황 관리 가능\n기존 경험 바탕으로 신속 개발\n(V) 컴플라이언스 노하우 적용\n(V) 개발 능력 한국대비 우수\n(V) AI 부분 개발 지원 가능",
      detailTitle: "07. AI 앱 & 비즈니스 어플리케이션 개발",
      detailBody:
        "국내외 우수 인력 기반의 신속하고 최적화된 앱 개발\n개발 체계: 국내 및 베트남 우수 개발자 Full Pool 활용, Figma 연동 디자인 지원\n특징: 전담 PM을 통한 일일/주별 투명한 진행 관리, 컴플라이언스 노하우 보유, AI 연동 앱 개발 최적화",
    },
    ito: {
      mapTitle: "ITO (전략적 IT 아웃소싱)",
      mapBody:
        "“채용 Risk Zero, 준비된 핵심 IT인재를 즉시 가동”\n\n서비스 체계\n\n전문가 그룹(시스템 관리, 개발인력)지원을 통해 고객의 서비스 공백을 해결하고 안정적인 서비스 운영 및 프로젝트 성과 창출\n\n서비스 안정화 및 효율화\n\n운영 숙련도 편차 및 누적된 기술부채로 인한 운영 리스크 최소화\n표준화 운영 프로세스 적용으로 SLA 준수 및 책임운영\n고객의 운영부담을 제거하고 고객이 핵심가치 창출에 집중하도록 지원",
      detailTitle: "08. ITO (전략적 IT 아웃소싱)",
      detailBody:
        "채용 Risk Zero, 준비된 핵심 IT 인재의 즉시 가동\n핵심 서비스: 전문 기술 인력(시스템 관리, 전문 개발진) 투입을 통한 서비스 공백 해소\n운영 품질: 표준화된 프로세스로 SLA 준수, 기술부채 및 운영 리스크 최소화\n고객 가치: 운영 부담 제거로 고객이 핵심 비즈니스 가치 창출에만 집중할 수 있도록 지원",
    },
  },
};
