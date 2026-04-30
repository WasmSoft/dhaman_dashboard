"use client";

import { DashboardIcon } from "./DashboardIcon";
import { CardEmpty, CardError, CardLoading } from "./DashboardCardStates";
import { DashboardDateRangeSelector } from "./DashboardDateRangeSelector";

import { dashboardTranslations } from "@/constants/dashboard";
import { useDashboardDateRange } from "@/hooks/dashboard";
import { useDashboardOverviewQuery } from "@/hooks/dashboard";
import { getAppLocale } from "@/lib/locale";

import type { DashboardErrorCode } from "@/types";

// AR: بطاقات النظرة العامة — تعرض ملخص المدفوعات والاتفاقات والعملاء مع نطاق تاريخ وحالات التحميل والخطأ والفارغ.
// EN: Overview cards — display payment, agreement, and client summaries with a date range selector and loading/error/empty states.
export function DashboardOverviewCards() {
  const { range, setRange } = useDashboardDateRange();
  const { data, isLoading, isError, error, refetch } = useDashboardOverviewQuery({ range });
  const locale = getAppLocale();
  const t = dashboardTranslations[locale];

  if (isLoading) {
    return (
      <div className="space-y-4">
        <DashboardDateRangeSelector value={range} onChange={setRange} />
        <CardLoading />
      </div>
    );
  }

  if (isError) {
    const errorCode = (error as unknown as { code?: DashboardErrorCode })?.code ?? "DASHBOARD_AGGREGATION_FAILED";

    return (
      <div className="space-y-4">
        <DashboardDateRangeSelector value={range} onChange={setRange} />
        <CardError code={errorCode} onRetry={() => { refetch(); }} />
      </div>
    );
  }

  if (!data || data.metrics.length === 0) {
    return (
      <div className="space-y-4">
        <DashboardDateRangeSelector value={range} onChange={setRange} />
        <CardEmpty messageKey="dashboard.overview.title" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <DashboardDateRangeSelector value={range} onChange={setRange} />
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {data.metrics.map((metric) => (
          <article
            key={metric.key}
            className="rounded-[12px] border border-[#252a42] bg-[#15192b] p-5 text-start shadow-[0_18px_45px_rgba(4,7,20,0.18)]"
          >
            <div className="flex items-center gap-2 text-[#c7cce0]">
              <span className="grid size-[30px] place-items-center rounded-[9px] bg-[#22264a] text-[#a898ff]">
                <DashboardIcon name={metric.icon} className="size-[15px]" />
              </span>
              <span className="text-[13px] font-medium">{t[metric.labelKey as keyof typeof t] ?? metric.labelKey}</span>
            </div>
            <strong className="mt-4 block text-[25px] font-extrabold tracking-[-0.02em] text-white">
              {metric.value}
            </strong>
          </article>
        ))}
      </div>
    </div>
  );
}