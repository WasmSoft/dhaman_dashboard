"use client";

import { useAgreementPaymentHistoryQuery } from "@/hooks/payments";
import { Loader2, Clock3, ShieldCheck } from "lucide-react";
import { formatPaymentTimestamp } from "@/lib/payments/helpers";
import { cn } from "@/lib/utils";

// AR: قسم سجل الدفعات لواجهة المستخدم الداخلية.
// EN: Authenticated payment history section for the dashboard.
export function AuthenticatedPaymentHistorySection({
  agreementId,
  locale = "ar",
}: {
  agreementId: string;
  locale?: "en" | "ar";
}) {
  const { rows, summary, isLoading, isError } =
    useAgreementPaymentHistoryQuery(agreementId, locale);

  const isRtl = locale === "ar";
  const dir = isRtl ? "rtl" : "ltr";

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="size-6 animate-spin text-[#6f52ff]" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-[14px] border border-red-500/20 bg-red-500/10 px-6 py-10 text-center">
        <p className="text-[14px] text-red-100/85">
          {locale === "ar"
            ? "تعذر تحميل سجل الدفعات."
            : "Could not load payment history."}
        </p>
      </div>
    );
  }

  return (
    <section dir={dir} className="space-y-5 text-start">
      <div>
        <h2 className="text-[18px] font-extrabold text-white">
          {locale === "ar" ? "سجل الدفعات" : "Payment History"}
        </h2>
        <p className="mt-1 text-[12px] text-[#737b99]">
          {locale === "ar"
            ? "سجل زمني لجميع عمليات الدفع"
            : "Chronological record of all payment events"}
        </p>
      </div>

      {rows.length === 0 ? (
        <div className="rounded-[14px] border border-dashed border-[#252a42] bg-[#15192b] px-6 py-12 text-center">
          <Clock3 className="mx-auto size-10 text-[#3b3f5a]" />
          <p className="mt-3 text-[14px] text-[#8b92b3]">
            {locale === "ar"
              ? "لا توجد أحداث دفع مسجلة بعد."
              : "No payment events recorded yet."}
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-[14px] border border-[#252a42] bg-[#15192b]">
          <table className="w-full min-w-[640px] text-start">
            <thead>
              <tr className="border-b border-[#252a42] text-[11px] text-[#737b99]">
                <th className="px-4 py-3 font-bold text-start">
                  {locale === "ar" ? "الحدث" : "Event"}
                </th>
                <th className="px-4 py-3 font-bold text-start">
                  {locale === "ar" ? "الحالة السابقة" : "Previous"}
                </th>
                <th className="px-4 py-3 font-bold text-start">
                  {locale === "ar" ? "الحالة الجديدة" : "New"}
                </th>
                <th className="px-4 py-3 font-bold text-start">
                  {locale === "ar" ? "الوقت" : "Time"}
                </th>
                <th className="px-4 py-3 font-bold text-start">
                  {locale === "ar" ? "ملاحظات" : "Notes"}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#252a42]">
              {rows.map((row) => (
                <tr key={row.eventId} className="text-[13px]">
                  <td className="px-4 py-3 font-medium text-white">
                    {row.eventType}
                  </td>
                  <td className="px-4 py-3 text-[#b8bdd8]">
                    {row.previousStatusLabel}
                  </td>
                  <td className="px-4 py-3">
                    <span className="rounded-md bg-[#6f52ff]/15 px-2 py-0.5 text-[11px] font-bold text-[#a898ff]">
                      {row.newStatusLabel}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[#b8bdd8]">
                    {formatPaymentTimestamp(row.happenedAt, locale)}
                  </td>
                  <td className="px-4 py-3 text-[#8b92b3]">
                    {row.notes ?? "--"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
