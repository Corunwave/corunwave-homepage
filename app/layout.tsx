import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import { a2zRegular, pretendard } from "../public/fonts/fonts";
import "./globals.css";
import HeaderNavbar from "./_components/commons/header/HeaderNavbar";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "코런웨이브(주)",
  description: "Innovation Together, Creating Waves.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${pretendard.variable} ${a2zRegular.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <HeaderNavbar />
        {children}
      </body>
    </html>
  );
}
