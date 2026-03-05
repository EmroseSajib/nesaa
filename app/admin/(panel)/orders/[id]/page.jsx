"use client";

import {
  ArrowLeft,
  BadgeCheck,
  Box,
  Copy,
  Download,
  ExternalLink,
  Mail,
  MapPin,
  Package,
  Printer,
  RefreshCcw,
  ShieldCheck,
  ShoppingBag,
  Truck,
  User,
} from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useMemo, useState } from "react";

// -------- MOCK DB (replace with API later) --------
const MOCK_ORDERS = [
  {
    id: "ORD-10021",
    createdAt: "2026-03-06 14:25",
    status: "Paid",
    payment: {
      method: "iDEAL",
      paid: true,
      transactionId: "TRX-IDEAL-9A2K1",
    },
    totals: {
      subtotal: 169.9,
      shipping: 6.95,
      tax: 13.05,
      total: 189.9,
    },
    customer: {
      name: "Emma Jansen",
      email: "emma@mail.com",
      phone: "+31 6 12345678",
      channel: "Guest",
    },
    shipping: {
      name: "Emma Jansen",
      address1: "Keizersgracht 123",
      address2: "Apt 4B",
      city: "Amsterdam",
      postalCode: "1015CJ",
      country: "Netherlands",
      note: "Leave at reception if not home.",
      carrier: "PostNL",
      tracking: "NL-TRACK-8392",
    },
    items: [
      {
        sku: "NES-TOTE-BLK",
        name: "NESAA Tote Classic",
        variant: "Black",
        type: "Single",
        qty: 2,
        unitPrice: 39.95,
      },
      {
        sku: "NES-CB-MIN-CRM",
        name: "NESAA Crossbody Mini",
        variant: "Cream",
        type: "Wholesale",
        qty: 10,
        unitPrice: 18.0,
      },
    ],
    timeline: [
      { at: "2026-03-06 14:25", text: "Order created (Guest checkout)." },
      { at: "2026-03-06 14:28", text: "Payment confirmed via iDEAL." },
      { at: "2026-03-06 16:10", text: "Order moved to Paid." },
    ],
  },
];

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
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-extrabold ring-1 ring-inset",
        map[status] || "bg-gray-100 text-gray-800 ring-gray-200",
      ].join(" ")}
    >
      {status}
    </span>
  );
}

function TypePill({ type }) {
  const styles =
    type === "Wholesale"
      ? "bg-fuchsia-100 text-fuchsia-800 ring-fuchsia-200"
      : "bg-amber-100 text-amber-800 ring-amber-200";
  return (
    <span
      className={[
        "inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-extrabold ring-1 ring-inset",
        styles,
      ].join(" ")}
    >
      {type}
    </span>
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
          <div>
            <p className="text-sm font-extrabold text-gray-900">{title}</p>
          </div>
        </div>
        {right ? <div className="shrink-0">{right}</div> : null}
      </div>
      <div className="px-5 py-4">{children}</div>
    </div>
  );
}

export default function AdminOrderDetailsPage() {
  const { id } = useParams();
  const router = useRouter();

  const order = useMemo(() => {
    const orderId = String(id || "");
    return MOCK_ORDERS.find((o) => o.id === orderId) || null;
  }, [id]);

  const [status, setStatus] = useState(order?.status || "Paid");

  if (!order) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold text-gray-700">
            Order not found.
          </p>
          <Link
            href="/admin/orders"
            className="mt-4 inline-flex items-center gap-2 rounded-2xl bg-gray-900 px-4 py-2 text-sm font-extrabold text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Orders
          </Link>
        </div>
      </div>
    );
  }

  const copyText = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("Copied!");
    } catch {
      alert("Copy failed");
    }
  };

  const updateStatus = (newStatus) => {
    setStatus(newStatus);
    // TODO: connect API: PATCH /api/admin/orders/:id
    // also push timeline entry from server
  };

  const printOrder = () => window.print();
  const refresh = () => alert("Refresh (connect API later)");
  const exportInvoice = () => alert("Export invoice PDF (connect API later)");

  return (
    <div className="mx-auto px-4 py-8 sm:px-6 lg:px-8 space-y-5">
      {/* TOP BAR */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push("/admin/orders")}
            className="inline-flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-3 py-2 text-sm font-extrabold text-gray-800 shadow-sm transition hover:-translate-y-[1px] hover:shadow-md active:translate-y-0"
          >
            <ArrowLeft className="h-4 w-4" />
            Orders
          </button>

          <div>
            <h2 className="text-2xl font-extrabold text-gray-900">
              {order.id}
            </h2>
            <p className="text-sm text-gray-600">
              Created {order.createdAt} • {order.customer.channel} checkout
            </p>
          </div>
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
            onClick={printOrder}
            className="inline-flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-3 py-2 text-sm font-extrabold text-gray-800 shadow-sm transition hover:-translate-y-[1px] hover:shadow-md active:translate-y-0"
          >
            <Printer className="h-4 w-4" />
            Print
          </button>

          <button
            onClick={exportInvoice}
            className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-fuchsia-600 via-indigo-600 to-emerald-600 px-4 py-2 text-sm font-extrabold text-white shadow-lg transition hover:-translate-y-[1px] hover:shadow-xl active:translate-y-0"
          >
            <Download className="h-4 w-4" />
            Invoice
          </button>
        </div>
      </div>

      {/* STATUS + QUICK ACTIONS */}
      <div className="rounded-3xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-extrabold text-gray-900">
              Status:
            </span>
            <StatusPill status={status} />

            <div className="ml-0 lg:ml-3 inline-flex items-center gap-2 rounded-2xl border border-gray-200 bg-gray-50 px-3 py-2">
              <span className="text-xs font-extrabold text-gray-700">
                Update
              </span>
              <select
                value={status}
                onChange={(e) => updateStatus(e.target.value)}
                className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-800 outline-none"
              >
                <option value="Paid">Paid</option>
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => updateStatus("Processing")}
              className="inline-flex items-center gap-2 rounded-2xl bg-indigo-600 px-3 py-2 text-sm font-extrabold text-white shadow-sm transition hover:-translate-y-[1px] hover:shadow-md active:translate-y-0"
            >
              <Package className="h-4 w-4" />
              Start Processing
            </button>

            <button
              onClick={() => updateStatus("Shipped")}
              className="inline-flex items-center gap-2 rounded-2xl bg-sky-600 px-3 py-2 text-sm font-extrabold text-white shadow-sm transition hover:-translate-y-[1px] hover:shadow-md active:translate-y-0"
            >
              <Truck className="h-4 w-4" />
              Mark Shipped
            </button>

            <button
              onClick={() => updateStatus("Cancelled")}
              className="inline-flex items-center gap-2 rounded-2xl bg-rose-600 px-3 py-2 text-sm font-extrabold text-white shadow-sm transition hover:-translate-y-[1px] hover:shadow-md active:translate-y-0"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        {/* LEFT: ITEMS + TIMELINE */}
        <div className="space-y-5 lg:col-span-2">
          <Card
            title="Order Items"
            icon={ShoppingBag}
            right={
              <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-extrabold text-gray-700 ring-1 ring-gray-200">
                {order.items.length} items
              </span>
            }
          >
            <div className="overflow-x-auto">
              <table className="w-full min-w-[680px] text-left">
                <thead className="text-xs font-extrabold uppercase tracking-wider text-gray-500">
                  <tr>
                    <th className="py-2">Product</th>
                    <th className="py-2">SKU</th>
                    <th className="py-2">Type</th>
                    <th className="py-2 text-right">Unit</th>
                    <th className="py-2 text-right">Qty</th>
                    <th className="py-2 text-right">Line Total</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items.map((it) => {
                    const line = it.qty * it.unitPrice;
                    return (
                      <tr
                        key={it.sku + it.type}
                        className="border-t border-gray-100"
                      >
                        <td className="py-3">
                          <div className="font-extrabold text-gray-900">
                            {it.name}
                          </div>
                          <div className="text-xs font-semibold text-gray-500">
                            Variant: {it.variant}
                          </div>
                        </td>
                        <td className="py-3 text-sm font-semibold text-gray-700">
                          <button
                            className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-2.5 py-1.5 text-xs font-extrabold text-gray-800 hover:bg-gray-50"
                            onClick={() => copyText(it.sku)}
                            title="Copy SKU"
                          >
                            <Copy className="h-3.5 w-3.5" />
                            {it.sku}
                          </button>
                        </td>
                        <td className="py-3">
                          <TypePill type={it.type} />
                        </td>
                        <td className="py-3 text-right font-extrabold text-gray-900">
                          {currencyEUR(it.unitPrice)}
                        </td>
                        <td className="py-3 text-right text-sm font-extrabold text-gray-800">
                          {it.qty}
                        </td>
                        <td className="py-3 text-right font-extrabold text-gray-900">
                          {currencyEUR(line)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>

          <Card title="Timeline" icon={BadgeCheck}>
            <div className="space-y-3">
              {order.timeline.map((t, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 rounded-2xl bg-gray-50 p-3"
                >
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-gradient-to-r from-fuchsia-500 to-indigo-500" />
                  <div>
                    <div className="text-sm font-extrabold text-gray-900">
                      {t.text}
                    </div>
                    <div className="mt-1 text-xs font-semibold text-gray-500">
                      {t.at}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* RIGHT: CUSTOMER + SHIPPING + PAYMENT + TOTALS */}
        <div className="space-y-5">
          <Card
            title="Customer"
            icon={User}
            right={
              <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-extrabold text-gray-700 ring-1 ring-gray-200">
                {order.customer.channel}
              </span>
            }
          >
            <div className="space-y-3">
              <div>
                <p className="text-sm font-extrabold text-gray-900">
                  {order.customer.name}
                </p>
                <p className="text-xs font-semibold text-gray-500">
                  {order.customer.phone}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <a
                  href={`mailto:${order.customer.email}`}
                  className="inline-flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-3 py-2 text-xs font-extrabold text-gray-800 shadow-sm hover:bg-gray-50"
                >
                  <Mail className="h-4 w-4" />
                  Email
                </a>

                <button
                  onClick={() => copyText(order.customer.email)}
                  className="inline-flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-3 py-2 text-xs font-extrabold text-gray-800 shadow-sm hover:bg-gray-50"
                >
                  <Copy className="h-4 w-4" />
                  Copy
                </button>
              </div>

              <p className="text-xs text-gray-500">{order.customer.email}</p>
            </div>
          </Card>

          <Card title="Shipping" icon={Truck}>
            <div className="space-y-3">
              <div className="rounded-2xl bg-gray-50 p-3">
                <p className="text-sm font-extrabold text-gray-900">
                  {order.shipping.name}
                </p>
                <p className="mt-1 text-xs font-semibold text-gray-600">
                  {order.shipping.address1}
                  {order.shipping.address2
                    ? `, ${order.shipping.address2}`
                    : ""}
                </p>
                <p className="text-xs font-semibold text-gray-600">
                  {order.shipping.postalCode} • {order.shipping.city}
                </p>
                <p className="text-xs font-semibold text-gray-600">
                  {order.shipping.country}
                </p>
              </div>

              {order.shipping.note ? (
                <div className="rounded-2xl border border-amber-200 bg-amber-50 p-3">
                  <p className="text-xs font-extrabold text-amber-900">
                    Delivery note
                  </p>
                  <p className="mt-1 text-xs text-amber-800">
                    {order.shipping.note}
                  </p>
                </div>
              ) : null}

              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() =>
                    copyText(
                      `${order.shipping.address1}, ${order.shipping.postalCode} ${order.shipping.city}`,
                    )
                  }
                  className="inline-flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-3 py-2 text-xs font-extrabold text-gray-800 shadow-sm hover:bg-gray-50"
                >
                  <MapPin className="h-4 w-4" />
                  Copy address
                </button>

                <button
                  onClick={() => alert("Open maps (connect later)")}
                  className="inline-flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-3 py-2 text-xs font-extrabold text-gray-800 shadow-sm hover:bg-gray-50"
                >
                  <ExternalLink className="h-4 w-4" />
                  Maps
                </button>
              </div>

              <div className="rounded-2xl bg-gray-50 p-3">
                <p className="text-xs font-extrabold text-gray-700">Carrier</p>
                <p className="text-sm font-extrabold text-gray-900">
                  {order.shipping.carrier}
                </p>

                <div className="mt-2 flex items-center justify-between gap-2">
                  <div>
                    <p className="text-xs font-semibold text-gray-500">
                      Tracking
                    </p>
                    <p className="text-sm font-extrabold text-gray-900">
                      {order.shipping.tracking}
                    </p>
                  </div>
                  <button
                    onClick={() => copyText(order.shipping.tracking)}
                    className="inline-flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-3 py-2 text-xs font-extrabold text-gray-800 shadow-sm hover:bg-gray-50"
                  >
                    <Copy className="h-4 w-4" />
                    Copy
                  </button>
                </div>
              </div>
            </div>
          </Card>

          <Card title="Payment" icon={ShieldCheck}>
            <div className="space-y-3">
              <div className="rounded-2xl bg-gray-50 p-3">
                <p className="text-xs font-extrabold text-gray-700">Method</p>
                <p className="text-sm font-extrabold text-gray-900">
                  {order.payment.method}
                </p>
                <p className="mt-2 text-xs font-semibold text-gray-500">
                  Transaction ID
                </p>
                <div className="mt-1 flex items-center justify-between gap-2">
                  <p className="text-sm font-extrabold text-gray-900">
                    {order.payment.transactionId}
                  </p>
                  <button
                    onClick={() => copyText(order.payment.transactionId)}
                    className="inline-flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-3 py-2 text-xs font-extrabold text-gray-800 shadow-sm hover:bg-gray-50"
                  >
                    <Copy className="h-4 w-4" />
                    Copy
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between rounded-2xl border border-gray-200 bg-white p-3">
                <div className="flex items-center gap-2">
                  <span
                    className={[
                      "h-2.5 w-2.5 rounded-full",
                      order.payment.paid ? "bg-emerald-500" : "bg-rose-500",
                    ].join(" ")}
                  />
                  <p className="text-sm font-extrabold text-gray-900">
                    {order.payment.paid ? "Payment confirmed" : "Not paid"}
                  </p>
                </div>
                <button
                  onClick={() => alert("Manual payment verify (API later)")}
                  className="inline-flex items-center gap-2 rounded-2xl bg-gray-900 px-3 py-2 text-xs font-extrabold text-white hover:bg-black"
                >
                  <Box className="h-4 w-4" />
                  Verify
                </button>
              </div>
            </div>
          </Card>

          <Card title="Totals" icon={Package}>
            <div className="space-y-2">
              <Row
                label="Subtotal"
                value={currencyEUR(order.totals.subtotal)}
              />
              <Row
                label="Shipping"
                value={currencyEUR(order.totals.shipping)}
              />
              <Row label="Tax" value={currencyEUR(order.totals.tax)} />
              <div className="my-2 h-px bg-gray-200" />
              <Row
                label="Total"
                value={currencyEUR(order.totals.total)}
                strong
              />
            </div>
          </Card>
        </div>
      </div>

      {/* Print styles (optional) */}
      <style jsx global>{`
        @media print {
          header,
          aside,
          .no-print {
            display: none !important;
          }
          body {
            background: white !important;
          }
        }
      `}</style>
    </div>
  );
}

function Row({ label, value, strong }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm font-semibold text-gray-700">{label}</span>
      <span
        className={[
          strong ? "text-lg font-extrabold" : "text-sm font-extrabold",
          "text-gray-900",
        ].join(" ")}
      >
        {value}
      </span>
    </div>
  );
}
