"use client";

import { useQuery } from "@tanstack/react-query";
import {
  agreementPaymentsQueryOptions,
  paymentsQueryKeys,
  getAgreementPayments,
} from "@/lib/payments/actions";

// AR: هوك جلب دفعات اتفاقية للوحة التحكم.
// EN: Hook for fetching agreement payments in the dashboard.
export function useAgreementPaymentsQuery(agreementId: string | undefined) {
  return useQuery({
    ...(agreementId
      ? agreementPaymentsQueryOptions(agreementId)
      : {
          queryKey: paymentsQueryKeys.agreementList(""),
          queryFn: () => getAgreementPayments(agreementId!),
        }),
    enabled: Boolean(agreementId),
  });
}
