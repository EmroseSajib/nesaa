'use client'

import Link from 'next/link'
import { useLanguage } from '@/app/LanguageContext'
import { Mail, Phone, MapPin } from 'lucide-react'

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold mb-3">NESAA</h3>
            <p className="text-sm opacity-80">
              Premium sustainable leather goods, handcrafted with excellence.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-semibold mb-4">{t.nav.shop}</h4>
            <ul className="space-y-2 text-sm">
              {['Bags', 'Belts', 'Wallets', 'Accessories'].map(item => (
                <li key={item}>
                  <Link href="#" className="opacity-80 hover:opacity-100 transition-opacity">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="opacity-80 hover:opacity-100 transition-opacity">
                  {t.nav.about}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="opacity-80 hover:opacity-100 transition-opacity">
                  {t.nav.contact}
                </Link>
              </li>
              <li>
                <Link href="/donations" className="opacity-80 hover:opacity-100 transition-opacity">
                  {t.nav.donate}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">{t.contact.title}</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 mt-1 flex-shrink-0" />
                <span>info@nesaa.com</span>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 mt-1 flex-shrink-0" />
                <span>+1 (555) 000-0000</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                <span>123 Leather Lane<br />New York, NY 10001</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-primary-foreground/20 my-8" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm opacity-80">
          <p>&copy; 2024 NESAA. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="#" className="hover:opacity-100 transition-opacity">Privacy</Link>
            <Link href="#" className="hover:opacity-100 transition-opacity">Terms</Link>
            <Link href="#" className="hover:opacity-100 transition-opacity">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
