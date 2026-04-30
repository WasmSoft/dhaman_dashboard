"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fundChangeRequestMutationOptions } from "@/lib/change-requests/actions";

// AR: Hook مخصص لتمويل العميل لطلب التغيير عبر البوابة.
// EN: Custom hook for client funding a change request via the portal.
export function useFundChangeRequestMutation(token: string, id: string) {
  const queryClient = useQueryClient();
  return useMutation(fundChangeRequestMutationOptions(queryClient, token, id));
}
