"use client";

import { cn } from "@/lib/utils";
import {
  BadgePercent,
  Box,
  ChartBar,
  CreditCard,
  HeartHandshake,
  LayoutDashboard,
  Settings,
  ShoppingBag,
  Tags,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const nav = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/orders", label: "Orders", icon: ShoppingBag },
  { href: "/admin/products", label: "Products", icon: Box },
  { href: "/admin/categories", label: "Categories", icon: Tags },
  { href: "/admin/customers", label: "Customers", icon: Users },
  { href: "/admin/discounts", label: "Discounts", icon: BadgePercent },
  { href: "/admin/donations", label: "Donations", icon: HeartHandshake },
  { href: "/admin/payments", label: "Payments", icon: CreditCard },
  { href: "/admin/analytics", label: "Analytics", icon: ChartBar },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex w-72 min-h-screen sticky top-0  z-40 flex-col border-r border-white/10 bg-[#0b1220]">
      {/* Top brand block */}
      <div className="relative p-5 border-b border-white/10 overflow-hidden">
        {/* glow blobs */}
        <div className="pointer-events-none absolute -top-24 -left-16 h-56 w-56 rounded-full bg-fuchsia-500/30 blur-3xl animate-[floatA_8s_ease-in-out_infinite]" />
        <div className="pointer-events-none absolute -top-24 -right-16 h-56 w-56 rounded-full bg-indigo-500/30 blur-3xl animate-[floatB_9s_ease-in-out_infinite]" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/10 to-transparent" />

        <div className="relative flex items-center gap-3">
          <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-fuchsia-500 via-indigo-500 to-emerald-500 shadow-lg ring-1 ring-white/20" />
          <div>
            <div className="font-extrabold tracking-wide text-white drop-shadow">
              NESAA Admin
            </div>
            <div className="text-xs text-white/70">Ecommerce Management</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3">
        <div className="space-y-1">
          {nav.map((item, idx) => {
            const Icon = item.icon;

            const active =
              pathname === item.href ||
              (item.href !== "/admin" && pathname?.startsWith(item.href + "/"));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group relative flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-semibold",
                  "transition-all duration-300",
                  "hover:-translate-y-[1px] hover:shadow-lg active:translate-y-0",
                  // FORCE font color (fix)
                  active ? "!text-white" : "!text-white/85 hover:!text-white",
                )}
                style={{ animation: `menuIn .45s ease-out ${idx * 40}ms both` }}
              >
                {/* gradient background */}
                <span
                  className={cn(
                    "pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300",
                    active ? "opacity-100" : "group-hover:opacity-100",
                  )}
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(236,72,153,.28), rgba(99,102,241,.24), rgba(16,185,129,.20))",
                  }}
                />

                {/* border ring */}
                <span
                  className={cn(
                    "pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset transition",
                    active
                      ? "ring-white/25"
                      : "ring-white/10 group-hover:ring-white/20",
                  )}
                />

                {/* icon chip */}
                <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/10 transition group-hover:bg-white/15">
                  <Icon className="h-4 w-4 text-white drop-shadow" />
                </span>

                {/* label */}
                <span className="relative drop-shadow">{item.label}</span>

                {/* active dot */}
                <span
                  className={cn(
                    "relative ml-auto h-2 w-2 rounded-full transition",
                    active
                      ? "bg-emerald-300 opacity-100"
                      : "bg-white/30 opacity-0 group-hover:opacity-70",
                  )}
                />
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Bottom card */}
      <div className="p-4 border-t border-white/10">
        <div className="rounded-3xl bg-white/5 p-4 ring-1 ring-white/10">
          <div className="text-sm font-extrabold text-white drop-shadow">
            Quick Tip
          </div>
          <div className="mt-1 text-xs text-white/70">
            Show Single + Wholesale price on product pages with MOQ for
            wholesale.
          </div>
          <div className="mt-3 h-1.5 w-full rounded-full bg-white/10">
            <div className="h-1.5 w-2/3 rounded-full bg-gradient-to-r from-fuchsia-500 via-indigo-500 to-emerald-500" />
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes menuIn {
          from {
            opacity: 0;
            transform: translateX(-8px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes floatA {
          0%,
          100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(18px, 18px);
          }
        }
        @keyframes floatB {
          0%,
          100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(-18px, 22px);
          }
        }
      `}</style>
    </aside>
  );
}
