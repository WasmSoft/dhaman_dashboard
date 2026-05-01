"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateCurrentUserMutationOptions } from "@/lib/users";

// AR: هذه hook تنفذ تحديث الحساب ثم تزامن كاش Users بعد النجاح.
// EN: This hook performs the account update and synchronizes the Users cache after success.
export function useUpdateCurrentUserMutation() {
  const queryClient = useQueryClient();

  return useMutation(updateCurrentUserMutationOptions(queryClient));
}
