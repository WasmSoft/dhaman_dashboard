import { z } from "zod";

const optionalPolicyTextSchema = z
  .string()
  .max(3000)
  .nullable()
  .optional()
  .refine(
    (value) => value === null || value === undefined || value.trim().length > 0,
    {
      message: "Policy text cannot be empty",
    },
  );

export const policyMutationSchema = z.object({
  defaultDelayPolicy: optionalPolicyTextSchema,
  defaultCancellationPolicy: optionalPolicyTextSchema,
  defaultExtraRequestPolicy: optionalPolicyTextSchema,
  defaultReviewPolicy: optionalPolicyTextSchema,
});
