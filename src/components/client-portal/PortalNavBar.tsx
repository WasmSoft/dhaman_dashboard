import {
  HelpCircle,
  Languages,
  LockKeyhole,
  ShieldCheck,
} from "lucide-react";
import React from "react";
export const PortalNavBar = ({children}:{children:React.ReactNode}) => {
  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[#0d0f1a] text-white"
      aria-labelledby="portal-title"
    >
     <header className="big-header border-b border-white/[0.07] bg-[#131627]">
        <div className="mx-auto flex min-h-15 w-full max-w-[1030px] flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="flex items-center justify-between gap-3 sm:justify-start">
            <div className="flex size-8 items-center justify-center rounded-[9px] bg-gradient-to-br from-[#6d5dfc] to-[#a78bfa]">
              <ShieldCheck className="size-4" aria-hidden="true" />
            </div>
            <p className="text-lg font-black tracking-normal">Dhaman</p>
            <span className="hidden rounded-full border border-white/[0.07] bg-[#1a1d2e] px-2 py-1 text-[11px] text-[#7f86a8] sm:inline-flex">
              بوابة مراجعة اتفاق آمنة
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-[11px] text-[#b8bdd8]">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-2.5 py-1 font-bold text-[#4ade80]">
              <LockKeyhole className="size-3" aria-hidden="true" />
              رابط آمن
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.07] bg-[#1a1d2e] px-2.5 py-1">
              <Languages className="size-3" aria-hidden="true" />
              العربية
            </span>
            <span className="inline-flex items-center gap-1.5 text-[#7f86a8]">
              <HelpCircle className="size-3" aria-hidden="true" />
              تحتاج مساعدة؟
            </span>
          </div>
        </div>
      </header>
      {children}
      </main>
  )
}
