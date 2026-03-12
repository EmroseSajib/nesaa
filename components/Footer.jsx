"use client";

import { useLanguage } from "@/app/LanguageContext";
import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import Link from "next/link";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="relative bg-[#e9e2d8] overflow-hidden">
      {/* glow background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-amber-400/20 blur-3xl rounded-full" />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-semibold text-[#3b2e24] mb-3">
              NESAA
            </h3>

            <p className="text-[#6e5a4b] text-sm leading-7 mb-5">
              Crafted with natural materials and authentic craftsmanship. NESAA
              blends elegance, sustainability, and purpose.
            </p>

            {/* Social */}
            <div className="flex gap-3">
              <a className="p-2 rounded-full bg-white/60 hover:bg-white transition">
                <Instagram className="w-4 h-4 text-[#3b2e24]" />
              </a>

              <a className="p-2 rounded-full bg-white/60 hover:bg-white transition">
                <Facebook className="w-4 h-4 text-[#3b2e24]" />
              </a>

              <a className="p-2 rounded-full bg-white/60 hover:bg-white transition">
                <Linkedin className="w-4 h-4 text-[#3b2e24]" />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-semibold text-[#3b2e24] mb-4">{t.nav.shop}</h4>

            <ul className="space-y-2 text-sm text-[#6e5a4b]">
              {["Bags", "Belts", "Wallets", "Accessories"].map((item) => (
                <li key={item}>
                  <Link
                    href="/shop"
                    className="hover:text-[#3b2e24] transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-[#3b2e24] mb-4">Company</h4>

            <ul className="space-y-2 text-sm text-[#6e5a4b]">
              <li>
                <Link href="/about" className="hover:text-[#3b2e24]">
                  {t.nav.about}
                </Link>
              </li>

              <li>
                <Link href="/b2b" className="hover:text-[#3b2e24]">
                  Wholesale
                </Link>
              </li>

              <li>
                <Link href="/contact" className="hover:text-[#3b2e24]">
                  {t.nav.contact}
                </Link>
              </li>

              <li>
                <Link href="/donate" className="hover:text-[#3b2e24]">
                  {t.nav.donate}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-[#3b2e24] mb-4">
              {t.contact.title}
            </h4>

            <ul className="space-y-3 text-sm text-[#6e5a4b]">
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 mt-1" />
                info@nesaa.com
              </li>

              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 mt-1" />
                0687117038
              </li>

              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-1" />
                Netherlands & Bangladesh
              </li>
            </ul>
          </div>
        </div>

        {/* divider */}
        <div className="h-px bg-[#d9c7b3] my-6" />

        {/* bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-[#6e5a4b]">
          <p>© 2024 NESAA. All rights reserved.</p>

          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="#" className="hover:text-[#3b2e24]">
              Privacy
            </Link>

            <Link href="#" className="hover:text-[#3b2e24]">
              Terms
            </Link>

            <Link href="#" className="hover:text-[#3b2e24]">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
