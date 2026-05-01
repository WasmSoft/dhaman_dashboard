import type {
  DeliveryErrorCode,
  DeliveryPaymentTone,
  DeliveryRecordStatus,
  DeliveryStatus,
  DeliveryStatusTone,
  DeliveryStatusValue,
  PaymentStatus,
} from "@/types";

// AR: خريطة ألوان حالات التسليم — توفر label عربي و tone لكل حالة.
// EN: Delivery status display map providing Arabic labels and color tones per status.
const statusDisplayMap: Record<DeliveryStatusValue, { label: string; tone: string }> = {
  DRAFT: { label: "مسودة", tone: "bg-amber-500/20 text-amber-300" },
  NOT_SUBMITTED: { label: "بانتظار التسليم", tone: "bg-amber-500/20 text-amber-300" },
  SUBMITTED: { label: "تم الإرسال", tone: "bg-[#6f52ff]/20 text-[#a898ff]" },
  CLIENT_REVIEW: {
    label: "تحت مراجعة العميل",
    tone: "bg-[#6f52ff]/20 text-[#cfc6ff]",
  },
  IN_REVIEW: {
    label: "تحت المراجعة",
    tone: "bg-[#6f52ff]/20 text-[#cfc6ff]",
  },
  CHANGES_REQUESTED: {
    label: "طلب تعديل",
    tone: "bg-amber-500/20 text-amber-300",
  },
  ACCEPTED: { label: "مقبولة", tone: "bg-emerald-500/15 text-emerald-300" },
  DISPUTED: { label: "نزاع", tone: "bg-red-500/20 text-red-300" },
};

const fallbackDisplay = { label: "غير معروف", tone: "bg-gray-500/20 text-gray-400" };

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

// AR: تعيد الاسم العربي للحالة أو نص افتراضي للحالات غير المعروفة.
// EN: Returns the Arabic label for a status or a fallback for unknown values.
export function getDeliveryStatusLabel(
  status: DeliveryStatusValue | string,
): string {
  return (
    statusDisplayMap[status as DeliveryStatusValue]?.label ?? fallbackDisplay.label
  );
}

// AR: تعيد صنف Tailwind للون المناسب لحالة التسليم.
// EN: Returns the Tailwind tone class for the delivery status badge.
export function getDeliveryStatusTone(
  status: DeliveryStatusValue | string,
): string {
  return (
    statusDisplayMap[status as DeliveryStatusValue]?.tone ?? fallbackDisplay.tone
  );
}

// AR: تنسق هذه الدالة حالة الدفعة المرتبطة بالتسليم.
// EN: This function formats the payment status linked to the delivery.
export function getDeliveryPaymentStatusLabel(status: PaymentStatus) {
  return paymentStatusLabels[status] ?? status;
}

// AR: تحدد لون شارة حالة التسليم في الجداول والبطاقات.
// EN: This function maps a delivery status to the badge tone used in tables and cards.
export function getDeliveryStatusToneValue(status: DeliveryStatusValue): DeliveryStatusTone {
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

// AR: هل يمكن تعديل التسليم في هذه الحالة؟
// EN: Can the delivery be edited in this status?
export function isDeliveryEditable(status: DeliveryStatus | string): boolean {
  return status === "DRAFT" || status === "CHANGES_REQUESTED";
}

// AR: هل يمكن إرسال التسليم للعميل في هذه الحالة؟
// EN: Can the delivery be submitted for client review in this status?
export function isDeliverySubmittable(status: DeliveryStatus | string): boolean {
  return status === "DRAFT" || status === "CHANGES_REQUESTED";
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

// AR: هل يحتاج التسليم دليل إرفاق قبل الإرسال؟
// EN: Does the delivery require evidence (URL or file) before submission?
export function isEvidenceRequired(delivery: {
  deliveryUrl?: string | null;
  fileUrl?: string | null;
}): boolean {
  return !delivery.deliveryUrl && !delivery.fileUrl;
}

// AR: خريطة رسائل خطأ API إلى نص عربي للعرض في الواجهة.
// EN: Map delivery API error codes to Arabic inline messages.
const errorCodeMessages: Record<DeliveryErrorCode, string> = {
  DELIVERY_NOT_FOUND: "لم يتم العثور على التسليم.",
  DELIVERY_ALREADY_EXISTS: "يوجد تسليم مسودة لهذه المرحلة بالفعل.",
  DELIVERY_NOT_EDITABLE: "لا يمكن تعديل التسليم في حالته الحالية.",
  DELIVERY_NOT_SUBMITTABLE: "لا يمكن إرسال التسليم في حالته الحالية.",
  DELIVERY_EVIDENCE_REQUIRED: "يجب إرفاق رابط أو ملف كدليل قبل الإرسال.",
  MILESTONE_NOT_FOUND: "لم يتم العثور على المرحلة.",
  AGREEMENT_NOT_ACTIVE: "لا يمكن إنشاء تسليم لاتفاقية غير فعالة.",
  PAYMENT_NOT_RESERVED: "يجب حجز الدفعة قبل إرسال التسليم.",
  VALIDATION_ERROR: "بيانات الطلب غير صالحة.",
  UNAUTHORIZED: "يجب تسجيل الدخول أولاً.",
  FORBIDDEN: "ليس لديك صلاحية الوصول إلى هذا التسليم.",
};

// AR: تعيد رسالة الخطأ العربي لكود خطأ API أو رسالة افتراضية.
// EN: Returns the Arabic error message for a delivery API error code, or a fallback.
export function getDeliveryErrorMessage(
  code: DeliveryErrorCode | string,
): string {
  return (
    errorCodeMessages[code as DeliveryErrorCode] ??
    "حدث خطأ غير متوقع. حاول مرة أخرى."
  );
}
