import { queryOptions } from "@tanstack/react-query";

import type { EmailLogQueryParams } from "@/types";

import { getEmailNotificationLogs } from "./email-notifications.api";
import { emailNotificationsQueryKeys } from "./email-notifications.keys";

// AR: تبني خيارات استعلام سجلات البريد مع الفلاتر والصفحات المستخدمة في لوحة التحكم.
// EN: Builds email log query options with the filters and pagination used by the dashboard.
export function emailNotificationLogsQueryOptions(
  params?: EmailLogQueryParams,
) {
  return queryOptions({
    queryKey: emailNotificationsQueryKeys.logList(params),
    queryFn: () => getEmailNotificationLogs(params),
  });
}
