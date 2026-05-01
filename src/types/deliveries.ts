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

export type DeliveryMetricTone = "amber" | "violet" | "emerald" | "red";
export type DeliveryStatusTone = "review" | "change" | "accepted" | "pending" | "ai";
export type DeliveryPaymentTone = "client" | "hold" | "ready" | "reserved" | "ai";

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