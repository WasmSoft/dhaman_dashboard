// AR: ترسل طلب توليد خطة الدفع إلى الـ API وتعيد الخطة المهيكلة.
// EN: Sends the plan generation request and returns the structured plan.
import { axiosInstance } from '@/lib/axios-instance';
import { API_PATHS } from '@/lib/api-paths';
import type {
  GenerateAgreementDraftRequest,
  GenerateAiPlanRequest,
  GeneratedAgreementDraft,
  GeneratedPlan,
} from '@/types';

type ApiEnvelope<T> = {
  success: boolean;
  data: T;
};

type ApiGeneratedPoliciesResponse = {
  delayPolicy: string;
  cancellationPolicy: string;
  extraRequestPolicy: string;
  reviewPolicy: string;
};

type ApiGeneratedPlanResponse = {
  id: string;
  milestones: GeneratedPlan['milestones'];
  policies: ApiGeneratedPoliciesResponse;
  ambiguityWarnings: string[];
  clarityScore: number;
};

type ApiGeneratedAgreementDraftResponse = ApiGeneratedPlanResponse & {
  title: string;
  description: string;
  serviceType: string | null;
  durationText: string | null;
  expectedDeliveryDate: string | null;
  currency: string;
};

function mapGeneratedPolicies(policies: ApiGeneratedPoliciesResponse) {
  return {
    delay: policies.delayPolicy,
    cancellation: policies.cancellationPolicy,
    extraRequest: policies.extraRequestPolicy,
    review: policies.reviewPolicy,
  };
}

function mapGeneratedPlan(response: ApiGeneratedPlanResponse): GeneratedPlan {
  return {
    id: response.id,
    milestones: response.milestones,
    policies: mapGeneratedPolicies(response.policies),
    ambiguityWarnings: response.ambiguityWarnings,
    clarityScore: response.clarityScore,
  };
}

export async function generatePlan(payload: GenerateAiPlanRequest): Promise<GeneratedPlan> {
  const response = await axiosInstance.post<ApiEnvelope<ApiGeneratedPlanResponse>>(
    API_PATHS.AI_PLAN.GENERATE,
    payload,
  );

  return mapGeneratedPlan(response.data.data);
}

export async function generateAgreementDraft(
  payload: GenerateAgreementDraftRequest,
): Promise<GeneratedAgreementDraft> {
  const response = await axiosInstance.post<
    ApiEnvelope<ApiGeneratedAgreementDraftResponse>
  >(
    API_PATHS.AI_PLAN.GENERATE_AGREEMENT,
    payload,
  );

  const draft = response.data.data;

  return {
    ...mapGeneratedPlan(draft),
    title: draft.title,
    description: draft.description,
    serviceType: draft.serviceType,
    durationText: draft.durationText,
    expectedDeliveryDate: draft.expectedDeliveryDate,
    currency: draft.currency,
  };
}
