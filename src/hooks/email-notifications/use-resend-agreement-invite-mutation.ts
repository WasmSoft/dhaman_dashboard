// AR: Hook طفرة لإعادة إرسال دعوة العميل من شاشة تفاصيل الاتفاقية عند توفرها.
// EN: Mutation hook for resending a client invite from an agreement detail screen when available.
"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { resendAgreementInviteMutationOptions } from "@/lib/email-notifications/actions";

export function useResendAgreementInviteMutation() {
  const queryClient = useQueryClient();

  return useMutation(resendAgreementInviteMutationOptions(queryClient));
}
