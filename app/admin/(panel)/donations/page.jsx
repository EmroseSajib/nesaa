"use client";

import {
  ArrowUpDown,
  Download,
  Eye,
  Gift,
  HeartHandshake,
  RefreshCcw,
  Search,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

// ---- MOCK DATA (replace with API later) ----
const DONATIONS = [
  {
    id: "DON-2001",
    donorName: "Emma Jansen",
    email: "emma@mail.com",
    amount: 25,
    currency: "EUR",
    status: "Paid",
    method: "iDEAL",
    createdAt: "2026-03-06",
    message: "Hope this helps. Keep going!",
    anonymous: false,
  },
  {
    id: "DON-2002",
    donorName: "Anonymous",
    email: "anon@mail.com",
    amount: 50,
    currency: "EUR",
    status: "Paid",
    method: "Card",
    createdAt: "2026-03-05",
    message: "",
    anonymous: true,
  },
  {
    id: "DON-2003",
    donorName: "Noah de Vries",
    email: "noah@mail.com",
    amount: 10,
    currency: "EUR",
    status: "Pending",
    method: "PayPal",
    createdAt: "2026-03-05",
    message: "Good luck!",
    anonymous: false,
  },
  {
    id: "DON-2004",
    donorName: "Sophie Bakker",
    email: "sophie@mail.com",
    amount: 100,
    currency: "EUR",
    status: "Refunded",
    method: "Card",
    createdAt: "2026-03-03",
    message: "❤️",
    anonymous: false,
  },
];

const STATUS = ["All", "Paid", "Pending", "Refunded"];

function eur(n) {
  return new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
  }).format(Number(n || 0));
}

function StatusPill({ status }) {
  const map = {
    Paid: "bg-emerald-100 text-emerald-800 ring-emerald-200",
    Pending: "bg-amber-100 text-amber-800 ring-amber-200",
    Refunded: "bg-rose-100 text-rose-800 ring-rose-200",
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

export default function AdminDonationsPage() {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("All");
  const [selected, setSelected] = useState({});

  const filtered = useMemo(() => {
    return DONATIONS.filter((d) => {
      const okQ =
        q.trim().length === 0 ||
        d.id.toLowerCase().includes(q.toLowerCase()) ||
        d.donorName.toLowerCase().includes(q.toLowerCase()) ||
        d.email.toLowerCase().includes(q.toLowerCase());
      const okS = status === "All" ? true : d.status === status;
      return okQ && okS;
    });
  }, [q, status]);

  const allChecked =
    filtered.length > 0 && filtered.every((d) => selected[d.id] === true);
  const selectedCount = Object.values(selected).filter(Boolean).length;

  const totalRaised = useMemo(
    () =>
      DONATIONS.filter((d) => d.status === "Paid").reduce(
        (a, b) => a + (b.amount || 0),
        0,
      ),
    [],
  );
  const paidCount = useMemo(
    () => DONATIONS.filter((d) => d.status === "Paid").length,
    [],
  );
  const pendingCount = useMemo(
    () => DONATIONS.filter((d) => d.status === "Pending").length,
    [],
  );
  const avgDonation = useMemo(
    () => (paidCount ? totalRaised / paidCount : 0),
    [paidCount, totalRaised],
  );

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
      "donorName",
      "email",
      "amount",
      "currency",
      "status",
      "method",
      "createdAt",
      "anonymous",
      "message",
    ];
    const rows = filtered.map((d) => [
      d.id,
      d.donorName,
      d.email,
      d.amount,
      d.currency,
      d.status,
      d.method,
      d.createdAt,
      d.anonymous,
      d.message,
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
    a.download = `donations-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function bulk(action) {
    if (selectedCount === 0) return alert("Select donations first.");
    alert(`${action} (selected: ${selectedCount}) — connect API later`);
  }

  return (
    <div className="mx-auto px-4 py-8 sm:px-6 lg:px-8 space-y-5">
      {/* TOP HEADER */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-extrabold text-gray-900">Donations</h2>
          <p className="text-sm text-gray-600">
            Track donations, payment status, and donor messages.
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

          {/* optional: create donation (manual) */}
          <Link
            href="/admin/donations/new"
            className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-fuchsia-600 via-indigo-600 to-emerald-600 px-4 py-2 text-sm font-extrabold text-white shadow-lg transition hover:-translate-y-[1px] hover:shadow-xl active:translate-y-0"
          >
            <Gift className="h-4 w-4" />
            Add Donation
          </Link>
        </div>
      </div>

      {/* KPI STRIP */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <Kpi
          title="Total raised"
          value={eur(totalRaised)}
          icon={HeartHandshake}
          hint="Paid donations"
        />
        <Kpi title="Paid donations" value={paidCount} icon={Gift} />
        <Kpi title="Pending" value={pendingCount} icon={ToggleRight} />
        <Kpi
          title="Average donation"
          value={eur(avgDonation)}
          icon={HeartHandshake}
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
              placeholder="Search by donation id, donor name, or email..."
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
            {filtered.length} donations
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
              <ToggleRight className="h-4 w-4" />
              Mark Paid
            </button>
            <button
              onClick={() => bulk("Mark Pending")}
              className="inline-flex items-center gap-2 rounded-2xl bg-amber-600 px-3 py-2 text-sm font-extrabold text-white shadow-sm transition hover:-translate-y-[1px] hover:shadow-md active:translate-y-0"
            >
              <ToggleLeft className="h-4 w-4" />
              Mark Pending
            </button>
            <button
              onClick={() => bulk("Refund")}
              className="inline-flex items-center gap-2 rounded-2xl bg-rose-600 px-3 py-2 text-sm font-extrabold text-white shadow-sm transition hover:-translate-y-[1px] hover:shadow-md active:translate-y-0"
            >
              Refund
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
                    Donation <ArrowUpDown className="h-3.5 w-3.5" />
                  </button>
                </th>
                <th className="px-4 py-3">Donor</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Method</th>
                <th className="px-4 py-3 text-right">Amount</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Message</th>
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
                      onChange={() => toggleOne(d.id)}
                      className="h-4 w-4 rounded border-gray-300"
                    />
                  </td>

                  <td className="px-4 py-4 font-extrabold text-gray-900">
                    {d.id}
                    <div className="text-xs font-semibold text-gray-500">
                      {d.anonymous ? "Anonymous donor" : "Named donor"}
                    </div>
                  </td>

                  <td className="px-4 py-4 text-sm font-semibold text-gray-800">
                    <div className="flex flex-col">
                      <span className="font-extrabold">{d.donorName}</span>
                      <span className="text-xs text-gray-500">{d.email}</span>
                    </div>
                  </td>

                  <td className="px-4 py-4">
                    <StatusPill status={d.status} />
                  </td>

                  <td className="px-4 py-4 text-sm font-extrabold text-gray-800">
                    {d.method}
                  </td>

                  <td className="px-4 py-4 text-right font-extrabold text-gray-900">
                    {eur(d.amount)}
                  </td>

                  <td className="px-4 py-4 text-sm font-semibold text-gray-700">
                    {d.createdAt}
                  </td>

                  <td className="px-4 py-4 text-sm text-gray-700">
                    {d.message ? (
                      <span className="line-clamp-2">{d.message}</span>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </td>

                  <td className="px-4 py-4">
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/admin/donations/${d.id}`}
                        className="inline-flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-3 py-2 text-xs font-extrabold text-gray-800 shadow-sm transition hover:-translate-y-[1px] hover:shadow-md active:translate-y-0"
                      >
                        <Eye className="h-4 w-4" />
                        View
                      </Link>

                      <button
                        onClick={() => alert(`Refund ${d.id} (API later)`)}
                        className="inline-flex items-center gap-2 rounded-2xl bg-rose-600 px-3 py-2 text-xs font-extrabold text-white shadow-sm transition hover:-translate-y-[1px] hover:shadow-md active:translate-y-0"
                      >
                        Refund
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-4 py-12 text-center">
                    <p className="text-sm font-semibold text-gray-700">
                      No donations found.
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
            Showing {filtered.length} of {DONATIONS.length}
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
