"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createMilestoneMutationOptions } from "@/lib/milestones/actions";

// AR: Hook مخصص لإنشاء مرحلة جديدة داخل اتفاقية محددة.
// EN: Custom hook for creating a new milestone inside a specific agreement.
export function useCreateMilestoneMutation(agreementId: string) {
  const queryClient = useQueryClient();

  return useMutation(createMilestoneMutationOptions(queryClient, agreementId));
}
