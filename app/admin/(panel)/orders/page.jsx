"use client";

import {
  ArrowUpDown,
  CheckCircle2,
  Download,
  Eye,
  Filter,
  PackageCheck,
  RefreshCcw,
  Search,
  Truck,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

// ---- MOCK DATA (replace later with API) ----
const ORDERS = [
  {
    id: "ORD-10021",
    customer: "Emma Jansen",
    email: "emma@mail.com",
    date: "2026-03-06",
    status: "Paid",
    payment: "iDEAL",
    total: 189.9,
    items: 4,
    channel: "Guest",
  },
  {
    id: "ORD-10022",
    customer: "Noah de Vries",
    email: "noah@mail.com",
    date: "2026-03-05",
    status: "Processing",
    payment: "Card",
    total: 74.5,
    items: 2,
    channel: "Account",
  },
  {
    id: "ORD-10023",
    customer: "Sophie Bakker",
    email: "sophie@mail.com",
    date: "2026-03-05",
    status: "Shipped",
    payment: "PayPal",
    total: 249.0,
    items: 6,
    channel: "Account",
  },
  {
    id: "ORD-10024",
    customer: "Liam Visser",
    email: "liam@mail.com",
    date: "2026-03-04",
    status: "Cancelled",
    payment: "Card",
    total: 39.95,
    items: 1,
    channel: "Guest",
  },
];

const STATUS_OPTIONS = ["All", "Paid", "Processing", "Shipped", "Cancelled"];
const PAYMENT_OPTIONS = ["All", "iDEAL", "Card", "PayPal"];

function currencyEUR(n) {
  return new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
  }).format(n);
}

function StatusPill({ status }) {
  const map = {
    Paid: "bg-emerald-100 text-emerald-800 ring-emerald-200",
    Processing: "bg-indigo-100 text-indigo-800 ring-indigo-200",
    Shipped: "bg-sky-100 text-sky-800 ring-sky-200",
    Cancelled: "bg-rose-100 text-rose-800 ring-rose-200",
  };
  return (
    <span
      className={[
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold ring-1 ring-inset",
        map[status] || "bg-gray-100 text-gray-800 ring-gray-200",
      ].join(" ")}
    >
      {status}
    </span>
  );
}

export default function AdminOrdersPage() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All");
  const [payment, setPayment] = useState("All");
  const [selected, setSelected] = useState({}); // id -> boolean

  const filtered = useMemo(() => {
    return ORDERS.filter((o) => {
      const q =
        query.trim().length === 0 ||
        o.id.toLowerCase().includes(query.toLowerCase()) ||
        o.customer.toLowerCase().includes(query.toLowerCase()) ||
        o.email.toLowerCase().includes(query.toLowerCase());

      const s = status === "All" ? true : o.status === status;
      const p = payment === "All" ? true : o.payment === payment;

      return q && s && p;
    });
  }, [query, status, payment]);

  const allChecked =
    filtered.length > 0 && filtered.every((o) => selected[o.id] === true);

  const selectedCount = Object.values(selected).filter(Boolean).length;

  function toggleAll() {
    const next = {};
    if (!allChecked) filtered.forEach((o) => (next[o.id] = true));
    setSelected(next);
  }

  function toggleOne(id) {
    setSelected((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  // ---- Button handlers (UI only now) ----
  function exportCsv() {
    // simple CSV export from filtered list
    const header = [
      "id",
      "customer",
      "email",
      "date",
      "status",
      "payment",
      "total",
      "items",
      "channel",
    ];
    const rows = filtered.map((o) => [
      o.id,
      o.customer,
      o.email,
      o.date,
      o.status,
      o.payment,
      o.total,
      o.items,
      o.channel,
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
    a.download = `orders-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function refresh() {
    // later: refetch orders
    // for now: small UI feedback
    alert("Refresh (connect API later)");
  }

  function bulkAction(action) {
    if (selectedCount === 0) return alert("Select orders first.");
    alert(`${action} (selected: ${selectedCount}) — connect API later`);
  }

  return (
    <div className="mx-auto  px-4 py-8 sm:px-6 lg:px-8 space-y-5">
      {/* Header row */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-extrabold text-gray-900">Orders</h2>
          <p className="text-sm text-gray-600">
            Manage orders, payments, and fulfillment for NESAA.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={refresh}
            className="inline-flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-3 py-2 text-sm font-bold text-gray-800 shadow-sm transition hover:-translate-y-[1px] hover:shadow-md active:translate-y-0"
          >
            <RefreshCcw className="h-4 w-4" />
            Refresh
          </button>

          <button
            onClick={exportCsv}
            className="inline-flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-3 py-2 text-sm font-bold text-gray-800 shadow-sm transition hover:-translate-y-[1px] hover:shadow-md active:translate-y-0"
          >
            <Download className="h-4 w-4" />
            Export CSV
          </button>

          <Link
            href="/admin/orders/new"
            className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-fuchsia-600 via-indigo-600 to-emerald-600 px-4 py-2 text-sm font-extrabold text-white shadow-lg transition hover:-translate-y-[1px] hover:shadow-xl active:translate-y-0"
          >
            + Create Order
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="rounded-3xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          {/* search */}
          <div className="relative w-full lg:max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by order id, customer, or email..."
              className="w-full rounded-2xl border border-gray-200 bg-gray-50 py-2 pl-10 pr-3 text-sm outline-none transition focus:border-gray-300 focus:bg-white"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-2 rounded-2xl border border-gray-200 bg-gray-50 px-3 py-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <span className="text-xs font-bold text-gray-700">Filters</span>
            </div>

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

            <select
              value={payment}
              onChange={(e) => setPayment(e.target.value)}
              className="rounded-2xl border border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-800 outline-none"
            >
              {PAYMENT_OPTIONS.map((p) => (
                <option key={p} value={p}>
                  Payment: {p}
                </option>
              ))}
            </select>

            <button
              onClick={() => {
                setQuery("");
                setStatus("All");
                setPayment("All");
              }}
              className="inline-flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-3 py-2 text-sm font-bold text-gray-800 shadow-sm transition hover:-translate-y-[1px] hover:shadow-md active:translate-y-0"
            >
              <XCircle className="h-4 w-4" />
              Reset
            </button>
          </div>
        </div>

        {/* Bulk actions */}
        <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm font-semibold text-gray-700">
            {filtered.length} orders
            {selectedCount > 0 ? (
              <span className="ml-2 text-gray-500">
                • {selectedCount} selected
              </span>
            ) : null}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => bulkAction("Mark as Shipped")}
              className="inline-flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-3 py-2 text-sm font-bold text-gray-800 shadow-sm transition hover:-translate-y-[1px] hover:shadow-md active:translate-y-0"
            >
              <Truck className="h-4 w-4" />
              Mark Shipped
            </button>
            <button
              onClick={() => bulkAction("Mark as Paid")}
              className="inline-flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-3 py-2 text-sm font-bold text-gray-800 shadow-sm transition hover:-translate-y-[1px] hover:shadow-md active:translate-y-0"
            >
              <CheckCircle2 className="h-4 w-4" />
              Mark Paid
            </button>
            <button
              onClick={() => bulkAction("Print")}
              className="inline-flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-3 py-2 text-sm font-bold text-gray-800 shadow-sm transition hover:-translate-y-[1px] hover:shadow-md active:translate-y-0"
            >
              <PackageCheck className="h-4 w-4" />
              Print
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[920px] text-left">
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
                    Order <ArrowUpDown className="h-3.5 w-3.5" />
                  </button>
                </th>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Payment</th>
                <th className="px-4 py-3 text-right">Total</th>
                <th className="px-4 py-3 text-right">Items</th>
                <th className="px-4 py-3">Channel</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((o) => (
                <tr
                  key={o.id}
                  className="border-t border-gray-100 hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-4">
                    <input
                      type="checkbox"
                      checked={selected[o.id] === true}
                      onChange={() => toggleOne(o.id)}
                      className="h-4 w-4 rounded border-gray-300"
                    />
                  </td>

                  <td className="px-4 py-4 font-extrabold text-gray-900">
                    {o.id}
                    <div className="text-xs font-medium text-gray-500">
                      {o.email}
                    </div>
                  </td>

                  <td className="px-4 py-4 text-sm font-semibold text-gray-800">
                    {o.customer}
                  </td>

                  <td className="px-4 py-4 text-sm text-gray-700">{o.date}</td>

                  <td className="px-4 py-4">
                    <StatusPill status={o.status} />
                  </td>

                  <td className="px-4 py-4 text-sm font-semibold text-gray-800">
                    {o.payment}
                  </td>

                  <td className="px-4 py-4 text-right font-extrabold text-gray-900">
                    {currencyEUR(o.total)}
                  </td>

                  <td className="px-4 py-4 text-right text-sm font-semibold text-gray-800">
                    {o.items}
                  </td>

                  <td className="px-4 py-4 text-sm font-semibold text-gray-800">
                    {o.channel}
                  </td>

                  <td className="px-4 py-4">
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/admin/orders/${o.id}`}
                        className="inline-flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-3 py-2 text-xs font-extrabold text-gray-800 shadow-sm transition hover:-translate-y-[1px] hover:shadow-md active:translate-y-0"
                      >
                        <Eye className="h-4 w-4" />
                        View
                      </Link>

                      <button
                        onClick={() =>
                          alert(`Mark ${o.id} as paid (API later)`)
                        }
                        className="inline-flex items-center gap-2 rounded-2xl bg-emerald-600 px-3 py-2 text-xs font-extrabold text-white shadow-sm transition hover:-translate-y-[1px] hover:shadow-md active:translate-y-0"
                      >
                        <CheckCircle2 className="h-4 w-4" />
                        Paid
                      </button>

                      <button
                        onClick={() =>
                          alert(`Mark ${o.id} as shipped (API later)`)
                        }
                        className="inline-flex items-center gap-2 rounded-2xl bg-indigo-600 px-3 py-2 text-xs font-extrabold text-white shadow-sm transition hover:-translate-y-[1px] hover:shadow-md active:translate-y-0"
                      >
                        <Truck className="h-4 w-4" />
                        Shipped
                      </button>

                      <button
                        onClick={() => alert(`Cancel ${o.id} (API later)`)}
                        className="inline-flex items-center gap-2 rounded-2xl bg-rose-600 px-3 py-2 text-xs font-extrabold text-white shadow-sm transition hover:-translate-y-[1px] hover:shadow-md active:translate-y-0"
                      >
                        <XCircle className="h-4 w-4" />
                        Cancel
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={10} className="px-4 py-12 text-center">
                    <p className="text-sm font-semibold text-gray-700">
                      No orders found.
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
            Showing {filtered.length} of {ORDERS.length}
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
