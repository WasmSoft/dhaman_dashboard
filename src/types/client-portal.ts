import type {
  ApiListResponse,
  PaginatedQueryParams,
} from "@/types/common";

export interface ClientPortalContentMap {
  portal: PortalReviewContent;
  paymentSetup: PortalPaymentSetupContent;
  fundMilestone: PortalFundMilestoneContent;
  tracking: PortalTrackingContent;
  deliveryPreview: PortalDeliveryPreviewContent;
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

export interface PortalPaymentSetupContent {
  title: string;
  description: string;
  eyebrow: string;
  project: {
    title: string;
    meta: string;
  };
  stats: PortalPaymentSetupStat[];
  badges: PortalAgreementBadge[];
  actions: PortalPaymentSetupAction[];
  notice: string;
  details: PortalPaymentSetupDetails;
  paymentOutcome: PortalPaymentSetupOutcome;
}

export interface PortalPaymentSetupStat {
  label: string;
  value: string;
  description: string;
  tone: "green" | "default";
}

export interface PortalPaymentSetupAction {
  label: string;
  icon: "lock" | "file" | "arrow";
  variant: "primary" | "secondary" | "ghost";
}

export interface PortalPaymentSetupDetails {
  summary: {
    title: string;
    rows: Array<{
      label: string;
      value: string;
      tone?: "default" | "muted" | "green";
    }>;
    stages: Array<{
      label: string;
      amount: string;
      status: string;
      tone: "purple" | "blue" | "green";
      current?: boolean;
    }>;
    note: string;
  };
  milestones: {
    title: string;
    description: string;
    items: Array<{
      order: number;
      title: string;
      status: string;
      amount: string;
      dueLabel: string;
      description: string;
      acceptanceCriteria: string[];
      tone: "purple" | "blue" | "green";
      current?: boolean;
    }>;
    aiReview: {
      title: string;
      description: string;
      steps: Array<{
        label: string;
        icon: "flag" | "bot" | "shield" | "check";
        tone: "danger" | "purple" | "blue" | "green";
      }>;
    };
  };
  paymentMethod: {
    title: string;
    options: Array<{
      label: string;
      detail: string;
      icon: "card" | "apple" | "bank";
      selected?: boolean;
      disabled?: boolean;
    }>;
    warning: string;
    fields: Array<{
      label: string;
      value: string;
    }>;
  };
  checklist: {
    title: string;
    items: string[];
    confirmation: string;
  };
  reservation: {
    title: string;
    rows: Array<{
      label: string;
      value: string;
      tone?: "green" | "purple";
    }>;
    primaryAction: string;
    secondaryAction: string;
    warning: string;
    note: string;
  };
  footer: {
    title: string;
    description: string;
    disclaimer: string;
    links: string[];
    copyright: string;
  };
}

export interface PortalPaymentSetupOutcome {
  operationSummary: {
    title: string;
    rows: Array<{
      label: string;
      value: string;
      tone?: "muted" | "green" | "purple" | "subtle";
    }>;
  };
  protection: {
    title: string;
    description: string;
    badge: string;
  };
  afterPayment: {
    title: string;
    steps: string[];
  };
  policies: {
    title: string;
    items: string[];
    actionLabel: string;
  };
  securityNote: {
    title: string;
    description: string;
    badge: string;
  };
}

export interface PortalFundMilestoneContent {
  title: string;
  description: string;
  eyebrow: string;
  milestone: {
    title: string;
    meta: string;
    amount: string;
    amountLabel: string;
    currentStatus: string;
    nextStatus: string;
  };
  badges: PortalAgreementBadge[];
  actions: PortalFundMilestoneAction[];
  notice: string;
  details: PortalFundMilestoneDetails;
  fundOutcome:PortalPaymentSetupOutcome
}

export interface PortalFundMilestoneAction {
  label: string;
  icon: "lock" | "arrow" | "file";
  variant: "primary" | "secondary" | "ghost";
}

export interface PortalFundMilestoneDetails {
  selectedMilestone: {
    title: string;
    badges: PortalAgreementBadge[];
    amount: string;
    rows: Array<{
      label: string;
      value: string;
      tone?: "default" | "muted" | "warning" | "green";
    }>;
    note: string;
  };
  amountSummary: {
    title: string;
    rows: Array<{
      label: string;
      value: string;
      tone?: "default" | "muted" | "green";
    }>;
    totalLabel: string;
    total: string;
    totalHint: string;
    note: string;
  };
  paymentMethod: {
    title: string;
    method: string;
    detail: string;
    status: string;
    warning: string;
  };
  impact: {
    title: string;
    description: string;
    items: Array<{
      title: string;
      description: string;
      tone: "purple" | "warning" | "green" | "blue";
    }>;
    note: string;
  };
  statusChange: {
    title: string;
    beforeLabel: string;
    beforeStatus: string;
    afterLabel: string;
    afterStatus: string;
    amount: string;
    note: string;
  };
  checklist: {
    title: string;
    items: string[];
    confirmation: string;
  };
  reservation: {
    title: string;
    rows: Array<{
      label: string;
      value: string;
      tone?: "green" | "purple";
    }>;
    warning: string;
    primaryAction: string;
    secondaryAction: string;
    note: string;
  };
  footer: {
    title: string;
    description: string;
    disclaimer: string;
  };
}

export interface PortalTrackingContent {
  title: string;
  description: string;
  activeProject: PortalTrackingProject;
  paymentSummary: PortalTrackingPaymentSummary;
  requiredAction: PortalTrackingRequiredAction;
  agreementTimeline: PortalTrackingTimeline;
  progressDetails: PortalTrackingProgressDetails;
  finalSummary: PortalTrackingFinalSummary;
  footer: PortalTrackingFooter;
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

export interface PortalTrackingFinalSummary {
  agreement: {
    title: string;
    rows: Array<{
      label: string;
      value: string;
      tone?: "default" | "green";
    }>;
  };
  nextStep: {
    title: string;
    description: string;
    expectation: string;
    note: string;
  };
  actions: {
    title: string;
    items: Array<{
      label: string;
      icon: "eye" | "copy" | "help" | "review";
      variant: "primary" | "secondary" | "ghost";
      disabled?: boolean;
    }>;
  };
  security: {
    title: string;
    description: string;
    tokenLabel: string;
  };
}

export interface PortalTrackingFooter {
  notice: {
    title: string;
    description: string;
    disclaimer: string;
  };
  links: string[];
  copyright: string;
}

export interface PortalDeliveryPreviewContent {
  title: string;
  description: string;
  hero: PortalDeliveryPreviewHero;
  stageDetails: PortalDeliveryPreviewStageDetails;
  submission: PortalDeliveryPreviewSubmission;
  contextSummary: PortalDeliveryPreviewContextSummary;
  review: PortalDeliveryPreviewReview;
}

export interface PortalDeliveryPreviewHero {
  eyebrow: string;
  title: string;
  meta: string;
  amount: string;
  amountLabel: string;
  uploadedAt: string;
  reviewDeadline: string;
  badges: Array<{
    label: string;
    tone: "warning" | "blue" | "green" | "purple";
  }>;
  actions: Array<{
    label: string;
    icon?: "check" | "bot";
    variant: "accept" | "secondary" | "ai";
  }>;
  note: string;
}

export interface PortalDeliveryPreviewStageDetails {
  title: string;
  rows: Array<{
    label: string;
    value: string;
    tone?: "green" | "purple" | "warning";
  }>;
  note: string;
}

export interface PortalDeliveryPreviewSubmission {
  title: string;
  description: string;
  freelancer: {
    name: string;
    uploadedAt: string;
    avatarLabel: string;
  };
  attachments: Array<{
    title: string;
    meta: string;
    kind: "link" | "file";
    actions: Array<{
      label: string;
      icon: "external-link" | "copy" | "download";
    }>;
  }>;
  summary: {
    label: string;
    text: string;
  };
  notes: {
    label: string;
    text: string;
  };
}

export interface PortalDeliveryPreviewContextSummary {
  payment: {
    title: string;
    rows: Array<{
      label: string;
      value: string;
      tone: "green" | "warning" | "purple";
    }>;
  };
  deadline: {
    title: string;
    value: string;
    unit: string;
    description: string;
    note: string;
  };
  policies: {
    title: string;
    items: string[];
    actionLabel: string;
  };
  project: {
    title: string;
    rows: Array<{
      label: string;
      value: string;
      tone?: "green";
    }>;
  };
  security: {
    title: string;
    description: string;
    badge: string;
  };
}

export interface PortalDeliveryPreviewReview {
  criteria: {
    title: string;
    description: string;
    note: string;
    items: Array<{
      label: string;
      status: string;
      state: "completed" | "review";
    }>;
  };
  decision: {
    title: string;
    description: string;
    note: string;
    options: Array<{
      title: string;
      description: string;
      actionLabel: string;
      tone: "accept" | "revision" | "ai";
    }>;
  };
  flow: {
    title: string;
    cards: Array<{
      title: string;
      tone: "accept" | "revision" | "ai";
      steps: string[];
    }>;
  };
  notice: {
    title: string;
    description: string;
    disclaimer: string;
  };
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
