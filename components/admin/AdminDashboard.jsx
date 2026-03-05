"use client";

import {
  ArrowUpRight,
  Bell,
  Box,
  Clock,
  DollarSign,
  Mail,
  PackagePlus,
  Percent,
  ShoppingCart,
  Sparkles,
  Truck,
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

// ------------------ DATA ------------------
const stats = [
  {
    title: "Total Orders",
    value: "1,245",
    hint: "+12% vs last month",
    icon: ShoppingCart,
    gradient: "from-sky-500 via-blue-500 to-indigo-500",
  },
  {
    title: "Pending Orders",
    value: "84",
    hint: "8 need attention",
    icon: Clock,
    gradient: "from-amber-400 via-orange-500 to-rose-500",
  },
  {
    title: "Delivered",
    value: "1,102",
    hint: "92% delivery rate",
    icon: Truck,
    gradient: "from-emerald-400 via-green-500 to-teal-600",
  },
  {
    title: "Total Revenue",
    value: "€58,420",
    hint: "+6.4% vs last week",
    icon: DollarSign,
    gradient: "from-fuchsia-500 via-purple-500 to-violet-600",
  },
];

const salesData = [
  { month: "Jan", sales: 4000 },
  { month: "Feb", sales: 3000 },
  { month: "Mar", sales: 5000 },
  { month: "Apr", sales: 4780 },
  { month: "May", sales: 5890 },
  { month: "Jun", sales: 6390 },
];

const revenueData = [
  { name: "Mon", revenue: 2400 },
  { name: "Tue", revenue: 1398 },
  { name: "Wed", revenue: 9800 },
  { name: "Thu", revenue: 3908 },
  { name: "Fri", revenue: 4800 },
  { name: "Sat", revenue: 3800 },
];

const orderStatusData = [
  { name: "Delivered", value: 1102 },
  { name: "Pending", value: 84 },
  { name: "Cancelled", value: 59 },
];

const COLORS = ["#22c55e", "#f59e0b", "#ef4444"];

const recentOrders = [
  {
    id: "#ORD-1001",
    customer: "John Doe",
    status: "Delivered",
    total: "€120",
    method: "iDEAL",
    time: "12m ago",
  },
  {
    id: "#ORD-1002",
    customer: "Sarah Smith",
    status: "Pending",
    total: "€75",
    method: "Card",
    time: "46m ago",
  },
  {
    id: "#ORD-1003",
    customer: "Michael Lee",
    status: "Cancelled",
    total: "€210",
    method: "PayPal",
    time: "2h ago",
  },
];

const topProducts = [
  { name: "NESAA Tote Classic", sold: 312, revenue: 8420 },
  { name: "NESAA City Backpack", sold: 221, revenue: 6790 },
  { name: "NESAA Crossbody Mini", sold: 178, revenue: 5325 },
  { name: "NESAA Travel Duffel", sold: 132, revenue: 4980 },
];

const lowStock = [
  { sku: "NES-TOTE-BLK", name: "Tote Classic (Black)", stock: 6 },
  { sku: "NES-CB-MIN-CRM", name: "Crossbody Mini (Cream)", stock: 9 },
  { sku: "NES-BP-CITY-OLV", name: "City Backpack (Olive)", stock: 12 },
];

const activity = [
  { icon: Sparkles, title: "New customer signup", meta: "Emma J • 10m ago" },
  {
    icon: Box,
    title: "Product updated",
    meta: "Tote Classic images • 34m ago",
  },
  {
    icon: Bell,
    title: "Low stock alert",
    meta: "Crossbody Mini (Cream) • 1h ago",
  },
  { icon: Mail, title: "Newsletter sent", meta: "Spring Launch • 3h ago" },
];

// ------------------ UI HELPERS ------------------
function StatusPill({ status }) {
  const styles =
    status === "Delivered"
      ? "bg-green-100 text-green-700 ring-green-200"
      : status === "Pending"
        ? "bg-amber-100 text-amber-700 ring-amber-200"
        : "bg-red-100 text-red-700 ring-red-200";
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${styles}`}
    >
      {status}
    </span>
  );
}

function GlassCard({ children, className = "" }) {
  return (
    <div
      className={[
        "relative overflow-hidden rounded-3xl border border-white/20  shadow-xl backdrop-blur-xl",
        "transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl",
        className,
      ].join(" ")}
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/60 to-white/10" />
      <div className="relative">{children}</div>
    </div>
  );
}

function CardHeader({ title, subtitle, right }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-black/5 px-6 py-5">
      <div>
        <h3 className="text-sm font-bold tracking-tight text-gray-900">
          {title}
        </h3>
        {subtitle ? (
          <p className="mt-1 text-xs text-gray-600">{subtitle}</p>
        ) : null}
      </div>
      {right ? <div className="shrink-0">{right}</div> : null}
    </div>
  );
}

function SoftButton({ children, className = "", ...props }) {
  return (
    <button
      className={[
        "inline-flex items-center gap-2 rounded-2xl px-3 py-2 text-sm font-semibold",
        "border border-white/40 bg-white/70 shadow-sm backdrop-blur",
        "transition hover:bg-white hover:shadow-md active:scale-[0.98]",
        className,
      ].join(" ")}
      {...props}
    >
      {children}
    </button>
  );
}

function PrimaryButton({ children, className = "", ...props }) {
  return (
    <button
      className={[
        "inline-flex items-center gap-2 rounded-2xl px-3 py-2 text-sm font-semibold text-white shadow-lg",
        "bg-gradient-to-r from-gray-900 via-gray-800 to-black",
        "transition hover:shadow-xl active:scale-[0.98]",
        className,
      ].join(" ")}
      {...props}
    >
      {children}
    </button>
  );
}

export default function AdminDashboard() {
  const [range, setRange] = useState("30d");

  const rangeLabel = useMemo(() => {
    if (range === "7d") return "Last 7 days";
    if (range === "30d") return "Last 30 days";
    return "Last 90 days";
  }, [range]);

  const maxSold = useMemo(
    () => Math.max(...topProducts.map((p) => p.sold)),
    [],
  );

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,#eef2ff_0%,#fdf2f8_35%,#ecfeff_70%,#f8fafc_100%)]">
      <div className="mx-auto  space-y-8 px-4 py-8 sm:px-6 lg:px-8">
        {/* KPI */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={s.title}
                className="animate-[rise_550ms_ease-out] [animation-delay:120ms] opacity-0 [animation-fill-mode:forwards]"
                style={{ animationDelay: `${idx * 90}ms` }}
              >
                <div className="relative overflow-hidden rounded-3xl bg-white/70 shadow-xl backdrop-blur-xl transition hover:-translate-y-1 hover:shadow-2xl">
                  <div
                    className={`absolute -inset-20 bg-gradient-to-r ${s.gradient} opacity-20 blur-3xl`}
                  />
                  <div className="relative p-6">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-xs font-semibold text-gray-600">
                          {s.title}
                        </p>
                        <p className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900">
                          {s.value}
                        </p>
                        <p className="mt-2 text-xs font-medium text-gray-600">
                          {s.hint}
                        </p>
                      </div>

                      <div
                        className={[
                          "rounded-2xl p-3 text-white shadow-lg",
                          `bg-gradient-to-r ${s.gradient}`,
                        ].join(" ")}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                    </div>

                    <button className="mt-5 inline-flex items-center gap-1 text-xs font-bold text-gray-800 hover:text-black">
                      <ArrowUpRight className="h-4 w-4" />
                      View details
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* QUICK ACTIONS */}
        <GlassCard>
          <div className="grid gap-4 px-6 py-5 sm:grid-cols-2 lg:grid-cols-4">
            <button className="group rounded-3xl border border-white/40 bg-white/60 p-5 text-left shadow-sm transition hover:-translate-y-1 hover:bg-white hover:shadow-lg active:scale-[0.99]">
              <div className="inline-flex rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 p-3 text-white shadow-md">
                <PackagePlus className="h-5 w-5" />
              </div>
              <p className="mt-4 text-sm font-extrabold text-gray-900">
                Add Product
              </p>
              <p className="mt-1 text-xs text-gray-600">
                Create a new bag and set pricing.
              </p>
              <p className="mt-4 text-xs font-bold text-gray-800 group-hover:text-black">
                Open →
              </p>
            </button>

            <button className="group rounded-3xl border border-white/40 bg-white/60 p-5 text-left shadow-sm transition hover:-translate-y-1 hover:bg-white hover:shadow-lg active:scale-[0.99]">
              <div className="inline-flex rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-500 p-3 text-white shadow-md">
                <ShoppingCart className="h-5 w-5" />
              </div>
              <p className="mt-4 text-sm font-extrabold text-gray-900">
                View Orders
              </p>
              <p className="mt-1 text-xs text-gray-600">
                Filter by status & recent activity.
              </p>
              <p className="mt-4 text-xs font-bold text-gray-800 group-hover:text-black">
                Open →
              </p>
            </button>

            <button className="group rounded-3xl border border-white/40 bg-white/60 p-5 text-left shadow-sm transition hover:-translate-y-1 hover:bg-white hover:shadow-lg active:scale-[0.99]">
              <div className="inline-flex rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 p-3 text-white shadow-md">
                <Percent className="h-5 w-5" />
              </div>
              <p className="mt-4 text-sm font-extrabold text-gray-900">
                Create Discount
              </p>
              <p className="mt-1 text-xs text-gray-600">
                Promo code for campaigns & events.
              </p>
              <p className="mt-4 text-xs font-bold text-gray-800 group-hover:text-black">
                Open →
              </p>
            </button>

            <button className="group rounded-3xl border border-white/40 bg-white/60 p-5 text-left shadow-sm transition hover:-translate-y-1 hover:bg-white hover:shadow-lg active:scale-[0.99]">
              <div className="inline-flex rounded-2xl bg-gradient-to-r from-fuchsia-500 to-purple-500 p-3 text-white shadow-md">
                <Mail className="h-5 w-5" />
              </div>
              <p className="mt-4 text-sm font-extrabold text-gray-900">
                Send Newsletter
              </p>
              <p className="mt-1 text-xs text-gray-600">
                Notify customers about new arrivals.
              </p>
              <p className="mt-4 text-xs font-bold text-gray-800 group-hover:text-black">
                Open →
              </p>
            </button>
          </div>
        </GlassCard>

        {/* CHARTS */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <GlassCard className="animate-[fadeIn_700ms_ease-out]">
            <CardHeader
              title="Monthly Sales Trend"
              subtitle="Sales performance by month"
              right={
                <SoftButton>
                  <Sparkles className="h-4 w-4" />
                  Insights
                </SoftButton>
              }
            />
            <div className="px-6 py-5">
              <div className="h-[320px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="sales"
                      stroke="#4f46e5"
                      strokeWidth={3}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="animate-[fadeIn_700ms_ease-out]">
            <CardHeader
              title="Weekly Revenue"
              subtitle="Revenue by day"
              right={<SoftButton>Compare</SoftButton>}
            />
            <div className="px-6 py-5">
              <div className="h-[320px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar
                      dataKey="revenue"
                      fill="#a855f7"
                      radius={[12, 12, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* LOWER GRID */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Order status */}
          <GlassCard>
            <CardHeader
              title="Order Status"
              subtitle="Delivery health"
              right={
                <span className="text-xs font-semibold text-gray-600">Now</span>
              }
            />
            <div className="px-6 py-5">
              <div className="h-[320px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={orderStatusData}
                      dataKey="value"
                      nameKey="name"
                      outerRadius={95}
                      innerRadius={58}
                    >
                      {orderStatusData.map((_, idx) => (
                        <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </GlassCard>

          {/* Top products */}
          <GlassCard className="lg:col-span-2">
            <CardHeader
              title="Top Products"
              subtitle="Best sellers (units sold)"
              right={<SoftButton>View report</SoftButton>}
            />
            <div className="px-6 py-5 space-y-4">
              {topProducts.map((p) => {
                const pct = Math.round((p.sold / maxSold) * 100);
                return (
                  <div key={p.name} className="rounded-2xl bg-white/60 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-sm font-extrabold text-gray-900">
                          {p.name}
                        </p>
                        <p className="mt-1 text-xs text-gray-600">
                          {p.sold} sold • €{p.revenue.toLocaleString()}
                        </p>
                      </div>
                      <span className="text-xs font-extrabold text-gray-900">
                        {pct}%
                      </span>
                    </div>
                    <div className="mt-3 h-2 w-full rounded-full bg-white">
                      <div
                        className="h-2 rounded-full bg-gradient-to-r from-indigo-500 to-fuchsia-500 transition-all duration-700"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </GlassCard>
        </div>
        {/* Recent Orders */}
        <GlassCard className="lg:col-span-2">
          <CardHeader
            title="Recent Orders"
            subtitle="Latest orders (NL-friendly payment methods)"
            right={<SoftButton>View all</SoftButton>}
          />
          <div className="px-6 py-5">
            <div className="-mx-2 overflow-x-auto">
              <table className="w-full min-w-[720px] border-separate border-spacing-y-2 text-left">
                <thead>
                  <tr className="text-xs font-bold text-gray-600">
                    <th className="px-2 py-2">Order</th>
                    <th className="px-2 py-2">Customer</th>
                    <th className="px-2 py-2">Status</th>
                    <th className="px-2 py-2">Method</th>
                    <th className="px-2 py-2">Time</th>
                    <th className="px-2 py-2 text-right">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((o) => (
                    <tr key={o.id} className="rounded-2xl bg-white/60">
                      <td className="px-2 py-3 font-extrabold text-gray-900">
                        {o.id}
                      </td>
                      <td className="px-2 py-3 text-sm text-gray-700">
                        {o.customer}
                      </td>
                      <td className="px-2 py-3">
                        <StatusPill status={o.status} />
                      </td>
                      <td className="px-2 py-3 text-sm font-semibold text-gray-800">
                        {o.method}
                      </td>
                      <td className="px-2 py-3 text-sm text-gray-700">
                        {o.time}
                      </td>
                      <td className="px-2 py-3 text-right font-extrabold text-gray-900">
                        {o.total}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 flex items-center justify-between text-xs text-gray-600">
              <span>Auto-refresh enabled</span>
              <span className="inline-flex items-center gap-2 font-semibold">
                <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
                Live
              </span>
            </div>
          </div>
        </GlassCard>

        {/* Orders + Inventory + Activity */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <GlassCard>
            <CardHeader
              title="Low Stock Alerts"
              subtitle="Restock soon"
              right={<SoftButton>Manage</SoftButton>}
            />
            <div className="px-6 py-5 space-y-3">
              {lowStock.map((i) => (
                <div
                  key={i.sku}
                  className="rounded-2xl bg-white/60 p-4 flex items-start justify-between gap-3"
                >
                  <div>
                    <p className="text-sm font-extrabold text-gray-900">
                      {i.name}
                    </p>
                    <p className="mt-1 text-xs text-gray-600">{i.sku}</p>
                  </div>
                  <span className="rounded-full bg-rose-100 px-3 py-1 text-xs font-extrabold text-rose-700 ring-1 ring-rose-200">
                    {i.stock} left
                  </span>
                </div>
              ))}
            </div>
          </GlassCard>

          <GlassCard>
            <CardHeader
              title="Latest Activity"
              subtitle="What happened recently"
              right={<SoftButton>See more</SoftButton>}
            />
            <div className="px-6 py-5 space-y-3">
              {activity.map((a, idx) => {
                const Icon = a.icon;
                return (
                  <div
                    key={idx}
                    className="flex items-start gap-3 rounded-2xl bg-white/60 p-4"
                  >
                    <div className="rounded-2xl bg-gradient-to-r from-gray-900 to-black p-2.5 text-white shadow">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-extrabold text-gray-900">
                        {a.title}
                      </p>
                      <p className="mt-1 text-xs text-gray-600">{a.meta}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </GlassCard>
        </div>

        {/* Tailwind keyframes (no config needed) */}
        <style jsx global>{`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(6px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          @keyframes rise {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </div>
    </div>
  );
}
