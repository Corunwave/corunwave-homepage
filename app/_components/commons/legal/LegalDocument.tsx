export type LegalClause = {
  id: string;
  title: string;
  body: string;
};

type LegalDocumentProps = {
  idPrefix: string;
  title: string;
  effectiveDate: string;
  intro: string;
  clauses: readonly LegalClause[];
};

/* Legal body shared by privacy policy / service terms (preview legal-section). Static server component. */
const LegalDocument = ({
  idPrefix,
  title,
  effectiveDate,
  intro,
  clauses,
}: LegalDocumentProps) => {
  const titleId = `${idPrefix}-body-title`;

  return (
    <section className="legal-section" aria-labelledby={titleId}>
      <header className="legal-section__heading">
        <h2 id={titleId} className="legal-section__title">
          {title}
        </h2>
      </header>
      <div className="legal-section__copy">
        <div className="legal-section__meta">
          <span>시행일: {effectiveDate}</span>
        </div>
        <p className="legal-section__intro">{intro}</p>
        {clauses.map(({ id, title: clauseTitle, body }) => (
          <section key={id} className="legal-clause" aria-labelledby={id}>
            <h3 id={id} className="legal-clause__title">
              {clauseTitle}
            </h3>
            <p className="legal-clause__body">{body}</p>
          </section>
        ))}
      </div>
    </section>
  );
};

export default LegalDocument;
