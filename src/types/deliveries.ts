import type { ApiItemResponse } from "./common";
import type { MilestoneStatus, PaymentStatus } from "./dashboard";

// AR: أنواع التسليمات المشتركة بين الواجهة القديمة وتدفّقات البيانات الأحدث.
// EN: Shared delivery types used by both the legacy UI flow and the newer data-driven flows.
export type DeliveryStatus =
  | "DRAFT"
  | "NOT_SUBMITTED"
  | "SUBMITTED"
  | "CLIENT_REVIEW"
  | "IN_REVIEW"
  | "CHANGES_REQUESTED"
  | "ACCEPTED"
  | "DISPUTED";

export type DeliveryRecordStatus = Exclude<DeliveryStatus, "NOT_SUBMITTED" | "IN_REVIEW">;
export type DeliveryStatusValue = DeliveryStatus;

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
  status?: DeliveryRecordStatus;
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

export type CreateDeliveryInput = CreateDeliveryPayload;

export type UpdateDeliveryInput = UpdateDeliveryPayload;

export type SubmitDeliveryInput = SubmitDeliveryPayload;

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
export type DeliveryPortalSummaryResponse = ApiItemResponse<PortalDeliverySummaryDto>;
export type DeliveryPortalWorkspaceResponse = ApiItemResponse<PortalWorkspaceResponseDto>;
export type DeliveryPortalActionResponse = ApiItemResponse<PortalDeliveryActionDto>;

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
