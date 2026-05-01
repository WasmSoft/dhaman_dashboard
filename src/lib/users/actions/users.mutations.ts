import type { QueryClient, UseMutationOptions } from "@tanstack/react-query";

import type {
  UsersAccountResponse,
  UsersAccountUpdatePayload,
  UsersProfileResponse,
  UsersProfileUpdatePayload,
  UsersSettingsDraft,
} from "@/types";

import { updateCurrentUser, updateCurrentUserProfile } from "./users.api";
import { usersQueryKeys } from "./users.keys";

// AR: تبني mutation options لتحديث الحساب ثم تزامن كاش الحساب مباشرة بعد النجاح.
// EN: Builds mutation options for account updates and synchronizes the account cache after success.
export function updateCurrentUserMutationOptions(
  queryClient: QueryClient,
): UseMutationOptions<
  UsersAccountResponse,
  Error,
  UsersAccountUpdatePayload | UsersSettingsDraft | Record<string, unknown>
> {
  return {
    mutationFn: (payload) => updateCurrentUser(payload),
    onSuccess: async (data) => {
      queryClient.setQueryData(usersQueryKeys.currentUser(), data);
      await queryClient.invalidateQueries({ queryKey: usersQueryKeys.currentUser() });
    },
  };
}

// AR: تبني mutation options لتحديث الملف المهني وتحديث الكاش المرتبط به.
// EN: Builds mutation options for profile updates and refreshes the related cache.
export function updateCurrentUserProfileMutationOptions(
  queryClient: QueryClient,
): UseMutationOptions<
  UsersProfileResponse,
  Error,
  UsersProfileUpdatePayload | UsersSettingsDraft | Record<string, unknown>
> {
  return {
    mutationFn: (payload) => updateCurrentUserProfile(payload),
    onSuccess: async (data) => {
      queryClient.setQueryData(usersQueryKeys.currentUserProfile(), data);
      await queryClient.invalidateQueries({ queryKey: usersQueryKeys.currentUserProfile() });
    },
  };
}
