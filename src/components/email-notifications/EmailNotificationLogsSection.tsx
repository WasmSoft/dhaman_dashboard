"use client";

import { useState } from "react";

import { Button } from "@/components/shared";
import { Skeleton } from "@/components/shared";
import { StatusBadge } from "@/components/shared";
import { useEmailNotificationLogsQuery } from "@/hooks/email-notifications";
import {
  formatEmailDate,
  getStatusLabel,
  getStatusTone,
  getTypeLabel,
  safeDisplayValue,
  truncateEmail,
} from "@/lib/email-notifications/helpers";
import type { EmailLogQueryParams, EmailNotificationLocale } from "@/types";

// AR: أعمدة الجدول الثابتة لسجل البريد.
// EN: Static table columns for email logs.
const COLUMNS = [
  { key: "recipientEmail" as const, ar: "المستلم", en: "Recipient" },
  { key: "type" as const, ar: "النوع", en: "Type" },
  { key: "subject" as const, ar: "الموضوع", en: "Subject" },
  { key: "status" as const, ar: "الحالة", en: "Status" },
  { key: "sentAt" as const, ar: "وقت الإرسال", en: "Sent At" },
] as const;

interface EmailNotificationLogsSectionProps {
  initialParams?: EmailLogQueryParams;
  locale?: EmailNotificationLocale;
}

// AR: قسم سجلات البريد القابل لإعادة الاستخدام يعرض السجلات المحددة للمستخدم مع الفلاتر والصفحات.
// EN: Reusable email notification logs section that displays user-scoped logs with filters and pagination.
export function EmailNotificationLogsSection({
  initialParams,
  locale = "ar",
}: EmailNotificationLogsSectionProps) {
  const [params, setParams] = useState<EmailLogQueryParams>(
    initialParams ?? { page: 1, limit: 10 },
  );

  const { data, isLoading, isError, error, refetch } =
    useEmailNotificationLogsQuery(params);

  const dir = locale === "ar" ? "rtl" : "ltr";
  const logs = data?.data?.items ?? [];
  const pagination = data?.data?.pagination;

  const handlePageChange = (page: number) => {
    setParams((prev) => ({ ...prev, page }));
  };

  const handleFilterChange = (key: keyof EmailLogQueryParams, value: string) => {
    setParams((prev) => ({
      ...prev,
      [key]: value || undefined,
      page: 1,
    }));
  };

  const headerLabel = (ar: string, en: string) => (locale === "ar" ? ar : en);

  // AR: حالة التحميل - هيكل عظمي للجدول.
  // EN: Loading state - table skeleton.
  if (isLoading) {
    return (
      <section dir={dir} className="flex flex-col gap-4 p-4 md:p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Skeleton className="h-7 w-48" />
          <Skeleton className="h-9 w-64" />
        </div>
        <div className="rounded-[14px] border border-[#252a42] bg-[#15192b] p-4 md:p-6">
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  // AR: حالة الخطأ مع إمكانية إعادة المحاولة.
  // EN: Error state with retry option.
  if (isError) {
    return (
      <section
        dir={dir}
        className="flex flex-col items-center gap-4 px-4 py-12 text-center md:py-16"
      >
        <p className="text-sm text-red-400">
          {locale === "ar"
            ? "تعذر تحميل سجلات البريد الإلكتروني."
            : "Could not load email notification logs."}
        </p>
        <p className="text-xs text-[#8b90a8]">
          {error instanceof Error ? error.message : ""}
        </p>
        <Button variant="outline" size="sm" onClick={() => refetch()}>
          {locale === "ar" ? "إعادة المحاولة" : "Retry"}
        </Button>
      </section>
    );
  }

  // AR: عرض رئيسي لسجلات البريد مع الجدول والصفحات.
  // EN: Main email logs display with table and pagination.
  return (
    <section dir={dir} className="flex flex-col gap-4 p-4 md:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[18px] font-bold text-white">
          {locale === "ar" ? "سجل البريد الإلكتروني" : "Email Logs"}
        </h2>

        {/* AR: حقل بحث بسيط للتصفية حسب البريد الإلكتروني للمستلم. */}
        {/* EN: Simple search input for filtering by recipient email. */}
        <input
          type="text"
          placeholder={
            locale === "ar" ? "بحث بالبريد الإلكتروني..." : "Search by email..."
          }
          value={params.recipientEmail ?? ""}
          onChange={(e) =>
            handleFilterChange("recipientEmail", e.target.value)
          }
          className="rounded-lg border border-[#252a42] bg-[#15192b] px-3 py-2 text-sm text-white placeholder:text-[#58607c] focus:border-[#6f52ff] focus:outline-none"
        />
      </div>

      {/* AR: صفوف سريعة للتصفية حسب الحالة. */}
      {/* EN: Quick filter chips for status. */}
      <div className="flex flex-wrap gap-2">
        {(["ALL", "PENDING", "SENT", "FAILED"] as const).map((filter) => {
          const isActive =
            filter === "ALL"
              ? !params.status
              : params.status === filter;
          const label =
            filter === "ALL"
              ? locale === "ar"
                ? "الكل"
                : "All"
              : getStatusLabel(filter, locale);

          return (
            <button
              key={filter}
              type="button"
              onClick={() =>
                setParams((prev) => ({
                  ...prev,
                  status: filter === "ALL" ? undefined : filter,
                  page: 1,
                }))
              }
              className={`rounded-full px-3 py-1 text-[12px] font-medium transition-colors ${
                isActive
                  ? "bg-[#6f52ff] text-white"
                  : "bg-[#242a45] text-[#8a91ac] hover:bg-[#363b54]"
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* AR: حالة عدم وجود سجلات. */}
      {/* EN: Empty state - no logs found. */}
      {logs.length === 0 ? (
        <div className="flex flex-col items-center gap-3 py-16 text-center">
          <p className="text-sm text-[#8b90a8]">
            {locale === "ar"
              ? "لا توجد سجلات بريد إلكتروني مطابقة."
              : "No matching email notification logs."}
          </p>
        </div>
      ) : (
        <div className="rounded-[14px] border border-[#252a42] bg-[#15192b] p-4 md:p-6">
          {/* AR: الجدول يستخدم تمريراً أفقياً للجوال مع الحفاظ على محاذاة RTL. */}
          {/* EN: The table uses horizontal mobile scrolling while preserving RTL alignment. */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[680px] border-collapse text-start text-[12px]">
              <thead className="text-[#58607c]">
                <tr className="h-[38px] border-b border-[#252a42]">
                  {COLUMNS.map((col) => (
                    <th
                      key={col.key}
                      className="whitespace-nowrap px-3 py-0 font-medium first:ps-0 last:pe-0"
                    >
                      {headerLabel(col.ar, col.en)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {logs.map((log) => (
                  <tr
                    key={log.id}
                    className="h-[52px] border-b border-[#252a42]/55 text-white last:border-0"
                  >
                    <td className="whitespace-nowrap px-3 py-0 first:ps-0">
                      {truncateEmail(safeDisplayValue(log.recipientEmail))}
                    </td>
                    <td className="whitespace-nowrap px-3 py-0">
                      {getTypeLabel(log.type, locale)}
                    </td>
                    <td className="max-w-[180px] truncate px-3 py-0">
                      {safeDisplayValue(log.subject)}
                    </td>
                    <td className="whitespace-nowrap px-3 py-0">
                      <StatusBadge
                        label={getStatusLabel(log.status, locale)}
                        tone={getStatusTone(log.status)}
                      />
                    </td>
                    <td className="whitespace-nowrap px-3 py-0 text-[#8b90a8] last:pe-0">
                      {formatEmailDate(log.sentAt ?? log.createdAt, locale)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* AR: التنقل بين الصفحات. */}
          {/* EN: Pagination controls. */}
          {pagination && pagination.totalPages > 1 && (
            <div className="mt-4 flex items-center justify-between gap-4 border-t border-[#252a42]/55 pt-4">
              <span className="text-[12px] text-[#8b90a8]">
                {locale === "ar"
                  ? `الصفحة ${pagination.page} من ${pagination.totalPages} (${pagination.total} سجل)`
                  : `Page ${pagination.page} of ${pagination.totalPages} (${pagination.total} records)`}
              </span>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="xs"
                  disabled={pagination.page <= 1}
                  onClick={() => handlePageChange(pagination.page - 1)}
                >
                  {locale === "ar" ? "السابق" : "Previous"}
                </Button>
                <Button
                  variant="outline"
                  size="xs"
                  disabled={pagination.page >= pagination.totalPages}
                  onClick={() => handlePageChange(pagination.page + 1)}
                >
                  {locale === "ar" ? "التالي" : "Next"}
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
