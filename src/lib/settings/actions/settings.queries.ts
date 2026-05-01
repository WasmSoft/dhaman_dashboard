import { queryOptions } from "@tanstack/react-query";

import { getDefaultPolicies } from "./settings.api";
import { settingsQueryKeys } from "./settings.keys";

// AR: تبني هذه الدالة خيارات استعلام السياسات الافتراضية مع كاش مناسب لواجهة الإعدادات.
// EN: This builder returns default-policy query options with dashboard-friendly caching.
export function defaultPoliciesQueryOptions() {
  return queryOptions({
    queryKey: settingsQueryKeys.defaultPolicies(),
    queryFn: getDefaultPolicies,
    staleTime: 5 * 60 * 1000,
  });
}
