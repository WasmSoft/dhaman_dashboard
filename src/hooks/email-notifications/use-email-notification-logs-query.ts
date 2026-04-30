// AR: Hook مخصص لجلب سجلات البريد داخل مكونات لوحة التحكم.
// EN: Custom hook for fetching email notification logs inside dashboard client components.
"use client";

import { useQuery } from "@tanstack/react-query";

import { emailNotificationLogsQueryOptions } from "@/lib/email-notifications/actions";
import type { EmailLogQueryParams } from "@/types";

export function useEmailNotificationLogsQuery(params?: EmailLogQueryParams) {
  return useQuery(emailNotificationLogsQueryOptions(params));
}
