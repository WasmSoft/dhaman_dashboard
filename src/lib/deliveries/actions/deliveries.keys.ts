import type { DeliveryFilters } from "@/types";

export const deliveriesQueryKeys = {
  all: ["deliveries"] as const,
  lists: () => [...deliveriesQueryKeys.all, "list"] as const,
  list: (filters?: DeliveryFilters) =>
    [...deliveriesQueryKeys.lists(), filters ?? {}] as const,
  details: () => [...deliveriesQueryKeys.all, "detail"] as const,
  detail: (deliveryId: string) =>
    [...deliveriesQueryKeys.details(), deliveryId] as const,
} as const;