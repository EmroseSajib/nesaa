'use client'

import { useState } from 'react'
import { useLanguage } from '@/app/LanguageContext'
import { Mail, Phone, MapPin, Send } from 'lucide-react'

export default function ContactPage() {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">{t.contact.title}</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We'd love to hear from you. Whether you have a question or feedback, we're here to help.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="bg-card rounded-2xl border border-border p-6 text-center">
              <Mail className="w-10 h-10 text-accent mx-auto mb-4" />
              <h3 className="font-semibold text-foreground mb-2">Email</h3>
              <p className="text-muted-foreground">info@nesaa.com</p>
            </div>

            <div className="bg-card rounded-2xl border border-border p-6 text-center">
              <Phone className="w-10 h-10 text-accent mx-auto mb-4" />
              <h3 className="font-semibold text-foreground mb-2">{t.contact.phone}</h3>
              <p className="text-muted-foreground">+1 (555) 000-0000</p>
            </div>

            <div className="bg-card rounded-2xl border border-border p-6 text-center">
              <MapPin className="w-10 h-10 text-accent mx-auto mb-4" />
              <h3 className="font-semibold text-foreground mb-2">{t.contact.address}</h3>
              <p className="text-muted-foreground">
                123 Leather Lane<br />
                New York, NY 10001<br />
                USA
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-card rounded-2xl border border-border p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder={t.contact.email}
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>

                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                />

                <textarea
                  name="message"
                  placeholder={t.contact.message}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                />

                <button
                  type="submit"
                  className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  {t.contact.send}
                </button>

                {submitted && (
                  <div className="p-4 bg-green-50 text-green-700 rounded-lg text-sm">
                    Thank you for your message! We'll get back to you soon.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            {[
              {
                q: 'What is your return policy?',
                a: 'We offer a 30-day return policy on all unworn, unwashed products with original tags attached.',
              },
              {
                q: 'How long does shipping take?',
                a: 'Orders typically ship within 1-2 business days. Standard shipping takes 5-7 business days within the US.',
              },
              {
                q: 'Do you offer international shipping?',
                a: 'Yes, we ship to most countries. International shipping takes 10-15 business days depending on location.',
              },
              {
                q: 'Can I customize my order?',
                a: 'We offer personalization on select products. Contact our team for custom requests.',
              },
            ].map((faq, index) => (
              <details
                key={index}
                className="group bg-card rounded-lg border border-border p-6 cursor-pointer"
              >
                <summary className="font-semibold text-foreground flex justify-between items-center">
                  {faq.q}
                  <span className="transition-transform group-open:rotate-180">▼</span>
                </summary>
                <p className="text-muted-foreground mt-4">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
