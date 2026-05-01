import type {
  DeliveryPaymentTone,
  DeliveryRecordStatus,
  DeliveryStatusTone,
  DeliveryStatusValue,
  PaymentStatus,
} from "@/types";

const deliveryStatusLabels: Record<DeliveryStatusValue, string> = {
  DRAFT: "مسودة",
  NOT_SUBMITTED: "بانتظار التسليم",
  SUBMITTED: "تم الإرسال",
  CLIENT_REVIEW: "مراجعة العميل",
  IN_REVIEW: "تحت المراجعة",
  ACCEPTED: "مقبولة",
  CHANGES_REQUESTED: "طُلبت تعديلات",
  DISPUTED: "اعتراض",
};

const paymentStatusLabels: Record<PaymentStatus, string> = {
  WAITING: "بانتظار التمويل",
  RESERVED: "محجوزة",
  CLIENT_REVIEW: "مراجعة العميل",
  AI_REVIEW: "مراجعة AI",
  READY_TO_RELEASE: "جاهزة للصرف",
  RELEASED: "تم الصرف",
  ON_HOLD: "معلقة",
  FAILED: "فشلت",
  REFUNDED: "مستردة",
  NOT_REQUIRED: "غير مطلوبة",
};

// AR: تنسق هذه الدالة حالة التسليم لعرضها كنص عربي ثابت في الواجهة.
// EN: This function formats the delivery status into a stable Arabic label for the UI.
export function getDeliveryStatusLabel(status: DeliveryStatusValue) {
  return deliveryStatusLabels[status] ?? status;
}

// AR: تنسق هذه الدالة حالة الدفعة المرتبطة بالتسليم.
// EN: This function formats the payment status linked to the delivery.
export function getDeliveryPaymentStatusLabel(status: PaymentStatus) {
  return paymentStatusLabels[status] ?? status;
}

// AR: تحدد لون شارة حالة التسليم في الجداول والبطاقات.
// EN: This function maps a delivery status to the badge tone used in tables and cards.
export function getDeliveryStatusTone(status: DeliveryStatusValue): DeliveryStatusTone {
  if (status === "ACCEPTED") {
    return "accepted";
  }

  if (status === "CHANGES_REQUESTED") {
    return "change";
  }

  if (status === "DRAFT" || status === "NOT_SUBMITTED") {
    return "draft";
  }

  if (status === "DISPUTED") {
    return "disputed";
  }

  return "review";
}

// AR: تحدد لون شارة حالة الدفعة المرتبطة بالتسليم.
// EN: This function maps the linked payment status to the delivery payment tone.
export function getDeliveryPaymentTone(status: PaymentStatus): DeliveryPaymentTone {
  if (status === "RESERVED") {
    return "reserved";
  }

  if (status === "CLIENT_REVIEW") {
    return "client";
  }

  if (status === "READY_TO_RELEASE") {
    return "ready";
  }

  if (status === "RELEASED") {
    return "released";
  }

  if (status === "AI_REVIEW") {
    return "ai";
  }

  return "hold";
}

// AR: تحدد ما إذا كان التسليم قابلاً للتعديل من جهة المستقل.
// EN: This function checks whether a delivery is editable by the freelancer.
export function isEditableDeliveryStatus(status: DeliveryRecordStatus) {
  return status === "DRAFT" || status === "CHANGES_REQUESTED";
}

// AR: تحدد ما إذا كان التسليم لا يزال في مرحلة مراجعة العميل.
// EN: This function checks whether the delivery is still in a client review stage.
export function isClientReviewStatus(status: DeliveryStatusValue) {
  return status === "SUBMITTED" || status === "CLIENT_REVIEW" || status === "IN_REVIEW";
}
