"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateDeliveryMutationOptions } from "@/lib/deliveries/actions";

// AR: hook توفر update-delivery mutation مع invalidation للقوائم والتفاصيل.
// EN: Hook exposing update-delivery mutation with list/detail invalidation.
export function useUpdateDeliveryMutation() {
  const queryClient = useQueryClient();

  return useMutation(updateDeliveryMutationOptions(queryClient));
}