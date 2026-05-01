// AR: هذه البطاقات تعرض ملخص العميل من الخادم دون إعادة حساب مالية محلية.
// EN: These cards display the server-provided client summary without local financial recalculation.
import type { ClientProfileSummary } from "@/types";
import { formatCurrencyValue } from "@/lib/clients";

type ClientSummaryCardsProps = {
  summary: ClientProfileSummary;
};

export function ClientSummaryCards({ summary }: ClientSummaryCardsProps) {
  const statusEntries = Object.entries(summary.agreements.byStatus);

  return (
    <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-4" dir="rtl">
      <article className="rounded-[16px] border border-[#252a42] bg-[#15192b] p-4">
        <p className="text-[12px] text-[#8b90a8]">إجمالي الاتفاقات</p>
        <p className="mt-2 text-[26px] font-bold text-white">{summary.agreements.total}</p>
        {statusEntries.length > 0 ? (
          <p className="mt-2 text-[11px] leading-6 text-[#8b90a8]">
            {statusEntries.slice(0, 2).map(([status, count]) => `${status}: ${count}`).join(" · ")}
          </p>
        ) : null}
      </article>
      <article className="rounded-[16px] border border-[#252a42] bg-[#15192b] p-4">
        <p className="text-[12px] text-[#8b90a8]">إجمالي المدفوعات</p>
        <p className="mt-2 text-[20px] font-bold text-white">{formatCurrencyValue(summary.payments.totalAmount, summary.payments.currency)}</p>
      </article>
      <article className="rounded-[16px] border border-[#252a42] bg-[#15192b] p-4">
        <p className="text-[12px] text-[#8b90a8]">المبالغ المحررة</p>
        <p className="mt-2 text-[20px] font-bold text-white">{formatCurrencyValue(summary.payments.releasedAmount, summary.payments.currency)}</p>
      </article>
      <article className="rounded-[16px] border border-[#252a42] bg-[#15192b] p-4">
        <p className="text-[12px] text-[#8b90a8]">المبالغ المعلقة</p>
        <p className="mt-2 text-[20px] font-bold text-white">{formatCurrencyValue(summary.payments.pendingAmount, summary.payments.currency)}</p>
      </article>
    </section>
  );
}
