"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { reorderMilestonesMutationOptions } from "@/lib/milestones/actions";

// AR: Hook مخصص لإعادة ترتيب المراحل داخل نفس الاتفاقية.
// EN: Custom hook for reordering milestones inside the same agreement.
export function useReorderMilestonesMutation(agreementId: string) {
  const queryClient = useQueryClient();

  return useMutation(reorderMilestonesMutationOptions(queryClient, agreementId));
}
