"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Lock, Mail } from "lucide-react";
import { AuthField } from "@/components/auth/auth-field";
import { AuthGlassCard, AuthScene } from "@/components/layout/auth-scene";
import {
  useCreateResourceMutation,
  useUpdateResourceMutation,
} from "@/redux/api/commonApi";
import { authRoutes } from "@/constant/end-point";
import { toast } from "sonner";
import { getApiErrorMessage } from "@/lib/api-error";
import ErrorMessage from "@/components/auth/error-message";

type Step = "email" | "reset";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [sendReset, { isLoading: isSending }] = useCreateResourceMutation();
  const [resetPassword, { isLoading: isResetting }] = useUpdateResourceMutation();

  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await sendReset({
        url: authRoutes.forgotPassword,
        payload: { email },
      }).unwrap();
      toast.success("আপনার ইমেইলে OTP পাঠানো হয়েছে");
      setStep("reset");
    } catch (err: unknown) {
      setError(getApiErrorMessage(err, "OTP পাঠাতে ব্যর্থ হয়েছে"));
    }
  };

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("পাসওয়ার্ড মিলছে না");
      return;
    }
    if (password.length < 6) {
      setError("পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে");
      return;
    }

    try {
      await resetPassword({
        url: authRoutes.resetPassword,
        payload: { otp, password },
        accessType: "PASSWORD_RESET",
      }).unwrap();

      toast.success("পাসওয়ার্ড রিসেট সফল হয়েছে, এখন লগইন করুন");
      router.push("/login");
    } catch (err: unknown) {
      setError(getApiErrorMessage(err, "পাসওয়ার্ড রিসেট ব্যর্থ হয়েছে"));
    }
  };

  return (
    <AuthScene>
      <AuthGlassCard>
        <h1 className="mb-2 text-center text-[1.65rem] font-semibold tracking-tight sm:text-[2rem]">
          {step === "email" ? "Forgot password" : "Reset password"}
        </h1>
        <p className="mb-8 text-center text-sm text-white/75">
          {step === "email"
            ? "We’ll send an OTP to your email"
            : `Enter the OTP sent to ${email}`}
        </p>
        <ErrorMessage message={error} variant="glass" />
        {step === "email" ? (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <AuthField
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              icon={<Mail className="size-4" />}
            />
            <button
              type="submit"
              disabled={isSending}
              className="h-12 w-full rounded-full bg-white text-sm font-semibold text-[#3b1d73] disabled:opacity-70"
            >
              {isSending ? "Sending..." : "Send OTP"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleReset} className="space-y-3.5">
            <AuthField
              name="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
              placeholder="OTP code"
              required
            />
            <AuthField
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="New password"
              required
              icon={<Lock className="size-4" />}
            />
            <AuthField
              name="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm password"
              required
              icon={<Lock className="size-4" />}
            />
            <button
              type="submit"
              disabled={isResetting}
              className="h-12 w-full rounded-full bg-white text-sm font-semibold text-[#3b1d73] disabled:opacity-70"
            >
              {isResetting ? "Resetting..." : "Reset password"}
            </button>
          </form>
        )}
        <p className="mt-8 text-center text-sm text-white/80">
          <Link href="/login" className="font-semibold text-white">
            Back to Login
          </Link>
        </p>
      </AuthGlassCard>
    </AuthScene>
  );
}
