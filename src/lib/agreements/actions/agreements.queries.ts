import { queryOptions } from "@tanstack/react-query";

import type { AgreementListParams } from "@/types";

import { getAgreementById, getAgreements } from "./agreements.api";
import { agreementsQueryKeys } from "./agreements.keys";

// AR: تبني هذه الدالة query options لقائمة الاتفاقيات مع key ثابت يعتمد على params.
// EN: This function builds agreements-list query options with a stable key derived from params.
export function agreementsListQueryOptions(params?: AgreementListParams) {
  return queryOptions({
    queryKey: agreementsQueryKeys.list(params),
    queryFn: () => getAgreements(params),
  });
}

// AR: تبني هذه الدالة query options لتفاصيل الاتفاقية الواحدة وتتعامل مع غياب المعرف بشكل آمن.
// EN: This function builds agreement-details query options and safely handles a missing identifier.
export function agreementDetailsQueryOptions(agreementId: string) {
  return queryOptions({
    queryKey: agreementsQueryKeys.detail(agreementId),
    queryFn: () => getAgreementById(agreementId),
    enabled: Boolean(agreementId),
  });
}
