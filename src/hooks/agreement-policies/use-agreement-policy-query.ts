"use client";

import { useQuery } from "@tanstack/react-query";

import { agreementPolicyQueryOptions } from "@/lib/agreement-policies/actions";

// AR: هوك لجلب سياسة الاتفاق مع دعم حالة عدم وجود سجل بعد.
// EN: Hook for fetching an agreement policy with support for the initial no-record state.
export function useAgreementPolicyQuery(agreementId: string) {
  return useQuery(agreementPolicyQueryOptions(agreementId));
}
