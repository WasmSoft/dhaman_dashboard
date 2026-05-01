"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { releasePaymentMutationOptions } from "@/lib/payments/actions";

// AR: هوك إصدار دفعة في لوحة التحكم.
// EN: Hook for releasing a payment in the dashboard.
export function useReleasePaymentMutation() {
  const queryClient = useQueryClient();

  return useMutation(
    releasePaymentMutationOptions(queryClient),
  );
}
