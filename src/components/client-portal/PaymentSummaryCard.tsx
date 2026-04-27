import { CircleDollarSign, Landmark, ShieldCheck } from "lucide-react";

import type { PortalPayment } from "@/types";

interface PaymentSummaryCardProps {
  total: string;
  currency: string;
  stagesLabel: string;
  payments: PortalPayment[];
}

export function PaymentSummaryCard({
  total,
  currency,
  stagesLabel,
  payments,
}: PaymentSummaryCardProps) {
  return (
    <article className="rounded-2xl border border-white/[0.07] bg-[#131627] p-5 text-start">
      <div className="mb-5 flex items-center justify-start gap-2">
        <CircleDollarSign className="size-4 text-[#a78bfa]" aria-hidden="true" />
        <h2 className="text-[15px] font-extrabold text-white">الدفعات</h2>
      </div>

      <div className="rounded-[10px] border border-[#6d5dfc]/15 bg-[#6d5dfc]/[0.07] p-4">
        <p className="text-[28px] font-black text-[#4ade80]">{total}</p>
        <p className="mt-1 text-[11px] text-[#7f86a8]">
          {currency} · {stagesLabel}
        </p>
      </div>

      <div className="mt-4 space-y-3">
        {payments.map((payment) => (
          <div key={payment.label}>
            <div className="flex items-center justify-between gap-3 text-xs">
              <span className="font-bold text-[#b8bdd8]">{payment.label}</span>
              <span className="font-black text-[#4ade80]">{payment.amount}</span>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#1f2338]">
              <div
                className="h-full rounded-full bg-[#6d5dfc]"
                style={{ width: `${payment.percent}%` }}
              />
            </div>
            <p className="mt-1.5 text-[11px] leading-5 text-[#7f86a8]">
              {payment.description}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-4 grid gap-2 rounded-[10px] border border-[#2f80ed]/15 bg-[#2f80ed]/[0.07] p-3 text-[11px] text-[#b8bdd8]">
        <p className="flex items-center gap-2">
          <Landmark className="size-3 text-[#60a5fa]" aria-hidden="true" />
          يتم حجز الدفعات حسب مراحل التسليم.
        </p>
        <p className="flex items-center gap-2">
          <ShieldCheck className="size-3 text-[#4ade80]" aria-hidden="true" />
          لا يتم الصرف إلا بعد الموافقة على المرحلة.
        </p>
      </div>
    </article>
  );
}
