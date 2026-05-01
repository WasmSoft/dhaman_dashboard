"use client";

import { useQuery } from "@tanstack/react-query";

import { portalInviteQueryOptions } from "@/lib/client-portal/actions";

export function usePortalInviteQuery(token: string) {
  return useQuery(portalInviteQueryOptions(token));
}
