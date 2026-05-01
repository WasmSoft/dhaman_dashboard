"use client";

import { useQuery } from "@tanstack/react-query";

import { portalPaymentsQueryOptions } from "@/lib/client-portal/actions";

export function usePortalPaymentsQuery(token: string) {
  return useQuery(portalPaymentsQueryOptions(token));
}
