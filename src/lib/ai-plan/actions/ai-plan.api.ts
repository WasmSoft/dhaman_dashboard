// AR: ترسل طلب توليد خطة الدفع إلى الـ API وتعيد الخطة المهيكلة.
// EN: Sends the plan generation request and returns the structured plan.
import { axiosInstance } from '@/lib/axios-instance';
import { API_PATHS } from '@/lib/api-paths';
import type { GenerateAiPlanRequest, GeneratedPlan } from '@/types';

export async function generatePlan(payload: GenerateAiPlanRequest): Promise<GeneratedPlan> {
  const response = await axiosInstance.post<GeneratedPlan>(
    API_PATHS.AI_PLAN.GENERATE,
    payload,
  );
  return response.data;
}
