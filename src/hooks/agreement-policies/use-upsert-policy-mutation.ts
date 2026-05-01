"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { upsertAgreementPolicyMutationOptions } from "@/lib/agreement-policies/actions";

// AR: هوك لحفظ سياسة الاتفاق ثم تحديث بياناتها المخزنة محليًا.
// EN: Hook for saving an agreement policy and refreshing its cached query state.
export function useUpsertPolicyMutation() {
  const queryClient = useQueryClient();

  return useMutation(upsertAgreementPolicyMutationOptions(queryClient));
}
