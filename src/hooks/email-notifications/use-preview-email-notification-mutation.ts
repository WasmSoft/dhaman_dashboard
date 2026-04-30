// AR: Hook طفرة لمعاينة قالب البريد من الواجهة بدون إنشاء سجل إرسال.
// EN: Mutation hook for previewing an email template from the UI without creating a send log.
"use client";

import { useMutation } from "@tanstack/react-query";

import { previewEmailNotificationMutationOptions } from "@/lib/email-notifications/actions";

export function usePreviewEmailNotificationMutation() {
  return useMutation(previewEmailNotificationMutationOptions());
}
