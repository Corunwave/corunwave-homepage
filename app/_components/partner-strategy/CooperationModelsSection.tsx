import Image from "next/image";
import type { CooperationModelsContent } from "../../_content/partner-strategy";

type CooperationModelsSectionProps = { content: CooperationModelsContent };

/* Cooperation models "우리가 제안하는 협력모델" (Figma 876:28713 / 876:29907; preview not referenced).
 * Static server component: one markup, a role × stage matrix on desktop and stacked role cards at ≤1024px. */
const CooperationModelsSection = ({
  content,
}: CooperationModelsSectionProps) => {
  return (
    <section
      id="partner-models"
      className="partner-section"
      aria-labelledby="partner-models-title"
    >
      <div className="partner-inner">
        <h2
          id="partner-models-title"
          className="partner-heading partner-heading--with-description"
        >
          {content.title}
        </h2>
        <p className="partner-description">{content.description}</p>
        <div className="partner-coop">
          <div className="partner-coop__head" aria-hidden="true">
            <span className="partner-coop__corner" />
            {content.stages.map((stage) => (
              <span key={stage} className="partner-coop__stage">
                {stage}
              </span>
            ))}
          </div>
          {content.roles.map(({ id, name, subName, accent, steps }) => (
            <article
              key={id}
              className={`partner-coop__role partner-coop__role--${accent}`}
            >
              <h3 className="partner-coop__role-title">
                {accent === "logo" ? (
                  <Image
                    className="partner-coop__logo"
                    src="/images/logos/corunwave-ko-en-color.png"
                    alt={name}
                    width={2496}
                    height={832}
                    sizes="152px"
                  />
                ) : (
                  <span className="partner-coop__role-name">
                    {name}
                    {subName ? (
                      <span className="partner-coop__role-sub">{subName}</span>
                    ) : null}
                  </span>
                )}
              </h3>
              <dl className="partner-coop__steps">
                {content.stages.map((stage, index) => (
                  <div key={stage} className="partner-coop__step">
                    <dt className="partner-coop__step-label">{stage}</dt>
                    <dd className="partner-coop__step-text">{steps[index]}</dd>
                  </div>
                ))}
              </dl>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CooperationModelsSection;
