"use client";

import {
  ArrowLeft,
  BadgePercent,
  CalendarDays,
  CheckCircle2,
  Copy,
  Save,
  Tag,
  Truck,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

function eur(n) {
  return new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
  }).format(Number(n || 0));
}

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

function genCode() {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const part = (n) =>
    Array.from(
      { length: n },
      () => alphabet[Math.floor(Math.random() * alphabet.length)],
    ).join("");
  return `NESAA-${part(4)}-${part(4)}`;
}

export default function CreateDiscountPage() {
  const router = useRouter();

  // Basics
  const [name, setName] = useState("Spring Offer");
  const [code, setCode] = useState(genCode());
  const [status, setStatus] = useState("Active"); // Active | Draft
  const [type, setType] = useState("Percentage"); // Percentage | Fixed | FreeShipping

  // Value
  const [percentOff, setPercentOff] = useState("10");
  const [amountOff, setAmountOff] = useState("5");

  // Conditions
  const [minOrder, setMinOrder] = useState("0");
  const [maxUses, setMaxUses] = useState("200");
  const [perCustomerLimit, setPerCustomerLimit] = useState("1");

  // Dates
  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);
  const [startsAt, setStartsAt] = useState(today);
  const [endsAt, setEndsAt] = useState("");

  // Targeting (UI)
  const [targeting, setTargeting] = useState("All"); // All | NewCustomers | Wholesale | Single
  const [stackable, setStackable] = useState(false);
  const [excludeSaleItems, setExcludeSaleItems] = useState(false);

  const [saving, setSaving] = useState(false);

  const valuePreview = useMemo(() => {
    if (type === "Percentage") return `${Number(percentOff || 0)}% off`;
    if (type === "Fixed") return `${eur(amountOff)} off`;
    return "Free shipping";
  }, [type, percentOff, amountOff]);

  const valid = useMemo(() => {
    if (code.trim().length < 4) return false;
    if (type === "Percentage")
      return Number(percentOff) > 0 && Number(percentOff) <= 100;
    if (type === "Fixed") return Number(amountOff) > 0;
    return true;
  }, [code, type, percentOff, amountOff]);

  const copyText = async (t) => {
    try {
      await navigator.clipboard.writeText(t);
      alert("Copied!");
    } catch {
      alert("Copy failed");
    }
  };

  const save = async (mode) => {
    if (!valid) {
      alert("Please check code and discount value.");
      return;
    }
    if (endsAt && startsAt && endsAt < startsAt) {
      alert("End date must be after start date.");
      return;
    }

    setSaving(true);

    const payload = {
      name: name.trim(),
      code: code.trim().toUpperCase(),
      status: mode === "draft" ? "Draft" : status,
      type,
      value:
        type === "Percentage"
          ? { percentOff: Number(percentOff) }
          : type === "Fixed"
            ? { amountOff: Number(amountOff) }
            : { freeShipping: true },
      rules: {
        minOrder: Number(minOrder || 0),
        maxUses: Number(maxUses || 0),
        perCustomerLimit: Number(perCustomerLimit || 1),
        stackable,
        excludeSaleItems,
        targeting, // UI-only concept; implement logic later if needed
      },
      dates: {
        startsAt,
        endsAt: endsAt || null,
      },
    };

    // TODO: connect API later:
    // await fetch("/api/admin/discounts", { method:"POST", body: JSON.stringify(payload) })

    setTimeout(() => {
      setSaving(false);
      alert("Created! (mock)\n\n" + JSON.stringify(payload, null, 2));
      router.push("/admin/discounts");
    }, 650);
  };

  return (
    <div className="mx-auto px-4 py-8 sm:px-6 lg:px-8 space-y-5">
      {/* TOP BAR */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/discounts"
            className="inline-flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-3 py-2 text-sm font-extrabold text-gray-800 shadow-sm transition hover:-translate-y-[1px] hover:shadow-md active:translate-y-0"
          >
            <ArrowLeft className="h-4 w-4" />
            Discounts
          </Link>

          <div>
            <h2 className="text-2xl font-extrabold text-gray-900">
              Create Discount
            </h2>
            <p className="text-sm text-gray-600">
              Build promo codes for single + wholesale orders (optional
              targeting).
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => save("draft")}
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-3 py-2 text-sm font-extrabold text-gray-800 shadow-sm transition hover:-translate-y-[1px] hover:shadow-md active:translate-y-0 disabled:opacity-60"
          >
            <Save className="h-4 w-4" />
            Save Draft
          </button>

          <button
            onClick={() => save("publish")}
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-fuchsia-600 via-indigo-600 to-emerald-600 px-4 py-2 text-sm font-extrabold text-white shadow-lg transition hover:-translate-y-[1px] hover:shadow-xl active:translate-y-0 disabled:opacity-60"
          >
            <CheckCircle2 className="h-4 w-4" />
            Publish
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        {/* LEFT COLUMN */}
        <div className="space-y-5 lg:col-span-2">
          <Card
            title="Basics"
            subtitle="Name, code, status and discount type."
            icon={Tag}
            right={
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-extrabold text-emerald-800 ring-1 ring-emerald-200">
                <BadgePercent className="h-4 w-4" />
                {valuePreview}
              </span>
            }
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Discount Name" hint="Internal name">
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., Spring Offer"
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none transition focus:bg-white focus:border-gray-300"
                />
              </Field>

              <Field label="Status">
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full rounded-2xl border border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-800 outline-none"
                >
                  <option value="Active">Active</option>
                  <option value="Draft">Draft</option>
                </select>
              </Field>

              <Field
                label="Promo Code *"
                hint="Customers enter this at checkout"
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                  <input
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm font-extrabold tracking-wider outline-none transition focus:bg-white focus:border-gray-300"
                  />
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setCode(genCode())}
                      className="inline-flex items-center gap-2 rounded-2xl bg-gray-900 px-3 py-2 text-sm font-extrabold text-white hover:bg-black"
                    >
                      Generate
                    </button>
                    <button
                      type="button"
                      onClick={() => copyText(code)}
                      className="inline-flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-3 py-2 text-sm font-extrabold text-gray-800 hover:bg-gray-50"
                    >
                      <Copy className="h-4 w-4" />
                      Copy
                    </button>
                  </div>
                </div>
              </Field>

              <Field label="Type">
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full rounded-2xl border border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-800 outline-none"
                >
                  <option value="Percentage">Percentage (%)</option>
                  <option value="Fixed">Fixed amount (€)</option>
                  <option value="FreeShipping">Free shipping</option>
                </select>
              </Field>
            </div>

            {/* value inputs */}
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {type === "Percentage" ? (
                <Field label="Percent off (%) *" hint="1 - 100">
                  <input
                    value={percentOff}
                    onChange={(e) => setPercentOff(e.target.value)}
                    inputMode="numeric"
                    className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none transition focus:bg-white focus:border-gray-300"
                  />
                </Field>
              ) : null}

              {type === "Fixed" ? (
                <Field label="Amount off (EUR) *" hint="e.g., 5">
                  <input
                    value={amountOff}
                    onChange={(e) => setAmountOff(e.target.value)}
                    inputMode="decimal"
                    className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none transition focus:bg-white focus:border-gray-300"
                  />
                </Field>
              ) : null}

              {type === "FreeShipping" ? (
                <div className="rounded-3xl bg-gradient-to-r from-sky-50 via-indigo-50 to-emerald-50 p-4 ring-1 ring-gray-200">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 via-indigo-500 to-emerald-500 text-white shadow">
                      <Truck className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-sm font-extrabold text-gray-900">
                        Free shipping
                      </p>
                      <p className="mt-1 text-xs text-gray-600">
                        Customers get shipping fee reduced to €0.
                      </p>
                    </div>
                  </div>
                </div>
              ) : null}

              <Field label="Minimum order (EUR)" hint="Optional">
                <input
                  value={minOrder}
                  onChange={(e) => setMinOrder(e.target.value)}
                  inputMode="decimal"
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none transition focus:bg-white focus:border-gray-300"
                />
              </Field>

              <Field label="Max uses (total)" hint="0 = unlimited">
                <input
                  value={maxUses}
                  onChange={(e) => setMaxUses(e.target.value)}
                  inputMode="numeric"
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none transition focus:bg-white focus:border-gray-300"
                />
              </Field>

              <Field label="Per customer limit" hint="e.g., 1">
                <input
                  value={perCustomerLimit}
                  onChange={(e) => setPerCustomerLimit(e.target.value)}
                  inputMode="numeric"
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none transition focus:bg-white focus:border-gray-300"
                />
              </Field>
            </div>
          </Card>

          <Card
            title="Schedule"
            subtitle="Choose start and end dates (optional)."
            icon={CalendarDays}
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <Field label="Starts at">
                <input
                  type="date"
                  value={startsAt}
                  onChange={(e) => setStartsAt(e.target.value)}
                  className="w-full rounded-2xl border border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-800 outline-none"
                />
              </Field>

              <Field label="Ends at" hint="Optional">
                <input
                  type="date"
                  value={endsAt}
                  onChange={(e) => setEndsAt(e.target.value)}
                  className="w-full rounded-2xl border border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-800 outline-none"
                />
              </Field>

              <div className="rounded-3xl bg-gray-50 p-4 ring-1 ring-gray-200">
                <p className="text-xs font-semibold text-gray-600">Preview</p>
                <p className="mt-1 text-sm font-extrabold text-gray-900">
                  {startsAt || "—"} → {endsAt || "No end date"}
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  If end date is empty, discount stays active until you disable
                  it.
                </p>
              </div>
            </div>
          </Card>

          <Card
            title="Rules & Targeting"
            subtitle="Optional: limit where discount applies (UI-only now)."
            icon={Users}
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <Field label="Target orders">
                <select
                  value={targeting}
                  onChange={(e) => setTargeting(e.target.value)}
                  className="w-full rounded-2xl border border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-800 outline-none"
                >
                  <option value="All">All orders</option>
                  <option value="NewCustomers">New customers only</option>
                  <option value="Wholesale">Wholesale items only</option>
                  <option value="Single">Single items only</option>
                </select>
              </Field>

              <Field label="Stackable" hint="Allow with other discounts?">
                <div className="flex items-center justify-between rounded-3xl border border-gray-200 bg-white p-4">
                  <span className="text-sm font-extrabold text-gray-900">
                    Stackable
                  </span>
                  <Toggle checked={stackable} onChange={setStackable} />
                </div>
              </Field>

              <Field label="Exclude sale items" hint="Optional">
                <div className="flex items-center justify-between rounded-3xl border border-gray-200 bg-white p-4">
                  <span className="text-sm font-extrabold text-gray-900">
                    Exclude
                  </span>
                  <Toggle
                    checked={excludeSaleItems}
                    onChange={setExcludeSaleItems}
                  />
                </div>
              </Field>
            </div>

            <div className="mt-4 rounded-3xl bg-gradient-to-r from-fuchsia-50 via-indigo-50 to-emerald-50 p-4 ring-1 ring-gray-200">
              <p className="text-sm font-extrabold text-gray-900">
                Checkout preview
              </p>
              <p className="mt-1 text-sm text-gray-700">
                Code{" "}
                <span className="font-extrabold">
                  {code.trim().toUpperCase() || "—"}
                </span>{" "}
                • <span className="font-extrabold">{valuePreview}</span>
                {Number(minOrder) > 0 ? (
                  <>
                    {" "}
                    • Min order{" "}
                    <span className="font-extrabold">{eur(minOrder)}</span>
                  </>
                ) : null}{" "}
                • Target: <span className="font-extrabold">{targeting}</span>
              </p>
              <p className="mt-1 text-xs text-gray-600">
                Targeting/stacking rules require server-side logic — this page
                is UI-only for now.
              </p>
            </div>
          </Card>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-5">
          <Card
            title="Summary"
            subtitle="Quick check before publishing."
            icon={BadgePercent}
            right={
              <span className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-extrabold text-emerald-800 ring-1 ring-emerald-200">
                {status}
              </span>
            }
          >
            <div className="space-y-3 rounded-3xl bg-gray-50 p-4 ring-1 ring-gray-200">
              <Row label="Code" value={code.trim().toUpperCase() || "—"} />
              <Row
                label="Type"
                value={type === "FreeShipping" ? "Free Shipping" : type}
              />
              <Row label="Value" value={valuePreview} />
              <Row
                label="Min order"
                value={Number(minOrder) > 0 ? eur(minOrder) : "—"}
              />
              <Row
                label="Max uses"
                value={Number(maxUses) === 0 ? "Unlimited" : String(maxUses)}
              />
              <Row label="Per customer" value={String(perCustomerLimit)} />
              <Row label="Start" value={startsAt || "—"} />
              <Row label="End" value={endsAt || "No end date"} />
            </div>

            <div className="mt-4 rounded-3xl bg-white p-4 ring-1 ring-gray-200">
              <p className="text-sm font-extrabold text-gray-900">Ready?</p>
              <p className="mt-1 text-xs text-gray-600">
                Publish to make the code usable in checkout.
              </p>

              <div className="mt-3 grid grid-cols-1 gap-2">
                <button
                  onClick={() => save("draft")}
                  disabled={saving}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white px-3 py-2 text-sm font-extrabold text-gray-800 shadow-sm transition hover:-translate-y-[1px] hover:shadow-md active:translate-y-0 disabled:opacity-60"
                >
                  <Save className="h-4 w-4" />
                  Save Draft
                </button>
                <button
                  onClick={() => save("publish")}
                  disabled={saving}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-fuchsia-600 via-indigo-600 to-emerald-600 px-3 py-2 text-sm font-extrabold text-white shadow-lg transition hover:-translate-y-[1px] hover:shadow-xl active:translate-y-0 disabled:opacity-60"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  Publish
                </button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-xs font-semibold text-gray-600">{label}</span>
      <span className="text-xs font-extrabold text-gray-900">{value}</span>
    </div>
  );
}
