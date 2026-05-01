"use client";

import { useState } from "react";
import { CheckCircle2, Info, ShieldCheck } from "lucide-react";

import { Button } from "@/components/shared";
import type { PortalAgreement } from "@/types";

interface DecisionSectionProps {
  agreement: PortalAgreement;
  onApprove?: () => void;
  onRequestChanges?: () => void;
  onReject?: () => void;
  isApprovePending?: boolean;
}

export function DecisionSection({
  agreement,
  onApprove,
  onRequestChanges,
  onReject,
  isApprovePending = false,
}: DecisionSectionProps) {
  const [isConfirmed, setIsConfirmed] = useState(false);

  return (
    <section className="rounded-2xl border border-emerald-400/20 bg-[#131627] p-5 text-start">
      <div className="mb-3 flex items-center justify-start gap-2">
        <ShieldCheck className="size-4 text-[#4ade80]" aria-hidden="true" />
        <h2 className="text-[15px] font-extrabold text-white">
          قرارك بخصوص الاتفاق
        </h2>
      </div>
      <p className="text-xs leading-6 text-[#7f86a8]">
        يمكنك الموافقة على الاتفاق كما هو، أو طلب تعديل قبل بدء العمل.
      </p>

      <label className="mt-4 flex cursor-pointer items-start gap-2 text-xs font-medium leading-5 text-[#b8bdd8]">
        <input
          type="checkbox"
          checked={isConfirmed}
          onChange={(event) => setIsConfirmed(event.target.checked)}
          className="mt-0.5 size-4 accent-[#6d5dfc]"
        />
        <span>أؤكد أنني راجعت تفاصيل الاتفاق، المراحل، وسياسات الدفع.</span>
      </label>

      <div className="mt-5 flex flex-col gap-2 sm:flex-row">
        <Button
          disabled={!isConfirmed}
          onClick={onApprove}
          className="h-10 bg-gradient-to-br from-[#6d5dfc] to-[#7c6cff] px-5 text-[13px] font-extrabold shadow-[0_2px_6px_rgba(109,93,252,0.35)] hover:opacity-95"
        >
          <CheckCircle2 className="size-3.5" aria-hidden="true" />
          {isApprovePending ? "جارٍ التنفيذ..." : "الموافقة على الاتفاق"}
        </Button>
        <Button
          variant="outline"
          onClick={onRequestChanges}
          className="h-10 border-white/10 bg-[#1a1d2e] px-5 text-[13px] font-bold text-[#b8bdd8] hover:bg-[#20243a]"
        >
          طلب تعديل
        </Button>
        <Button
          variant="outline"
          onClick={onReject}
          className="h-10 border-red-500/30 bg-transparent px-5 text-[13px] font-bold text-[#f87171] hover:bg-red-500/10 hover:text-[#fca5a5]"
        >
          رفض الاتفاق
        </Button>
      </div>

      <p className="mt-4 flex items-start gap-2 text-[11px] leading-5 text-[#7f86a8]">
        <Info className="mt-0.5 size-3 shrink-0" aria-hidden="true" />
        بعد الموافقة، سيتم تفعيل الاتفاق ويمكنك متابعة مشروع {agreement.title} من
        بوابة العميل.
      </p>
    </section>
  );
}
