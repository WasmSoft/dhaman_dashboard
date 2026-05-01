"use client";

import { useQuery } from "@tanstack/react-query";

import { portalWorkspaceQueryOptions } from "@/lib/client-portal/actions";

export function usePortalWorkspaceQuery(token: string) {
  return useQuery(portalWorkspaceQueryOptions(token));
}
