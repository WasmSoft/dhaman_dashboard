"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteClientMutationOptions } from "@/lib/clients/actions";

// AR: هذه hook توفر delete-client mutation مع إزالة كاش التفاصيل القديم بعد الحذف.
// EN: This hook exposes the delete-client mutation and removes stale detail cache after deletion.
export function useDeleteClientMutation() {
  const queryClient = useQueryClient();

  return useMutation(deleteClientMutationOptions(queryClient));
}
