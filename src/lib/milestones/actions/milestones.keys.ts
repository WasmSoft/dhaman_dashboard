export const milestonesQueryKeys = {
  all: ["milestones"] as const,
  lists: () => [...milestonesQueryKeys.all, "list"] as const,
  list: (agreementId: string) =>
    [...milestonesQueryKeys.lists(), agreementId] as const,
  details: () => [...milestonesQueryKeys.all, "details"] as const,
  detail: (milestoneId: string) =>
    [...milestonesQueryKeys.details(), milestoneId] as const,
} as const;
