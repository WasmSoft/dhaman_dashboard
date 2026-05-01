import { z } from "zod";

// AR: مخطط التحقق من مسودة التسليم — يطابق قواعد الخادم ويعطي رسائل فورية للمستخدم.
// EN: Delivery draft validation schema — mirrors backend rules and gives immediate UI feedback.
export const deliveryDraftSchema = z.object({
  deliveryUrl: z.string().trim().url("أدخل رابطاً صالحاً").optional().or(z.literal("")),
  fileUrl: z.string().trim().url("أدخل رابط ملف صالحاً").optional().or(z.literal("")),
  fileName: z.string().trim().max(255, "اسم الملف طويل جداً").optional().or(z.literal("")),
  fileType: z.string().trim().max(255, "نوع الملف طويل جداً").optional().or(z.literal("")),
  summary: z
    .string()
    .trim()
    .min(10, "ملخص التسليم يجب أن يكون 10 أحرف على الأقل")
    .max(2000, "ملخص التسليم طويل جداً"),
  notes: z.string().trim().max(2000, "الملاحظات طويلة جداً").optional().or(z.literal("")),
});

export type DeliveryDraftSchemaValues = z.infer<typeof deliveryDraftSchema>;
