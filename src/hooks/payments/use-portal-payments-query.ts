"use client";

import { useQuery } from "@tanstack/react-query";
import {
  portalPaymentsQueryOptions,
  paymentsQueryKeys,
  getPortalPayments,
} from "@/lib/payments/actions";

// AR: هوك جلب خطة الدفع عبر رمز بوابة العميل.
// EN: Hook for fetching the payment plan via a client portal token.
export function usePortalPaymentsQuery(token: string | undefined) {
  return useQuery({
    ...(token
      ? portalPaymentsQueryOptions(token)
      : {
          queryKey: paymentsQueryKeys.portalList(""),
          queryFn: () => getPortalPayments(token!),
        }),
    enabled: Boolean(token),
    staleTime: 30_000,
  });
}
