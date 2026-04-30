"use client";

import { useCallback } from "react";

import type { DashboardDateRange } from "@/types";

const STORAGE_KEY = "dhaman_dashboard_date_range";
const DEFAULT_RANGE: DashboardDateRange = "30d";

// AR: هذه hook تدير نطاق تاريخ لوحة التحكم مع حفظه في sessionStorage.
// EN: This hook manages the dashboard date range with sessionStorage persistence.
export function useDashboardDateRange() {
  const getRange = (): DashboardDateRange => {
    if (typeof window === "undefined") {
      return DEFAULT_RANGE;
    }

    const stored = window.sessionStorage.getItem(STORAGE_KEY);

    if (
      stored === "7d" ||
      stored === "30d" ||
      stored === "90d" ||
      stored === "all"
    ) {
      return stored;
    }

    return DEFAULT_RANGE;
  };

  const setRange = useCallback((range: DashboardDateRange) => {
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem(STORAGE_KEY, range);
    }
  }, []);

  return { range: getRange(), setRange };
}