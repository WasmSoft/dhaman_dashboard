"use client";

import { useQuery } from "@tanstack/react-query";

import { portalTimelineQueryOptions } from "@/lib/client-portal/actions";

export function usePortalTimelineQuery(token: string) {
  return useQuery(portalTimelineQueryOptions(token));
}
