import Image from "next/image";
import Link from "next/link";
import type { SolutionOverviewContent } from "../../_content/solutions";
import ScrollReveal from "../commons/reveal/ScrollReveal";

type SolutionOverviewSectionProps = { content: SolutionOverviewContent };

/* Solution overview "통합 End-to-End 서비스" (preview .solution-overview; Figma 847:27513 / 847:28614). Server component; ScrollReveal only scopes the reveal. */
const SolutionOverviewSection = ({
  content,
}: SolutionOverviewSectionProps) => {
  return (
    <section
      className="solution-overview"
      aria-labelledby="solution-overview-title"
    >
      <ScrollReveal>
        <div className="solution-overview__inner">
          <h2
            id="solution-overview-title"
            className="solution-heading"
            data-reveal-item
          >
            {content.title}
          </h2>

          <ol className="solution-process">
            {content.stages.map(({ title, ax, learning }) => (
              <li key={title} className="solution-stage" data-reveal-item>
                <h3 className="solution-stage__title">{title}</h3>
                <div className="solution-stage__item">
                  <p className="solution-stage__label">{content.axLabel}</p>
                  <p className="solution-stage__value">{ax}</p>
                </div>
                <div className="solution-stage__item">
                  <p className="solution-stage__label">{content.learningLabel}</p>
                  <p className="solution-stage__value">{learning}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="solution-overview-cards">
            {content.cards.map(({ id, title, image, description }) => (
              <Link
                key={id}
                href={`/solutions?tab=${id}#solution-services`}
                className={`solution-overview-card solution-overview-card--${id}`}
                data-reveal-item
              >
                <span className="solution-overview-card__arrow" aria-hidden="true">
                  ↗
                </span>
                <Image
                  className="solution-overview-card__image"
                  src={image}
                  width={1254}
                  height={1254}
                  sizes="224px"
                  alt=""
                  aria-hidden="true"
                />
                <h3 className="solution-overview-card__title">{title}</h3>
                <p className="solution-overview-card__description">
                  {description.map((line, index) => (
                    <span key={line} className="solution-overview-card__line">
                      {line}
                      {index < description.length - 1 && <br />}
                    </span>
                  ))}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
};

export default SolutionOverviewSection;
