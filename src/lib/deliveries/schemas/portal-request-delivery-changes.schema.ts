import { z } from "zod";

// AR: مخطط طلب تعديلات التسليم من بوابة العميل.
// EN: Delivery change-request schema for the client portal review flow.
export const portalRequestDeliveryChangesSchema = z.object({
  reason: z
    .string()
    .trim()
    .min(10, "سبب طلب التعديلات يجب أن يكون 10 أحرف على الأقل")
    .max(2000, "سبب طلب التعديلات طويل جداً"),
  requestedChanges: z
    .array(z.string().trim().max(500, "أحد عناصر التعديلات طويل جداً"))
    .max(20, "عدد عناصر التعديلات كبير جداً")
    .optional(),
});

export type PortalRequestDeliveryChangesSchemaValues = z.infer<
  typeof portalRequestDeliveryChangesSchema
>;
