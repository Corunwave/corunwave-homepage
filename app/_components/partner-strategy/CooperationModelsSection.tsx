import Image from "next/image";
import type { CooperationModelsContent } from "../../_content/partner-strategy";

type CooperationModelsSectionProps = { content: CooperationModelsContent };

/* Cooperation models "우리가 제안하는 협력모델" (preview .partner-models; Figma 876:28713 / 876:29907). Static server component. */
const CooperationModelsSection = ({
  content,
}: CooperationModelsSectionProps) => {
  return (
    <section
      id="partner-models"
      className="partner-section partner-section--subtle"
      aria-labelledby="partner-models-title"
    >
      <div className="partner-inner">
        <h2 id="partner-models-title" className="partner-heading">
          {content.title}
        </h2>
        <div className="partner-models">
          {content.models.map(({ title, image, description }) => (
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
