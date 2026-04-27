import { Bot, ArrowLeft } from "lucide-react";

import type { PortalAiReviewStep } from "@/types";

interface AiDisputeSectionProps {
  steps: PortalAiReviewStep[];
}

export function AiDisputeSection({ steps }: AiDisputeSectionProps) {
  return (
    <section className="rounded-2xl border border-[#6d5dfc]/20 bg-[#6d5dfc]/[0.05] p-5 text-start">
      <div className="mb-3 flex items-center justify-start gap-2">
        <Bot className="size-4 text-[#a78bfa]" aria-hidden="true" />
        <h2 className="text-[15px] font-extrabold text-white">
          كيف يساعد AI عند حدوث خلاف؟
        </h2>
      </div>
      <p className="text-xs leading-6 text-[#7f86a8]">
        إذا اعترض العميل على تسليم مرحلة، يقارن ضمان بين شروط القبول، التسليم
        المرفوع، وسياسات الاتفاق. بعدها يعطي توصية مثل صرف الدفعة، طلب تعديل،
        تعليق الدفعة، أو تحويل الطلب إلى Change Request.
      </p>

      <div className="mt-4 flex flex-col gap-2 sm:flex-row-reverse sm:flex-wrap sm:items-center">
        {steps.map((step, index) => (
          <div key={step.label} className="flex items-center gap-2">
            <div className="inline-flex items-center gap-2 rounded-[10px] border border-[#6d5dfc]/20 bg-[#6d5dfc]/10 px-3.5 py-2 text-xs font-bold text-[#b8bdd8]">
              <span className="flex size-5 items-center justify-center rounded-md bg-[#6d5dfc]/25 text-[#a78bfa]">
                {step.order}
              </span>
              {step.label}
            </div>
            {index < steps.length - 1 ? (
              <ArrowLeft
                className="hidden size-4 text-[#7f86a8] sm:block"
                aria-hidden="true"
              />
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
}
