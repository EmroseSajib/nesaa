"use client";

import {
  ArrowUpDown,
  BadgePercent,
  CalendarDays,
  Copy,
  Download,
  Edit3,
  Plus,
  RefreshCcw,
  Search,
  ToggleLeft,
  ToggleRight,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

// ---- MOCK DATA (replace with API later) ----
const DISCOUNTS = [
  {
    id: "disc-1",
    code: "NESAA10",
    type: "Percentage",
    value: 10,
    minOrder: 0,
    usage: 42,
    limit: 200,
    status: "Active",
    startsAt: "2026-03-01",
    endsAt: "2026-04-01",
  },
  {
    id: "disc-2",
    code: "FREESHIP150",
    type: "FreeShipping",
    value: 0,
    minOrder: 150,
    usage: 18,
    limit: 100,
    status: "Active",
    startsAt: "2026-02-15",
    endsAt: "2026-06-01",
  },
  {
    id: "disc-3",
    code: "WELCOME5",
    type: "Fixed",
    value: 5,
    minOrder: 25,
    usage: 9,
    limit: 50,
    status: "Draft",
    startsAt: "2026-03-10",
    endsAt: "2026-05-10",
  },
  {
    id: "disc-4",
    code: "OLD2025",
    type: "Percentage",
    value: 15,
    minOrder: 0,
    usage: 220,
    limit: 220,
    status: "Archived",
    startsAt: "2025-11-01",
    endsAt: "2025-12-31",
  },
];

const STATUS = ["All", "Active", "Draft", "Archived"];
const TYPES = ["All", "Percentage", "Fixed", "FreeShipping"];

function eur(n) {
  return new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
  }).format(Number(n || 0));
}

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

function TypePill({ type }) {
  const map = {
    Percentage: "bg-indigo-100 text-indigo-800 ring-indigo-200",
    Fixed: "bg-fuchsia-100 text-fuchsia-800 ring-fuchsia-200",
    FreeShipping: "bg-sky-100 text-sky-800 ring-sky-200",
  };
  return (
    <span
      className={[
        "inline-flex rounded-full px-2.5 py-1 text-xs font-extrabold ring-1 ring-inset",
        map[type] || "bg-gray-100 text-gray-700 ring-gray-200",
      ].join(" ")}
    >
      {type === "FreeShipping" ? "Free Shipping" : type}
    </span>
  );
}

function formatValue(d) {
  if (d.type === "Percentage") return `${d.value}%`;
  if (d.type === "Fixed") return eur(d.value);
  return "—";
}

export default function AdminDiscountsPage() {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("All");
  const [type, setType] = useState("All");
  const [selected, setSelected] = useState({});

  const filtered = useMemo(() => {
    return DISCOUNTS.filter((d) => {
      const okQ =
        q.trim().length === 0 ||
        d.code.toLowerCase().includes(q.toLowerCase()) ||
        d.id.toLowerCase().includes(q.toLowerCase());
      const okS = status === "All" ? true : d.status === status;
      const okT = type === "All" ? true : d.type === type;
      return okQ && okS && okT;
    });
  }, [q, status, type]);

  const allChecked =
    filtered.length > 0 && filtered.every((d) => selected[d.id] === true);
  const selectedCount = Object.values(selected).filter(Boolean).length;

  function toggleAll() {
    const next = {};
    if (!allChecked) filtered.forEach((d) => (next[d.id] = true));
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
      "code",
      "type",
      "value",
      "minOrder",
      "usage",
      "limit",
      "status",
      "startsAt",
      "endsAt",
    ];
    const rows = filtered.map((d) => [
      d.id,
      d.code,
      d.type,
      d.value,
      d.minOrder,
      d.usage,
      d.limit,
      d.status,
      d.startsAt,
      d.endsAt,
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
    a.download = `discounts-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function bulk(action) {
    if (selectedCount === 0) return alert("Select discounts first.");
    alert(`${action} (selected: ${selectedCount}) — connect API later`);
  }

  function copy(code) {
    navigator.clipboard?.writeText(code).then(
      () => alert("Code copied!"),
      () => alert("Copy failed"),
    );
  }

  function toggleStatus(id) {
    alert(`Toggle active/draft for ${id} (API later)`);
  }

  return (
    <div className="mx-auto px-4 py-8 sm:px-6 lg:px-8 space-y-5">
      {/* TOP HEADER */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-extrabold text-gray-900">Discounts</h2>
          <p className="text-sm text-gray-600">
            Create promo codes, free shipping rules, and limited-time offers.
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

          {/* Create Discount button */}
          <Link
            href="/admin/discounts/new"
            className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-fuchsia-600 via-indigo-600 to-emerald-600 px-4 py-2 text-sm font-extrabold text-white shadow-lg transition hover:-translate-y-[1px] hover:shadow-xl active:translate-y-0"
          >
            <Plus className="h-4 w-4" />
            Create Discount
          </Link>
        </div>
      </div>

      {/* KPI STRIP */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Kpi
          title="Active codes"
          value={DISCOUNTS.filter((d) => d.status === "Active").length}
          icon={BadgePercent}
        />
        <Kpi
          title="Total redemptions"
          value={DISCOUNTS.reduce((a, b) => a + (b.usage || 0), 0)}
          icon={CalendarDays}
        />
        <Kpi
          title="Expiring soon"
          value={
            DISCOUNTS.filter((d) => d.status === "Active" && isSoon(d.endsAt))
              .length
          }
          icon={CalendarDays}
        />
      </div>

      {/* FILTERS */}
      <div className="rounded-3xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search by code or id..."
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
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="rounded-2xl border border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-800 outline-none"
            >
              {TYPES.map((t) => (
                <option key={t} value={t}>
                  Type:{" "}
                  {t === "All"
                    ? "All"
                    : t === "FreeShipping"
                      ? "Free Shipping"
                      : t}
                </option>
              ))}
            </select>

            <button
              onClick={() => {
                setQ("");
                setStatus("All");
                setType("All");
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
            {filtered.length} discounts
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
              <ToggleRight className="h-4 w-4" />
              Activate
            </button>
            <button
              onClick={() => bulk("Set Draft")}
              className="inline-flex items-center gap-2 rounded-2xl bg-amber-600 px-3 py-2 text-sm font-extrabold text-white shadow-sm transition hover:-translate-y-[1px] hover:shadow-md active:translate-y-0"
            >
              <ToggleLeft className="h-4 w-4" />
              Draft
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
                    Code <ArrowUpDown className="h-3.5 w-3.5" />
                  </button>
                </th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Value</th>
                <th className="px-4 py-3 text-right">Min Order</th>
                <th className="px-4 py-3 text-right">Usage</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Date Range</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((d) => (
                <tr
                  key={d.id}
                  className="border-t border-gray-100 hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-4">
                    <input
                      type="checkbox"
                      checked={selected[d.id] === true}
                      onChange={() =>
                        setSelected((p) => ({ ...p, [d.id]: !p[d.id] }))
                      }
                      className="h-4 w-4 rounded border-gray-300"
                    />
                  </td>

                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-fuchsia-500 via-indigo-500 to-emerald-500 text-white shadow">
                        <BadgePercent className="h-4 w-4" />
                      </span>

                      <div>
                        <div className="inline-flex items-center gap-2">
                          <span className="font-extrabold text-gray-900">
                            {d.code}
                          </span>
                          <button
                            onClick={() => copy(d.code)}
                            className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-2.5 py-1.5 text-xs font-extrabold text-gray-700 hover:bg-gray-50"
                            title="Copy code"
                          >
                            <Copy className="h-3.5 w-3.5" />
                            Copy
                          </button>
                        </div>
                        <div className="text-xs font-semibold text-gray-500">
                          ID: {d.id}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="px-4 py-4">
                    <TypePill type={d.type} />
                  </td>

                  <td className="px-4 py-4 text-sm font-extrabold text-gray-900">
                    {formatValue(d)}
                  </td>

                  <td className="px-4 py-4 text-right font-extrabold text-gray-900">
                    {d.minOrder ? eur(d.minOrder) : "—"}
                  </td>

                  <td className="px-4 py-4 text-right">
                    <div className="text-sm font-extrabold text-gray-900">
                      {d.usage}/{d.limit}
                    </div>
                    <div className="mt-2 h-2 w-28 rounded-full bg-gray-200">
                      <div
                        className="h-2 rounded-full bg-gradient-to-r from-fuchsia-600 via-indigo-600 to-emerald-600"
                        style={{
                          width: `${Math.min(100, Math.round((d.usage / d.limit) * 100))}%`,
                        }}
                      />
                    </div>
                  </td>

                  <td className="px-4 py-4">
                    <StatusPill status={d.status} />
                  </td>

                  <td className="px-4 py-4 text-sm font-semibold text-gray-700">
                    {d.startsAt} → {d.endsAt}
                  </td>

                  <td className="px-4 py-4">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => toggleStatus(d.id)}
                        className="inline-flex items-center gap-2 rounded-2xl bg-gray-900 px-3 py-2 text-xs font-extrabold text-white shadow-sm transition hover:-translate-y-[1px] hover:shadow-md active:translate-y-0"
                      >
                        {d.status === "Active" ? (
                          <ToggleLeft className="h-4 w-4" />
                        ) : (
                          <ToggleRight className="h-4 w-4" />
                        )}
                        Toggle
                      </button>

                      <Link
                        href={`/admin/discounts/${d.id}`}
                        className="inline-flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-3 py-2 text-xs font-extrabold text-gray-800 shadow-sm transition hover:-translate-y-[1px] hover:shadow-md active:translate-y-0"
                      >
                        <Edit3 className="h-4 w-4" />
                        Edit
                      </Link>

                      <button
                        onClick={() => alert(`Delete ${d.id} (API later)`)}
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
                  <td colSpan={9} className="px-4 py-12 text-center">
                    <p className="text-sm font-semibold text-gray-700">
                      No discounts found.
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
            Showing {filtered.length} of {DISCOUNTS.length}
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

function Kpi({ title, value, icon: Icon }) {
  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-bold text-gray-600">{title}</p>
          <p className="mt-2 text-2xl font-extrabold text-gray-900">{value}</p>
        </div>
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-fuchsia-500 via-indigo-500 to-emerald-500 text-white shadow">
          <Icon className="h-5 w-5" />
        </span>
      </div>
    </div>
  );
}

function isSoon(dateStr) {
  // very simple "expiring soon" check (within ~14 days) using local Date
  const end = new Date(dateStr + "T00:00:00");
  const now = new Date();
  const diffDays = (end - now) / (1000 * 60 * 60 * 24);
  return diffDays >= 0 && diffDays <= 14;
}
