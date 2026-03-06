"use client";

import {
  CheckCircle2,
  Copy,
  CreditCard,
  Globe,
  Mail,
  MapPin,
  Package,
  Save,
  Settings,
  Shield,
  Truck,
  UploadCloud,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

function Card({ title, icon: Icon, subtitle, right, children }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
      <div className="flex items-start justify-between gap-4 border-b border-gray-100 px-5 py-4">
        <div className="flex items-start gap-3">
          {Icon ? (
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-fuchsia-500 via-indigo-500 to-emerald-500 text-white shadow ring-1 ring-black/5">
              <Icon className="h-5 w-5" />
            </span>
          ) : null}
          <div>
            <p className="text-sm font-extrabold text-gray-900">{title}</p>
            {subtitle ? (
              <p className="mt-1 text-xs text-gray-500">{subtitle}</p>
            ) : null}
          </div>
        </div>
        {right ? <div className="shrink-0">{right}</div> : null}
      </div>
      <div className="px-5 py-4">{children}</div>
    </div>
  );
}

function Field({ label, hint, children }) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between gap-2">
        <label className="text-sm font-extrabold text-gray-900">{label}</label>
        {hint ? <span className="text-xs text-gray-500">{hint}</span> : null}
      </div>
      {children}
    </div>
  );
}

function Toggle({ checked, onChange }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={[
        "relative h-8 w-14 rounded-full transition",
        checked ? "bg-emerald-600" : "bg-gray-300",
      ].join(" ")}
      aria-label="toggle"
    >
      <span
        className={[
          "absolute top-1 h-6 w-6 rounded-full bg-white shadow transition",
          checked ? "left-7" : "left-1",
        ].join(" ")}
      />
    </button>
  );
}

function copyText(text) {
  navigator.clipboard?.writeText(text).then(
    () => alert("Copied!"),
    () => alert("Copy failed"),
  );
}

export default function AdminSettingsPage() {
  // ---- Store ----
  const [storeName, setStoreName] = useState("NESAA");
  const [storeEmail, setStoreEmail] = useState("support@nesaa.nl");
  const [storePhone, setStorePhone] = useState("+31 6 12345678");
  const [storeCountry, setStoreCountry] = useState("Netherlands");
  const [storeCity, setStoreCity] = useState("Amsterdam");
  const [storeAddress, setStoreAddress] = useState("Keizersgracht 123, 1015CJ");
  const [logoUrl, setLogoUrl] = useState("/icon.png");

  // ---- Language/Currency ----
  const [defaultLanguage, setDefaultLanguage] = useState("nl");
  const [enabledLanguages, setEnabledLanguages] = useState({
    nl: true,
    en: true,
  });
  const [currency, setCurrency] = useState("EUR");

  // ---- Tax/Shipping ----
  const [vatEnabled, setVatEnabled] = useState(true);
  const [vatRate, setVatRate] = useState("21"); // NL standard VAT
  const [shippingEnabled, setShippingEnabled] = useState(true);
  const [shippingFlatRate, setShippingFlatRate] = useState("6.95");
  const [freeShippingFrom, setFreeShippingFrom] = useState("150");

  // ---- Payments ----
  const [payments, setPayments] = useState({
    ideal: true,
    card: true,
    paypal: true,
  });
  const [provider, setProvider] = useState("mollie"); // mollie | stripe
  const [webhookUrl] = useState("https://yourdomain.com/api/payments/webhook");

  // ---- Emails ----
  const [emails, setEmails] = useState({
    orderConfirmation: true,
    adminNewOrder: true,
    shippingUpdate: false,
    donationReceipt: true,
  });

  // ---- Security ----
  const [security, setSecurity] = useState({
    captchaOnLogin: true,
    rateLimitLogin: true,
    twoFactor: false,
  });

  const [saving, setSaving] = useState(false);

  const canSave = useMemo(() => {
    return storeName.trim().length >= 2 && storeEmail.trim().length >= 5;
  }, [storeName, storeEmail]);

  const saveAll = async () => {
    if (!canSave) {
      alert("Please fill required fields (Store name, Store email).");
      return;
    }
    setSaving(true);

    const payload = {
      store: {
        name: storeName,
        email: storeEmail,
        phone: storePhone,
        country: storeCountry,
        city: storeCity,
        address: storeAddress,
        logoUrl,
      },
      i18n: { defaultLanguage, enabledLanguages, currency },
      taxShipping: {
        vatEnabled,
        vatRate: Number(vatRate),
        shippingEnabled,
        shippingFlatRate: Number(shippingFlatRate),
        freeShippingFrom: Number(freeShippingFrom),
      },
      payments: { provider, ...payments, webhookUrl },
      emails,
      security,
    };

    // TODO: connect API later:
    // await fetch("/api/admin/settings", { method:"PATCH", body: JSON.stringify(payload) })

    setTimeout(() => {
      setSaving(false);
      alert("Saved! (mock)\n\n" + JSON.stringify(payload, null, 2));
    }, 650);
  };

  // Optional: preview favicon/logo change (UI only)
  useEffect(() => {
    // no-op; keep for future preview logic
  }, [logoUrl]);

  return (
    <div className="mx-auto px-4 py-8 sm:px-6 lg:px-8 space-y-5">
      {/* Top header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-extrabold text-gray-900">Settings</h2>
          <p className="text-sm text-gray-600">
            Configure store, payments, shipping, emails, and security.
          </p>
        </div>

        <button
          onClick={saveAll}
          disabled={saving || !canSave}
          className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-fuchsia-600 via-indigo-600 to-emerald-600 px-4 py-2 text-sm font-extrabold text-white shadow-lg transition hover:-translate-y-[1px] hover:shadow-xl active:translate-y-0 disabled:opacity-60"
        >
          <Save className="h-4 w-4" />
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        {/* LEFT COLUMN */}
        <div className="space-y-5 lg:col-span-2">
          <Card
            title="Store Profile"
            subtitle="Brand name, contact info, and address shown on invoices and emails."
            icon={Settings}
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Store Name *">
                <input
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none transition focus:bg-white focus:border-gray-300"
                />
              </Field>

              <Field label="Support Email *">
                <input
                  value={storeEmail}
                  onChange={(e) => setStoreEmail(e.target.value)}
                  type="email"
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none transition focus:bg-white focus:border-gray-300"
                />
              </Field>

              <Field label="Phone">
                <input
                  value={storePhone}
                  onChange={(e) => setStorePhone(e.target.value)}
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none transition focus:bg-white focus:border-gray-300"
                />
              </Field>

              <Field label="Country">
                <input
                  value={storeCountry}
                  onChange={(e) => setStoreCountry(e.target.value)}
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none transition focus:bg-white focus:border-gray-300"
                />
              </Field>

              <Field label="City">
                <input
                  value={storeCity}
                  onChange={(e) => setStoreCity(e.target.value)}
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none transition focus:bg-white focus:border-gray-300"
                />
              </Field>

              <Field label="Address">
                <input
                  value={storeAddress}
                  onChange={(e) => setStoreAddress(e.target.value)}
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none transition focus:bg-white focus:border-gray-300"
                />
              </Field>

              <div className="sm:col-span-2">
                <Field
                  label="Logo URL"
                  hint="UI only (later upload to storage)"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                    <input
                      value={logoUrl}
                      onChange={(e) => setLogoUrl(e.target.value)}
                      className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none transition focus:bg-white focus:border-gray-300"
                    />
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => alert("Upload (connect later)")}
                        className="inline-flex items-center gap-2 rounded-2xl bg-gray-900 px-3 py-2 text-sm font-extrabold text-white hover:bg-black"
                      >
                        <UploadCloud className="h-4 w-4" />
                        Upload
                      </button>
                      <button
                        type="button"
                        onClick={() => copyText(logoUrl)}
                        className="inline-flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-3 py-2 text-sm font-extrabold text-gray-800 hover:bg-gray-50"
                      >
                        <Copy className="h-4 w-4" />
                        Copy
                      </button>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center gap-3 rounded-3xl bg-gray-50 p-4 ring-1 ring-gray-200">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={logoUrl}
                      alt="Logo preview"
                      className="h-12 w-12 rounded-2xl bg-white object-cover ring-1 ring-gray-200"
                      onError={(e) => {
                        e.currentTarget.src =
                          "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect width='200' height='200' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' fill='%239ca3af' font-size='14' font-family='Arial'%3ENESAA%3C/text%3E%3C/svg%3E";
                      }}
                    />
                    <div>
                      <p className="text-sm font-extrabold text-gray-900">
                        Logo preview
                      </p>
                      <p className="mt-1 text-xs text-gray-500">
                        This preview is UI-only; later use Cloudinary/S3 for
                        real uploads.
                      </p>
                    </div>
                  </div>
                </Field>
              </div>
            </div>
          </Card>

          <Card
            title="Localization"
            subtitle="Default language, enabled languages, and currency."
            icon={Globe}
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <Field label="Default Language">
                <select
                  value={defaultLanguage}
                  onChange={(e) => setDefaultLanguage(e.target.value)}
                  className="w-full rounded-2xl border border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-800 outline-none"
                >
                  <option value="nl">Dutch (NL)</option>
                  <option value="en">English (EN)</option>
                </select>
              </Field>

              <Field label="Currency">
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full rounded-2xl border border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-800 outline-none"
                >
                  <option value="EUR">EUR (€)</option>
                  <option value="USD">USD ($)</option>
                </select>
              </Field>

              <Field label="Enabled Languages">
                <div className="flex items-center justify-between rounded-3xl border border-gray-200 bg-white p-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-sm font-extrabold text-gray-900">
                        Dutch (NL)
                      </span>
                      <Toggle
                        checked={enabledLanguages.nl}
                        onChange={(v) =>
                          setEnabledLanguages((p) => ({ ...p, nl: v }))
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-sm font-extrabold text-gray-900">
                        English (EN)
                      </span>
                      <Toggle
                        checked={enabledLanguages.en}
                        onChange={(v) =>
                          setEnabledLanguages((p) => ({ ...p, en: v }))
                        }
                      />
                    </div>
                  </div>
                </div>
              </Field>
            </div>

            <div className="mt-4 rounded-3xl bg-gradient-to-r from-fuchsia-50 via-indigo-50 to-emerald-50 p-4 ring-1 ring-gray-200">
              <p className="text-sm font-extrabold text-gray-900">Preview</p>
              <p className="mt-1 text-sm text-gray-700">
                Default:{" "}
                <span className="font-extrabold">
                  {defaultLanguage.toUpperCase()}
                </span>{" "}
                • Enabled:{" "}
                <span className="font-extrabold">
                  {Object.entries(enabledLanguages)
                    .filter(([, v]) => v)
                    .map(([k]) => k.toUpperCase())
                    .join(", ")}
                </span>{" "}
                • Currency: <span className="font-extrabold">{currency}</span>
              </p>
            </div>
          </Card>

          <Card
            title="Tax & Shipping"
            subtitle="VAT, shipping rates, and free shipping threshold."
            icon={Truck}
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <Field label="VAT Enabled">
                <div className="flex items-center justify-between rounded-3xl border border-gray-200 bg-white p-4">
                  <span className="text-sm font-extrabold text-gray-900">
                    Charge VAT
                  </span>
                  <Toggle checked={vatEnabled} onChange={setVatEnabled} />
                </div>
              </Field>

              <Field label="VAT Rate (%)" hint="NL commonly 21%">
                <input
                  value={vatRate}
                  onChange={(e) => setVatRate(e.target.value)}
                  inputMode="numeric"
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none transition focus:bg-white focus:border-gray-300"
                />
              </Field>

              <Field label="Shipping Enabled">
                <div className="flex items-center justify-between rounded-3xl border border-gray-200 bg-white p-4">
                  <span className="text-sm font-extrabold text-gray-900">
                    Shipping
                  </span>
                  <Toggle
                    checked={shippingEnabled}
                    onChange={setShippingEnabled}
                  />
                </div>
              </Field>

              <Field label="Flat Rate (EUR)">
                <input
                  value={shippingFlatRate}
                  onChange={(e) => setShippingFlatRate(e.target.value)}
                  inputMode="decimal"
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none transition focus:bg-white focus:border-gray-300"
                />
              </Field>

              <Field label="Free Shipping From (EUR)">
                <input
                  value={freeShippingFrom}
                  onChange={(e) => setFreeShippingFrom(e.target.value)}
                  inputMode="decimal"
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none transition focus:bg-white focus:border-gray-300"
                />
              </Field>

              <div className="sm:col-span-1">
                <div className="rounded-3xl bg-gray-50 p-4 ring-1 ring-gray-200">
                  <p className="text-xs font-semibold text-gray-600">Tip</p>
                  <p className="mt-1 text-sm font-extrabold text-gray-900">
                    NL shipping defaults
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    Flat rate like €6,95 and free shipping from €150 is common.
                  </p>
                </div>
              </div>
            </div>
          </Card>

          <Card
            title="Payments"
            subtitle="Enable payment methods and provider."
            icon={CreditCard}
            right={
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-extrabold text-emerald-800 ring-1 ring-emerald-200">
                <CheckCircle2 className="h-4 w-4" />
                NL-ready (iDEAL)
              </span>
            }
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <Field label="Provider">
                <select
                  value={provider}
                  onChange={(e) => setProvider(e.target.value)}
                  className="w-full rounded-2xl border border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-800 outline-none"
                >
                  <option value="mollie">Mollie</option>
                  <option value="stripe">Stripe</option>
                </select>
              </Field>

              <Field label="Payment Methods">
                <div className="space-y-3 rounded-3xl border border-gray-200 bg-white p-4">
                  <RowToggle
                    label="iDEAL"
                    checked={payments.ideal}
                    onChange={(v) => setPayments((p) => ({ ...p, ideal: v }))}
                  />
                  <RowToggle
                    label="Card"
                    checked={payments.card}
                    onChange={(v) => setPayments((p) => ({ ...p, card: v }))}
                  />
                  <RowToggle
                    label="PayPal"
                    checked={payments.paypal}
                    onChange={(v) => setPayments((p) => ({ ...p, paypal: v }))}
                  />
                </div>
              </Field>

              <Field label="Webhook URL" hint="Copy into provider dashboard">
                <div className="rounded-3xl border border-gray-200 bg-white p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-xs font-semibold text-gray-600">
                        Webhook
                      </p>
                      <p className="mt-1 break-all text-sm font-extrabold text-gray-900">
                        {webhookUrl}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => copyText(webhookUrl)}
                      className="inline-flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-3 py-2 text-xs font-extrabold text-gray-800 hover:bg-gray-50"
                    >
                      <Copy className="h-4 w-4" />
                      Copy
                    </button>
                  </div>
                </div>
              </Field>
            </div>
          </Card>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-5">
          <Card
            title="Email Notifications"
            subtitle="Customer + admin emails."
            icon={Mail}
          >
            <div className="space-y-3 rounded-3xl border border-gray-200 bg-white p-4">
              <RowToggle
                label="Order confirmation (customer)"
                checked={emails.orderConfirmation}
                onChange={(v) =>
                  setEmails((p) => ({ ...p, orderConfirmation: v }))
                }
              />
              <RowToggle
                label="New order alert (admin)"
                checked={emails.adminNewOrder}
                onChange={(v) => setEmails((p) => ({ ...p, adminNewOrder: v }))}
              />
              <RowToggle
                label="Shipping updates (customer)"
                checked={emails.shippingUpdate}
                onChange={(v) =>
                  setEmails((p) => ({ ...p, shippingUpdate: v }))
                }
              />
              <RowToggle
                label="Donation receipt email"
                checked={emails.donationReceipt}
                onChange={(v) =>
                  setEmails((p) => ({ ...p, donationReceipt: v }))
                }
              />
            </div>

            <div className="mt-4 rounded-3xl bg-gray-50 p-4 ring-1 ring-gray-200">
              <p className="text-sm font-extrabold text-gray-900">Suggestion</p>
              <p className="mt-1 text-xs text-gray-500">
                Enable admin alerts + customer confirmation to reduce support
                tickets.
              </p>
            </div>
          </Card>

          <Card
            title="Security"
            subtitle="Login protection and access hardening."
            icon={Shield}
          >
            <div className="space-y-3 rounded-3xl border border-gray-200 bg-white p-4">
              <RowToggle
                label="Captcha on admin login"
                checked={security.captchaOnLogin}
                onChange={(v) =>
                  setSecurity((p) => ({ ...p, captchaOnLogin: v }))
                }
              />
              <RowToggle
                label="Rate-limit login attempts"
                checked={security.rateLimitLogin}
                onChange={(v) =>
                  setSecurity((p) => ({ ...p, rateLimitLogin: v }))
                }
              />
              <RowToggle
                label="Two-factor auth (2FA)"
                checked={security.twoFactor}
                onChange={(v) => setSecurity((p) => ({ ...p, twoFactor: v }))}
              />
            </div>

            <div className="mt-4 rounded-3xl bg-gradient-to-r from-fuchsia-50 via-indigo-50 to-emerald-50 p-4 ring-1 ring-gray-200">
              <p className="text-sm font-extrabold text-gray-900">
                Recommended for production
              </p>
              <ul className="mt-2 space-y-1 text-xs text-gray-600">
                <li className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  Use server-side session/cookies (not localStorage)
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  Protect /admin routes with middleware
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  Add webhook signature verification
                </li>
              </ul>
            </div>
          </Card>

          <Card
            title="Operational Notes"
            subtitle="Helpful reminders for your workflow."
            icon={MapPin}
          >
            <div className="space-y-3 rounded-3xl bg-gray-50 p-4 ring-1 ring-gray-200">
              <Note
                icon={Package}
                title="Pricing rule"
                text="Show Single + Wholesale price for all visitors. Enforce MOQ on wholesale purchase."
              />
              <Note
                icon={Truck}
                title="Shipping"
                text="If you use PostNL/DHL, add tracking to order details after shipping."
              />
              <Note
                icon={Mail}
                title="Emails"
                text="Send order confirmation + admin new order alert for smoother ops."
              />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

function RowToggle({ label, checked, onChange }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-sm font-extrabold text-gray-900">{label}</span>
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={[
          "relative h-7 w-12 rounded-full transition",
          checked ? "bg-emerald-600" : "bg-gray-300",
        ].join(" ")}
      >
        <span
          className={[
            "absolute top-0.5 h-6 w-6 rounded-full bg-white shadow transition",
            checked ? "left-6" : "left-0.5",
          ].join(" ")}
        />
      </button>
    </div>
  );
}

function Note({ icon: Icon, title, text }) {
  return (
    <div className="flex items-start gap-3 rounded-3xl bg-white p-4">
      <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-fuchsia-500 via-indigo-500 to-emerald-500 text-white shadow ring-1 ring-black/5">
        <Icon className="h-5 w-5" />
      </span>
      <div>
        <p className="text-sm font-extrabold text-gray-900">{title}</p>
        <p className="mt-1 text-xs text-gray-500">{text}</p>
      </div>
    </div>
  );
}
