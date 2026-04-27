// AR: صفحة تفاصيل مراجعة AI — تعرض التحليل الكامل للتسليم والاعتراض وشروط القبول.
// EN: AI Review detail page — displays full analysis of deliverable, objection, and acceptance criteria.
"use client";

import {
  ArrowRight,
  Check,
  CheckCircle2,
  CircleDot,
  Clock,
  Copy,
  CreditCard,
  Download,
  ExternalLink,
  FileText,
  Lightbulb,
  Link2,
  AlertCircle,
  ShieldCheck,
  Sparkles,
  ThumbsUp,
  Send,
  FileEdit,
  Wallet,
  ChevronLeft,
  Info,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/shared/button";
import { StatusBadge } from "@/components/shared/status-badge";
import { ScoreBar } from "@/components/shared/score-bar";
import { aiReviewContent } from "@/constants";
import type {
  AIReviewRow,
  AIReviewDetailBadge,
  AIReviewCriteriaAnalysis,
  AIReviewSuggestedAction,
  AIReviewDeliverableFile,
  AIReviewDetail,
} from "@/types";

type StatusTone = "success" | "purple" | "blue" | "amber" | "red" | "muted" | "cyan";

const criteriaStatusToneMap: Record<string, StatusTone> = {
  "مكتمل": "success",
  "مكتمل جزئيًا": "amber",
  "خارج النطاق": "red",
};

const criteriaStatusIconMap: Record<string, React.ReactNode> = {
  "مكتمل": <Check className="size-3" />,
  "مكتمل جزئيًا": <CircleDot className="size-3" />,
  "خارج النطاق": <AlertCircle className="size-3" />,
};

const actionIconMap: Record<string, React.ReactNode> = {
  send: <Send className="size-[18px]" />,
  fileEdit: <FileEdit className="size-[18px]" />,
  wallet: <Wallet className="size-[18px]" />,
};

// AR: بطاقة قسم تفصيلية بحاوية موحدة.
// EN: Section card with unified container styling.
function SectionCard({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-[#252a42] bg-[#131729]">
      {/* AR: رأس القسم. EN: Section header. */}
      <div className="flex items-center justify-between px-[19.2px] py-[14.4px]">
        <h3 className="text-[15px] font-bold text-white">{title}</h3>
        <div className="grid size-[30px] place-items-center rounded-lg text-[#636b8a]">
          {icon}
        </div>
      </div>
      <div className="border-t border-[#252a42]" />
      <div className="px-[19.2px] py-4">{children}</div>
    </div>
  );
}

// AR: صف في جدول تحليل شروط القبول.
// EN: Row in acceptance criteria analysis table.
function CriteriaRow({ item }: { item: AIReviewCriteriaAnalysis }) {
  const tone = criteriaStatusToneMap[item.status] ?? "muted";
  const icon = criteriaStatusIconMap[item.status] ?? <Info className="size-3" />;

  return (
    <div className="flex items-start gap-3 border-b border-[#1d2135] py-3 last:border-b-0">
      <div className="flex-1 min-w-0">
        <p className="text-[13px] leading-snug text-[#8b90a8]">{item.evidence}</p>
      </div>
      <div className="shrink-0">
        <StatusBadge label={item.status} tone={tone} icon={icon} className="text-[12px]" />
      </div>
    </div>
  );
}

// AR: بطاقة إجراء مقترح.
// EN: Suggested action card.
function ActionCard({ action }: { action: AIReviewSuggestedAction }) {
  const iconMapKey = Object.keys(actionIconMap).find((k) =>
    action.title.includes(k === "send" ? "إرسال" : k === "fileEdit" ? "تغيير" : "صرف"),
  );

  return (
    <div className="flex flex-col items-center rounded-xl border border-[#252a42] bg-[#131729] p-4 text-center">
      <div className="grid size-10 place-items-center rounded-xl bg-violet-500/15 text-violet-400">
        <Lightbulb className="size-[18px]" />
      </div>
      <span className="mt-3 text-[14px] font-semibold text-white">{action.title}</span>
      <p className="mt-2 text-[12px] leading-relaxed text-[#8b90a8]">{action.description}</p>
      <Button
        variant="outline"
        size="sm"
        className="mt-4 h-[35.6px] rounded-[10px] border-[#252a42] bg-[#1d2135] text-[13px] text-[#a7aecb] hover:bg-[#6f52ff] hover:text-white"
      >
        {action.buttonLabel}
      </Button>
    </div>
  );
}

// AR: عنصر ملف مرفق أو رابط.
// EN: Deliverable file or link item.
function DeliverableFileItem({ file }: { file: AIReviewDeliverableFile }) {
  const Icon = file.type === "link" ? ExternalLink : Download;

  return (
    <div className="flex items-center gap-3 rounded-xl border border-[#252a42] bg-[#131729] p-3">
      <Button
        variant="outline"
        size="xs"
        className="h-[26.6px] shrink-0 rounded-lg border-[#252a42] bg-[#1d2135] text-[12px] text-[#a7aecb] hover:bg-[#6f52ff] hover:text-white"
      >
        {file.type === "link" ? "فتح الرابط" : "تحميل"}
      </Button>
      <div className="flex-1 min-w-0">
        <p className="truncate text-[13px] font-medium text-white">{file.name}</p>
        <p className="truncate text-[11px] text-[#636b8a]">{file.description}</p>
      </div>
      <button
        type="button"
        className="grid size-8 shrink-0 place-items-center rounded-lg text-[#636b8a] hover:text-white"
      >
        <Icon className="size-3.5" />
      </button>
    </div>
  );
}

interface AIReviewDetailSectionProps {
  row: AIReviewRow;
}

export function AIReviewDetailSection({ row }: AIReviewDetailSectionProps) {
  const labels = aiReviewContent.detailPage;
  const d = row.detail;

  return (
    <div className="w-full" dir="rtl">
      {/* AR: رأس الصفحة مع زر العودة والعنوان وأزرار الإجراءات. EN: Page header with back button, title, and action buttons. */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-1">
          <button
            type="button"
            className="mb-1 inline-flex items-center gap-1.5 text-[13px] text-[#8b74ff] hover:text-violet-400"
          >
            <ChevronLeft className="size-3" />
            {labels.backButtonLabel}
          </button>
          <h1 className="text-[28px] font-bold leading-tight text-white">{labels.pageTitle}</h1>
          <p className="text-[13px] leading-relaxed text-[#8b90a8]">{labels.pageDescription}</p>
        </div>
        <div className="flex shrink-0 flex-wrap items-center gap-2">
          <Button className="h-[35.6px] rounded-[10px] bg-[#6f52ff] text-[13px] text-white hover:bg-[#5b42e6]">
            <ShieldCheck className="ms-1 size-3" />
            {labels.approveRecommendationLabel}
          </Button>
          <Button
            variant="outline"
            className="h-[35.6px] rounded-[10px] border-[#252a42] bg-[#1d2135] text-[13px] text-[#a7aecb] hover:bg-[#262b49] hover:text-white"
          >
            <ExternalLink className="ms-1 size-3" />
            {labels.openWorkspaceLabel}
          </Button>
          <Button
            variant="outline"
            className="h-[35.6px] rounded-[10px] border-[#252a42] bg-[#1d2135] text-[13px] text-[#a7aecb] hover:bg-[#262b49] hover:text-white"
          >
            <Copy className="ms-1 size-3" />
            {labels.copySummaryLabel}
          </Button>
        </div>
      </div>

      {/* AR: تخطيط ذو عمودين: المحتوى الرئيسي + الشريط الجانبي الثابت. EN: Two-column layout: main content + sticky sidebar. */}
      <div className="mt-6 flex flex-col gap-6 lg:flex-row">
        {/* AR: المحتوى الرئيسي القابل للتمرير. EN: Scrollable main content. */}
        <div className="flex-1 space-y-5">
          {/* AR: بطاقة ملخص المراجعة. EN: Review summary card. */}
          <div className="rounded-xl border border-[#252a42] bg-[#131729] p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex-1">
                <h2 className="text-[17px] font-bold leading-tight text-white">{d.reviewTitle}</h2>
                <p className="mt-1 text-[13px] text-[#8b90a8]">{d.reviewDescription}</p>
                <div className="mt-2 flex items-center gap-1.5 rounded-lg bg-[#1d2135] px-[10.8px] py-[6px]">
                  <Sparkles className="size-3 shrink-0 text-violet-400" />
                  <p className="text-[12px] text-[#8b90a8]">{d.aiNote}</p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {d.badges.map((badge, i) => (
                  <StatusBadge
                    key={i}
                    label={badge.label}
                    tone={badge.tone}
                    className="text-[13px]"
                  />
                ))}
              </div>
            </div>
            {/* AR: بيانات وصفية: الاتفاق، المرحلة، المبلغ، إلخ. EN: Metadata: agreement, stage, amount, etc. */}
            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
              {[
                { label: "الاتفاق:", value: d.agreementValue },
                { label: "المرحلة:", value: d.stageValue },
                { label: "المبلغ:", value: d.amountValue },
                { label: "فُتحت:", value: d.openedValue },
                { label: "آخر تحديث:", value: d.updatedValue },
              ].map((meta, i) => (
                <div key={i} className="flex items-center gap-1.5 rounded-lg bg-[#1d2135] px-[10.8px] py-[6px]">
                  <span className="text-[12px] text-[#636b8a]">{meta.label}</span>
                  <span className="text-[13px] text-[#a7aecb]">{meta.value}</span>
                  <span className="text-[#636b8a]">•</span>
                </div>
              ))}
            </div>
          </div>

          {/* AR: بطاقة توصية AI. EN: AI recommendation card. */}
          <SectionCard title={labels.aiRecommendationLabel} icon={<Sparkles className="size-3.5" />}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <StatusBadge
                    label={`${d.confidenceScore}%`}
                    tone={d.confidenceScore >= 80 ? "success" : d.confidenceScore >= 60 ? "amber" : "red"}
                    className="text-[14px] font-semibold"
                  />
                  <span className="text-[13px] text-[#8b90a8]">{d.confidenceLabel}</span>
                </div>
                <div>
                  <p className="text-[15px] font-semibold text-white">{d.recommendationTitle}</p>
                </div>
              </div>
              <div className="mt-1">
                <ScoreBar score={d.confidenceScore} />
              </div>
            </div>
            <p className="mt-3 text-[13px] leading-relaxed text-[#8b90a8]">{d.recommendationSummary}</p>
            <p className="mt-2 text-[13px] leading-relaxed text-[#636b8a]">{d.recommendationDetail}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                className="h-[35.6px] rounded-[10px] border-[#252a42] bg-[#1d2135] text-[13px] text-[#a7aecb] hover:bg-[#6f52ff] hover:text-white"
              >
                <Send className="ms-1 size-3" />
                {labels.shareSummaryLabel}
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-[35.6px] rounded-[10px] border-[#252a42] bg-[#1d2135] text-[13px] text-[#a7aecb] hover:bg-[#6f52ff] hover:text-white"
              >
                <FileEdit className="ms-1 size-3" />
                {labels.createChangeRequestLabel}
              </Button>
              <Button className="h-[35.6px] rounded-[10px] bg-[#6f52ff] text-[13px] text-white hover:bg-[#5b42e6]">
                <ThumbsUp className="ms-1 size-3" />
                {labels.acceptRecommendationShortLabel}
              </Button>
            </div>
          </SectionCard>

          {/* AR: بطاقة اعتراض العميل. EN: Client objection card. */}
          <SectionCard title={labels.clientObjectionLabel} icon={<AlertCircle className="size-3.5" />}>
            <div className="rounded-lg bg-[#1d2135] p-4 ps-5">
              <div className="absolute-s-0 w-[3px] rounded-full bg-violet-500" />
              <p className="text-[13px] italic leading-relaxed text-[#a7aecb]">{d.objectionQuote}</p>
            </div>
            <div className="mt-4 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <StatusBadge label={d.objectionType} tone="red" className="text-[13px]" />
                <span className="text-[11px] text-[#636b8a]">{labels.objectionTypeLabel}</span>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-[13px] text-[#8b90a8]">{d.relatedCriterionValue}</p>
                <span className="text-[11px] text-[#636b8a]">{labels.relatedCriterionLabel}</span>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-2 rounded-lg bg-[#1d2135] px-[10.8px] py-[7px]">
              <Info className="size-3 shrink-0 text-[#8b74ff]" />
              <p className="text-[13px] text-[#a7aecb]">{d.objectionAINote}</p>
            </div>
          </SectionCard>

          {/* AR: بطاقة شروط المرحلة المتفق عليها. EN: Agreed stage terms card. */}
          <SectionCard title={labels.stageTermsLabel} icon={<FileText className="size-3.5" />}>
            <div className="space-y-2">
              {[
                { label: labels.stageNameLabel, value: d.stageTermsDetails.stageName },
                { label: labels.amountLabel, value: d.stageTermsDetails.amount },
                { label: labels.durationLabel, value: d.stageTermsDetails.duration },
                { label: labels.amendmentsLabel, value: d.stageTermsDetails.amendments },
              ].map((row, i) => (
                <div key={i} className="flex items-center justify-between py-1.5">
                  <span className="text-[13px] text-[#a7aecb]">{row.value}</span>
                  <span className="text-[11px] text-[#636b8a]">{row.label}</span>
                </div>
              ))}
            </div>

            <div className="mt-4 flex items-center gap-2">
              <CheckCircle2 className="size-3 text-[#636b8a]" />
              <span className="text-[13px] font-semibold text-white">{labels.acceptanceCriteriaLabel}</span>
            </div>
            <div className="mt-2 space-y-2">
              {d.fulfilledCriteria.map((criterion, i) => (
                <div key={i} className="flex items-center gap-2">
                  {criterion.fulfilled ? (
                    <div className="grid size-3 shrink-0 place-items-center rounded-full bg-emerald-500/20">
                      <Check className="size-2 text-emerald-400" />
                    </div>
                  ) : (
                    <div className="grid size-3 shrink-0 place-items-center rounded-full bg-amber-500/20">
                      <CircleDot className="size-2 text-amber-400" />
                    </div>
                  )}
                  <span
                    className={cn(
                      "text-[13px]",
                      criterion.fulfilled ? "text-[#a7aecb]" : "text-[#636b8a]",
                    )}
                  >
                    {criterion.text}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2 rounded-lg bg-[#1d2135] px-[10.8px] py-[7px]">
                <AlertCircle className="size-3 shrink-0 text-[#8b74ff]" />
                <p className="text-[13px] text-[#a7aecb]">{d.outOfScopeStageNote}</p>
              </div>
              <div className="flex items-center gap-2 rounded-lg bg-[#1d2135] px-[10.8px] py-[7px]">
                <Info className="size-3 shrink-0 text-[#636b8a]" />
                <p className="text-[13px] text-[#636b8a]">{d.paymentReleaseNote}</p>
              </div>
            </div>
          </SectionCard>

          {/* AR: بطاقة التسليم المرفوع. EN: Uploaded deliverable card. */}
          <SectionCard title={labels.uploadedDeliverableLabel} icon={<FileText className="size-3.5" />}>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
              <div className="flex items-center gap-1.5">
                <span className="text-[13px] text-[#a7aecb]">{d.deliverableUploader}</span>
                <span className="text-[11px] text-[#636b8a]">{labels.uploadedByLabel}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[13px] text-[#a7aecb]">{d.deliverableUploadTime}</span>
                <span className="text-[11px] text-[#636b8a]">{labels.uploadTimeLabel}</span>
              </div>
              <StatusBadge
                label={d.deliverableStatusLabel}
                tone={d.deliverableStatusLabel === "تم الإرسال للمراجعة" ? "cyan" : "success"}
                className="text-[12px]"
              />
            </div>
            <p className="mt-3 text-[13px] leading-relaxed text-[#8b90a8]">{d.deliverableDescription}</p>

            {d.deliverableFiles.length > 0 && (
              <div className="mt-4 space-y-3">
                {d.deliverableFiles.map((file, i) => (
                  <DeliverableFileItem key={i} file={file} />
                ))}
              </div>
            )}

            <div className="mt-4 flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                className="h-[35.6px] rounded-[10px] border-[#252a42] bg-[#1d2135] text-[13px] text-[#a7aecb] hover:bg-[#6f52ff] hover:text-white"
              >
                <Copy className="ms-1 size-3" />
                {labels.copyDeliverableLinkLabel}
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-[35.6px] rounded-[10px] border-[#252a42] bg-[#1d2135] text-[13px] text-[#a7aecb] hover:bg-[#6f52ff] hover:text-white"
              >
                <Download className="ms-1 size-3" />
                {labels.downloadFileLabel}
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-[35.6px] rounded-[10px] border-[#252a42] bg-[#1d2135] text-[13px] text-[#a7aecb] hover:bg-[#6f52ff] hover:text-white"
              >
                <ExternalLink className="ms-1 size-3" />
                {labels.openDeliverableLinkLabel}
              </Button>
            </div>
          </SectionCard>

          {/* AR: بطاقة تحليل شروط القبول. EN: Acceptance criteria analysis card. */}
          <SectionCard title={labels.criteriaAnalysisLabel} icon={<Lightbulb className="size-3.5" />}>
            <p className="text-[13px] text-[#8b90a8]">{d.criteriaAnalysisDescription}</p>

            <div className="mt-4 rounded-xl border border-[#252a42] overflow-hidden">
              {/* AR: رأس الجدول. EN: Table header. */}
              <div className="flex items-center border-b border-[#252a42] bg-[#1d2135] px-4 py-2">
                <span className="flex-1 text-[11px] font-medium text-[#636b8a]">{labels.criterionLabel}</span>
                <span className="w-[245px] text-[11px] font-medium text-[#636b8a]">{labels.evidenceLabel}</span>
                <span className="w-[90px] text-start text-[11px] font-medium text-[#636b8a]">{labels.statusLabel}</span>
              </div>
              {/* AR: صفوف الجدول. EN: Table rows. */}
              {d.criteriaAnalysis.map((item, i) => (
                <div key={i} className="flex items-start gap-3 border-b border-[#1d2135] px-4 py-3 last:border-b-0">
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] text-[#a7aecb]">{item.criterion}</p>
                  </div>
                  <div className="w-[245px] min-w-0">
                    <p className="text-[13px] leading-snug text-[#8b90a8]">{item.evidence}</p>
                  </div>
                  <div className="w-[90px] shrink-0">
                    <StatusBadge
                      label={item.status}
                      tone={criteriaStatusToneMap[item.status] ?? "muted"}
                      icon={criteriaStatusIconMap[item.status]}
                    />
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>

          {/* AR: بطاقة سبب التوصية. EN: Recommendation reason card. */}
          <SectionCard title={labels.reasonLabel} icon={<Lightbulb className="size-3.5" />}>
            <p className="text-[13px] leading-relaxed text-[#8b90a8]">{d.reasonExplanation}</p>
            <ul className="mt-4 space-y-2">
              {d.reasonPoints.map((point, i) => (
                <li key={i} className="flex items-center gap-2">
                  <div className="ms-1 size-[6px] shrink-0 rounded-full bg-violet-400" />
                  <span className="text-[13px] text-[#a7aecb]">{point}</span>
                </li>
              ))}
            </ul>
          </SectionCard>

          {/* AR: بطاقة الإجراءات المقترحة. EN: Suggested actions card. */}
          <SectionCard title={labels.suggestedActionsLabel} icon={<Lightbulb className="size-3.5" />}>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {d.suggestedActions.map((action, i) => (
                <ActionCard key={i} action={action} />
              ))}
            </div>
          </SectionCard>
        </div>

        {/* AR: الشريط الجانبي الثابت بالملخص. EN: Sticky summary sidebar. */}
        <aside className="hidden w-[270px] shrink-0 lg:block">
          <div className="sticky top-6 space-y-4">
            {/* AR: بطاقة حالة المراجعة. EN: Review status card. */}
            <div className="rounded-xl border border-[#252a42] bg-[#131729] p-4">
              <h3 className="text-[14px] font-bold text-white">ملخص المراجعة</h3>
              <div className="mt-4 space-y-3">
                {d.badges.map((badge, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <StatusBadge label={badge.label} tone={badge.tone} className="text-[13px]" />
                  </div>
                ))}
                {d.confidenceScore > 0 && (
                  <div className="flex items-center justify-between">
                    <ScoreBar score={d.confidenceScore} />
                    <span className="text-[11px] text-[#636b8a]">{d.confidenceLabel}</span>
                  </div>
                )}
              </div>
              <div className="mt-4 border-t border-[#252a42] pt-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[12px] text-[#8b90a8]">{row.projectName}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[12px] text-[#8b90a8]">{row.stage}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[14px] font-semibold text-white">{row.amount}</span>
                  <span className="text-[11px] text-[#636b8a]">المبلغ</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[12px] text-[#8b90a8]">{row.updatedAt}</span>
                  <span className="text-[11px] text-[#636b8a]">آخر تحديث</span>
                </div>
              </div>
            </div>

            {/* AR: بطاقة توصية الدفعة. EN: Payment recommendation card. */}
            <div className="rounded-xl border border-[#252a42] bg-[#131729] p-4">
              <div className="flex items-center gap-2">
                <CreditCard className="size-3 shrink-0 text-[#8b74ff]" />
                <span className="text-[13px] font-semibold text-white">توصية الدفعة</span>
              </div>
              <p className="mt-2 text-[12px] leading-relaxed text-[#8b90a8]">{d.paymentRecommendationText}</p>
              <Button className="mt-3 h-[35.6px] w-full rounded-[10px] bg-[#6f52ff] text-[13px] text-white hover:bg-[#5b42e6]">
                <ShieldCheck className="ms-1 size-3" />
                اعتماد التوصية
              </Button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}