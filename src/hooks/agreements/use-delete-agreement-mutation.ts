"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteAgreementMutationOptions } from "@/lib/agreements/actions";

// AR: هذه hook توفر delete-agreement mutation مع تنظيف كاش التفاصيل بعد الحذف.
// EN: This hook exposes the delete-agreement mutation and clears stale detail cache after deletion.
export function useDeleteAgreementMutation() {
  const queryClient = useQueryClient();

  return useMutation(deleteAgreementMutationOptions(queryClient));
}
