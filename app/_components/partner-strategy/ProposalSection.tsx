import Image from "next/image";
import { Fragment } from "react";
import LinkButton from "../commons/buttons/LinkButton";
import type {
  ProposalCardContent,
  ProposalContent,
} from "../../_content/partner-strategy";

type ProposalSectionProps = { content: ProposalContent };

const DownloadIcon = () => (
  <svg
    className="partner-proposal__icon"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5" />
  </svg>
);

/* A portfolio without an href stays an enabled, inert button until the file is linked. */
const DownloadControl = ({ download }: Pick<ProposalCardContent, "download">) => {
  const className = "partner-proposal__button partner-proposal__button--download";
  const label = (
    <>
      {download.label} <DownloadIcon />
    </>
  );

  if (!download.href) {
    return (
      <button type="button" className={className} aria-label={download.ariaLabel}>
        {label}
      </button>
    );
  }

  return (
    <LinkButton
      href={download.href}
      className={className}
      download={download.fileName}
      aria-label={download.ariaLabel}
    >
      {label}
    </LinkButton>
  );
};

/* Cooperation proposal "협력 제안" (preview #partner-university, outputs/partner-proposal-1027). Static server component. */
const ProposalSection = ({ content }: ProposalSectionProps) => {
  return (
    <section
      id="partner-proposal"
      className="partner-section partner-section--ruled"
      aria-labelledby="partner-proposal-title"
    >
      <div className="partner-inner">
        <h2
          id="partner-proposal-title"
          className="partner-heading partner-proposal__heading"
        >
          {content.title}
        </h2>

        <div className="partner-proposal__partnership">
          {content.brands.map((brand, index) => (
            <Fragment key={brand.name}>
              {index > 0 && (
                <span className="partner-proposal__times" aria-hidden="true">
                  ×
                </span>
              )}
              <div className="partner-proposal__brand">
                <p className="partner-proposal__brand-description">
                  {brand.description}
                </p>
                <Image
                  className="partner-proposal__logo"
                  src={brand.logo.src}
                  alt={brand.name}
                  width={brand.logo.width}
                  height={brand.logo.height}
                />
              </div>
            </Fragment>
          ))}
        </div>

        <div className="partner-proposal__grid">
          {content.cards.map((card) => (
            <article
              key={card.id}
              className={`partner-proposal__card partner-proposal__card--${card.id}`}
              aria-labelledby={`partner-proposal-${card.id}-title`}
            >
              <h3
                id={`partner-proposal-${card.id}-title`}
                className="partner-proposal__title"
              >
                <span className="partner-proposal__audience">{card.audience}</span>
                <br />
                {card.title}
              </h3>
              <p className="partner-proposal__lead">{card.lead}</p>
              <p className="partner-proposal__body">{card.body}</p>
              <DownloadControl download={card.download} />
            </article>
          ))}
        </div>

        <div className="partner-proposal__footer">
          <LinkButton
            href={content.contact.href}
            className="partner-proposal__button partner-proposal__button--contact"
          >
            {content.contact.label} <span aria-hidden="true">→</span>
          </LinkButton>
        </div>
      </div>
    </section>
  );
};

export default ProposalSection;
