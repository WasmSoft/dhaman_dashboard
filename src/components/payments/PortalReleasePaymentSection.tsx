"use client";

import { usePortalPaymentsQuery, usePortalReleasePaymentMutation } from "@/hooks/payments";
import { Loader2, CheckCircle2, ShieldAlert, XCircle } from "lucide-react";
import { Button } from "@/components/shared";
import { formatPaymentAmount } from "@/lib/payments/helpers";
import { DemoPaymentNotice } from "./DemoPaymentNotice";
import { PaymentStatusBadge } from "./PaymentStatusBadge";
import { portalPaymentErrorCopy } from "@/constants";

// AR: صفحة تأكيد إصدار دفعة من بوابة العميل.
// EN: Portal release payment confirmation page.
export function PortalReleasePaymentSection({
  token,
  paymentId,
  locale = "ar",
}: {
  token: string;
  paymentId: string;
  locale?: "en" | "ar";
}) {
  const { data, isLoading, isError, error } = usePortalPaymentsQuery(token);
  const releaseMutation = usePortalReleasePaymentMutation(token, paymentId);

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
          {locale === "ar" ? "الدفعة غير موجودة." : "Payment not found."}
        </p>
      </div>
    );
  }

  const handleRelease = async () => {
    try {
      await releaseMutation.mutateAsync({ confirmed: true });
    } catch {
      // Error handled by TanStack Query
    }
  };

  const canRelease = payment.status === "READY_TO_RELEASE";
  const isAlreadyReleased = payment.status === "RELEASED";

  return (
    <section dir={dir} className="space-y-6 text-start">
      <div>
        <h1 className="text-[22px] font-black text-white">
          {locale === "ar" ? "تأكيد الإصدار" : "Confirm Release"}
        </h1>
        <p className="mt-1 text-[13px] text-[#7f86a8]">
          {locale === "ar"
            ? "تأكيد إصدار الدفعة المحمية للعامل المستقل"
            : "Confirm release of the protected payment to the freelancer"}
        </p>
      </div>

      <DemoPaymentNotice locale={locale} />

      <div className="rounded-[18px] border border-emerald-400/15 bg-emerald-400/[0.06] px-5 py-5 text-start">
        <p className="text-[32px] font-black text-[#46e28b]" dir="ltr">
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

      {releaseMutation.isSuccess ? (
        <div className="rounded-[14px] border border-emerald-400/20 bg-emerald-400/[0.08] px-5 py-6 text-center">
          <CheckCircle2 className="mx-auto size-10 text-[#46e28b]" />
          <p className="mt-3 text-[16px] font-bold text-[#46e28b]">
            {locale === "ar" ? "تم إصدار الدفعة بنجاح!" : "Payment released successfully!"}
          </p>
          <p className="mt-2 text-[13px] text-[#8b92b3]">
            {locale === "ar"
              ? "تم تحرير الدفعة للعامل المستقل في الوضع التجريبي."
              : "The payment has been released to the freelancer in demo mode."}
          </p>
        </div>
      ) : (
        <div className="rounded-[14px] border border-white/[0.07] bg-[#15192d] px-5 py-5">
          {isAlreadyReleased ? (
            <div className="text-center">
              <CheckCircle2 className="mx-auto size-10 text-emerald-400" />
              <p className="mt-3 text-[14px] text-white">
                {locale === "ar"
                  ? "تم إصدار هذه الدفعة بالفعل."
                  : "This payment has already been released."}
              </p>
            </div>
          ) : !canRelease ? (
            <div className="text-center">
              <XCircle className="mx-auto size-10 text-amber-400" />
              <p className="mt-3 text-[14px] text-white">
                {portalPaymentErrorCopy.notReadyToRelease[locale]}
              </p>
              <p className="mt-1 text-[12px] text-[#8b92b3]">
                {locale === "ar"
                  ? "يجب أن تكون الدفعة في حالة جاهزة للإصدار."
                  : "The payment must be in Ready to Release status."}
              </p>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-[13px] text-[#b8bdd8] mb-4">
                {locale === "ar"
                  ? "سيتم تحرير المبلغ للعامل المستقل كدفعة تجريبية محمية."
                  : "The amount will be released to the freelancer as a protected demo payment."}
              </p>
              <Button
                type="button"
                onClick={handleRelease}
                disabled={releaseMutation.isPending}
                className="h-10 gap-2 rounded-[12px] bg-[#22c55e] px-6 text-[14px] font-bold text-white hover:bg-[#20b957]"
              >
                {releaseMutation.isPending && (
                  <Loader2 className="size-4 animate-spin" />
                )}
                {locale === "ar" ? "تأكيد الإصدار" : "Confirm Release"}
              </Button>
              {releaseMutation.isError && (
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
