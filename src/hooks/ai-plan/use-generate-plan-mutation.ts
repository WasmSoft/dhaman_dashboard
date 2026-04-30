'use client';

import { useMutation } from '@tanstack/react-query';
import { generatePlanMutationOptions } from '@/lib/ai-plan/actions';

// AR: Hook لتوليد خطة دفع AI وإدارة حالة الطلب.
// EN: Hook for AI plan generation with full request state management.
export function useGeneratePlanMutation() {
  return useMutation(generatePlanMutationOptions());
}
