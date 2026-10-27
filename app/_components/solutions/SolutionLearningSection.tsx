import DetailAccordion from "../commons/accordion/DetailAccordion";
import BulletList from "../commons/lists/BulletList";
import { renderText } from "../../_lib/content/renderText";
import type { LearningServiceContent } from "../../_content/solutions";

type SolutionLearningSectionProps = { content: LearningServiceContent };

/* Pillar accents reuse the existing sky / blue / violet theme colors (see .learning-pillar--*). */
const PILLAR_ACCENTS = ["sky", "blue", "violet"] as const;

/* Learning Service & BPO (preview .learning-bpo; Figma 1206:39515 / 1206:39591). Static server component.
 * Detail rows reuse the shared DetailAccordion (same as AX Infra). */
const SolutionLearningSection = ({ content }: SolutionLearningSectionProps) => (
  <section
    id="learning"
    className="learning-section"
    aria-labelledby="learning-title"
  >
    <div className="learning-inner">
      <h2 id="learning-title" className="learning-title">
        {content.title}
      </h2>

      <div className="learning-intro">
        <p className="learning-lead">{content.lead}</p>
        {content.support.map((paragraph) => (
          <p key={paragraph} className="learning-support">
            {paragraph}
          </p>
        ))}
      </div>

      <ul className="learning-pillars">
        {content.pillars.map((pillar, index) => (
          <li
            key={pillar}
            className={`learning-pillar learning-pillar--${PILLAR_ACCENTS[index]}`}
          >
            {renderText(pillar)}
          </li>
        ))}
      </ul>

      <div className="learning-diagram">
        <aside className="learning-market" aria-labelledby="learning-market-title">
          <h3 id="learning-market-title" className="learning-market__title">
            {content.marketTitle}
          </h3>
          <ul className="learning-trends">
            {content.trends.map((trend) => (
              <li key={trend} className="learning-trend">
                {trend.split("\n").map((line) => (
                  <span key={line} className="learning-trend__line">
                    {line}
                  </span>
                ))}
              </li>
            ))}
          </ul>
          <span className="learning-chevron" aria-hidden="true" />
        </aside>

        <div className="learning-table" role="table" aria-label={content.tableLabel}>
          <div className="learning-table__head" role="row">
            {content.tableHead.map((label) => (
              <span key={label} role="columnheader">
                {label}
              </span>
            ))}
          </div>
          {content.rows.map(({ stage, value, system }) => (
            <div key={stage} className="learning-row" role="row">
              <p className="learning-row__stage" role="cell">
                {stage}
              </p>
              <p className="learning-row__value" role="cell">
                {value}
              </p>
              <div className="learning-row__system" role="cell">
                <BulletList className="learning-bullets" items={system} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <p className="learning-process">
        <strong className="learning-process__highlight">
          {content.process.highlight}
        </strong>
        {renderText(content.process.rest)}
      </p>

      <div className="detail-accordion-list">
        {content.details.map(({ title, body }) => (
          <DetailAccordion key={title} name="learning-detail" title={title}>
            <BulletList className="learning-bullets" items={body} />
          </DetailAccordion>
        ))}
      </div>
    </div>
  </section>
);

export default SolutionLearningSection;
