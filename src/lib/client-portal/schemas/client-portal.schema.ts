import { z } from "zod";

// AR: هذه schema توحّد تحقق حقول سبب التعديل في صفحات الدعوة والتسليم داخل البوابة.
// EN: This schema centralizes change-request reason validation for invite and delivery portal flows.
export const portalRequestChangesSchema = z.object({
  reason: z.string().trim().min(10).max(2000),
  requestedChanges: z.array(z.string().trim().max(500)).optional().nullable(),
});

// AR: هذه schema تتحقق من سبب رفض الاتفاق قبل إرساله إلى واجهة الـ API.
// EN: This schema validates the agreement rejection reason before sending it to the API layer.
export const portalRejectSchema = z.object({
  reason: z.string().trim().min(10).max(2000),
});
