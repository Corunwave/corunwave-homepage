import { renderText } from "../../../_lib/content/renderText";
import type { BulletItem } from "../../../_content/solutions";

type BulletListProps = {
  items: readonly BulletItem[];
  /** Section class that sets the typography (the list itself only draws bullets and hierarchy). */
  className?: string;
};

/* Solution bullet list: an item with `children` is a bold title bullet, its content sits one level below.
 * Shared by the AX Infra map/accordions and the Learning Service table/accordions. */
const BulletList = ({ items, className }: BulletListProps) => (
  <ul className={className ? `bullet-list ${className}` : "bullet-list"}>
    {items.map(({ text, children }) => (
      <li key={text} className="bullet-list__item">
        {renderText(text)}
        {children && (
          <ul className="bullet-list__sub">
            {children.map((child) => (
              <li key={child} className="bullet-list__sub-item">
                {renderText(child)}
              </li>
            ))}
          </ul>
        )}
      </li>
    ))}
  </ul>
);

export default BulletList;
