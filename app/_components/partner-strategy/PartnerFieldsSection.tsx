import Image from "next/image";
import type { PartnerFieldsContent } from "../../_content/partner-strategy";

type PartnerFieldsSectionProps = { content: PartnerFieldsContent };

/* Partner fields "함께 찾는 파트너" (preview .partner-fields; Figma 876:28695 / 876:29889). Static server component. */
const PartnerFieldsSection = ({ content }: PartnerFieldsSectionProps) => {
  return (
    <section
      id="partner-fields"
      className="partner-section"
      aria-labelledby="partner-fields-title"
    >
      <div className="partner-inner">
        <h2 id="partner-fields-title" className="partner-heading">
          {content.title}
        </h2>
        <div className="partner-fields">
          {content.fields.map(({ id, title, image, items }) => (
            <article
              key={id}
              className={`partner-field partner-field--${id}`}
            >
              <Image
                className="partner-field__photo"
                src={image}
                alt=""
                aria-hidden="true"
                width={1400}
                height={1000}
                sizes="(max-width: 1024px) 100vw, 416px"
              />
              <div className="partner-field__content">
                <h3 className="partner-field__title">{title}</h3>
                <ul className="partner-field__list">
                  {items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnerFieldsSection;
