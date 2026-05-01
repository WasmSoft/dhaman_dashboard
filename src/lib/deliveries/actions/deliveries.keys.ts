<<<<<<< HEAD
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
=======
import type { DeliveryListParams } from "@/types";

// AR: مفاتيح استعلامات التسليمات — توحّد الكاش للوحة التحكم وبوابة العميل.
// EN: Delivery query keys — centralize cache keys for the dashboard and client portal.
export const deliveriesQueryKeys = {
  all: ["deliveries"] as const,
  lists: () => [...deliveriesQueryKeys.all, "list"] as const,
  list: (params?: DeliveryListParams) =>
    [...deliveriesQueryKeys.lists(), params ?? {}] as const,
  details: () => [...deliveriesQueryKeys.all, "detail"] as const,
  detail: (deliveryId: string) =>
    [...deliveriesQueryKeys.details(), deliveryId] as const,
  portalWorkspaces: () => [...deliveriesQueryKeys.all, "portal-workspace"] as const,
  portalWorkspace: (token: string) =>
    [...deliveriesQueryKeys.portalWorkspaces(), token] as const,
  portalDetails: () => [...deliveriesQueryKeys.all, "portal-detail"] as const,
  portalDetail: (token: string, deliveryId: string) =>
    [...deliveriesQueryKeys.portalDetails(), token, deliveryId] as const,
} as const;
>>>>>>> 376aec6939d214e5014cc9fa065f5e9a54ce38a7
