import { z } from "zod";

// AR: سكيما التحقق من شرط القبول داخل المرحلة.
// EN: Acceptance criterion validation schema.
const acceptanceCriterionSchema = z.object({
  description: z.string().min(1, "يجب إدخال وصف شرط القبول"),
  required: z.boolean().optional(),
});

// AR: سكيما إنشاء مرحلة — تُستخدم في نموذج إنشاء مرحلة جديدة.
// EN: Create milestone schema — used in the new milestone form.
export const createMilestoneSchema = z.object({
  title: z
    .string()
    .min(1, "يجب إدخال عنوان المرحلة")
    .max(160, "يجب ألا يتجاوز عنوان المرحلة 160 حرفاً"),
  description: z.string().optional(),
  amount: z
    .string()
    .regex(
      /^(?!0+(?:\.0{1,2})?$)\d+(?:\.\d{1,2})?$/,
      "يجب أن يكون المبلغ رقماً موجباً بحد أقصى منزلتين عشريتين",
    ),
  dueDate: z.string().optional(),
  orderIndex: z
    .number({ message: "يجب تحديد ترتيب المرحلة" })
    .int()
    .min(1, "يجب أن يكون ترتيب المرحلة 1 أو أكثر"),
  acceptanceCriteria: z
    .array(acceptanceCriterionSchema)
    .min(1, "يجب إضافة شرط قبول واحد على الأقل"),
  revisionLimit: z
    .number()
    .int()
    .min(1, "يجب أن يكون حد المراجعات 1 أو أكثر")
    .optional(),
});

export type CreateMilestoneFormValues = z.infer<typeof createMilestoneSchema>;

// AR: سكيما تحديث مرحلة — كل الحقول اختيارية لتحديث جزئي.
// EN: Update milestone schema — all fields optional for partial updates.
export const updateMilestoneSchema = z.object({
  title: z
    .string()
    .min(1, "يجب إدخال عنوان المرحلة")
    .max(160, "يجب ألا يتجاوز عنوان المرحلة 160 حرفاً")
    .optional(),
  description: z.string().optional(),
  amount: z
    .string()
    .regex(
      /^(?!0+(?:\.0{1,2})?$)\d+(?:\.\d{1,2})?$/,
      "يجب أن يكون المبلغ رقماً موجباً بحد أقصى منزلتين عشريتين",
    )
    .optional(),
  dueDate: z.string().optional(),
  acceptanceCriteria: z
    .array(acceptanceCriterionSchema)
    .min(1, "يجب إضافة شرط قبول واحد على الأقل")
    .optional(),
  revisionLimit: z
    .number()
    .int()
    .min(1, "يجب أن يكون حد المراجعات 1 أو أكثر")
    .optional(),
});

export type UpdateMilestoneFormValues = z.infer<typeof updateMilestoneSchema>;
