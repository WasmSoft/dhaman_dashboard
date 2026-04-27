import type { ClientPortalAgreementsParams } from "@/types";

export const clientPortalQueryKeys = {
  all: ["client-portal"] as const,
  overview: () => [...clientPortalQueryKeys.all, "overview"] as const,
  agreements: (params?: ClientPortalAgreementsParams) =>
    [...clientPortalQueryKeys.all, "agreements", params ?? {}] as const,
} as const;
