"use client";

import { useQuery } from "@tanstack/react-query";
import { changeRequestDetailsQueryOptions } from "@/lib/change-requests/actions";

// AR: Hook مخصص لجلب تفاصيل طلب تغيير واحد.
// EN: Custom hook for fetching a single change request detail.
export function useChangeRequestDetailsQuery(id: string) {
  return useQuery(changeRequestDetailsQueryOptions(id));
}
