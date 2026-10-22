import Image from "next/image";

type PartnerLogo = {
  name: string;
  src: string;
  /** Intrinsic size, so next/image keeps the file's aspect ratio. */
  width: number;
  height: number;
};

const PARTNER_LOGOS: PartnerLogo[] = [
  {
    name: "Palo Alto Networks",
    src: "/images/partner/logos/paloalto.svg",
    width: 348,
    height: 65,
  },
  {
    name: "HeyGen",
    src: "/images/partner/logos/heygen.svg",
    width: 241,
    height: 143,
  },
  {
    name: "XSLAB(엑세스랩)",
    src: "/images/partner/logos/xslab.png",
    width: 1780,
    height: 303,
  },
  {
    name: "Odoo",
    src: "/images/partner/logos/odoo.svg",
    width: 919,
    height: 495,
  },
  {
    name: "IBM",
    src: "/images/partner/logos/ibm.svg",
    width: 1306,
    height: 734,
  },
];

/* The track repeats the group twice and slides by -50%, so the second copy is hidden from assistive tech. */
const LogoGroup = ({ hidden = false }: { hidden?: boolean }) => (
  <div className="partner-logo-group" aria-hidden={hidden || undefined}>
    {PARTNER_LOGOS.map(({ name, src, width, height }) => (
      <div key={name} className="partner-logo">
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
const PartnerLogosSection = () => {
  return (
    <section
      id="partner-logos"
      className="partner-section"
      aria-labelledby="partner-logos-title"
    >
      <div className="partner-inner">
        <h2 id="partner-logos-title" className="partner-heading">
          파트너사
        </h2>
        <div
          className="partner-marquee"
          role="group"
          tabIndex={0}
          aria-label="파트너사 로고, 포커스 시 흐름 일시정지"
        >
          <div className="partner-marquee__track">
            <LogoGroup />
            <LogoGroup hidden />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnerLogosSection;
