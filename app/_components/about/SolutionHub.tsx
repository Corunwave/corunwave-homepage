"use client";

import { useId, useState } from "react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

/* Partner chips on the 1280×720 artboard. `link` runs from the partner end to the hub end,
 * relative to the hub center (640, 410), so the flow dash travels toward the center.
 * Chip position, anchor and flow delay live in globals.css (.solution-hub__partner--{index}).
 */
const PARTNERS = [
  { label: "Infra Partner", link: [-130, -225.2, -33, -57.2] },
  { label: "Edu Partner", link: [130, -225.2, 33, -57.2] },
  { label: "Content &\nLearning Expert Network", link: [260, 0, 66, 0] },
  { label: "Associations", link: [130, 225.2, 33, 57.2] },
  { label: "University", link: [-130, 225.2, -33, 57.2] },
  { label: "Public & Gov", link: [-260, 0, -66, 0] },
] as const;

type Partner = (typeof PARTNERS)[number];
type PartnerState = "active" | "inactive" | undefined;

/* Ribbon ② mirrors so its gradient runs the other way around the hub. */
const RIBBON_TRANSFORMS = [undefined, "rotate(60) scale(-1 1)", "rotate(120)"] as const;

const RIBBON_BACK_PATH =
  "M -212 0 A 212 92 0 0 1 212 0 L 202 -3 A 202 74 0 0 0 -202 -3 Z";
const RIBBON_FRONT_PATH =
  "M -212 0 A 212 92 0 0 0 212 0 L 202 -3 A 202 74 0 0 1 -202 -3 Z";
const RIBBON_HIGHLIGHT_PATH = "M -212 0 A 212 92 0 0 0 212 0";

interface SolutionHubProps
  extends Omit<ComponentPropsWithoutRef<"section">, "children"> {
  /** Hub logo; a dashed "[회사 로고]" placeholder renders when omitted. */
  logo?: ReactNode;
  showFlow?: boolean;
}

const getPartnerState = (
  index: number,
  hoveredIndex: number | null,
): PartnerState => {
  if (hoveredIndex === null) return undefined;
  return index === hoveredIndex ? "active" : "inactive";
};

const PartnerLink = ({
  partner,
  index,
  state,
  variant,
}: {
  partner: Partner;
  index: number;
  state: PartnerState;
  variant: "base" | "flow";
}) => {
  const [x1, y1, x2, y2] = partner.link;
  return (
    <line
      className={`solution-hub__link solution-hub__link--${variant} solution-hub__link--${index}`}
      data-state={state}
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
    />
  );
};

/* Solution Hub diagram (사업 방향성): three crossing ribbons around the hub logo, six partner
 * chips linked to the center. Client component only for the chip hover/focus highlight.
 */
const SolutionHub = ({
  logo,
  showFlow = true,
  className,
  ...sectionProps
}: SolutionHubProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const baseId = useId();
  const gradientId = `${baseId}-ribbon`;
  const ribbonShadowId = `${baseId}-ribbon-shadow`;
  const hubShadowId = `${baseId}-hub-shadow`;

  return (
    <section
      aria-label="Solution Hub"
      {...sectionProps}
      className={className ? `solution-hub ${className}` : "solution-hub"}
    >
      <div className="solution-hub__stage">
        <div className="solution-hub__canvas">
          <svg
            className="solution-hub__art"
            viewBox="0 0 1280 720"
            aria-hidden="true"
            focusable="false"
          >
            <defs>
              <linearGradient
                id={gradientId}
                gradientUnits="userSpaceOnUse"
                x1="-212"
                y1="0"
                x2="212"
                y2="0"
              >
                <stop className="solution-hub__stop--start" offset="0" />
                <stop className="solution-hub__stop--accent" offset="0.45" />
                <stop className="solution-hub__stop--end" offset="1" />
              </linearGradient>
              <filter
                id={ribbonShadowId}
                x="-20%"
                y="-20%"
                width="140%"
                height="140%"
              >
                <feDropShadow
                  className="solution-hub__shadow solution-hub__shadow--ribbon"
                  dx="0"
                  dy="6"
                  stdDeviation="8"
                />
              </filter>
              <filter
                id={hubShadowId}
                x="-50%"
                y="-50%"
                width="200%"
                height="200%"
              >
                <feDropShadow
                  className="solution-hub__shadow solution-hub__shadow--hub"
                  dx="0"
                  dy="8"
                  stdDeviation="6"
                />
              </filter>
            </defs>
            <g transform="translate(640 410)">
              <g className="solution-hub__links">
                {PARTNERS.map((partner, index) => (
                  <PartnerLink
                    key={partner.label}
                    partner={partner}
                    index={index}
                    state={getPartnerState(index, hoveredIndex)}
                    variant="base"
                  />
                ))}
              </g>
              <g className="solution-hub__ribbons solution-hub__ribbons--back">
                {RIBBON_TRANSFORMS.map((transform, index) => (
                  <path
                    key={index}
                    d={RIBBON_BACK_PATH}
                    transform={transform}
                    fill={`url(#${gradientId})`}
                  />
                ))}
              </g>
              {showFlow && (
                <g className="solution-hub__links">
                  {PARTNERS.map((partner, index) => (
                    <PartnerLink
                      key={partner.label}
                      partner={partner}
                      index={index}
                      state={getPartnerState(index, hoveredIndex)}
                      variant="flow"
                    />
                  ))}
                </g>
              )}
              <g
                className="solution-hub__ribbons solution-hub__ribbons--front"
                filter={`url(#${ribbonShadowId})`}
              >
                {RIBBON_TRANSFORMS.map((transform, index) => (
                  <g
                    key={index}
                    className="solution-hub__ribbon"
                    transform={transform}
                  >
                    <path d={RIBBON_FRONT_PATH} fill={`url(#${gradientId})`} />
                    <path
                      className="solution-hub__ribbon-highlight"
                      d={RIBBON_HIGHLIGHT_PATH}
                    />
                  </g>
                ))}
              </g>
              <circle
                className="solution-hub__core"
                r="70"
                filter={`url(#${hubShadowId})`}
              />
            </g>
          </svg>
          <div className="solution-hub__logo">
            {logo ?? (
              <span className="solution-hub__logo-placeholder">
                [회사 로고]
              </span>
            )}
          </div>
        </div>
      </div>
      <ul className="solution-hub__partners">
        {PARTNERS.map(({ label }, index) => (
          <li
            key={label}
            className={`solution-hub__partner solution-hub__partner--${index}`}
          >
            <button
              type="button"
              className="solution-hub__chip"
              data-state={getPartnerState(index, hoveredIndex)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onFocus={() => setHoveredIndex(index)}
              onBlur={() => setHoveredIndex(null)}
            >
              {label}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default SolutionHub;
