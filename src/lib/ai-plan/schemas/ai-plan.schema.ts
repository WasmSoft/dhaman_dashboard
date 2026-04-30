import { z } from 'zod';

// AR: مخطط التحقق من صحة نموذج توليد خطة الدفع.
// EN: Validation schema for the payment plan generation form.
export const planGenerationSchema = z.object({
  projectDescription: z
    .string()
    .min(20, { message: 'الوصف يجب أن يكون 20 حرفاً على الأقل' })
    .max(5000, { message: 'الوصف يجب ألا يتجاوز 5000 حرف' }),
  totalBudget: z.number().positive().optional(),
  language: z.enum(['ar', 'en']).default('ar'),
  currency: z.string().optional(),
});

export type PlanGenerationSchemaValues = z.infer<typeof planGenerationSchema>;
