// AR: صفحة مراجعات الذكاء الاصطناعي — تعرض الإحصائيات، وجدول المراجعات مع الفلاتر، والشريط الجانبي للتفاصيل.
// EN: AI Review page — displays stats, review table with filters, and detail sidebar side-by-side.
"use client";

import { useState } from "react";
import {
  Clock,
  Eye,
  FileText,
  AlertTriangle,
  Ban,
  Download,
  Search,
  ChevronDown,
  ArrowUpDown,
  X,
  Check,
  CircleDot,
  Sparkles,
  CreditCard,
  ListChecks,
  AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/shared/button";
import { Input } from "@/components/shared/input";
import { ScoreBar } from "@/components/shared/score-bar";
import { StatusBadge } from "@/components/shared/status-badge";
import { aiReviewContent } from "@/constants";
import type {
  AIReviewFilterTab,
  AIReviewBadgeLabel,
  AIReviewResultLabel,
  AIPayStatusLabel,
  AIReviewRow,
} from "@/types";

type StatusTone = "success" | "purple" | "blue" | "amber" | "red" | "muted" | "cyan";

const badgeToneMap: Record<AIReviewBadgeLabel, StatusTone> = {
  "توصية جاهزة": "purple",
  "بانتظار AI": "cyan",
  "مفتوحة": "amber",
  "تم الحل": "success",
};

const aiResultToneMap: Record<AIReviewResultLabel, StatusTone> = {
  "خارج النطاق": "red",
  "قيد التحليل": "cyan",
  "تعديل مطلوب": "amber",
  "طلب إضافي": "blue",
  "بانتظار بدء المراجعة": "muted",
};

const payStatusToneMap: Record<AIPayStatusLabel, StatusTone> = {
  "Ready to Release": "success",
  "AI Review": "purple",
  "On Hold": "amber",
  Released: "blue",
};

const statIconMap: Record<string, React.ReactNode> = {
  active: <FileText className="size-4" />,
  pending: <Clock className="size-4" />,
  outOfScope: <AlertTriangle className="size-4" />,
  frozen: <Ban className="size-4" />,
};

const statBgMap: Record<string, string> = {
  active: "bg-[#0f2a1e] border border-[#1a3d2a]",
  pending: "bg-[#0f1a2e] border border-[#1a2d4a]",
  outOfScope: "bg-[#2a1a0f] border border-[#3d2a1a]",
  frozen: "bg-[#1a0f2a] border border-[#2a1a3d]",
};

const statIconBgMap: Record<string, string> = {
  active: "bg-emerald-500/20 text-emerald-400",
  pending: "bg-blue-500/20 text-blue-400",
  outOfScope: "bg-amber-500/20 text-amber-400",
  frozen: "bg-violet-500/20 text-violet-400",
};

const statBadgeToneMap: Record<string, StatusTone> = {
  نشط: "success",
  تحليل: "cyan",
  تنبيه: "amber",
  مجموعد: "muted",
};

function ReviewDetailSidebar({
  row,
  onClose,
}: {
  row: AIReviewRow;
  onClose: () => void;
}) {
  const { detail } = row;

  return (
    <div className="flex h-full flex-col overflow-y-auto" dir="rtl">
      {/* AR: رأس الشريط الجانبي. EN: Sidebar header. */}
      <div className="flex items-center justify-between px-[18.8px] pt-[18.8px]">
        <h2 className="text-[14px] font-bold text-white">
          ملخص المراجعة المحددة
        </h2>
        <button
          type="button"
          onClick={onClose}
          className="grid size-7 place-items-center rounded-lg text-[#8b90a8] transition-colors hover:bg-[#1d2135] hover:text-white"
        >
          <X className="size-3.5" />
        </button>
      </div>

      {/* AR: اسم المشروع والمرحلة. EN: Project name and stage. */}
      <div className="mt-4 px-[18.8px]">
        <span className="text-[14px] font-semibold leading-tight text-white">
          {row.projectName}
        </span>
      </div>
      <div className="mt-1 px-[18.8px]">
        <span className="text-[12px] leading-snug text-[#8b90a8]">
          {row.stage}
        </span>
      </div>

      <div className="mx-[18.8px] my-4 h-px bg-[#252a42]" />

      {/* AR: اعتراض العميل. EN: Client objection. */}
      <div className="px-[18.8px]">
        <span className="text-[12px] font-semibold text-[#a7aecb] block text-start">
          اعتراض العميل
        </span>
        <p className="mt-1.5 text-[12px] leading-[18px] text-[#8b90a8]">
          {row.objection}
        </p>
      </div>

      <div className="mx-[18.8px] my-4 h-px bg-[#252a42]" />

      {/* AR: حالة المراجعة، نتيجة AI، الدفعة، التطابق، آخر تحديث. EN: Status badges row. */}
      <div className="flex flex-col gap-4 px-[18.8px]">
        <div className="flex items-center justify-between">
          <StatusBadge
            label={row.reviewBadge}
            tone={badgeToneMap[row.reviewBadge] ?? "muted"}
            className="text-[13px]"
          />
          <span className="text-[11px] text-[#636b8a]">حالة المراجعة</span>
        </div>

        <div className="flex items-center justify-between">
          <StatusBadge
            label={row.aiResult}
            tone={aiResultToneMap[row.aiResult] ?? "muted"}
            icon={<ChevronDown className="size-2.5" />}
            className="text-[13px]"
          />
          <span className="text-[11px] text-[#636b8a]">نتيجة AI</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <StatusBadge
              label={row.payStatus}
              tone={payStatusToneMap[row.payStatus] ?? "muted"}
              className="text-[13px]"
            />
            <span className="text-[13px] text-[#636b8a]">—</span>
            <span className="text-[14px] font-semibold text-white">
              {row.amount}
            </span>
          </div>
          <span className="text-[11px] text-[#636b8a]">الدفعة</span>
        </div>

        {row.matchScore !== null && (
          <div className="flex items-center justify-between">
            <ScoreBar score={row.matchScore} />
            <span className="text-[11px] text-[#636b8a]">نسبة التطابق</span>
          </div>
        )}

        <div className="flex items-center justify-between">
          <span className="text-[12px] text-[#8b90a8]">
            {row.updatedAt}
          </span>
          <span className="text-[11px] text-[#636b8a]">آخر تحديث</span>
        </div>
      </div>

      <div className="mx-[18.8px] my-4 h-px bg-[#252a42]" />

      {/* AR: تحليل AI. EN: AI analysis section. */}
      <div className="px-[12.8px]">
        <div className="flex items-center gap-2 py-[10.8px]">
          <Sparkles className="size-3 shrink-0 text-[#8b74ff]" />
          <span className="text-[13px] font-semibold text-white">تحليل AI</span>
        </div>
        <p className="text-[12px] leading-[18px] text-[#8b90a8]">
          {detail.aiAnalysis}
        </p>
      </div>

      {/* AR: شروط القبول المحققة. EN: Fulfilled acceptance criteria. */}
      <div className="mt-3 flex items-center justify-between px-[18.8px]">
        <span className="text-[13px] font-semibold text-white">
          شروط القبول المحققة
        </span>
        <ListChecks className="size-3 text-[#636b8a]" />
      </div>

      <div className="mt-2 flex flex-col gap-[9px] px-[18.8px]">
        {detail.fulfilledCriteria.map((criterion, index) => (
          <div key={index} className="flex items-center gap-2">
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
                "text-[13px] leading-none",
                criterion.fulfilled ? "text-[#a7aecb]" : "text-[#636b8a]",
              )}
            >
              {criterion.text}
            </span>
          </div>
        ))}
      </div>

      {/* AR: ملاحظة خارج النطاق. EN: Out-of-scope note badge. */}
      <div className="mt-[18px] px-[22.4px]">
        <div className="flex items-center gap-2 rounded-lg bg-[#1d2135] px-[10.8px] py-[7px]">
          <AlertCircle className="size-3 shrink-0 text-[#8b74ff]" />
          <span className="text-[13px] leading-none text-[#a7aecb]">
            {detail.outOfScopeNote}
          </span>
        </div>
      </div>

      <div className="mx-[18.8px] mt-[18px] h-px bg-[#252a42]" />

      {/* AR: توصية الدفعة. EN: Payment recommendation. */}
      <div className="px-[12.8px]">
        <div className="flex items-center gap-2 py-[10.8px]">
          <CreditCard className="size-3 shrink-0 text-[#8b74ff]" />
          <span className="text-[13px] font-semibold text-white">توصية الدفعة</span>
        </div>
        <p className="text-[12px] leading-[18px] text-[#8b90a8]">
          {detail.paymentRecommendationText}
        </p>
      </div>

      <div className="h-6" />
    </div>
  );
}

export function AIReviewSection() {
  const { aiReview } = aiReviewContent;
  const [activeTab, setActiveTab] = useState<AIReviewFilterTab>("الكل");
  // AR: الصف الأول محدد افتراضياً لمطابقة التصميم. EN: First row selected by default to match the design.
  const [selectedRow, setSelectedRow] = useState<AIReviewRow | null>(aiReview.rows[0]);

  const filteredRows =
    activeTab === "الكل"
      ? aiReview.rows
      : aiReview.rows.filter((row) => {
          if (activeTab === "مفتوحة") return row.reviewBadge === "مفتوحة";
          if (activeTab === "بانتظار AI") return row.reviewBadge === "بانتظار AI";
          if (activeTab === "توصية جاهزة") return row.reviewBadge === "توصية جاهزة";
          if (activeTab === "خارج النطاق") return row.aiResult === "خارج النطاق";
          if (activeTab === "تم الحل") return row.reviewBadge === "تم الحل";
          return true;
        });

  return (
    <div className="w-full" dir="rtl">
      {/* AR: عنوان الصفحة. EN: Page title. */}
      <div className="mb-6 flex flex-col gap-1">
        <h1 className="text-[28px] font-bold leading-tight text-white">
          {aiReview.pageTitle}
        </h1>
        <p className="text-[13px] leading-relaxed text-[#8b90a8]">
          {aiReview.pageDescription}
        </p>
      </div>

      {/* AR: شريط البحث وزر التصدير. EN: Search bar and export button. */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button
            variant="outline"
            size="default"
            className="h-[35.6px] rounded-[10px] border-[#252a42] bg-[#1d2135] text-[13px] text-[#a7aecb] hover:bg-[#262b49] hover:text-white"
          >
            <Download className="ms-1.5 size-3" />
            {aiReview.exportLabel}
          </Button>
          <div className="relative">
            <Input
              placeholder={aiReview.searchPlaceholder}
              className="h-[35.6px] w-full rounded-[10px] border-[#252a42] bg-[#1d2135] pe-9 text-[13px] text-white placeholder:text-[#636b8a] focus-visible:ring-violet-500/20 sm:w-[280px]"
              dir="rtl"
            />
            <Search className="pointer-events-none absolute start-3 top-1/2 size-3 -translate-y-1/2 text-[#636b8a]" />
          </div>
        </div>
      </div>

      {/* AR: بطاقات الإحصائيات الأربع. EN: Four stats cards. */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {aiReview.stats.map((stat) => (
          <div
            key={stat.key}
            className={cn(
              "relative overflow-hidden rounded-xl px-4 pt-[13px] pb-[18px]",
              statBgMap[stat.key] ?? "bg-[#1d2135] border border-[#252a42]",
            )}
          >
            <div className="mb-2">
              <StatusBadge
                label={stat.status}
                tone={statBadgeToneMap[stat.status] ?? "muted"}
                className="rounded-md px-2 py-0.5 text-[11px]"
              />
            </div>
            <div
              className={cn(
                "absolute start-auto end-4 top-4 grid size-10 place-items-center rounded-xl",
                statIconBgMap[stat.key] ?? "bg-[#363b54]/60 text-[#8b90a8]",
              )}
            >
              {statIconMap[stat.key]}
            </div>
            <div className="mt-1 flex flex-col gap-0.5">
              <span className="text-[28px] font-bold leading-none text-white">
                {stat.value}
              </span>
              <span className="text-[13px] font-medium leading-tight text-[#a7aecb]">
                {stat.label}
              </span>
              <span className="text-[11px] leading-snug text-[#636b8a]">
                {stat.description}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* AR: تبويبات الفلترة. EN: Filter tabs. */}
      <div className="mb-4 flex flex-wrap gap-2">
        {aiReview.filterTabs.map((tab) => (
          <button
            key={tab.label}
            type="button"
            onClick={() => setActiveTab(tab.label)}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[13px] font-medium transition-colors",
              activeTab === tab.label
                ? "bg-[#6f52ff] text-white"
                : "bg-[#1d2135] text-[#8b90a8] hover:bg-[#262b49] hover:text-white",
            )}
          >
            {tab.label}
            <span
              className={cn(
                "inline-flex size-[17px] items-center justify-center rounded text-[11px] font-semibold leading-none",
                activeTab === tab.label
                  ? "bg-white/20 text-white"
                  : "bg-[#363b54]/60 text-[#8b90a8]",
              )}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* AR: قوائم الفلترة المنسدلة. EN: Dropdown filter chips. */}
      <div className="mb-4 flex flex-wrap gap-2">
        {aiReview.filterDropdowns.map((dropdown) => (
          <button
            key={dropdown.key}
            type="button"
            className="inline-flex items-center gap-1.5 rounded-lg border border-[#252a42] bg-[#1d2135] px-2.5 py-1.5 text-[13px] text-[#a7aecb] hover:border-[#6f52ff]/40 hover:text-white"
          >
            <ArrowUpDown className="size-3 text-[#636b8a]" />
            {dropdown.label}
            <ChevronDown className="size-3 text-[#636b8a]" />
          </button>
        ))}
      </div>

      {/* AR: الجدول والشريط الجانبي جنباً إلى جنب. EN: Table and sidebar side by side. */}
      <div className="flex gap-4">
        {/* AR: جدول المراجعات. EN: Reviews table. */}
        <div className="flex-1 overflow-x-auto rounded-xl border border-[#252a42] bg-[#131729]">
          <table className="w-full min-w-[760px]">
            <thead>
              <tr className="border-b border-[#252a42] text-[13px]">
                {aiReview.tableHeaders.map((header) => (
                  <th
                    key={header}
                    className="px-4 py-2.5 text-start font-medium text-[#636b8a]"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredRows.map((row) => (
                <tr
                  key={row.id}
                  className={cn(
                    "cursor-pointer border-b border-[#1d2135] transition-colors hover:bg-[#1a1f33]/60",
                    selectedRow?.id === row.id && "bg-[#1a1f33]",
                  )}
                  onClick={() => setSelectedRow(row)}
                >
                  {/* الإجراء */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        className="grid size-[28.6px] shrink-0 place-items-center rounded-lg border border-[#252a42] bg-[#1d2135] text-[#a7aecb] hover:border-[#6f52ff]/40 hover:text-white"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedRow(row);
                        }}
                      >
                        <Eye className="size-3" />
                      </button>
                      <Button
                        variant="outline"
                        size="xs"
                        className="h-[28px] rounded-[8px] border-[#252a42] bg-[#1d2135] text-[13px] text-[#a7aecb] hover:bg-[#6f52ff] hover:text-white"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedRow(row);
                        }}
                      >
                        {row.actionLabel}
                      </Button>
                    </div>
                  </td>

                  {/* آخر تحديث */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1 text-[13px] text-[#8b90a8]">
                      {row.updatedAt}
                      <Clock className="size-2.5 text-[#636b8a]" />
                    </div>
                  </td>

                  {/* التطابق */}
                  <td className="px-4 py-3">
                    {row.matchScore !== null ? (
                      <ScoreBar score={row.matchScore} />
                    ) : (
                      <span className="text-[13px] text-[#636b8a]">—</span>
                    )}
                  </td>

                  {/* المبلغ */}
                  <td className="px-4 py-3">
                    <span className="text-[14px] font-semibold text-white">
                      {row.amount}
                    </span>
                  </td>

                  {/* حالة الدفعة */}
                  <td className="px-4 py-3">
                    <StatusBadge
                      label={row.payStatus}
                      tone={payStatusToneMap[row.payStatus] ?? "muted"}
                      className="rounded-md text-[13px]"
                    />
                  </td>

                  {/* نتيجة AI */}
                  <td className="px-4 py-3">
                    <StatusBadge
                      label={row.aiResult}
                      tone={aiResultToneMap[row.aiResult] ?? "muted"}
                      icon={<ChevronDown className="size-2.5" />}
                      className="rounded-md text-[13px]"
                    />
                  </td>

                  {/* حالة المراجعة */}
                  <td className="px-4 py-3">
                    <StatusBadge
                      label={row.reviewBadge}
                      tone={badgeToneMap[row.reviewBadge] ?? "muted"}
                      className="rounded-md text-[13px]"
                    />
                  </td>

                  {/* المرحلة / الاعتراض */}
                  <td className="px-4 py-3">
                    <div className="flex flex-col gap-0.5">
                      <span className="line-clamp-1 text-[12px] font-semibold leading-tight text-white">
                        {row.stage}
                      </span>
                      <span className="line-clamp-1 text-[11px] leading-snug text-[#636b8a]">
                        {row.objection}
                      </span>
                    </div>
                  </td>

                  {/* المشروع / العميل */}
                  <td className="px-4 py-3">
                    <div className="flex flex-col gap-0.5">
                      <span className="line-clamp-1 text-[13px] font-semibold leading-tight text-white">
                        {row.projectName}
                      </span>
                      <span className="line-clamp-1 text-[11px] leading-snug text-[#636b8a]">
                        {row.clientName}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* AR: الشريط الجانبي الدائم لتفاصيل المراجعة. EN: Persistent detail sidebar panel. */}
        {selectedRow && (
          <aside className="hidden w-[300px] shrink-0 rounded-xl border border-[#252a42] bg-[#131729] lg:block" dir="rtl">
            <ReviewDetailSidebar
              row={selectedRow}
              onClose={() => setSelectedRow(null)}
            />
          </aside>
        )}
      </div>

      {/* AR: الشريط الجانبي المنبثق على الجوال. EN: Slide-in sidebar for mobile. */}
      {selectedRow && (
        <div className="lg:hidden">
          <div
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedRow(null)}
            aria-hidden="true"
          />
          <aside
            className="fixed inset-y-0 start-0 z-50 w-[300px] max-w-[85vw] border-s border-[#252a42] bg-[#131729] text-white shadow-2xl"
            dir="rtl"
          >
            <ReviewDetailSidebar
              row={selectedRow}
              onClose={() => setSelectedRow(null)}
            />
          </aside>
        </div>
      )}
    </div>
  );
}