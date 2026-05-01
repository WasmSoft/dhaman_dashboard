"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createDeliveryMutationOptions } from "@/lib/deliveries/actions";

// AR: hook توفر create-delivery mutation مع invalidation للقوائم والمراحل.
// EN: Hook exposing create-delivery mutation with list/milestone invalidation.
export function useCreateDeliveryMutation() {
  const queryClient = useQueryClient();

  return useMutation(createDeliveryMutationOptions(queryClient));
}