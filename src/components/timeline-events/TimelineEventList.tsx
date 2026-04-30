"use client";

import { TimelineEventCard } from "./TimelineEventCard";
import { TimelineStateView } from "./TimelineState";
import type { TimelineDisplayItem } from "@/types";

interface TimelineEventListProps {
  items: TimelineDisplayItem[];
  /**
   * AR: حالة القائمة — تحميل، فارغة، بلا نتائج، خطأ، أو محظورة.
   * EN: List state — loading, empty, no-results, error, or access-denied.
   */
  status?: "loading" | "empty" | "no-results" | "error" | "access-denied";
  /**
   * AR: دالة إعادة المحاولة عند فشل التحميل.
   * EN: Retry callback when loading fails.
   */
  onRetry?: () => void;
  /**
   * AR: مؤشر وجود المزيد من الصفحات لتحميلها.
   * EN: Whether more pages can be loaded.
   */
  hasMore?: boolean;
  /**
   * AR: العدد الإجمالي للأحداث.
   * EN: Total number of events.
   */
  total?: number;
  /**
   * AR: دالة تحميل الصفحة التالية.
   * EN: Callback to load the next page.
   */
  onLoadMore?: () => void;
  /**
   * AR: مؤشر تحميل الصفحة التالية.
   * EN: Whether the next page is currently loading.
   */
  isLoadingMore?: boolean;
}

// AR: قائمة أحداث السجل الزمني — تعرض الأحداث مع دعم التصفح بين الصفحات.
// EN: Timeline event list — displays events with pagination support.
export function TimelineEventList({
  items,
  status,
  onRetry,
  hasMore,
  total,
  onLoadMore,
  isLoadingMore,
}: TimelineEventListProps) {
  // AR: عرض حالة خاصة عندما لا تكون هناك عناصر للعرض.
  // EN: Show a dedicated state view when there are no items to display.
  if (status) {
    return <TimelineStateView status={status} onRetry={onRetry} />;
  }

  if (items.length === 0) {
    return <TimelineStateView status="empty" />;
  }

  return (
    <section dir="rtl" className="flex flex-col items-start gap-4">
      {/* AR: ملخص عدد الأحداث.
          EN: Event count summary. */}
      {total !== undefined && (
        <p className="text-[13px] text-[#5a628a]">
          {total} حدث{total !== 1 ? "اً" : ""}
        </p>
      )}

      {/* AR: قائمة الأحداث الرأسية.
          EN: Vertical event list. */}
      <div className="flex w-full flex-col items-start gap-3">
        {items.map((event) => (
          <TimelineEventCard key={event.id} event={event} />
        ))}
      </div>

      {/* AR: زر تحميل المزيد من الأحداث.
          EN: Load more events button. */}
      {hasMore && onLoadMore && (
        <button
          type="button"
          disabled={isLoadingMore}
          onClick={onLoadMore}
          className="w-full rounded-lg border border-[#252a42] bg-[#15192b] px-4 py-2.5 text-[13px] font-medium text-[#e2e3ea] transition-colors hover:border-[#353d62] disabled:opacity-50"
        >
          {isLoadingMore ? "جاري التحميل..." : "عرض المزيد من الأحداث"}
        </button>
      )}
    </section>
  );
}
