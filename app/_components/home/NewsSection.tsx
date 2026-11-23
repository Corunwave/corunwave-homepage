"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import NewsCard from "@/app/_components/news/NewsCard";
import type { NewsListItem } from "@/app/_lib/news/newsMapper";

type NewsSectionProps = { title: string; items: readonly NewsListItem[] };

const NARROW_QUERY = "(width <= 760px)";
const CARD_SIZES = "(width <= 760px) 100vw, 402px";

/* Home news (preview .news-section): 3-up carousel (1-up on mobile) ending with a "더보기" card. */
const NewsSection = ({ title, items }: NewsSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(3);

  const slideCount = items.length + 1; // + 더보기 카드
  const max = Math.max(0, slideCount - visible);
  const current = Math.min(index, max);

  useEffect(() => {
    const media = window.matchMedia(NARROW_QUERY);
    const sync = () => setVisible(media.matches ? 1 : 3);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      section.dataset.reveal = "visible";
      return;
    }
    section.dataset.reveal = "pending";
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        section.dataset.reveal = "visible";
        observer.disconnect();
      },
      { threshold: 0.16, rootMargin: "0px 0px -8%" },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const move = useCallback((step: number) => setIndex(Math.max(0, Math.min(max, current + step))), [current, max]);

  return (
    <section ref={sectionRef} id="news" className="home-news" aria-labelledby="home-news-title">
      <div className="home-news__inner">
        <header className="home-news__header">
          <h2 id="home-news-title" className="home-news__title">
            {title}
          </h2>
        </header>
        <div className="home-news__viewport">
          <div className="home-news__track" data-index={current}>
            {items.map((item) => (
              <div key={item.id} className="home-news__slide">
                <NewsCard item={item} sizes={CARD_SIZES} />
              </div>
            ))}
            <div className="home-news__slide">
              <Link className="home-news__more" href="/news" aria-label="소식 더보기">
                <span className="home-news__more-circle" aria-hidden="true">
                  →
                </span>
                <span className="home-news__more-label">더보기</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="home-news__controls">
          <button type="button" className="home-news__control" aria-label="이전 소식" disabled={current === 0} onClick={() => move(-1)}>
            ←
          </button>
          <button type="button" className="home-news__control" aria-label="다음 소식" disabled={current >= max} onClick={() => move(1)}>
            →
          </button>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
