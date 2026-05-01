export const agreementPoliciesQueryKeys = {
  all: ["agreement-policies"] as const,
  byAgreement: (agreementId: string) =>
    [...agreementPoliciesQueryKeys.all, "by-agreement", agreementId] as const,
};
