"use client";

import { useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import Image from "next/image";
import type {
  CustomerProposalContent,
  CustomerProposalsContent,
} from "../../_content/partner-strategy";

type CustomerId = CustomerProposalContent["id"];

type CustomerProposalsSectionProps = { content: CustomerProposalsContent };

/* Customer proposals "고객 유형별 제안" (preview .partner-customers; Figma 876:28790 / 876:29988, states 876:30096).
 * Tab state is local (no URL sync); tabs follow the WAI-ARIA tablist pattern with roving tabIndex. */
const CustomerProposalsSection = ({
  content,
}: CustomerProposalsSectionProps) => {
  const [activeId, setActiveId] = useState<CustomerId>(
    content.proposals[0].id,
  );
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const select = (index: number) => {
    setActiveId(content.proposals[index].id);
    const tab = tabRefs.current[index];
    tab?.focus();
    tab?.scrollIntoView({ block: "nearest", inline: "nearest" });
  };

  const handleKeyDown = (event: KeyboardEvent, index: number) => {
    const count = content.proposals.length;
    const next =
      event.key === "ArrowRight"
        ? (index + 1) % count
        : event.key === "ArrowLeft"
          ? (index + count - 1) % count
          : event.key === "Home"
            ? 0
            : event.key === "End"
              ? count - 1
              : null;
    if (next === null) return;
    event.preventDefault();
    select(next);
  };

  return (
    <section
      id="partner-customers"
      className="partner-section partner-section--customers"
      aria-labelledby="partner-customers-title"
    >
      <div className="partner-inner">
        <h2 id="partner-customers-title" className="partner-heading">
          {content.title}
        </h2>

        <div
          className="partner-tabs"
          role="tablist"
          aria-labelledby="partner-customers-title"
        >
          {content.proposals.map(({ id, label }, index) => (
            <button
              key={id}
              ref={(node) => {
                tabRefs.current[index] = node;
              }}
              type="button"
              role="tab"
              id={`partner-tab-${id}`}
              className="partner-tab"
              aria-selected={id === activeId}
              aria-controls={`partner-panel-${id}`}
              tabIndex={id === activeId ? 0 : -1}
              onClick={() => select(index)}
              onKeyDown={(event) => handleKeyDown(event, index)}
            >
              {label}
            </button>
          ))}
        </div>

        {content.proposals.map(
          ({ id, label, description, image, offerings }) => (
            <div
              key={id}
              role="tabpanel"
              id={`partner-panel-${id}`}
              className="partner-customer-panel"
              aria-labelledby={`partner-tab-${id}`}
              tabIndex={0}
              hidden={id !== activeId}
            >
              <div
                className={`partner-customer-intro partner-customer-intro--${id}`}
              >
                <h3 className="partner-customer-intro__title">{label}</h3>
                <p className="partner-customer-intro__description">
                  {description}
                </p>
                <Image
                  className="partner-customer-intro__image"
                  src={image}
                  alt=""
                  aria-hidden="true"
                  width={1024}
                  height={1024}
                  sizes="(max-width: 1024px) 210px, 240px"
                />
              </div>
              <ol className="partner-offerings">
                {offerings.map((offering) => (
                  <li key={offering}>
                    <h4 className="partner-offerings__title">{offering}</h4>
                  </li>
                ))}
              </ol>
            </div>
          ),
        )}
      </div>
    </section>
  );
};

export default CustomerProposalsSection;
