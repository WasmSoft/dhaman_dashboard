export interface AgreementPolicy {
  id: string;
  agreementId: string;
  delayPolicy: string | null;
  cancellationPolicy: string | null;
  extraRequestPolicy: string | null;
  reviewPolicy: string | null;
  clientReviewPeriodDays: number;
  freelancerDelayGraceDays: number;
  createdAt: string;
  updatedAt: string;
}

export interface DefaultPolicies {
  delayPolicy: string | null;
  cancellationPolicy: string | null;
  extraRequestPolicy: string | null;
  reviewPolicy: string | null;
  clientReviewPeriodDays: number;
  freelancerDelayGraceDays: number;
}

export interface PolicyMutationPayload {
  delayPolicy?: string | null | undefined;
  cancellationPolicy?: string | null | undefined;
  extraRequestPolicy?: string | null | undefined;
  reviewPolicy?: string | null | undefined;
  clientReviewPeriodDays?: number | undefined;
  freelancerDelayGraceDays?: number | undefined;
}

export type DefaultPoliciesMutationPayload = PolicyMutationPayload;
