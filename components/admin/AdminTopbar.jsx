"use client";

import { Bell, ChevronDown, LogOut, User } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function AdminTopbar({
  adminName = "Admin",
  adminEmail = "admin@nesaa.com",
}) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const onDown = (e) => {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(e.target)) setOpen(false);
    };
    window.addEventListener("mousedown", onDown);
    return () => window.removeEventListener("mousedown", onDown);
  }, []);

  const logout = async () => {
    try {
      await fetch("/api/admin/auth/logout", { method: "POST" });
    } catch (e) {}
    window.location.href = "/admin/login";
  };

  return (
    <header className="sticky top-0 z-40">
      <div className="relative border-b border-white/10 bg-[#0b1220]">
        {/* colorful animated background */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(236,72,153,.18),transparent_45%),radial-gradient(ellipse_at_top_right,rgba(99,102,241,.18),transparent_45%),radial-gradient(ellipse_at_top_left,rgba(16,185,129,.12),transparent_55%)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-fuchsia-500/60 via-indigo-500/60 to-emerald-500/60" />

        {/* IMPORTANT: justify-start + left padding so it's "more left" */}
        <div className="relative mx-auto flex h-16  items-center justify-between gap-2 px-4 sm:px-6 lg:px-8">
          {/* Spacer (optional) – keeps things from stretching */}
          <div className="" />
          {/* Buttons group (kept left) */}
          <div className="flex items-center gap-2">
            {/* Notifications */}
            <button
              className="relative inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/5 text-white ring-1 ring-white/10 transition hover:-translate-y-[1px] hover:bg-white/10 hover:ring-white/20 active:translate-y-0"
              aria-label="Notifications"
              title="Notifications"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-gradient-to-r from-fuchsia-500 to-indigo-500 ring-2 ring-white/60 animate-[pingOnce_1.2s_ease-out]" />
            </button>

            {/* Example “other button” (optional): Orders shortcut) */}
            <Link
              href="/admin/orders"
              className="hidden sm:inline-flex items-center gap-2 rounded-2xl bg-white/5 px-3 py-2 text-sm font-extrabold text-white/90 ring-1 ring-white/10 transition hover:-translate-y-[1px] hover:bg-white/10 hover:ring-white/20 active:translate-y-0"
              title="Orders"
            >
              <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-r from-emerald-400 to-teal-400" />
              Orders
            </Link>

            {/* Account dropdown (Logout is inside dropdown) */}
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setOpen((v) => !v)}
                className="inline-flex items-center gap-2 rounded-2xl bg-white/5 px-3 py-2 text-white ring-1 ring-white/10 transition hover:-translate-y-[1px] hover:bg-white/10 hover:ring-white/20 active:translate-y-0"
                aria-label="Account menu"
                title="Account"
              >
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-fuchsia-500 via-indigo-500 to-emerald-500 shadow-lg ring-1 ring-white/20">
                  <User className="h-4 w-4 text-white" />
                </span>

                <span className="hidden sm:block text-left">
                  <span className="block text-sm font-extrabold leading-4">
                    {adminName}
                  </span>
                  <span className="block text-xs text-white/60">
                    {adminEmail}
                  </span>
                </span>

                <ChevronDown
                  className={[
                    "h-4 w-4 text-white/70 transition",
                    open ? "rotate-180" : "rotate-0",
                  ].join(" ")}
                />
              </button>

              {/* Dropdown */}
              <div
                className={[
                  "absolute right-0 mt-2 w-64 overflow-hidden rounded-3xl border border-white/10 bg-[#0b1220]/95 shadow-2xl backdrop-blur-xl transition",
                  open
                    ? "translate-y-0 opacity-100"
                    : "pointer-events-none -translate-y-2 opacity-0",
                ].join(" ")}
              >
                <div className="p-3">
                  {/* <div className="rounded-2xl bg-white/5 p-3 ring-1 ring-white/10">
                    <p className="text-sm font-extrabold text-white">
                      {adminName}
                    </p>
                    <p className="mt-1 text-xs text-white/60">{adminEmail}</p>
                  </div> */}

                  <div className="mt-3 space-y-1">
                    <Link
                      href="/admin/account"
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-2 rounded-2xl px-3 py-2 text-sm font-semibold text-white/85 transition hover:bg-white/10 hover:text-white"
                    >
                      <User className="h-4 w-4" />
                      Account
                    </Link>

                    <button
                      onClick={logout}
                      className="flex w-full items-center gap-2 rounded-2xl px-3 py-2 text-sm font-semibold text-red-200 transition hover:bg-red-500/10 hover:text-red-100"
                    >
                      <LogOut className="h-4 w-4" />
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes pingOnce {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          70% {
            transform: scale(1.6);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 0;
          }
        }
      `}</style>
    </header>
  );
}
