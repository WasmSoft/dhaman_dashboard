"use client";

import { useQuery } from "@tanstack/react-query";

import { portalDeliveryQueryOptions } from "@/lib/client-portal/actions";

export function usePortalDeliveryQuery(token: string, deliveryId: string) {
  return useQuery(portalDeliveryQueryOptions(token, deliveryId));
}
