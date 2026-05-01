import { z } from "zod";

// AR: مخطط تأكيد إصدار دفعة من البوابة.
// EN: Portal release confirmation schema.
export const portalReleaseConfirmationSchema = z.object({
  confirmed: z.boolean().refine((val) => val === true, {
    message: "You must confirm the release",
  }),
  notes: z.string().optional(),
});

export type PortalReleaseConfirmationFormValues = z.infer<
  typeof portalReleaseConfirmationSchema
>;
