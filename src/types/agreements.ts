import type {
  ApiItemResponse,
  ApiListResponse,
  PaginatedQueryParams,
} from "@/types/common";

export type AgreementStatus = "draft" | "active" | "expired" | "cancelled";

export interface Agreement {
  id: string;
  clientId: string;
  title: string;
  status: AgreementStatus;
  startDate?: string;
  endDate?: string;
}

export interface AgreementListParams extends PaginatedQueryParams {
  status?: AgreementStatus;
  clientId?: string;
}

export interface AgreementMutationPayload {
  clientId: string;
  title: string;
  status?: AgreementStatus;
  startDate?: string;
  endDate?: string;
}

export type AgreementsListResponse = ApiListResponse<Agreement>;
export type AgreementDetailsResponse = ApiItemResponse<Agreement>;

export type AgreementsMetricTone = "purple" | "amber" | "violet" | "emerald";
export type AgreementsStatusTone = "active" | "review" | "pending" | "ready" | "closed";

export interface AgreementsMetricCard {
  key: string;
  label: string;
  value: string;
  helper: string;
  tone: AgreementsMetricTone;
  icon: "file" | "clock" | "sparkles" | "dollar";
}

export interface AgreementsTableItem {
  id: string;
  project: string;
  code: string;
  client: string;
  clientInitial: string;
  clientTone: "violet" | "blue" | "emerald" | "amber";
  amount: string;
  stage: string;
  status: string;
  statusTone: AgreementsStatusTone;
  lastUpdate: string;
}

export interface AgreementsAiTip {
  label: string;
  tone: "amber" | "emerald";
}

export interface AgreementsMonthlyGoal {
  label: string;
  value: string;
  progress: number;
  tone: "violet" | "emerald";
}

export interface AgreementsContent {
  title: string;
  subtitle: string;
  createLabel: string;
  exportLabel: string;
  filterLabel: string;
  searchPlaceholder: string;
  filterChips: readonly string[];
  metrics: readonly AgreementsMetricCard[];
  tableTitle: string;
  tableBadge: string;
  tableHeaders: readonly string[];
  agreements: readonly AgreementsTableItem[];
  aiTitle: string;
  aiTips: readonly AgreementsAiTip[];
  goalsTitle: string;
  monthlyGoals: readonly AgreementsMonthlyGoal[];
  activityTitle: string;
  activityValue: string;
  activityDescription: string;
}

export interface CreateAgreementStep {
  label: string;
  status: "done" | "active" | "upcoming";
}

export interface CreateAgreementHelpItem {
  label: string;
}

export interface CreateAgreementSummaryItem {
  label: string;
  value: string;
}

export interface CreateAgreementPaymentMethod {
  label: string;
  active?: boolean;
}

export interface CreateAgreementPolicyOption {
  label: string;
  active?: boolean;
}

export interface CreateAgreementContent {
  backLabel: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  progressTitle: string;
  progressValue: string;
  steps: readonly CreateAgreementStep[];
  helpTitle: string;
  helpItems: readonly CreateAgreementHelpItem[];
  summaryTitle: string;
  summaryItems: readonly CreateAgreementSummaryItem[];
  aiButtonLabel: string;
  sections: {
    project: {
      title: string;
      description: string;
      nameLabel: string;
      namePlaceholder: string;
      descriptionLabel: string;
      descriptionPlaceholder: string;
      durationLabel: string;
      durationPlaceholder: string;
      serviceLabel: string;
      servicePlaceholder: string;
      deliveryLabel: string;
    };
    client: {
      title: string;
      description: string;
      nameLabel: string;
      namePlaceholder: string;
      emailLabel: string;
      emailPlaceholder: string;
      phoneLabel: string;
      phonePlaceholder: string;
    };
    payment: {
      title: string;
      description: string;
      amountLabel: string;
      amountPlaceholder: string;
      currencyLabel: string;
      methodsLabel: string;
      methods: readonly CreateAgreementPaymentMethod[];
      milestonesLabel: string;
      milestones: readonly string[];
    };
    policies: {
      title: string;
      description: string;
      options: readonly CreateAgreementPolicyOption[];
      note: string;
    };
  };
  saveDraftLabel: string;
  generateLabel: string;
  footerNote: string;
}

export interface ReviewAgreementChecklistItem {
  label: string;
  done?: boolean;
}

export interface ReviewAgreementSummaryMetric {
  label: string;
  value: string;
  tone?: "emerald" | "violet" | "amber";
}

export interface ReviewAgreementMilestone {
  number: string;
  title: string;
  amount: string;
  duration: string;
  badge: string;
  badgeTone: "emerald" | "amber";
  tasks: readonly string[];
}

export interface ReviewAgreementPolicyCard {
  title: string;
  description: string;
  tone: "amber" | "red" | "violet" | "blue";
}

export interface ReviewAgreementAiNote {
  label: string;
}

export interface ReviewAgreementContent {
  backLabel: string;
  sendLabel: string;
  draftLabel: string;
  warningLabel: string;
  checklistTitle: string;
  checklistItems: readonly ReviewAgreementChecklistItem[];
  financialTitle: string;
  financialMetrics: readonly ReviewAgreementSummaryMetric[];
  chartValues: readonly number[];
  reviewTitle: string;
  reviewAction: string;
  reviewProgress: string;
  aiSummary: string;
  inviteTitle: string;
  inviteDescription: string;
  inviteLink: string;
  deliveryWarning: string;
  heroTitle: string;
  heroDescription: string;
  projectTitle: string;
  projectDescription: string;
  projectMetrics: readonly ReviewAgreementSummaryMetric[];
  milestonesTitle: string;
  milestonesDescription: string;
  milestones: readonly ReviewAgreementMilestone[];
  addMilestoneLabel: string;
  policiesTitle: string;
  policiesDescription: string;
  policies: readonly ReviewAgreementPolicyCard[];
  aiNotesTitle: string;
  aiNotesAction: string;
  aiNotes: readonly ReviewAgreementAiNote[];
  footerBackLabel: string;
  footerNote: string;
}

export type AgreementWorkspaceMetricTone = "violet" | "emerald" | "amber" | "blue";

export type AgreementWorkspacePaymentTone = "reserved" | "review" | "released" | "held";

export interface AgreementWorkspaceSummaryMetric {
  label: string;
  value: string;
  tone: AgreementWorkspaceMetricTone;
}

export interface AgreementWorkspaceMilestone {
  number: string;
  title: string;
  amount: string;
  due: string;
  status: string;
  paymentStatus: string;
  active?: boolean;
  acceptanceCriteria: readonly string[];
  revisionLimit: string;
  operationStatus: string;
}

export interface AgreementWorkspacePaymentSummary {
  label: string;
  value: string;
  tone: AgreementWorkspacePaymentTone;
}

export interface AgreementWorkspacePaymentRow {
  milestone: string;
  amount: string;
  status: string;
  operation: string;
  tone: AgreementWorkspacePaymentTone;
}

export interface AgreementWorkspaceActivityItem {
  title: string;
  description: string;
  time: string;
  tone: AgreementWorkspaceMetricTone;
}

export interface AgreementWorkspaceQuickAction {
  label: string;
  active?: boolean;
}

export interface AgreementWorkspaceContent {
  backLabel: string;
  title: string;
  subtitle: string;
  submitLabel: string;
  portalLabel: string;
  copyInviteLabel: string;
  projectTitle: string;
  projectDescription: string;
  statusLabel: string;
  progressLabel: string;
  progressValue: string;
  summaryMetrics: readonly AgreementWorkspaceSummaryMetric[];
  milestonesTitle: string;
  milestonesDescription: string;
  milestones: readonly AgreementWorkspaceMilestone[];
  detailsLabel: string;
  paymentsTitle: string;
  paymentsDescription: string;
  paymentSummary: readonly AgreementWorkspacePaymentSummary[];
  paymentTableHeaders: readonly string[];
  paymentRows: readonly AgreementWorkspacePaymentRow[];
  activityTitle: string;
  activityDescription: string;
  activities: readonly AgreementWorkspaceActivityItem[];
  quickSummaryTitle: string;
  quickSummaryItems: readonly AgreementWorkspaceSummaryMetric[];
  financialSummaryTitle: string;
  financialSummaryItems: readonly AgreementWorkspacePaymentSummary[];
  quickActionsTitle: string;
  quickActions: readonly AgreementWorkspaceQuickAction[];
  clientPortalTitle: string;
  clientPortalStatus: string;
  clientPortalDescription: string;
  clientPortalLink: string;
  clientPortalAction: string;
  nextStepTitle: string;
  nextStepDescription: string;
  nextStepAction: string;
}

export interface AgreementDeliveryInfoItem {
  label: string;
  value: string;
  icon?: "calendar";
}

export interface AgreementDeliveryRequirement {
  label: string;
}

export interface AgreementDeliveryChecklistItem {
  label: string;
  done?: boolean;
}

export interface AgreementDeliveryAfterSubmitItem {
  number: string;
  label: string;
}

export interface AgreementDeliveryPaymentStatus {
  beforeLabel: string;
  beforeValue: string;
  afterLabel: string;
  afterValue: string;
  amount: string;
  note: string;
}

export interface AgreementDeliveryLinkType {
  label: string;
  active?: boolean;
}

export interface AgreementDeliveryContent {
  backLabel: string;
  title: string;
  subtitle: string;
  infoItems: readonly AgreementDeliveryInfoItem[];
  statusChips: readonly string[];
  linkTitle: string;
  linkTypes: readonly AgreementDeliveryLinkType[];
  linkLabel: string;
  linkPlaceholder: string;
  linkHelp: string;
  attachmentTitle: string;
  attachmentFileName: string;
  attachmentStatus: string;
  summaryTitle: string;
  summaryLabel: string;
  summaryPlaceholder: string;
  summaryHelp: string;
  notesTitle: string;
  notesOptional: string;
  notesLabel: string;
  notesPlaceholder: string;
  notesHelp: string;
  confirmationTitle: string;
  confirmationLabel: string;
  confirmationWarning: string;
  footerNote: string;
  cancelLabel: string;
  draftLabel: string;
  sendLabel: string;
  requirementsTitle: string;
  requirements: readonly AgreementDeliveryRequirement[];
  requirementsNote: string;
  checklistTitle: string;
  checklist: readonly AgreementDeliveryChecklistItem[];
  afterSubmitTitle: string;
  afterSubmitItems: readonly AgreementDeliveryAfterSubmitItem[];
  paymentStatusTitle: string;
  paymentStatus: AgreementDeliveryPaymentStatus;
}

export interface AgreementsContentMap {
  agreementsPage: AgreementsContent;
  createAgreementPage: CreateAgreementContent;
  reviewAgreementPage: ReviewAgreementContent;
  agreementWorkspacePage: AgreementWorkspaceContent;
  agreementDeliveryPage: AgreementDeliveryContent;
}
