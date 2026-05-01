"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateSettingsMutationOptions } from "@/lib/settings/actions";

// AR: هوك لحفظ الإعدادات العامة ثم تحديث بيانات صفحة الإعدادات.
// EN: Hook for saving general settings and refreshing the settings query cache.
export function useUpdateSettingsMutation() {
  const queryClient = useQueryClient();

  return useMutation(updateSettingsMutationOptions(queryClient));
}
