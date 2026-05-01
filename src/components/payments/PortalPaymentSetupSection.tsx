"use client";

import { usePortalPaymentsQuery } from "@/hooks/payments";
import { Loader2, ShieldAlert, ShieldCheck, LockKeyhole } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/shared";
import { formatPaymentAmount, getPaymentStatusLabel } from "@/lib/payments/helpers";
import { PaymentStatusBadge } from "./PaymentStatusBadge";
import { DemoPaymentNotice } from "./DemoPaymentNotice";
import { portalPaymentErrorCopy } from "@/constants";
import { cn } from "@/lib/utils";
import { buildPortalPath } from "@/lib/client-portal";

// AR: قسم إعداد الدفعات في بوابة العميل — يعرض خطة الدفع للموافقة.
// EN: Portal payment setup section — shows the payment plan for review.
export function PortalPaymentSetupSection({
  token,
  locale = "ar",
}: {
  token: string;
  locale?: "en" | "ar";
}) {
  const { data, isLoading, isError, error } = usePortalPaymentsQuery(token);

  const isRtl = locale === "ar";
  const dir = isRtl ? "rtl" : "ltr";

  const isTokenError =
    isError && (error as { code?: string })?.code?.includes("PORTAL_TOKEN");

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="size-6 animate-spin text-[#6f52ff]" />
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

  if (isError || !data?.data) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
        <p className="text-[15px] text-[#8b92b3]">
          {portalPaymentErrorCopy.genericError[locale]}
        </p>
      </div>
    );
  }

  const plan = data.data;

  return (
    <section dir={dir} className="space-y-6 text-start">
      <div>
        <h1 className="text-[22px] font-black text-white">
          {locale === "ar" ? "خطة الدفعات" : "Payment Plan"}
        </h1>
        <p className="mt-1 text-[13px] text-[#7f86a8]">
          {locale === "ar"
            ? "راجع الدفعات المحمية وقم بتمويلها"
            : "Review protected payments and fund them"}
        </p>
      </div>

      <DemoPaymentNotice locale={locale} />

      <div className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-[14px] border border-[#6f52ff]/25 bg-[#6f52ff]/10 px-4 py-3 text-start">
          <p className="text-[18px] font-black text-white">
            {plan.payments.length}
          </p>
          <p className="text-[12px] text-[#8b92b3]">
            {locale === "ar" ? "إجمالي الدفعات" : "Total Payments"}
          </p>
        </div>
        <div className="rounded-[14px] border border-emerald-400/20 bg-emerald-400/[0.08] px-4 py-3 text-start">
          <p className="text-[18px] font-black text-[#46e28b]" dir="ltr">
            {formatPaymentAmount(plan.totalAmount)}
          </p>
          <p className="text-[12px] text-[#8b92b3]">
            {locale === "ar" ? "إجمالي المبلغ" : "Total Amount"}
          </p>
        </div>
        <div className="rounded-[14px] border border-amber-400/20 bg-amber-400/[0.08] px-4 py-3 text-start">
          <p className="text-[18px] font-black text-[#f2c84b]" dir="ltr">
            {formatPaymentAmount(plan.pendingAmount)}
          </p>
          <p className="text-[12px] text-[#8b92b3]">
            {locale === "ar" ? "معلق" : "Pending"}
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {plan.payments.map((payment) => (
          <div
            key={payment.id}
            className={cn(
              "rounded-[14px] border border-white/[0.07] bg-[#15192d] px-5 py-4",
            )}
          >
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-[14px] font-bold text-white">
                  {payment.milestoneTitle ??
                    (locale === "ar" ? "دفعة" : "Payment")}
                </p>
                <p className="mt-1 text-[13px] text-[#b8bdd8]" dir="ltr">
                  {formatPaymentAmount(payment.amount)} {plan.currency}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <PaymentStatusBadge status={payment.status} locale={locale} />
                {payment.status === "WAITING" && (
                  <Button
                    asChild
                    size="sm"
                    className="h-8 gap-1.5 rounded-[10px] bg-[#6f52ff] px-4 text-[12px] font-bold text-white hover:bg-[#7b63ff]"
                  >
                    <Link href={buildPortalPath(token, "fundMilestone")}>
                      <LockKeyhole className="size-3" />
                      {locale === "ar" ? "تمويل" : "Fund"}
                    </Link>
                  </Button>
                )}
              </div>
            </div>
            {payment.receiptNumber && (
              <p
                className="mt-2 text-[11px] text-[#7f86a8]"
                dir="ltr"
              >
                {payment.receiptNumber}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
