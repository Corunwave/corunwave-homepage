import Image from "next/image";
import type { ToBeStrategyContent } from "../../_content/partner-strategy";

type ToBeStrategySectionProps = { content: ToBeStrategyContent };

/* To-be strategy "파트너십 성공을 위한 To-be 전략" (Figma 1097:34491 / 1097:34519; preview not referenced).
 * Static server component: one markup, a horizontal chevron timeline on desktop and a vertical rail at ≤1024px.
 * The hover glow behind each bubble is pure CSS (desktop only). */
const DESKTOP_CHEVRON_SIZE = {
  short: { width: 422, height: 28 },
  mid: { width: 422, height: 28 },
  long: { width: 448, height: 28 },
} as const;

const MOBILE_CHEVRON_SIZE = {
  short: { width: 28, height: 332 },
  mid: { width: 28, height: 332 },
  long: { width: 28, height: 364 },
} as const;

const ToBeStrategySection = ({ content }: ToBeStrategySectionProps) => {
  return (
    <section
      id="partner-tobe"
      className="partner-section"
      aria-labelledby="partner-tobe-title"
    >
      <div className="partner-inner">
        <h2 id="partner-tobe-title" className="partner-heading">
          {content.title}
        </h2>
        <ol className="partner-tobe">
          {content.stages.map(({ id, term, title, description }) => (
            <li
              key={id}
              className={`partner-tobe__stage partner-tobe__stage--${id}`}
            >
              <Image
                className="partner-tobe__chevron partner-tobe__chevron--desktop"
                src={`/images/partner/tobe/chevron-${id}-desktop.svg`}
                alt=""
                aria-hidden="true"
                {...DESKTOP_CHEVRON_SIZE[id]}
              />
              <Image
                className="partner-tobe__chevron partner-tobe__chevron--mobile"
                src={`/images/partner/tobe/chevron-${id}-mobile.svg`}
                alt=""
                aria-hidden="true"
                {...MOBILE_CHEVRON_SIZE[id]}
              />
              <span className="partner-tobe__connector" aria-hidden="true" />
              <span className="partner-tobe__point" aria-hidden="true" />
              <p className="partner-tobe__term">{term}</p>
              <div className="partner-tobe__card">
                <span className="partner-tobe__glow" aria-hidden="true" />
                <article className="partner-tobe__bubble">
                  <h3 className="partner-tobe__title">{title}</h3>
                  <p className="partner-tobe__description">{description}</p>
                </article>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default ToBeStrategySection;
