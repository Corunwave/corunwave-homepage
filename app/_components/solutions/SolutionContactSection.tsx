import LinkButton from "../commons/buttons/LinkButton";
import ScrollReveal from "../commons/reveal/ScrollReveal";

/* Solution contact CTA (preview .solution-contact; Figma 847:27590 / 847:28691). Server component; surface matches the header/hero tone. */
const SolutionContactSection = () => {
  return (
    <section className="solution-contact" aria-labelledby="solution-contact-title">
      <ScrollReveal>
        <div className="solution-contact__inner">
          <h2
            id="solution-contact-title"
            className="solution-contact__title"
            data-reveal-item
          >
            비즈니스 환경에 맞는 서비스 구성을 제안합니다.
          </h2>
          <LinkButton
            href="#"
            className="solution-contact__button"
            data-reveal-item
          >
            문의하기
          </LinkButton>
        </div>
      </ScrollReveal>
    </section>
  );
};

export default SolutionContactSection;
