"use client";

import { useEffect, useRef } from "react";
import BorderedButton from "../commons/buttons/BorderedButton";

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const mobile = window.innerWidth <= 760;
        const range = mobile ? 200 : 320;
        const gutter = mobile ? 16 : 64;
        const topOffset = mobile ? 80 : 104;
        const bottomGap = mobile ? 16 : 32;
        const targetHeight = Math.min(
          480,
          window.innerHeight - topOffset - bottomGap,
        );
        const trackGap = mobile ? 16 : 32;

        const p = reducedMotion.matches
          ? 1
          : Math.min(1, Math.max(0, window.scrollY / range));

        const layoutWidth = document.documentElement.clientWidth;
        const targetWidth = mobile
          ? layoutWidth - gutter * 2
          : Math.min(1248, layoutWidth - gutter * 2);

        const width = layoutWidth - (layoutWidth - targetWidth) * p;
        const height =
          window.innerHeight + (targetHeight - window.innerHeight) * p;
        const cardTop = topOffset * p;
        const radius = (mobile ? 20 : 24) * p;
        const trackHeight = Math.max(
          window.innerHeight,
          range + topOffset + targetHeight + trackGap,
        );

        el.style.height = trackHeight + "px";
        el.style.setProperty("--hero-progress", p.toFixed(4));
        el.style.setProperty("--hero-top", cardTop + "px");
        el.style.setProperty("--hero-width", width + "px");
        el.style.setProperty("--hero-height", height + "px");
        el.style.setProperty("--hero-radius", radius + "px");
      });
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="hero"
      aria-labelledby="hero-slogan"
    >
      <h1 className="sr-only">코런웨이브</h1>
      <div className="hero__card">
        <picture className="hero__media">
          <source
            media="(max-width: 760px)"
            srcSet="/images/hero-mobile.png"
          />
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
      </div>
    </section>
  );
};

export default HeroSection;
