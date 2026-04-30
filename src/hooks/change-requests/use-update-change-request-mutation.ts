"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateChangeRequestMutationOptions } from "@/lib/change-requests/actions";

// AR: Hook مخصص لتحديث طلب تغيير موجود.
// EN: Custom hook for updating an existing change request.
export function useUpdateChangeRequestMutation(id: string) {
  const queryClient = useQueryClient();
  return useMutation(updateChangeRequestMutationOptions(queryClient, id));
}
