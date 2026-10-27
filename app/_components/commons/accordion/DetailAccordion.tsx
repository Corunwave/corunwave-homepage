import type { ReactNode } from "react";

type DetailAccordionProps = {
  /** `<details>` id, so other controls can open it (e.g. AX "상세 보기"). */
  id?: string;
  /** Shared `name` makes the group exclusive: one row open at a time. */
  name: string;
  title: string;
  children: ReactNode;
};

/* Detail accordion row shared by the solution sections (AX Infra, Learning Service & BPO).
 * Native <details>, so it needs no client state. */
const DetailAccordion = ({ id, name, title, children }: DetailAccordionProps) => (
  <details id={id} name={name} className="detail-accordion">
    <summary className="detail-accordion__summary">
      <h3 className="detail-accordion__title">{title}</h3>
      <span className="detail-accordion__chevron" aria-hidden="true" />
    </summary>
    <div className="detail-accordion__body">{children}</div>
  </details>
);

export default DetailAccordion;
