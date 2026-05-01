"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { sendInviteMutationOptions } from "@/lib/agreements/actions";

// AR: هذه hook توفر mutation جاهزة لإرسال دعوة الاتفاقية مع تحديث الكاش المرتبط بها.
// EN: This hook exposes a ready send-invite mutation with the related cache refresh behavior.
export function useSendInviteMutation() {
  const queryClient = useQueryClient();

  return useMutation(sendInviteMutationOptions(queryClient));
}
