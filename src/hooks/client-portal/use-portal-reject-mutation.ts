"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { rejectAgreementMutationOptions } from "@/lib/client-portal/actions";

export function usePortalRejectMutation(token: string) {
  const queryClient = useQueryClient();

  return useMutation(rejectAgreementMutationOptions(queryClient, token));
}
