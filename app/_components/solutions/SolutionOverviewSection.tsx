import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "../commons/reveal/ScrollReveal";

const AX_LABEL = "AX Infra & IT Outsourcing";
const LEARNING_LABEL = "Learning Service & BPO";

const STAGES: { title: string; ax: string; learning: string }[] = [
  { title: "기획", ax: "최적의 전략 수립", learning: "전략적 분석 및 목표설정" },
  { title: "설계", ax: "기술적 무결성", learning: "방법론 혁신" },
  { title: "구축/개발", ax: "현장 구현 및 통합", learning: "실무 적합성" },
  { title: "운영", ax: "안정성 및 성과 보장", learning: "품질 및 효율보장" },
];

const CARDS: {
  id: string;
  title: string;
  image: string;
  description: string[];
}[] = [
  {
    id: "ax-infra",
    title: AX_LABEL,
    image: "/images/solution/ax-infra-resin-purple.png",
    description: [
      "설계부터 책임 운영까지,",
      "비즈니스 연속성을 완성하는 AX 인프라 파트너",
    ],
  },
  {
    id: "learning",
    title: LEARNING_LABEL,
    image: "/images/solution/learning-resin-coral.png",
    description: ["기술 트렌드를 반영한 전략적 인재양성 파트너"],
  },
];

/* Solution overview "통합 End-to-End 서비스" (preview .solution-overview; Figma 847:27513 / 847:28614). Server component; ScrollReveal only scopes the reveal. */
const SolutionOverviewSection = () => {
  return (
    <section
      className="solution-overview"
      aria-labelledby="solution-overview-title"
    >
      <ScrollReveal>
        <div className="solution-overview__inner">
          <h2
            id="solution-overview-title"
            className="solution-heading"
            data-reveal-item
          >
            통합 End-to-End 서비스
          </h2>

          <ol className="solution-process">
            {STAGES.map(({ title, ax, learning }) => (
              <li key={title} className="solution-stage" data-reveal-item>
                <h3 className="solution-stage__title">{title}</h3>
                <div className="solution-stage__item">
                  <p className="solution-stage__label">{AX_LABEL}</p>
                  <p className="solution-stage__value">{ax}</p>
                </div>
                <div className="solution-stage__item">
                  <p className="solution-stage__label">{LEARNING_LABEL}</p>
                  <p className="solution-stage__value">{learning}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="solution-overview-cards">
            {CARDS.map(({ id, title, image, description }) => (
              <Link
                key={id}
                href={`/solutions?tab=${id}#solution-services`}
                className={`solution-overview-card solution-overview-card--${id}`}
                data-reveal-item
              >
                <span className="solution-overview-card__arrow" aria-hidden="true">
                  ↗
                </span>
                <Image
                  className="solution-overview-card__image"
                  src={image}
                  width={1254}
                  height={1254}
                  sizes="224px"
                  alt=""
                  aria-hidden="true"
                />
                <h3 className="solution-overview-card__title">{title}</h3>
                <p className="solution-overview-card__description">
                  {description.map((line, index) => (
                    <span key={line} className="solution-overview-card__line">
                      {line}
                      {index < description.length - 1 && <br />}
                    </span>
                  ))}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
};

export default SolutionOverviewSection;
