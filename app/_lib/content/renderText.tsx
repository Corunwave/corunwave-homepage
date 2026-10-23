import { Fragment, type ReactNode } from "react";

type RenderTextOptions = {
  /** Class for `[[...]]` spans that must not break across lines. */
  keepClassName?: string;
  /** Class for the `<br />` that replaces each `\n`. */
  breakClassName?: string;
};

/* Minimal markup for serialized copy: `\n` -> <br />, `[[text]]` -> keep span. Pure, so server and client components can both use it. */
export const renderText = (
  text: string,
  { keepClassName, breakClassName }: RenderTextOptions = {},
): ReactNode =>
  text.split("\n").map((line, lineIndex) => (
    <Fragment key={lineIndex}>
      {lineIndex > 0 && <br className={breakClassName} />}
      {line.split(/(\[\[.*?\]\])/).map((part, partIndex) =>
        part.startsWith("[[") && part.endsWith("]]") ? (
          <span key={partIndex} className={keepClassName}>
            {part.slice(2, -2)}
          </span>
        ) : (
          part
        ),
      )}
    </Fragment>
  ));
