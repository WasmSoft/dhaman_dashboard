"use client";

import { History } from "lucide-react";
import { usePortalTimelineQuery } from "@/hooks/timeline-events";
import { toTimelineDisplayItems } from "@/lib/timeline-events/helpers";
import { TIMELINE_ACTOR_LABELS } from "@/constants";
import type { TimelineEventType } from "@/types";

interface PortalTimelineEvidenceProps {
  portalToken: string;
  eventTypes?: TimelineEventType[];
  maxItems?: number;
}

// AR: لوحة أدلة السجل الزمني لبوابة العميل — تعرض ملخصاً آمناً للأحداث.
// EN: Portal timeline evidence panel — displays a client-safe summary of events.
export function PortalTimelineEvidence({
  portalToken,
  eventTypes,
  maxItems = 3,
}: PortalTimelineEvidenceProps) {
  const { data, isLoading, isError } = usePortalTimelineQuery(portalToken, {
    limit: maxItems,
  });

  if (isLoading || isError || !data) {
    return null;
  }

  const filteredEvents = eventTypes
    ? data.items.filter((event) => eventTypes.includes(event.type))
    : data.items.slice(0, maxItems);

  if (filteredEvents.length === 0) {
    return null;
  }

  const displayItems = toTimelineDisplayItems(filteredEvents, {
    portalSafe: true,
  });

  return (
    <div className="rounded-xl border border-[#252a42] bg-[#131729] p-4">
      <div className="mb-3 flex items-center gap-2">
        <History className="size-3.5 text-[#737b99]" />
        <span className="text-[13px] font-bold text-[#b8bdd8]">
          سجل الأحداث
        </span>
      </div>
      <div className="space-y-3">
        {displayItems.map((item) => (
          <div
            key={item.id}
            className="flex items-start gap-2 text-start border-b border-[#252a42] pb-2 last:border-b-0 last:pb-0"
          >
            <div className="min-w-0 flex-1">
              <p className="text-[12px] font-bold text-[#c7cce0]">
                {item.title}
              </p>
              <p className="mt-0.5 text-[11px] text-[#7f86a8] leading-relaxed">
                {item.description}
              </p>
              <span className="mt-1 inline-flex items-center gap-1 text-[10px] text-[#636b8a]">
                <span>
                  {TIMELINE_ACTOR_LABELS[
                    item.actorRole as keyof typeof TIMELINE_ACTOR_LABELS
                  ] ?? item.actorRoleLabel}
                </span>
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
