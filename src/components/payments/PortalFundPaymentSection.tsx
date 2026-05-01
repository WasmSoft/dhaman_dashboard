"use client";

import { usePortalPaymentsQuery, usePortalFundPaymentMutation } from "@/hooks/payments";
import { Loader2, CheckCircle2, ShieldAlert } from "lucide-react";
import { Button } from "@/components/shared";
import { formatPaymentAmount } from "@/lib/payments/helpers";
import { DemoPaymentNotice } from "./DemoPaymentNotice";
import { PaymentStatusBadge } from "./PaymentStatusBadge";
import { portalPaymentErrorCopy } from "@/constants";

// AR: صفحة تأكيد تمويل دفعة من بوابة العميل.
// EN: Portal fund payment confirmation page.
export function PortalFundPaymentSection({
  token,
  paymentId,
  locale = "ar",
}: {
  token: string;
  paymentId: string;
  locale?: "en" | "ar";
}) {
  const { data, isLoading, isError, error } = usePortalPaymentsQuery(token);
  const fundMutation = usePortalFundPaymentMutation(token, paymentId);

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

  if (isError || !data?.data) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
        <p className="text-[15px] text-[#8b92b3]">
          {portalPaymentErrorCopy.genericError[locale]}
        </p>
      </div>
    );
  }

  const payment = data.data.payments.find((p) => p.id === paymentId);

  if (!payment) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
        <p className="text-[15px] text-[#8b92b3]">
          {locale === "ar"
            ? "الدفعة غير موجودة."
            : "Payment not found."}
        </p>
      </div>
    );
  }

  const handleFund = async () => {
    try {
      await fundMutation.mutateAsync({ amount: payment.amount });
    } catch {
      // Error handled by TanStack Query
    }
  };

  const isAlreadyFunded = payment.status !== "WAITING";

  return (
    <section dir={dir} className="space-y-6 text-start">
      <div>
        <h1 className="text-[22px] font-black text-white">
          {locale === "ar" ? "تأكيد التمويل" : "Confirm Funding"}
        </h1>
        <p className="mt-1 text-[13px] text-[#7f86a8]">
          {locale === "ar"
            ? "تمويل الدفعة المحمية في الوضع التجريبي"
            : "Fund the protected payment in demo mode"}
        </p>
      </div>

      <DemoPaymentNotice locale={locale} />

      <div className="rounded-[18px] border border-[#6d5dfc]/25 bg-[#6d5dfc]/10 px-5 py-5 text-start">
        <p className="text-[32px] font-black text-[#a78bfa]" dir="ltr">
          {formatPaymentAmount(payment.amount)}
        </p>
        <p className="text-[12px] text-[#7f86a8]">
          {payment.milestoneTitle ??
            (locale === "ar" ? "دفعة مرحلة" : "Milestone Payment")}
        </p>
        <div className="mt-3">
          <PaymentStatusBadge status={payment.status} locale={locale} />
        </div>
      </div>

      {fundMutation.isSuccess && fundMutation.data ? (
        <div className="rounded-[14px] border border-emerald-400/20 bg-emerald-400/[0.08] px-5 py-6 text-center">
          <CheckCircle2 className="mx-auto size-10 text-[#46e28b]" />
          <p className="mt-3 text-[16px] font-bold text-[#46e28b]">
            {locale === "ar"
              ? "تم تمويل الدفعة بنجاح!"
              : "Payment funded successfully!"}
          </p>
          <p className="mt-2 text-[13px] text-[#8b92b3]">
            {locale === "ar"
              ? "الدفعة محجوزة الآن في الوضع التجريبي."
              : "The payment is now reserved in demo mode."}
          </p>
        </div>
      ) : (
        <div className="rounded-[14px] border border-white/[0.07] bg-[#15192d] px-5 py-5">
          {isAlreadyFunded ? (
            <div className="text-center">
              <ShieldAlert className="mx-auto size-10 text-amber-400" />
              <p className="mt-3 text-[14px] text-white">
                {portalPaymentErrorCopy.alreadyFunded[locale]}
              </p>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-[13px] text-[#b8bdd8] mb-4">
                {locale === "ar"
                  ? "سيتم حجز المبلغ كدفعة تجريبية محمية."
                  : "The amount will be reserved as a protected demo payment."}
              </p>
              <Button
                type="button"
                onClick={handleFund}
                disabled={fundMutation.isPending}
                className="h-10 gap-2 rounded-[12px] bg-[#6f52ff] px-6 text-[14px] font-bold text-white hover:bg-[#7b63ff]"
              >
                {fundMutation.isPending && (
                  <Loader2 className="size-4 animate-spin" />
                )}
                {locale === "ar" ? "تأكيد التمويل" : "Confirm Funding"}
              </Button>
              {fundMutation.isError && (
                <p className="mt-3 text-[12px] text-red-400">
                  {portalPaymentErrorCopy.genericError[locale]}
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </section>
  );
}
