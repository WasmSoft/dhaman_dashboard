import type { ClientListParams } from "@/types";

export const clientsQueryKeys = {
  all: ["clients"] as const,
  lists: () => [...clientsQueryKeys.all, "list"] as const,
  list: (params?: ClientListParams) =>
    [
      ...clientsQueryKeys.lists(),
      params?.search ?? "",
      params?.page ?? 1,
      params?.limit ?? 20,
    ] as const,
  details: () => [...clientsQueryKeys.all, "detail"] as const,
  detail: (clientId: string) => [...clientsQueryKeys.details(), clientId] as const,
  summaries: () => [...clientsQueryKeys.all, "summary"] as const,
  summary: (clientId: string) => [...clientsQueryKeys.summaries(), clientId] as const,
} as const;
