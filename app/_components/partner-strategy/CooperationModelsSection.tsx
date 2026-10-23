import Image from "next/image";

type CooperationModel = {
  title: string;
  image: string;
  description: string;
};

const COOPERATION_MODELS: CooperationModel[] = [
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
];

/* Cooperation models "우리가 제안하는 협력모델" (preview .partner-models; Figma 876:28713 / 876:29907). Static server component. */
const CooperationModelsSection = () => {
  return (
    <section
      id="partner-models"
      className="partner-section partner-section--subtle"
      aria-labelledby="partner-models-title"
    >
      <div className="partner-inner">
        <h2 id="partner-models-title" className="partner-heading">
          우리가 제안하는 협력모델
        </h2>
        <div className="partner-models">
          {COOPERATION_MODELS.map(({ title, image, description }) => (
            <article key={title} className="partner-model">
              <Image
                className="partner-model__icon"
                src={image}
                alt=""
                aria-hidden="true"
                width={1024}
                height={1024}
                sizes="(max-width: 1024px) 160px, 192px"
              />
              <h3 className="partner-model__title">{title}</h3>
              <p className="partner-model__description">{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CooperationModelsSection;
