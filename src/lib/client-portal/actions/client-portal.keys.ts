import type { ClientPortalAgreementsParams } from "@/types";

export const clientPortalQueryKeys = {
  all: ["client-portal"] as const,
  overview: () => [...clientPortalQueryKeys.all, "overview"] as const,
  agreements: (params?: ClientPortalAgreementsParams) =>
    [...clientPortalQueryKeys.all, "agreements", params ?? {}] as const,
} as const;

export const portalQueryKeys = {
  all: ["portal"] as const,
  invite: (token: string) => [...portalQueryKeys.all, "invite", token] as const,
  workspace: (token: string) =>
    [...portalQueryKeys.all, "workspace", token] as const,
  delivery: (token: string, deliveryId: string) =>
    [...portalQueryKeys.all, "delivery", token, deliveryId] as const,
  payments: (token: string) =>
    [...portalQueryKeys.all, "payments", token] as const,
  paymentHistory: (token: string) =>
    [...portalQueryKeys.all, "payment-history", token] as const,
  timeline: (token: string) =>
    [...portalQueryKeys.all, "timeline", token] as const,
} as const;
