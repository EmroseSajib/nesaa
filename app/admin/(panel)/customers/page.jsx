"use client";

import {
  ArrowUpDown,
  Ban,
  Download,
  Eye,
  Mail,
  RefreshCcw,
  Search,
  ShieldCheck,
  User,
  UserPlus,
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

// ---- MOCK DATA (replace with API later) ----
const CUSTOMERS = [
  {
    id: "cus_1001",
    name: "Emma Jansen",
    email: "emma@mail.com",
    phone: "+31 6 12345678",
    type: "Guest",
    orders: 2,
    spent: 189.9,
    status: "Active",
    lastOrder: "2026-03-06",
    createdAt: "2026-02-11",
    city: "Amsterdam",
    country: "Netherlands",
  },
  {
    id: "cus_1002",
    name: "Noah de Vries",
    email: "noah@mail.com",
    phone: "+31 6 87654321",
    type: "Account",
    orders: 5,
    spent: 642.5,
    status: "Active",
    lastOrder: "2026-03-05",
    createdAt: "2025-12-18",
    city: "Rotterdam",
    country: "Netherlands",
  },
  {
    id: "cus_1003",
    name: "Sophie Bakker",
    email: "sophie@mail.com",
    phone: "+31 6 55551234",
    type: "Account",
    orders: 1,
    spent: 74.5,
    status: "Active",
    lastOrder: "2026-03-01",
    createdAt: "2026-02-28",
    city: "Utrecht",
    country: "Netherlands",
  },
  {
    id: "cus_1004",
    name: "Liam Visser",
    email: "liam@mail.com",
    phone: "+31 6 22223333",
    type: "Guest",
    orders: 1,
    spent: 39.95,
    status: "Blocked",
    lastOrder: "2026-03-04",
    createdAt: "2026-03-04",
    city: "Haarlem",
    country: "Netherlands",
  },
];

const TYPE_OPTIONS = ["All", "Account", "Guest"];
const STATUS_OPTIONS = ["All", "Active", "Blocked"];

function eur(n) {
  return new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
  }).format(Number(n || 0));
}

function Pill({ children, className }) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-extrabold ring-1 ring-inset ${className}`}
    >
      {children}
    </span>
  );
}

function TypePill({ type }) {
  return type === "Account" ? (
    <Pill className="bg-indigo-100 text-indigo-800 ring-indigo-200">
      Account
    </Pill>
  ) : (
    <Pill className="bg-amber-100 text-amber-800 ring-amber-200">Guest</Pill>
  );
}

function StatusPill({ status }) {
  return status === "Active" ? (
    <Pill className="bg-emerald-100 text-emerald-800 ring-emerald-200">
      Active
    </Pill>
  ) : (
    <Pill className="bg-rose-100 text-rose-800 ring-rose-200">Blocked</Pill>
  );
}

export default function AdminCustomersPage() {
  const [q, setQ] = useState("");
  const [type, setType] = useState("All");
  const [status, setStatus] = useState("All");
  const [selected, setSelected] = useState({});

  const filtered = useMemo(() => {
    return CUSTOMERS.filter((c) => {
      const okQ =
        q.trim().length === 0 ||
        c.name.toLowerCase().includes(q.toLowerCase()) ||
        c.email.toLowerCase().includes(q.toLowerCase()) ||
        c.id.toLowerCase().includes(q.toLowerCase());
      const okT = type === "All" ? true : c.type === type;
      const okS = status === "All" ? true : c.status === status;
      return okQ && okT && okS;
    });
  }, [q, type, status]);

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
      "email",
      "phone",
      "type",
      "status",
      "orders",
      "spent",
      "lastOrder",
      "createdAt",
      "city",
      "country",
    ];
    const rows = filtered.map((c) => [
      c.id,
      c.name,
      c.email,
      c.phone,
      c.type,
      c.status,
      c.orders,
      c.spent,
      c.lastOrder,
      c.createdAt,
      c.city,
      c.country,
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
    a.download = `customers-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function bulk(action) {
    if (selectedCount === 0) return alert("Select customers first.");
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
          <h2 className="text-2xl font-extrabold text-gray-900">Customers</h2>
          <p className="text-sm text-gray-600">
            View customer profiles, contact details, and purchase activity.
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

          {/* Optional create customer button (UI) */}
          <Link
            href="/admin/customers/new"
            className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-fuchsia-600 via-indigo-600 to-emerald-600 px-4 py-2 text-sm font-extrabold text-white shadow-lg transition hover:-translate-y-[1px] hover:shadow-xl active:translate-y-0"
          >
            <UserPlus className="h-4 w-4" />
            Add Customer
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
              placeholder="Search by name, email, or customer id..."
              className="w-full rounded-2xl border border-gray-200 bg-gray-50 py-2 pl-10 pr-3 text-sm outline-none transition focus:border-gray-300 focus:bg-white"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="rounded-2xl border border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-800 outline-none"
            >
              {TYPE_OPTIONS.map((t) => (
                <option key={t} value={t}>
                  Type: {t}
                </option>
              ))}
            </select>

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="rounded-2xl border border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-800 outline-none"
            >
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>
                  Status: {s}
                </option>
              ))}
            </select>

            <button
              onClick={() => {
                setQ("");
                setType("All");
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
            {filtered.length} customers
            {selectedCount > 0 ? (
              <span className="ml-2 text-gray-500">
                • {selectedCount} selected
              </span>
            ) : null}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => bulk("Mark Verified")}
              className="inline-flex items-center gap-2 rounded-2xl bg-indigo-600 px-3 py-2 text-sm font-extrabold text-white shadow-sm transition hover:-translate-y-[1px] hover:shadow-md active:translate-y-0"
            >
              <ShieldCheck className="h-4 w-4" />
              Verify
            </button>

            <button
              onClick={() => bulk("Block")}
              className="inline-flex items-center gap-2 rounded-2xl bg-rose-600 px-3 py-2 text-sm font-extrabold text-white shadow-sm transition hover:-translate-y-[1px] hover:shadow-md active:translate-y-0"
            >
              <Ban className="h-4 w-4" />
              Block
            </button>
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1100px] text-left">
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
                    Customer <ArrowUpDown className="h-3.5 w-3.5" />
                  </button>
                </th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Location</th>
                <th className="px-4 py-3 text-right">Orders</th>
                <th className="px-4 py-3 text-right">Spent</th>
                <th className="px-4 py-3">Last Order</th>
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
                        <User className="h-4 w-4" />
                      </span>
                      <div>
                        <div className="font-extrabold text-gray-900">
                          {c.name}
                        </div>
                        <div className="text-xs font-semibold text-gray-500">
                          {c.email}
                        </div>
                        <div className="text-[11px] text-gray-400">
                          ID: {c.id}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="px-4 py-4">
                    <TypePill type={c.type} />
                  </td>

                  <td className="px-4 py-4">
                    <StatusPill status={c.status} />
                  </td>

                  <td className="px-4 py-4 text-sm font-semibold text-gray-800">
                    {c.city}, {c.country}
                  </td>

                  <td className="px-4 py-4 text-right font-extrabold text-gray-900">
                    {c.orders}
                  </td>

                  <td className="px-4 py-4 text-right font-extrabold text-gray-900">
                    {eur(c.spent)}
                  </td>

                  <td className="px-4 py-4 text-sm font-semibold text-gray-700">
                    {c.lastOrder}
                  </td>

                  <td className="px-4 py-4">
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/admin/customers/${c.id}`}
                        className="inline-flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-3 py-2 text-xs font-extrabold text-gray-800 shadow-sm transition hover:-translate-y-[1px] hover:shadow-md active:translate-y-0"
                      >
                        <Eye className="h-4 w-4" />
                        View
                      </Link>

                      <a
                        href={`mailto:${c.email}`}
                        className="inline-flex items-center gap-2 rounded-2xl bg-indigo-600 px-3 py-2 text-xs font-extrabold text-white shadow-sm transition hover:-translate-y-[1px] hover:shadow-md active:translate-y-0"
                      >
                        <Mail className="h-4 w-4" />
                        Email
                      </a>

                      <button
                        onClick={() =>
                          rowAction(
                            c.status === "Blocked" ? "Unblock" : "Block",
                            c.id,
                          )
                        }
                        className={`inline-flex items-center gap-2 rounded-2xl px-3 py-2 text-xs font-extrabold text-white shadow-sm transition hover:-translate-y-[1px] hover:shadow-md active:translate-y-0 ${
                          c.status === "Blocked"
                            ? "bg-emerald-600"
                            : "bg-rose-600"
                        }`}
                      >
                        {c.status === "Blocked" ? "Unblock" : "Block"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-4 py-12 text-center">
                    <p className="text-sm font-semibold text-gray-700">
                      No customers found.
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
            Showing {filtered.length} of {CUSTOMERS.length}
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
