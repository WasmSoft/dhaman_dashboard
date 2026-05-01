"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { acceptDeliveryMutationOptions } from "@/lib/client-portal/actions";

export function usePortalAcceptDeliveryMutation(
  token: string,
  deliveryId: string,
) {
  const queryClient = useQueryClient();

  return useMutation(
    acceptDeliveryMutationOptions(queryClient, token, deliveryId),
  );
}
