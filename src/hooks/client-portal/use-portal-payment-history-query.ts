"use client";

import { useQuery } from "@tanstack/react-query";

import { portalPaymentHistoryQueryOptions } from "@/lib/client-portal/actions";

export function usePortalPaymentHistoryQuery(token: string) {
  return useQuery(portalPaymentHistoryQueryOptions(token));
}
