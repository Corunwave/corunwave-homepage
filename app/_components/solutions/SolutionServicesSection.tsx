"use client";

import { useRef } from "react";
import type { KeyboardEvent } from "react";
import { useSearchParams } from "next/navigation";
import { useScrollReveal } from "../../_hooks/useScrollReveal";
import { renderText } from "../../_lib/content/renderText";
import type {
  SolutionServiceTab,
  SolutionServicesContent,
} from "../../_content/solutions";

type TabId = SolutionServiceTab["id"];

type SolutionServicesSectionProps = { content: SolutionServicesContent };

const isTabId = (
  tabs: readonly SolutionServiceTab[],
  value: string | null,
): value is TabId => tabs.some(({ id }) => id === value);

type SolutionServicesProps = {
  content: SolutionServicesContent;
  activeId: TabId;
  onSelect?: (id: TabId) => void;
};

const SolutionServices = ({
  content,
  activeId,
  onSelect,
}: SolutionServicesProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  useScrollReveal(sectionRef);

  const select = (index: number) => {
    const tab = content.tabs[index];
    onSelect?.(tab.id);
    tabRefs.current[index]?.focus();
  };

  const handleKeyDown = (event: KeyboardEvent, index: number) => {
    const last = content.tabs.length - 1;
    const next =
      event.key === "ArrowRight"
        ? (index + 1) % content.tabs.length
        : event.key === "ArrowLeft"
          ? (index + last) % content.tabs.length
          : event.key === "Home"
            ? 0
            : event.key === "End"
              ? last
              : null;
    if (next === null) return;
    event.preventDefault();
    select(next);
  };

  return (
    <section
      ref={sectionRef}
      id="solution-services"
      className="solution-services"
      aria-labelledby="solution-services-title"
    >
      <div className="solution-services__inner">
        <h2
          id="solution-services-title"
          className="solution-heading"
          data-reveal-item
        >
          {content.title}
        </h2>

        <div
          className="solution-tabs"
          role="tablist"
          aria-labelledby="solution-services-title"
          data-reveal-item
        >
          {content.tabs.map(({ id, label }, index) => (
            <button
              key={id}
              ref={(node) => {
                tabRefs.current[index] = node;
              }}
              type="button"
              role="tab"
              id={`solution-tab-${id}`}
              className="solution-tab"
              aria-selected={id === activeId}
              aria-controls={`solution-panel-${id}`}
              tabIndex={id === activeId ? 0 : -1}
              onClick={() => select(index)}
              onKeyDown={(event) => handleKeyDown(event, index)}
            >
              {label}
            </button>
          ))}
        </div>

        {content.tabs.map(({ id, intro, items }) => (
          <div
            key={id}
            role="tabpanel"
            id={`solution-panel-${id}`}
            className="solution-panel"
            aria-labelledby={`solution-tab-${id}`}
            hidden={id !== activeId}
          >
            <p className="solution-panel__intro" data-reveal-item>
              {renderText(intro, { breakClassName: "solution-services__break" })}
            </p>
            <div className="solution-service-list">
              {items.map(({ title, subtitle, columns }) => (
                <details key={title} className="solution-service" data-reveal-item>
                  <summary className="solution-service__summary">
                    <h3 className="solution-service__title">
                      {title}
                      {subtitle && (
                        <>
                          {" "}
                          <span className="solution-service__subtitle">
                            {subtitle}
                          </span>
                        </>
                      )}
                    </h3>
                    <span
                      className="solution-service__toggle"
                      aria-hidden="true"
                    />
                  </summary>
                  <div className="solution-service__body">
                    {columns.map((text, columnIndex) => (
                      <section
                        key={content.columnTitles[columnIndex]}
                        className="solution-service__column"
                      >
                        <h4 className="solution-service__column-title">
                          {content.columnTitles[columnIndex]}
                        </h4>
                        <p className="solution-service__column-text">{text}</p>
                      </section>
                    ))}
                  </div>
                </details>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

/* Suspense fallback: same markup with the default tab, so the prerendered shell is complete. */
export const SolutionServicesFallback = ({
  content,
}: SolutionServicesSectionProps) => (
  <SolutionServices content={content} activeId={content.defaultTab} />
);

/* Solution services "솔루션 상세" (preview .solution-services; Figma 847:27561 / 847:28662).
 * Tab state lives in `?tab=` so the home cards can deep-link; history.replaceState is synced with useSearchParams by Next.
 * The accordion is native <details>. */
const SolutionServicesSection = ({ content }: SolutionServicesSectionProps) => {
  const tabParam = useSearchParams().get("tab");
  const activeId = isTabId(content.tabs, tabParam)
    ? tabParam
    : content.defaultTab;

  const handleSelect = (id: TabId) => {
    window.history.replaceState(null, "", `?tab=${id}`);
  };

  return (
    <SolutionServices
      content={content}
      activeId={activeId}
      onSelect={handleSelect}
    />
  );
};

export default SolutionServicesSection;
