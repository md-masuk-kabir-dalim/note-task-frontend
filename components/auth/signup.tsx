"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { EyeOff, Lock, Mail, User } from "lucide-react";
import { AuthField } from "@/components/auth/auth-field";
import { InterestsSelect } from "@/components/common/interests-select";
import { AuthGlassCard, AuthScene } from "@/components/layout/auth-scene";
import { useCreateResourceMutation } from "@/redux/api/commonApi";
import { authRoutes } from "@/constant/end-point";
import { useAuth } from "@/hooks/use-auth";
import { getApiErrorMessage } from "@/lib/api-error";
import ErrorMessage from "@/components/auth/error-message";
import type { ApiResponse } from "@/types/api";
import type { User as AuthUser } from "@/types/user";

export default function SignupPageClient() {
  const [signupUser, { isLoading }] = useCreateResourceMutation();
  const { fetchAndSetUser } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [interests, setInterests] = useState<string[]>([]);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = (await signupUser({
        url: authRoutes.register,
        payload: {
          name,
          email,
          password,
          interests,
        },
      }).unwrap()) as ApiResponse<{ accessToken: string; user: AuthUser }>;

      if (res?.success) {
        await fetchAndSetUser();
        router.push("/dashboard");
      }
    } catch (err: unknown) {
      setError(getApiErrorMessage(err, "Registration failed"));
    }
  };

  return (
    <AuthScene>
      <AuthGlassCard>
        <h1 className="mb-6 text-center text-[1.65rem] font-semibold tracking-tight sm:mb-8 sm:text-[2rem]">
          Register
        </h1>
        <ErrorMessage message={error} variant="glass" />
        <form onSubmit={handleSubmit} className="space-y-3.5">
          <AuthField
            name="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Name"
            required
            icon={<User className="size-4" />}
          />
          <AuthField
            name="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email"
            required
            icon={<Mail className="size-4" />}
          />
          <InterestsSelect
            value={interests}
            onChange={setInterests}
            variant="auth"
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
          <AuthField
            name="confirmPassword"
            type={showPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            placeholder="Confirm password"
            required
            icon={<Lock className="size-4" />}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="mt-2 h-12 w-full rounded-full bg-white text-sm font-semibold text-[#3b1d73] transition hover:bg-white/95 disabled:opacity-70"
          >
            {isLoading ? "Creating account..." : "Register"}
          </button>
        </form>
        <p className="mt-7 text-center text-sm text-white/80">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-white">
            Login
          </Link>
        </p>
      </AuthGlassCard>
    </AuthScene>
  );
}
