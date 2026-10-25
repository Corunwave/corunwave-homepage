import Link from "next/link";
import { renderText } from "../../_lib/content/renderText";
import type { UniversityProposalContent } from "../../_content/partner-strategy";

type UniversityProposalSectionProps = { content: UniversityProposalContent };

/* University proposal "대학 맞춤형 AI Platform" (preview .partner-university; Figma 876:28845 / 876:30043). Static server component. */
const UniversityProposalSection = ({
  content,
}: UniversityProposalSectionProps) => {
  return (
    <section
      id="partner-university"
      className="partner-section partner-section--ruled"
      aria-labelledby="partner-university-title"
    >
      <div className="partner-inner">
        <div className="partner-university">
          <div className="partner-university__intro">
            <span className="partner-university__label">{content.label}</span>
            <h2
              id="partner-university-title"
              className="partner-heading partner-university__title"
            >
              {renderText(content.title)}
            </h2>
            <Link
              href={content.link.href}
              className="partner-university__link"
            >
              {content.link.label}{" "}<span aria-hidden="true">↗</span>
            </Link>
          </div>
          <p className="partner-university__description">{content.description}</p>
        </div>
      </div>
    </section>
  );
};

export default UniversityProposalSection;
