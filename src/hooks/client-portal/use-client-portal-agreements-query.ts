"use client";

import { useQuery } from "@tanstack/react-query";

import { clientPortalAgreementsQueryOptions } from "@/lib/client-portal/actions";
import type { ClientPortalAgreementsParams } from "@/types";

// AR: هذه hook تغلف query الخاصة باتفاقيات العميل وتعيد استخدام query options المركزية.
// EN: This hook wraps the client agreements query and reuses the centralized query options.
export function useClientPortalAgreementsQuery(
  params?: ClientPortalAgreementsParams,
) {
  return useQuery(clientPortalAgreementsQueryOptions(params));
}
