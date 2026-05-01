import type { DeliveryStatus, DeliveryErrorCode } from "@/types";

// AR: خريطة ألوان حالات التسليم — توفر label عربي و tone لكل حالة.
// EN: Delivery status display map providing Arabic labels and color tones per status.
const statusDisplayMap: Record<
  DeliveryStatus,
  { label: string; tone: string }
> = {
  DRAFT: { label: "مسودة", tone: "bg-amber-500/20 text-amber-300" },
  SUBMITTED: { label: "تم الإرسال", tone: "bg-[#6f52ff]/20 text-[#a898ff]" },
  CLIENT_REVIEW: {
    label: "تحت مراجعة العميل",
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

// AR: تعيد الاسم العربي للحالة أو نص افتراضي للحالات غير المعروفة.
// EN: Returns the Arabic label for a status or a fallback for unknown values.
export function getDeliveryStatusLabel(
  status: DeliveryStatus | string,
): string {
  return (
    statusDisplayMap[status as DeliveryStatus]?.label ?? fallbackDisplay.label
  );
}

// AR: تعيد صنف Tailwind للون المناسب لحالة التسليم.
// EN: Returns the Tailwind tone class for the delivery status badge.
export function getDeliveryStatusTone(
  status: DeliveryStatus | string,
): string {
  return (
    statusDisplayMap[status as DeliveryStatus]?.tone ?? fallbackDisplay.tone
  );
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