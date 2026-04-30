import type { TimelineActorRole, TimelineEventType } from "@/types";

// AR: تسميات أدوار الجهات الفاعلة في السجل الزمني.
// EN: Labels for timeline actor roles.
export const TIMELINE_ACTOR_LABELS: Record<TimelineActorRole, string> = {
  FREELANCER: "مستقل",
  CLIENT: "عميل",
  SYSTEM: "نظام",
  AI: "ذكاء اصطناعي",
};

// AR: تسميات أنواع أحداث السجل الزمني.
// EN: Labels for timeline event types.
export const TIMELINE_EVENT_TYPE_LABELS: Record<TimelineEventType, string> = {
  AGREEMENT_CREATED: "تم إنشاء الاتفاقية",
  AGREEMENT_SENT: "تم إرسال الاتفاقية",
  AGREEMENT_APPROVED: "تم اعتماد الاتفاقية",
  AGREEMENT_CHANGES_REQUESTED: "تم طلب تعديلات على الاتفاقية",
  MILESTONE_CREATED: "تم إنشاء المرحلة",
  PAYMENT_RESERVED: "تم حجز الدفعة",
  PAYMENT_CLIENT_REVIEW: "الدفعة قيد المراجعة",
  PAYMENT_READY_TO_RELEASE: "الدفعة جاهزة للإفراج",
  PAYMENT_RELEASED: "تم الإفراج عن الدفعة",
  DELIVERY_SUBMITTED: "تم تسليم العمل",
  DELIVERY_ACCEPTED: "تم قبول التسليم",
  DELIVERY_CHANGES_REQUESTED: "تم طلب تعديلات على التسليم",
  AI_REVIEW_REQUESTED: "تم طلب مراجعة الذكاء الاصطناعي",
  AI_REVIEW_COMPLETED: "اكتملت مراجعة الذكاء الاصطناعي",
  CHANGE_REQUEST_CREATED: "تم إنشاء طلب تعديل",
  CHANGE_REQUEST_APPROVED: "تم اعتماد طلب التعديل",
  CHANGE_REQUEST_DECLINED: "تم رفض طلب التعديل",
  CHANGE_REQUEST_FUNDED: "تم تمويل طلب التعديل",
  EMAIL_SENT: "تم إرسال بريد إلكتروني",
};

// AR: تسمية احتياطية لأي نوع حدث غير معروف.
// EN: Fallback label for any unknown event type.
export const TIMELINE_FALLBACK_LABEL = "حدث";

// AR: تسمية احتياطية لدور جهة فاعلة غير معروف.
// EN: Fallback label for unknown actor role.
export const TIMELINE_FALLBACK_ACTOR_LABEL = "غير معروف";

// AR: تسمية احتياطية للتاريخ غير الصالح.
// EN: Fallback label for invalid dates.
export const TIMELINE_INVALID_DATE_LABEL = "—";

// AR: مفاتيح البيانات الوصفية الآمنة لعرضها في بوابة العميل.
// EN: Metadata keys safe for client portal display.
export const PORTAL_SAFE_METADATA_KEYS = new Set<string>([
  "paymentAmount",
  "paymentCurrency",
  "milestoneTitle",
  "milestoneOrder",
  "deliveryId",
  "fromStatus",
  "toStatus",
  "changeRequestTitle",
  "decisionNote",
  "reviewConclusion",
]);

// AR: مفاتيح البيانات الوصفية المحظورة من العرض في بوابة العميل.
// EN: Metadata keys forbidden from client portal display.
export const PORTAL_FORBIDDEN_METADATA_KEYS = new Set<string>([
  "rawToken",
  "token",
  "secret",
  "apiKey",
  "providerKey",
  "rawPrompt",
  "systemPrompt",
  "openaiPrompt",
  "aiPrompt",
  "providerInternals",
  "hashedPassword",
  "password",
  "accessToken",
  "refreshToken",
]);
