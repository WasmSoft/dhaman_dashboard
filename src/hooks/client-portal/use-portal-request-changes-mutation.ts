"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { requestAgreementChangesMutationOptions } from "@/lib/client-portal/actions";

export function usePortalRequestChangesMutation(token: string) {
  const queryClient = useQueryClient();

  return useMutation(requestAgreementChangesMutationOptions(queryClient, token));
}
