"use client";

// AR: صفحة تفاصيل طلب التغيير للمستقل — تعرض كافة الحقول وأزرار الإرسال والتعديل.
// EN: Change request detail page for the freelancer — displays all fields and send/edit actions.
import { Loader2, FileText, Send, Edit3 } from "lucide-react";
import { Button } from "@/components/shared";
import { useChangeRequestDetailsQuery } from "@/hooks/change-requests";
import { ChangeRequestStatusBadge } from "./ChangeRequestStatusBadge";
import { SendChangeRequestConfirmDialog } from "./SendChangeRequestConfirmDialog";
import { EditChangeRequestDialog } from "./EditChangeRequestDialog";
import { changeRequestsContent } from "@/constants";

interface ChangeRequestDetailSectionProps {
  id: string;
}

export function ChangeRequestDetailSection({
  id,
}: ChangeRequestDetailSectionProps) {
  const locale = "ar";
  const ct = changeRequestsContent;

  const { data, isLoading, isError } = useChangeRequestDetailsQuery(id);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-[#6f52ff]" />
        <span className="ms-3 text-sm text-[#8b90a8]">
          {ct.detail.loading[locale]}
        </span>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
        <FileText className="h-12 w-12 text-[#5a5f7a]" />
        <p className="text-[15px] font-medium text-[#8b90a8]">
          {ct.detail.notFound[locale]}
        </p>
      </div>
    );
  }

  const changeRequest = data!;
  const isDraft = changeRequest.status === "DRAFT";

  const formattedAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: changeRequest.currency || "USD",
    minimumFractionDigits: 2,
  }).format(Number(changeRequest.amount));

  const formatDate = (dateStr?: string | null) =>
    dateStr
      ? new Date(dateStr).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : null;

  return (
    <section dir="rtl" className="flex flex-col gap-6 text-start">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold text-white">
            {changeRequest.title}
          </h1>
          <ChangeRequestStatusBadge status={changeRequest.status} />
        </div>

        {isDraft && (
          <div className="flex items-center gap-2">
            <EditChangeRequestDialog
              changeRequest={changeRequest}
              trigger={
                <Button
                  variant="outline"
                  className="border-[#252a42] text-[#8b90a8] hover:bg-[#252a42]"
                >
                  <Edit3 className="me-2 h-4 w-4" />
                  {ct.detail.editAction[locale]}
                </Button>
              }
            />
            <SendChangeRequestConfirmDialog
              id={id}
              trigger={
                <Button>
                  <Send className="me-2 h-4 w-4" />
                  {ct.detail.sendAction[locale]}
                </Button>
              }
            />
          </div>
        )}
      </div>

      {/* Amount */}
      <div className="rounded-[12px] border border-[#252a42] bg-[#1a1f37] p-4">
        <span className="text-[13px] font-medium text-[#8b90a8]">
          {ct.detail.amount[locale]}
        </span>
        <p className="mt-1 text-2xl font-bold text-[#6f52ff]">
          {formattedAmount}
        </p>
      </div>

      {/* Description */}
      <div className="flex flex-col gap-1.5">
        <span className="text-[13px] font-medium text-[#8b90a8]">
          {ct.detail.description[locale]}
        </span>
        <p className="text-[15px] leading-relaxed text-white whitespace-pre-wrap">
          {changeRequest.description}
        </p>
      </div>

      {/* Acceptance Criteria */}
      {changeRequest.acceptanceCriteria &&
        changeRequest.acceptanceCriteria.length > 0 && (
          <div className="flex flex-col gap-1.5">
            <span className="text-[13px] font-medium text-[#8b90a8]">
              {ct.detail.acceptanceCriteria[locale]}
            </span>
            <ol className="list-inside list-decimal space-y-1 text-[15px] text-white">
              {changeRequest.acceptanceCriteria.map((criterion, idx) => (
                <li key={idx}>{criterion}</li>
              ))}
            </ol>
          </div>
        )}

      {/* Timeline Days */}
      {changeRequest.timelineDays != null && (
        <div className="flex flex-col gap-1.5">
          <span className="text-[13px] font-medium text-[#8b90a8]">
            {ct.detail.timelineDays[locale]}
          </span>
          <p className="text-[15px] text-white">
            {changeRequest.timelineDays} {locale === "ar" ? "يوم" : "days"}
          </p>
        </div>
      )}

      {/* Dates */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {formatDate(changeRequest.approvedAt) && (
          <div className="rounded-[12px] border border-green-500/30 bg-green-500/10 p-3">
            <span className="text-[12px] font-medium text-green-400">
              {ct.detail.approvedAt[locale]}
            </span>
            <p className="mt-0.5 text-[14px] text-white">
              {formatDate(changeRequest.approvedAt)}
            </p>
          </div>
        )}
        {formatDate(changeRequest.declinedAt) && (
          <div className="rounded-[12px] border border-red-500/30 bg-red-500/10 p-3">
            <span className="text-[12px] font-medium text-red-400">
              {ct.detail.declinedAt[locale]}
            </span>
            <p className="mt-0.5 text-[14px] text-white">
              {formatDate(changeRequest.declinedAt)}
            </p>
          </div>
        )}
        {formatDate(changeRequest.fundedAt) && (
          <div className="rounded-[12px] border border-purple-500/30 bg-purple-500/10 p-3">
            <span className="text-[12px] font-medium text-purple-400">
              {ct.detail.fundedAt[locale]}
            </span>
            <p className="mt-0.5 text-[14px] text-white">
              {formatDate(changeRequest.fundedAt)}
            </p>
          </div>
        )}
      </div>

      {/* Payment Summary */}
      {changeRequest.payments && changeRequest.payments.length > 0 && (
        <div className="flex flex-col gap-3">
          <span className="text-[13px] font-medium text-[#8b90a8]">
            {ct.detail.paymentSummary[locale]}
          </span>
          <div className="flex flex-col gap-2">
            {changeRequest.payments.map((payment) => (
              <div
                key={payment.id}
                className="flex flex-wrap items-center justify-between gap-2 rounded-[10px] border border-[#252a42] bg-[#1a1f37] p-3"
              >
                <span className="text-[14px] text-white">
                  {payment.operationType}
                </span>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-[#6f52ff]">
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: payment.currency || "USD",
                      minimumFractionDigits: 2,
                    }).format(Number(payment.amount))}
                  </span>
                  <span className="rounded-md border border-[#363b54] px-2 py-0.5 text-[12px] text-[#8b90a8]">
                    {payment.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
