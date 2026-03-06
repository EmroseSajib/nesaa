"use client";

import {
  ArrowUpDown,
  CheckCircle2,
  Copy,
  CreditCard,
  Download,
  Eye,
  RefreshCcw,
  Search,
  ShieldCheck,
  Wallet,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

// ---- MOCK DATA (replace with API later) ----
const PAYMENTS = [
  {
    id: "PAY-9001",
    relatedType: "Order",
    relatedId: "ORD-10021",
    customer: "Emma Jansen",
    email: "emma@mail.com",
    method: "iDEAL",
    provider: "Mollie",
    status: "Paid",
    amount: 189.9,
    currency: "EUR",
    createdAt: "2026-03-06",
    transactionId: "TRX-IDEAL-9A2K1",
  },
  {
    id: "PAY-9002",
    relatedType: "Order",
    relatedId: "ORD-10022",
    customer: "Noah de Vries",
    email: "noah@mail.com",
    method: "Card",
    provider: "Stripe",
    status: "Pending",
    amount: 74.5,
    currency: "EUR",
    createdAt: "2026-03-05",
    transactionId: "pi_3Oxx...ABCD",
  },
  {
    id: "PAY-9003",
    relatedType: "Donation",
    relatedId: "DON-2001",
    customer: "Emma Jansen",
    email: "emma@mail.com",
    method: "Card",
    provider: "Stripe",
    status: "Paid",
    amount: 25,
    currency: "EUR",
    createdAt: "2026-03-05",
    transactionId: "pi_3Oxx...KLMN",
  },
  {
    id: "PAY-9004",
    relatedType: "Order",
    relatedId: "ORD-10024",
    customer: "Liam Visser",
    email: "liam@mail.com",
    method: "PayPal",
    provider: "PayPal",
    status: "Refunded",
    amount: 39.95,
    currency: "EUR",
    createdAt: "2026-03-04",
    transactionId: "PP-REF-88321",
  },
];

const STATUS = ["All", "Paid", "Pending", "Failed", "Refunded"];
const METHODS = ["All", "iDEAL", "Card", "PayPal"];
const TYPES = ["All", "Order", "Donation"];

function eur(n) {
  return new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
  }).format(Number(n || 0));
}

function Pill({ children, className }) {
  return (
    <span
      className={[
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-extrabold ring-1 ring-inset",
        className,
      ].join(" ")}
    >
      {children}
    </span>
  );
}

function StatusPill({ status }) {
  if (status === "Paid")
    return (
      <Pill className="bg-emerald-100 text-emerald-800 ring-emerald-200">
        <CheckCircle2 className="mr-1 h-4 w-4" />
        Paid
      </Pill>
    );
  if (status === "Pending")
    return (
      <Pill className="bg-amber-100 text-amber-800 ring-amber-200">
        Pending
      </Pill>
    );
  if (status === "Refunded")
    return (
      <Pill className="bg-sky-100 text-sky-800 ring-sky-200">Refunded</Pill>
    );
  return (
    <Pill className="bg-rose-100 text-rose-800 ring-rose-200">
      <XCircle className="mr-1 h-4 w-4" />
      Failed
    </Pill>
  );
}

function MethodPill({ method }) {
  const map = {
    iDEAL: "bg-indigo-100 text-indigo-800 ring-indigo-200",
    Card: "bg-fuchsia-100 text-fuchsia-800 ring-fuchsia-200",
    PayPal: "bg-sky-100 text-sky-800 ring-sky-200",
  };
  return (
    <Pill className={map[method] || "bg-gray-100 text-gray-700 ring-gray-200"}>
      {method}
    </Pill>
  );
}

function Kpi({ title, value, icon: Icon, hint }) {
  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-bold text-gray-600">{title}</p>
          <p className="mt-2 text-2xl font-extrabold text-gray-900">{value}</p>
          {hint ? <p className="mt-1 text-xs text-gray-500">{hint}</p> : null}
        </div>
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-fuchsia-500 via-indigo-500 to-emerald-500 text-white shadow">
          <Icon className="h-5 w-5" />
        </span>
      </div>
    </div>
  );
}

export default function AdminPaymentsPage() {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("All");
  const [method, setMethod] = useState("All");
  const [type, setType] = useState("All");
  const [selected, setSelected] = useState({});

  const filtered = useMemo(() => {
    return PAYMENTS.filter((p) => {
      const okQ =
        q.trim().length === 0 ||
        p.id.toLowerCase().includes(q.toLowerCase()) ||
        p.relatedId.toLowerCase().includes(q.toLowerCase()) ||
        p.customer.toLowerCase().includes(q.toLowerCase()) ||
        p.email.toLowerCase().includes(q.toLowerCase()) ||
        p.transactionId.toLowerCase().includes(q.toLowerCase());

      const okS = status === "All" ? true : p.status === status;
      const okM = method === "All" ? true : p.method === method;
      const okT = type === "All" ? true : p.relatedType === type;

      return okQ && okS && okM && okT;
    });
  }, [q, status, method, type]);

  const allChecked =
    filtered.length > 0 && filtered.every((p) => selected[p.id] === true);
  const selectedCount = Object.values(selected).filter(Boolean).length;

  const paidTotal = useMemo(
    () =>
      PAYMENTS.filter((p) => p.status === "Paid").reduce(
        (a, b) => a + b.amount,
        0,
      ),
    [],
  );
  const pendingCount = useMemo(
    () => PAYMENTS.filter((p) => p.status === "Pending").length,
    [],
  );
  const refundTotal = useMemo(
    () =>
      PAYMENTS.filter((p) => p.status === "Refunded").reduce(
        (a, b) => a + b.amount,
        0,
      ),
    [],
  );

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
      "relatedType",
      "relatedId",
      "customer",
      "email",
      "method",
      "provider",
      "status",
      "amount",
      "currency",
      "createdAt",
      "transactionId",
    ];
    const rows = filtered.map((p) => [
      p.id,
      p.relatedType,
      p.relatedId,
      p.customer,
      p.email,
      p.method,
      p.provider,
      p.status,
      p.amount,
      p.currency,
      p.createdAt,
      p.transactionId,
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
    a.download = `payments-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function bulk(action) {
    if (selectedCount === 0) return alert("Select payments first.");
    alert(`${action} (selected: ${selectedCount}) — connect API later`);
  }

  async function copyText(text) {
    try {
      await navigator.clipboard.writeText(text);
      alert("Copied!");
    } catch {
      alert("Copy failed");
    }
  }

  function openRelated(p) {
    if (p.relatedType === "Order") return `/admin/orders/${p.relatedId}`;
    if (p.relatedType === "Donation") return `/admin/donations/${p.relatedId}`;
    return "#";
  }

  return (
    <div className="mx-auto px-4 py-8 sm:px-6 lg:px-8 space-y-5">
      {/* TOP HEADER */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-extrabold text-gray-900">Payments</h2>
          <p className="text-sm text-gray-600">
            Monitor transactions for orders and donations (iDEAL/Card/PayPal).
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

          <Link
            href="/admin/settings#payments"
            className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-fuchsia-600 via-indigo-600 to-emerald-600 px-4 py-2 text-sm font-extrabold text-white shadow-lg transition hover:-translate-y-[1px] hover:shadow-xl active:translate-y-0"
            title="Configure payment providers"
          >
            <ShieldCheck className="h-4 w-4" />
            Payment Settings
          </Link>
        </div>
      </div>

      {/* KPI STRIP */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Kpi
          title="Paid total"
          value={eur(paidTotal)}
          icon={Wallet}
          hint="All paid payments"
        />
        <Kpi
          title="Pending"
          value={pendingCount}
          icon={CreditCard}
          hint="Requires attention"
        />
        <Kpi
          title="Refunded total"
          value={eur(refundTotal)}
          icon={ShieldCheck}
          hint="Refunded payments"
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
              placeholder="Search payment id, order/donation id, or transaction..."
              className="w-full rounded-2xl border border-gray-200 bg-gray-50 py-2 pl-10 pr-3 text-sm outline-none transition focus:border-gray-300 focus:bg-white"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="rounded-2xl border border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-800 outline-none"
            >
              {TYPES.map((t) => (
                <option key={t} value={t}>
                  Type: {t}
                </option>
              ))}
            </select>

            <select
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              className="rounded-2xl border border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-800 outline-none"
            >
              {METHODS.map((m) => (
                <option key={m} value={m}>
                  Method: {m}
                </option>
              ))}
            </select>

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
                setType("All");
                setMethod("All");
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
            {filtered.length} payments
            {selectedCount > 0 ? (
              <span className="ml-2 text-gray-500">
                • {selectedCount} selected
              </span>
            ) : null}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => bulk("Mark Paid")}
              className="inline-flex items-center gap-2 rounded-2xl bg-emerald-600 px-3 py-2 text-sm font-extrabold text-white shadow-sm transition hover:-translate-y-[1px] hover:shadow-md active:translate-y-0"
            >
              <CheckCircle2 className="h-4 w-4" />
              Mark Paid
            </button>

            <button
              onClick={() => bulk("Refund")}
              className="inline-flex items-center gap-2 rounded-2xl bg-rose-600 px-3 py-2 text-sm font-extrabold text-white shadow-sm transition hover:-translate-y-[1px] hover:shadow-md active:translate-y-0"
            >
              <XCircle className="h-4 w-4" />
              Refund
            </button>
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1200px] text-left">
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
                    Payment <ArrowUpDown className="h-3.5 w-3.5" />
                  </button>
                </th>
                <th className="px-4 py-3">Related</th>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Method</th>
                <th className="px-4 py-3">Provider</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Amount</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Transaction</th>
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

                  <td className="px-4 py-4 font-extrabold text-gray-900">
                    {p.id}
                    <div className="text-xs font-semibold text-gray-500">
                      {p.currency}
                    </div>
                  </td>

                  <td className="px-4 py-4">
                    <Link
                      href={openRelated(p)}
                      className="inline-flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-3 py-2 text-xs font-extrabold text-gray-800 hover:bg-gray-50"
                    >
                      <Eye className="h-4 w-4" />
                      {p.relatedType}: {p.relatedId}
                    </Link>
                  </td>

                  <td className="px-4 py-4">
                    <div className="text-sm font-extrabold text-gray-900">
                      {p.customer}
                    </div>
                    <div className="text-xs text-gray-500">{p.email}</div>
                  </td>

                  <td className="px-4 py-4">
                    <MethodPill method={p.method} />
                  </td>

                  <td className="px-4 py-4 text-sm font-extrabold text-gray-800">
                    {p.provider}
                  </td>

                  <td className="px-4 py-4">
                    <StatusPill status={p.status} />
                  </td>

                  <td className="px-4 py-4 text-right font-extrabold text-gray-900">
                    {eur(p.amount)}
                  </td>

                  <td className="px-4 py-4 text-sm font-semibold text-gray-700">
                    {p.createdAt}
                  </td>

                  <td className="px-4 py-4">
                    <button
                      onClick={() => copyText(p.transactionId)}
                      className="inline-flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-3 py-2 text-xs font-extrabold text-gray-800 hover:bg-gray-50"
                      title="Copy transaction id"
                    >
                      <Copy className="h-4 w-4" />
                      <span className="max-w-[210px] truncate">
                        {p.transactionId}
                      </span>
                    </button>
                  </td>

                  <td className="px-4 py-4">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => alert(`Verify ${p.id} (API later)`)}
                        className="inline-flex items-center gap-2 rounded-2xl bg-gray-900 px-3 py-2 text-xs font-extrabold text-white hover:bg-black"
                      >
                        <ShieldCheck className="h-4 w-4" />
                        Verify
                      </button>

                      <button
                        onClick={() => alert(`Refund ${p.id} (API later)`)}
                        className="inline-flex items-center gap-2 rounded-2xl bg-rose-600 px-3 py-2 text-xs font-extrabold text-white hover:bg-rose-700"
                      >
                        <XCircle className="h-4 w-4" />
                        Refund
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={11} className="px-4 py-12 text-center">
                    <p className="text-sm font-semibold text-gray-700">
                      No payments found.
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
            Showing {filtered.length} of {PAYMENTS.length}
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
