"use client";

import { useQuery } from "@tanstack/react-query";

import { settingsQueryOptions } from "@/lib/settings/actions";

// AR: هوك لجلب الإعدادات العامة داخل صفحة الإعدادات.
// EN: Hook for fetching general settings inside the settings page.
export function useSettingsQuery() {
  return useQuery(settingsQueryOptions());
}
