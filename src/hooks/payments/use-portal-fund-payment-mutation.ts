"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { portalFundPaymentMutationOptions } from "@/lib/payments/actions";

// AR: هوك تمويل دفعة من بوابة العميل.
// EN: Hook for funding a payment from the client portal.
export function usePortalFundPaymentMutation(
  token: string,
  paymentId: string,
) {
  const queryClient = useQueryClient();

  return useMutation(
    portalFundPaymentMutationOptions(queryClient, token, paymentId),
  );
}
