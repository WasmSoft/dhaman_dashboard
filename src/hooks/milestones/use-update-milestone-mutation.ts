"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateMilestoneMutationOptions } from "@/lib/milestones/actions";

// AR: Hook مخصص لتحديث مرحلة موجودة مع إعادة مزامنة الكاش.
// EN: Custom hook for updating an existing milestone and resyncing cache.
export function useUpdateMilestoneMutation() {
  const queryClient = useQueryClient();

  return useMutation(updateMilestoneMutationOptions(queryClient));
}
