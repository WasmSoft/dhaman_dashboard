"use client";

import { CardEmpty, CardError, CardLoading } from "./DashboardCardStates";

import { dashboardTranslations } from "@/constants/dashboard";
import { useDashboardActionsRequiredQuery } from "@/hooks/dashboard";
import { getAppLocale } from "@/lib/locale";
import { cn } from "@/lib/utils";

import type { DashboardErrorCode } from "@/types";

const CATEGORY_KEYS = {
  payments: "dashboard.actions.category.payments",
  deliveries: "dashboard.actions.category.deliveries",
  ai_reviews: "dashboard.actions.category.ai_reviews",
  change_requests: "dashboard.actions.category.change_requests",
  all: "dashboard.actions.category.all",
} as const;

// AR: مكوّن الإجراءات المطلوبة — يعرض قائمة الإجراءات حسب الفئة مع تصفية وروابط مباشرة.
// EN: Actions required component — displays action items grouped by category with filtering and deep links.
export function DashboardActionsRequired() {
  const { data, isLoading, isError, error, refetch } =
    useDashboardActionsRequiredQuery();
  const locale = getAppLocale();
  const t = dashboardTranslations[locale];

  if (isLoading) {
    return <CardLoading />;
  }

  if (isError) {
    const errorCode = (error as unknown as { code?: DashboardErrorCode })?.code ?? "DASHBOARD_AGGREGATION_FAILED";

    return <CardError code={errorCode} onRetry={() => { refetch(); }} />;
  }

  if (!data || !data.items || data.items.length === 0) {
    return <CardEmpty messageKey="dashboard.actions.empty" />;
  }

  const categories = Array.from(new Set(data.items.map((item) => item.category)));

  return (
    <article className="rounded-[14px] border border-[#252a42] bg-[#15192b] p-[16.8px]">
      <div className="mb-[14px] flex items-center justify-between gap-4">
        <h2 className="text-[16px] font-bold text-white">
          {t["dashboard.actions.title"]}
        </h2>
        <button
          type="button"
          className="text-[12px] font-medium text-[#a898ff]"
        >
          {t["dashboard.actions.viewAll"]}
        </button>
      </div>

      <div className="mb-3 flex flex-wrap gap-1">
        {categories.map((category) => {
          const key = CATEGORY_KEYS[category] as keyof typeof t;

          return (
            <span
              key={category}
              className={cn(
                "rounded-lg bg-[#22264a] px-3 py-1 text-[11px] font-medium text-[#a898ff]",
              )}
            >
              {t[key]}
            </span>
          );
        })}
      </div>

      <div className="space-y-2">
        {data.items.map((item) => {
          const categoryKey = CATEGORY_KEYS[item.category] as keyof typeof t;

          return (
            <a
              key={item.id}
              href={item.targetRoute}
              className="flex items-center gap-3 rounded-[10px] bg-[#1d2135] px-[12.8px] py-3 text-start transition-colors hover:bg-[#262b49]"
            >
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-bold text-white">
                  {t[categoryKey]}
                </p>
              </div>
              {data.totalAvailable > (data.items?.length ?? 0) && (
                <span className="text-[11px] text-[#737b99]">
                  +{data.totalAvailable - (data.items?.length ?? 0)}
                </span>
              )}
            </a>
          );
        })}
      </div>
    </article>
  );
}