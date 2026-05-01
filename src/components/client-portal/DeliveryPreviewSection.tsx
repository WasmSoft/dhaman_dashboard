"use client";

import { useState } from "react";
import {
  Bot,
  CheckCircle2,
  ExternalLink,
  FileText,
  MessageSquareText,
  RefreshCw,
  ShieldCheck,
} from "lucide-react";

import { Button } from "@/components/shared";
import { PortalTimelineEvidence } from "@/components/client-portal/PortalTimelineEvidence";
import { clientPortalContent } from "@/constants";
import {
  useAcceptDeliveryMutation,
  usePortalDeliveryDetailsQuery,
  usePortalWorkspaceQuery,
  useRequestDeliveryChangesMutation,
} from "@/hooks/deliveries";
import { useOpenAiReviewMutation } from "@/hooks/ai-review";
import {
  buildPortalDeliveryContext,
  buildPortalPaymentAmount,
  canClientReviewDelivery,
  canOpenPortalAiReview,
} from "@/lib/deliveries";
import { portalRequestDeliveryChangesSchema } from "@/lib/deliveries/schemas";

interface DeliveryPreviewSectionProps {
  portalToken?: string;
  deliveryId?: string;
}

// AR: صفحة مراجعة التسليم عبر بوابة العميل — تستخدم العقود الحية بدلاً من المحتوى التجريبي.
// EN: Client portal delivery review page — uses the live contracts instead of static preview content.
export function DeliveryPreviewSection({
  portalToken,
  deliveryId,
}: DeliveryPreviewSectionProps) {
  const previewContent = clientPortalContent.deliveryPreview;
  const [reason, setReason] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const portalWorkspaceQuery = usePortalWorkspaceQuery(portalToken);
  const portalDeliveryQuery = usePortalDeliveryDetailsQuery(portalToken, deliveryId);

  const acceptDeliveryMutation = useAcceptDeliveryMutation(
    portalToken ?? "",
    deliveryId ?? "",
  );
  const requestDeliveryChangesMutation = useRequestDeliveryChangesMutation(
    portalToken ?? "",
    deliveryId ?? "",
  );
  const openAiReviewMutation = useOpenAiReviewMutation();

  const delivery = portalDeliveryQuery.data?.data;
  const workspace = portalWorkspaceQuery.data?.data;
  const portalContext = buildPortalDeliveryContext(workspace, delivery);
  const canReview = delivery ? canClientReviewDelivery(delivery.status) : false;
  const canOpenAi = delivery ? canOpenPortalAiReview(delivery.status) : false;
  const isBusy =
    acceptDeliveryMutation.isPending ||
    requestDeliveryChangesMutation.isPending ||
    openAiReviewMutation.isPending;

  if (!portalToken || !deliveryId) {
    return (
      <main
        dir="rtl"
        className="mx-auto min-h-screen max-w-[980px] px-4 py-10 text-start text-white"
      >
        <section className="rounded-[14px] border border-[#252a42] bg-[#15192b] p-6">
          <h1 className="text-[22px] font-extrabold">{previewContent.title}</h1>
          <p className="mt-2 text-[13px] leading-6 text-[#8a91ac]">
            هذه الصفحة تتطلب رمز بوابة ومعرف تسليم صالحين لعرض البيانات الحية.
          </p>
        </section>
      </main>
    );
  }

  async function handleAccept() {
    try {
      const result = await acceptDeliveryMutation.mutateAsync();
      setErrorMessage(null);
      setFeedbackMessage(result.data.message);
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "تعذر قبول التسليم الحالي.",
      );
    }
  }

  async function handleRequestChanges() {
    const validation = portalRequestDeliveryChangesSchema.safeParse({
      reason,
      requestedChanges: [],
    });

    if (!validation.success) {
      setErrorMessage(validation.error.issues[0]?.message ?? "بيانات الطلب غير صالحة.");
      return;
    }

    try {
      const result = await requestDeliveryChangesMutation.mutateAsync(validation.data);
      setErrorMessage(null);
      setFeedbackMessage(result.data.message);
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "تعذر إرسال طلب التعديلات الحالي.",
      );
    }
  }

  async function handleOpenAiReview() {
    if (!portalToken || !deliveryId) {
      return;
    }

    try {
      await openAiReviewMutation.mutateAsync({
        token: portalToken,
        deliveryId,
        payload: {
          objection:
            reason.trim() ||
            `Client requested AI review for delivery ${deliveryId}.`,
          relatedCriteria: portalContext?.milestone?.description
            ? [portalContext.milestone.description]
            : undefined,
        },
      });
      setErrorMessage(null);
      setFeedbackMessage("تم فتح مراجعة AI لهذا التسليم.");
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "تعذر فتح مراجعة AI الحالية.",
      );
    }
  }

  return (
    <main
      dir="rtl"
      className="mx-auto min-h-screen max-w-[1040px] space-y-4 px-4 py-10 text-start text-white"
    >
      <header className="rounded-[14px] border border-[#252a42] bg-[radial-gradient(circle_at_top_right,rgba(111,82,255,0.22),transparent_42%),#15192b] p-6">
        <h1 className="text-[24px] font-extrabold">{previewContent.title}</h1>
        <p className="mt-2 text-[13px] leading-6 text-[#8a91ac]">
          {previewContent.description}
        </p>
      </header>

      {feedbackMessage ? (
        <section className="rounded-[12px] border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-[13px] text-emerald-200">
          {feedbackMessage}
        </section>
      ) : null}

      {errorMessage ? (
        <section className="rounded-[12px] border border-red-500/30 bg-red-500/10 px-4 py-3 text-[13px] text-red-200">
          {errorMessage}
        </section>
      ) : null}

      {portalDeliveryQuery.isLoading || portalWorkspaceQuery.isLoading ? (
        <section className="rounded-[14px] border border-[#252a42] bg-[#15192b] p-6 text-[13px] text-[#8a91ac]">
          جاري تحميل بيانات التسليم والبوابة...
        </section>
      ) : null}

      {portalDeliveryQuery.isError ? (
        <section className="rounded-[14px] border border-red-500/25 bg-red-500/10 p-6 text-[13px] text-red-200">
          {portalDeliveryQuery.error instanceof Error
            ? portalDeliveryQuery.error.message
            : "تعذر تحميل التسليم المطلوب أو أن رابط البوابة غير صالح."}
        </section>
      ) : null}

      {!portalDeliveryQuery.isLoading && !portalDeliveryQuery.isError && delivery ? (
        <>
          <section className="grid gap-4 lg:grid-cols-[1.35fr_0.95fr]">
            <article className="rounded-[14px] border border-[#252a42] bg-[#15192b] p-6">
              <div className="mb-5 flex items-center gap-2 text-[16px] font-extrabold text-white">
                <FileText className="size-4 text-[#a898ff]" />
                بيانات التسليم الحالية
              </div>
              <div className="grid gap-4 sm:grid-cols-2 text-[13px]">
                <div className="rounded-[10px] bg-[#101323] p-4">
                  <span className="block text-[#737b99]">الاتفاق</span>
                  <strong className="mt-2 block text-white">
                    {portalContext?.agreementTitle ?? "غير متاح"}
                  </strong>
                </div>
                <div className="rounded-[10px] bg-[#101323] p-4">
                  <span className="block text-[#737b99]">المستقل</span>
                  <strong className="mt-2 block text-white">
                    {portalContext?.freelancerName ?? "غير متاح"}
                  </strong>
                </div>
                <div className="rounded-[10px] bg-[#101323] p-4">
                  <span className="block text-[#737b99]">المرحلة</span>
                  <strong className="mt-2 block text-white">
                    {delivery.milestoneTitle}
                  </strong>
                </div>
                <div className="rounded-[10px] bg-[#101323] p-4">
                  <span className="block text-[#737b99]">حالة التسليم</span>
                  <strong className="mt-2 block text-white">
                    {portalContext?.deliveryStatusLabel ?? delivery.status}
                  </strong>
                </div>
                <div className="rounded-[10px] bg-[#101323] p-4">
                  <span className="block text-[#737b99]">الدفعة المرتبطة</span>
                  <strong className="mt-2 block text-white">
                    {portalContext?.paymentStatusLabel ?? "غير متاحة"}
                  </strong>
                </div>
                <div className="rounded-[10px] bg-[#101323] p-4">
                  <span className="block text-[#737b99]">قيمة الدفعة</span>
                  <strong className="mt-2 block text-emerald-300" dir="ltr">
                    {buildPortalPaymentAmount(portalContext?.payment)}
                  </strong>
                </div>
              </div>

              <div className="mt-5 rounded-[10px] bg-[#101323] p-4 text-[13px] leading-6 text-[#c7cce0]">
                <div className="mb-2 flex items-center gap-2 font-bold text-white">
                  <MessageSquareText className="size-4 text-[#a898ff]" />
                  ملاحظات التسليم
                </div>
                <p>{delivery.notes ?? "لم يتم إرفاق ملاحظات إضافية مع هذا التسليم."}</p>
              </div>

              {portalContext?.milestone?.description ? (
                <div className="mt-4 rounded-[10px] bg-[#101323] p-4 text-[13px] leading-6 text-[#c7cce0]">
                  <div className="mb-2 flex items-center gap-2 font-bold text-white">
                    <ShieldCheck className="size-4 text-emerald-300" />
                    وصف المرحلة
                  </div>
                  <p>{portalContext.milestone.description}</p>
                </div>
              ) : null}
            </article>

            <article className="space-y-4 rounded-[14px] border border-[#252a42] bg-[#15192b] p-6">
              <div className="flex items-center gap-2 text-[16px] font-extrabold text-white">
                <CheckCircle2 className="size-4 text-emerald-300" />
                قرار العميل
              </div>

              <Button
                type="button"
                onClick={handleAccept}
                disabled={!canReview || isBusy}
                className="h-11 w-full rounded-[10px] bg-emerald-600 text-[13px] font-bold text-white hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <CheckCircle2 className="size-4" />
                قبول التسليم
              </Button>

              <div>
                <label className="block text-[12px] font-bold text-[#c7cce0]">
                  سبب طلب التعديلات
                </label>
                <textarea
                  value={reason}
                  onChange={(event) => setReason(event.target.value)}
                  className="mt-2 min-h-[120px] w-full rounded-[10px] border border-[#252a42] bg-[#101323] px-4 py-3 text-start text-[13px] leading-6 text-white outline-none"
                  placeholder="اكتب ملاحظات المراجعة أو التعديلات المطلوبة بوضوح."
                />
              </div>

              <Button
                type="button"
                onClick={handleRequestChanges}
                disabled={!canReview || isBusy}
                variant="secondary"
                className="h-11 w-full rounded-[10px] border border-amber-500/30 bg-amber-500/15 text-[13px] font-bold text-amber-200 hover:bg-amber-500/25 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <RefreshCw className="size-4" />
                طلب تعديلات
              </Button>

              <Button
                type="button"
                onClick={handleOpenAiReview}
                disabled={!canOpenAi || isBusy}
                variant="secondary"
                className="h-11 w-full rounded-[10px] border border-[#6f52ff]/30 bg-[#6f52ff]/15 text-[13px] font-bold text-[#d7d0ff] hover:bg-[#6f52ff]/25 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Bot className="size-4" />
                فتح مراجعة AI
              </Button>

              <div className="rounded-[10px] bg-[#101323] p-4 text-[12px] leading-6 text-[#8a91ac]">
                {canReview
                  ? "يمكنك قبول التسليم أو طلب تعديلات أو فتح مراجعة AI حسب النتيجة التي تراها مناسبة."
                  : "هذا التسليم لم يعد في حالة تسمح باتخاذ قرار مراجعة جديد من هذه الصفحة."}
              </div>
            </article>
          </section>

          {portalToken ? (
            <PortalTimelineEvidence
              portalToken={portalToken}
              eventTypes={[
                "DELIVERY_SUBMITTED",
                "DELIVERY_ACCEPTED",
                "DELIVERY_CHANGES_REQUESTED",
              ]}
              maxItems={3}
            />
          ) : null}

          {deliveryId ? (
            <div className="flex justify-start">
              <Button
                asChild
                variant="secondary"
                className="h-10 rounded-[10px] border border-[#252a42] bg-[#15192b] px-4 text-[13px] font-bold text-[#c7cce0] hover:bg-[#1d2135] hover:text-white"
              >
                <a href={`#/portal-delivery-${deliveryId}`}>
                  <ExternalLink className="size-4" />
                  مرجع التسليم
                </a>
              </Button>
            </div>
          ) : null}
        </>
      ) : null}
    </main>
  );
}
