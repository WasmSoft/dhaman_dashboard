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
  parties: PortalParty[];
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

export interface PortalParty {
  name: string;
  role: string;
  email: string;
  responsibility: string;
  initial: string;
  className: string;
  avatarClassName: string;
  avatarTextClassName: string;
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
  colorClassName?: string;
  dotClassName?: string;
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
  statusRows: PortalTrackingStatusRow[];
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

export interface PortalTrackingStatusRow {
  label: string;
  value: string;
  tone: "purple" | "amber";
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
