"use client";

import { CardEmpty, CardError, CardLoading } from "./DashboardCardStates";

import { dashboardTranslations } from "@/constants/dashboard";
import { TIMELINE_ACTOR_LABELS } from "@/constants";
import { useDashboardRecentActivityQuery } from "@/hooks/dashboard";
import { getAppLocale } from "@/lib/locale";

import type { DashboardErrorCode } from "@/types";

// AR: مكوّن النشاط الأخير — يعرض أحداث الجدول الزمني بترتيب الأحدث أولًا مع أدوار الجهات الفاعلة.
// EN: Recent activity component — displays timeline events most-recent-first with actor roles.
export function DashboardRecentActivity() {
  const { data, isLoading, isError, error, refetch } =
    useDashboardRecentActivityQuery();
  const locale = getAppLocale();
  const t = dashboardTranslations[locale];

  if (isLoading) {
    return <CardLoading />;
  }

  if (isError) {
    const errorCode = (error as unknown as { code?: DashboardErrorCode })?.code ?? "DASHBOARD_AGGREGATION_FAILED";

    return <CardError code={errorCode} onRetry={() => { refetch(); }} />;
  }

  if (!data || !data.events || data.events.length === 0) {
    return <CardEmpty messageKey="dashboard.recentActivity.empty" />;
  }

  return (
    <article className="rounded-[14px] border border-[#252a42] bg-[#15192b] p-[16.8px]">
      <div className="mb-[14px] flex items-center justify-between gap-4">
        <h2 className="text-[16px] font-bold text-white">
          {t["dashboard.recentActivity.title"]}
        </h2>
        <button
          type="button"
          className="text-[12px] font-medium text-[#a898ff]"
        >
          {t["dashboard.recentActivity.viewAll"]}
        </button>
      </div>

      <div className="space-y-2">
        {data.events.map((event) => {
          // AR: تسمية الجهة الفاعلة مع تسمية احتياطية.
          // EN: Actor role label with fallback.
          const actorLabel = TIMELINE_ACTOR_LABELS[
            event.actorRole as keyof typeof TIMELINE_ACTOR_LABELS
          ] ?? event.actorRole;

          return (
            <a
              key={event.id}
              href={`/agreements/${event.agreementId}`}
              className="flex items-start gap-3 rounded-[10px] bg-[#1d2135] px-[12.8px] py-3 text-start transition-colors hover:bg-[#262b49]"
            >
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-bold text-white">
                  {t[event.titleKey as keyof typeof t] ?? event.titleKey}
                </p>
                <p className="mt-1 text-[11px] text-[#737b99]">
                  {t[event.descriptionKey as keyof typeof t] ?? event.descriptionKey}
                </p>
                {/* AR: عرض دور الجهة الفاعلة في النشاط.
                    EN: Show actor role context in the activity. */}
                <span className="mt-1.5 inline-flex items-center rounded-full bg-[#252a42] px-2 py-0.5 text-[10px] text-[#8a91ac]">
                  {actorLabel}
                </span>
              </div>
              <time className="shrink-0 text-[11px] text-[#737b99]">
                {new Date(event.createdAt).toLocaleDateString(
                  locale === "ar" ? "ar-SA" : "en-US",
                  { month: "short", day: "numeric" },
                )}
              </time>
            </a>
          );
        })}
      </div>

      {data.hasMore && (
        <div className="mt-3 text-center text-[11px] text-[#737b99]">
          •
        </div>
      )}
    </article>
  );
}