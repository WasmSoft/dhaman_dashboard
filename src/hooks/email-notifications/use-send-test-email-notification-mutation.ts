// AR: Hook طفرة لإرسال بريد اختبار ثم تحديث سجلات البريد.
// EN: Mutation hook for sending a test email and refreshing email logs.
"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { sendTestEmailNotificationMutationOptions } from "@/lib/email-notifications/actions";

export function useSendTestEmailNotificationMutation() {
  const queryClient = useQueryClient();

  return useMutation(sendTestEmailNotificationMutationOptions(queryClient));
}
