import type { PaymentStatus, PaymentOperationType } from "@/types";

// AR: تسميات حالات الدفع بالعربية والإنجليزية.
// EN: Payment status labels in Arabic and English.
export const paymentStatusLabels: Record<PaymentStatus, { en: string; ar: string }> = {
  WAITING: { en: "Waiting", ar: "في الانتظار" },
  RESERVED: { en: "Reserved", ar: "محجوزة" },
  CLIENT_REVIEW: { en: "Client Review", ar: "مراجعة العميل" },
  AI_REVIEW: { en: "AI Review", ar: "مراجعة الذكاء الاصطناعي" },
  READY_TO_RELEASE: { en: "Ready to Release", ar: "جاهزة للإصدار" },
  RELEASED: { en: "Released", ar: "تم الإصدار" },
  ON_HOLD: { en: "On Hold", ar: "معلقة" },
  FAILED: { en: "Failed", ar: "فشلت" },
  REFUNDED: { en: "Refunded", ar: "مسترجعة" },
  NOT_REQUIRED: { en: "Not Required", ar: "غير مطلوبة" },
};

// AR: تسميات أنواع عمليات الدفع.
// EN: Payment operation type labels.
export const paymentOperationTypeLabels: Record<PaymentOperationType, { en: string; ar: string }> = {
  FUND_MILESTONE: { en: "Fund Milestone", ar: "تمويل مرحلة" },
  RELEASE_MILESTONE: { en: "Release Milestone", ar: "إصدار مرحلة" },
  CHANGE_REQUEST_PAYMENT: { en: "Change Request Payment", ar: "دفعة تغيير" },
  REFUND: { en: "Refund", ar: "استرداد" },
};

// AR: نغمات الشارات حسب حالة الدفع.
// EN: Badge tone mapping per payment status.
export const paymentStatusTone: Record<PaymentStatus, "reserved" | "review" | "released" | "held" | "default"> = {
  WAITING: "default",
  RESERVED: "reserved",
  CLIENT_REVIEW: "review",
  AI_REVIEW: "held",
  READY_TO_RELEASE: "review",
  RELEASED: "released",
  ON_HOLD: "held",
  FAILED: "default",
  REFUNDED: "default",
  NOT_REQUIRED: "default",
};

// AR: ألوان النغمات المستخدمة في الواجهة.
// EN: Tone color classes used in the UI.
export const paymentToneClasses: Record<string, { badge: string; value: string }> = {
  reserved: { badge: "bg-[#6f52ff]/20 text-[#a898ff]", value: "text-[#a898ff]" },
  review: { badge: "bg-amber-500/20 text-amber-300", value: "text-amber-300" },
  released: { badge: "bg-emerald-500/20 text-emerald-300", value: "text-emerald-300" },
  held: { badge: "bg-red-500/20 text-red-300", value: "text-red-300" },
  default: { badge: "bg-white/[0.08] text-[#8b92b3]", value: "text-[#8b92b3]" },
};

// AR: نص تنبيه الدفع التجريبي.
// EN: Demo-only payment notice copy.
export const demoPaymentNotice = {
  en: "Demo Protected Payment — no real money movement occurs",
  ar: "دفعة تجريبية محمية — لا يحدث تحويل مالي حقيقي",
};

// AR: رؤوس جدول الدفعات.
// EN: Payment table column headers.
export const paymentTableHeaders = {
  en: ["Payment", "Amount", "Status", "Operation", "Receipt"],
  ar: ["الدفعة", "المبلغ", "الحالة", "العملية", "الإيصال"],
};

// AR: تسميات ملخص الدفعات.
// EN: Payment summary labels.
export const paymentSummaryLabels = {
  totalFunded: { en: "Total Reserved", ar: "إجمالي المحجوز" },
  totalReleased: { en: "Total Released", ar: "إجمالي المصروف" },
  totalPending: { en: "Total Pending", ar: "إجمالي المعلق" },
};

// AR: قائمة الحالات التي يكون فيها الدفع مموّلاً.
// EN: Status list for which a receipt is available.
export const fundedPaymentStatuses: PaymentStatus[] = [
  "RESERVED",
  "CLIENT_REVIEW",
  "AI_REVIEW",
  "READY_TO_RELEASE",
  "RELEASED",
  "ON_HOLD",
];

// AR: نصوص الأخطاء الخاصة بالبوابة.
// EN: Portal error copy.
export const portalPaymentErrorCopy = {
  invalidToken: {
    en: "This access link is invalid or has expired.",
    ar: "رابط الوصول هذا غير صالح أو منتهي الصلاحية.",
  },
  alreadyFunded: {
    en: "This payment has already been funded.",
    ar: "تم تمويل هذه الدفعة بالفعل.",
  },
  notReadyToRelease: {
    en: "This payment is not ready to be released.",
    ar: "هذه الدفعة غير جاهزة للإصدار.",
  },
  genericError: {
    en: "Something went wrong. Please try again.",
    ar: "حدث خطأ ما. يرجى المحاولة مرة أخرى.",
  },
};

// AR: تسمية "دفعة تجريبية".
// EN: "Demo Payment" label.
export const DEMO_PAYMENT_LABEL = "Demo Protected Payment";
export const DEMO_PAYMENT_LABEL_AR = "دفعة تجريبية محمية";
