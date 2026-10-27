import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import { a2zBlack, a2zBold, a2zRegular, pretendard } from "../public/fonts/fonts";
import { sharedOpenGraph } from "./_lib/metadata";
import "./globals.css";
import HeaderNavbar from "./_components/commons/header/HeaderNavbar";
import Footer from "./_components/commons/footer/Footer";

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

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ko"
      className={`${pretendard.variable} ${a2zRegular.variable} ${a2zBold.variable} ${a2zBlack.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <HeaderNavbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
