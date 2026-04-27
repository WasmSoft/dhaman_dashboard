import type { QueryClient } from "@tanstack/react-query";

import { clientPortalQueryKeys } from "./client-portal.keys";

// AR: هذه الدالة تبني أدوات invalidate لبوابة العميل بدون ربطها بأي React hook.
// EN: This function builds client-portal invalidation helpers without coupling them to any React hook.
export function createClientPortalInvalidationActions(queryClient: QueryClient) {
  return {
    invalidateOverview: () =>
      queryClient.invalidateQueries({
        queryKey: clientPortalQueryKeys.overview(),
      }),
    invalidateAgreements: () =>
      queryClient.invalidateQueries({
        queryKey: clientPortalQueryKeys.all,
      }),
  };
}
