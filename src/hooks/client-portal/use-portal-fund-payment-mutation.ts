"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { fundPaymentMutationOptions } from "@/lib/client-portal/actions";

export function usePortalFundPaymentMutation(token: string) {
  const queryClient = useQueryClient();

  return useMutation(fundPaymentMutationOptions(queryClient, token));
}
