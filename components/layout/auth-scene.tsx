import { ReactNode } from "react";

export function AuthScene({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex min-h-dvh items-center justify-center overflow-x-hidden overflow-y-auto px-4 py-8 sm:py-10">
      <div
        className="absolute inset-0 bg-[#2a1258] bg-cover bg-center"
        style={{ backgroundImage: "url('/auth-bg.png')" }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-[#1a0b3a]/25" aria-hidden />
      <div className="relative w-full max-w-[400px] py-[max(0.5rem,env(safe-area-inset-top))] pb-[max(1rem,env(safe-area-inset-bottom))]">
        {children}
      </div>
    </div>
  );
}

export function AuthGlassCard({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-3xl border border-white/25 bg-white/12 px-5 py-8 text-white shadow-[0_24px_80px_rgba(20,8,50,0.35)] backdrop-blur-xl sm:rounded-[28px] sm:px-8 sm:py-10">
      {children}
    </div>
  );
}
