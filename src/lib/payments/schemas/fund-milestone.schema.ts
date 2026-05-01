import { z } from "zod";

// AR: مخطط تمويل مرحلة — يحافظ على المبلغ كنص للحفاظ على الدقة.
// EN: Fund milestone schema — keeps amount as a string to preserve precision.
export const fundMilestoneSchema = z.object({
  milestoneId: z.string().min(1, "Milestone ID is required"),
  amount: z.string().min(1, "Amount is required"),
  paymentMethodLabel: z.string().optional(),
});

export type FundMilestoneFormValues = z.infer<typeof fundMilestoneSchema>;
