"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { activateAgreementMutationOptions } from "@/lib/agreements/actions";

// AR: هذه hook توفر mutation جاهزة لتفعيل الاتفاقية مع مزامنة القوائم والتفاصيل.
// EN: This hook exposes a ready activate-agreement mutation with list/detail cache synchronization.
export function useActivateMutation() {
  const queryClient = useQueryClient();

  return useMutation(activateAgreementMutationOptions(queryClient));
}
