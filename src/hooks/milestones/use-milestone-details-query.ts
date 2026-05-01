"use client";

import { useQuery } from "@tanstack/react-query";

import {
  getMilestoneById,
  milestoneDetailsQueryOptions,
  milestonesQueryKeys,
} from "@/lib/milestones/actions";

// AR: Hook مخصص لجلب تفاصيل مرحلة واحدة عند فتح صفحة المرحلة.
// EN: Custom hook for fetching one milestone detail when opening its page.
export function useMilestoneDetailsQuery(milestoneId: string | undefined) {
  return useQuery({
    ...(milestoneId
      ? milestoneDetailsQueryOptions(milestoneId)
      : {
          queryKey: milestonesQueryKeys.detail(""),
          queryFn: () => getMilestoneById(milestoneId!),
        }),
    enabled: Boolean(milestoneId),
    staleTime: 30_000,
    retry: 2,
  });
}
