import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import { draftMode } from "next/headers";
import { a2zBlack, a2zBold, a2zRegular, pretendard } from "@/public/fonts/fonts";
import { sharedOpenGraph } from "@/app/_lib/metadata";
import "@/app/globals.css";
import HeaderNavbar from "@/app/_components/commons/header/HeaderNavbar";
import Footer from "@/app/_components/commons/footer/Footer";
import { getTypography } from "@/app/_lib/cms/typography";
import RefreshOnSave from "@/app/_components/commons/preview/RefreshOnSave";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.crw.co.kr"),
  title: {
    default: "코런웨이브(주)",
    template: "%s · 코런웨이브",
  },
  description: "Innovation Together, Creating Waves.",
  openGraph: {
    ...sharedOpenGraph,
    title: "코런웨이브(주)",
    description: "Innovation Together, Creating Waves.",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const { scale, bodyFont, headingFont } = await getTypography();
  const { isEnabled: isPreview } = await draftMode();

  return (
    <html
      lang="ko"
      data-font-scale={scale}
      data-body-font={bodyFont}
      data-heading-font={headingFont}
      className={`${pretendard.variable} ${a2zRegular.variable} ${a2zBold.variable} ${a2zBlack.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {isPreview && <RefreshOnSave />}
        <HeaderNavbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
