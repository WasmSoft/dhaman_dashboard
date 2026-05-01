import type { QueryClient, UseMutationOptions } from "@tanstack/react-query";

import type { AgreementPolicy, PolicyMutationPayload } from "@/types";

import { upsertAgreementPolicy } from "./agreement-policies.api";
import { agreementPoliciesQueryKeys } from "./agreement-policies.keys";

export interface UpsertAgreementPolicyMutationInput {
  agreementId: string;
  payload: PolicyMutationPayload;
}

// AR: تبني هذه الدالة خيارات طفرة حفظ السياسات مع تحديث كاش الاتفاق نفسه فقط.
// EN: This builder creates policy mutation options and invalidates only the related agreement policy cache.
export function upsertAgreementPolicyMutationOptions(
  queryClient: QueryClient,
): UseMutationOptions<
  AgreementPolicy,
  Error,
  UpsertAgreementPolicyMutationInput
> {
  return {
    mutationFn: ({ agreementId, payload }) =>
      upsertAgreementPolicy(agreementId, payload),
    onSuccess: async (_result, variables) => {
      await queryClient.invalidateQueries({
        queryKey: agreementPoliciesQueryKeys.byAgreement(variables.agreementId),
      });
    },
  };
}
