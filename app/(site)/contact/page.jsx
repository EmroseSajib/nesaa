"use client";

import { useLanguage } from "@/app/LanguageContext";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
  const { t } = useLanguage();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="relative min-h-screen bg-[#e9e2d8] overflow-hidden">
      {/* Premium glow background */}

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-amber-400/20 blur-3xl rounded-full" />

      <div className="absolute bottom-10 left-1/5 -translate-x-1/2 w-[700px] h-[700px] bg-amber-400/20 blur-3xl rounded-full" />

      <div className="relative container mx-auto px-6 py-20">
        {/* Header */}

        <div className="text-center mb-20">
          <h1 className="text-5xl font-semibold text-[#3b2e24] mb-4">
            {t.contact.title}
          </h1>

          <p className="text-[#6e5a4b] max-w-xl mx-auto">
            Have questions about our handcrafted bags or your order? Our team is
            here to assist you.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Contact Info */}

          <div className="space-y-8">
            <div className="bg-white/70 backdrop-blur-lg border border-white/40 shadow-xl rounded-3xl p-8">
              <h3 className="text-2xl font-semibold mb-8 text-[#3b2e24]">
                Contact Information
              </h3>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="bg-amber-500/10 p-3 rounded-xl">
                    <Mail className="text-amber-600 w-5 h-5" />
                  </div>

                  <div>
                    <p className="font-medium text-[#3b2e24]">Email</p>
                    <p className="text-[#6e5a4b]">info@nesaa.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="bg-amber-500/10 p-3 rounded-xl">
                    <Phone className="text-amber-600 w-5 h-5" />
                  </div>

                  <div>
                    <p className="font-medium text-[#3b2e24]">
                      {t.contact.phone}
                    </p>
                    <p className="text-[#6e5a4b]">+1 (555) 000-0000</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="bg-amber-500/10 p-3 rounded-xl">
                    <MapPin className="text-amber-600 w-5 h-5" />
                  </div>

                  <div>
                    <p className="font-medium text-[#3b2e24]">
                      {t.contact.address}
                    </p>

                    <p className="text-[#6e5a4b]">
                      123 Leather Lane
                      <br />
                      New York, NY 10001
                      <br />
                      USA
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Luxury message block */}

            <div className="bg-[#3b2e24] text-white rounded-3xl p-8 shadow-xl">
              <h3 className="text-xl font-semibold mb-3">
                Premium Customer Care
              </h3>

              <p className="text-white/80 leading-relaxed">
                Our team is dedicated to offering a luxury shopping experience.
                Reach out anytime and we’ll ensure your journey with our bags is
                smooth and elegant.
              </p>
            </div>
          </div>

          {/* Contact Form */}

          <div className="bg-white/70 backdrop-blur-xl border border-white/40 shadow-xl rounded-3xl p-10">
            <h2 className="text-3xl font-semibold mb-8 text-[#3b2e24]">
              Send us a message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-white/80 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />

                <input
                  type="email"
                  name="email"
                  placeholder={t.contact.email}
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-white/80 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-white/80 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />

              <textarea
                name="message"
                placeholder={t.contact.message}
                value={formData.message}
                onChange={handleChange}
                required
                rows="6"
                className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-white/80 resize-none focus:outline-none focus:ring-2 focus:ring-amber-500"
              />

              <button
                type="submit"
                className="w-full bg-[#3b2e24] hover:bg-[#2d221a] transition text-white py-3 rounded-xl font-medium flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                {t.contact.send}
              </button>

              {submitted && (
                <div className="bg-green-100 text-green-700 p-4 rounded-lg text-sm">
                  Thank you for your message! We'll get back to you soon.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
