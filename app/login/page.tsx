"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Lock,
  Mail,
  ArrowRight,
  Sparkles,
  CheckCircle,
  ShieldCheck,
  UserCheck,
} from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { loginAction } from "@/app/actions/auth";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);

      const result = await loginAction(formData);

      if (result.success) {
        router.push(result.redirectUrl || "/dashboard");
      } else {
        setErrorMessage(result.error || "Invalid email or password.");
      }
    } catch (err: unknown) {
      setErrorMessage(err instanceof Error ? err.message : "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = () => {
    setEmail("attendee@northcdesigners.org");
    setPassword("summit2026demo");
    router.push("/dashboard");
  };

  return (
    <main className="flex-1 pb-24 bg-white">
      <PageHeader
        tag="Delegate Portal"
        title="Sign In to Your Summit Account"
        description="Access your digital QR pass, book masterclass sessions, participate in hackathon voting, and connect with fellow creators."
      />

      <div className="max-w-md mx-auto px-4 sm:px-6 pt-10">
        <div className="bg-white rounded-3xl border border-neutral-border p-6 sm:p-8 shadow-xs space-y-6">
          <div className="text-center space-y-1">
            <h2 className="text-2xl font-bold text-pine">Welcome Back</h2>
            <p className="text-xs text-navy/70">
              Enter the email and password you used during summit registration.
            </p>
          </div>

          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email Field */}
            <div className="space-y-2 group">
              <label className="text-xs font-bold text-pine uppercase tracking-wider flex items-center">
                Email Address
                <span className="text-spring ml-1 font-bold text-sm leading-none">*</span>
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2 group-focus-within:text-spring transition-colors pointer-events-none" />
                <input
                  type="email"
                  required
                  placeholder="you@creativestudio.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-12 pl-10 pr-4 rounded-xl border border-neutral-border bg-neutral-sand/40 hover:bg-white focus:bg-white focus:outline-none focus:ring-2 focus:ring-spring focus:border-transparent text-sm font-medium text-pine placeholder:text-neutral-400 transition-all shadow-2xs"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2 group">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-pine uppercase tracking-wider flex items-center">
                  Password
                  <span className="text-spring ml-1 font-bold text-sm leading-none">*</span>
                </label>
                <a
                  href="mailto:support@northcdesigner.com.ng?subject=Password%20Reset%20Request"
                  className="text-[11px] text-spring hover:underline font-semibold"
                >
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2 group-focus-within:text-spring transition-colors pointer-events-none" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-12 pl-10 pr-4 rounded-xl border border-neutral-border bg-neutral-sand/40 hover:bg-white focus:bg-white focus:outline-none focus:ring-2 focus:ring-spring focus:border-transparent text-sm font-medium text-pine placeholder:text-neutral-400 transition-all shadow-2xs"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 inline-flex items-center justify-center px-6 rounded-full bg-pine text-white text-xs font-bold uppercase tracking-wider hover:bg-pine-light transition-colors disabled:opacity-50 shadow-xs whitespace-nowrap"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign In to Dashboard
                  <ArrowRight className="w-4 h-4 ml-2 text-spring" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Access Divider */}
          <div className="relative flex py-1 items-center">
            <div className="flex-grow border-t border-neutral-border"></div>
            <span className="flex-shrink mx-3 text-[11px] uppercase tracking-wider text-navy/40 font-semibold">
              Instant Preview
            </span>
            <div className="flex-grow border-t border-neutral-border"></div>
          </div>

          {/* One-Click Demo Mode Button */}
          <button
            type="button"
            onClick={handleDemoLogin}
            className="w-full h-12 inline-flex items-center justify-center px-4 rounded-2xl bg-neutral-sand border border-neutral-border text-pine text-xs font-bold hover:bg-spring/10 hover:border-spring/50 transition-all group whitespace-nowrap"
          >
            <UserCheck className="w-4 h-4 mr-2 text-spring group-hover:scale-110 transition-transform" />
            Quick Demo: Preview Attendee Dashboard
          </button>

          <div className="pt-2 text-center text-xs text-navy/60">
            Don&apos;t have an account yet?{" "}
            <Link href="/register" className="text-spring font-bold hover:underline">
              Register as Attendee
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
