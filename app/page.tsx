import BorderedButton from "./_components/commons/buttons/BorderedButton";

export default function Home() {
  return (
    <section id="hero" className="hero" aria-labelledby="hero-slogan">
      <h1 className="sr-only">코런웨이브</h1>
      <picture className="hero__media">
        <source media="(max-width: 760px)" srcSet="/images/hero-mobile.png" />
        <img
          src="/images/hero-desktop.png"
          alt=""
          aria-hidden="true"
          fetchPriority="high"
          decoding="async"
        />
      </picture>
      <div className="hero__overlay" aria-hidden="true" />
      <div className="hero__content">
        <h2 id="hero-slogan" className="hero__title">
          Innovation Together,
          <br />
          Creating Waves
        </h2>
        <p className="hero__description">
          AX Infra와 Learning Service를 연결해 기술 도입부터
          <br />
          운영, 인재 육성까지 이어지는 서비스를 제공합니다.
        </p>
        <BorderedButton href="/solutions">
          솔루션 바로보기
          <span className="bordered-button__arrow" aria-hidden="true">
            →
          </span>
        </BorderedButton>
      </div>
    </section>
  );
}
