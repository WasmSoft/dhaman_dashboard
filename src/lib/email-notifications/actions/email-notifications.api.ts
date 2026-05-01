import { axiosInstance } from "@/lib/axios-instance";
import { API_PATHS } from "@/lib/api-paths";
import type {
  EmailLogQueryParams,
  EmailLogsResponse,
  EmailNotificationResponse,
  EmailPreviewResponse,
  PreviewEmailPayload,
  SendTestNotificationPayload,
} from "@/types";

// AR: تعرض هذه الدالة قالب البريد الإلكتروني بدون إنشاء سجل إرسال أو استدعاء مزود البريد.
// EN: This action previews an email template without creating a send log or calling the provider.
export async function previewEmailNotification(payload: PreviewEmailPayload) {
  const response = await axiosInstance.post<EmailPreviewResponse>(
    API_PATHS.EMAIL_NOTIFICATIONS.PREVIEW,
    payload,
  );

  return response.data;
}

// AR: تجلب هذه الدالة سجلات البريد المفلترة والمحددة بالمستخدم من لوحة التحكم.
// EN: This action fetches filtered, user-scoped email logs for the dashboard.
export async function getEmailNotificationLogs(params?: EmailLogQueryParams) {
  const response = await axiosInstance.get<EmailLogsResponse>(
    API_PATHS.EMAIL_NOTIFICATIONS.LOGS,
    { params },
  );

  return response.data;
}

// AR: ترسل هذه الدالة رسالة اختبار وتعيد سجل البريد الناتج حتى تظهر حالة المزود.
// EN: This action sends a test notification and returns the resulting log so provider status is visible.
export async function sendTestEmailNotification(
  payload: SendTestNotificationPayload,
) {
  const response = await axiosInstance.post<EmailNotificationResponse>(
    API_PATHS.EMAIL_NOTIFICATIONS.SEND_TEST,
    payload,
  );

  return response.data;
}

// AR: تعيد هذه الدالة إرسال دعوة العميل لاتفاقية محددة وتعيد سجل البريد الناتج.
// EN: This action resends a client invite for a specific agreement and returns the created email log.
export async function resendAgreementInvite(agreementId: string) {
  const response = await axiosInstance.post<EmailNotificationResponse>(
    API_PATHS.AGREEMENTS.SEND_INVITE(agreementId),
  );

  return response.data;
}
