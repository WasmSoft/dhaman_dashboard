import { queryOptions } from "@tanstack/react-query";

import { getDashboardSummary } from "./dashboard.api";
import { dashboardQueryKeys } from "./dashboard.keys";

// AR: تبني هذه الدالة query options لملخص لوحة التحكم حتى يمكن استخدامها في hooks أو prefetching.
// EN: This function builds dashboard summary query options so they can be reused in hooks or prefetching.
export function dashboardSummaryQueryOptions() {
  return queryOptions({
    queryKey: dashboardQueryKeys.summary(),
    queryFn: getDashboardSummary,
  });
}
