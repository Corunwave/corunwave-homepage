import type { Metadata } from "next";
import PageHero from "../_components/commons/hero/PageHero";

const title = "소식";
const description = "코런웨이브의 새로운 소식을 확인해보세요.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title: `${title} · 코런웨이브`,
    description,
    type: "website",
    locale: "ko_KR",
  },
};

export default function NewsPage() {
  return (
    <main>
      <PageHero title={title} description={description} />
      <section className="news-section" aria-labelledby="news-notice-title">
        <div className="news-notice">
          <h2 id="news-notice-title" className="news-notice__title">
            페이지를 준비하고 있습니다
          </h2>
          <p className="news-notice__description">
            곧 새로운 소식으로 찾아뵙겠습니다.
          </p>
        </div>
      </section>
    </main>
  );
}
