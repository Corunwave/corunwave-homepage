"use client";

import { useState } from "react";

/* 링크 복사. 터치 기기에서 Web Share를 쓸 수 있으면 공유 시트를 연다. */
const ShareButton = ({ title }: { title: string }) => {
  const [message, setMessage] = useState("");

  const handleClick = async () => {
    const url = window.location.href;
    try {
      if (typeof navigator.share === "function" && window.matchMedia("(pointer: coarse)").matches) {
        await navigator.share({ title, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setMessage("링크를 복사했습니다.");
    } catch (error) {
      if ((error as DOMException)?.name === "AbortError") return;
      setMessage("링크를 복사하지 못했습니다.");
    }
    setTimeout(() => setMessage(""), 2400);
  };

  return (
    <div className="news-share">
      <button type="button" className="news-share__button" onClick={handleClick}>
        링크 복사
      </button>
      <span className="news-share__message" role="status">
        {message}
      </span>
    </div>
  );
};

export default ShareButton;
