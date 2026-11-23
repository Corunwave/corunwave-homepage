import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { RichText } from "@payloadcms/richtext-lexical/react";
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import NewsAttachments from "@/app/_components/news/NewsAttachments";
import NewsBackLink from "@/app/_components/news/NewsBackLink";
import ShareButton from "@/app/_components/news/ShareButton";
import { getNewsBySlug, getNewsNeighbors } from "@/app/_lib/cms/news";
import { sharedOpenGraph } from "@/app/_lib/metadata";
import { formatNewsDate } from "@/app/_lib/news/newsFormat";
import { NEWS_PLACEHOLDER_IMAGE } from "@/app/_lib/news/newsRules";

// 주소의 한글 slug는 퍼센트 인코딩된 채 들어올 수 있다.
const readSlug = (raw: string) => {
  try {
    return decodeURIComponent(raw);
  } catch {
    return raw;
  }
};

export async function generateMetadata({ params }: PageProps<"/news/[slug]">): Promise<Metadata> {
  const article = await getNewsBySlug(readSlug((await params).slug));
  if (!article) return { title: "소식" };

  const image = article.thumbnailUrl !== NEWS_PLACEHOLDER_IMAGE ? article.thumbnailUrl : null;
  return {
    title: article.title,
    description: article.summary ?? undefined,
    openGraph: {
      ...sharedOpenGraph,
      type: "article",
      title: `${article.title} · 코런웨이브`,
      description: article.summary ?? undefined,
      publishedTime: article.publishedAt ?? undefined,
      ...(image ? { images: [{ url: image, alt: article.title }] } : {}),
    },
  };
}

export default async function NewsArticlePage({ params }: PageProps<"/news/[slug]">) {
  const article = await getNewsBySlug(readSlug((await params).slug));
  if (!article) notFound();
  const { older, newer } = await getNewsNeighbors(article.publishedAt);

  return (
    <main>
      <article className="news-article">
        <header className="news-article__header">
          <NewsBackLink />
          <p className="news-article__tag">{article.tagLabel}</p>
          <h1 className="news-article__title">{article.title}</h1>
          <time className="news-article__date" dateTime={article.publishedAt ?? undefined}>
            {formatNewsDate(article.publishedAt)}
          </time>
        </header>

        <div className="news-article__content">
          <RichText data={article.content as SerializedEditorState} />
        </div>

        <NewsAttachments files={article.attachments} />

        <div className="news-article__actions">
          <ShareButton title={article.title} />
        </div>

        <nav className="news-article__neighbors" aria-label="이전·다음 소식">
          {older ? (
            <Link className="news-neighbor" href={`/news/${encodeURIComponent(older.slug)}`} rel="prev">
              <span className="news-neighbor__label">이전글</span>
              <span className="news-neighbor__title">{older.title}</span>
            </Link>
          ) : (
            <span className="news-neighbor news-neighbor--empty" />
          )}
          {newer ? (
            <Link className="news-neighbor news-neighbor--next" href={`/news/${encodeURIComponent(newer.slug)}`} rel="next">
              <span className="news-neighbor__label">다음글</span>
              <span className="news-neighbor__title">{newer.title}</span>
            </Link>
          ) : (
            <span className="news-neighbor news-neighbor--empty" />
          )}
        </nav>

        <div className="news-article__footer">
          <Link className="news-article__to-list" href="/news">
            목록으로
          </Link>
        </div>
      </article>
    </main>
  );
}
