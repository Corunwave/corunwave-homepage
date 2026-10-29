export type LegalTableRow = {
  label: string;
  value: string;
};

export type LegalClause = {
  id: string;
  title: string;
  body?: string;
  table?: {
    caption: string;
    rows: readonly LegalTableRow[];
  };
};

export type LegalMetaItem = {
  label: string;
  value: string;
};

type LegalDocumentProps = {
  idPrefix: string;
  title: string;
  effectiveDate: string;
  intro: string;
  extraMeta?: readonly LegalMetaItem[];
  clauses: readonly LegalClause[];
};

/* Legal body shared by privacy policy / service terms (preview legal-section). Static server component. */
const LegalDocument = ({
  idPrefix,
  title,
  effectiveDate,
  intro,
  extraMeta = [],
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
          {extraMeta.map(({ label, value }) => (
            <span key={label}>
              {label}: {value}
            </span>
          ))}
        </div>
        <p className="legal-section__intro">{intro}</p>
        {clauses.map(({ id, title: clauseTitle, body, table }) => (
          <section key={id} className="legal-clause" aria-labelledby={id}>
            <h3 id={id} className="legal-clause__title">
              {clauseTitle}
            </h3>
            {body && <p className="legal-clause__body">{body}</p>}
            {table && (
              <table className="legal-table">
                <caption className="sr-only">{table.caption}</caption>
                <tbody>
                  {table.rows.map(({ label, value }) => (
                    <tr key={label}>
                      <th scope="row">{label}</th>
                      <td>{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </section>
        ))}
      </div>
    </section>
  );
};

export default LegalDocument;
