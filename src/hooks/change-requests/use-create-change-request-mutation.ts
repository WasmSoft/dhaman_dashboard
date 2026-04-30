"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createChangeRequestMutationOptions } from "@/lib/change-requests/actions";

// AR: Hook مخصص لإنشاء طلب تغيير جديد.
// EN: Custom hook for creating a new change request.
export function useCreateChangeRequestMutation(agreementId: string) {
  const queryClient = useQueryClient();
  return useMutation(createChangeRequestMutationOptions(queryClient, agreementId));
}
