import type { ApiItemResponse } from "./common";
import type { PaymentStatus } from "./dashboard";

export type PaymentOperationType =
  | "FUND_MILESTONE"
  | "RELEASE_MILESTONE"
  | "CHANGE_REQUEST_PAYMENT"
  | "REFUND";

export interface PaymentDto {
  id: string;
  agreementId: string;
  milestoneId: string | null;
  changeRequestId: string | null;
  amount: string;
  currency: string;
  status: PaymentStatus;
  operationType: PaymentOperationType;
  paymentMethodLabel: string | null;
  receiptNumber: string | null;
  transactionReference: string | null;
  demoMode: boolean;
  reservedAt: string | null;
  releasedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface AgreementPaymentSummary {
  agreementId: string;
  currency: string;
  payments: PaymentDto[];
  totalFunded: string;
  totalReleased: string;
  totalPending: string;
}

export interface PaymentReceiptDto {
  paymentId: string;
  receiptNumber: string;
  transactionReference: string;
  amount: string;
  currency: string;
  status: PaymentStatus;
  operationType: PaymentOperationType;
  paymentMethodLabel: string;
  agreementId: string;
  milestoneTitle: string | null;
  demoMode: boolean;
  reservedAt: string | null;
  releasedAt: string | null;
  issuedAt: string;
}

export interface PaymentHistoryEvent {
  eventId: string;
  paymentId: string | null;
  agreementId: string;
  eventType: string;
  previousStatus: string | null;
  newStatus: string | null;
  actorId: string | null;
  actorRole: string | null;
  happenedAt: string;
  notes: string | null;
  reason: string | null;
}

export interface PortalPaymentListItem {
  id: string;
  amount: string;
  currency: string;
  status: PaymentStatus;
  milestoneTitle: string | null;
  receiptNumber: string | null;
}

export interface PortalPaymentPlanResponse {
  agreementId: string;
  payments: PortalPaymentListItem[];
  currency: string;
  totalAmount: string;
  fundedAmount: string;
  pendingAmount: string;
}

export interface PortalPaymentHistoryResponse {
  events: PaymentHistoryEvent[];
  summary: {
    totalFunded: string;
    totalReleased: string;
    currency: string;
  };
}

export interface FundMilestoneInput {
  milestoneId: string;
  amount: string;
  paymentMethodLabel?: string;
}

export interface ReleasePaymentInput {
  paymentId: string;
  notes?: string;
}

export interface PortalFundPaymentInput {
  amount: string;
  paymentMethodLabel?: string;
}

export interface PortalReleaseConfirmationInput {
  confirmed: boolean;
  notes?: string;
}

export type AgreementPaymentsResponse = ApiItemResponse<AgreementPaymentSummary>;
export type PaymentDetailsResponse = ApiItemResponse<PaymentDto>;
export type PaymentReceiptResponse = ApiItemResponse<PaymentReceiptDto>;
export type PortalPaymentPlanApiResponse = ApiItemResponse<PortalPaymentPlanResponse>;
export type PortalPaymentHistoryApiResponse = ApiItemResponse<PortalPaymentHistoryResponse>;
