"use client";

import { Calendar, User } from "lucide-react";
import type { TimelineDisplayItem } from "@/types";

// AR: بطاقة حدث السجل الزمني — تُعرض حدثاً واحداً مع جهة فاعلة وتاريخ ونوع ومحتوى.
// EN: Timeline event card — displays a single event with actor, timestamp, type, and content.
export function TimelineEventCard({ event }: { event: TimelineDisplayItem }) {
  return (
    <article
      dir="rtl"
      className="relative flex flex-col items-start gap-2 rounded-[12px] border border-[#252a42] bg-[#15192b] p-4 transition-colors hover:border-[#353d62] sm:flex-row sm:items-start sm:gap-4"
    >
      {/* AR: شريط التوصيل العمودي للخط الزمني (يُخفى على الجوال).
          EN: Vertical timeline connector (hidden on mobile). */}
      <div className="hidden sm:flex sm:shrink-0 sm:flex-col sm:items-center sm:pt-1">
        <div className="size-3 rounded-full border-2 border-[#a898ff] bg-[#15192b]" />
        <div className="h-full w-px bg-[#252a42]" />
      </div>

      <div className="flex w-full flex-col items-start gap-2">
        {/* AR: صف عنوان الحدث مع نوعه.
            EN: Event title row with type label. */}
        <div className="flex w-full flex-col-reverse items-start justify-between gap-1 sm:flex-row sm:items-center">
          <h4 className="text-[14px] font-semibold text-[#e2e3ea]">
            {event.title}
          </h4>
          <span className="shrink-0 rounded-full bg-[#252a42] px-3 py-0.5 text-[11px] text-[#a898ff]">
            {event.typeLabel}
          </span>
        </div>

        {/* AR: وصف الحدث.
            EN: Event description. */}
        {event.description && (
          <p className="text-[13px] leading-relaxed text-[#737b99]">
            {event.description}
          </p>
        )}

        {/* AR: صف البيانات الوصفية — جهة فاعلة وتاريخ وبيانات آمنة.
            EN: Metadata row — actor, timestamp, and safe metadata. */}
        <div className="flex w-full flex-wrap items-center gap-3 text-[12px] text-[#5a628a]">
          {/* AR: جهة الفاعلة.
              EN: Actor role and name. */}
          <span className="inline-flex items-center gap-1.5">
            <User className="size-3.5" />
            <span>
              {event.actorName
                ? `${event.actorRoleLabel} — ${event.actorName}`
                : event.actorRoleLabel}
            </span>
          </span>

          {/* AR: تاريخ الحدث.
              EN: Event date. */}
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="size-3.5" />
            <time dateTime={event.createdAt}>{event.formattedDate}</time>
          </span>

          {/* AR: بيانات وصفية آمنة اختيارية.
              EN: Optional safe metadata preview. */}
          {event.safeMetadata && (
            <span className="text-[#5a628a]">
              {Object.entries(event.safeMetadata).map(([key, value]) => {
                const displayValue =
                  typeof value === "string" ? value : JSON.stringify(value);
                return (
                  <span key={key} className="ml-2">
                    {displayValue}
                  </span>
                );
              })}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
