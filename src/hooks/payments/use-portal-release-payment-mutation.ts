"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { portalReleasePaymentMutationOptions } from "@/lib/payments/actions";

// AR: هوك إصدار دفعة من بوابة العميل.
// EN: Hook for releasing a payment from the client portal.
export function usePortalReleasePaymentMutation(
  token: string,
  paymentId: string,
) {
  const queryClient = useQueryClient();

  return useMutation(
    portalReleasePaymentMutationOptions(queryClient, token, paymentId),
  );
}
