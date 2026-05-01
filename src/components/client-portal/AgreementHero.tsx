import { CalendarClock, CheckCircle2, ShieldCheck } from "lucide-react";

import { Button } from "@/components/shared";
import type { PortalAgreement } from "@/types";

interface AgreementHeroProps {
  agreement: PortalAgreement;
  onApprove?: () => void;
  onRequestChanges?: () => void;
  onReject?: () => void;
  isApprovePending?: boolean;
}

export function AgreementHero({
  agreement,
  onApprove,
  onRequestChanges,
  onReject,
  isApprovePending = false,
}: AgreementHeroProps) {
  return (
    <section className="relative overflow-hidden rounded-[18px] border border-[#6d5dfc]/35 bg-[linear-gradient(164deg,#1a1440_0%,#13162a_60%,#0f1222_100%)] p-5 text-start sm:p-7">
      <div className="absolute -end-12 -top-16 size-60 rounded-full bg-[#6d5dfc]/10 blur-3xl" />
      <div className="relative grid gap-6 lg:grid-cols-[1fr_160px] lg:items-start">
        <div className="order-2 space-y-5 lg:order-1">
          <div className="space-y-3">
            <p className="text-[13px] leading-6 text-[#b8bdd8]">
              أرسل لك <span className="font-bold text-white">{agreement.sender}</span>{" "}
              اتفاق دفع لمشروع جديد عبر ضمان.
            </p>
            <h2 className="text-xl font-black leading-normal text-white">
              {agreement.title}
            </h2>
            <div className="flex flex-wrap gap-2">
              {agreement.badges?.map((badge) => (
                <span
                  key={badge.label}
                  className={badge.className}
                >
                  {badge.label}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            <Button
              className="h-10 bg-gradient-to-br from-[#6d5dfc] to-[#7c6cff] px-5 text-[13px] font-extrabold shadow-[0_2px_6px_rgba(109,93,252,0.35)] hover:opacity-95"
              onClick={onApprove}
              disabled={!onApprove || isApprovePending}
            >
              <CheckCircle2 className="size-3.5" aria-hidden="true" />
              {isApprovePending ? "جارٍ التنفيذ..." : "الموافقة على الاتفاق"}
            </Button>
            <Button
              variant="outline"
              className="h-10 border-white/10 bg-[#1a1d2e] px-5 text-[13px] font-bold text-[#b8bdd8] hover:bg-[#20243a]"
              onClick={onRequestChanges}
            >
              طلب تعديل
            </Button>
            <Button
              variant="outline"
              className="h-10 border-red-500/30 bg-transparent px-5 text-[13px] font-bold text-[#f87171] hover:bg-red-500/10 hover:text-[#fca5a5]"
              onClick={onReject}
            >
              رفض الاتفاق
            </Button>
          </div>
        </div>

        <div className="order-1 rounded-[14px] border border-[#6d5dfc]/25 bg-[#6d5dfc]/[0.12] p-4 text-center lg:order-2">
          <p className="text-[28px] font-black leading-normal text-[#4ade80]">
            {agreement.total}
          </p>
          <p className="mt-1 text-[11px] text-[#7f86a8]">
            {agreement.currency} · {agreement.stagesLabel}
          </p>
          <p className="mt-3 inline-flex items-center justify-center gap-1 text-[11px] text-[#7f86a8]">
            <CalendarClock className="size-3" aria-hidden="true" />
            {agreement.paymentTiming}
          </p>
          <ShieldCheck className="mx-auto mt-3 size-4 text-[#a78bfa]" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
