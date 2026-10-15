import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "commo po｜政治・地域活動のLINE活用体験",
  description: "LINE公式アカウントを活用した、友だち追加・アンケート・イベント案内・LINEミニページの疑似体験デモです。",
  icons: {
    icon: "/images/y-fav.png",
    apple: "/images/y-fav.png",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return <html lang="ja" data-scroll-behavior="smooth"><body>{children}</body></html>;
}
