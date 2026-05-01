"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteMilestoneMutationOptions } from "@/lib/milestones/actions";

// AR: Hook مخصص لحذف مرحلة مع تنظيف البيانات القديمة من الكاش.
// EN: Custom hook for deleting a milestone and cleaning stale cache entries.
export function useDeleteMilestoneMutation() {
  const queryClient = useQueryClient();

  return useMutation(deleteMilestoneMutationOptions(queryClient));
}
