import type { QueryClient, UseMutationOptions } from "@tanstack/react-query";

import { agreementsQueryKeys } from "@/lib/agreements/actions";
import type { PreviewEmailPayload, SendTestNotificationPayload } from "@/types";

import {
  previewEmailNotification,
  resendAgreementInvite,
  sendTestEmailNotification,
} from "./email-notifications.api";
import { emailNotificationsQueryKeys } from "./email-notifications.keys";

// AR: خيارات طفرة معاينة البريد، ولا تحدث الكاش لأنها لا تنشئ سجل إرسال.
// EN: Preview email mutation options; cache is not invalidated because previews do not create logs.
export function previewEmailNotificationMutationOptions(): UseMutationOptions<
  Awaited<ReturnType<typeof previewEmailNotification>>,
  Error,
  PreviewEmailPayload
> {
  return {
    mutationFn: (payload: PreviewEmailPayload) => previewEmailNotification(payload),
  };
}

// AR: خيارات طفرة إرسال اختبار البريد وتحديث سجلات البريد بعدها.
// EN: Test email mutation options that refresh email logs after sending.
export function sendTestEmailNotificationMutationOptions(
  queryClient: QueryClient,
): UseMutationOptions<
  Awaited<ReturnType<typeof sendTestEmailNotification>>,
  Error,
  SendTestNotificationPayload
> {
  return {
    mutationFn: (payload: SendTestNotificationPayload) =>
      sendTestEmailNotification(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: emailNotificationsQueryKeys.logs(),
      });
    },
  };
}

// AR: خيارات طفرة إعادة إرسال دعوة الاتفاقية وتحديث كاش السجلات وتفاصيل الاتفاقية.
// EN: Resend invite mutation options that refresh email logs and agreement detail cache.
export function resendAgreementInviteMutationOptions(
  queryClient: QueryClient,
): UseMutationOptions<
  Awaited<ReturnType<typeof resendAgreementInvite>>,
  Error,
  string
> {
  return {
    mutationFn: (agreementId: string) => resendAgreementInvite(agreementId),
    onSuccess: async (_, agreementId) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: emailNotificationsQueryKeys.logs(),
        }),
        queryClient.invalidateQueries({
          queryKey: agreementsQueryKeys.detail(agreementId),
        }),
      ]);
    },
  };
}
