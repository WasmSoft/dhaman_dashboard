"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateClient, clientsQueryKeys } from "@/lib/clients/actions";

type UpdateClientMutationArgs = {
  onSuccess?: () => void;
};

// AR: هذه hook توفر update-client mutation وتضمن تحديث كاش القوائم والتفاصيل بشكل متسق.
// EN: This hook exposes the update-client mutation and keeps list and detail cache updates consistent.
export function useUpdateClientMutation(options?: UpdateClientMutationArgs) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ clientId, payload }: { clientId: string; payload: Parameters<typeof updateClient>[1] }) =>
      updateClient(clientId, payload),
    onSuccess: async (_, variables) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: clientsQueryKeys.lists() }),
        queryClient.invalidateQueries({ queryKey: clientsQueryKeys.detail(variables.clientId) }),
        queryClient.invalidateQueries({ queryKey: clientsQueryKeys.summary(variables.clientId) }),
      ]);
      options?.onSuccess?.();
    },
  });
}
