"use client";

import { useQuery } from "@tanstack/react-query";

import {
  deliveriesQueryKeys,
  getPortalDeliveryById,
  portalDeliveryDetailsQueryOptions,
} from "@/lib/deliveries/actions";

// AR: هوك تفاصيل التسليم المقتصرة على رمز بوابة العميل.
// EN: Portal-scoped delivery detail query hook.
export function usePortalDeliveryDetailsQuery(
  token: string | undefined,
  deliveryId: string | undefined,
) {
  return useQuery({
    ...(token && deliveryId
      ? portalDeliveryDetailsQueryOptions(token, deliveryId)
      : {
          queryKey: deliveriesQueryKeys.portalDetail(token ?? "", deliveryId ?? ""),
          queryFn: () => getPortalDeliveryById(token!, deliveryId!),
        }),
    enabled: Boolean(token && deliveryId),
    staleTime: 30_000,
    retry: 1,
  });
}
