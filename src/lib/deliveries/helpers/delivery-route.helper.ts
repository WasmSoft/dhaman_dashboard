import type { AgreementStatus } from "@/types/agreements";
import type { Milestone } from "@/types/milestones";

export interface DeliveryRouteCandidate {
  agreementId: string;
  agreementStatus: AgreementStatus;
  milestones: readonly Milestone[];
}

export interface DeliveryRouteMatch {
  agreementId: string;
  milestoneId: string;
}

const deliveryEligibleAgreementStatuses: readonly AgreementStatus[] = ["ACTIVE"];
const deliveryEligibleMilestoneStatuses: readonly Milestone["status"][] = [
  "ACTIVE",
  "IN_REVIEW",
  "CHANGES_REQUESTED",
];
const deliveryEligibleMilestoneDeliveryStatuses: readonly Milestone["deliveryStatus"][] = [
  "DRAFT",
  "NOT_SUBMITTED",
  "CHANGES_REQUESTED",
];

// AR: يبني هذا المساعد رابط نقطة الدخول العامة لإنشاء تسليم جديد من صفحة التسليمات.
// EN: This helper builds the generic entry route for creating a new delivery from the deliveries page.
export function buildCreateDeliveryHubHref() {
  return "/agreements/delivery";
}

// AR: يتحقق هذا المساعد من أهلية المرحلة لإنشاء تسليم جديد أو متابعة مسودة قابلة للتعديل.
// EN: This helper checks whether a milestone can accept a new delivery or continue an editable draft.
export function isMilestoneEligibleForDelivery(milestone: Milestone) {
  return (
    deliveryEligibleMilestoneStatuses.includes(milestone.status) &&
    deliveryEligibleMilestoneDeliveryStatuses.includes(milestone.deliveryStatus)
  );
}

// AR: يختار هذا المساعد أول اتفاق/مرحلة مناسبة لفتح شاشة التسليم العامة بشكل موثوق.
// EN: This helper picks the first suitable agreement/milestone pair for the generic delivery-create route.
export function findFirstDeliveryRouteMatch(
  candidates: readonly DeliveryRouteCandidate[],
): DeliveryRouteMatch | null {
  for (const candidate of candidates) {
    if (!deliveryEligibleAgreementStatuses.includes(candidate.agreementStatus)) {
      continue;
    }

    const milestone = candidate.milestones.find(isMilestoneEligibleForDelivery);

    if (milestone) {
      return {
        agreementId: candidate.agreementId,
        milestoneId: milestone.id,
      };
    }
  }

  return null;
}
