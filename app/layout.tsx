import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "극한의 반응속도 테스트",
  description: "당신의 반사신경을 한계까지 테스트해보세요.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
