import Image from "next/image";
import type {
  PartnerLogoContent,
  PartnerLogosContent,
} from "../../_content/partner-strategy";

type PartnerLogosSectionProps = { content: PartnerLogosContent };

/* The track repeats the group twice and slides by -50%, so the second copy is hidden from assistive tech. */
const LogoGroup = ({
  logos,
  hidden = false,
}: {
  logos: readonly PartnerLogoContent[];
  hidden?: boolean;
}) => (
  <div className="partner-logo-group" aria-hidden={hidden || undefined}>
    {logos.map(({ id, name, src, width, height }) => (
      <div key={id} className="partner-logo">
        <Image
          src={src}
          alt={hidden ? "" : name}
          width={width}
          height={height}
        />
      </div>
    ))}
  </div>
);

/* Partner logos "파트너사" (preview .partner-marquee; Figma 876:28855 / 876:30053).
 * Figma draws the static state; the preview's marquee motion is kept (paused on hover/focus, static with reduced motion). */
const PartnerLogosSection = ({ content }: PartnerLogosSectionProps) => {
  const logos = content.logos.filter(({ visible }) => visible);
  if (!content.enabled || logos.length === 0) return null;

  return (
    <section
      id="partner-logos"
      className="partner-section"
      aria-labelledby="partner-logos-title"
    >
      <div className="partner-inner">
        <h2 id="partner-logos-title" className="partner-heading">
          {content.title}
        </h2>
        <div
          className="partner-marquee"
          role="group"
          tabIndex={0}
          aria-label={content.ariaLabel}
        >
          <div className="partner-marquee__track">
            <LogoGroup logos={logos} />
            <LogoGroup logos={logos} hidden />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnerLogosSection;
