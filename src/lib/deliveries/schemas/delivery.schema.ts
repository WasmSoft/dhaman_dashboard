import { z } from "zod/v4";

// AR: مخطط إنشاء تسليم — يتحقق من الملخص والأدلة وبيانات الملف.
// EN: Create delivery schema — validates summary, evidence, and file metadata.
export const createDeliverySchema = z
  .object({
    summary: z
      .string()
      .min(10, "يجب أن يكون الملخص 10 أحرف على الأقل.")
      .max(2000, "الملخص لا يمكن أن يتجاوز 2000 حرف."),
    deliveryUrl: z
      .string()
      .url("يجب أن يكون رابط التسليم URL صحيح.")
      .optional()
      .or(z.literal("")),
    fileUrl: z
      .string()
      .url("يجب أن يكون رابط الملف URL صحيح.")
      .optional()
      .or(z.literal("")),
    fileName: z.string().max(255).optional(),
    fileType: z.string().max(100).optional(),
    notes: z.string().max(5000).optional(),
  })
  .refine(
    (data) => data.deliveryUrl || data.fileUrl,
    { message: "يجب إرفاق رابط تسليم أو رابط ملف كدليل.", path: ["deliveryUrl"] },
  );

export type CreateDeliveryFormValues = z.infer<typeof createDeliverySchema>;

// AR: مخطط تعديل تسليم — كل الحقول اختيارية لكن الملخص له حدود عند الإرسال.
// EN: Update delivery schema — all fields optional but summary has bounds when provided.
export const updateDeliverySchema = z.object({
  summary: z
    .string()
    .min(10, "يجب أن يكون الملخص 10 أحرف على الأقل.")
    .max(2000, "الملخص لا يمكن أن يتجاوز 2000 حرف.")
    .optional(),
  deliveryUrl: z
    .string()
    .url("يجب أن يكون رابط التسليم URL صحيح.")
    .optional()
    .or(z.literal("")),
  fileUrl: z
    .string()
    .url("يجب أن يكون رابط الملف URL صحيح.")
    .optional()
    .or(z.literal("")),
  fileName: z.string().max(255).optional(),
  fileType: z.string().max(100).optional(),
  notes: z.string().max(5000).optional(),
});

export type UpdateDeliveryFormValues = z.infer<typeof updateDeliverySchema>;

// AR: مخطط إرسال التسليم — ملاحظة اختيارية للعميل.
// EN: Submit delivery schema — optional note to client.
export const submitDeliverySchema = z.object({
  noteToClient: z.string().max(2000).optional(),
});

export type SubmitDeliveryFormValues = z.infer<typeof submitDeliverySchema>;

// AR: مخطط فلترة التسليمات — يتحقق من قيم الفلتر والصفحات.
// EN: Delivery filter schema — validates filter values and pagination.
export const deliveryFilterSchema = z.object({
  agreementId: z.string().optional(),
  milestoneId: z.string().optional(),
  status: z
    .enum([
      "DRAFT",
      "SUBMITTED",
      "CLIENT_REVIEW",
      "CHANGES_REQUESTED",
      "ACCEPTED",
      "DISPUTED",
    ])
    .optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
});

export type DeliveryFilterFormValues = z.infer<typeof deliveryFilterSchema>;