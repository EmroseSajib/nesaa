"use client";

import { useLanguage } from "@/app/LanguageContext";
import { Globe, Menu, ShoppingCart, User, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t, language, toggleLanguage } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // close menu when route changes? (optional)
  // You can also close on link click (already below).

  const navLinks = useMemo(
    () => [
      { href: "/", label: t.nav.home },
      { href: "/shop", label: t.nav.shop },
      { href: "/about", label: t.nav.about },
      { href: "/donations", label: t.nav.donate },
      { href: "/contact", label: t.nav.contact },
    ],
    [t],
  );

  const textColor = scrolled ? "text-white/90" : "text-[#6F6D6C]";
  const hoverText = scrolled ? "hover:text-white" : "hover:text-gray-900";

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Animated colorful glow background */}
      <div
        className={[
          "pointer-events-none absolute inset-0 transition-all duration-500",
          scrolled ? "opacity-100" : "opacity-0",
        ].join(" ")}
      >
        <div className="absolute inset-0 bg-black/40 backdrop-blur-xl" />
        <div className="absolute -top-24 left-1/2 h-40 w-[520px] -translate-x-1/2 rounded-full bg-gradient-to-r from-fuchsia-500/40 via-indigo-500/35 to-emerald-500/30 blur-3xl animate-[pulseGlow_4s_ease-in-out_infinite]" />
      </div>

      <div
        className={[
          "relative transition-all duration-500",
          scrolled ? "py-2" : "py-5",
        ].join(" ")}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="group flex items-center gap-2">
              <div className="relative">
                <img
                  src="./icon.png"
                  alt="NESAA Logo"
                  className="h-8 w-8 rounded-xl transition-transform duration-300 group-hover:scale-105"
                />
                {/* tiny shine */}
                <span className="pointer-events-none absolute -inset-1 rounded-2xl bg-gradient-to-r from-amber-400/0 via-white/25 to-amber-400/0 opacity-0 blur-sm transition-opacity duration-500 group-hover:opacity-100" />
              </div>

              <div
                className={[
                  "text-2xl font-extralight tracking-[0.18em] transition-colors duration-300",
                  scrolled ? "text-white/90" : "text-[#6F6D6C]",
                ].join(" ")}
              >
                NESAA
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={[
                    "relative text-sm font-medium transition-colors duration-300",
                    textColor,
                    hoverText,
                    // animated underline
                    "after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:rounded-full after:bg-gradient-to-r after:from-fuchsia-400 after:via-indigo-400 after:to-emerald-400 after:transition-all after:duration-300 hover:after:w-full",
                  ].join(" ")}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Language Toggle */}
              <button
                onClick={toggleLanguage}
                className={[
                  "group flex items-center gap-1 rounded-xl px-2.5 py-2 text-sm font-medium transition-all duration-300",
                  "hover:-translate-y-[1px] hover:shadow-lg active:translate-y-0",
                  scrolled
                    ? "text-white/90 hover:bg-white/10"
                    : "text-[#6F6D6C] hover:bg-black/5",
                ].join(" ")}
                title={t.nav.language}
              >
                <Globe className="h-4 w-4 transition-transform duration-300 group-hover:rotate-6" />
                <span className="hidden sm:inline">
                  {language.toUpperCase()}
                </span>
              </button>

              {/* Cart Icon */}
              <Link
                href="/cart"
                className={[
                  "relative rounded-xl p-2.5 transition-all duration-300",
                  "hover:-translate-y-[1px] hover:shadow-lg active:translate-y-0",
                  scrolled
                    ? "text-white/90 hover:bg-white/10"
                    : "text-[#6F6D6C] hover:bg-black/5",
                ].join(" ")}
                aria-label="Cart"
              >
                <ShoppingCart className="h-5 w-5" />
                {/* badge */}
                <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-gradient-to-r from-fuchsia-500 to-indigo-500 ring-2 ring-white/70" />
              </Link>

              {/* Account Icon (no logout here) */}
              <Link
                href="/admin/login"
                className={[
                  "rounded-xl p-2.5 transition-all duration-300",
                  "hover:-translate-y-[1px] hover:shadow-lg active:translate-y-0",
                  scrolled
                    ? "text-white/90 hover:bg-white/10"
                    : "text-[#6F6D6C] hover:bg-black/5",
                ].join(" ")}
                aria-label="Account"
              >
                <User className="h-5 w-5" />
              </Link>

              {/* Mobile Menu Toggle */}
              <button
                className={[
                  "md:hidden rounded-xl p-2.5 transition-all duration-300",
                  "hover:-translate-y-[1px] hover:shadow-lg active:translate-y-0",
                  scrolled
                    ? "text-white/90 hover:bg-white/10"
                    : "hover:bg-black/5",
                ].join(" ")}
                onClick={() => setMobileMenuOpen((v) => !v)}
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? (
                  <X className="h-5 w-5 animate-[spinIn_260ms_ease-out]" />
                ) : (
                  <Menu className="h-5 w-5 animate-[pop_220ms_ease-out]" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation (animated) */}
          <div
            className={[
              "md:hidden overflow-hidden transition-all duration-300",
              mobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
            ].join(" ")}
          >
            <nav
              className={[
                "mt-3 rounded-2xl border border-white/15 bg-white/70 p-3 shadow-xl backdrop-blur-xl",
                "animate-[slideDown_280ms_ease-out]",
                scrolled ? "bg-white/10 text-white" : "bg-white/70",
              ].join(" ")}
            >
              <div className="space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={[
                      "block rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-300",
                      "hover:-translate-y-[1px] active:translate-y-0",
                      scrolled
                        ? "text-white/90 hover:bg-white/10"
                        : "text-gray-800 hover:bg-black/5",
                    ].join(" ")}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="inline-flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-gradient-to-r from-fuchsia-500 to-indigo-500" />
                      {link.label}
                    </span>
                  </Link>
                ))}
              </div>
            </nav>
          </div>
        </div>
      </div>

      {/* Keyframes (no Tailwind config needed) */}
      <style jsx global>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes pop {
          0% {
            transform: scale(0.9);
            opacity: 0.7;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        @keyframes spinIn {
          0% {
            transform: rotate(-60deg) scale(0.9);
            opacity: 0.7;
          }
          100% {
            transform: rotate(0deg) scale(1);
            opacity: 1;
          }
        }
        @keyframes pulseGlow {
          0%,
          100% {
            transform: translateX(-50%) scale(1);
            opacity: 0.65;
          }
          50% {
            transform: translateX(-50%) scale(1.06);
            opacity: 0.9;
          }
        }
      `}</style>
    </header>
  );
}
