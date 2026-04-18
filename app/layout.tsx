import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://speed-jm.vercel.app";
const siteTitle = "\uadf9\ud55c\uc758 \ubc18\uc751\uc18d\ub3c4 \ud14c\uc2a4\ud2b8";
const siteDescription = "\ub2f9\uc2e0\uc758 \ubc18\uc0ac\uc2e0\uacbd\uc744 \ud55c\uacc4\uae4c\uc9c0 \ud14c\uc2a4\ud2b8\ud574\ubcf4\uc138\uc694.";
const ogImagePath = "/og-cover.png";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteTitle,
  description: siteDescription,
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: siteUrl,
    siteName: siteTitle,
    type: "website",
    locale: "ko_KR",
    images: [
      {
        url: ogImagePath,
        width: 1408,
        height: 792,
        alt: "\uadf9\ud55c\uc758 \ubc18\uc751\uc18d\ub3c4 \ud14c\uc2a4\ud2b8 \ubbf8\ub9ac\ubcf4\uae30 \uc774\ubbf8\uc9c0",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: [ogImagePath],
  },
  alternates: {
    canonical: siteUrl,
  },
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
