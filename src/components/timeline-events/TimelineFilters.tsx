"use client";

import { Filter, X } from "lucide-react";
import type { TimelineFilterValues, TimelineEventType, TimelineActorRole } from "@/types";
import {
  TIMELINE_EVENT_TYPE_LABELS,
  TIMELINE_ACTOR_LABELS,
} from "@/constants";

const EVENT_TYPES = Object.keys(TIMELINE_EVENT_TYPE_LABELS) as TimelineEventType[];
const ACTOR_ROLES = Object.keys(TIMELINE_ACTOR_LABELS) as TimelineActorRole[];

interface TimelineFiltersProps {
  /**
   * AR: قيم الفلاتر الحالية.
   * EN: Current filter values.
   */
  filters: TimelineFilterValues;
  /**
   * AR: دالة تحديث الفلاتر.
   * EN: Callback to update filters.
   */
  onFiltersChange: (filters: TimelineFilterValues) => void;
}

// AR: مكوّن فلاتر السجل الزمني — يسمح بتصفية الأحداث حسب النوع والدور والتاريخ.
// EN: Timeline filters component — allows filtering events by type, role, and date range.
export function TimelineFilters({
  filters,
  onFiltersChange,
}: TimelineFiltersProps) {
  const hasActiveFilters =
    filters.type ||
    filters.actorRole ||
    filters.from ||
    filters.to;

  const clearFilters = () => {
    onFiltersChange({});
  };

  return (
    <div
      dir="rtl"
      className="flex flex-wrap items-start gap-3 rounded-[12px] border border-[#252a42] bg-[#15192b] p-3"
    >
      {/* AR: عنوان قسم الفلاتر.
          EN: Filters section label. */}
      <span className="inline-flex items-center gap-1.5 text-[13px] text-[#737b99]">
        <Filter className="size-4" />
        تصفية
      </span>

      {/* AR: فلتر نوع الحدث.
          EN: Event type filter. */}
      <select
        value={filters.type ?? ""}
        onChange={(e) =>
          onFiltersChange({
            ...filters,
            type: (e.target.value as TimelineEventType) || undefined,
          })
        }
        className="rounded-lg border border-[#252a42] bg-[#0e1124] px-3 py-1.5 text-[13px] text-[#e2e3ea] focus:border-[#a898ff] focus:outline-none"
      >
        <option value="">كل الأنواع</option>
        {EVENT_TYPES.map((type) => (
          <option key={type} value={type}>
            {TIMELINE_EVENT_TYPE_LABELS[type]}
          </option>
        ))}
      </select>

      {/* AR: فلتر دور الجهة الفاعلة.
          EN: Actor role filter. */}
      <select
        value={filters.actorRole ?? ""}
        onChange={(e) =>
          onFiltersChange({
            ...filters,
            actorRole: (e.target.value as TimelineActorRole) || undefined,
          })
        }
        className="rounded-lg border border-[#252a42] bg-[#0e1124] px-3 py-1.5 text-[13px] text-[#e2e3ea] focus:border-[#a898ff] focus:outline-none"
      >
        <option value="">كل الأدوار</option>
        {ACTOR_ROLES.map((role) => (
          <option key={role} value={role}>
            {TIMELINE_ACTOR_LABELS[role]}
          </option>
        ))}
      </select>

      {/* AR: فلتر التاريخ من.
          EN: Date from filter. */}
      <label className="flex items-center gap-1.5 text-[13px] text-[#737b99]">
        من
        <input
          type="date"
          value={filters.from ?? ""}
          onChange={(e) =>
            onFiltersChange({
              ...filters,
              from: e.target.value || undefined,
            })
          }
          className="rounded-lg border border-[#252a42] bg-[#0e1124] px-2 py-1.5 text-[13px] text-[#e2e3ea] focus:border-[#a898ff] focus:outline-none"
        />
      </label>

      {/* AR: فلتر التاريخ إلى.
          EN: Date to filter. */}
      <label className="flex items-center gap-1.5 text-[13px] text-[#737b99]">
        إلى
        <input
          type="date"
          value={filters.to ?? ""}
          onChange={(e) =>
            onFiltersChange({
              ...filters,
              to: e.target.value || undefined,
            })
          }
          className="rounded-lg border border-[#252a42] bg-[#0e1124] px-2 py-1.5 text-[13px] text-[#e2e3ea] focus:border-[#a898ff] focus:outline-none"
        />
      </label>

      {/* AR: زر مسح الفلاتر.
          EN: Clear filters button. */}
      {hasActiveFilters && (
        <button
          type="button"
          onClick={clearFilters}
          className="inline-flex items-center gap-1 rounded-lg px-2 py-1.5 text-[13px] text-red-400 transition-colors hover:bg-[#252a42]"
        >
          <X className="size-4" />
          مسح
        </button>
      )}
    </div>
  );
}
