import type { PartnershipBenefitsContent } from "../../_content/partner-strategy";
import ScrollReveal from "../commons/reveal/ScrollReveal";

type PartnershipBenefitsSectionProps = { content: PartnershipBenefitsContent };

/* Partnership benefits "파트너십 기대효과" + To-be strategy (preview .partner-benefits / .partner-strategy; Figma 876:28767 / 876:29963).
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

          <div className="partner-strategy">
            <h3 className="partner-strategy__heading">
              {content.strategyHeading}
            </h3>
            <div className="partner-strategy__grid">
              {content.strategies.map(({ term, title, description }) => (
                <article key={term} className="partner-strategy__card">
                  <p className="partner-strategy__term">{term}</p>
                  <h4 className="partner-strategy__title">{title}</h4>
                  <p className="partner-strategy__description">{description}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
};

export default PartnershipBenefitsSection;
