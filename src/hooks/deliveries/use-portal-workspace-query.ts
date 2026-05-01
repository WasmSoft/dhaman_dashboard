"use client";

import { useQuery } from "@tanstack/react-query";

import {
  deliveriesQueryKeys,
  getPortalWorkspace,
  portalWorkspaceQueryOptions,
} from "@/lib/deliveries/actions";

// AR: هوك مساحة عمل بوابة العميل لاستخدامها في مراجعة التسليم والسياق المحيط به.
// EN: Portal workspace query hook used by delivery review and surrounding context.
export function usePortalWorkspaceQuery(token: string | undefined) {
  return useQuery({
    ...(token
      ? portalWorkspaceQueryOptions(token)
      : {
          queryKey: deliveriesQueryKeys.portalWorkspace(""),
          queryFn: () => getPortalWorkspace(token!),
        }),
    enabled: Boolean(token),
    staleTime: 30_000,
    retry: 1,
  });
}
