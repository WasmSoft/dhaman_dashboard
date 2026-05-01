"use client";

import { useQuery } from "@tanstack/react-query";

import {
  agreementMilestonesQueryOptions,
  milestonesQueryKeys,
  getAgreementMilestones,
} from "@/lib/milestones/actions";

// AR: Hook مخصص لجلب مراحل اتفاقية واحدة داخل مكونات العميل.
// EN: Custom hook for fetching one agreement's milestones inside client components.
export function useAgreementMilestonesQuery(agreementId: string | undefined) {
  return useQuery({
    ...(agreementId
      ? agreementMilestonesQueryOptions(agreementId)
      : {
          queryKey: milestonesQueryKeys.list(""),
          queryFn: () => getAgreementMilestones(agreementId!),
        }),
    enabled: Boolean(agreementId),
    staleTime: 30_000,
    retry: 2,
  });
}
