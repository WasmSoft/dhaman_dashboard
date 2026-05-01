"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateCurrentUserProfileMutationOptions } from "@/lib/users";

// AR: هذه hook تنفذ تحديث الملف المهني ثم تحدث الكاش المرتبط به.
// EN: This hook performs the profile update and refreshes the related cache.
export function useUpdateUserProfileMutation() {
  const queryClient = useQueryClient();

  return useMutation(updateCurrentUserProfileMutationOptions(queryClient));
}
