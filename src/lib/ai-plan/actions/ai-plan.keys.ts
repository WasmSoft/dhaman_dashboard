// AR: مفاتيح TanStack Query الخاصة بخطة الدفع.
// EN: TanStack Query keys for AI payment plan.
export const aiPlanQueryKeys = {
  all: ['ai-plan'] as const,
  generated: () => [...aiPlanQueryKeys.all, 'generated'] as const,
};
