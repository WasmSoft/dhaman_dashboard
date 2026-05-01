"use client";

import { useQuery } from "@tanstack/react-query";

import { deliveryDetailsQueryOptions } from "@/lib/deliveries/actions";

// AR: hook تغلف query الخاصة بتفاصيل تسليم واحد بناءً على المعرف.
// EN: Hook wrapping the single delivery detail query by ID.
export function useDeliveryQuery(deliveryId: string) {
  return useQuery(deliveryDetailsQueryOptions(deliveryId));
}