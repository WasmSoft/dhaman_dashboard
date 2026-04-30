// AR: أنواع طلبات التغيير — الحالات، الكيانات، وPayloads الخاصة بالواجهة الأمامية.
// EN: Change request types — statuses, entities, and payloads for the frontend layer.
// NOTE: Pre-existing TSC errors (2026-04-30): 4 errors in test files (no-direct-fetch.test.ts,
// email-notifications.mutations.test.ts, email-notifications.schema.test.ts) — not caused by this feature.

// ── Status unions ────────────────────────────────────────────────────────────

export type ChangeRequestStatus =
  | "DRAFT"
  | "SENT"
  | "APPROVED"
  | "DECLINED"
  | "FUNDED"
  | "IN_PROGRESS"
  | "DELIVERED"
  | "COMPLETED";

export type ChangeRequestPaymentStatus =
  | "WAITING"
  | "RESERVED"
  | "CLIENT_REVIEW"
  | "READY_TO_RELEASE"
  | "RELEASED"
  | "ON_HOLD";

// ── Core entities ────────────────────────────────────────────────────────────

export interface ChangeRequest {
  id: string;
  agreementId: string;
  milestoneId?: string | null;
  aiReviewId?: string | null;
  requestedByRole: string;
  title: string;
  description: string;
  amount: string;
  currency: string;
  additionalTimelineText?: string | null;
  timelineDays?: number | null;
  acceptanceCriteria: string[];
  status: ChangeRequestStatus;
  paymentStatus: ChangeRequestPaymentStatus;
  approvedAt?: string | null;
  declinedAt?: string | null;
  fundedAt?: string | null;
  createdAt: string;
  updatedAt: string;
  payments: ChangeRequestPaymentSummary[];
}

export interface ChangeRequestListItem {
  id: string;
  agreementId: string;
  milestoneId?: string | null;
  title: string;
  amount: string;
  currency: string;
  status: ChangeRequestStatus;
  paymentStatus: ChangeRequestPaymentStatus;
  createdAt: string;
  updatedAt: string;
}

export interface ChangeRequestPaymentSummary {
  id: string;
  amount: string;
  currency: string;
  status: ChangeRequestPaymentStatus;
  operationType: string;
}

// ── API response wrappers ────────────────────────────────────────────────────

export interface ChangeRequestsListResponse {
  data: ChangeRequestListItem[];
  total: number;
}

export type ChangeRequestDetailsResponse = ChangeRequest;

// ── Payloads ─────────────────────────────────────────────────────────────────

export interface CreateChangeRequestPayload {
  title: string;
  description: string;
  amount: string;
  currency: string;
  acceptanceCriteria: string[];
  milestoneId?: string;
  aiReviewId?: string;
  timelineDays?: number;
}

export type UpdateChangeRequestPayload = Partial<CreateChangeRequestPayload>;

export interface DeclineChangeRequestPayload {
  reason: string;
}

export interface FundChangeRequestPayload {
  amount: string;
  paymentMethodLabel?: string;
}

// ── Query params ─────────────────────────────────────────────────────────────

export interface ChangeRequestListParams {
  status?: ChangeRequestStatus;
  milestoneId?: string;
  page?: number;
  limit?: number;
}
