import { Fragment } from "react";
import Image from "next/image";
import { renderText } from "../../_lib/content/renderText";
import type { BusinessDirectionContent } from "../../_content/about";
import SolutionHub from "./SolutionHub";

type BusinessDirectionSectionProps = { content: BusinessDirectionContent };

/* Business direction "사업 방향성" (preview .business-direction; Figma 653:20134 / 653:20160).
 * Server component; only the SolutionHub diagram hydrates. */
const BusinessDirectionSection = ({
  content,
}: BusinessDirectionSectionProps) => {
  return (
    <section className="direction-section" aria-labelledby="direction-title">
      <div className="direction-inner">
        <div className="direction-composition">
          <header className="direction-copy">
            <h2 id="direction-title" className="direction-title">
              {content.titleLines.map((phrases, lineIndex) => (
                <Fragment key={lineIndex}>
                  {lineIndex > 0 && " "}
                  <span
                    className={`direction-title-line direction-title-line--${lineIndex === 0 ? "first" : "last"}`}
                  >
                    {phrases.map((phrase, phraseIndex) => (
                      <Fragment key={phrase}>
                        {phraseIndex > 0 && " "}
                        <span className="direction-phrase">{phrase}</span>
                      </Fragment>
                    ))}
                  </span>
                </Fragment>
              ))}
            </h2>
            <p className="direction-description">
              {content.descriptionLead}{" "}
              <span className="direction-keep">
                <strong>{content.descriptionEmphasis}</strong>
                {content.descriptionTail}
              </span>
            </p>
          </header>
          <SolutionHub
            logo={
              <Image
                className="solution-hub__logo-image"
                src={content.hubLogo.src}
                width={content.hubLogo.width}
                height={content.hubLogo.height}
                alt={content.hubLogo.alt}
              />
            }
          />
        </div>
        <div className="direction-connectors" aria-hidden="true">
          <span className="direction-trunk" />
          <span className="direction-branch direction-branch--0" />
          <span className="direction-branch direction-branch--1" />
          <span className="direction-branch direction-branch--2" />
        </div>
        <div className="direction-values">
          {content.values.map(({ title, body }) => (
            <article key={title} className="direction-value">
              <h3>{title}</h3>
              <p>{renderText(body, { keepClassName: "direction-keep" })}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BusinessDirectionSection;
