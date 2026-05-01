import { z } from "zod";

const optionalPolicyTextSchema = z
  .string()
  .max(5000)
  .nullable()
  .optional()
  .refine(
    (value) => value === null || value === undefined || value.trim().length > 0,
    {
      message: "Policy text cannot be empty",
    },
  );

export const policyMutationSchema = z.object({
  delayPolicy: optionalPolicyTextSchema,
  cancellationPolicy: optionalPolicyTextSchema,
  extraRequestPolicy: optionalPolicyTextSchema,
  reviewPolicy: optionalPolicyTextSchema,
  clientReviewPeriodDays: z.number().int().min(1).max(90).optional(),
  freelancerDelayGraceDays: z.number().int().min(0).max(30).optional(),
});
