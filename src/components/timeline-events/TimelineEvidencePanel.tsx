"use client";

import { History } from "lucide-react";
import { useAgreementTimelineQuery } from "@/hooks/timeline-events";
import { toTimelineDisplayItems } from "@/lib/timeline-events/helpers";
import { TIMELINE_ACTOR_LABELS } from "@/constants";
import type { TimelineEventType } from "@/types";

interface TimelineEvidencePanelProps {
  agreementId: string;
  eventTypes?: TimelineEventType[];
  portalSafe?: boolean;
  maxItems?: number;
}

// AR: لوحة أدلة السجل الزمني — تعرض ملخصاً موجزاً للأحداث المرتبطة بسياق معين.
// EN: Timeline evidence panel — displays a brief summary of events relevant to a specific context.
export function TimelineEvidencePanel({
  agreementId,
  eventTypes,
  portalSafe = false,
  maxItems = 3,
}: TimelineEvidencePanelProps) {
  const { data, isLoading, isError } = useAgreementTimelineQuery(
    agreementId,
    { limit: maxItems }
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-4">
        <p className="text-[12px] text-[#737b99]">جاري تحميل الأدلة...</p>
      </div>
    );
  }

  if (isError || !data) {
    return null;
  }

  // AR: تصفية الأحداث حسب الأنواع المطلوبة إن وجدت.
  // EN: Filter events by requested types if specified.
  const filteredEvents = eventTypes
    ? data.items.filter((event) => eventTypes.includes(event.type))
    : data.items.slice(0, maxItems);

  if (filteredEvents.length === 0) {
    return null;
  }

  const displayItems = toTimelineDisplayItems(filteredEvents, { portalSafe });

  return (
    <div className="rounded-[10px] border border-[#252a42] bg-[#1d2135] p-3">
      <div className="mb-2 flex items-center gap-2">
        <History className="size-3.5 text-[#737b99]" />
        <span className="text-[12px] font-bold text-[#8a91ac]">سجل الأدلة</span>
      </div>
      <div className="space-y-2">
        {displayItems.map((item) => (
          <div key={item.id} className="flex items-start gap-2 text-start">
            <div className="min-w-0 flex-1">
              <p className="text-[12px] font-bold text-[#c7cce0]">{item.title}</p>
              <p className="mt-0.5 text-[11px] text-[#737b99] leading-relaxed">{item.description}</p>
              <span className="mt-1 inline-flex items-center gap-1 text-[10px] text-[#5a628a]">
                <span>{TIMELINE_ACTOR_LABELS[item.actorRole as keyof typeof TIMELINE_ACTOR_LABELS] ?? item.actorRoleLabel}</span>
                <span>•</span>
                <time>{item.formattedDate}</time>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
