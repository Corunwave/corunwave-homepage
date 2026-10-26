import type { PartnershipBenefitsContent } from "../../_content/partner-strategy";
import ScrollReveal from "../commons/reveal/ScrollReveal";

type PartnershipBenefitsSectionProps = { content: PartnershipBenefitsContent };

/* Partnership benefits "파트너십 기대효과" (preview .partner-benefits; Figma 876:28767 / 876:29963).
 * Server component; ScrollReveal only marks the benefits for the staggered entry. */
const PartnershipBenefitsSection = ({
  content,
}: PartnershipBenefitsSectionProps) => {
  return (
    <section
      id="partner-benefits"
      className="partner-section partner-section--subtle"
      aria-labelledby="partner-benefits-title"
    >
      <ScrollReveal>
        <div className="partner-inner">
          <h2 id="partner-benefits-title" className="partner-heading">
            {content.title}
          </h2>
          <div className="partner-benefits">
            {content.benefits.map(({ title, english }) => (
              <article key={title} className="partner-benefit" data-reveal-item>
                <h3 className="partner-benefit__title">{title}</h3>
                <p className="partner-benefit__english">{english}</p>
              </article>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
};

export default PartnershipBenefitsSection;
