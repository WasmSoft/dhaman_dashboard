import type { QueryClient } from "@tanstack/react-query";

import { dashboardQueryKeys } from "./dashboard.keys";

// AR: هذه الدالة تبني أدوات invalidate للـ dashboard لاستخدامها داخل hooks أو handlers قابلة لإعادة الاستخدام.
// EN: This function builds dashboard invalidation helpers for reusable hooks or handlers.
export function createDashboardInvalidationActions(queryClient: QueryClient) {
  return {
    invalidateSummary: () =>
      queryClient.invalidateQueries({
        queryKey: dashboardQueryKeys.summary(),
      }),
  };
}
