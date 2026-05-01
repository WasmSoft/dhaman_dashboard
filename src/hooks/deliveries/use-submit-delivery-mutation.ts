"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { submitDeliveryMutationOptions } from "@/lib/deliveries/actions";

// AR: هوك إرسال التسليم إلى العميل للمراجعة.
// EN: Mutation hook for submitting the delivery to client review.
export function useSubmitDeliveryMutation() {
  const queryClient = useQueryClient();

  return useMutation(submitDeliveryMutationOptions(queryClient));
}
