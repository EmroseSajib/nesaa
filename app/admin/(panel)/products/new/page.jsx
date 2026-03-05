"use client";

import {
  ArrowLeft,
  BadgePercent,
  CheckCircle2,
  ImagePlus,
  Info,
  Package,
  Save,
  Tag,
  Truck,
  UploadCloud,
  X,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

// ---- you can replace these with your real categories later ----
const CATEGORIES = ["Tote", "Backpack", "Crossbody", "Travel", "Accessories"];

function eur(n) {
  const v = Number(n || 0);
  return new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
  }).format(v);
}

function slugify(s) {
  return String(s || "")
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
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

function Card({ title, icon: Icon, right, children }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
      <div className="flex items-start justify-between gap-4 border-b border-gray-100 px-5 py-4">
        <div className="flex items-center gap-2">
          {Icon ? (
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-fuchsia-500 via-indigo-500 to-emerald-500 text-white shadow ring-1 ring-black/5">
              <Icon className="h-4 w-4" />
            </span>
          ) : null}
          <p className="text-sm font-extrabold text-gray-900">{title}</p>
        </div>
        {right ? <div className="shrink-0">{right}</div> : null}
      </div>
      <div className="px-5 py-4">{children}</div>
    </div>
  );
}

export default function CreateProductPage() {
  const router = useRouter();

  // ------- FORM STATE -------
  const [status, setStatus] = useState("Draft"); // Draft | Active
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [sku, setSku] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [shortDesc, setShortDesc] = useState("");
  const [desc, setDesc] = useState("");
  const [singlePrice, setSinglePrice] = useState("39.95");
  const [wholesalePrice, setWholesalePrice] = useState("18.00");
  const [moq, setMoq] = useState("10");
  const [stock, setStock] = useState("30");

  const [weight, setWeight] = useState("0.9"); // kg
  const [length, setLength] = useState("35"); // cm
  const [width, setWidth] = useState("12");
  const [height, setHeight] = useState("28");

  const [images, setImages] = useState([
    // preview urls
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='500' height='500'%3E%3Crect width='500' height='500' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' fill='%239ca3af' font-size='22' font-family='Arial'%3ENESAA%20Product%3C/text%3E%3C/svg%3E",
  ]);

  const [saving, setSaving] = useState(false);

  const computedSlug = useMemo(() => {
    if (slug.trim()) return slugify(slug);
    return slugify(name);
  }, [name, slug]);

  const valid = useMemo(() => {
    return (
      name.trim().length >= 2 &&
      sku.trim().length >= 2 &&
      Number(singlePrice) > 0 &&
      Number(wholesalePrice) > 0 &&
      Number(moq) >= 1 &&
      Number(stock) >= 0
    );
  }, [name, sku, singlePrice, wholesalePrice, moq, stock]);

  // ------- HANDLERS -------
  const onPickImages = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const previews = files.map((f) => URL.createObjectURL(f));
    setImages((prev) => [...prev, ...previews]);

    // IMPORTANT: in real app, upload files to Cloudinary/S3 and store URLs
    e.target.value = "";
  };

  const removeImage = (idx) => {
    setImages((prev) => prev.filter((_, i) => i !== idx));
  };

  const save = async (mode) => {
    if (!valid) {
      alert("Please fill required fields: Name, SKU, prices, MOQ, stock.");
      return;
    }

    setSaving(true);

    // Build payload (for later API)
    const payload = {
      status: mode === "publish" ? "Active" : status,
      name: name.trim(),
      slug: computedSlug,
      sku: sku.trim(),
      category,
      shortDesc,
      desc,
      pricing: {
        singlePrice: Number(singlePrice),
        wholesalePrice: Number(wholesalePrice),
        moq: Number(moq),
      },
      inventory: { stock: Number(stock) },
      shipping: {
        weightKg: Number(weight),
        dimensionsCm: {
          length: Number(length),
          width: Number(width),
          height: Number(height),
        },
      },
      images, // (for now previews, replace with uploaded URLs)
    };

    // TODO: connect API later:
    // await fetch("/api/admin/products", { method: "POST", body: JSON.stringify(payload) })

    setTimeout(() => {
      setSaving(false);
      alert(
        `Saved! (mock)\n\nName: ${payload.name}\nSKU: ${payload.sku}\nSlug: ${payload.slug}`,
      );
      router.push("/admin/products");
    }, 600);
  };

  return (
    <div className="mx-auto px-4 py-8 sm:px-6 lg:px-8  space-y-5">
      {/* TOP BAR */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/products"
            className="inline-flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-3 py-2 text-sm font-extrabold text-gray-800 shadow-sm transition hover:-translate-y-[1px] hover:shadow-md active:translate-y-0"
          >
            <ArrowLeft className="h-4 w-4" />
            Products
          </Link>

          <div>
            <h2 className="text-2xl font-extrabold text-gray-900">
              Create Product
            </h2>
            <p className="text-sm text-gray-600">
              Set single + wholesale price and MOQ (minimum order quantity).
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

      {/* CONTENT GRID */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        {/* LEFT COLUMN */}
        <div className="space-y-5 lg:col-span-2">
          <Card title="Basic Information" icon={Info}>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Product Name *" hint="Visible on shop">
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., NESAA Tote Classic"
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none transition focus:bg-white focus:border-gray-300"
                />
              </Field>

              <Field label="SKU *" hint="Unique code">
                <input
                  value={sku}
                  onChange={(e) => setSku(e.target.value)}
                  placeholder="e.g., NES-TOTE-BLK"
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none transition focus:bg-white focus:border-gray-300"
                />
              </Field>

              <Field label="Slug" hint="Auto from name">
                <div className="flex items-center gap-2">
                  <input
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="optional"
                    className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none transition focus:bg-white focus:border-gray-300"
                  />
                  <span className="rounded-2xl border border-gray-200 bg-white px-3 py-2 text-xs font-extrabold text-gray-700">
                    {computedSlug || "—"}
                  </span>
                </div>
              </Field>

              <Field label="Category" hint="For filtering">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full rounded-2xl border border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-800 outline-none"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </Field>

              <div className="sm:col-span-2">
                <Field label="Short Description" hint="Shown on product card">
                  <input
                    value={shortDesc}
                    onChange={(e) => setShortDesc(e.target.value)}
                    placeholder="e.g., Premium vegan leather tote, perfect for daily use."
                    className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none transition focus:bg-white focus:border-gray-300"
                  />
                </Field>
              </div>

              <div className="sm:col-span-2">
                <Field label="Full Description" hint="Shown on detail page">
                  <textarea
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    placeholder="Write product details, materials, care instructions..."
                    rows={6}
                    className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none transition focus:bg-white focus:border-gray-300"
                  />
                </Field>
              </div>
            </div>
          </Card>

          <Card title="Pricing (Single + Wholesale)" icon={BadgePercent}>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <Field label="Single Price (€) *" hint="Per piece">
                <input
                  value={singlePrice}
                  onChange={(e) => setSinglePrice(e.target.value)}
                  inputMode="decimal"
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none transition focus:bg-white focus:border-gray-300"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Preview: <span className="font-bold">{eur(singlePrice)}</span>
                </p>
              </Field>

              <Field label="Wholesale Price (€) *" hint="Per piece">
                <input
                  value={wholesalePrice}
                  onChange={(e) => setWholesalePrice(e.target.value)}
                  inputMode="decimal"
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none transition focus:bg-white focus:border-gray-300"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Preview:{" "}
                  <span className="font-bold">{eur(wholesalePrice)}</span>
                </p>
              </Field>

              <Field label="MOQ *" hint="Min qty for wholesale">
                <input
                  value={moq}
                  onChange={(e) => setMoq(e.target.value)}
                  inputMode="numeric"
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none transition focus:bg-white focus:border-gray-300"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Shown as: <span className="font-bold">min {moq} pcs</span>
                </p>
              </Field>
            </div>

            <div className="mt-4 rounded-3xl bg-gradient-to-r from-fuchsia-50 via-indigo-50 to-emerald-50 p-4 ring-1 ring-gray-200">
              <p className="text-sm font-extrabold text-gray-900">
                How it will show on the product page:
              </p>
              <p className="mt-1 text-sm text-gray-700">
                Single:{" "}
                <span className="font-extrabold">{eur(singlePrice)}</span> /
                piece • Wholesale:{" "}
                <span className="font-extrabold">{eur(wholesalePrice)}</span> /
                piece{" "}
                <span className="font-bold text-gray-600">(min {moq})</span>
              </p>
            </div>
          </Card>

          <Card title="Inventory" icon={Package}>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <Field label="Stock *" hint="Current available">
                <input
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  inputMode="numeric"
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none transition focus:bg-white focus:border-gray-300"
                />
              </Field>

              <Field label="Status" hint="Draft or Active">
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full rounded-2xl border border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-800 outline-none"
                >
                  <option value="Draft">Draft</option>
                  <option value="Active">Active</option>
                </select>
              </Field>

              <Field label="Tags" hint="Optional">
                <input
                  placeholder="e.g., premium, leather"
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none transition focus:bg-white focus:border-gray-300"
                />
              </Field>
            </div>
          </Card>

          <Card title="Shipping & Dimensions" icon={Truck}>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
              <Field label="Weight (kg)" hint="Optional">
                <input
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  inputMode="decimal"
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none transition focus:bg-white focus:border-gray-300"
                />
              </Field>

              <Field label="Length (cm)" hint="Optional">
                <input
                  value={length}
                  onChange={(e) => setLength(e.target.value)}
                  inputMode="numeric"
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none transition focus:bg-white focus:border-gray-300"
                />
              </Field>

              <Field label="Width (cm)" hint="Optional">
                <input
                  value={width}
                  onChange={(e) => setWidth(e.target.value)}
                  inputMode="numeric"
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none transition focus:bg-white focus:border-gray-300"
                />
              </Field>

              <Field label="Height (cm)" hint="Optional">
                <input
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  inputMode="numeric"
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none transition focus:bg-white focus:border-gray-300"
                />
              </Field>
            </div>
          </Card>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-5">
          <Card
            title="Product Images"
            icon={ImagePlus}
            right={
              <label className="inline-flex cursor-pointer items-center gap-2 rounded-2xl bg-gray-900 px-3 py-2 text-xs font-extrabold text-white shadow-sm transition hover:bg-black">
                <UploadCloud className="h-4 w-4" />
                Upload
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={onPickImages}
                  className="hidden"
                />
              </label>
            }
          >
            <p className="text-xs text-gray-500">
              Upload product photos. (UI only now — connect to Cloudinary/S3
              later)
            </p>

            <div className="mt-4 grid grid-cols-2 gap-3">
              {images.map((src, idx) => (
                <div
                  key={src + idx}
                  className="group relative overflow-hidden rounded-3xl bg-gray-100 ring-1 ring-gray-200"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} alt="" className="h-32 w-full object-cover" />
                  <button
                    onClick={() => removeImage(idx)}
                    className="absolute right-2 top-2 inline-flex h-8 w-8 items-center justify-center rounded-2xl bg-black/60 text-white opacity-0 transition group-hover:opacity-100"
                    title="Remove"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-4 rounded-3xl bg-gradient-to-r from-fuchsia-50 via-indigo-50 to-emerald-50 p-4 ring-1 ring-gray-200">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-fuchsia-500 via-indigo-500 to-emerald-500 text-white shadow">
                  <Tag className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-sm font-extrabold text-gray-900">
                    Tip for NESAA premium look
                  </p>
                  <p className="mt-1 text-xs text-gray-600">
                    Use 1 main lifestyle photo + 3 clean product photos on white
                    background. Keep consistent lighting for all products.
                  </p>
                </div>
              </div>
            </div>
          </Card>

          <Card title="Publish Checklist" icon={CheckCircle2}>
            <ul className="space-y-2 text-sm">
              <CheckItem ok={name.trim().length >= 2} text="Name added" />
              <CheckItem ok={sku.trim().length >= 2} text="SKU added" />
              <CheckItem ok={Number(singlePrice) > 0} text="Single price set" />
              <CheckItem
                ok={Number(wholesalePrice) > 0}
                text="Wholesale price set"
              />
              <CheckItem ok={Number(moq) >= 1} text="MOQ set" />
              <CheckItem ok={Number(stock) >= 0} text="Stock set" />
              <CheckItem ok={images.length >= 1} text="At least 1 image" />
            </ul>

            <div className="mt-4 rounded-3xl bg-gray-50 p-4 ring-1 ring-gray-200">
              <p className="text-xs font-semibold text-gray-600">
                Slug preview
              </p>
              <p className="mt-1 text-sm font-extrabold text-gray-900">
                /product/{computedSlug || "your-product"}
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

function CheckItem({ ok, text }) {
  return (
    <li className="flex items-center justify-between rounded-2xl bg-gray-50 px-3 py-2 ring-1 ring-gray-200">
      <span className="font-semibold text-gray-800">{text}</span>
      <span
        className={[
          "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-extrabold ring-1 ring-inset",
          ok
            ? "bg-emerald-100 text-emerald-800 ring-emerald-200"
            : "bg-amber-100 text-amber-800 ring-amber-200",
        ].join(" ")}
      >
        {ok ? "OK" : "TODO"}
      </span>
    </li>
  );
}
