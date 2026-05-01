import { queryOptions } from "@tanstack/react-query";

import {
  getAgreementMilestones,
  getMilestoneById,
} from "./milestones.api";
import { milestonesQueryKeys } from "./milestones.keys";

// AR: تبني هذه الدالة query options لقائمة مراحل الاتفاقية.
// EN: This function builds query options for the agreement milestones list.
export function agreementMilestonesQueryOptions(agreementId: string) {
  return queryOptions({
    queryKey: milestonesQueryKeys.list(agreementId),
    queryFn: () => getAgreementMilestones(agreementId),
    enabled: Boolean(agreementId),
  });
}

// AR: تبني هذه الدالة query options لتفاصيل مرحلة واحدة.
// EN: This function builds query options for a single milestone detail.
export function milestoneDetailsQueryOptions(milestoneId: string) {
  return queryOptions({
    queryKey: milestonesQueryKeys.detail(milestoneId),
    queryFn: () => getMilestoneById(milestoneId),
    enabled: Boolean(milestoneId),
  });
}
