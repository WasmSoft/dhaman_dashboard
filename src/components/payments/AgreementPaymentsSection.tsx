"use client";

import { Button } from "@/components/shared";
import { useAgreementPaymentsQuery } from "@/hooks/payments";
import { Loader2, ShieldCheck, ReceiptText, History } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  formatPaymentAmount,
  getPaymentOperationTypeLabel,
  getPaymentStatusTone,
  isPaymentFundable,
} from "@/lib/payments/helpers";
import { DemoPaymentNotice } from "./DemoPaymentNotice";
import { PaymentStatusBadge } from "./PaymentStatusBadge";
import { paymentSummaryLabels } from "@/constants";
import type { PaymentDto } from "@/types";
import { useState } from "react";
import { useFundMilestoneMutation } from "@/hooks/payments";

// AR: قسم عرض دفعات الاتفاقية في لوحة التحكم.
// EN: Agreement payments workspace section for the dashboard.
export function AgreementPaymentsSection({
  agreementId,
  locale = "ar",
}: {
  agreementId: string;
  locale?: "en" | "ar";
}) {
  const { data, isLoading, isError } = useAgreementPaymentsQuery(agreementId);
  const fundMutation = useFundMilestoneMutation();
  const [fundingPaymentId, setFundingPaymentId] = useState<string | null>(null);

  const isRtl = locale === "ar";
  const dir = isRtl ? "rtl" : "ltr";

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="size-6 animate-spin text-[#6f52ff]" />
        <span className="sr-only">Loading</span>
      </div>
    );
  }

  if (isError || !data?.data) {
    return (
      <div className="rounded-[14px] border border-red-500/20 bg-red-500/10 px-6 py-10 text-center">
        <p className="text-[14px] text-red-100/85">
          {locale === "ar"
            ? "تعذر تحميل الدفعات الحالية."
            : "Could not load current payments."}
        </p>
      </div>
    );
  }

  const summary = data.data;
  const payments: PaymentDto[] = summary.payments ?? [];

  const handleFund = async (payment: PaymentDto) => {
    if (!payment.milestoneId) return;
    setFundingPaymentId(payment.id);
    try {
      await fundMutation.mutateAsync({
        milestoneId: payment.milestoneId,
        amount: payment.amount,
      });
    } catch {
      // Error handled by TanStack Query
    } finally {
      setFundingPaymentId(null);
    }
  };

  return (
    <section dir={dir} className="space-y-5 text-start">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-[18px] font-extrabold text-white">
            {locale === "ar" ? "الدفعات المحمية" : "Protected Payments"}
          </h2>
          <p className="mt-1 text-[12px] text-[#737b99]">
            {locale === "ar"
              ? "حالة كل دفعة وإجراءات التمويل والإصدار"
              : "Each payment status and funding/release actions"}
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            asChild
            variant="secondary"
            className="h-9 rounded-[10px] gap-1.5 border-white/[0.08] bg-[#1d2135] px-3 text-[12px] font-bold text-[#b8bdd8] hover:bg-[#262b49] hover:text-white"
          >
            <Link href={`/agreements/${agreementId}/payment-history`}>
              <History className="size-3.5" />
              {locale === "ar" ? "السجل" : "History"}
            </Link>
          </Button>
        </div>
      </div>

      <DemoPaymentNotice locale={locale} />

      <div className="grid gap-3 sm:grid-cols-3">
        {(
          [
            { key: "totalFunded", label: paymentSummaryLabels.totalFunded, value: summary.totalFunded, tone: "reserved" },
            { key: "totalReleased", label: paymentSummaryLabels.totalReleased, value: summary.totalReleased, tone: "released" },
            { key: "totalPending", label: paymentSummaryLabels.totalPending, value: summary.totalPending, tone: "default" },
          ] as const
        ).map((card) => (
          <article
            key={card.key}
            className={cn(
              "rounded-[14px] border px-4 py-4 text-start",
              card.tone === "reserved"
                ? "border-[#6f52ff]/25 bg-[#6f52ff]/10"
                : card.tone === "released"
                  ? "border-emerald-400/20 bg-emerald-400/[0.08]"
                  : "border-white/[0.08] bg-white/[0.04]",
            )}
          >
            <p className="text-[18px] font-black text-white" dir="ltr">
              {formatPaymentAmount(card.value)}
            </p>
            <p className="mt-1 text-[12px] text-[#8b92b3]">
              {card.label[locale]}
            </p>
          </article>
        ))}
      </div>

      {/* Payment Rows */}
      {payments.length === 0 ? (
        <div className="rounded-[14px] border border-dashed border-[#252a42] bg-[#15192b] px-6 py-12 text-center">
          <ShieldCheck className="mx-auto size-10 text-[#3b3f5a]" />
          <p className="mt-3 text-[14px] text-[#8b92b3]">
            {locale === "ar"
              ? "لا توجد دفعات لهذه الاتفاقية بعد."
              : "No payments exist for this agreement yet."}
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-[14px] border border-[#252a42] bg-[#15192b]">
          <table className="w-full min-w-[640px] text-start">
            <thead>
              <tr className="border-b border-[#252a42] text-[11px] text-[#737b99]">
                <th className="px-4 py-3 font-bold text-start">
                  {locale === "ar" ? "الدفعة" : "Payment"}
                </th>
                <th className="px-4 py-3 font-bold text-start">
                  {locale === "ar" ? "المبلغ" : "Amount"}
                </th>
                <th className="px-4 py-3 font-bold text-start">
                  {locale === "ar" ? "الحالة" : "Status"}
                </th>
                <th className="px-4 py-3 font-bold text-start">
                  {locale === "ar" ? "العملية" : "Operation"}
                </th>
                <th className="px-4 py-3 font-bold text-start">
                  {locale === "ar" ? "إجراء" : "Action"}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#252a42]">
              {payments.map((payment) => (
                <tr key={payment.id} className="text-[13px]">
                  <td className="px-4 py-3 text-white">
                    <div className="flex items-center gap-2">
                      <span className="text-[#d5d8ee]">
                        {payment.milestoneId
                          ? "Milestone"
                          : payment.changeRequestId
                            ? "Change Req."
                            : "Payment"}
                      </span>
                      {payment.receiptNumber && (
                        <Link
                          href={`/payments/${payment.id}/receipt`}
                          className="text-[#6f52ff] hover:underline"
                        >
                          <ReceiptText className="size-3.5" />
                        </Link>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 font-bold text-white" dir="ltr">
                    {formatPaymentAmount(payment.amount)} {payment.currency}
                  </td>
                  <td className="px-4 py-3">
                    <PaymentStatusBadge status={payment.status} locale={locale} />
                  </td>
                  <td className="px-4 py-3 text-[#b8bdd8]">
                    {getPaymentOperationTypeLabel(payment.operationType, locale)}
                  </td>
                  <td className="px-4 py-3">
                    {isPaymentFundable(payment.status) && payment.milestoneId && (
                      <Button
                        type="button"
                        size="sm"
                        onClick={() => handleFund(payment)}
                        disabled={fundingPaymentId === payment.id}
                        className="h-7 rounded-[8px] bg-[#6f52ff] px-3 text-[11px] font-bold text-white hover:bg-[#7b63ff]"
                      >
                        {fundingPaymentId === payment.id ? (
                          <Loader2 className="size-3 animate-spin" />
                        ) : locale === "ar" ? (
                          "تمويل"
                        ) : (
                          "Fund"
                        )}
                      </Button>
                    )}
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
