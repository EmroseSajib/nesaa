"use client";

import {
  Archive,
  ArrowUpDown,
  Copy,
  Download,
  Edit3,
  Plus,
  RefreshCcw,
  Search,
  Trash2,
  Upload,
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

// ---- MOCK DATA (replace with API later) ----
const PRODUCTS = [
  {
    id: "p1",
    name: "NESAA Tote Classic",
    sku: "NES-TOTE-BLK",
    category: "Tote",
    status: "Active",
    stock: 42,
    priceSingle: 39.95,
    priceWholesale: 18.0,
    moq: 10,
    updatedAt: "2026-03-06",
    image: "/images/products/tote.jpg",
  },
  {
    id: "p2",
    name: "NESAA City Backpack",
    sku: "NES-BP-CITY-OLV",
    category: "Backpack",
    status: "Active",
    stock: 12,
    priceSingle: 64.9,
    priceWholesale: 34.0,
    moq: 8,
    updatedAt: "2026-03-05",
    image: "/images/products/backpack.jpg",
  },
  {
    id: "p3",
    name: "NESAA Crossbody Mini",
    sku: "NES-CB-MIN-CRM",
    category: "Crossbody",
    status: "Draft",
    stock: 9,
    priceSingle: 29.9,
    priceWholesale: 14.5,
    moq: 12,
    updatedAt: "2026-03-03",
    image: "/images/products/crossbody.jpg",
  },
  {
    id: "p4",
    name: "NESAA Travel Duffel",
    sku: "NES-TRAVEL-DUF-NVY",
    category: "Travel",
    status: "Archived",
    stock: 0,
    priceSingle: 89.0,
    priceWholesale: 52.0,
    moq: 6,
    updatedAt: "2026-02-28",
    image: "/images/products/duffel.jpg",
  },
];

const STATUS = ["All", "Active", "Draft", "Archived"];
const CATEGORIES = ["All", "Tote", "Backpack", "Crossbody", "Travel"];

function eur(n) {
  return new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
  }).format(n);
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

function StockPill({ stock }) {
  const style =
    stock === 0
      ? "bg-rose-100 text-rose-800 ring-rose-200"
      : stock < 10
        ? "bg-amber-100 text-amber-800 ring-amber-200"
        : "bg-emerald-100 text-emerald-800 ring-emerald-200";
  const label = stock === 0 ? "Out" : stock < 10 ? "Low" : "In";
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-extrabold ring-1 ring-inset ${style}`}
    >
      {label} • {stock}
    </span>
  );
}

export default function AdminProductsPage() {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("All");
  const [cat, setCat] = useState("All");
  const [selected, setSelected] = useState({});

  const filtered = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const okQ =
        q.trim().length === 0 ||
        p.name.toLowerCase().includes(q.toLowerCase()) ||
        p.sku.toLowerCase().includes(q.toLowerCase());
      const okS = status === "All" ? true : p.status === status;
      const okC = cat === "All" ? true : p.category === cat;
      return okQ && okS && okC;
    });
  }, [q, status, cat]);

  const allChecked =
    filtered.length > 0 && filtered.every((p) => selected[p.id] === true);
  const selectedCount = Object.values(selected).filter(Boolean).length;

  function toggleAll() {
    const next = {};
    if (!allChecked) filtered.forEach((p) => (next[p.id] = true));
    setSelected(next);
  }
  function toggleOne(id) {
    setSelected((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  function refresh() {
    alert("Refresh (connect API later)");
  }

  function exportCsv() {
    const header = [
      "id",
      "name",
      "sku",
      "category",
      "status",
      "stock",
      "priceSingle",
      "priceWholesale",
      "moq",
      "updatedAt",
    ];
    const rows = filtered.map((p) => [
      p.id,
      p.name,
      p.sku,
      p.category,
      p.status,
      p.stock,
      p.priceSingle,
      p.priceWholesale,
      p.moq,
      p.updatedAt,
    ]);

    const csv = [header, ...rows]
      .map((r) =>
        r.map((x) => `"${String(x).replaceAll('"', '""')}"`).join(","),
      )
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `products-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function bulk(action) {
    if (selectedCount === 0) return alert("Select products first.");
    alert(`${action} (selected: ${selectedCount}) — connect API later`);
  }

  function duplicate(p) {
    navigator.clipboard?.writeText(`${p.name} (${p.sku})`).catch(() => {});
    alert(`Duplicate "${p.name}" (API later)`);
  }

  function rowAction(action, id) {
    alert(`${action} ${id} (API later)`);
  }

  return (
    <div className="mx-auto px-4 py-8 sm:px-6 lg:px-8 space-y-5">
      {/* TOP HEADER */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-extrabold text-gray-900">Products</h2>
          <p className="text-sm text-gray-600">
            Manage your bags, pricing (single + wholesale), MOQ, and inventory.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={refresh}
            className="inline-flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-3 py-2 text-sm font-extrabold text-gray-800 shadow-sm transition hover:-translate-y-[1px] hover:shadow-md active:translate-y-0"
          >
            <RefreshCcw className="h-4 w-4" />
            Refresh
          </button>

          <button
            onClick={() => alert("Import CSV (connect later)")}
            className="inline-flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-3 py-2 text-sm font-extrabold text-gray-800 shadow-sm transition hover:-translate-y-[1px] hover:shadow-md active:translate-y-0"
          >
            <Upload className="h-4 w-4" />
            Import
          </button>

          <button
            onClick={exportCsv}
            className="inline-flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-3 py-2 text-sm font-extrabold text-gray-800 shadow-sm transition hover:-translate-y-[1px] hover:shadow-md active:translate-y-0"
          >
            <Download className="h-4 w-4" />
            Export CSV
          </button>

          {/* REQUIRED: Create Product button */}
          <Link
            href="/admin/products/new"
            className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-fuchsia-600 via-indigo-600 to-emerald-600 px-4 py-2 text-sm font-extrabold text-white shadow-lg transition hover:-translate-y-[1px] hover:shadow-xl active:translate-y-0"
          >
            <Plus className="h-4 w-4" />
            Create Product
          </Link>
        </div>
      </div>

      {/* FILTERS */}
      <div className="rounded-3xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search product name or SKU..."
              className="w-full rounded-2xl border border-gray-200 bg-gray-50 py-2 pl-10 pr-3 text-sm outline-none transition focus:border-gray-300 focus:bg-white"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="rounded-2xl border border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-800 outline-none"
            >
              {STATUS.map((s) => (
                <option key={s} value={s}>
                  Status: {s}
                </option>
              ))}
            </select>

            <select
              value={cat}
              onChange={(e) => setCat(e.target.value)}
              className="rounded-2xl border border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-800 outline-none"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  Category: {c}
                </option>
              ))}
            </select>

            <button
              onClick={() => {
                setQ("");
                setStatus("All");
                setCat("All");
              }}
              className="inline-flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-3 py-2 text-sm font-extrabold text-gray-800 shadow-sm transition hover:-translate-y-[1px] hover:shadow-md active:translate-y-0"
            >
              Reset
            </button>
          </div>
        </div>

        {/* BULK ACTIONS */}
        <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm font-semibold text-gray-700">
            {filtered.length} products
            {selectedCount > 0 ? (
              <span className="ml-2 text-gray-500">
                • {selectedCount} selected
              </span>
            ) : null}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => bulk("Publish")}
              className="inline-flex items-center gap-2 rounded-2xl bg-emerald-600 px-3 py-2 text-sm font-extrabold text-white shadow-sm transition hover:-translate-y-[1px] hover:shadow-md active:translate-y-0"
            >
              Publish
            </button>
            <button
              onClick={() => bulk("Unpublish")}
              className="inline-flex items-center gap-2 rounded-2xl bg-amber-600 px-3 py-2 text-sm font-extrabold text-white shadow-sm transition hover:-translate-y-[1px] hover:shadow-md active:translate-y-0"
            >
              Unpublish
            </button>
            <button
              onClick={() => bulk("Delete")}
              className="inline-flex items-center gap-2 rounded-2xl bg-rose-600 px-3 py-2 text-sm font-extrabold text-white shadow-sm transition hover:-translate-y-[1px] hover:shadow-md active:translate-y-0"
            >
              <Trash2 className="h-4 w-4" />
              Delete
            </button>
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1050px] text-left">
            <thead className="bg-gray-50">
              <tr className="text-xs font-extrabold uppercase tracking-wider text-gray-600">
                <th className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={allChecked}
                    onChange={toggleAll}
                    className="h-4 w-4 rounded border-gray-300"
                  />
                </th>
                <th className="px-4 py-3">
                  <button className="inline-flex items-center gap-1">
                    Product <ArrowUpDown className="h-3.5 w-3.5" />
                  </button>
                </th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Stock</th>
                <th className="px-4 py-3 text-right">Single</th>
                <th className="px-4 py-3 text-right">Wholesale</th>
                <th className="px-4 py-3 text-right">MOQ</th>
                <th className="px-4 py-3">Updated</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((p) => (
                <tr
                  key={p.id}
                  className="border-t border-gray-100 hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-4">
                    <input
                      type="checkbox"
                      checked={selected[p.id] === true}
                      onChange={() => toggleOne(p.id)}
                      className="h-4 w-4 rounded border-gray-300"
                    />
                  </td>

                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 overflow-hidden rounded-2xl bg-gray-100 ring-1 ring-gray-200">
                        {/* image placeholder (works even if file not found) */}
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={p.image}
                          alt={p.name}
                          className="h-full w-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src =
                              "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect width='200' height='200' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' fill='%239ca3af' font-size='14' font-family='Arial'%3ENESAA%3C/text%3E%3C/svg%3E";
                          }}
                        />
                      </div>

                      <div>
                        <div className="font-extrabold text-gray-900">
                          {p.name}
                        </div>
                        <button
                          onClick={() => navigator.clipboard?.writeText(p.sku)}
                          className="mt-1 inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-2.5 py-1.5 text-xs font-extrabold text-gray-700 hover:bg-gray-50"
                          title="Copy SKU"
                        >
                          <Copy className="h-3.5 w-3.5" />
                          {p.sku}
                        </button>
                      </div>
                    </div>
                  </td>

                  <td className="px-4 py-4">
                    <StatusPill status={p.status} />
                  </td>

                  <td className="px-4 py-4 text-sm font-semibold text-gray-800">
                    {p.category}
                  </td>

                  <td className="px-4 py-4">
                    <StockPill stock={p.stock} />
                  </td>

                  <td className="px-4 py-4 text-right font-extrabold text-gray-900">
                    {eur(p.priceSingle)}
                  </td>

                  <td className="px-4 py-4 text-right font-extrabold text-gray-900">
                    {eur(p.priceWholesale)}
                  </td>

                  <td className="px-4 py-4 text-right text-sm font-extrabold text-gray-800">
                    {p.moq}
                  </td>

                  <td className="px-4 py-4 text-sm font-semibold text-gray-700">
                    {p.updatedAt}
                  </td>

                  <td className="px-4 py-4">
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/admin/products/${p.id}`}
                        className="inline-flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-3 py-2 text-xs font-extrabold text-gray-800 shadow-sm transition hover:-translate-y-[1px] hover:shadow-md active:translate-y-0"
                      >
                        <Edit3 className="h-4 w-4" />
                        Edit
                      </Link>

                      <button
                        onClick={() => duplicate(p)}
                        className="inline-flex items-center gap-2 rounded-2xl bg-indigo-600 px-3 py-2 text-xs font-extrabold text-white shadow-sm transition hover:-translate-y-[1px] hover:shadow-md active:translate-y-0"
                      >
                        Duplicate
                      </button>

                      <button
                        onClick={() =>
                          rowAction(
                            p.status === "Archived" ? "Unarchive" : "Archive",
                            p.id,
                          )
                        }
                        className="inline-flex items-center gap-2 rounded-2xl bg-gray-900 px-3 py-2 text-xs font-extrabold text-white shadow-sm transition hover:-translate-y-[1px] hover:shadow-md active:translate-y-0"
                      >
                        <Archive className="h-4 w-4" />
                        {p.status === "Archived" ? "Unarchive" : "Archive"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={10} className="px-4 py-12 text-center">
                    <p className="text-sm font-semibold text-gray-700">
                      No products found.
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      Try changing filters or search query.
                    </p>
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-gray-100 px-4 py-3 text-sm text-gray-600">
          <span className="font-semibold">
            Showing {filtered.length} of {PRODUCTS.length}
          </span>
          <div className="flex items-center gap-2">
            <button className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm font-bold hover:bg-gray-50">
              Prev
            </button>
            <button className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm font-bold hover:bg-gray-50">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
