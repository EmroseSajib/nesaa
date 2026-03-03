import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Analytics } from "@vercel/analytics/next";
export default function SiteLayout({ children }) {
  return (
    <>
      <main>
        <Header />
        <main className="flex-1 bg-gradient-to-br from-[#f8f5f0] via-[#f1ece5] to-[#e9e2d8] pt-10">
          {children}
        </main>
        <Footer />
        <Analytics />
      </main>
    </>
  );
}
