"use client";

import {
  ArrowUpDown,
  Download,
  Edit3,
  Plus,
  RefreshCcw,
  Search,
  Tag,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

// ---- MOCK DATA (replace with API later) ----
const CATEGORIES = [
  {
    id: "cat-1",
    name: "Tote",
    slug: "tote",
    productsCount: 18,
    status: "Active",
    updatedAt: "2026-03-06",
  },
  {
    id: "cat-2",
    name: "Backpack",
    slug: "backpack",
    productsCount: 9,
    status: "Active",
    updatedAt: "2026-03-05",
  },
  {
    id: "cat-3",
    name: "Crossbody",
    slug: "crossbody",
    productsCount: 12,
    status: "Active",
    updatedAt: "2026-03-04",
  },
  {
    id: "cat-4",
    name: "Travel",
    slug: "travel",
    productsCount: 4,
    status: "Draft",
    updatedAt: "2026-03-01",
  },
  {
    id: "cat-5",
    name: "Accessories",
    slug: "accessories",
    productsCount: 0,
    status: "Archived",
    updatedAt: "2026-02-22",
  },
];

const STATUS = ["All", "Active", "Draft", "Archived"];

function StatusPill({ status }) {
  const map = {
    Active: "bg-emerald-100 text-emerald-800 ring-emerald-200",
    Draft: "bg-amber-100 text-amber-800 ring-amber-200",
    Archived: "bg-gray-100 text-gray-700 ring-gray-200",
  };
  return (
    <span
      className={[
        "inline-flex rounded-full px-2.5 py-1 text-xs font-extrabold ring-1 ring-inset",
        map[status] || "bg-gray-100 text-gray-700 ring-gray-200",
      ].join(" ")}
    >
      {status}
    </span>
  );
}

export default function AdminCategoriesPage() {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("All");
  const [selected, setSelected] = useState({});

  const filtered = useMemo(() => {
    return CATEGORIES.filter((c) => {
      const okQ =
        q.trim().length === 0 ||
        c.name.toLowerCase().includes(q.toLowerCase()) ||
        c.slug.toLowerCase().includes(q.toLowerCase());
      const okS = status === "All" ? true : c.status === status;
      return okQ && okS;
    });
  }, [q, status]);

  const allChecked =
    filtered.length > 0 && filtered.every((c) => selected[c.id] === true);
  const selectedCount = Object.values(selected).filter(Boolean).length;

  function toggleAll() {
    const next = {};
    if (!allChecked) filtered.forEach((c) => (next[c.id] = true));
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
      "slug",
      "status",
      "productsCount",
      "updatedAt",
    ];
    const rows = filtered.map((c) => [
      c.id,
      c.name,
      c.slug,
      c.status,
      c.productsCount,
      c.updatedAt,
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
    a.download = `categories-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function bulk(action) {
    if (selectedCount === 0) return alert("Select categories first.");
    alert(`${action} (selected: ${selectedCount}) — connect API later`);
  }

  function rowAction(action, id) {
    alert(`${action} ${id} (API later)`);
  }

  return (
    <div className="mx-auto  px-4 py-8 sm:px-6 lg:px-8 space-y-5">
      {/* TOP HEADER */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-extrabold text-gray-900">Categories</h2>
          <p className="text-sm text-gray-600">
            Organize products for the NESAA shop. Control status and sorting.
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
            onClick={exportCsv}
            className="inline-flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-3 py-2 text-sm font-extrabold text-gray-800 shadow-sm transition hover:-translate-y-[1px] hover:shadow-md active:translate-y-0"
          >
            <Download className="h-4 w-4" />
            Export CSV
          </button>

          {/* REQUIRED: Add Category button */}
          <Link
            href="/admin/categories/new"
            className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-fuchsia-600 via-indigo-600 to-emerald-600 px-4 py-2 text-sm font-extrabold text-white shadow-lg transition hover:-translate-y-[1px] hover:shadow-xl active:translate-y-0"
          >
            <Plus className="h-4 w-4" />
            Add Category
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
              placeholder="Search category name or slug..."
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

            <button
              onClick={() => {
                setQ("");
                setStatus("All");
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
            {filtered.length} categories
            {selectedCount > 0 ? (
              <span className="ml-2 text-gray-500">
                • {selectedCount} selected
              </span>
            ) : null}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => bulk("Activate")}
              className="inline-flex items-center gap-2 rounded-2xl bg-emerald-600 px-3 py-2 text-sm font-extrabold text-white shadow-sm transition hover:-translate-y-[1px] hover:shadow-md active:translate-y-0"
            >
              Activate
            </button>
            <button
              onClick={() => bulk("Set Draft")}
              className="inline-flex items-center gap-2 rounded-2xl bg-amber-600 px-3 py-2 text-sm font-extrabold text-white shadow-sm transition hover:-translate-y-[1px] hover:shadow-md active:translate-y-0"
            >
              Draft
            </button>
            <button
              onClick={() => bulk("Archive")}
              className="inline-flex items-center gap-2 rounded-2xl bg-gray-900 px-3 py-2 text-sm font-extrabold text-white shadow-sm transition hover:-translate-y-[1px] hover:shadow-md active:translate-y-0"
            >
              Archive
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
          <table className="w-full min-w-[900px] text-left">
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
                    Category <ArrowUpDown className="h-3.5 w-3.5" />
                  </button>
                </th>
                <th className="px-4 py-3">Slug</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Products</th>
                <th className="px-4 py-3">Updated</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((c) => (
                <tr
                  key={c.id}
                  className="border-t border-gray-100 hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-4">
                    <input
                      type="checkbox"
                      checked={selected[c.id] === true}
                      onChange={() => toggleOne(c.id)}
                      className="h-4 w-4 rounded border-gray-300"
                    />
                  </td>

                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-fuchsia-500 via-indigo-500 to-emerald-500 text-white shadow">
                        <Tag className="h-4 w-4" />
                      </span>
                      <div>
                        <div className="font-extrabold text-gray-900">
                          {c.name}
                        </div>
                        <div className="text-xs font-semibold text-gray-500">
                          ID: {c.id}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="px-4 py-4 text-sm font-semibold text-gray-800">
                    {c.slug}
                  </td>

                  <td className="px-4 py-4">
                    <StatusPill status={c.status} />
                  </td>

                  <td className="px-4 py-4 text-right font-extrabold text-gray-900">
                    {c.productsCount}
                  </td>

                  <td className="px-4 py-4 text-sm font-semibold text-gray-700">
                    {c.updatedAt}
                  </td>

                  <td className="px-4 py-4">
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/admin/categories/${c.id}`}
                        className="inline-flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-3 py-2 text-xs font-extrabold text-gray-800 shadow-sm transition hover:-translate-y-[1px] hover:shadow-md active:translate-y-0"
                      >
                        <Edit3 className="h-4 w-4" />
                        Edit
                      </Link>

                      <button
                        onClick={() => rowAction("Delete", c.id)}
                        className="inline-flex items-center gap-2 rounded-2xl bg-rose-600 px-3 py-2 text-xs font-extrabold text-white shadow-sm transition hover:-translate-y-[1px] hover:shadow-md active:translate-y-0"
                      >
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center">
                    <p className="text-sm font-semibold text-gray-700">
                      No categories found.
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
            Showing {filtered.length} of {CATEGORIES.length}
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
