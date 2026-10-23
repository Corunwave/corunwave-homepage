import type { CollaborationProcessContent } from "../../_content/partner-strategy";

type CollaborationProcessSectionProps = { content: CollaborationProcessContent };

/* Collaboration process "협업 프로세스" (preview .partner-flow / .partner-process-step; Figma 876:28731 / 876:29925, states 925:30454~).
 * Static server component: the accordion is native <details> (initially closed, several can stay open) — no client JS. */
const CollaborationProcessSection = ({
  content,
}: CollaborationProcessSectionProps) => {
  return (
    <section
      id="partner-process"
      className="partner-section"
      aria-labelledby="partner-process-title"
    >
      <div className="partner-inner">
        <h2 id="partner-process-title" className="partner-heading">
          {content.title}
        </h2>

        <ol className="partner-flow" aria-label={content.flowLabel}>
          {content.stages.map(({ name }) => (
            <li key={name} className="partner-flow__stage">
              {name}
            </li>
          ))}
        </ol>

        <div className="partner-process-list">
          {content.stages.map(({ name, roles }) => (
            <details key={name} className="partner-process-step">
              <summary className="partner-process-step__summary">
                {name}
              </summary>
              <div className="partner-process-step__body">
                <div className="partner-role-grid">
                  {content.roleNames.map((role, index) => (
                    <div key={role} className="partner-role">
                      <h4 className="partner-role__name">{role}</h4>
                      <p className="partner-role__text">{roles[index]}</p>
                    </div>
                  ))}
                </div>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CollaborationProcessSection;
