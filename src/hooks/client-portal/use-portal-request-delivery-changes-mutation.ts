"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { requestDeliveryChangesMutationOptions } from "@/lib/client-portal/actions";

export function usePortalRequestDeliveryChangesMutation(
  token: string,
  deliveryId: string,
) {
  const queryClient = useQueryClient();

  return useMutation(
    requestDeliveryChangesMutationOptions(queryClient, token, deliveryId),
  );
}
