import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata = {
  title: "Sevgi Medlife | Ankara Güzellik, Epilasyon & Cilt Bakım Merkezi",
  description: "Ankara Bahçelievler'de profesyonel güzellik hizmetleri. Buz Lazer Epilasyon, Medikal Cilt Bakımı, HydraFacial, G5 Bölgesel Zayıflama ve estetik çözümler.",
  keywords: "ankara güzellik merkezi, bahçelievler güzellik merkezi, buz lazer ankara, cilt bakımı ankara, bölgesel zayıflama, g5 masajı, hydrafacial ankara, sevgi medlife",
  authors: [{ name: "Sevgi Medlife" }],
  openGraph: {
    title: "Sevgi Medlife | Ankara Güzellik & Epilasyon Merkezi",
    description: "Ankara Bahçelievler'de profesyonel buz lazer, cilt bakımı ve bölgesel zayıflama uygulamaları. Randevunuzu hemen oluşturun.",
    url: "https://www.sevgimedlife.com/",
    siteName: "Sevgi Medlife",
    images: [
      {
        url: "/assets/images/clinic_interior.jpg",
        width: 1200,
        height: 630,
        alt: "Sevgi Medlife Ankara Karşılama Alanı",
      },
    ],
    locale: "tr_TR",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr" className={`${inter.variable} ${outfit.variable} scroll-smooth`}>
      <body>{children}</body>
    </html>
  );
}
