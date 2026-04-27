"use client";

import { useQuery } from "@tanstack/react-query";

import { clientDetailsQueryOptions } from "@/lib/clients/actions";

// AR: هذه hook تغلف query الخاصة بتفاصيل العميل وتعيد استخدام خيارات الاستعلام المركزية.
// EN: This hook wraps the client-details query and reuses the centralized query options.
export function useClientDetailsQuery(clientId: string) {
  return useQuery(clientDetailsQueryOptions(clientId));
}
