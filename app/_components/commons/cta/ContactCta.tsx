import LinkButton from "../buttons/LinkButton";
import ScrollReveal from "../reveal/ScrollReveal";

type ContactCtaProps = {
  title?: string;
  href?: string;
};

/* Shared contact CTA (preview .solution-contact; Figma 847:27590 / 847:28691). Server component; surface matches the header/hero tone. */
const ContactCta = ({
  title = "비즈니스 환경에 맞는 서비스 구성을 제안합니다.",
  href = "#",
}: ContactCtaProps) => {
  return (
    <section className="contact-cta" aria-labelledby="contact-cta-title">
      <ScrollReveal>
        <div className="contact-cta__inner">
          <h2
            id="contact-cta-title"
            className="contact-cta__title"
            data-reveal-item
          >
            {title}
          </h2>
          <LinkButton
            href={href}
            className="contact-cta__button"
            data-reveal-item
          >
            문의하기
          </LinkButton>
        </div>
      </ScrollReveal>
    </section>
  );
};

export default ContactCta;
