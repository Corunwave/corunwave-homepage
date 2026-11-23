import Image from "next/image";
import Link from "next/link";
import type { NewsListItem } from "@/app/_lib/news/newsMapper";
import { formatNewsDate } from "@/app/_lib/news/newsFormat";

type NewsCardProps = {
  item: NewsListItem;
  /** Above-the-fold cards load eagerly. */
  priority?: boolean;
  sizes?: string;
};

/* Shared news card (preview .news-card): thumbnail, tag, 2-line title, 2-line summary, date. */
const NewsCard = ({
  item,
  priority = false,
  sizes = "(width <= 760px) 100vw, (width <= 1024px) 50vw, 402px",
}: NewsCardProps) => (
  <Link className="news-card" href={`/news/${encodeURIComponent(item.slug)}`}>
    <div className="news-card__thumb">
      <Image
        src={item.thumbnailUrl}
        alt=""
        fill
        sizes={sizes}
        priority={priority}
        unoptimized={item.thumbnailUrl.endsWith(".svg")}
        className="news-card__image"
      />
    </div>
    <div className="news-card__body">
      <p className="news-card__tag">{item.tagLabel}</p>
      <h3 className="news-card__title">{item.title}</h3>
      {item.summary && <p className="news-card__summary">{item.summary}</p>}
      <time className="news-card__date" dateTime={item.publishedAt ?? undefined}>
        {formatNewsDate(item.publishedAt)}
      </time>
    </div>
  </Link>
);

export default NewsCard;
