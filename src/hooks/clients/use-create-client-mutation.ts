"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createClientMutationOptions } from "@/lib/clients/actions";

// AR: هذه hook توفر create-client mutation جاهزة للاستخدام مع invalidation موحد.
// EN: This hook exposes a ready create-client mutation with unified invalidation behavior.
export function useCreateClientMutation() {
  const queryClient = useQueryClient();

  return useMutation(createClientMutationOptions(queryClient));
}
