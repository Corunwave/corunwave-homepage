import Image from "next/image";
import type { PartnershipBenefitsContent } from "../../_content/partner-strategy";
import ScrollReveal from "../commons/reveal/ScrollReveal";

type PartnershipBenefitsSectionProps = { content: PartnershipBenefitsContent };

/* Partnership benefits "파트너십 기대효과" (Figma 876:28767 / 876:29963; preview not referenced).
 * Server component: editorial rows alternate photo left/right on desktop and stack photo-first at ≤1024px.
 * ScrollReveal only marks each row for its entry as it scrolls into view. */
const PartnershipBenefitsSection = ({
  content,
}: PartnershipBenefitsSectionProps) => {
  return (
    <section
      id="partner-benefits"
      className="partner-section partner-section--benefits"
      aria-labelledby="partner-benefits-title"
    >
      <ScrollReveal>
        <div className="partner-inner">
          <h2 id="partner-benefits-title" className="partner-heading">
            {content.title}
          </h2>
          <div className="partner-benefits">
            {content.benefits.map(({ id, title, subtitle, bullets, image }) => (
              <article
                key={id}
                className={`partner-benefit partner-benefit--${id}`}
                data-reveal-item
              >
                <div className="partner-benefit__photo" aria-hidden="true">
                  <Image
                    src={image}
                    alt=""
                    fill
                    sizes="(width <= 1024px) 100vw, 592px"
                  />
                </div>
                <div className="partner-benefit__content">
                  <h3 className="partner-benefit__title">{title}</h3>
                  <p className="partner-benefit__subtitle">{subtitle}</p>
                  <ul className="partner-benefit__bullets">
                    {bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
};

export default PartnershipBenefitsSection;
