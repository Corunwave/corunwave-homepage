export type SolutionsPageContent = {
  title: string;
  description: string;
};

export const solutionsPage: SolutionsPageContent = {
  title: "솔루션",
  description:
    "인프라 설계부터 운영과 조달,인재 육성에 이르기까지 단절 없는 End-to-End 서비스 가치를 창출합니다.",
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
