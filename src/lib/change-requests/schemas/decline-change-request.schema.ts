import { z } from "zod";

// AR: مخطط Zod للتحقق من صحة سبب رفض العميل لطلب التغيير.
// EN: Zod schema to validate the client's decline reason for a change request.
export const declineChangeRequestSchema = z.object({
  reason: z
    .string()
    .min(10, "Reason must be at least 10 characters")
    .max(2000, "Reason must be at most 2000 characters"),
});

export type DeclineChangeRequestFormValues = z.infer<
  typeof declineChangeRequestSchema
>;
