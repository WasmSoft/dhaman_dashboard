"use client";

import Link from "next/link";

import { Button } from "@/components/shared";
import { portalCopy } from "@/constants";
import {
  usePortalFundPaymentMutation,
  usePortalPaymentsQuery,
  usePortalReleasePaymentMutation,
} from "@/hooks/client-portal";
import { ApiError } from "@/lib/axios-instance";
import { buildPortalPath } from "@/lib/client-portal";

function formatCurrency(amount: number | string, currency: string) {
  const numericAmount = typeof amount === "number" ? amount : Number(amount);

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(Number.isFinite(numericAmount) ? numericAmount : 0);
}

function isPortalTokenError(error: unknown) {
  return error instanceof ApiError && error.code?.startsWith("PORTAL_TOKEN");
}

export function PortalPaymentsSection({ token }: { token: string }) {
  const { data, isLoading, error } = usePortalPaymentsQuery(token);
  const fundMutation = usePortalFundPaymentMutation(token);
  const releaseMutation = usePortalReleasePaymentMutation(token);

  if (isPortalTokenError(error)) {
    throw error;
  }

  if (isLoading) {
    return <div className="h-64 animate-pulse rounded-3xl border border-white/10 bg-white/5" />;
  }

  if (error instanceof ApiError && error.code === "PAYMENT_NOT_FOUND") {
    return <div className="rounded-3xl border border-white/10 bg-[#13182b] p-6 text-white">لم يتم العثور على الدفعات.</div>;
  }

  if (!data) {
    return <div className="rounded-3xl border border-white/10 bg-[#13182b] p-6 text-white">تعذر تحميل خطة الدفع.</div>;
  }

  return (
    <section dir="rtl" className="space-y-6 text-start text-white">
      <header className="rounded-3xl border border-white/10 bg-[#13182b] p-6">
        <p className="text-sm text-[#8f97b6]">{portalCopy.titles.payments.ar}</p>
        <h1 className="mt-2 text-3xl font-black">إدارة الدفعات</h1>
        <Link href={buildPortalPath(token, "paymentHistory")} className="mt-4 inline-block text-sm font-semibold text-[#9f92ff] hover:text-white">
          الانتقال إلى سجل الدفعات
        </Link>
      </header>

      <div className="space-y-4">
        {data.map((payment) => (
          <article key={payment.id} className="rounded-3xl border border-white/10 bg-[#13182b] p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-lg font-bold">{payment.milestoneName || `دفعة ${payment.id || ""}`}</h2>
                <p className="mt-1 text-sm text-[#a9b0cd]">{portalCopy.statuses[payment.status as keyof typeof portalCopy.statuses]?.ar ?? payment.status}</p>
              </div>
              <div className="text-lg font-black text-[#7fd7a2]">{formatCurrency(payment.amount, payment.currency ?? "SAR")}</div>
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              {payment.status === "WAITING" ? (
                <Button
                  type="button"
                  onClick={() => payment.id && fundMutation.mutate(payment.id)}
                  disabled={fundMutation.isPending || !payment.id}
                  className="rounded-xl bg-[#6f52ff] px-5 text-white hover:bg-[#7b63ff]"
                >
                  {portalCopy.actions.fund.ar}
                </Button>
              ) : null}
              {payment.status === "READY_TO_RELEASE" ? (
                <Button
                  type="button"
                  onClick={() => payment.id && releaseMutation.mutate(payment.id)}
                  disabled={releaseMutation.isPending || !payment.id}
                  className="rounded-xl bg-emerald-600 px-5 text-white hover:bg-emerald-500"
                >
                  {portalCopy.actions.release.ar}
                </Button>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
