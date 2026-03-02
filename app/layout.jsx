import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Analytics } from "@vercel/analytics/next";
import { Barrio, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "./LanguageContext";

const geist = Geist({ subsets: ["latin"] });
const geistMono = Geist_Mono({ subsets: ["latin"] });
const barrio = Barrio({ subsets: ["latin"], weight: "400" });

export const metadata = {
  title: "NESAA",
  description: "Sustainable, handcrafted leather goods from NESAA",
  generator: "emrose sajib",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
  icons: {
    icon: [
      {
        url: "/icon.png",
        type: "image/svg+xml",
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geist.className}  font-sans antialiased flex flex-col min-h-screen`}
      >
        <LanguageProvider>
          <Header />
          <main className="flex-1 bg-gradient-to-br from-[#f8f5f0] via-[#f1ece5] to-[#e9e2d8]">
            {children}
          </main>
          <Footer />
          <Analytics />
        </LanguageProvider>
      </body>
    </html>
  );
}
