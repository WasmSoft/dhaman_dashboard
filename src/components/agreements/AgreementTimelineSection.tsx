"use client";

import { History } from "lucide-react";
import { useAgreementTimelineQuery } from "@/hooks/timeline-events";
import { useTimelineFilters } from "@/hooks/timeline-events";
import { TimelineEventList } from "@/components/timeline-events";
import { TimelineFilters } from "@/components/timeline-events";
import { toTimelineDisplayItems } from "@/lib/timeline-events/helpers";

interface AgreementTimelineSectionProps {
  agreementId: string;
}

// AR: مكوّن السجل الزمني للاتفاقية — يعرض أحداث الاتفاقية الحية مع الفلاتر والتصفح.
// EN: Agreement timeline section — displays live agreement events with filters and pagination.
export function AgreementTimelineSection({
  agreementId,
}: AgreementTimelineSectionProps) {
  const { filters, page, updateFilters, nextPage } = useTimelineFilters();

  const { data, isLoading, isError, error, refetch } =
    useAgreementTimelineQuery(agreementId, {
      ...filters,
      page,
      limit: 10,
    });

  // AR: تحديد حالة العرض بناءً على نتيجة الاستعلام.
  // EN: Determine display state based on query result.
  let listStatus: "loading" | "empty" | "no-results" | "error" | "access-denied" | undefined;
  if (isLoading && !data) {
    listStatus = "loading";
  } else if (isError || error) {
    listStatus = "error";
  } else if (data && data.events.length === 0) {
    listStatus = "empty";
  }

  // AR: تحويل الأحداث الخام إلى عناصر عرض مع تسميات.
  // EN: Transform raw events into display items with labels.
  const displayItems = data ? toTimelineDisplayItems(data.events) : [];

  return (
    <section className="rounded-[14px] border border-[#252a42] bg-[#15192b] p-4 md:p-6">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div className="text-start">
          <h2 className="text-[18px] font-extrabold text-white">
            السجل الزمني
          </h2>
          <p className="mt-1 text-[12px] leading-6 text-[#737b99]">
            سجل الأدلة الزمنية لجميع أحداث الاتفاقية.
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
