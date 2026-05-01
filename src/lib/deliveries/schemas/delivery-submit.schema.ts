import { z } from "zod";

// AR: مخطط التحقق من إرسال التسليم — يضيف تأكيد المستخدم قبل تحويل الحالة إلى مراجعة العميل.
// EN: Delivery submit validation schema — adds explicit confirmation before moving to client review.
export const deliverySubmitSchema = z.object({
  noteToClient: z.string().trim().max(2000, "رسالة العميل طويلة جداً").optional().or(z.literal("")),
  confirmationAccepted: z.literal(true, "يجب تأكيد جاهزية التسليم قبل الإرسال"),
});

export type DeliverySubmitSchemaValues = z.infer<typeof deliverySubmitSchema>;
