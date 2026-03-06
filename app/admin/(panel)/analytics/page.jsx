"use client";

import {
  ArrowUpRight,
  CalendarDays,
  Download,
  Filter,
  Package,
  RefreshCcw,
  ShoppingBag,
  TrendingUp,
  Users,
  Wallet,
} from "lucide-react";
import { useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// ---- MOCK DATA (replace with API later) ----
const revenueTrend = [
  { label: "Mon", revenue: 2400, orders: 18 },
  { label: "Tue", revenue: 1398, orders: 11 },
  { label: "Wed", revenue: 9800, orders: 44 },
  { label: "Thu", revenue: 3908, orders: 21 },
  { label: "Fri", revenue: 4800, orders: 25 },
  { label: "Sat", revenue: 3800, orders: 19 },
  { label: "Sun", revenue: 5100, orders: 26 },
];

const channelData = [
  { name: "Guest Checkout", value: 58 },
  { name: "Account", value: 42 },
];

const pricingMix = [
  { name: "Single", value: 63 },
  { name: "Wholesale", value: 37 },
];

const topProducts = [
  { name: "NESAA Tote Classic", units: 312, revenue: 8420 },
  { name: "NESAA City Backpack", units: 221, revenue: 6790 },
  { name: "NESAA Crossbody Mini", units: 178, revenue: 5325 },
  { name: "NESAA Travel Duffel", units: 132, revenue: 4980 },
  { name: "NESAA Weekender", units: 96, revenue: 4025 },
];

const geoData = [
  { city: "Amsterdam", orders: 142 },
  { city: "Rotterdam", orders: 96 },
  { city: "Utrecht", orders: 73 },
  { city: "The Hague", orders: 58 },
  { city: "Eindhoven", orders: 44 },
];

const COLORS_A = ["#22c55e", "#6366f1", "#f59e0b", "#ef4444", "#a855f7"];

function eur(n) {
  return new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
  }).format(Number(n || 0));
}

function Card({ title, subtitle, right, children }) {
  return (
    <div className="rounded-3xl border border-gray-200 bg-white shadow-sm overflow-hidden">
      <div className="flex items-start justify-between gap-4 border-b border-gray-100 px-6 py-5">
        <div>
          <h3 className="text-sm font-extrabold text-gray-900">{title}</h3>
          {subtitle ? (
            <p className="mt-1 text-xs text-gray-500">{subtitle}</p>
          ) : null}
        </div>
        {right ? <div className="shrink-0">{right}</div> : null}
      </div>
      <div className="px-6 py-5">{children}</div>
    </div>
  );
}

function Kpi({ title, value, hint, icon: Icon }) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-[1px] hover:shadow-md">
      <div className="absolute -inset-24 bg-gradient-to-r from-fuchsia-500/10 via-indigo-500/10 to-emerald-500/10 blur-3xl" />
      <div className="relative flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-bold text-gray-600">{title}</p>
          <p className="mt-2 text-2xl font-extrabold tracking-tight text-gray-900">
            {value}
          </p>
          {hint ? <p className="mt-2 text-xs text-gray-500">{hint}</p> : null}
        </div>
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-fuchsia-500 via-indigo-500 to-emerald-500 text-white shadow">
          <Icon className="h-5 w-5" />
        </span>
      </div>
      <button className="relative mt-4 inline-flex items-center gap-1 text-xs font-extrabold text-gray-800 hover:text-black">
        <ArrowUpRight className="h-4 w-4" />
        View details
      </button>
    </div>
  );
}

export default function AdminAnalyticsPage() {
  const [range, setRange] = useState("7d"); // 7d | 30d | 90d

  const totalRevenue = useMemo(
    () => revenueTrend.reduce((a, b) => a + b.revenue, 0),
    [],
  );
  const totalOrders = useMemo(
    () => revenueTrend.reduce((a, b) => a + b.orders, 0),
    [],
  );

  const avgOrderValue = useMemo(() => {
    if (!totalOrders) return 0;
    return totalRevenue / totalOrders;
  }, [totalOrders, totalRevenue]);

  const conversionHint = useMemo(() => {
    // mock conversion — replace later with real site sessions
    const sessions = range === "7d" ? 8200 : range === "30d" ? 34800 : 97200;
    const conv = sessions ? (totalOrders / sessions) * 100 : 0;
    return `${conv.toFixed(2)}% conversion • ${sessions.toLocaleString()} sessions`;
  }, [range, totalOrders]);

  function refresh() {
    alert("Refresh (connect API later)");
  }

  function exportReport() {
    alert("Export report (connect API later)");
  }

  return (
    <div className="mx-auto max-w-7xl space-y-5">
      {/* TOP HEADER */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-extrabold text-gray-900">Analytics</h2>
          <p className="text-sm text-gray-600">
            Revenue, orders, pricing mix (single vs wholesale), and customer
            behavior.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* range switch */}
          <div className="inline-flex rounded-2xl border border-gray-200 bg-white p-1 shadow-sm">
            {["7d", "30d", "90d"].map((k) => (
              <button
                key={k}
                onClick={() => setRange(k)}
                className={[
                  "rounded-xl px-3 py-1.5 text-sm font-extrabold transition",
                  range === k
                    ? "bg-gray-900 text-white"
                    : "text-gray-700 hover:bg-gray-100",
                ].join(" ")}
              >
                {k.toUpperCase()}
              </button>
            ))}
          </div>

          <button
            onClick={refresh}
            className="inline-flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-3 py-2 text-sm font-extrabold text-gray-800 shadow-sm transition hover:-translate-y-[1px] hover:shadow-md active:translate-y-0"
          >
            <RefreshCcw className="h-4 w-4" />
            Refresh
          </button>

          <button
            onClick={exportReport}
            className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-fuchsia-600 via-indigo-600 to-emerald-600 px-4 py-2 text-sm font-extrabold text-white shadow-lg transition hover:-translate-y-[1px] hover:shadow-xl active:translate-y-0"
          >
            <Download className="h-4 w-4" />
            Export
          </button>
        </div>
      </div>

      {/* KPI STRIP */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Kpi
          title="Revenue"
          value={eur(totalRevenue)}
          hint="+6.4% vs prior period"
          icon={Wallet}
        />
        <Kpi
          title="Orders"
          value={totalOrders.toLocaleString()}
          hint="Fulfillment stable"
          icon={ShoppingBag}
        />
        <Kpi
          title="AOV"
          value={eur(avgOrderValue)}
          hint="Average order value"
          icon={TrendingUp}
        />
        <Kpi title="Conversion" value="—" hint={conversionHint} icon={Users} />
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card
          title="Revenue trend"
          subtitle="Revenue by day"
          right={
            <span className="inline-flex items-center gap-2 rounded-2xl border border-gray-200 bg-gray-50 px-3 py-2 text-xs font-extrabold text-gray-700">
              <CalendarDays className="h-4 w-4" />
              {range.toUpperCase()}
            </span>
          }
        >
          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="label" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#4f46e5"
                  strokeWidth={3}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card
          title="Orders volume"
          subtitle="Orders by day"
          right={
            <span className="inline-flex items-center gap-2 rounded-2xl border border-gray-200 bg-gray-50 px-3 py-2 text-xs font-extrabold text-gray-700">
              <Filter className="h-4 w-4" />
              All channels
            </span>
          }
        >
          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="label" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="orders" fill="#111827" radius={[12, 12, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* MIX + TOP PRODUCTS */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card title="Checkout channel" subtitle="Guest vs Account">
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={channelData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={55}
                  outerRadius={95}
                >
                  {channelData.map((_, idx) => (
                    <Cell key={idx} fill={COLORS_A[idx % COLORS_A.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Pricing mix" subtitle="Single vs Wholesale">
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pricingMix}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={55}
                  outerRadius={95}
                >
                  {pricingMix.map((_, idx) => (
                    <Cell
                      key={idx}
                      fill={COLORS_A[(idx + 2) % COLORS_A.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Top cities (NL)" subtitle="Orders by location">
          <div className="space-y-3">
            {geoData.map((g) => (
              <div
                key={g.city}
                className="rounded-2xl bg-gray-50 p-4 ring-1 ring-gray-200"
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-extrabold text-gray-900">
                      {g.city}
                    </p>
                    <p className="mt-1 text-xs text-gray-500">Orders</p>
                  </div>
                  <p className="text-sm font-extrabold text-gray-900">
                    {g.orders}
                  </p>
                </div>
                <div className="mt-3 h-2 w-full rounded-full bg-white">
                  <div
                    className="h-2 rounded-full bg-gradient-to-r from-fuchsia-600 via-indigo-600 to-emerald-600"
                    style={{
                      width: `${Math.min(
                        100,
                        Math.round(
                          (g.orders /
                            Math.max(...geoData.map((x) => x.orders))) *
                            100,
                        ),
                      )}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* TOP PRODUCTS TABLE */}
      <Card
        title="Top products"
        subtitle="Units sold and revenue"
        right={
          <span className="inline-flex items-center gap-2 rounded-2xl border border-gray-200 bg-gray-50 px-3 py-2 text-xs font-extrabold text-gray-700">
            <Package className="h-4 w-4" />
            Best sellers
          </span>
        }
      >
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left">
            <thead className="text-xs font-extrabold uppercase tracking-wider text-gray-600">
              <tr>
                <th className="py-2">Product</th>
                <th className="py-2 text-right">Units</th>
                <th className="py-2 text-right">Revenue</th>
              </tr>
            </thead>
            <tbody>
              {topProducts.map((p) => (
                <tr key={p.name} className="border-t border-gray-100">
                  <td className="py-3 font-extrabold text-gray-900">
                    {p.name}
                  </td>
                  <td className="py-3 text-right text-sm font-extrabold text-gray-900">
                    {p.units}
                  </td>
                  <td className="py-3 text-right text-sm font-extrabold text-gray-900">
                    {eur(p.revenue)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
