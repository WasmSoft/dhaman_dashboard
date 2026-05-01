"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { releasePaymentMutationOptions } from "@/lib/client-portal/actions";

export function usePortalReleasePaymentMutation(token: string) {
  const queryClient = useQueryClient();

  return useMutation(releasePaymentMutationOptions(queryClient, token));
}
