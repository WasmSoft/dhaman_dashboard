"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fundMilestoneMutationOptions } from "@/lib/payments/actions";

// AR: هوك تمويل مرحلة في لوحة التحكم.
// EN: Hook for funding a milestone in the dashboard.
export function useFundMilestoneMutation() {
  const queryClient = useQueryClient();

  return useMutation(
    fundMilestoneMutationOptions(queryClient),
  );
}
