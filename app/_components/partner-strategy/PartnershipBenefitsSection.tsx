import ScrollReveal from "../commons/reveal/ScrollReveal";

type Benefit = {
  title: string;
  english: string;
};

type Strategy = {
  term: string;
  title: string;
  description: string;
};

const BENEFITS: Benefit[] = [
  { title: "비즈니스 규모의 확장", english: "Scalability & Reliability" },
  { title: "운영 탁월성 확보", english: "Operational Excellence" },
  { title: "통합 솔루션의 완성", english: "Value Integration" },
  { title: "전략적 자원 최적화", english: "Resource Efficiency" },
];

const STRATEGIES: Strategy[] = [
  {
    term: "short-term",
    title: "레퍼런스 공유 및 공동 수주",
    description:
      "파트너사의 기존 레퍼런스를 코런웨이브의 기획력으로 재포장하여 신규 시장을 공동 개척합니다.",
  },
  {
    term: "mid-term",
    title: "서비스 표준화 및 패키징",
    description:
      "개별 프로젝트 단위의 협업을 넘어 공동 브랜드 상품을 개발하여 시장 지배력을 높입니다.",
  },
  {
    term: "long-term",
    title: "플랫폼 생태계 완성",
    description:
      "협업 파트너들이 자발적으로 기회를 제안하고 성과를 나누는 선순환 구조를 완성합니다.",
  },
];

/* Partnership benefits "파트너십 기대효과" + To-be strategy (preview .partner-benefits / .partner-strategy; Figma 876:28767 / 876:29963).
 * Server component; ScrollReveal only marks the benefits for the staggered entry. */
const PartnershipBenefitsSection = () => {
  return (
    <section
      id="partner-benefits"
      className="partner-section partner-section--subtle"
      aria-labelledby="partner-benefits-title"
    >
      <ScrollReveal>
        <div className="partner-inner">
          <h2 id="partner-benefits-title" className="partner-heading">
            파트너십 기대효과
          </h2>
          <div className="partner-benefits">
            {BENEFITS.map(({ title, english }) => (
              <article key={title} className="partner-benefit" data-reveal-item>
                <h3 className="partner-benefit__title">{title}</h3>
                <p className="partner-benefit__english">{english}</p>
              </article>
            ))}
          </div>

          <div className="partner-strategy">
            <h3 className="partner-strategy__heading">
              파트너십 성공을 위한 To-be 전략
            </h3>
            <div className="partner-strategy__grid">
              {STRATEGIES.map(({ term, title, description }) => (
                <article key={term} className="partner-strategy__card">
                  <p className="partner-strategy__term">{term}</p>
                  <h4 className="partner-strategy__title">{title}</h4>
                  <p className="partner-strategy__description">{description}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
};

export default PartnershipBenefitsSection;
