import type {
  ApiListResponse,
  PaginatedQueryParams,
} from "@/types/common";

export interface ClientPortalContentMap {
  portal: PortalReviewContent;
  tracking: PortalTrackingContent;
}

export interface PortalReviewContent {
  title: string;
  description: string;
  agreement: PortalAgreement;
  project: PortalProjectSummary;
  payments: PortalPayment[];
  milestones: PortalMilestone[];
  policies: PortalPolicy[];
  aiReviewSteps: PortalAiReviewStep[];
  securityNotice: PortalSecurityNotice;
  footerText: string;
}

export interface PortalAgreementBadge {
  label: string;
  className: string;
}

export interface PortalAgreement {
  sender: string;
  title: string;
  total: string;
  currency: string;
  stagesLabel: string;
  paymentTiming: string;
  badges: PortalAgreementBadge[];
}

export interface PortalProjectSummary {
  title: string;
  description: string;
  details: Array<{
    label: string;
    value: string;
  }>;
  roles: Array<{
    title: string;
    description: string;
    className: string;
  }>;
}

export interface PortalPayment {
  label: string;
  amount: string;
  percent: number;
  description: string;
}

export interface PortalMilestone {
  id: string;
  title: string;
  amount: string;
  summary: string;
  description: string;
  acceptanceCriteria: string[];
}

export interface PortalPolicy {
  title: string;
  description: string;
  className: string;
}

export interface PortalAiReviewStep {
  order: number;
  label: string;
}

export interface PortalSecurityNotice {
  title: string;
  description: string;
  disclaimer: string;
}

export interface PortalTrackingContent {
  title: string;
  description: string;
  activeProject: PortalTrackingProject;
  paymentSummary: PortalTrackingPaymentSummary;
  requiredAction: PortalTrackingRequiredAction;
  agreementTimeline: PortalTrackingTimeline;
  progressDetails: PortalTrackingProgressDetails;
}

export interface PortalTrackingProject {
  eyebrow: string;
  title: string;
  freelancer: string;
  client: string;
  totalLabel: string;
  total: string;
  stagesLabel: string;
  progressLabel: string;
  progressValue: string;
  stageLabels: string[];
  badges: PortalAgreementBadge[];
  primaryAction: string;
  secondaryAction: string;
}

export interface PortalTrackingPaymentSummary {
  title: string;
  description: string;
  stats: PortalTrackingPaymentStat[];
  note: string;
}

export interface PortalTrackingPaymentStat {
  label: string;
  value: string;
  description: string;
  tone: "default" | "purple" | "blue" | "green";
}

export interface PortalTrackingRequiredAction {
  title: string;
  heading: string;
  description: string;
  status: string;
  expectation: string;
  note: string;
  actions: string[];
}

export interface PortalTrackingTimeline {
  title: string;
  description: string;
  steps: PortalTrackingTimelineStep[];
}

export interface PortalTrackingTimelineStep {
  title: string;
  time?: string;
  description: string;
  status?: string;
  state: "completed" | "current" | "upcoming";
}

export interface PortalTrackingProgressDetails {
  milestones: PortalTrackingMilestonesSection;
  policies: PortalTrackingPoliciesSection;
  dispute: PortalTrackingDisputeSection;
}

export interface PortalTrackingMilestonesSection {
  title: string;
  description: string;
  items: PortalTrackingMilestone[];
}

export interface PortalTrackingMilestone {
  order: number;
  title: string;
  status: string;
  escrowStatus: string;
  amount: string;
  dueLabel: string;
  deliveryLabel?: string;
  deliveryStatus?: string;
  acceptanceTitle?: string;
  acceptanceCriteria?: string[];
  revisionPrefix?: string;
  revisionHighlight?: string;
  revisionSuffix?: string;
  defaultOpen?: boolean;
}

export interface PortalTrackingPoliciesSection {
  title: string;
  description: string;
  actionLabel: string;
  items: PortalTrackingPolicy[];
}

export interface PortalTrackingPolicy {
  title: string;
  description: string;
  tone: "warning" | "danger" | "blue" | "purple";
}

export interface PortalTrackingDisputeSection {
  title: string;
  description: string;
  steps: PortalTrackingDisputeStep[];
}

export interface PortalTrackingDisputeStep {
  order: number;
  label: string;
  tone: "danger" | "purple" | "blue" | "green";
}

export interface ClientPortalOverview {
  activeAgreements: number;
  pendingInvoices: number;
  unreadNotifications: number;
}

export interface ClientPortalAgreement {
  id: string;
  title: string;
  status: "draft" | "active" | "expired";
  updatedAt: string;
}

export type ClientPortalAgreementsParams = PaginatedQueryParams;

export type ClientPortalAgreementsResponse =
  ApiListResponse<ClientPortalAgreement>;
