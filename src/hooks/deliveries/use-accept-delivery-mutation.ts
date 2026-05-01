"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { acceptDeliveryMutationOptions } from "@/lib/deliveries/actions";

// AR: هوك قبول التسليم من بوابة العميل.
// EN: Mutation hook for accepting a delivery from the client portal.
export function useAcceptDeliveryMutation(token: string, deliveryId: string) {
  const queryClient = useQueryClient();

  return useMutation(acceptDeliveryMutationOptions(queryClient, token, deliveryId));
}
