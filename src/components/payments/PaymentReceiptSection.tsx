"use client";

import { usePaymentReceiptQuery } from "@/hooks/payments";
import { Loader2, ReceiptText, ShieldCheck, CheckCircle2 } from "lucide-react";
import {
  formatPaymentAmount,
  formatReceiptNumber,
  formatTransactionReference,
  formatPaymentTimestamp,
  getPaymentStatusLabel,
  getPaymentOperationTypeLabel,
} from "@/lib/payments/helpers";
import { DemoPaymentNotice } from "./DemoPaymentNotice";
import { PaymentStatusBadge } from "./PaymentStatusBadge";
import { cn } from "@/lib/utils";

// AR: قسم إيصال الدفعة للوحة التحكم.
// EN: Payment receipt section for the dashboard.
export function PaymentReceiptSection({
  paymentId,
  locale = "ar",
}: {
  paymentId: string;
  locale?: "en" | "ar";
}) {
  const { data, isLoading, isError } = usePaymentReceiptQuery(paymentId);

  const isRtl = locale === "ar";
  const dir = isRtl ? "rtl" : "ltr";

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="size-6 animate-spin text-[#6f52ff]" />
      </div>
    );
  }

  if (isError || !data?.data) {
    return (
      <div className="rounded-[14px] border border-red-500/20 bg-red-500/10 px-6 py-10 text-center">
        <p className="text-[14px] text-red-100/85">
          {locale === "ar"
            ? "الإيصال غير متاح لهذه الدفعة."
            : "Receipt is not available for this payment."}
        </p>
      </div>
    );
  }

  const receipt = data.data;

  return (
    <section dir={dir} className="space-y-5 text-start">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-[18px] font-extrabold text-white">
            {locale === "ar" ? "إيصال الدفعة" : "Payment Receipt"}
          </h2>
          <p className="mt-1 text-[12px] text-[#737b99]">
            {locale === "ar"
              ? "تفاصيل الإيصال المرجعي للدفعة المحمية"
              : "Reference receipt for the protected payment"}
          </p>
        </div>
        <PaymentStatusBadge status={receipt.status} locale={locale} />
      </div>

      <DemoPaymentNotice locale={locale} />

      {receipt.status === "RELEASED" && (
        <div className="rounded-[14px] border border-emerald-400/20 bg-emerald-400/[0.06] px-5 py-4 text-center">
          <CheckCircle2 className="mx-auto size-8 text-[#46e28b]" />
          <p className="mt-2 text-[14px] font-bold text-[#46e28b]">
            {locale === "ar"
              ? "تم إصدار الدفعة للعامل المستقل"
              : "Payment Released to Freelancer"}
          </p>
          {receipt.releasedAt && (
            <p className="mt-1 text-[12px] text-[#8b92b3]">
              {formatPaymentTimestamp(receipt.releasedAt, locale)}
            </p>
          )}
        </div>
      )}

      <div className="grid gap-4 lg:grid-cols-2">
        {/* Receipt Card */}
        <div className="rounded-[16px] border border-emerald-400/15 bg-emerald-400/[0.06] px-5 py-5 text-start">
          <ReceiptText className="size-5 text-emerald-300" />
          <p className="mt-3 text-[42px] font-black leading-[51px] text-[#46e28b]" dir="ltr">
            {formatPaymentAmount(receipt.amount)}
          </p>
          <p className="text-[12px] text-[#7f86a8]">{receipt.currency}</p>
          <p className="mt-2 text-[11px] text-[#7f86a8]">
            {getPaymentOperationTypeLabel(receipt.operationType, locale)}
          </p>
        </div>

        {/* Detail Rows */}
        <div className="rounded-[16px] border border-white/[0.07] bg-[#101427] px-4 py-3">
          <dl className="divide-y divide-white/[0.07]">
            {(
              [
                {
                  label: locale === "ar" ? "رقم الإيصال" : "Receipt Number",
                  value: formatReceiptNumber(receipt.receiptNumber),
                },
                {
                  label:
                    locale === "ar"
                      ? "المرجع المصرفي"
                      : "Transaction Reference",
                  value: formatTransactionReference(
                    receipt.transactionReference,
                  ),
                },
                {
                  label:
                    locale === "ar" ? "طريقة الدفع" : "Payment Method",
                  value: receipt.paymentMethodLabel ?? "—",
                },
                {
                  label:
                    locale === "ar" ? "تاريخ الإصدار" : "Issued At",
                  value: formatPaymentTimestamp(receipt.issuedAt, locale),
                },
                {
                  label:
                    locale === "ar" ? "تاريخ الحجز" : "Reserved At",
                  value: formatPaymentTimestamp(receipt.reservedAt, locale),
                },
                {
                  label:
                    locale === "ar" ? "تاريخ الإصدار النهائي" : "Released At",
                  value: formatPaymentTimestamp(receipt.releasedAt, locale),
                },
                {
                  label:
                    locale === "ar" ? "عنوان المرحلة" : "Milestone Title",
                  value: receipt.milestoneTitle ?? "—",
                },
              ] as const
            ).map((row) => (
              <div
                key={row.label}
                className="flex items-center justify-between gap-4 py-3 text-[13px]"
              >
                <dt className="text-[#7f86a8]">{row.label}</dt>
                <dd
                  className={cn(
                    "font-medium text-[#d5d8ee]",
                    (row.label.includes("Receipt") ||
                      row.label.includes("رقم") ||
                      row.label.includes("Transaction") ||
                      row.label.includes("المرجع")) &&
                      "dir-ltr",
                  )}
                  dir="ltr"
                >
                  {row.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
