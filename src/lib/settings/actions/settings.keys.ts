export const settingsQueryKeys = {
  all: ["settings"] as const,
  defaultPolicies: () => [...settingsQueryKeys.all, "default-policies"] as const,
};
