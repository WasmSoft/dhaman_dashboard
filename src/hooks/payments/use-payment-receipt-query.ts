"use client";

import { useQuery } from "@tanstack/react-query";
import {
  paymentReceiptQueryOptions,
  paymentsQueryKeys,
  getPaymentReceipt,
} from "@/lib/payments/actions";

// AR: هوك جلب إيصال دفعة.
// EN: Hook for fetching a payment receipt.
export function usePaymentReceiptQuery(paymentId: string | undefined) {
  return useQuery({
    ...(paymentId
      ? paymentReceiptQueryOptions(paymentId)
      : {
          queryKey: paymentsQueryKeys.receipt(""),
          queryFn: () => getPaymentReceipt(paymentId!),
        }),
    enabled: Boolean(paymentId),
  });
}
