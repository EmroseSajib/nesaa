"use client";

import {
  Archive,
  ArrowLeft,
  CheckCircle2,
  Copy,
  ImagePlus,
  Info,
  Package,
  Save,
  Tag,
  Trash2,
  Truck,
  UploadCloud,
  X,
} from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

// ---- MOCK DB (replace with API later) ----
const MOCK_PRODUCTS = [
  {
    id: "p1",
    name: "NESAA Tote Classic",
    slug: "nesaa-tote-classic",
    sku: "NES-TOTE-BLK",
    category: "Tote",
    status: "Active", // Active | Draft | Archived
    shortDesc: "Premium tote bag for everyday essentials.",
    desc: "Details: vegan leather, premium stitching, inner pocket...",
    pricing: { singlePrice: 39.95, wholesalePrice: 18.0, moq: 10 },
    inventory: { stock: 42 },
    shipping: {
      weightKg: 0.9,
      dimensionsCm: { length: 35, width: 12, height: 28 },
    },
    images: [
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='500' height='500'%3E%3Crect width='500' height='500' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' fill='%239ca3af' font-size='22' font-family='Arial'%3ENESAA%20Tote%3C/text%3E%3C/svg%3E",
    ],
    updatedAt: "2026-03-06",
  },
];

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

function StatusPill({ status }) {
  const map = {
    Active: "bg-emerald-100 text-emerald-800 ring-emerald-200",
    Draft: "bg-amber-100 text-amber-800 ring-amber-200",
    Archived: "bg-gray-100 text-gray-700 ring-gray-200",
  };
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-extrabold ring-1 ring-inset ${map[status] || ""}`}
    >
      {status}
    </span>
  );
}

export default function ProductEditPage() {
  const { id } = useParams();
  const router = useRouter();

  const product = useMemo(() => {
    const pid = String(id || "");
    return MOCK_PRODUCTS.find((p) => p.id === pid) || null;
  }, [id]);

  // ---- form state
  const [status, setStatus] = useState("Draft");
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [sku, setSku] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [shortDesc, setShortDesc] = useState("");
  const [desc, setDesc] = useState("");
  const [singlePrice, setSinglePrice] = useState("0");
  const [wholesalePrice, setWholesalePrice] = useState("0");
  const [moq, setMoq] = useState("1");
  const [stock, setStock] = useState("0");

  const [weight, setWeight] = useState("0");
  const [length, setLength] = useState("0");
  const [width, setWidth] = useState("0");
  const [height, setHeight] = useState("0");

  const [images, setImages] = useState([]);
  const [saving, setSaving] = useState(false);

  // hydrate state from product
  useEffect(() => {
    if (!product) return;
    setStatus(product.status);
    setName(product.name);
    setSlug(product.slug);
    setSku(product.sku);
    setCategory(product.category);
    setShortDesc(product.shortDesc || "");
    setDesc(product.desc || "");
    setSinglePrice(String(product.pricing.singlePrice));
    setWholesalePrice(String(product.pricing.wholesalePrice));
    setMoq(String(product.pricing.moq));
    setStock(String(product.inventory.stock));
    setWeight(String(product.shipping.weightKg ?? 0));
    setLength(String(product.shipping.dimensionsCm?.length ?? 0));
    setWidth(String(product.shipping.dimensionsCm?.width ?? 0));
    setHeight(String(product.shipping.dimensionsCm?.height ?? 0));
    setImages(product.images || []);
  }, [product]);

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

  if (!product) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold text-gray-700">
            Product not found.
          </p>
          <Link
            href="/admin/products"
            className="mt-4 inline-flex items-center gap-2 rounded-2xl bg-gray-900 px-4 py-2 text-sm font-extrabold text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const onPickImages = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    const previews = files.map((f) => URL.createObjectURL(f));
    setImages((prev) => [...prev, ...previews]);
    e.target.value = "";
  };

  const removeImage = (idx) =>
    setImages((prev) => prev.filter((_, i) => i !== idx));

  const copyText = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("Copied!");
    } catch {
      alert("Copy failed");
    }
  };

  const save = async (mode) => {
    if (!valid) {
      alert("Please fill required fields: Name, SKU, prices, MOQ, stock.");
      return;
    }

    setSaving(true);

    const payload = {
      id: product.id,
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
      images,
    };

    // TODO: connect API later:
    // await fetch(`/api/admin/products/${product.id}`, { method: "PATCH", body: JSON.stringify(payload) })

    setTimeout(() => {
      setSaving(false);
      alert(`Saved! (mock)\n\n${payload.name}\n${payload.sku}`);
    }, 600);
  };

  const toggleArchive = () => {
    const next = status === "Archived" ? "Draft" : "Archived";
    setStatus(next);
    alert(`${next === "Archived" ? "Archived" : "Unarchived"} (mock)`);
  };

  const deleteProduct = () => {
    if (!confirm("Delete this product? This cannot be undone.")) return;
    alert("Deleted (mock)");
    router.push("/admin/products");
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
              {product.name}
            </h2>
            <p className="text-sm text-gray-600">
              ID: <span className="font-bold">{product.id}</span> • Updated{" "}
              {product.updatedAt}
              <span className="ml-2">•</span>{" "}
              <span className="ml-2">
                <StatusPill status={status} />
              </span>
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
            Save
          </button>

          <button
            onClick={() => save("publish")}
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-fuchsia-600 via-indigo-600 to-emerald-600 px-4 py-2 text-sm font-extrabold text-white shadow-lg transition hover:-translate-y-[1px] hover:shadow-xl active:translate-y-0 disabled:opacity-60"
          >
            <CheckCircle2 className="h-4 w-4" />
            Publish
          </button>

          <button
            onClick={toggleArchive}
            className="inline-flex items-center gap-2 rounded-2xl bg-gray-900 px-3 py-2 text-sm font-extrabold text-white shadow-sm transition hover:-translate-y-[1px] hover:shadow-md active:translate-y-0"
          >
            <Archive className="h-4 w-4" />
            {status === "Archived" ? "Unarchive" : "Archive"}
          </button>

          <button
            onClick={deleteProduct}
            className="inline-flex items-center gap-2 rounded-2xl bg-rose-600 px-3 py-2 text-sm font-extrabold text-white shadow-sm transition hover:-translate-y-[1px] hover:shadow-md active:translate-y-0"
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </button>
        </div>
      </div>

      {/* CONTENT GRID */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        {/* LEFT */}
        <div className="space-y-5 lg:col-span-2">
          <Card title="Basic Information" icon={Info}>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Product Name *">
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none transition focus:bg-white focus:border-gray-300"
                />
              </Field>

              <Field label="SKU *" hint="Copy">
                <div className="flex items-center gap-2">
                  <input
                    value={sku}
                    onChange={(e) => setSku(e.target.value)}
                    className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none transition focus:bg-white focus:border-gray-300"
                  />
                  <button
                    onClick={() => copyText(sku)}
                    className="inline-flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-3 py-2 text-xs font-extrabold text-gray-800 hover:bg-gray-50"
                  >
                    <Copy className="h-4 w-4" />
                    Copy
                  </button>
                </div>
              </Field>

              <Field label="Slug" hint="URL path">
                <div className="flex items-center gap-2">
                  <input
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none transition focus:bg-white focus:border-gray-300"
                  />
                  <span className="rounded-2xl border border-gray-200 bg-white px-3 py-2 text-xs font-extrabold text-gray-700">
                    {computedSlug || "—"}
                  </span>
                </div>
              </Field>

              <Field label="Category">
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
                <Field label="Short Description">
                  <input
                    value={shortDesc}
                    onChange={(e) => setShortDesc(e.target.value)}
                    className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none transition focus:bg-white focus:border-gray-300"
                  />
                </Field>
              </div>

              <div className="sm:col-span-2">
                <Field label="Full Description">
                  <textarea
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    rows={6}
                    className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none transition focus:bg-white focus:border-gray-300"
                  />
                </Field>
              </div>
            </div>
          </Card>

          <Card title="Pricing (Single + Wholesale)" icon={Tag}>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <Field
                label="Single Price (€) *"
                hint={`Preview: ${eur(singlePrice)}`}
              >
                <input
                  value={singlePrice}
                  onChange={(e) => setSinglePrice(e.target.value)}
                  inputMode="decimal"
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none transition focus:bg-white focus:border-gray-300"
                />
              </Field>

              <Field
                label="Wholesale Price (€) *"
                hint={`Preview: ${eur(wholesalePrice)}`}
              >
                <input
                  value={wholesalePrice}
                  onChange={(e) => setWholesalePrice(e.target.value)}
                  inputMode="decimal"
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none transition focus:bg-white focus:border-gray-300"
                />
              </Field>

              <Field label="MOQ *" hint="Min qty for wholesale">
                <input
                  value={moq}
                  onChange={(e) => setMoq(e.target.value)}
                  inputMode="numeric"
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none transition focus:bg-white focus:border-gray-300"
                />
              </Field>
            </div>

            <div className="mt-4 rounded-3xl bg-gradient-to-r from-fuchsia-50 via-indigo-50 to-emerald-50 p-4 ring-1 ring-gray-200">
              <p className="text-sm font-extrabold text-gray-900">
                Shop preview
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
              <Field label="Stock *">
                <input
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  inputMode="numeric"
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none transition focus:bg-white focus:border-gray-300"
                />
              </Field>

              <Field label="Status">
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full rounded-2xl border border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-800 outline-none"
                >
                  <option value="Draft">Draft</option>
                  <option value="Active">Active</option>
                  <option value="Archived">Archived</option>
                </select>
              </Field>

              <Field label="Tags (optional)">
                <input
                  placeholder="e.g., premium, vegan-leather"
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none transition focus:bg-white focus:border-gray-300"
                />
              </Field>
            </div>
          </Card>

          <Card title="Shipping & Dimensions" icon={Truck}>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
              <Field label="Weight (kg)">
                <input
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  inputMode="decimal"
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none transition focus:bg-white focus:border-gray-300"
                />
              </Field>

              <Field label="Length (cm)">
                <input
                  value={length}
                  onChange={(e) => setLength(e.target.value)}
                  inputMode="numeric"
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none transition focus:bg-white focus:border-gray-300"
                />
              </Field>

              <Field label="Width (cm)">
                <input
                  value={width}
                  onChange={(e) => setWidth(e.target.value)}
                  inputMode="numeric"
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none transition focus:bg-white focus:border-gray-300"
                />
              </Field>

              <Field label="Height (cm)">
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

        {/* RIGHT */}
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
              UI only now — connect Cloudinary/S3 later.
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

            <div className="mt-4 rounded-3xl bg-gray-50 p-4 ring-1 ring-gray-200">
              <p className="text-xs font-semibold text-gray-600">
                Slug preview
              </p>
              <p className="mt-1 text-sm font-extrabold text-gray-900">
                /product/{computedSlug || "your-product"}
              </p>
            </div>
          </Card>

          <Card title="Publish Checklist" icon={CheckCircle2}>
            <ul className="space-y-2 text-sm">
              <Checklist ok={name.trim().length >= 2} text="Name added" />
              <Checklist ok={sku.trim().length >= 2} text="SKU added" />
              <Checklist ok={Number(singlePrice) > 0} text="Single price set" />
              <Checklist
                ok={Number(wholesalePrice) > 0}
                text="Wholesale price set"
              />
              <Checklist ok={Number(moq) >= 1} text="MOQ set" />
              <Checklist ok={Number(stock) >= 0} text="Stock set" />
              <Checklist ok={images.length >= 1} text="At least 1 image" />
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}

function Checklist({ ok, text }) {
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
