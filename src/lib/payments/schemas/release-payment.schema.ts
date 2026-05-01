import { z } from "zod";

// AR: مخطط إصدار دفعة.
// EN: Release payment schema.
export const releasePaymentSchema = z.object({
  paymentId: z.string().min(1, "Payment ID is required"),
  notes: z.string().optional(),
});

export type ReleasePaymentFormValues = z.infer<typeof releasePaymentSchema>;
