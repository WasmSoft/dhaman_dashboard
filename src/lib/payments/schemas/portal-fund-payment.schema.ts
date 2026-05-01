import { z } from "zod";

// AR: مخطط تمويل دفعة من البوابة — يحافظ على المبلغ كنص.
// EN: Portal fund payment schema — keeps amount as a string.
export const portalFundPaymentSchema = z.object({
  amount: z.string().min(1, "Amount is required"),
  paymentMethodLabel: z.string().optional(),
});

export type PortalFundPaymentFormValues = z.infer<
  typeof portalFundPaymentSchema
>;
