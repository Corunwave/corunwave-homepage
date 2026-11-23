import type { NewsAttachment } from "@/app/_lib/cms/news";

const formatSize = (bytes: number | null) => {
  if (bytes == null) return "";
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))}KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
};

/* 소식 하단 첨부파일 내려받기 목록. */
const NewsAttachments = ({ files }: { files: NewsAttachment[] }) => {
  if (files.length === 0) return null;
  return (
    <section className="news-attachments" aria-labelledby="news-attachments-title">
      <h2 id="news-attachments-title" className="news-attachments__title">
        첨부파일
      </h2>
      <ul className="news-attachments__list">
        {files.map((file) => (
          <li key={file.id}>
            <a className="news-attachments__link" href={file.href} download={file.name}>
              <span className="news-attachments__name">{file.name}</span>
              <span className="news-attachments__size">{formatSize(file.size)}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default NewsAttachments;
