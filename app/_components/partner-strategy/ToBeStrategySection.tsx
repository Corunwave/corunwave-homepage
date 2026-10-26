import Image from "next/image";
import type { ToBeStrategyContent } from "../../_content/partner-strategy";

type ToBeStrategySectionProps = { content: ToBeStrategyContent };

/* To-be strategy "파트너십 성공을 위한 To-be 전략" (Figma 1097:34491 / 1097:34519; preview not referenced).
 * Static server component: one markup, a horizontal chevron timeline on desktop and a vertical rail at ≤1024px.
 * Chevron SVGs stretch to their CSS-sized wrapper (`fill`), so the box size lives only in globals.css.
 * The hover glow behind each bubble is pure CSS (desktop only). */
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
              {(["desktop", "mobile"] as const).map((variant) => (
                <span
                  key={variant}
                  className={`partner-tobe__chevron partner-tobe__chevron--${variant}`}
                  aria-hidden="true"
                >
                  <Image
                    src={`/images/partner/tobe/chevron-${id}-${variant}.svg`}
                    alt=""
                    fill
                    sizes="100vw"
                  />
                </span>
              ))}
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
