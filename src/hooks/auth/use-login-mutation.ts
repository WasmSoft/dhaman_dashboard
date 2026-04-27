"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createLoginMutationOptions } from "@/lib/auth/actions";

// AR: هذه hook توفر login mutation جاهزة للاستخدام داخل client components بدون تكرار منطق الكاش.
// EN: This hook exposes a ready-to-use login mutation for client components without duplicating cache logic.
export function useLoginMutation() {
  const queryClient = useQueryClient();

  return useMutation(createLoginMutationOptions(queryClient));
}
