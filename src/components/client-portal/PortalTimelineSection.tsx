"use client";

import { History } from "lucide-react";
import { usePortalTimelineQuery } from "@/hooks/timeline-events";
import { useTimelineFilters } from "@/hooks/timeline-events";
import { TimelineEventList } from "@/components/timeline-events";
import { TimelineFilters } from "@/components/timeline-events";
import { toTimelineDisplayItems } from "@/lib/timeline-events/helpers";

interface PortalTimelineSectionProps {
  portalToken: string | undefined;
}

// AR: مكوّن السجل الزمني لبوابة العميل — يعرض الأحداث الآمنة للعميل مع إخفاء البيانات الحساسة.
// EN: Client portal timeline section — displays client-safe events with sensitive data hidden.
export function PortalTimelineSection({
  portalToken,
}: PortalTimelineSectionProps) {
  const { filters, page, updateFilters, nextPage } = useTimelineFilters();

  // AR: تقييد الفلاتر المعروضة للعميل لتجنب كشف معلومات داخلية.
  // EN: Restrict filters available to the client to avoid exposing internal info.
  const clientSafeFilters = {
    type: filters.type,
    from: filters.from,
    to: filters.to,
  };

  const { data, isLoading, isError, error, refetch } =
    usePortalTimelineQuery(portalToken, {
      ...clientSafeFilters,
      page,
      limit: 10,
    });

  // AR: تحديد حالة العرض بناءً على نتيجة الاستعلام.
  // EN: Determine display state based on query result.
  // AR: تحديد حالة العرض بناءً على نتيجة الاستعلام.
  // EN: Determine display state based on query result.
  let listStatus: "loading" | "empty" | "no-results" | "error" | "access-denied" | undefined;
  if (!portalToken) {
    listStatus = "access-denied";
  } else if (isLoading && !data) {
    listStatus = "loading";
  } else if (isError || error) {
    listStatus = "error";
  } else if (data && data.events.length === 0) {
    listStatus = "empty";
  }

  // AR: تحويل الأحداث مع تعقيم البيانات الوصفية لعرضها بأمان للعميل.
  // EN: Transform events with metadata sanitization for safe client display.
  const displayItems = data
    ? toTimelineDisplayItems(data.events, { portalSafe: true })
    : [];

  return (
    <section className="rounded-[14px] border border-[#252a42] bg-[#15192b] p-4 md:p-6">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div className="text-start">
          <h2 className="text-[18px] font-extrabold text-white">
            سجل الأحداث
          </h2>
          <p className="mt-1 text-[12px] leading-6 text-[#737b99]">
            سجل زمني آمن لأحداث اتفاقيتك.
          </p>
        </div>
        <span className="grid size-9 shrink-0 place-items-center rounded-[10px] bg-blue-500/15 text-blue-300">
          <History className="size-4" />
        </span>
      </div>

      <TimelineFilters filters={filters} onFiltersChange={updateFilters} />

      <div className="mt-4">
        <TimelineEventList
          items={displayItems}
          status={listStatus}
          onRetry={() => refetch()}
          hasMore={data?.hasMore}
          total={data?.total}
          onLoadMore={nextPage}
        />
      </div>
    </section>
  );
}
