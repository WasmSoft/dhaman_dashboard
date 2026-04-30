"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendChangeRequestMutationOptions } from "@/lib/change-requests/actions";

// AR: Hook مخصص لإرسال طلب التغيير إلى العميل.
// EN: Custom hook for sending a change request to the client.
export function useSendChangeRequestMutation(id: string) {
  const queryClient = useQueryClient();
  return useMutation(sendChangeRequestMutationOptions(queryClient, id));
}
