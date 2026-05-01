import { queryOptions } from "@tanstack/react-query";

import { getDefaultPolicies, getSettings } from "./settings.api";
import { settingsQueryKeys } from "./settings.keys";

// AR: تبني هذه الدالة خيارات استعلام الإعدادات العامة مع كاش مناسب للوحة التحكم.
// EN: This builder returns general settings query options with dashboard-friendly caching.
export function settingsQueryOptions() {
  return queryOptions({
    queryKey: settingsQueryKeys.general(),
    queryFn: getSettings,
    staleTime: 5 * 60 * 1000,
  });
}

// AR: تبني هذه الدالة خيارات استعلام السياسات الافتراضية مع كاش مناسب لواجهة الإعدادات.
// EN: This builder returns default-policy query options with dashboard-friendly caching.
export function defaultPoliciesQueryOptions() {
  return queryOptions({
    queryKey: settingsQueryKeys.defaultPolicies(),
    queryFn: getDefaultPolicies,
    staleTime: 5 * 60 * 1000,
  });
}
