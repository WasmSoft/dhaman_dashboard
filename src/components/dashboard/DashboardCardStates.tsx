"use client";

import { Loader2 } from "lucide-react";

import { dashboardTranslations } from "@/constants/dashboard";
import { translateDashboardError } from "@/lib/dashboard/helpers";
import { getAppLocale } from "@/lib/locale";

import type { DashboardErrorCode } from "@/types";

// AR: مكوّن حالة التحميل المشترك — يُعرض عندما تكون البطاقة في حالة تحميل.
// EN: Shared loading state component — shown when a card is in loading state.
export function CardLoading() {
  const locale = getAppLocale();
  const label = dashboardTranslations[locale]["dashboard.cardStates.loading"];

  return (
    <div
      className="flex min-h-[120px] items-center justify-center rounded-[12px] border border-[#252a42] bg-[#15192b] p-5"
      role="status"
      aria-label={label}
    >
      <Loader2 className="size-6 animate-spin text-[#a898ff]" />
    </div>
  );
}

// AR: مكوّن حالة الفارغ المشترك — يُعرض عندما لا توجد بيانات.
// EN: Shared empty state component — shown when there is no data.
export function CardEmpty({ messageKey }: { messageKey: string }) {
  const locale = getAppLocale();
  const message =
    dashboardTranslations[locale][
      messageKey as keyof (typeof dashboardTranslations)["en"]
    ];

  return (
    <div className="flex min-h-[120px] items-center justify-center rounded-[12px] border border-[#252a42] bg-[#15192b] p-5">
      <p className="text-center text-[13px] text-[#737b99]">{message}</p>
    </div>
  );
}

// AR: مكوّن حالة الخطأ المشترك — يُعرض عند فشل الطلب مع زر إعادة المحاولة.
// EN: Shared error state component — shown when the request fails, with a retry button.
export function CardError({
  code,
  onRetry,
}: {
  code: DashboardErrorCode;
  onRetry: () => void;
}) {
  const locale = getAppLocale();
  const errorMessage = translateDashboardError(code, locale);
  const retryLabel =
    dashboardTranslations[locale]["dashboard.cardStates.retry"];

  return (
    <div className="flex min-h-[120px] flex-col items-center justify-center gap-3 rounded-[12px] border border-[#252a42] bg-[#15192b] p-5">
      <p className="text-center text-[13px] text-red-400">{errorMessage}</p>
      <button
        type="button"
        onClick={onRetry}
        className="rounded-lg bg-[#6f52ff] px-4 py-2 text-[13px] font-medium text-white hover:bg-[#7b63ff]"
      >
        {retryLabel}
      </button>
    </div>
  );
}