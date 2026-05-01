export type PaymentStatus =
  | "WAITING"
  | "RESERVED"
  | "CLIENT_REVIEW"
  | "AI_REVIEW"
  | "READY_TO_RELEASE"
  | "RELEASED"
  | "ON_HOLD"
  | "FAILED"
  | "REFUNDED"
  | "NOT_REQUIRED";

export type AgreementStatus =
  | "DRAFT"
  | "SENT"
  | "APPROVED"
  | "ACTIVE"
  | "COMPLETED"
  | "CANCELLED"
  | "DISPUTED";

export type MilestoneStatus =
  | "DRAFT"
  | "ACTIVE"
  | "IN_REVIEW"
  | "ACCEPTED"
  | "CHANGES_REQUESTED"
  | "CANCELLED";

export type DeliveryStatus =
  | "DRAFT"
  | "NOT_SUBMITTED"
  | "SUBMITTED"
  | "CLIENT_REVIEW"
  | "IN_REVIEW"
  | "ACCEPTED"
  | "CHANGES_REQUESTED"
  | "DISPUTED";

export type AIReviewStatus = "PENDING" | "PROCESSING" | "COMPLETED" | "FAILED";

export type AIRecommendation =
  | "ACCEPT"
  | "REJECT"
  | "PARTIAL"
  | "NEEDS_HUMAN_REVIEW";

export type ChangeRequestStatus =
  | "PENDING"
  | "APPROVED"
  | "DECLINED"
  | "PAID";

export type TimelineEventType =
  | "AGREEMENT_CREATED"
  | "AGREEMENT_SENT"
  | "AGREEMENT_APPROVED"
  | "MILESTONE_CREATED"
  | "PAYMENT_RESERVED"
  | "PAYMENT_RELEASED"
  | "DELIVERY_SUBMITTED"
  | "CHANGE_REQUEST_CREATED"
  | "CHANGE_REQUEST_APPROVED"
  | "CHANGE_REQUEST_DECLINED"
  | "AI_REVIEW_REQUESTED"
  | "AI_REVIEW_COMPLETED"
  | "EMAIL_SENT";

export interface DashboardContentMap {
  dashboard: DashboardContent;
}

export interface DashboardMetric {
  key: string;
  label: string;
  value: string;
  trend: string;
  trendTone: "positive" | "negative";
  icon: DashboardIconName;
}

export interface DashboardSummaryResponse {
  metrics: DashboardMetric[];
  generatedAt: string;
}

export type DashboardIconName =
  | "grid"
  | "file"
  | "check"
  | "clock"
  | "pen"
  | "users"
  | "chart"
  | "settings"
  | "help"
  | "logout"
  | "wallet"
  | "download"
  | "calendar"
  | "bell"
  | "mail"
  | "target"
  | "search"
  | "filter"
  | "plus";

export interface DashboardNavItem {
  label: string;
  href: string;
  icon: DashboardIconName;
  badge?: string;
  active?: boolean;
}

export interface DashboardNavGroup {
  label: string;
  items: readonly DashboardNavItem[];
}

export interface DashboardAgreementItem {
  id: string;
  title: string;
  code: string;
  amount: string;
  status: string;
  statusTone: "success" | "purple" | "blue" | "muted";
  emoji: string;
}

export interface DashboardReviewItem {
  title: string;
  description: string;
  progress: number;
  tone: "purple" | "amber" | "emerald";
  icon: DashboardIconName;
}

export interface DashboardTransactionItem {
  title: string;
  description: string;
  date: string;
  amount: string;
  status: string;
  statusTone: "success" | "purple" | "blue";
  emoji: string;
}

export interface DashboardChartBar {
  month: string;
  value: number;
  label?: string;
  active?: boolean;
}

export interface DashboardContent {
  brandName: string;
  greeting: string;
  subtitle: string;
  currentDate: string;
  searchPlaceholder: string;
  navGroups: readonly DashboardNavGroup[];
  metrics: readonly DashboardMetric[];
  chartBars: readonly DashboardChartBar[];
  agreements: readonly DashboardAgreementItem[];
  reviews: readonly DashboardReviewItem[];
  transactions: readonly DashboardTransactionItem[];
}

// AR: أنواع نطاق تاريخ لوحة التحكم والاستعلامات والاستجابات للمرحلة النهائية.
// EN: Dashboard date range, query inputs, and wire-shape response types for the Final Phase.
export type DashboardDateRange = "7d" | "30d" | "90d" | "all";

export interface DashboardOverviewQuery {
  range?: DashboardDateRange;
  currency?: string;
}

export interface DashboardActionsQuery {
  limit?: number;
  type?: "payments" | "deliveries" | "ai_reviews" | "change_requests" | "all";
}

export interface DashboardRecentActivityQuery {
  limit?: number;
  agreementId?: string;
  type?: TimelineEventType;
}

export interface DashboardOverviewResponse {
  metrics: DashboardOverviewMetric[];
  paymentSummary: DashboardPaymentSummary;
  agreementSummary: DashboardAgreementSummary;
  clientSummary: { count: number };
  range: DashboardDateRange;
  currency: string;
}

export interface DashboardOverviewMetric {
  key: string;
  labelKey: string;
  value: string;
  icon: DashboardIconName;
}

export interface DashboardPaymentSummary {
  protectedAmount: string;
  releasedAmount: string;
  pendingAmount: string;
  byStatus: Record<PaymentStatus, string>;
  currency: string;
}

export interface DashboardAgreementSummary {
  total: number;
  byStatus: Record<AgreementStatus, number>;
  totalContractValue: string;
}

export interface DashboardActionsRequiredResponse {
  items: DashboardActionItem[];
  totalAvailable: number;
}

export interface DashboardActionItem {
  id: string;
  category: "payments" | "deliveries" | "ai_reviews" | "change_requests";
  titleKey: string;
  params: Record<string, string>;
  agreementId: string;
  targetRoute: string;
}

export interface DashboardRecentActivityResponse {
  events: DashboardActivityEvent[];
  hasMore: boolean;
}

export interface DashboardActivityEvent {
  id: string;
  type: TimelineEventType;
  titleKey: string;
  descriptionKey: string;
  params: Record<string, string>;
  actorRole: "FREELANCER" | "CLIENT" | "SYSTEM";
  agreementId: string;
  createdAt: string;
}

export type DashboardErrorCode =
  | "DASHBOARD_RANGE_INVALID"
  | "DASHBOARD_AGGREGATION_FAILED"
  | "AGREEMENT_NOT_FOUND"
  | "VALIDATION_ERROR"
  | "UNAUTHORIZED";

export interface DashboardErrorBody {
  code: DashboardErrorCode;
  message: string;
  requestId?: string;
  correlationId?: string;
}

// AR: دورة حياة البطاقة — كل سطح يمر بإحدى هذه الحالات.
// EN: Card lifecycle — each surface is in exactly one of these states.
export type DashboardCardLifecycle<TData> =
  | { state: "loading" }
  | { state: "empty" }
  | { state: "error"; code: DashboardErrorCode; retry: () => void }
  | { state: "data"; data: TData };
