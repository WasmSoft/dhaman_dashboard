"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { requestDeliveryChangesMutationOptions } from "@/lib/deliveries/actions";

// AR: هوك طلب تعديلات على التسليم من بوابة العميل.
// EN: Mutation hook for requesting delivery changes from the client portal.
export function useRequestDeliveryChangesMutation(
  token: string,
  deliveryId: string,
) {
  const queryClient = useQueryClient();

  return useMutation(
    requestDeliveryChangesMutationOptions(queryClient, token, deliveryId),
  );
}
