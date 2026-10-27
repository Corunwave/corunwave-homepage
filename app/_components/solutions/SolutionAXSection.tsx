"use client";

import Image from "next/image";
import DetailAccordion from "../commons/accordion/DetailAccordion";
import { renderText } from "../../_lib/content/renderText";
import type { AxInfraContent, AxServiceId } from "../../_content/solutions";

type SolutionAXSectionProps = { content: AxInfraContent };

/* Map placement (Figma "Original service columns"); the DOM order is also the mobile stacking order. */
const INTERNAL_SERVICES = [
  "network-security",
  "media-synthesis",
] as const satisfies readonly AxServiceId[];
const EXTERNAL_COLUMNS = [
  ["arm-server", "esg"],
  ["data-security"],
  ["erp", "app-dev"],
] as const satisfies readonly (readonly AxServiceId[])[];
const COMPACT_SERVICES: readonly AxServiceId[] = ["media-synthesis"];

const detailId = (id: AxServiceId) => `ax-detail-${id}`;

/* "상세 보기" opens the matching detail accordion (closing the others via the shared name) and scrolls to it. */
const openDetail = (id: AxServiceId) => {
  const detail = document.getElementById(detailId(id));
  if (!(detail instanceof HTMLDetailsElement)) return;
  detail.open = true;
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  detail.scrollIntoView({
    behavior: reducedMotion ? "auto" : "smooth",
    block: "start",
  });
  detail.querySelector("summary")?.focus({ preventScroll: true });
};

type AxMapCardProps = {
  id: AxServiceId;
  content: AxInfraContent;
};

const AxMapCard = ({ id, content }: AxMapCardProps) => {
  const { mapTitle, mapBody } = content.services[id];
  const compact = COMPACT_SERVICES.includes(id);
  return (
    <details
      name="ax-map"
      className={`ax-card${compact ? " ax-card--compact" : ""}`}
    >
      <summary className="ax-card__summary">
        <h3 className="ax-card__title">{mapTitle}</h3>
        <span className="ax-toggle" aria-hidden="true" />
      </summary>
      <div className="ax-card__body">
        <p className="ax-card__text">{renderText(mapBody)}</p>
        <button
          type="button"
          className="ax-card__action"
          aria-controls={detailId(id)}
          onClick={() => openDetail(id)}
        >
          {content.detailAction}
        </button>
      </div>
    </details>
  );
};

/* AX Infra (Figma 1191:35163 / 1191:35166; no preview section).
 * Map cards and detail rows are native exclusive <details> (shared `name`): one open per group, no React state. */
const SolutionAXSection = ({ content }: SolutionAXSectionProps) => (
  <section id="ax-infra" className="ax-section" aria-labelledby="ax-title">
    <div className="ax-inner">
      <h2 id="ax-title" className="ax-title">
        {content.title}
      </h2>
      <p className="ax-intro">{renderText(content.intro)}</p>

      <div className="ax-overview">
        <ol className="ax-flow">
          {content.flow.map((step, index) => (
            <li key={step} className="ax-flow__step">
              {index > 0 && (
                <Image
                  className="ax-flow__chevron"
                  src="/images/solution/ax-flow-chevron.svg"
                  width={24}
                  height={12}
                  alt=""
                  aria-hidden="true"
                />
              )}
              <p className="ax-flow__text">
                {step.split("\n").map((line) => (
                  <span key={line} className="ax-flow__line">
                    {line}
                  </span>
                ))}
              </p>
            </li>
          ))}
        </ol>

        <div className="ax-map">
          <div className="ax-map__group">
            <p className="ax-domain ax-domain--internal">
              {content.internalLabel}
            </p>
            <div className="ax-map__internal">
              <p className="ax-env">{renderText(content.aiEnvironment)}</p>
              {INTERNAL_SERVICES.map((id) => (
                <AxMapCard key={id} id={id} content={content} />
              ))}
            </div>
          </div>

          <div className="ax-map__group">
            <p className="ax-domain ax-domain--external">
              {content.externalLabel}
            </p>
            <div className="ax-map__external">
              {EXTERNAL_COLUMNS.map((column) => (
                <div key={column.join()} className="ax-map__column">
                  {column.map((id) => (
                    <AxMapCard key={id} id={id} content={content} />
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="ax-map__ito">
            <AxMapCard id="ito" content={content} />
          </div>
        </div>
      </div>

      <div className="detail-accordion-list">
        {content.detailOrder.map((id) => {
          const { detailTitle, detailBody } = content.services[id];
          return (
            <DetailAccordion
              key={id}
              id={detailId(id)}
              name="ax-detail"
              title={detailTitle}
            >
              <p className="detail-accordion__text">{renderText(detailBody)}</p>
            </DetailAccordion>
          );
        })}
      </div>
    </div>
  </section>
);

export default SolutionAXSection;
