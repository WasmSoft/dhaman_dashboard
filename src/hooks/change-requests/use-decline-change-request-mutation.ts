"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { declineChangeRequestMutationOptions } from "@/lib/change-requests/actions";

// AR: Hook مخصص لرفض العميل لطلب التغيير عبر البوابة.
// EN: Custom hook for client declining a change request via the portal.
export function useDeclineChangeRequestMutation(token: string, id: string) {
  const queryClient = useQueryClient();
  return useMutation(declineChangeRequestMutationOptions(queryClient, token, id));
}
