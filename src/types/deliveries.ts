<<<<<<< HEAD
// AR: أنواع التسليمات المستخدمة في الواجهة — تتضمن الاستجابات، الفلاتر، الحمولات، وملخص الدفع.
// EN: Delivery types for the frontend — includes responses, filters, payloads, and payment summary.

export type DeliveryStatus =
  | "DRAFT"
  | "SUBMITTED"
  | "CLIENT_REVIEW"
  | "CHANGES_REQUESTED"
  | "ACCEPTED"
  | "DISPUTED";

export interface DeliveryPaymentSummary {
  id: string;
  status: string;
  amount?: string | null;
  currency?: string | null;
}

export interface Delivery {
  id: string;
  agreementId: string;
  milestoneId: string;
  agreementTitle: string;
  milestoneName: string;
  deliveryUrl?: string | null;
  fileUrl?: string | null;
  fileName?: string | null;
  fileType?: string | null;
  summary: string;
  notes?: string | null;
  status: DeliveryStatus;
  submittedAt?: string | null;
  acceptedAt?: string | null;
  changesRequestedAt?: string | null;
  clientFeedback?: string | null;
  requestedCriteria?: string[];
  payment?: DeliveryPaymentSummary | null;
  createdAt: string;
  updatedAt: string;
}

export interface DeliveryFilters {
  agreementId?: string;
  milestoneId?: string;
  status?: DeliveryStatus;
  page?: number;
  limit?: number;
}

export interface DeliveryListResponse {
  items: Delivery[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface CreateDeliveryPayload {
  deliveryUrl?: string;
  fileUrl?: string;
  fileName?: string;
  fileType?: string;
  summary: string;
  notes?: string;
}

export interface UpdateDeliveryPayload {
  deliveryUrl?: string;
  fileUrl?: string;
  fileName?: string;
  fileType?: string;
  summary?: string;
  notes?: string;
}

export interface SubmitDeliveryPayload {
  noteToClient?: string;
}

export type DeliveryErrorCode =
  | "DELIVERY_NOT_FOUND"
  | "DELIVERY_ALREADY_EXISTS"
  | "DELIVERY_NOT_EDITABLE"
  | "DELIVERY_NOT_SUBMITTABLE"
  | "DELIVERY_EVIDENCE_REQUIRED"
  | "MILESTONE_NOT_FOUND"
  | "AGREEMENT_NOT_ACTIVE"
  | "PAYMENT_NOT_RESERVED"
  | "VALIDATION_ERROR"
  | "UNAUTHORIZED"
  | "FORBIDDEN";

export interface DeliveryApiError {
  code: DeliveryErrorCode;
  message: string;
}

// AR: أنواع واجهة المستخدم الثابتة — تستخدم في الثوابت وبطاقات العرض.
// EN: UI-only types used in constants and display cards.
=======
import type { ApiItemResponse } from "./common";
import type {
  DeliveryStatus as MilestoneDeliveryStatus,
  MilestoneStatus,
  PaymentStatus,
} from "./dashboard";
>>>>>>> 376aec6939d214e5014cc9fa065f5e9a54ce38a7

export type DeliveryMetricTone = "amber" | "violet" | "emerald" | "red";
export type DeliveryStatusTone =
  | "review"
  | "change"
  | "accepted"
  | "pending"
  | "ai"
  | "draft"
  | "disputed";
export type DeliveryPaymentTone =
  | "client"
  | "hold"
  | "ready"
  | "reserved"
  | "ai"
  | "released";

export type DeliveryRecordStatus =
  | "DRAFT"
  | "SUBMITTED"
  | "CLIENT_REVIEW"
  | "CHANGES_REQUESTED"
  | "ACCEPTED"
  | "DISPUTED";

export type DeliveryStatusValue =
  | DeliveryRecordStatus
  | MilestoneDeliveryStatus;

export interface DeliveryMilestoneSummaryDto {
  id: string;
  title: string;
  status: MilestoneStatus;
  paymentStatus: PaymentStatus;
  deliveryStatus: DeliveryStatusValue;
  revisionLimit: number;
}

export interface DeliveryPaymentSummaryDto {
  status: PaymentStatus;
  demoMode: boolean;
  reservedAt?: string | null;
  releasedAt?: string | null;
}

export interface DeliveryTimelineReferenceDto {
  agreementId: string;
  milestoneId?: string | null;
}

export interface DeliveryRecordDto {
  id: string;
  agreementId: string;
  milestoneId: string;
  submittedById: string;
  deliveryUrl?: string | null;
  fileUrl?: string | null;
  fileName?: string | null;
  fileType?: string | null;
  summary: string;
  notes?: string | null;
  status: DeliveryRecordStatus;
  submittedAt?: string | null;
  acceptedAt?: string | null;
  changesRequestedAt?: string | null;
  clientFeedback?: string | null;
  milestone: DeliveryMilestoneSummaryDto;
  payment?: DeliveryPaymentSummaryDto | null;
  timeline: DeliveryTimelineReferenceDto;
  createdAt: string;
  updatedAt: string;
}

export interface DeliveriesListDto {
  deliveries: DeliveryRecordDto[];
  page: number;
  limit: number;
  total: number;
}

export interface DeliveryListParams {
  agreementId?: string;
  milestoneId?: string;
  status?: DeliveryRecordStatus;
  page?: number;
  limit?: number;
}

export interface CreateDeliveryInput {
  deliveryUrl?: string;
  fileUrl?: string;
  fileName?: string;
  fileType?: string;
  summary: string;
  notes?: string;
}

export interface UpdateDeliveryInput {
  deliveryUrl?: string;
  fileUrl?: string;
  fileName?: string;
  fileType?: string;
  summary?: string;
  notes?: string;
}

export interface SubmitDeliveryInput {
  noteToClient?: string;
}

export interface PortalDeliverySummaryDto {
  id: string;
  milestoneId: string;
  milestoneTitle: string;
  status: DeliveryStatusValue | string;
  submittedAt?: string;
  notes?: string;
}

export interface PortalWorkspaceMilestoneDto {
  id: string;
  order: number;
  title: string;
  description?: string;
  amount: string;
  currency: string;
  status: string;
  dueDate?: string;
}

export interface PortalWorkspacePaymentDto {
  milestoneId: string;
  milestoneTitle: string;
  amount: string;
  currency: string;
  status: PaymentStatus;
}

export interface PortalWorkspaceDeliveryDto {
  id: string;
  milestoneId: string;
  milestoneTitle: string;
  status: DeliveryStatusValue | string;
  submittedAt?: string;
  notes?: string;
}

export interface PortalWorkspaceResponseDto {
  agreementId: string;
  title: string;
  status: string;
  totalAmount: string;
  currency: string;
  freelancerName: string;
  milestones: PortalWorkspaceMilestoneDto[];
  payments: PortalWorkspacePaymentDto[];
  deliveries: PortalWorkspaceDeliveryDto[];
}

export interface PortalDeliveryActionDto {
  agreementId: string;
  status: string;
  message: string;
  timelineEventId?: string;
}

export interface PortalRequestDeliveryChangesInput {
  reason: string;
  requestedChanges?: string[];
}

export type DeliveriesListResponse = ApiItemResponse<DeliveriesListDto>;
export type DeliveryDetailsResponse = ApiItemResponse<DeliveryRecordDto>;
export type PortalDeliverySummaryResponse = ApiItemResponse<PortalDeliverySummaryDto>;
export type PortalWorkspaceResponse = ApiItemResponse<PortalWorkspaceResponseDto>;
export type PortalDeliveryActionResponse = ApiItemResponse<PortalDeliveryActionDto>;

export type DeliveryDraftFormValues = CreateDeliveryInput;

export interface DeliverySubmitFormValues extends CreateDeliveryInput {
  noteToClient?: string;
  confirmationAccepted: boolean;
}

export interface DeliveryMetricCard {
  label: string;
  value: string;
  helper: string;
  badge: string;
  tone: DeliveryMetricTone;
}

export interface DeliveryFilterChip {
  label: string;
  count: string;
  active?: boolean;
}

export interface DeliveryTableItem {
  id: string;
  agreementId?: string;
  milestoneId?: string;
  project: string;
  client: string;
  milestone: string;
  delivery: string;
  deliveryStatus: string;
  deliveryTone: DeliveryStatusTone;
  paymentStatus: string;
  paymentTone: DeliveryPaymentTone;
  amount: string;
  lastUpdate: string;
  actionLabel: string;
  actionHref?: string;
  detailHref?: string;
  active?: boolean;
}

export interface DeliverySelectedSummary {
  title: string;
  project: string;
  milestone: string;
  statusLabel: string;
  status: string;
  paymentLabel: string;
  payment: string;
  amount: string;
  deliveryTimeLabel: string;
  deliveryTime: string;
  reviewDueLabel: string;
  reviewDue: string;
  criteriaTitle: string;
  criteria: readonly string[];
  note: string;
}

export interface DeliveriesContent {
  title: string;
  subtitle: string;
  searchPlaceholder: string;
  exportLabel: string;
  createLabel: string;
  metrics: readonly DeliveryMetricCard[];
  filters: readonly DeliveryFilterChip[];
  sortFilters: readonly string[];
  tableHeaders: readonly string[];
  deliveries: readonly DeliveryTableItem[];
  selectedSummary: DeliverySelectedSummary;
  aiNotice: string;
  quickActionsTitle: string;
  quickActions: readonly string[];
}