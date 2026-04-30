import type { EmailLogQueryParams } from "@/types";

export const emailNotificationsQueryKeys = {
  all: ["email-notifications"] as const,
  logs: () => [...emailNotificationsQueryKeys.all, "logs"] as const,
  logList: (params?: EmailLogQueryParams) =>
    [...emailNotificationsQueryKeys.logs(), params ?? {}] as const,
} as const;
