// AR: خيارات mutation لتوليد خطة الدفع.
// EN: Mutation options for AI payment plan generation.
import { generatePlan } from './ai-plan.api';
import type { GenerateAiPlanRequest } from '@/types';

export function generatePlanMutationOptions() {
  return {
    mutationFn: (payload: GenerateAiPlanRequest) => generatePlan(payload),
  };
}
