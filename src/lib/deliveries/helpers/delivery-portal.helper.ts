import type {
  DeliveryStatusValue,
  PortalDeliverySummaryDto,
  PortalWorkspacePaymentDto,
  PortalWorkspaceResponseDto,
} from "@/types";

import {
  getDeliveryPaymentStatusLabel,
  getDeliveryStatusLabel,
  isClientReviewStatus,
} from "./delivery-status.helper";

// AR: تبني هذه الدالة سياق المراجعة الخاص بالبوابة من بيانات مساحة العمل والتسليم المحدد.
// EN: This function builds the portal review context from the workspace data and selected delivery.
export function buildPortalDeliveryContext(
  workspace: PortalWorkspaceResponseDto | undefined,
  delivery: PortalDeliverySummaryDto | undefined,
) {
  if (!workspace || !delivery) {
    return null;
  }

  const milestone = workspace.milestones.find(
    (item) => item.id === delivery.milestoneId,
  );
  const payment = workspace.payments.find(
    (item) => item.milestoneId === delivery.milestoneId,
  );

  return {
    agreementTitle: workspace.title,
    freelancerName: workspace.freelancerName,
    currency: workspace.currency,
    milestone,
    payment,
    deliveryStatusLabel: getDeliveryStatusLabel(
      delivery.status as DeliveryStatusValue,
    ),
    paymentStatusLabel: payment
      ? getDeliveryPaymentStatusLabel(payment.status)
      : "غير متاحة",
  };
}

// AR: تحدد ما إذا كان العميل لا يزال يستطيع اتخاذ قرار مراجعة على التسليم.
// EN: This function checks whether the client can still review the delivery.
export function canClientReviewDelivery(status: string) {
  return isClientReviewStatus(status as DeliveryStatusValue);
}

// AR: تتحقق هذه الدالة من توفر خيار فتح مراجعة AI من نفس شاشة البوابة.
// EN: This function checks whether opening an AI review should be available from the portal screen.
export function canOpenPortalAiReview(status: string) {
  return isClientReviewStatus(status as DeliveryStatusValue);
}

// AR: تنسق هذه الدالة سطر الدفعة المرتبطة بالتسليم إذا كان متوفراً.
// EN: This function formats the payment summary line linked to the delivery if available.
export function buildPortalPaymentAmount(
  payment: PortalWorkspacePaymentDto | undefined,
) {
  if (!payment) {
    return "غير متاح";
  }

  return `${payment.amount} ${payment.currency}`;
}
