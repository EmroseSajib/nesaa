
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
          {children}
     
        </LanguageProvider>
      </body>
    </html>
  );
}
