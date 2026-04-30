import { z } from "zod";

// AR: أنواع الإشعارات المدعومة للمعاينة والإرسال التجريبي.
// EN: Supported notification types for preview and test send.
const notificationTypeSchema = z.enum([
  "AGREEMENT_INVITE",
  "AGREEMENT_APPROVED",
  "AGREEMENT_CHANGE_REQUESTED",
  "DELIVERY_SUBMITTED",
  "DELIVERY_CHANGES_REQUESTED",
  "AI_REVIEW_READY",
  "CHANGE_REQUEST_CREATED",
  "CHANGE_REQUEST_APPROVED",
  "PAYMENT_RESERVED",
  "PAYMENT_READY_TO_RELEASE",
  "PAYMENT_RELEASED",
  "SYSTEM_TEST",
]);

// AR: اللغات المدعومة للقالب.
// EN: Supported template locales.
const localeSchema = z.enum(["ar", "en"]);

// AR: مخطط التحقق من صحة طلب معاينة البريد الإلكتروني.
// EN: Validation schema for email preview request.
export const previewEmailSchema = z.object({
  type: notificationTypeSchema,
  agreementId: z.string().uuid({ message: "معرّف الاتفاقية غير صالح" }),
  locale: localeSchema.optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

// AR: مخطط التحقق من صحة طلب إرسال إشعار تجريبي.
// EN: Validation schema for test notification send request.
export const sendTestNotificationSchema = z.object({
  type: notificationTypeSchema,
  recipientEmail: z.string().email({ message: "البريد الإلكتروني للمستلم غير صالح" }),
  agreementId: z.string().uuid({ message: "معرّف الاتفاقية غير صالح" }).optional(),
  locale: localeSchema.optional(),
});

// AR: الأنواع المستخرجة من مخططات البريد الإلكتروني.
// EN: Inferred types from email notification schemas.
export type PreviewEmailSchema = z.infer<typeof previewEmailSchema>;
export type SendTestNotificationSchema = z.infer<typeof sendTestNotificationSchema>;
