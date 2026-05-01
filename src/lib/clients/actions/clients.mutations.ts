import type {
  QueryClient,
  UseMutationOptions,
} from "@tanstack/react-query";

import type {
  CreateClientPayload,
  UpdateClientPayload,
} from "@/types";

import {
  createClient,
  updateClient,
} from "./clients.api";
import { clientsQueryKeys } from "./clients.keys";

// AR: تبني هذه الدالة create mutation options مع invalidate موحد لقوائم العملاء.
// EN: This function builds create-client mutation options with unified clients-list invalidation.
export function createClientMutationOptions(
  queryClient: QueryClient,
): UseMutationOptions<
  Awaited<ReturnType<typeof createClient>>,
  Error,
  CreateClientPayload
> {
  return {
    mutationFn: (payload: CreateClientPayload) => createClient(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: clientsQueryKeys.lists(),
      });
    },
  };
}

// AR: تبني هذه الدالة update mutation options وتزامن مفاتيح القوائم والتفاصيل بعد النجاح.
// EN: This function builds update-client mutation options and synchronizes both list and detail keys after success.
export function updateClientMutationOptions(
  queryClient: QueryClient,
): UseMutationOptions<
  Awaited<ReturnType<typeof updateClient>>,
  Error,
  {
    clientId: string;
    payload: UpdateClientPayload;
  }
> {
  return {
    mutationFn: ({
      clientId,
      payload,
    }: {
      clientId: string;
      payload: UpdateClientPayload;
    }) => updateClient(clientId, payload),
    onSuccess: async (_, variables) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: clientsQueryKeys.lists(),
        }),
        queryClient.invalidateQueries({
          queryKey: clientsQueryKeys.detail(variables.clientId),
        }),
        queryClient.invalidateQueries({
          queryKey: clientsQueryKeys.summary(variables.clientId),
        }),
      ]);
    },
  };
}
