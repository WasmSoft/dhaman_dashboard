"use client";

import { dashboardTranslations } from "@/constants/dashboard";
import { getAppLocale } from "@/lib/locale";

import type { DashboardDateRange } from "@/types";

const DATE_RANGE_OPTIONS: DashboardDateRange[] = ["7d", "30d", "90d", "all"];

const OPTION_KEYS: Record<DashboardDateRange, string> = {
  "7d": "dashboard.overview.dateRange.options.7d",
  "30d": "dashboard.overview.dateRange.options.30d",
  "90d": "dashboard.overview.dateRange.options.90d",
  all: "dashboard.overview.dateRange.options.all",
};

// AR: مكوّن اختيار نطاق التاريخ — يتحكم بالفترة الزمنية لبطاقات النظرة العامة.
// EN: Date range selector — controls the time period for the overview cards.
export function DashboardDateRangeSelector({
  value,
  onChange,
}: {
  value: DashboardDateRange;
  onChange: (range: DashboardDateRange) => void;
}) {
  const locale = getAppLocale();
  const t = dashboardTranslations[locale];
  const labelKey = "dashboard.overview.dateRange.label" as keyof typeof t;

  return (
    <div className="flex items-center gap-2">
      <label className="text-[13px] font-medium text-[#737b99]">
        {t[labelKey]}
      </label>
      <div className="flex gap-1 rounded-[10px] border border-[#252a42] bg-[#15192b] p-1">
        {DATE_RANGE_OPTIONS.map((option) => {
          const optionLabelKey = OPTION_KEYS[option] as keyof typeof t;

          return (
            <button
              key={option}
              type="button"
              onClick={() => onChange(option)}
              className={`rounded-lg px-3 py-1.5 text-[12px] font-medium transition-colors ${
                value === option
                  ? "bg-[#6f52ff] text-white shadow-[0_0_12px_rgba(111,82,255,0.3)]"
                  : "text-[#737b99] hover:bg-[#22264a] hover:text-white"
              }`}
            >
              {t[optionLabelKey]}
            </button>
          );
        })}
      </div>
    </div>
  );
}