import { z } from "zod";

// AR: أنواع الإشعارات المدعومة للتصفية في السجلات.
// EN: Supported notification types for log filtering.
const emailNotificationTypeSchema = z.enum([
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

// AR: حالات الإشعار المدعومة للتصفية.
// EN: Supported notification statuses for filtering.
const emailNotificationStatusSchema = z.enum(["PENDING", "SENT", "FAILED"]);

// AR: مخطط التحقق من صحة فلاتر سجلات البريد الإلكتروني.
// EN: Validation schema for email notification log filters.
export const emailLogFilterSchema = z.object({
  type: emailNotificationTypeSchema.optional(),
  status: emailNotificationStatusSchema.optional(),
  agreementId: z.string().uuid().optional(),
  recipientEmail: z.string().email().optional(),
  from: z
    .string()
    .datetime({ message: "تاريخ البدء غير صالح" })
    .optional(),
  to: z
    .string()
    .datetime({ message: "تاريخ النهاية غير صالح" })
    .optional(),
  page: z.coerce.number().int().min(1).optional().default(1),
  limit: z.coerce.number().int().min(1).max(100).optional().default(20),
});

// AR: نوع فلاتر سجلات البريد المستخرج من المخطط.
// EN: Inferred type for email log filters from the schema.
export type EmailLogFilterSchema = z.infer<typeof emailLogFilterSchema>;
