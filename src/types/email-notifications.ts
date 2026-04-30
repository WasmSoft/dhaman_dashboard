import type { ApiItemResponse } from "@/types/common";

export type EmailNotificationType =
  | "AGREEMENT_INVITE"
  | "AGREEMENT_APPROVED"
  | "AGREEMENT_CHANGE_REQUESTED"
  | "DELIVERY_SUBMITTED"
  | "DELIVERY_CHANGES_REQUESTED"
  | "AI_REVIEW_READY"
  | "CHANGE_REQUEST_CREATED"
  | "CHANGE_REQUEST_APPROVED"
  | "PAYMENT_RESERVED"
  | "PAYMENT_READY_TO_RELEASE"
  | "PAYMENT_RELEASED"
  | "SYSTEM_TEST";

export type EmailNotificationStatus = "PENDING" | "SENT" | "FAILED";
export type EmailNotificationLocale = "ar" | "en";

export interface PreviewEmailPayload {
  type: EmailNotificationType;
  agreementId: string;
  locale?: EmailNotificationLocale;
  metadata?: Record<string, unknown>;
}

export interface SendTestNotificationPayload {
  type: EmailNotificationType;
  recipientEmail: string;
  agreementId?: string;
  locale?: EmailNotificationLocale;
}

export interface EmailLogQueryParams {
  type?: EmailNotificationType;
  status?: EmailNotificationStatus;
  agreementId?: string;
  recipientEmail?: string;
  from?: string;
  to?: string;
  page?: number;
  limit?: number;
}

export interface EmailNotification {
  id: string;
  agreementId: string | null;
  recipientEmail: string;
  type: EmailNotificationType;
  subject: string;
  status: EmailNotificationStatus;
  providerMessageId: string | null;
  errorMessage: string | null;
  previewHtml: string | null;
  sentAt: string | null;
  createdAt: string;
}

export interface EmailPreview {
  type: EmailNotificationType;
  recipientEmail: string | null;
  subject: string;
  previewHtml: string;
  previewText?: string;
  locale: EmailNotificationLocale;
}

export interface EmailLogsPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PaginatedEmailNotifications {
  items: EmailNotification[];
  pagination: EmailLogsPagination;
}

export type EmailPreviewResponse = ApiItemResponse<EmailPreview>;
export type EmailNotificationResponse = ApiItemResponse<EmailNotification>;
export type EmailLogsResponse = ApiItemResponse<PaginatedEmailNotifications>;
