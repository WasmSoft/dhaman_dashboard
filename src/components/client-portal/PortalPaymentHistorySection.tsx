"use client";

import { portalCopy } from "@/constants";
import { usePortalPaymentHistoryQuery } from "@/hooks/client-portal";
import { ApiError } from "@/lib/axios-instance";

function formatCurrency(amount: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(amount);
}

function isPortalTokenError(error: unknown) {
  return error instanceof ApiError && error.code?.startsWith("PORTAL_TOKEN");
}

export function PortalPaymentHistorySection({ token }: { token: string }) {
  const { data, isLoading, error } = usePortalPaymentHistoryQuery(token);

  if (isPortalTokenError(error)) {
    throw error;
  }

  if (isLoading) {
    return <div className="h-64 animate-pulse rounded-3xl border border-white/10 bg-white/5" />;
  }

  if (!data) {
    return <div className="rounded-3xl border border-white/10 bg-[#13182b] p-6 text-white">تعذر تحميل سجل الدفعات.</div>;
  }

  return (
    <section dir="rtl" className="space-y-4 text-start text-white">
      <header className="rounded-3xl border border-white/10 bg-[#13182b] p-6">
        <p className="text-sm text-[#8f97b6]">{portalCopy.titles.paymentHistory.ar}</p>
        <h1 className="mt-2 text-3xl font-black">سجل العمليات</h1>
      </header>
      {data.length ? data.map((item) => (
        <article key={item.id} className="rounded-3xl border border-white/10 bg-[#13182b] p-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-semibold">{item.type}</p>
              <p className="text-sm text-[#a9b0cd]">{item.note || "-"}</p>
            </div>
            <div className="text-sm text-[#c6cbe0]">
              <p className="font-bold text-[#7fd7a2]">{formatCurrency(item.amount, item.currency)}</p>
              <p>{new Date(item.occurredAt).toLocaleString("ar-SA")}</p>
            </div>
          </div>
        </article>
      )) : (
        <div className="rounded-3xl border border-white/10 bg-[#13182b] p-6 text-sm text-[#a9b0cd]">لا توجد حركات دفع بعد.</div>
      )}
    </section>
  );
}
