"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createAgreementMutationOptions } from "@/lib/agreements/actions";

// AR: هذه hook توفر create-agreement mutation جاهزة مع invalidation موحد للقوائم.
// EN: This hook exposes a ready create-agreement mutation with unified list invalidation.
export function useCreateAgreementMutation() {
  const queryClient = useQueryClient();

  return useMutation(createAgreementMutationOptions(queryClient));
}
