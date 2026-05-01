export const usersQueryKeys = {
  all: ["users"] as const,
  currentUser: () => [...usersQueryKeys.all, "current-user"] as const,
  currentUserProfile: () => [...usersQueryKeys.all, "current-user-profile"] as const,
} as const;
