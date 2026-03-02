"use client";

import { useLanguage } from "@/app/LanguageContext";
import { Globe, Menu, ShoppingCart, User, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t, language, toggleLanguage } = useLanguage();
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const navLinks = [
    { href: "/", label: t.nav.home },
    { href: "/shop", label: t.nav.shop },
    { href: "/about", label: t.nav.about },
    { href: "/donations", label: t.nav.donate },
    { href: "/contact", label: t.nav.contact },
  ];

  return (
    <header
      className={` fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "glass-dark py-1" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <img src="./icon.png" alt="NESAA Logo" className="w-8 h-8 " />
            <div
              className={`text-2xl font-extralight    ${
                scrolled ? "text-white/80" : "text-[#6F6D6C]"
              }`}
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
                className={`text-sm font-medium  hover:text-foreground transition-colors ${
                  scrolled ? "text-white/80" : "text-foreground/80"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className={`flex items-center gap-1 text-sm px-2 py-1 rounded hover:bg-muted transition-colors   ${
                scrolled ? "text-white/80" : "text-[#6F6D6C]"
              }`}
              title={t.nav.language}
            >
              <Globe className="w-4 h-4" />
              <span className="hidden sm:inline">{language.toUpperCase()}</span>
            </button>

            {/* Cart Icon */}
            <Link
              href="/cart"
              className={`relative p-2 hover:bg-muted rounded transition-colors   ${
                scrolled ? "text-white/80" : "text-[#6F6D6C]"
              }`}
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" />
            </Link>

            {/* Account Icon */}
            <Link
              href="/account"
              className={`p-2 hover:bg-muted rounded transition-colors   ${
                scrolled ? "text-white/80" : "text-[#6F6D6C]"
              }`}
            >
              <User className="w-5 h-5" />
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2 hover:bg-muted rounded transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-4 py-2 text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-muted rounded transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
