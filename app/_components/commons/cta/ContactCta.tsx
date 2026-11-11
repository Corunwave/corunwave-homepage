import { getSiteSettings } from "@/app/_lib/cms/site";
import { renderText } from "../../../_lib/content/renderText";
import LinkButton from "../buttons/LinkButton";
import ScrollReveal from "../reveal/ScrollReveal";

type ContactCtaProps = {
  title?: string;
  href?: string;
};

/* Shared contact CTA (preview .solution-contact; Figma 847:27590 / 847:28691). Server component; surface matches the header/hero tone. */
const ContactCta = async ({ title, href }: ContactCtaProps) => {
  const { contactCta } = await getSiteSettings();

  return (
    <section className="contact-cta" aria-labelledby="contact-cta-title">
      <ScrollReveal>
        <div className="contact-cta__inner">
          <h2
            id="contact-cta-title"
            className="contact-cta__title"
            data-reveal-item
          >
            {renderText(title ?? contactCta.title, { keepClassName: "contact-cta__keep" })}
          </h2>
          <LinkButton
            href={href ?? contactCta.href}
            className="contact-cta__button"
            data-reveal-item
          >
            {contactCta.buttonLabel}
          </LinkButton>
        </div>
      </ScrollReveal>
    </section>
  );
};

export default ContactCta;
