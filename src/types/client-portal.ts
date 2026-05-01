import type {
  ApiListResponse,
  PaginatedQueryParams,
} from "@/types/common";

export interface ClientPortalContentMap {
  portal: PortalReviewContent;
  paymentSetup: PortalPaymentSetupContent;
  paymentConfirmation: PortalPaymentConfirmationContent;
  paymentHistory: PortalPaymentHistoryContent;
  releasePayment: PortalReleasePaymentContent;
  changeRequestPayment: PortalChangeRequestPaymentContent;
  fundMilestone: PortalFundMilestoneContent;
  tracking: PortalTrackingContent;
  deliveryPreview: PortalDeliveryPreviewContent;
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
  id?: string;
  milestoneId?: string;
  milestoneName?: string;
  label: string;
  amount: string | number;
  currency?: string | null;
  status?: string | null;
  fundedAt?: string | null;
  releasedAt?: string | null;
  percent?: number;
  description?: string | null;
  colorClassName?: string;
  dotClassName?: string;
}

export interface PortalMilestone {
  id: string;
  title: string;
  amount: string | number;
  summary?: string;
  description?: string | null;
  acceptanceCriteria?: string[];
  currency?: string | null;
  status?: string | null;
  progress?: number | null;
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

export interface PortalPaymentConfirmationContent {
  title: string;
  description: string;
  hero: {
    eyebrow: string;
    heading: string;
    meta: string;
    description: string;
    amountLabel: string;
    amount: string;
    amountStatus: string;
    badges: PortalAgreementBadge[];
    primaryAction: string;
    secondaryActions: PortalPaymentConfirmationAction[];
  };
  receipt: {
    title: string;
    receiptId: string;
    rows: Array<{
      label: string;
      value: string;
    }>;
    totals: Array<{
      label: string;
      value: string;
      tone?: "default" | "muted" | "green";
    }>;
    badges: string[];
    note: string;
  };
  fundedMilestone: {
    title: string;
    amount: string;
    heading: string;
    project: string;
    rows: Array<{
      label: string;
      value: string;
      tone?: "default" | "muted" | "green" | "purple";
    }>;
    acceptanceCriteria: string[];
    note: string;
  };
  protection: {
    title: string;
    beforeLabel: string;
    beforeStatus: string;
    currentLabel: string;
    currentStatus: string;
    note: string;
    items: Array<{
      title: string;
      description: string;
    }>;
  };
  nextSteps: {
    title: string;
    steps: Array<{
      title: string;
      description: string;
      state: "completed" | "current" | "upcoming";
    }>;
  };
  receiptActions: {
    title: string;
    items: PortalPaymentConfirmationActionCard[];
  };
  portalPreview: {
    title: string;
    stats: Array<{
      value: string;
      label: string;
      tone: "green" | "blue" | "purple" | "default";
    }>;
    note: string;
    statusLabel: string;
  };
  trustFooter: {
    title: string;
    description: string;
    disclaimer: string;
    links: string[];
    copyright: string;
  };
  quickSummary: {
    operationSummary: {
      title: string;
      rows: Array<{
        label: string;
        value: string;
        tone?: "default" | "muted" | "green" | "purple";
      }>;
    };
    paymentMethod: {
      title: string;
      rows: Array<{
        label: string;
        value: string;
        tone?: "default" | "green";
      }>;
    };
    agreementSummary: {
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
      note: string;
      actionLabel: string;
    };
    demoNote: {
      title: string;
      description: string;
      badge: string;
    };
  };
}

export interface PortalPaymentConfirmationAction {
  label: string;
  icon: "receipt" | "copy" | "arrow";
  variant: "primary" | "secondary" | "ghost";
}

export interface PortalPaymentConfirmationActionCard {
  title: string;
  description: string;
  actionLabel: string;
  icon: "download" | "copy" | "share" | "arrow";
}

export interface PortalPaymentHistoryContent {
  title: string;
  description: string;
  hero: {
    eyebrow: string;
    projectTitle: string;
    parties: string;
    badges: PortalAgreementBadge[];
    stats: Array<{
      value: string;
      label: string;
      tone: "purple" | "blue" | "green" | "amber";
    }>;
    actions: Array<{
      label: string;
      icon: "arrow" | "download" | "copy";
      variant: "primary" | "secondary" | "ghost";
    }>;
    note: string;
  };
  summaryCards: Array<{
    value: string;
    label: string;
    description: string;
    tone: "purple" | "blue" | "green" | "amber";
    icon: "wallet" | "lock" | "check" | "clock";
  }>;
  sidebar: {
    financialSummary: {
      title: string;
      rows: Array<{
        label: string;
        value: string;
      }>;
      progress: {
        reservedLabel: string;
        remainingLabel: string;
        reservedPercent: number;
      };
    };
    currentStatus: {
      title: string;
      description: string;
      badge: string;
      actionLabel: string;
    };
    receiptShortcuts: {
      title: string;
      items: Array<{
        label: string;
        icon: "download" | "copy";
      }>;
    };
    releaseRules: {
      title: string;
      items: string[];
    };
    demoNote: {
      title: string;
      description: string;
      badge: string;
    };
  };
  paymentsWorkspace: {
    filters: {
      chips: string[];
      searchPlaceholder: string;
      selects: string[];
    };
    operations: {
      title: string;
      count: string;
      columns: string[];
      rows: Array<{
        action: string;
        stage: string;
        amount: string;
        status: string;
        statusTone: "purple" | "blue" | "amber";
        paymentMethod: string;
        receipt: string;
        date: string;
        actionLabel: string;
      }>;
    };
    selectedReceipt: {
      title: string;
      selectedLabel: string;
      rows: Array<{
        label: string;
        value: string;
      }>;
      amount: string;
      amountLabel: string;
      note: string;
      actions: Array<{
        label: string;
        icon: "download" | "copy" | "external" | "arrow";
      }>;
      disclaimer: string;
    };
    stageStatuses: {
      title: string;
      description: string;
      items: Array<{
        order: string;
        stage: string;
        description: string;
        amount: string;
        status: string;
        statusTone: "purple" | "amber";
      }>;
    };
    timeline: {
      title: string;
      items: Array<{
        state: "completed" | "current" | "upcoming";
        title: string;
        description: string;
        meta: string;
      }>;
    };
    footerNotice: {
      title: string;
      description: string;
      disclaimer: string;
      links: string[];
      copyright: string;
    };
  };
}

export interface PortalReleasePaymentContent {
  title: string;
  description: string;
  hero: {
    title: string;
    meta: string;
    eyebrow: string;
    badges: PortalAgreementBadge[];
    note: string;
    amount: string;
    amountLabel: string;
    stageLabel: string;
    fromStatus: string;
    toStatus: string;
    actions: Array<{
      label: string;
      icon: "check" | "arrow" | "history";
      variant: "primary" | "secondary" | "ghost";
    }>;
  };
  acceptedDelivery: {
    title: string;
    statusLabel: string;
    rows: Array<{
      label: string;
      value: string;
      icon: "user" | "clock" | "link" | "file";
    }>;
    notes: Array<{
      title: string;
      description: string;
    }>;
    actions: string[];
  };
  releaseSummary: {
    title: string;
    amount: string;
    currency: string;
    rows: Array<{
      label: string;
      value: string;
    }>;
    transition: {
      fromLabel: string;
      fromStatus: string;
      toLabel: string;
      toStatus: string;
      note: string;
    };
  };
  acceptanceConditions: {
    title: string;
    description: string;
    items: string[];
    note: string;
  };
  releaseDecision: {
    title: string;
    amount: string;
    heading: string;
    description: string;
    outcome: string;
    noteLabel: string;
    notePlaceholder: string;
    noteCount: string;
  };
  confirmationChecklist: {
    title: string;
    items: string[];
    finalConfirmation: string;
    warning: string;
  };
  confirmRelease: {
    title: string;
    summary: Array<{
      label: string;
      value: string;
    }>;
    primaryAction: string;
    secondaryActions: string[];
    note: string;
  };
  afterConfirmation: {
    title: string;
    steps: Array<{
      state: "now" | "upcoming";
      title: string;
      description: string;
    }>;
  };
  footerNotice: {
    title: string;
    description: string;
    disclaimer: string;
    links: string[];
    copyright: string;
  };
  recap: {
    releaseSummary: {
      title: string;
      rows: Array<{
        label: string;
        value: string;
      }>;
    };
    delivery: {
      title: string;
      rows: Array<{
        label: string;
        value: string;
      }>;
      action: string;
    };
    progress: {
      title: string;
      rows: Array<{
        label: string;
        value: string;
      }>;
      progressLabel: string;
    };
    rules: {
      title: string;
      items: string[];
    };
    demo: {
      title: string;
      description: string;
      badge: string;
    };
  };
}

export interface PortalChangeRequestPaymentContent {
  title: string;
  description: string;
  hero: {
    eyebrow: string;
    title: string;
    meta: string;
    project: string;
    badges: PortalAgreementBadge[];
    note: string;
    amount: string;
    amountLabel: string;
    status: string;
    duration: string;
    originalPayment: string;
    actions: Array<{
      label: string;
      icon: "check" | "reject" | "arrow";
      variant: "primary" | "secondary" | "ghost";
    }>;
  };
  whyChangeRequest: {
    title: string;
    aiLabel: string;
    description: string;
    items: string[];
  };
  scopeComparison: {
    title: string;
    original: {
      title: string;
      subtitle: string;
      items: string[];
      status: string;
      amount: string;
    };
    requested: {
      title: string;
      subtitle: string;
      items: string[];
      status: string;
      amount: string;
      duration: string;
    };
  };
  requestDetails: {
    title: string;
    rows: Array<{
      label: string;
      value: string;
    }>;
    reason: string;
    deliveries: string[];
    acceptanceCriteria: string[];
  };
  paymentSummary: {
    title: string;
    rows: Array<{
      label: string;
      value: string;
    }>;
    totalLabel: string;
    total: string;
    note: string;
  };
  paymentMethod: {
    title: string;
    description: string;
    method: string;
    cardNumber: string;
    cardHolder: string;
    status: string;
    action: string;
    cardPreview: {
      brand: string;
      maskedNumber: string;
      holder: string;
    };
    note: string;
  };
  flow: {
    title: string;
    description: string;
    steps: string[];
  };
  statusUpdate: {
    title: string;
    amount: string;
    beforeLabel: string;
    beforeStatus: string;
    afterLabel: string;
    afterStatus: string;
    note: string;
  };
  checklist: {
    title: string;
    items: string[];
    confirmation: string;
  };
  confirmPayment: {
    title: string;
    rows: Array<{
      label: string;
      value: string;
    }>;
    primaryAction: string;
    secondaryActions: string[];
  };
  afterPayment: {
    title: string;
    steps: string[];
  };
  footerNotice: {
    title: string;
    description: string;
    disclaimer: string;
    links: string[];
    copyright: string;
  };
  recap: {
    requestSummary: {
      title: string;
      rows: Array<{
        label: string;
        value: string;
      }>;
    };
    originalPayment: {
      title: string;
      rows: Array<{
        label: string;
        value: string;
      }>;
      badge: string;
    };
    afterPayment: {
      title: string;
      items: string[];
    };
    policy: {
      title: string;
      description: string;
    };
    demo: {
      title: string;
      description: string;
      badge: string;
    };
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
  hero?: PortalDeliveryPreviewHero;
  stageDetails?: PortalDeliveryPreviewStageDetails;
  submission?: PortalDeliveryPreviewSubmission;
  contextSummary?: PortalDeliveryPreviewContextSummary;
  review?: PortalDeliveryPreviewReview;
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
  sender?: string;
  badges?: Array<{ label: string; className: string }>;
  status: "draft" | "active" | "expired";
  updatedAt: string;
}

export type ClientPortalAgreementsParams = PaginatedQueryParams;

export type ClientPortalAgreementsResponse =
  ApiListResponse<ClientPortalAgreement>;

export interface PortalInviteMilestoneSummary {
  id: string;
  title: string;
  description?: string | null;
  amount?: number | null;
  currency?: string | null;
}

export interface PortalPolicySummary {
  title: string;
  description: string;
}

export interface PortalInvitePaymentSummary {
  id: string;
  milestoneId?: string | null;
  milestoneName: string;
  amount: number;
  currency: string;
  status?: string | null;
}

export interface PortalInviteResponse {
  agreement: {
    id: string;
    title: string;
    description: string | null;
    status: string;
    sentAt: string | null;
  };
  freelancer: {
    name: string;
    email: string;
  };
  client: {
    name: string;
    email: string;
  };
  milestones: PortalInviteMilestoneSummary[];
  policies: PortalPolicySummary[] | null;
  paymentPlan: PortalInvitePaymentSummary[];
}

export interface PortalDeliverySummary {
  id: string;
  milestoneId?: string | null;
  milestoneName: string;
  status: string;
  submittedAt: string;
}

export interface PortalChangeRequestSummary {
  id: string;
  title?: string | null;
  status: string;
  amount?: number | null;
  currency?: string | null;
}

export interface PortalPaymentSummary {
  id: string;
  milestoneId?: string | null;
  milestoneName: string;
  amount: number;
  currency: string;
  status: string;
}

export interface PortalTimelineEvent {
  id: string;
  eventType: string;
  actorRole: string;
  occurredAt: string;
  description: string | null;
}

export interface PortalWorkspaceResponse {
  agreement: {
    id: string;
    title: string;
    status: string;
    approvedAt: string | null;
  };
  freelancer: {
    name: string;
  };
  client?: {
    name: string;
  };
  milestones: PortalMilestone[];
  payments: PortalPaymentSummary[];
  deliveries: PortalDeliverySummary[];
  changeRequests: PortalChangeRequestSummary[];
  timelineSummary: PortalTimelineEvent[];
}

export interface PortalDeliveryReview {
  reason?: string | null;
  requestedChanges?: string[] | null;
  reviewedAt?: string | null;
}

export interface PortalDelivery {
  id: string;
  milestoneId: string;
  milestoneName: string;
  status: string;
  submittedAt: string;
  content: string;
  attachments: string[];
  review: PortalDeliveryReview | null;
}

export interface PortalPaymentHistoryItem {
  id: string;
  paymentId: string;
  type: string;
  amount: number;
  currency: string;
  occurredAt: string;
  note: string | null;
}

export interface PortalActionResponse {
  agreementId: string;
  status: string;
  message: string;
  timelineEventId?: string | null;
}

export interface PortalRequestChangesPayload {
  reason: string;
  requestedChanges?: string[] | null;
}

export interface PortalRejectAgreementPayload {
  reason: string;
}

