import Image from "next/image";

type PartnerField = {
  id: "learning" | "infra" | "operations";
  title: string;
  image: string;
  items: string[];
};

const PARTNER_FIELDS: PartnerField[] = [
  {
    id: "learning",
    title: "Learning Service",
    image: "/images/partner/photos/learning.jpg",
    items: [
      "기술영역별 전문 강사",
      "L&D 전략 및 성과 컨설팅 전문가",
      "교수설계 및 AI 콘텐츠 개발 전문가",
      "도메인 전문가 네트워크",
      "에듀테크 및 학습플랫폼 전문가",
      "Learning Sales 전문가",
    ],
  },
  {
    id: "infra",
    title: "AX Infra",
    image: "/images/partner/photos/infra.jpg",
    items: [
      "AI컴퓨팅 및 가속기 전문가",
      "네트워킹 전문가",
      "지능형 스토리지 및 데이터 레이크 전문가",
      "Zero-Trust 보안 및 거버넌스 전문가",
      "AIOps 및 그린IT 운영 전문가",
      "시스템 아키텍처 전문가",
      "Infra Sales 전문가",
    ],
  },
  {
    id: "operations",
    title: "BPO & ITO",
    image: "/images/partner/photos/operations.jpg",
    items: [
      "하이브리드 클라우드 및 인프라 운영전문가",
      "SW 및 AI개발 전문가",
      "프로세스 자동화 및 DX컨설턴트",
      "통합서비스 데스크 및 ITSM 전문가",
      "서비스 거버넌스 및 리스크 관리 전문가",
    ],
  },
];

/* Partner fields "함께 찾는 파트너" (preview .partner-fields; Figma 876:28695 / 876:29889). Static server component. */
const PartnerFieldsSection = () => {
  return (
    <section
      id="partner-fields"
      className="partner-section"
      aria-labelledby="partner-fields-title"
    >
      <div className="partner-inner">
        <h2 id="partner-fields-title" className="partner-heading">
          함께 찾는 파트너
        </h2>
        <div className="partner-fields">
          {PARTNER_FIELDS.map(({ id, title, image, items }) => (
            <article
              key={id}
              className={`partner-field partner-field--${id}`}
            >
              <Image
                className="partner-field__photo"
                src={image}
                alt=""
                aria-hidden="true"
                width={1400}
                height={1000}
                sizes="(max-width: 1024px) 100vw, 416px"
              />
              <div className="partner-field__content">
                <h3 className="partner-field__title">{title}</h3>
                <ul className="partner-field__list">
                  {items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnerFieldsSection;
