"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createClient } from "@/lib/clients/actions";
import { clientsQueryKeys } from "@/lib/clients/actions";

type CreateClientMutationArgs = {
  onSuccess?: (client: Awaited<ReturnType<typeof createClient>>) => void;
};

// AR: هذه hook توفر create-client mutation جاهزة للاستخدام مع invalidation موحد.
// EN: This hook exposes a ready create-client mutation with unified invalidation behavior.
export function useCreateClientMutation(options?: CreateClientMutationArgs) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createClient,
    onSuccess: async (client, variables, context) => {
      await queryClient.invalidateQueries({
        queryKey: clientsQueryKeys.lists(),
      });
      options?.onSuccess?.(client);
    },
  });
}
