import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "../_components/commons/hero/PageHero";
import ContactForm from "../_components/contact/ContactForm";

const title = "문의하기";
const lead = "비즈니스 환경에 맞는 서비스 구성을 제안해 드립니다.";
const description = `${lead}\n남겨주신 문의는 3 영업일 이내로 회신드리겠습니다.`;

export const metadata: Metadata = {
  title,
  description: lead,
  openGraph: {
    title: `${title} · 코런웨이브`,
    description: lead,
    type: "website",
    locale: "ko_KR",
  },
};

/* Contact page (preview #contact .contact-view). Shared PageHero, then a stock photo (Unsplash, Pavel Gromov) beside the client form. */
export default function ContactPage() {
  return (
    <main>
      <PageHero title={title} description={description} />
      <section className="contact-section" aria-label="고객문의">
        <div className="contact-layout">
          <div className="contact-graphic" aria-hidden="true">
            <Image
              className="contact-graphic__image"
              src="/images/contact/meeting-room-pavel-gromov.jpg"
              alt=""
              width={1200}
              height={1500}
              sizes="(max-width: 1248px) 50vw, 624px"
            />
          </div>
          <ContactForm />
        </div>
      </section>
    </main>
  );
}
