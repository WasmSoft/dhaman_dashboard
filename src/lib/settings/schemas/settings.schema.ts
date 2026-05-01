import { z } from "zod";

const AI_STRICTNESS_VALUES = ["lenient", "balanced", "strict"] as const;

export const settingsSchema = z.object({
  defaultCurrency: z
    .string()
    .min(1)
    .max(10)
    .regex(/^[A-Z]+$/, "Currency must be uppercase")
    .optional(),
  defaultServiceType: z.string().max(120).optional(),
  aiStrictness: z.enum(AI_STRICTNESS_VALUES).optional(),
  emailNotificationsEnabled: z.boolean().optional(),
});

export type SettingsSchemaValues = z.infer<typeof settingsSchema>;
