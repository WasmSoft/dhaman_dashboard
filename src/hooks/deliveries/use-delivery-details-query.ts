"use client";

import { useQuery } from "@tanstack/react-query";

import {
  deliveryDetailsQueryOptions,
  deliveriesQueryKeys,
  getDeliveryById,
} from "@/lib/deliveries/actions";

// AR: هوك تفاصيل تسليم واحد للوحة التحكم.
// EN: Query hook for a single delivery detail in the dashboard.
export function useDeliveryDetailsQuery(deliveryId: string | undefined) {
  return useQuery({
    ...(deliveryId
      ? deliveryDetailsQueryOptions(deliveryId)
      : {
          queryKey: deliveriesQueryKeys.detail(""),
          queryFn: () => getDeliveryById(deliveryId!),
        }),
    enabled: Boolean(deliveryId),
    staleTime: 30_000,
    retry: 1,
  });
}
