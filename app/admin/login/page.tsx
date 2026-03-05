"use client";

import {
  AlertCircle,
  Eye,
  EyeOff,
  Lock,
  Mail,
  RefreshCcw,
  Sparkles,
  StepBack,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import "styled-jsx/css";

function makeCaptcha() {
  const a = Math.floor(Math.random() * 9) + 1;
  const b = Math.floor(Math.random() * 9) + 1;
  return { a, b, answer: a + b };
}

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [captcha, setCaptcha] = useState(() => makeCaptcha());
  const [captchaInput, setCaptchaInput] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const refreshCaptcha = () => {
    setCaptcha(makeCaptcha());
    setCaptchaInput("");
  };

  const canSubmit = useMemo(() => {
    return email.trim() && password.trim() && captchaInput.trim();
  }, [email, password, captchaInput]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const userAns = Number(captchaInput);
    if (!Number.isFinite(userAns) || userAns !== captcha.answer) {
      setError("Captcha is incorrect. Please try again.");
      refreshCaptcha();
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: email, password }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data?.success) {
        throw new Error(data?.message || "Login failed");
      }

      router.push("/admin");
    } catch (err) {
      setError(err?.message || "Login failed.");
      refreshCaptcha();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Premium gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#eef2ff_0%,#fdf2f8_35%,#ecfeff_70%,#0b1220_140%)]" />

      {/* Animated glow blobs */}
      <div className="pointer-events-none absolute -top-28 -left-28 h-96 w-96 rounded-full bg-fuchsia-500/25 blur-3xl animate-[floatA_9s_ease-in-out_infinite]" />
      <div className="pointer-events-none absolute -top-28 -right-28 h-96 w-96 rounded-full bg-indigo-500/22 blur-3xl animate-[floatB_10s_ease-in-out_infinite]" />
      <div className="pointer-events-none absolute -bottom-32 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-emerald-500/18 blur-3xl animate-[floatC_11s_ease-in-out_infinite]" />

      <div className="relative flex min-h-screen items-center justify-center p-4">
        {/* Glow border wrapper */}
        <div className="relative w-full max-w-md">
          <div className="absolute -inset-[2px] rounded-[28px] bg-gradient-to-r from-fuchsia-500/70 via-indigo-500/70 to-emerald-500/70 blur-sm opacity-70" />

          <Card className="relative w-full rounded-[28px] border-white/15 bg-white/70 shadow-2xl backdrop-blur-xl">
            <CardHeader className="text-center space-y-3 pb-3">
              {/* Brand */}
              <div className="flex items-center justify-center gap-3">
                <div className="relative">
                  <img
                    src="/icon.png"
                    alt="NESAA Logo"
                    className="h-10 w-10 rounded-2xl ring-1 ring-black/10 shadow-md"
                  />
                  <span className="pointer-events-none absolute -inset-1 rounded-2xl bg-gradient-to-r from-fuchsia-400/0 via-white/50 to-emerald-400/0 opacity-70 blur-sm" />
                </div>
                <div className="text-xl font-semibold tracking-[0.25em] text-gray-900">
                  NESAA
                </div>
              </div>

              <CardTitle className="text-2xl font-extrabold text-gray-900">
                Admin Login
              </CardTitle>

              <p className="text-xs text-gray-600">
                Secure access for store management
              </p>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {error && (
                  <div className="flex items-start gap-2 rounded-2xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700">
                    <AlertCircle className="mt-0.5 h-4 w-4" />
                    <span className="font-semibold">{error}</span>
                  </div>
                )}

                {/* email */}
                <div className="flex flex-col gap-2">
                  <Label htmlFor="email" className="text-gray-800 font-bold">
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <Input
                      id="email"
                      type="text"
                      className="pl-9 rounded-2xl bg-white/70 border-gray-200 focus-visible:ring-0 focus:border-gray-300"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="admin@nesaa.nl"
                      required
                    />
                  </div>
                </div>

                {/* password */}
                <div className="flex flex-col gap-2">
                  <Label htmlFor="password" className="text-gray-800 font-bold">
                    Password
                  </Label>

                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />

                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      className="pl-9 pr-10 rounded-2xl bg-white/70 border-gray-200 focus-visible:ring-0 focus:border-gray-300"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 rounded-xl p-2 text-gray-500 hover:text-gray-900 hover:bg-black/5 transition"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* captcha */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-gray-800 font-bold">Captcha</Label>

                    <button
                      type="button"
                      onClick={refreshCaptcha}
                      className="text-xs inline-flex items-center gap-1 rounded-xl px-2 py-1 font-semibold text-gray-700 hover:bg-black/5 transition"
                    >
                      <RefreshCcw className="h-3.5 w-3.5" />
                      Refresh
                    </button>
                  </div>

                  <div className="rounded-3xl border border-white/20 bg-white/60 p-3 shadow-sm backdrop-blur">
                    <div className="flex items-center justify-between gap-3">
                      <div className="text-sm font-semibold text-gray-900">
                        Solve{" "}
                        <span className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-fuchsia-500/10 via-indigo-500/10 to-emerald-500/10 px-3 py-2 ring-1 ring-black/5">
                          <Sparkles className="h-4 w-4 text-indigo-600" />
                          <span className="font-extrabold">
                            {captcha.a} + {captcha.b}
                          </span>
                        </span>
                      </div>

                      <div className="w-28">
                        <Input
                          inputMode="numeric"
                          placeholder="Answer"
                          value={captchaInput}
                          onChange={(e) => setCaptchaInput(e.target.value)}
                          className="rounded-2xl bg-white/70 border-gray-200 focus-visible:ring-0 focus:border-gray-300"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* actions */}
                <div className="flex items-center justify-between pt-1">
                  <Link
                    href="/"
                    className="inline-flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-3 py-2 text-sm font-extrabold text-gray-800 shadow-sm transition hover:-translate-y-[1px] hover:shadow-md active:translate-y-0"
                  >
                    <StepBack className="h-4 w-4" />
                    Back
                  </Link>

                  <Button
                    type="submit"
                    disabled={!canSubmit || loading}
                    className={cn(
                      "rounded-2xl px-5 font-extrabold shadow-lg transition",
                      "bg-gradient-to-r from-fuchsia-600 via-indigo-600 to-emerald-600",
                      "hover:from-fuchsia-700 hover:via-indigo-700 hover:to-emerald-700",
                      "active:scale-[0.99]",
                      "disabled:opacity-60",
                    )}
                  >
                    {loading ? "Logging in..." : "Login"}
                  </Button>
                </div>

                <p className="text-[11px] text-gray-500 text-center leading-relaxed">
                  Tip: For production, validate captcha on the server or use
                  hCaptcha/reCAPTCHA.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Keyframes */}
      <style jsx global>{`
        @keyframes floatA {
          0%,
          100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(18px, 16px);
          }
        }
        @keyframes floatB {
          0%,
          100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(-18px, 18px);
          }
        }
        @keyframes floatC {
          0%,
          100% {
            transform: translate(-50%, 0);
          }
          50% {
            transform: translate(calc(-50% + 10px), 18px);
          }
        }
      `}</style>
    </div>
  );
}
