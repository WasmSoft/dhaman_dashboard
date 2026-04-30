"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { approveChangeRequestMutationOptions } from "@/lib/change-requests/actions";

// AR: Hook مخصص لموافقة العميل على طلب التغيير عبر البوابة.
// EN: Custom hook for client approving a change request via the portal.
export function useApproveChangeRequestMutation(token: string, id: string) {
  const queryClient = useQueryClient();
  return useMutation(approveChangeRequestMutationOptions(queryClient, token, id));
}
