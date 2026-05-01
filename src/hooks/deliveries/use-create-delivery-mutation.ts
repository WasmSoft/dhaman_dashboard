"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createDeliveryMutationOptions } from "@/lib/deliveries/actions";

// AR: هوك إنشاء مسودة تسليم جديدة.
// EN: Mutation hook for creating a new delivery draft.
export function useCreateDeliveryMutation() {
  const queryClient = useQueryClient();

  return useMutation(createDeliveryMutationOptions(queryClient));
}
