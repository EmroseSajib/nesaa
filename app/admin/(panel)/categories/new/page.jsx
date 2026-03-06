"use client";

import { ArrowLeft, CheckCircle2, Save, Tag } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

// simple slug helper
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

function Card({ title, icon: Icon, children, right }) {
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

export default function AddCategoryPage() {
  const router = useRouter();

  const [status, setStatus] = useState("Active"); // Active | Draft
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [sortOrder, setSortOrder] = useState("0"); // number
  const [featured, setFeatured] = useState(false);

  const computedSlug = useMemo(() => {
    if (slug.trim()) return slugify(slug);
    return slugify(name);
  }, [name, slug]);

  const valid = useMemo(() => name.trim().length >= 2, [name]);

  const save = async (mode) => {
    if (!valid) {
      alert("Please add a category name.");
      return;
    }

    const payload = {
      name: name.trim(),
      slug: computedSlug,
      status: mode === "draft" ? "Draft" : status,
      description: description.trim(),
      sortOrder: Number(sortOrder || 0),
      featured,
    };

    // TODO: connect API later:
    // await fetch("/api/admin/categories", { method:"POST", body: JSON.stringify(payload) })

    alert(
      `Saved! (mock)\n\nName: ${payload.name}\nSlug: ${payload.slug}\nStatus: ${payload.status}`,
    );
    router.push("/admin/categories");
  };

  return (
    <div className="mx-auto  px-4 py-8 sm:px-6 lg:px-8 space-y-5">
      {/* TOP BAR */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/categories"
            className="inline-flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-3 py-2 text-sm font-extrabold text-gray-800 shadow-sm transition hover:-translate-y-[1px] hover:shadow-md active:translate-y-0"
          >
            <ArrowLeft className="h-4 w-4" />
            Categories
          </Link>

          <div>
            <h2 className="text-2xl font-extrabold text-gray-900">
              Add Category
            </h2>
            <p className="text-sm text-gray-600">
              Create a new product category for the NESAA shop.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => save("draft")}
            className="inline-flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-3 py-2 text-sm font-extrabold text-gray-800 shadow-sm transition hover:-translate-y-[1px] hover:shadow-md active:translate-y-0"
          >
            <Save className="h-4 w-4" />
            Save Draft
          </button>

          <button
            onClick={() => save("publish")}
            className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-fuchsia-600 via-indigo-600 to-emerald-600 px-4 py-2 text-sm font-extrabold text-white shadow-lg transition hover:-translate-y-[1px] hover:shadow-xl active:translate-y-0"
          >
            <CheckCircle2 className="h-4 w-4" />
            Publish
          </button>
        </div>
      </div>

      {/* FORM */}
      <Card title="Category Details" icon={Tag}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Name *" hint="Displayed in shop navigation">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Tote"
              className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none transition focus:bg-white focus:border-gray-300"
            />
          </Field>

          <Field label="Status" hint="Active categories show in shop">
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full rounded-2xl border border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-800 outline-none"
            >
              <option value="Active">Active</option>
              <option value="Draft">Draft</option>
            </select>
          </Field>

          <Field label="Slug" hint="Auto from name if empty">
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

          <Field label="Sort Order" hint="Lower shows first">
            <input
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              inputMode="numeric"
              placeholder="0"
              className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none transition focus:bg-white focus:border-gray-300"
            />
          </Field>

          <div className="sm:col-span-2">
            <Field label="Description" hint="Optional (SEO + category page)">
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe this category (materials, style, use-case)..."
                rows={5}
                className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none transition focus:bg-white focus:border-gray-300"
              />
            </Field>
          </div>

          <div className="sm:col-span-2">
            <div className="flex items-center justify-between rounded-3xl border border-gray-200 bg-white p-4">
              <div>
                <p className="text-sm font-extrabold text-gray-900">Featured</p>
                <p className="mt-1 text-xs text-gray-500">
                  Show this category on the homepage (optional).
                </p>
              </div>

              <button
                type="button"
                onClick={() => setFeatured((v) => !v)}
                className={[
                  "relative h-8 w-14 rounded-full transition",
                  featured ? "bg-emerald-600" : "bg-gray-300",
                ].join(" ")}
                aria-label="Toggle featured"
              >
                <span
                  className={[
                    "absolute top-1 h-6 w-6 rounded-full bg-white shadow transition",
                    featured ? "left-7" : "left-1",
                  ].join(" ")}
                />
              </button>
            </div>

            <div className="mt-4 rounded-3xl bg-gradient-to-r from-fuchsia-50 via-indigo-50 to-emerald-50 p-4 ring-1 ring-gray-200">
              <p className="text-sm font-extrabold text-gray-900">Preview</p>
              <p className="mt-1 text-sm text-gray-700">
                <span className="font-extrabold">
                  {name || "Category name"}
                </span>{" "}
                •{" "}
                <span className="font-semibold text-gray-600">
                  /{computedSlug || "slug"}
                </span>{" "}
                • <span className="font-semibold">{status}</span>{" "}
                {featured ? (
                  <span className="ml-2 inline-flex rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-extrabold text-emerald-800 ring-1 ring-emerald-200">
                    Featured
                  </span>
                ) : null}
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
