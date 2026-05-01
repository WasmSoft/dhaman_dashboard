"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { submitDeliveryMutationOptions } from "@/lib/deliveries/actions";

// AR: hook توفر submit-delivery mutation مع invalidation للقوائم والتفاصيل والاتفاقيات.
// EN: Hook exposing submit-delivery mutation with list/detail/agreements invalidation.
export function useSubmitDeliveryMutation() {
  const queryClient = useQueryClient();

  return useMutation(submitDeliveryMutationOptions(queryClient));
}