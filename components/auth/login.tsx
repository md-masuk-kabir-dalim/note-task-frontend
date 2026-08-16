"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { EyeOff, Lock, User } from "lucide-react";
import { AuthField } from "@/components/auth/auth-field";
import { AuthGlassCard, AuthScene } from "@/components/layout/auth-scene";
import { useCreateResourceMutation } from "@/redux/api/commonApi";
import { authRoutes } from "@/constant/end-point";
import { useAuth } from "@/hooks/use-auth";
import { getApiErrorMessage } from "@/lib/api-error";
import ErrorMessage from "@/components/auth/error-message";
import type { ApiResponse } from "@/types/api";
import type { User as AuthUser } from "@/types/user";

export default function LoginPageClient() {
  const [loginUser, { isLoading }] = useCreateResourceMutation();
  const { fetchAndSetUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");

    try {
      const res = (await loginUser({
        url: authRoutes.login,
        payload: { email, password },
      }).unwrap()) as ApiResponse<{ accessToken: string; user: AuthUser }>;

      if (res?.success && res?.data?.accessToken) {
        const user = await fetchAndSetUser();
        router.push(user?.role === "ADMIN" ? "/admin" : "/dashboard");
      }
    } catch (err: unknown) {
      setError(getApiErrorMessage(err, "Login failed"));
    }
  };

  return (
    <AuthScene>
      <AuthGlassCard>
        <h1 className="mb-6 text-center text-[1.65rem] font-semibold tracking-tight sm:mb-8 sm:text-[2rem]">
          Login
        </h1>
        <ErrorMessage message={error} variant="glass" />
        <form onSubmit={handleSubmit} className="space-y-4">
          <AuthField
            name="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email"
            required
            icon={<User className="size-4" />}
          />
          <AuthField
            name="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Password"
            required
            trailing={
              <button
                type="button"
                onClick={() => setShowPassword((value) => !value)}
                className="rounded-full p-2 text-white/75 hover:text-white"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="size-4" /> : <Lock className="size-4" />}
              </button>
            }
          />
          <div className="flex flex-wrap items-center justify-between gap-2 px-1 pt-1 text-[13px] text-white/85">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={remember}
                onChange={(event) => setRemember(event.target.checked)}
                className="size-3.5 rounded border-white/40 bg-transparent"
              />
              Remember me
            </label>
            <Link href="/forgot-password" className="hover:text-white">
              Forgot password?
            </Link>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="mt-2 h-12 w-full rounded-full bg-white text-sm font-semibold text-[#3b1d73] transition hover:bg-white/95 disabled:opacity-70"
          >
            {isLoading ? "Signing in..." : "Login"}
          </button>
        </form>
        <p className="mt-8 text-center text-sm text-white/80">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="font-semibold text-white">
            Register
          </Link>
        </p>
      </AuthGlassCard>
    </AuthScene>
  );
}
