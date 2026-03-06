"use client";

import {
  AlertCircle,
  CheckCircle2,
  Copy,
  Eye,
  EyeOff,
  KeyRound,
  Mail,
  Save,
  Shield,
  User,
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

function Card({ title, icon: Icon, subtitle, right, children }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
      <div className="flex items-start justify-between gap-4 border-b border-gray-100 px-5 py-4">
        <div className="flex items-start gap-3">
          {Icon ? (
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-fuchsia-500 via-indigo-500 to-emerald-500 text-white shadow ring-1 ring-black/5">
              <Icon className="h-5 w-5" />
            </span>
          ) : null}
          <div>
            <p className="text-sm font-extrabold text-gray-900">{title}</p>
            {subtitle ? (
              <p className="mt-1 text-xs text-gray-500">{subtitle}</p>
            ) : null}
          </div>
        </div>
        {right ? <div className="shrink-0">{right}</div> : null}
      </div>
      <div className="px-5 py-4">{children}</div>
    </div>
  );
}

function Field({ label, hint, children }) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between gap-2">
        <label className="text-sm font-extrabold text-gray-900">{label}</label>
        {hint ? <span className="text-xs text-gray-500">{hint}</span> : null}
      </div>
      {children}
    </div>
  );
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

function copyText(text) {
  navigator.clipboard?.writeText(text).then(
    () => alert("Copied!"),
    () => alert("Copy failed"),
  );
}

export default function AdminAccountPage() {
  // ---- mock admin profile (replace with API later) ----
  const [name, setName] = useState("NESAA");
  const [email, setEmail] = useState("admin@nesaa.com");
  const [role] = useState("Owner");
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  // password change
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPw, setShowPw] = useState({
    current: false,
    next: false,
    confirm: false,
  });

  // feedback
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingSecurity, setSavingSecurity] = useState(false);
  const [error, setError] = useState(null);

  const pwOk = useMemo(() => {
    if (!currentPassword || !newPassword || !confirmPassword) return false;
    if (newPassword.length < 8) return false;
    if (newPassword !== confirmPassword) return false;
    if (newPassword === currentPassword) return false;
    return true;
  }, [currentPassword, newPassword, confirmPassword]);

  const saveProfile = async () => {
    setError(null);
    if (name.trim().length < 2) return setError("Name is too short.");
    if (email.trim().length < 5) return setError("Email is not valid.");

    setSavingProfile(true);

    const payload = { name: name.trim(), email: email.trim() };
    // TODO: connect API later:
    // await fetch("/api/admin/account", { method:"PATCH", body: JSON.stringify(payload) })

    setTimeout(() => {
      setSavingProfile(false);
      alert("Profile saved (mock).");
    }, 500);
  };

  const changePassword = async () => {
    setError(null);
    if (!pwOk) return setError("Please check password requirements.");

    setSavingSecurity(true);

    const payload = { currentPassword, newPassword };
    // TODO: connect API later:
    // await fetch("/api/admin/account/password", { method:"POST", body: JSON.stringify(payload) })

    setTimeout(() => {
      setSavingSecurity(false);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      alert("Password updated (mock).");
    }, 650);
  };

  const toggle2FA = async () => {
    setSavingSecurity(true);
    // TODO: connect API later: enable/disable + QR code flow
    setTimeout(() => {
      setTwoFactorEnabled((v) => !v);
      setSavingSecurity(false);
    }, 450);
  };

  return (
    <div className="mx-auto px-4 py-8 sm:px-6 lg:px-8 space-y-5">
      {/* Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-extrabold text-gray-900">
            Admin Account
          </h2>
          <p className="text-sm text-gray-600">
            Update your profile and security settings.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/admin/settings"
            className="inline-flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-3 py-2 text-sm font-extrabold text-gray-800 shadow-sm transition hover:-translate-y-[1px] hover:shadow-md active:translate-y-0"
          >
            <Shield className="h-4 w-4" />
            Store Settings
          </Link>

          <button
            onClick={saveProfile}
            disabled={savingProfile}
            className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-fuchsia-600 via-indigo-600 to-emerald-600 px-4 py-2 text-sm font-extrabold text-white shadow-lg transition hover:-translate-y-[1px] hover:shadow-xl active:translate-y-0 disabled:opacity-60"
          >
            <Save className="h-4 w-4" />
            {savingProfile ? "Saving..." : "Save Profile"}
          </button>
        </div>
      </div>

      {error ? (
        <div className="flex items-start gap-2 rounded-2xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700">
          <AlertCircle className="mt-0.5 h-4 w-4" />
          <span className="font-semibold">{error}</span>
        </div>
      ) : null}

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        {/* LEFT COLUMN */}
        <div className="space-y-5 lg:col-span-2">
          <Card
            title="Profile"
            subtitle="Admin display name and email address."
            icon={User}
            right={
              <Pill className="bg-emerald-100 text-emerald-800 ring-emerald-200">
                <CheckCircle2 className="mr-1 h-4 w-4" />
                {role}
              </Pill>
            }
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Name">
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none transition focus:bg-white focus:border-gray-300"
                />
              </Field>

              <Field label="Email">
                <div className="flex items-center gap-2">
                  <div className="relative w-full">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      className="w-full rounded-2xl border border-gray-200 bg-gray-50 pl-9 pr-3 py-2 text-sm outline-none transition focus:bg-white focus:border-gray-300"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => copyText(email)}
                    className="inline-flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-3 py-2 text-sm font-extrabold text-gray-800 hover:bg-gray-50"
                    title="Copy email"
                  >
                    <Copy className="h-4 w-4" />
                    Copy
                  </button>
                </div>
              </Field>
            </div>

            <div className="mt-4 rounded-3xl bg-gradient-to-r from-fuchsia-50 via-indigo-50 to-emerald-50 p-4 ring-1 ring-gray-200">
              <p className="text-sm font-extrabold text-gray-900">Tip</p>
              <p className="mt-1 text-xs text-gray-600">
                Use a shared admin email that your team monitors for store
                alerts and order issues.
              </p>
            </div>
          </Card>

          <Card
            title="Security"
            subtitle="Change password and enable stronger login protection."
            icon={Shield}
            right={
              <Pill
                className={
                  twoFactorEnabled
                    ? "bg-emerald-100 text-emerald-800 ring-emerald-200"
                    : "bg-amber-100 text-amber-800 ring-amber-200"
                }
              >
                {twoFactorEnabled ? "2FA Enabled" : "2FA Off"}
              </Pill>
            }
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <Field label="Two-factor authentication" hint="Recommended">
                <div className="flex items-center justify-between rounded-3xl border border-gray-200 bg-white p-4">
                  <span className="text-sm font-extrabold text-gray-900">
                    Enable 2FA
                  </span>
                  <button
                    type="button"
                    onClick={toggle2FA}
                    disabled={savingSecurity}
                    className={[
                      "relative h-8 w-14 rounded-full transition disabled:opacity-60",
                      twoFactorEnabled ? "bg-emerald-600" : "bg-gray-300",
                    ].join(" ")}
                  >
                    <span
                      className={[
                        "absolute top-1 h-6 w-6 rounded-full bg-white shadow transition",
                        twoFactorEnabled ? "left-7" : "left-1",
                      ].join(" ")}
                    />
                  </button>
                </div>
              </Field>

              <div className="sm:col-span-2 rounded-3xl bg-gray-50 p-4 ring-1 ring-gray-200">
                <p className="text-sm font-extrabold text-gray-900">2FA note</p>
                <p className="mt-1 text-xs text-gray-600">
                  In a real setup, enabling 2FA will show a QR code and recovery
                  codes.
                </p>
              </div>
            </div>
          </Card>

          <Card
            title="Change Password"
            subtitle="Choose a strong password (minimum 8 characters)."
            icon={KeyRound}
            right={
              <button
                onClick={changePassword}
                disabled={!pwOk || savingSecurity}
                className="inline-flex items-center gap-2 rounded-2xl bg-gray-900 px-4 py-2 text-sm font-extrabold text-white shadow-sm transition hover:bg-black disabled:opacity-60"
              >
                <Save className="h-4 w-4" />
                {savingSecurity ? "Updating..." : "Update Password"}
              </button>
            }
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <PasswordField
                label="Current password"
                value={currentPassword}
                setValue={setCurrentPassword}
                show={showPw.current}
                setShow={(v) => setShowPw((p) => ({ ...p, current: v }))}
              />

              <PasswordField
                label="New password"
                value={newPassword}
                setValue={setNewPassword}
                show={showPw.next}
                setShow={(v) => setShowPw((p) => ({ ...p, next: v }))}
              />

              <PasswordField
                label="Confirm new password"
                value={confirmPassword}
                setValue={setConfirmPassword}
                show={showPw.confirm}
                setShow={(v) => setShowPw((p) => ({ ...p, confirm: v }))}
              />
            </div>

            <div className="mt-4 rounded-3xl bg-gray-50 p-4 ring-1 ring-gray-200">
              <p className="text-xs font-semibold text-gray-600">
                Requirements
              </p>
              <ul className="mt-2 space-y-1 text-xs text-gray-600">
                <li className="flex items-center gap-2">
                  <Dot ok={newPassword.length >= 8} />
                  At least 8 characters
                </li>
                <li className="flex items-center gap-2">
                  <Dot
                    ok={
                      newPassword &&
                      confirmPassword &&
                      newPassword === confirmPassword
                    }
                  />
                  New password matches confirmation
                </li>
                <li className="flex items-center gap-2">
                  <Dot
                    ok={
                      newPassword &&
                      currentPassword &&
                      newPassword !== currentPassword
                    }
                  />
                  Different from current password
                </li>
              </ul>
            </div>
          </Card>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-5">
          <Card
            title="Account Summary"
            subtitle="Quick reference info."
            icon={User}
          >
            <div className="space-y-3 rounded-3xl bg-gray-50 p-4 ring-1 ring-gray-200">
              <SummaryRow label="Role" value={role} />
              <SummaryRow label="Email" value={email} />
              <SummaryRow
                label="2FA"
                value={twoFactorEnabled ? "Enabled" : "Off"}
              />
              <SummaryRow label="Last login" value="Today (mock)" />
            </div>

            <div className="mt-4 rounded-3xl bg-gradient-to-r from-fuchsia-50 via-indigo-50 to-emerald-50 p-4 ring-1 ring-gray-200">
              <p className="text-sm font-extrabold text-gray-900">Suggestion</p>
              <p className="mt-1 text-xs text-gray-600">
                Turn on 2FA and rate-limit admin login to protect your store.
              </p>
            </div>
          </Card>

          <Card
            title="Sessions"
            subtitle="Manage login sessions (UI only)."
            icon={Shield}
          >
            <div className="space-y-3">
              <SessionRow
                title="Current session"
                meta="Chrome • Amsterdam, NL • Active now"
                active
              />
              <SessionRow
                title="Older session"
                meta="Safari • Rotterdam, NL • 2 days ago"
              />

              <button
                onClick={() => alert("Sign out other sessions (API later)")}
                className="w-full rounded-2xl bg-rose-600 px-4 py-2 text-sm font-extrabold text-white shadow-sm transition hover:-translate-y-[1px] hover:shadow-md active:translate-y-0"
              >
                Sign out other sessions
              </button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

function PasswordField({ label, value, setValue, show, setShow }) {
  return (
    <Field label={label}>
      <div className="relative">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          type={show ? "text" : "password"}
          placeholder="••••••••"
          className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-3 py-2 pr-10 text-sm outline-none transition focus:bg-white focus:border-gray-300"
        />
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-xl p-2 text-gray-500 hover:text-gray-900 hover:bg-black/5 transition"
          aria-label={show ? "Hide password" : "Show password"}
        >
          {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>
    </Field>
  );
}

function SummaryRow({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-xs font-semibold text-gray-600">{label}</span>
      <span className="text-xs font-extrabold text-gray-900">{value}</span>
    </div>
  );
}

function SessionRow({ title, meta, active }) {
  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-extrabold text-gray-900">{title}</p>
          <p className="mt-1 text-xs text-gray-500">{meta}</p>
        </div>
        <span
          className={[
            "inline-flex rounded-full px-2.5 py-1 text-xs font-extrabold ring-1 ring-inset",
            active
              ? "bg-emerald-100 text-emerald-800 ring-emerald-200"
              : "bg-gray-100 text-gray-700 ring-gray-200",
          ].join(" ")}
        >
          {active ? "Active" : "Inactive"}
        </span>
      </div>
    </div>
  );
}

function Dot({ ok }) {
  return (
    <span
      className={[
        "h-2.5 w-2.5 rounded-full",
        ok ? "bg-emerald-500" : "bg-amber-500",
      ].join(" ")}
    />
  );
}
