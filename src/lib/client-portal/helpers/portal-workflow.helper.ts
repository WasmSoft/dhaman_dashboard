import type {
  PortalPaymentPlanResponse,
  PortalWorkspaceResponseDto,
} from "@/types";

const reviewableDeliveryStatuses = new Set([
  "SUBMITTED",
  "CLIENT_REVIEW",
  "IN_REVIEW",
  "PENDING_REVIEW",
]);

// AR: تختار أول دفعة تحتاج تمويلاً ليستخدمها مسار /fund-milestone بدون معرف دفعة في الرابط.
// EN: Selects the first payment that needs funding for the /fund-milestone route without exposing a payment id in the URL.
export function getFirstFundablePortalPaymentId(
  plan: PortalPaymentPlanResponse | null | undefined,
) {
  return plan?.payments.find((payment) => payment.status === "WAITING")?.id ?? null;
}

// AR: تختار أول دفعة جاهزة للإصدار ليستخدمها مسار /release-payment بعد قبول التسليم.
// EN: Selects the first payment ready for release for the /release-payment route after delivery acceptance.
export function getFirstReleasablePortalPaymentId(
  plan: PortalPaymentPlanResponse | null | undefined,
) {
  return (
    plan?.payments.find((payment) => payment.status === "READY_TO_RELEASE")?.id ??
    null
  );
}

// AR: تختار أحدث تسليم قابل للمراجعة من مساحة عمل البوابة، مع احتياط لأول تسليم متاح.
// EN: Selects the latest reviewable delivery from the portal workspace, falling back to the first available delivery.
export function getPortalDeliveryPreviewId(
  workspace: PortalWorkspaceResponseDto | null | undefined,
) {
  if (!workspace?.deliveries.length) {
    return null;
  }

  const sortedDeliveries = [...workspace.deliveries].sort(
    (left, right) =>
      new Date(right.submittedAt ?? 0).getTime() -
      new Date(left.submittedAt ?? 0).getTime(),
  );

  return (
    sortedDeliveries.find((delivery) =>
      reviewableDeliveryStatuses.has(String(delivery.status)),
    )?.id ?? sortedDeliveries[0]?.id ?? null
  );
}
