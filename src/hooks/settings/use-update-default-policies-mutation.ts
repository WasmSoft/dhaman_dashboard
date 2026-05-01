"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateDefaultPoliciesMutationOptions } from "@/lib/settings/actions";

// AR: هوك لحفظ السياسات الافتراضية ثم تحديث بيانات صفحة الإعدادات.
// EN: Hook for saving default policies and refreshing the settings query cache.
export function useUpdateDefaultPoliciesMutation() {
  const queryClient = useQueryClient();

  return useMutation(updateDefaultPoliciesMutationOptions(queryClient));
}
