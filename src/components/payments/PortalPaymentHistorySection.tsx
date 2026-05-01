"use client";

import { usePortalPaymentHistoryQuery } from "@/hooks/payments";
import { Loader2, Clock3, ShieldAlert } from "lucide-react";
import { formatPaymentTimestamp } from "@/lib/payments/helpers";
import { portalPaymentErrorCopy } from "@/constants";

// AR: قسم سجل الدفعات في بوابة العميل.
// EN: Portal payment history section.
export function PortalPaymentHistorySection({
  token,
  locale = "ar",
}: {
  token: string;
  locale?: "en" | "ar";
}) {
  const { rows, summary, isLoading, isError, error } =
    usePortalPaymentHistoryQuery(token, locale);

  const isRtl = locale === "ar";
  const dir = isRtl ? "rtl" : "ltr";

  const isTokenError =
    isError && (error as { code?: string })?.code?.includes("PORTAL_TOKEN");

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="size-6 animate-spin text-[#6f52ff]" />
        <span className="sr-only">Loading</span>
      </div>
    );
  }

  if (isTokenError) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
        <ShieldAlert className="size-12 text-red-400" />
        <p className="text-[15px] font-medium text-white">
          {portalPaymentErrorCopy.invalidToken[locale]}
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
        <p className="text-[15px] text-[#8b92b3]">
          {portalPaymentErrorCopy.genericError[locale]}
        </p>
      </div>
    );
  }

  return (
    <section dir={dir} className="space-y-5 text-start">
      <div>
        <h1 className="text-[22px] font-black text-white">
          {locale === "ar" ? "سجل الدفعات" : "Payment History"}
        </h1>
        <p className="mt-1 text-[13px] text-[#7f86a8]">
          {locale === "ar"
            ? "سجل زمني لجميع عمليات الدفع المحمية"
            : "Chronological record of all protected payment events"}
        </p>
      </div>

      {summary && (
        <div className="flex flex-wrap gap-3">
          <div className="rounded-[10px] border border-[#6f52ff]/25 bg-[#6f52ff]/10 px-4 py-3 text-start">
            <p className="text-[18px] font-black text-white" dir="ltr">
              {summary.totalFunded}
            </p>
            <p className="text-[12px] text-[#8b92b3]">
              {locale === "ar" ? "عمليات التمويل" : "Funding Events"}
            </p>
          </div>
          <div className="rounded-[10px] border border-emerald-400/20 bg-emerald-400/[0.08] px-4 py-3 text-start">
            <p className="text-[18px] font-black text-[#46e28b]" dir="ltr">
              {summary.totalReleased}
            </p>
            <p className="text-[12px] text-[#8b92b3]">
              {locale === "ar" ? "عمليات الإصدار" : "Release Events"}
            </p>
          </div>
        </div>
      )}

      {rows.length === 0 ? (
        <div className="rounded-[14px] border border-dashed border-white/[0.07] bg-[#15192d] px-6 py-12 text-center">
          <Clock3 className="mx-auto size-10 text-[#3b3f5a]" />
          <p className="mt-3 text-[14px] text-[#8b92b3]">
            {locale === "ar"
              ? "لا توجد أحداث دفع مسجلة بعد."
              : "No payment events recorded yet."}
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-[14px] border border-white/[0.07] bg-[#15192d]">
          <table className="w-full min-w-[640px] text-start">
            <thead>
              <tr className="border-b border-white/[0.07] text-[11px] text-[#7f86a8]">
                <th className="px-4 py-3 font-bold">
                  {locale === "ar" ? "الحدث" : "Event"}
                </th>
                <th className="px-4 py-3 font-bold">
                  {locale === "ar" ? "السابق" : "Previous"}
                </th>
                <th className="px-4 py-3 font-bold">
                  {locale === "ar" ? "الجديد" : "New"}
                </th>
                <th className="px-4 py-3 font-bold">
                  {locale === "ar" ? "الوقت" : "Time"}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.07]">
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
                  <td className="px-4 py-3 text-[#8b92b3]">
                    {formatPaymentTimestamp(row.happenedAt, locale)}
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
