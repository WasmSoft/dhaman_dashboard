"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateAgreementMutationOptions } from "@/lib/agreements/actions";

// AR: هذه hook توفر update-agreement mutation وتوحد تحديث كاش التفاصيل والقوائم.
// EN: This hook exposes the update-agreement mutation and unifies detail and list cache refreshes.
export function useUpdateAgreementMutation() {
  const queryClient = useQueryClient();

  return useMutation(updateAgreementMutationOptions(queryClient));
}
