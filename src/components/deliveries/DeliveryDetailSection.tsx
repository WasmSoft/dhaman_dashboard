"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  CalendarClock,
  CircleDollarSign,
  FileText,
  AlertTriangle,
  RefreshCw,
  Send,
  ExternalLink,
  CheckCircle2,
} from "lucide-react";

import { Button } from "@/components/shared";
import { DeliveryStatusBadge } from "@/components/deliveries/DeliveryStatusBadge";
import { useDeliveryQuery } from "@/hooks/deliveries";
import { useSubmitDeliveryMutation } from "@/hooks/deliveries";
import { isDeliveryEditable, isDeliverySubmittable, isEvidenceRequired, getDeliveryErrorMessage } from "@/lib/deliveries/helpers/delivery-status.helper";
import { deliveriesUiStrings } from "@/constants/deliveries";
import { cn } from "@/lib/utils";
import type { DeliveryErrorCode } from "@/types";

interface DeliveryDetailSectionProps {
  deliveryId: string;
}

// AR: صفحة تفاصيل التسليم — تعرض بيانات التسليم الكاملة مع إمكانية الإرسال للمراجعة.
// EN: Delivery detail page — shows full delivery data with submit-for-review capability.
export function DeliveryDetailSection({ deliveryId }: DeliveryDetailSectionProps) {
  const { data: delivery, isLoading, error, refetch } = useDeliveryQuery(deliveryId);
  const submitMutation = useSubmitDeliveryMutation();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);

  if (isLoading) {
    return (
      <div data-testid="deliveries-loading" className="flex items-center justify-center py-20">
        <div className="size-8 animate-spin rounded-full border-2 border-[#6f52ff] border-t-transparent" />
      </div>
    );
  }

  if (error) {
    return (
      <div data-testid="deliveries-error" className="flex flex-col items-center justify-center gap-3 py-20 text-center">
        <AlertTriangle className="size-12 text-red-400" />
        <p className="text-[14px] font-bold text-red-400">{deliveriesUiStrings.errorTitle}</p>
        <p className="text-[13px] text-[#737b99]">{error.message}</p>
        <Button
          onClick={() => refetch()}
          className="h-9 rounded-[9px] bg-red-500/80 px-4 text-[12px] font-bold text-white hover:bg-red-500"
        >
          <RefreshCw className="me-1.5 size-3.5" />
          {deliveriesUiStrings.errorRetry}
        </Button>
      </div>
    );
  }

  if (!delivery) {
    return (
      <div data-testid="deliveries-empty" className="flex flex-col items-center justify-center gap-3 py-20 text-center">
        <FileText className="size-12 text-[#636b8a]" />
        <p className="text-[14px] font-bold text-white">{deliveriesUiStrings.emptyTitle}</p>
      </div>
    );
  }

  const editable = isDeliveryEditable(delivery.status);
  const submittable = isDeliverySubmittable(delivery.status);
  const needsEvidence = isEvidenceRequired(delivery);
  const canSubmit = submittable && !needsEvidence && !submitMutation.isPending;

  const handleConfirmSubmit = async () => {
    setSubmitError(null);
    try {
      await submitMutation.mutateAsync({ deliveryId: delivery.id });
      setShowSubmitConfirm(false);
    } catch (err) {
      const message = err instanceof Error ? err.message : "فشل في إرسال التسليم.";
      setSubmitError(message);
    }
  };

  return (
    <section dir="rtl" className="mx-auto max-w-[980px] space-y-5 pb-10">
      {/* AR: رأس صفحة التفاصيل مع رابط العودة لمساحة العمل. */}
      {/* EN: Detail page header with back navigation to the agreement workspace. */}
      <header className="flex flex-col gap-4 rounded-[14px] border border-[#252a42] bg-[radial-gradient(circle_at_top_right,rgba(111,82,255,0.22),transparent_42%),#15192b] p-5 md:p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="text-start">
            <Button
              asChild
              variant="link"
              className="mb-2 h-auto justify-start p-0 text-[12px] font-bold text-[#8a91ac] hover:text-white"
            >
              <Link href={`/agreements/${delivery.agreementId}`}>
                <ArrowRight className="size-3.5" />
                {deliveriesUiStrings.viewLabel}
              </Link>
            </Button>
            <h1 className="text-2xl font-extrabold tracking-[-0.02em] text-white md:text-[28px]">
              {delivery.summary}
            </h1>
            <div className="mt-2 flex items-center gap-3">
              <DeliveryStatusBadge status={delivery.status} />
              <span className="text-[12px] text-[#737b99]">{delivery.agreementTitle}</span>
            </div>
          </div>
        </div>
      </header>

      {/* AR: بطاقة معلومات التسليم الأساسية — الملف، الرابط، الحالة، التواريخ. */}
      {/* EN: Delivery info card — file, URL, status, dates. */}
      <article className="rounded-[14px] border border-[#252a42] bg-[#15192b] p-5 text-start md:p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <p className="text-[12px] text-[#737b99]">المرحلة</p>
            <strong className="block text-[14px] font-bold text-white">{delivery.milestoneName}</strong>
          </div>

          <div>
            <p className="text-[12px] text-[#737b99]">الحالة</p>
            <DeliveryStatusBadge status={delivery.status} className="mt-1" />
          </div>

          {delivery.deliveryUrl && (
            <div>
              <p className="text-[12px] text-[#737b99]">رابط التسليم</p>
              <a
                href={delivery.deliveryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 flex items-center gap-1.5 text-[13px] text-[#6f52ff] hover:underline"
              >
                <ExternalLink className="size-3" />
                {delivery.deliveryUrl.length > 40 ? `${delivery.deliveryUrl.slice(0, 40)}...` : delivery.deliveryUrl}
              </a>
            </div>
          )}

          {delivery.fileUrl && (
            <div>
              <p className="text-[12px] text-[#737b99]">رابط الملف</p>
              <a
                href={delivery.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 flex items-center gap-1.5 text-[13px] text-[#6f52ff] hover:underline"
              >
                <FileText className="size-3" />
                {delivery.fileName ?? "ملف مرفق"}
              </a>
            </div>
          )}

          {delivery.submittedAt && (
            <div>
              <p className="text-[12px] text-[#737b99]">تاريخ الإرسال</p>
              <strong className="block text-[13px] text-white">
                {new Date(delivery.submittedAt).toLocaleDateString("ar-SA")}
              </strong>
            </div>
          )}

          {delivery.updatedAt && (
            <div>
              <p className="text-[12px] text-[#737b99]">آخر تحديث</p>
              <strong className="block text-[13px] text-white">
                {new Date(delivery.updatedAt).toLocaleDateString("ar-SA")}
              </strong>
            </div>
          )}
        </div>

        {delivery.notes && (
          <div className="mt-4 rounded-[10px] border border-[#252a42] bg-[#1d2135] px-4 py-3">
            <p className="text-[12px] font-bold text-[#a7aecb]">ملاحظات</p>
            <p className="mt-1 text-[13px] leading-6 text-white/85">{delivery.notes}</p>
          </div>
        )}

        {delivery.clientFeedback && (
          <div className="mt-4 rounded-[10px] border border-amber-500/25 bg-amber-500/10 px-4 py-3">
            <p className="text-[12px] font-bold text-amber-300">ملاحظات العميل</p>
            <p className="mt-1 text-[13px] leading-6 text-amber-100/85">{delivery.clientFeedback}</p>
          </div>
        )}
      </article>

      {/* AR: ملخص الدفع المرتبط بالتسليم. */}
      {/* EN: Payment summary for the delivery. */}
      {delivery.payment && (
        <article className="rounded-[14px] border border-[#252a42] bg-[#15192b] p-5 text-start">
          <h2 className="mb-4 flex items-center gap-2 text-[15px] font-extrabold text-white">
            <CircleDollarSign className="size-4 text-emerald-300" />
            حالة الدفعة
          </h2>
          <div className="grid gap-3 sm:grid-cols-3">
            <div>
              <p className="text-[12px] text-[#737b99]">حالة الدفعة</p>
              <strong className="block text-[14px] text-white">{delivery.payment.status}</strong>
            </div>
            {delivery.payment.amount && (
              <div>
                <p className="text-[12px] text-[#737b99]">المبلغ</p>
                <strong className="block text-[14px] text-emerald-300" dir="ltr">{delivery.payment.amount} {delivery.payment.currency ?? ""}</strong>
              </div>
            )}
          </div>
        </article>
      )}

      {/* AR: إجراءات الإرسال للمراجعة — مرئية فقط في الحالات القابلة للإرسال. */}
      {/* EN: Submit action — visible only for submittable statuses. */}
      {submittable && (
        <div className="flex flex-col gap-3">
          {needsEvidence && (
            <div className="flex items-center gap-2 rounded-[10px] border border-amber-500/25 bg-amber-500/10 px-4 py-3 text-[12px] text-amber-300">
              <AlertTriangle className="size-4 shrink-0" />
              يجب إرفاق رابط تسليم أو ملف كدليل قبل الإرسال.
            </div>
          )}

          {submitError && (
            <div className="flex items-center gap-2 rounded-[10px] border border-red-500/25 bg-red-500/10 px-4 py-3 text-[12px] text-red-300">
              <AlertTriangle className="size-4 shrink-0" />
              {submitError}
            </div>
          )}

          {!showSubmitConfirm ? (
            <Button
              disabled={!canSubmit}
              onClick={() => setShowSubmitConfirm(true)}
              className="h-10 rounded-[10px] bg-[#6f52ff] px-6 text-[13px] font-bold text-white hover:bg-[#7b63ff]"
            >
              <Send className="me-2 size-4" />
              إرسال للمراجعة
            </Button>
          ) : (
            <div className="flex items-center gap-3 rounded-[10px] border border-[#6f52ff]/25 bg-[#6f52ff]/10 px-4 py-3">
              <p className="text-[13px] text-white">هل أنت متأكد من إرسال هذا التسليم للمراجعة؟</p>
              <Button
                onClick={handleConfirmSubmit}
                disabled={submitMutation.isPending}
                className="h-9 rounded-[9px] bg-[#6f52ff] px-4 text-[12px] font-bold text-white hover:bg-[#7b63ff]"
              >
                {submitMutation.isPending ? "جارٍ الإرسال..." : "تأكيد الإرسال"}
              </Button>
              <Button
                variant="secondary"
                onClick={() => { setShowSubmitConfirm(false); setSubmitError(null); }}
                className="h-9 rounded-[9px] border border-[#252a42] bg-[#15192b] px-4 text-[12px] font-bold text-[#c7cce0]"
              >
                إلغاء
              </Button>
            </div>
          )}

          {editable && (
            <Button
              asChild
              variant="secondary"
              className="h-9 rounded-[9px] border border-[#252a42] bg-[#15192b] px-4 text-[12px] font-bold text-[#c7cce0]"
            >
              <Link href={`/deliveries/${delivery.id}/edit`}>
                تعديل التسليم
              </Link>
            </Button>
          )}
        </div>
      )}

      {/* AR: رابط العودة لمساحة عمل الاتفاقية. */}
      {/* EN: Back link to the agreement workspace. */}
      <div className="pt-2">
        <Link
          href={`/agreements/${delivery.agreementId}`}
          className="flex items-center gap-1.5 text-[13px] text-[#8a91ac] hover:text-white"
        >
          <ArrowRight className="size-3.5" />
          العودة لمساحة العمل
        </Link>
      </div>
    </section>
  );
}