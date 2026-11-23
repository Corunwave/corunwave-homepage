"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

/* 목록에서 들어왔다면 history.back()으로 돌아가 필터·페이지·스크롤을 그대로 복원한다. */
const NewsBackLink = () => {
  const router = useRouter();

  return (
    <Link
      className="news-article__back"
      href="/news"
      onClick={(event) => {
        if (!document.referrer) return;
        const from = new URL(document.referrer);
        if (from.origin === window.location.origin && from.pathname === "/news") {
          event.preventDefault();
          router.back();
        }
      }}
    >
      목록으로
    </Link>
  );
};

export default NewsBackLink;
