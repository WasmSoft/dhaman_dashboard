import type { ChangeRequestListParams } from "@/types";

export const changeRequestsQueryKeys = {
  all: ["change-requests"] as const,
  lists: () => [...changeRequestsQueryKeys.all, "list"] as const,
  list: (agreementId: string, params?: ChangeRequestListParams) =>
    [...changeRequestsQueryKeys.lists(), agreementId, params ?? {}] as const,
  details: () => [...changeRequestsQueryKeys.all, "details"] as const,
  detail: (id: string) =>
    [...changeRequestsQueryKeys.details(), id] as const,
} as const;
