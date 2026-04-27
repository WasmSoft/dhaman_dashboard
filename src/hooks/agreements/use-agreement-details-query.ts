"use client";

import { useQuery } from "@tanstack/react-query";

import { agreementDetailsQueryOptions } from "@/lib/agreements/actions";

// AR: هذه hook تغلف query الخاصة بتفاصيل الاتفاقية وتعيد استخدام query options المركزية.
// EN: This hook wraps the agreement-details query and reuses the centralized query options.
export function useAgreementDetailsQuery(agreementId: string) {
  return useQuery(agreementDetailsQueryOptions(agreementId));
}
