import { z } from "zod";

// AR: مخطط Zod للتحقق من صحة بيانات إنشاء طلب تغيير قبل إرسالها.
// EN: Zod schema to validate create change request form data before submission.
export const createChangeRequestSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(160, "Title must be at most 160 characters"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(3000, "Description must be at most 3000 characters"),
  amount: z.string().refine(
    (val) => {
      const parsed = Number(val);
      return !Number.isNaN(parsed) && parsed > 0;
    },
    { message: "Amount must be a positive number" },
  ),
  currency: z.string().min(1, "Currency is required"),
  acceptanceCriteria: z
    .array(z.string().min(1, "Each criterion must be non-empty"))
    .min(1, "At least one acceptance criterion is required"),
  milestoneId: z.string().uuid("Invalid milestone ID").optional(),
  aiReviewId: z.string().uuid("Invalid AI review ID").optional(),
  timelineDays: z.number().int().positive("Timeline must be a positive number").optional(),
});

export type CreateChangeRequestFormValues = z.infer<
  typeof createChangeRequestSchema
>;
