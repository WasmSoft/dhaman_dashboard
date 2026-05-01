"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateDeliveryMutationOptions } from "@/lib/deliveries/actions";

// AR: هوك تحديث مسودة تسليم قابلة للتعديل.
// EN: Mutation hook for updating an editable delivery draft.
export function useUpdateDeliveryMutation() {
  const queryClient = useQueryClient();

  return useMutation(updateDeliveryMutationOptions(queryClient));
}
