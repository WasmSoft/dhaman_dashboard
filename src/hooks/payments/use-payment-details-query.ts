"use client";

import { useQuery } from "@tanstack/react-query";
import {
  paymentDetailsQueryOptions,
  paymentsQueryKeys,
  getPaymentById,
} from "@/lib/payments/actions";

// AR: هوك جلب تفاصيل دفعة واحدة.
// EN: Hook for fetching a single payment detail.
export function usePaymentDetailsQuery(paymentId: string | undefined) {
  return useQuery({
    ...(paymentId
      ? paymentDetailsQueryOptions(paymentId)
      : {
          queryKey: paymentsQueryKeys.detail(""),
          queryFn: () => getPaymentById(paymentId!),
        }),
    enabled: Boolean(paymentId),
  });
}
