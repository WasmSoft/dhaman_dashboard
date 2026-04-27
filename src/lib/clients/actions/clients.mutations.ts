import type {
  QueryClient,
  UseMutationOptions,
} from "@tanstack/react-query";

import type { ClientMutationPayload } from "@/types";

import {
  createClient,
  deleteClient,
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
  ClientMutationPayload
> {
  return {
    mutationFn: (payload: ClientMutationPayload) => createClient(payload),
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
    payload: ClientMutationPayload;
  }
> {
  return {
    mutationFn: ({
      clientId,
      payload,
    }: {
      clientId: string;
      payload: ClientMutationPayload;
    }) => updateClient(clientId, payload),
    onSuccess: async (_, variables) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: clientsQueryKeys.lists(),
        }),
        queryClient.invalidateQueries({
          queryKey: clientsQueryKeys.detail(variables.clientId),
        }),
      ]);
    },
  };
}

// AR: تبني هذه الدالة delete mutation options مع تنظيف كاش التفاصيل بعد حذف العميل.
// EN: This function builds delete-client mutation options and clears stale detail cache after client deletion.
export function deleteClientMutationOptions(
  queryClient: QueryClient,
): UseMutationOptions<void, Error, string> {
  return {
    mutationFn: (clientId: string) => deleteClient(clientId),
    onSuccess: async (_, clientId) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: clientsQueryKeys.lists(),
        }),
        queryClient.removeQueries({
          queryKey: clientsQueryKeys.detail(clientId),
        }),
      ]);
    },
  };
}
