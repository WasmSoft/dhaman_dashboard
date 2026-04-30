// AR: دوال تحويل استجابات API إلى أنواع واجهة المستخدم لعرض مراجعات AI.
// EN: Mapper functions that transform API responses into UI types for AI Review display.
import type {
  AIReviewApiItem,
  AIReviewRow,
  AIReviewDetail,
  AIReviewBadgeLabel,
  AIReviewResultLabel,
  AIPayStatusLabel,
  AIReviewActionLabel,
} from "@/types";

// AR: خريطة حالات المراجعة من API إلى تسميات عربية.
// EN: Maps API review status to Arabic UI labels.
const statusBadgeMap: Record<string, AIReviewBadgeLabel> = {
  PENDING: "مفتوحة",
  PROCESSING: "بانتظار AI",
  COMPLETED: "توصية جاهزة",
  FAILED: "توصية جاهزة",
};

// AR: خريطة توصيات API إلى تسميات عربية.
// EN: Maps API recommendations to Arabic UI labels.
const recommendationResultMap: Record<string, AIReviewResultLabel> = {
  ACCEPT: "طلب إضافي",
  REJECT: "تعديل مطلوب",
  PARTIAL: "خارج النطاق",
  NEEDS_HUMAN_REVIEW: "قيد التحليل",
};

// AR: خريطة أدوار الجهات إلى تسميات دفع.
// EN: Maps API payment-related status to pay status labels.
const payStatusMap: Record<string, AIPayStatusLabel> = {
  ACCEPT: "Ready to Release",
  REJECT: "On Hold",
  PARTIAL: "On Hold",
  NEEDS_HUMAN_REVIEW: "AI Review",
};

// AR: خريطة حالات المراجعة إلى تسميات الإجراء.
// EN: Maps review states to action button labels.
const actionLabelMap: Record<string, AIReviewActionLabel> = {
  PENDING: "بدء المراجعة",
  PROCESSING: "متابعة الحالة",
  COMPLETED: "عرض المراجعة",
  FAILED: "عرض المراجعة",
};

// AR: تحويل عنصر مراجعة API واحد إلى صف عرض الجدول.
// EN: Transforms a single API review item into a table display row.
export function mapApiReviewToRow(item: AIReviewApiItem): AIReviewRow {
  const status: string = item.status;
  const recommendation: string | null = item.recommendation;

  const reviewBadge: AIReviewBadgeLabel =
    statusBadgeMap[status] ?? "مفتوحة";

  const aiResult: AIReviewResultLabel =
    recommendation && recommendationResultMap[recommendation]
      ? recommendationResultMap[recommendation]
      : status === "PROCESSING"
        ? "قيد التحليل"
        : status === "PENDING"
          ? "بانتظار بدء المراجعة"
          : "قيد التحليل";

  const payStatus: AIPayStatusLabel =
    recommendation && payStatusMap[recommendation]
      ? payStatusMap[recommendation]
      : "AI Review";

  const actionLabel: AIReviewActionLabel =
    actionLabelMap[status] ?? "عرض المراجعة";

  const detail: AIReviewDetail = {
    aiAnalysis: item.reasoning ?? "بانتظار بدء التحليل.",
    fulfilledCriteria: (item.completedCriteria ?? []).map((c) => ({
      text: c,
      fulfilled: true,
    })).concat(
      (item.missingCriteria ?? []).map((c) => ({
        text: c,
        fulfilled: false,
      })),
    ),
    outOfScopeNote:
      (item.outOfScopeItems ?? []).length > 0
        ? `خارج النطاق: ${item.outOfScopeItems?.join("، ")}`
        : "لم يتم تحديد بنود خارج النطاق.",
    paymentRecommendation:
      recommendation === "ACCEPT"
        ? "صرف الدفعة"
        : recommendation === "REJECT"
          ? "تعليق الدفعة"
          : recommendation === "PARTIAL"
            ? "تعليق الدفعة مع تعديلات"
            : "بانتظار التحليل",
    paymentRecommendationText: item.reasoning ?? "بانتظار توصية AI.",
    reviewTitle: "مراجعة تسليم AI",
    reviewDescription: `مراجعة رقم ${item.id.substring(0, 8)}`,
    aiNote: "تم تحليل التسليم والاعتراض بناءً على شروط القبول.",
    badges: [
      { label: payStatus, tone: payStatus === "Ready to Release" ? "success" : payStatus === "On Hold" ? "amber" : "purple" },
      { label: aiResult, tone: aiResult === "خارج النطاق" ? "red" : aiResult === "تعديل مطلوب" ? "amber" : aiResult === "قيد التحليل" ? "cyan" : "blue" },
      { label: reviewBadge, tone: reviewBadge === "توصية جاهزة" ? "purple" : reviewBadge === "تم الحل" ? "success" : reviewBadge === "مفتوحة" ? "amber" : "cyan" },
    ],
    agreementValue: item.agreementId,
    stageValue: item.milestoneId,
    amountValue: "—",
    openedValue: new Date(item.createdAt).toLocaleDateString("ar-SA"),
    updatedValue: new Date(item.updatedAt).toLocaleDateString("ar-SA"),
    confidenceScore: item.matchScore ?? 0,
    confidenceLabel: item.matchScore !== null
      ? item.matchScore >= 80 ? "ثقة عالية" : item.matchScore >= 60 ? "ثقة متوسطة" : "ثقة منخفضة"
      : "جاري التحليل",
    recommendationTitle:
      recommendation === "ACCEPT"
        ? "موصى بقبول التسليم"
        : recommendation === "REJECT"
          ? "موصى برفض التسليم"
          : recommendation === "PARTIAL"
            ? "موصى بقبول جزئي"
            : "بانتظار التوصية",
    recommendationSummary: item.reasoning ?? "جاري التحليل.",
    recommendationDetail: item.reasoning ?? "لم تصدر توصية بعد.",
    objectionQuote: `"${item.objection}"`,
    objectionType: "اعتراض عميل",
    relatedCriterionLabel: "شرط القبول المرتبط",
    relatedCriterionValue: "جاري التحديد",
    objectionAINote: "سيتم الربط بشرط القبول تلقائياً بعد التحليل.",
    stageTermsDetails: {
      stageName: item.milestoneId,
      amount: "—",
      duration: "—",
      amendments: "—",
    },
    outOfScopeStageNote: "يتم التحديد بعد اكتمال التحليل.",
    paymentReleaseNote: "تصبح الدفعة قابلة للصرف بعد اعتماد التوصية.",
    deliverableUploader: "—",
    deliverableUploadTime: "—",
    deliverableStatusLabel: "بانتظار المراجعة",
    deliverableDescription: "بانتظار تفاصيل التسليم.",
    deliverableFiles: [],
    criteriaAnalysisDescription: "يقارن AI بين شروط القبول والتسليم والاعتراض.",
    criteriaAnalysis: [
      ...(item.completedCriteria ?? []).map((c) => ({
        criterion: c,
        evidence: "محقق",
        status: "مكتمل" as const,
      })),
      ...(item.missingCriteria ?? []).map((c) => ({
        criterion: c,
        evidence: "غير محقق",
        status: "مكتمل جزئيًا" as const,
      })),
    ],
    reasonExplanation: item.reasoning ?? "جاري التحليل.",
    reasonPoints: item.reasoning
      ? item.reasoning.split(". ").filter(Boolean)
      : ["بانتظار اكتمال التحليل."],
    suggestedActions: [
      {
        title: "مراجعة التوصية",
        description: "اطلع على توصية AI وقرر الإجراء المناسب.",
        buttonLabel: "عرض التوصية",
      },
      {
        title: "اعتماد التوصية",
        description: "اعتماد توصية AI لتحديث حالة الدفعة.",
        buttonLabel: "اعتماد التوصية",
      },
    ],
  };

  return {
    id: item.id,
    projectName: item.agreementId,
    clientName: "—",
    stage: item.milestoneId,
    objection: item.objection,
    reviewBadge,
    aiResult,
    payStatus,
    amount: "—",
    matchScore: item.matchScore,
    updatedAt: new Date(item.updatedAt).toLocaleDateString("ar-SA"),
    actionLabel,
    showEyeIcon: true,
    detail,
  };
}

// AR: تحويل قائمة مراجعات API إلى صفوف عرض الجدول.
// EN: Transforms an API review list into table display rows.
export function mapApiReviewsToRows(items: AIReviewApiItem[]): AIReviewRow[] {
  return items.map(mapApiReviewToRow);
}
