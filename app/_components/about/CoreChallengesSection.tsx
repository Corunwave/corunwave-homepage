"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";

type ChallengeId = "internalization" | "orchestration" | "continuity";

interface Challenge {
  id: ChallengeId;
  title: string;
  body: string;
  image: string;
}

const CHALLENGES: Challenge[] = [
  {
    id: "internalization",
    title: "기술 내재화의 공백",
    body: "현업에 필요한 역량과 현재 역량의 차이를 진단(TNA)하고, 부족한 역량에 맞춰 인프라와 교육을 설계해 현장 문제를 해결하는 실습(PBL)으로 연결합니다. 실무 역량을 높여 기술과 인재의 격차를 줄이고, 기술 도입 리스크를 최소화합니다.",
    image: "/images/company/challenge-abstract-internalization.jpg",
  },
  {
    id: "orchestration",
    title: "전략적 조율의 부재",
    body: "적합한 장비와 소프트웨어를 선정(Vendor Solution Matching)하고, 도입 전 검증(PoC)과 총소유비용(TCO) 절감 설계를 하나의 관리 창구에서 조율합니다. 특정 공급사에 종속되지 않는 솔루션 설계와 통합 관리로 투자 불확실성을 줄입니다.",
    image: "/images/company/challenge-abstract-orchestration.jpg",
  },
  {
    id: "continuity",
    title: "지속 가능성의 한계",
    body: "정기적인 인프라 성능 분석과 학습 성과 검증(Feedback Loop)을 바탕으로 운영 경험을 교육과 인프라 고도화에 반영합니다. 서비스를 유연하게 확장하고 역량을 지속적으로 개선(Continuous Improvement)해 비즈니스 연속성을 강화합니다.",
    image: "/images/company/challenge-abstract-continuity.jpg",
  },
];

const LAST_STEP = CHALLENGES.length - 1;
/* Progress runs 0 → CHALLENGES.length: each step holds, then blends into the next over its last 30%. */
const MAX_PROGRESS = CHALLENGES.length;
const BLEND_START = 0.7;
const COPY_SHIFT = 12;

const DESKTOP_QUERY = "(min-width: 1025px)";
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

const subscribeScrollMode = (onChange: () => void) => {
  const queries = [DESKTOP_QUERY, REDUCED_MOTION_QUERY].map((query) =>
    window.matchMedia(query),
  );
  queries.forEach((query) => query.addEventListener("change", onChange));
  return () =>
    queries.forEach((query) => query.removeEventListener("change", onChange));
};

const readScrollMode = () =>
  window.matchMedia(DESKTOP_QUERY).matches &&
  !window.matchMedia(REDUCED_MOTION_QUERY).matches;

/* Server and no-JS render the stacked (flow) layout. */
const readScrollModeOnServer = () => false;

const clamp = (value: number, min = 0, max = 1) =>
  Math.min(max, Math.max(min, value));

const readPixelVar = (element: HTMLElement, name: string) =>
  parseFloat(getComputedStyle(element).getPropertyValue(name)) || 0;

const SCROLL_VARS = [
  "--challenge-background-opacity",
  "--challenge-copy-opacity",
  "--challenge-copy-shift",
];

/* Core challenges "핵심과제" (preview .core-challenges; Figma 790:20440 / 674:20307 / 674:20268). */
const CoreChallengesSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const geometryRef = useRef({ start: 0, height: 1 });
  const [activeIndex, setActiveIndex] = useState(0);
  const [fits, setFits] = useState(true);

  const canScroll = useSyncExternalStore(
    subscribeScrollMode,
    readScrollMode,
    readScrollModeOnServer,
  );
  const mode = canScroll && fits ? "scroll" : "flow";

  /* Title height feeds the CSS layout; the stage must fit title + copy + controls or we stay in flow. */
  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    if (!section || !title) return;

    const copies = Array.from(
      section.querySelectorAll<HTMLElement>(".challenge-copy"),
    );
    let frame = 0;
    let disposed = false;

    const measure = () => {
      frame = 0;
      const titleHeight = Math.ceil(title.getBoundingClientRect().height);
      section.style.setProperty("--challenges-title-height", `${titleHeight}px`);

      const stageHeight =
        window.innerHeight -
        readPixelVar(section, "--header-height-desktop-scrolled");
      const required =
        readPixelVar(section, "--challenges-stage-padding") * 2 +
        readPixelVar(section, "--challenges-stack-gap") * 2 +
        readPixelVar(section, "--challenges-controls-height") +
        titleHeight +
        Math.max(...copies.map((copy) => copy.scrollHeight));
      setFits(stageHeight >= required);
    };
    const schedule = () => {
      if (disposed || frame) return;
      frame = requestAnimationFrame(measure);
    };

    measure();
    const observer = new ResizeObserver(schedule);
    observer.observe(title);
    copies.forEach((copy) => observer.observe(copy));
    window.addEventListener("resize", schedule);
    document.fonts?.ready.then(schedule);

    return () => {
      disposed = true;
      if (frame) cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("resize", schedule);
    };
  }, []);

  useEffect(() => {
    if (mode !== "scroll") return;

    const section = sectionRef.current;
    const track = trackRef.current;
    const stage = stageRef.current;
    if (!section || !track || !stage) return;

    const backdrops = Array.from(
      section.querySelectorAll<HTMLElement>(".challenge-backdrop"),
    );
    const scenes = Array.from(
      section.querySelectorAll<HTMLElement>(".challenge-scene"),
    );
    let frame = 0;
    let progress = 0;

    const measure = () => {
      const stickyTop = parseFloat(getComputedStyle(stage).top) || 0;
      geometryRef.current = {
        start: track.getBoundingClientRect().top + window.scrollY - stickyTop,
        height: Math.max(1, stage.offsetHeight),
      };
    };

    const render = () => {
      frame = 0;
      measure();
      const { start, height } = geometryRef.current;
      progress = clamp((window.scrollY - start) / height, 0, MAX_PROGRESS);

      const base = Math.min(LAST_STEP, Math.floor(progress));
      const blend =
        base < LAST_STEP
          ? clamp((progress - base - BLEND_START) / (1 - BLEND_START))
          : 0;
      const fadeOut = clamp(blend * 2);
      const fadeIn = clamp(blend * 2 - 1);

      backdrops.forEach((backdrop, index) => {
        const opacity = index <= base ? 1 : index === base + 1 ? blend : 0;
        backdrop.style.setProperty(
          "--challenge-background-opacity",
          String(opacity),
        );
      });
      scenes.forEach((scene, index) => {
        const opacity =
          index === base ? 1 - fadeOut : index === base + 1 ? fadeIn : 0;
        const shift =
          index === base
            ? -COPY_SHIFT * fadeOut
            : index === base + 1
              ? COPY_SHIFT * (1 - fadeIn)
              : 0;
        scene.style.setProperty("--challenge-copy-opacity", String(opacity));
        scene.style.setProperty("--challenge-copy-shift", `${shift}px`);
      });
      setActiveIndex(blend >= 0.5 ? base + 1 : base);
    };

    const schedule = () => {
      if (frame) return;
      frame = requestAnimationFrame(render);
    };

    /* Keep the current step in view when the stage height changes. */
    const handleResize = () => {
      const previous = progress;
      measure();
      if (previous > 0 && previous < MAX_PROGRESS) {
        const { start, height } = geometryRef.current;
        window.scrollTo({ top: start + previous * height, behavior: "instant" });
      }
      schedule();
    };

    render();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", handleResize);
      [...backdrops, ...scenes].forEach((element) =>
        SCROLL_VARS.forEach((name) => element.style.removeProperty(name)),
      );
    };
  }, [mode]);

  const selectChallenge = (index: number) => {
    const { start, height } = geometryRef.current;
    window.scrollTo({ top: start + index * height, behavior: "smooth" });
  };

  return (
    <section
      id="core-challenges"
      ref={sectionRef}
      className="challenges-section"
      aria-labelledby="challenges-title"
      data-mode={mode}
    >
      <div ref={trackRef} className="challenges-track">
        <div ref={stageRef} className="challenges-stage">
          <div className="challenges-backdrops" aria-hidden="true">
            {CHALLENGES.map(({ id, image }) => (
              <div key={id} className="challenge-backdrop">
                <Image
                  className="challenge-photo"
                  src={image}
                  alt=""
                  fill
                  sizes="100vw"
                />
              </div>
            ))}
          </div>

          <h2 id="challenges-title" ref={titleRef} className="challenges-title">
            코런웨이브가 해결하고자 하는 핵심과제
          </h2>

          <div className="challenges-scenes">
            {CHALLENGES.map(({ id, title, body }, index) => (
              <article
                key={id}
                id={`challenge-${id}`}
                className="challenge-scene"
                aria-labelledby={`challenge-${id}-title`}
                aria-hidden={
                  mode === "scroll" && index !== activeIndex ? true : undefined
                }
              >
                <div className="challenge-content">
                  <div className="challenge-copy">
                    <h3 id={`challenge-${id}-title`} className="challenge-heading">
                      {title}
                    </h3>
                    <p className="challenge-body">{body}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <nav className="challenges-controls" aria-label="핵심과제 항목 선택">
            {CHALLENGES.map(({ id, title }, index) => (
              <button
                key={id}
                type="button"
                className="challenge-choice"
                aria-controls={`challenge-${id}`}
                aria-current={index === activeIndex ? "step" : undefined}
                onClick={() => selectChallenge(index)}
              >
                <span className="challenge-number" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span>{title}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>
    </section>
  );
};

export default CoreChallengesSection;
