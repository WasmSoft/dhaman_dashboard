"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateClientMutationOptions } from "@/lib/clients/actions";

// AR: هذه hook توفر update-client mutation وتضمن تحديث كاش القوائم والتفاصيل بشكل متسق.
// EN: This hook exposes the update-client mutation and keeps list and detail cache updates consistent.
export function useUpdateClientMutation() {
  const queryClient = useQueryClient();

  return useMutation(updateClientMutationOptions(queryClient));
}
