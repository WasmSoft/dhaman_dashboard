// AR: تعريفات أنواع البيانات لخطة الدفع المُولَّدة بالذكاء الاصطناعي.
// EN: Type definitions for the AI-generated payment plan.

export interface PlanGenerationFormValues {
  projectDescription: string;
  totalBudget?: number;
  language?: 'ar' | 'en';
  currency?: string;
}

export interface GenerateAiPlanRequest {
  projectDescription: string;
  language?: 'ar' | 'en';
  totalBudget?: number;
  currency?: string;
}

export interface GeneratedMilestone {
  title: string;
  amount: number;
  dueInDays: number;
  acceptanceCriteria: string[];
  revisionLimit: number;
}

export interface GeneratedPolicies {
  delay: string;
  cancellation: string;
  extraRequest: string;
  review: string;
}

export interface GenerateAgreementDraftRequest {
  projectTitle?: string;
  projectDescription?: string;
  clientName?: string;
  serviceType?: string;
  durationText?: string;
  expectedDeliveryDate?: string;
  language?: 'ar' | 'en';
  totalBudget?: number;
  currency?: string;
}

export interface GeneratedPlan {
  id: string;
  milestones: GeneratedMilestone[];
  policies: GeneratedPolicies;
  ambiguityWarnings: string[];
  clarityScore: number;
}

export interface GeneratedAgreementDraft extends GeneratedPlan {
  title: string;
  description: string;
  serviceType: string | null;
  durationText: string | null;
  expectedDeliveryDate: string | null;
  currency: string;
}
