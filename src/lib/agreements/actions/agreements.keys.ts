import type { AgreementListParams } from "@/types";

export const agreementsQueryKeys = {
  all: ["agreements"] as const,
  lists: () => [...agreementsQueryKeys.all, "list"] as const,
  list: (params?: AgreementListParams) =>
    [...agreementsQueryKeys.lists(), params ?? {}] as const,
  details: () => [...agreementsQueryKeys.all, "details"] as const,
  detail: (agreementId: string) =>
    [...agreementsQueryKeys.details(), agreementId] as const,
} as const;
