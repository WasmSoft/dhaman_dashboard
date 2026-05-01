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
  defaultDelayPolicy: string | null;
  defaultCancellationPolicy: string | null;
  defaultExtraRequestPolicy: string | null;
  defaultReviewPolicy: string | null;
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
