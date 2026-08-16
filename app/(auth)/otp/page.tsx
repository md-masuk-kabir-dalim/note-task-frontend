"use client";
import { useState, useRef, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  useUpdateResourceMutation,
  useCreateResourceMutation,
} from "@/redux/api/commonApi";
import { authRoutes } from "@/constant/end-point";
import { toast } from "sonner";
import { useAuth } from "@/hooks/use-auth";
import { getApiError, getApiErrorMessage } from "@/lib/api-error";
import { AuthGlassCard, AuthScene } from "@/components/layout/auth-scene";

const OTP_LENGTH = 6;

function OtpPageContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const router = useRouter();
  const { fetchAndSetUser } = useAuth();

  const [otpVerify] = useUpdateResourceMutation();
  const [resendOtp, { isLoading: isResending }] = useCreateResourceMutation();

  // 60s matches the backend's default OTP_RESEND_COOLDOWN_SECONDS — used only
  // until the first resend response tells us the server's actual configured
  // value, which is what we sync to from then on.
  const DEFAULT_COOLDOWN_SECONDS = 60;

  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [timeLeft, setTimeLeft] = useState(DEFAULT_COOLDOWN_SECONDS);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
    const val = e.target.value.replace(/\D/, "");
    if (!val) return;

    const newOtp = [...otp];
    newOtp[idx] = val;
    setOtp(newOtp);

    if (idx < OTP_LENGTH - 1) {
      inputRefs.current[idx + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, idx: number) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      const newOtp = [...otp];
      if (newOtp[idx]) {
        newOtp[idx] = "";
        setOtp(newOtp);
      } else if (idx > 0) {
        inputRefs.current[idx - 1]?.focus();
        newOtp[idx - 1] = "";
        setOtp(newOtp);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const otpValue = otp.join("");
    if (otpValue.length !== OTP_LENGTH) {
      toast.error("সম্পূর্ণ OTP কোড দিন");
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await otpVerify({
        url: authRoutes.verifyOtp,
        payload: { otp: otpValue },
        // The otp cookie is signed with the email-verification secret, not
        // the access secret — the backend picks the verification key off
        // this header, so it must match or the signature check fails.
        accessType: "EMAIL_VERIFICATION",
      }).unwrap();

      if (res?.success) {
        toast.success("OTP যাচাই সফল হয়েছে!");
        await fetchAndSetUser();
        router.push("/");
      } else {
        toast.error(res?.message || "OTP যাচাই ব্যর্থ হয়েছে");
      }
    } catch (error: unknown) {
      toast.error(getApiErrorMessage(error, "কিছু একটা সমস্যা হয়েছে, আবার চেষ্টা করুন"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResend = async () => {
    if (!email) {
      toast.error("ইমেইল খুঁজে পাওয়া যায়নি, আবার লগইন/রেজিস্টার করুন");
      return;
    }
    try {
      const res = await resendOtp({
        url: authRoutes.sendOtp,
        payload: { email, type: "EMAIL_VERIFICATION" },
      }).unwrap();
      toast.success("নতুন OTP পাঠানো হয়েছে");
      setTimeLeft(res?.data?.cooldownSeconds || DEFAULT_COOLDOWN_SECONDS);
      setOtp(Array(OTP_LENGTH).fill(""));
      inputRefs.current[0]?.focus();
    } catch (error: unknown) {
      const retryAfterSeconds = getApiError(error).data?.errors?.retryAfterSeconds;
      if (retryAfterSeconds) {
        setTimeLeft(retryAfterSeconds);
      }
      toast.error(getApiErrorMessage(error, "OTP পাঠাতে ব্যর্থ হয়েছে"));
    }
  };

  return (
    <AuthScene>
      <AuthGlassCard>
        <h2 className="mb-2 text-center text-[1.65rem] font-semibold tracking-tight sm:text-[2rem]">
          Verify OTP
        </h2>
        <p className="mb-8 break-words text-center text-sm text-white/75">
          {email ? `Enter the code sent to ${email}` : "Enter the OTP sent to your email"}
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-center gap-1.5 sm:gap-2">
            {otp.map((digit, idx) => (
              <input
                key={idx}
                type="text"
                inputMode="numeric"
                maxLength={1}
                ref={(el) => {
                  inputRefs.current[idx] = el ?? null;
                }}
                value={digit}
                onChange={(e) => handleChange(e, idx)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                className="aspect-square min-w-0 max-w-12 flex-1 rounded-xl border border-white/25 bg-white/12 text-center text-lg text-white outline-none focus:border-white/50 sm:max-w-14 sm:text-xl"
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="h-12 w-full rounded-full bg-white text-sm font-semibold text-[#3b1d73] disabled:opacity-70"
          >
            {isSubmitting ? "Verifying..." : "Verify OTP"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-white/75">
          {timeLeft > 0 ? (
            <span>Resend in {timeLeft}s</span>
          ) : (
            <button
              type="button"
              disabled={isResending}
              className="font-semibold text-white disabled:opacity-60"
              onClick={handleResend}
            >
              {isResending ? "Sending..." : "Resend OTP"}
            </button>
          )}
        </div>
      </AuthGlassCard>
    </AuthScene>
  );
}

export default function OtpPage() {
  return (
    <Suspense fallback={null}>
      <OtpPageContent />
    </Suspense>
  );
}
