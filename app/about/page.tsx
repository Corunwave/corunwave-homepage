import type { Metadata } from "next";
import PageHero from "../_components/commons/hero/PageHero";

const description = "코런웨이브는 “기술과 사람을 연결하는 서비스”를 제공합니다.";

export const metadata: Metadata = {
  title: "회사 소개",
  description,
};

export default function AboutPage() {
  return (
    <main>
      <PageHero title="회사 소개" description={description} />
    </main>
  );
}
