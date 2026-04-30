"use client";

import { useQuery } from "@tanstack/react-query";
import { changeRequestsListQueryOptions } from "@/lib/change-requests/actions";
import type { ChangeRequestListParams } from "@/types";

// AR: Hook مخصص لجلب قائمة طلبات التغيير لاتفاقية معينة.
// EN: Custom hook for fetching the change requests list for a given agreement.
export function useChangeRequestsQuery(
  agreementId: string,
  params?: ChangeRequestListParams,
) {
  return useQuery(changeRequestsListQueryOptions(agreementId, params));
}
