"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { approveAgreementMutationOptions } from "@/lib/client-portal/actions";

export function usePortalApproveMutation(token: string) {
  const queryClient = useQueryClient();

  return useMutation(approveAgreementMutationOptions(queryClient, token));
}
