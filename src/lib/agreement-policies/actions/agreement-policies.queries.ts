import { queryOptions } from "@tanstack/react-query";

import { ApiError } from "@/lib/axios-instance";

import { getAgreementPolicy } from "./agreement-policies.api";
import { agreementPoliciesQueryKeys } from "./agreement-policies.keys";

// AR: تبني هذه الدالة خيارات الاستعلام مع تحويل 404 الخاصة بعدم وجود سياسة إلى حالة فارغة.
// EN: This builder turns the no-policy 404 into a null state so the UI can render an empty form.
export function agreementPolicyQueryOptions(agreementId: string) {
  return queryOptions({
    queryKey: agreementPoliciesQueryKeys.byAgreement(agreementId),
    queryFn: async () => {
      try {
        return await getAgreementPolicy(agreementId);
      } catch (error) {
        if (
          error instanceof ApiError &&
          error.statusCode === 404 &&
          error.code === "POLICY_NOT_FOUND"
        ) {
          return null;
        }

        throw error;
      }
    },
  });
}
