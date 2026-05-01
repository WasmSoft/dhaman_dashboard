export const settingsQueryKeys = {
  all: ["settings"] as const,
  general: () => [...settingsQueryKeys.all, "general"] as const,
  defaultPolicies: () => [...settingsQueryKeys.all, "default-policies"] as const,
};
