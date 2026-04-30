"use client";

import { useState, useCallback } from "react";
import type { TimelineFilterValues } from "@/types";

// AR: هوك إدارة حالة فلاتر السجل الزمني — يدير الفلاتر ويعيد الصفحة إلى الأولى عند تغييرها.
// EN: Timeline filter state hook — manages filters and resets page to 1 on filter changes.
export function useTimelineFilters(initialFilters?: TimelineFilterValues) {
  const [filters, setFiltersState] = useState<TimelineFilterValues>(
    initialFilters ?? {}
  );
  const [page, setPage] = useState(1);

  // AR: تحديث الفلاتر مع إعادة تعيين الصفحة.
  // EN: Update filters and reset page to 1.
  const updateFilters = useCallback((newFilters: TimelineFilterValues) => {
    setFiltersState(newFilters);
    setPage(1);
  }, []);

  // AR: الانتقال إلى الصفحة التالية.
  // EN: Go to the next page.
  const nextPage = useCallback(() => {
    setPage((prev) => prev + 1);
  }, []);

  // AR: إعادة تعيين الفلاتر والصفحة.
  // EN: Reset filters and page.
  const resetFilters = useCallback(() => {
    setFiltersState({});
    setPage(1);
  }, []);

  return {
    filters,
    page,
    updateFilters,
    nextPage,
    resetFilters,
  };
}
