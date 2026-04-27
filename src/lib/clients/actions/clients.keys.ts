import type { ClientListParams } from "@/types";

export const clientsQueryKeys = {
  all: ["clients"] as const,
  lists: () => [...clientsQueryKeys.all, "list"] as const,
  list: (params?: ClientListParams) =>
    [...clientsQueryKeys.lists(), params ?? {}] as const,
  details: () => [...clientsQueryKeys.all, "details"] as const,
  detail: (clientId: string) => [...clientsQueryKeys.details(), clientId] as const,
} as const;
