// AR: أنواع بيانات صفحة مراجعات الذكاء الاصطناعي.
// EN: AI Review page data types.

export type AIReviewStatus =
  | "نشط"
  | "تحليل"
  | "تنبيه"
  | "مجمّد";

export type AIReviewResultLabel =
  | "خارج النطاق"
  | "قيد التحليل"
  | "تعديل مطلوب"
  | "طلب إضافي"
  | "بانتظار بدء المراجعة";

export type AIReviewBadgeLabel =
  | "توصية جاهزة"
  | "بانتظار AI"
  | "مفتوحة"
  | "تم الحل";

export type AIPayStatusLabel =
  | "Ready to Release"
  | "AI Review"
  | "On Hold"
  | "Released";

export type AIReviewActionLabel =
  | "عرض المراجعة"
  | "متابعة الحالة"
  | "عرض النتيجة"
  | "بدء المراجعة";

export interface AIReviewStat {
  key: string;
  value: string;
  label: string;
  description: string;
  status: AIReviewStatus;
}

export interface AIReviewFulfilledCriterion {
  text: string;
  fulfilled: boolean;
}

export interface AIReviewDetailBadge {
  label: string;
  tone: "success" | "purple" | "amber" | "red" | "cyan" | "blue" | "muted";
}

export interface AIReviewDeliverableFile {
  name: string;
  description: string;
  type: "link" | "file";
}

export interface AIReviewCriteriaAnalysis {
  criterion: string;
  evidence: string;
  status: "مكتمل" | "مكتمل جزئيًا" | "خارج النطاق";
}

export interface AIReviewSuggestedAction {
  title: string;
  description: string;
  buttonLabel: string;
}

export interface AIReviewDetail {
  aiAnalysis: string;
  fulfilledCriteria: AIReviewFulfilledCriterion[];
  outOfScopeNote: string;
  paymentRecommendation: string;
  paymentRecommendationText: string;
  reviewTitle: string;
  reviewDescription: string;
  aiNote: string;
  badges: AIReviewDetailBadge[];
  agreementValue: string;
  stageValue: string;
  amountValue: string;
  openedValue: string;
  updatedValue: string;
  confidenceScore: number;
  confidenceLabel: string;
  recommendationTitle: string;
  recommendationSummary: string;
  recommendationDetail: string;
  objectionQuote: string;
  objectionType: string;
  relatedCriterionLabel: string;
  relatedCriterionValue: string;
  objectionAINote: string;
  stageTermsDetails: {
    stageName: string;
    amount: string;
    duration: string;
    amendments: string;
  };
  outOfScopeStageNote: string;
  paymentReleaseNote: string;
  deliverableUploader: string;
  deliverableUploadTime: string;
  deliverableStatusLabel: string;
  deliverableDescription: string;
  deliverableFiles: AIReviewDeliverableFile[];
  criteriaAnalysisDescription: string;
  criteriaAnalysis: AIReviewCriteriaAnalysis[];
  reasonExplanation: string;
  reasonPoints: string[];
  suggestedActions: AIReviewSuggestedAction[];
}

export interface AIReviewRow {
  id: string;
  projectName: string;
  clientName: string;
  stage: string;
  objection: string;
  reviewBadge: AIReviewBadgeLabel;
  aiResult: AIReviewResultLabel;
  payStatus: AIPayStatusLabel;
  amount: string;
  matchScore: number | null;
  updatedAt: string;
  actionLabel: AIReviewActionLabel;
  showEyeIcon: boolean;
  detail: AIReviewDetail;
}

export type AIReviewFilterTab =
  | "الكل"
  | "تم الحل"
  | "خارج النطاق"
  | "توصية جاهزة"
  | "بانتظار AI"
  | "مفتوحة";

export interface AIReviewFilterDropdown {
  key: string;
  label: string;
}

export interface AIReviewDetailPageLabels {
  backButtonLabel: string;
  pageTitle: string;
  pageDescription: string;
  approveRecommendationLabel: string;
  openWorkspaceLabel: string;
  copySummaryLabel: string;
  aiRecommendationLabel: string;
  clientObjectionLabel: string;
  stageTermsLabel: string;
  uploadedDeliverableLabel: string;
  uploadedByLabel: string;
  uploadTimeLabel: string;
  criteriaAnalysisLabel: string;
  reasonLabel: string;
  suggestedActionsLabel: string;
  openLinkLabel: string;
  downloadLabel: string;
  copyDeliverableLinkLabel: string;
  downloadFileLabel: string;
  openDeliverableLinkLabel: string;
  createChangeRequestLabel: string;
  shareSummaryLabel: string;
  createChangeRequestShortLabel: string;
  acceptRecommendationShortLabel: string;
  stageNameLabel: string;
  amountLabel: string;
  durationLabel: string;
  amendmentsLabel: string;
  acceptanceCriteriaLabel: string;
  criterionLabel: string;
  evidenceLabel: string;
  statusLabel: string;
  objectionTypeLabel: string;
  relatedCriterionLabel: string;
}

export interface AIReviewContentMap {
  aiReview: {
    pageTitle: string;
    pageDescription: string;
    exportLabel: string;
    searchPlaceholder: string;
    stats: AIReviewStat[];
    filterTabs: { label: AIReviewFilterTab; count: number }[];
    filterDropdowns: AIReviewFilterDropdown[];
    tableHeaders: string[];
    rows: AIReviewRow[];
  };
  detailPage: AIReviewDetailPageLabels;
}

// ─── API Integration Types ───────────────────────────────────────────────────
// AR: أنواع طلبات واستجابات API لمراجعات الذكاء الاصطناعي.
// EN: API request/response types for AI Review endpoints.

export type AIReviewApiStatus = "PENDING" | "PROCESSING" | "COMPLETED" | "FAILED";

export type AIReviewApiRecommendation =
  | "ACCEPT"
  | "REJECT"
  | "PARTIAL"
  | "NEEDS_HUMAN_REVIEW";

export type AIReviewApiRole = "CLIENT" | "FREELANCER";

export interface AIReviewApiItem {
  id: string;
  agreementId: string;
  milestoneId: string;
  deliveryId: string | null;
  status: AIReviewApiStatus;
  matchScore: number | null;
  recommendation: AIReviewApiRecommendation | null;
  reasoning: string | null;
  completedCriteria: string[] | null;
  missingCriteria: string[] | null;
  outOfScopeItems: string[] | null;
  objection: string;
  requestedByRole: AIReviewApiRole;
  createdAt: string;
  updatedAt: string;
}

export interface AIReviewApiListResponse {
  reviews: AIReviewApiItem[];
  total: number;
}

export interface AIReviewApiDetailResponse {
  data: AIReviewApiItem;
}

export interface AcceptRecommendationApiResponse {
  review: AIReviewApiItem;
  paymentStatus: string;
  changeRequestsCreated: number;
}

export interface OpenAiReviewPayload {
  objection: string;
  relatedCriteria?: string[];
}

export interface GetAiReviewsParams {
  agreementId?: string;
  status?: AIReviewApiStatus;
  page?: number;
  limit?: number;
}

export interface AcceptRecommendationPayload {
  createChangeRequests?: boolean;
}