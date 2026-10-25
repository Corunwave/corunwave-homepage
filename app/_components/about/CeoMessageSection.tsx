import { renderText } from "../../_lib/content/renderText";
import type { CeoMessageContent } from "../../_content/about";

type CeoMessageSectionProps = { content: CeoMessageContent };

/* CEO greeting "드리는 말씀" (preview .ceo-section; Figma 640:20145 / 640:22153). Static server component. */
const CeoMessageSection = ({ content }: CeoMessageSectionProps) => {
  return (
    <section className="ceo-section" aria-labelledby="ceo-title">
      <div className="ceo-inner">
        <h2 id="ceo-title" className="ceo-title">
          {content.title}
        </h2>
        <div className="ceo-message">
          <div className="ceo-letter">
            {content.paragraphs.map((paragraph) => (
              <p key={paragraph}>
                {renderText(paragraph, { keepClassName: "ceo-keep" })}
              </p>
            ))}
          </div>
          <div className="ceo-signoff">
            <p className="ceo-role">{content.role}</p>
            <p className="ceo-name">{content.name}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CeoMessageSection;
