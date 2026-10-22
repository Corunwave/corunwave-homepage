import Link from "next/link";

const DESCRIPTION =
  "AX 인프라 및 Leaning 기업 “코런웨이브(CORUNWAVE)”가 국산 서버, AI컴퓨팅 솔루션 기업인 “엑세스랩(XSLAB)”과 손잡고 대학 교육 및 연구에 최적화된 저전력, 고성능 AI통합솔루션을 제안합니다.";

/* University proposal "대학 맞춤형 AI Platform" (preview .partner-university; Figma 876:28845 / 876:30043). Static server component. */
const UniversityProposalSection = () => {
  return (
    <section
      id="partner-university"
      className="partner-section partner-section--ruled"
      aria-labelledby="partner-university-title"
    >
      <div className="partner-inner">
        <div className="partner-university">
          <div className="partner-university__intro">
            <span className="partner-university__label">협력 제안</span>
            <h2
              id="partner-university-title"
              className="partner-heading partner-university__title"
            >
              대학 맞춤형
              <br />
              AI Platform
            </h2>
            <Link href="#" className="partner-university__link">
              문의하기 <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <p className="partner-university__description">{DESCRIPTION}</p>
        </div>
      </div>
    </section>
  );
};

export default UniversityProposalSection;
