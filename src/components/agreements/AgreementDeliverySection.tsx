"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import {
  ArrowRight,
  CheckCircle2,
  FileText,
  Link2,
  LockKeyhole,
  Save,
  Send,
} from "lucide-react";

import { Button } from "@/components/shared";
import { Input } from "@/components/shared/input";
import { TimelineEvidencePanel } from "@/components/timeline-events";
import { agreementsContent } from "@/constants";
import { useDeliveriesQuery } from "@/hooks/deliveries/use-deliveries-query";
import { useCreateDeliveryMutation } from "@/hooks/deliveries/use-create-delivery-mutation";
import { useSubmitDeliveryMutation } from "@/hooks/deliveries/use-submit-delivery-mutation";
import { useUpdateDeliveryMutation } from "@/hooks/deliveries/use-update-delivery-mutation";
import { useMilestoneDetailsQuery } from "@/hooks/milestones";
import {
  deliveryDraftSchema,
  deliverySubmitSchema,
  getDeliveryPaymentStatusLabel,
  getDeliveryStatusLabel,
} from "@/lib/deliveries";
import {
  buildAgreementWorkspaceHref,
  buildMilestoneDetailHref,
} from "@/lib/milestones/helpers";
import { formatMilestoneAmount } from "@/lib/milestones";
import type { Delivery, DeliveryDetailsResponse, DeliverySubmitFormValues } from "@/types";

interface AgreementDeliverySectionProps {
  agreementId?: string;
  milestoneId?: string;
}

const defaultFormValues: DeliverySubmitFormValues = {
  deliveryUrl: "",
  fileUrl: "",
  fileName: "",
  fileType: "",
  summary: "",
  notes: "",
  noteToClient: "",
  confirmationAccepted: false,
};

// AR: نموذج تسليم المرحلة الحي — يسمح بإنشاء المسودة وتحديثها وإرسالها من نفس الصفحة.
// EN: Live milestone delivery form — supports creating, updating, and submitting a delivery from one page.
export function AgreementDeliverySection({
  agreementId,
  milestoneId,
}: AgreementDeliverySectionProps) {
  const content = agreementsContent.agreementDeliveryPage;
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { data: milestoneResponse, isLoading: isMilestoneLoading } =
    useMilestoneDetailsQuery(milestoneId);
  const milestone = milestoneResponse?.data;

  const { data: milestoneDeliveriesResponse, isLoading: isDeliveriesLoading } =
    useDeliveriesQuery(
      milestoneId
        ? {
            milestoneId,
            limit: 20,
            page: 1,
          }
        : undefined,
    );

  const milestoneDeliveries = useMemo(
    () => milestoneDeliveriesResponse?.items ?? [],
    [milestoneDeliveriesResponse],
  );

  const editableDelivery = useMemo(() => {
    return [...milestoneDeliveries]
      .filter((delivery) => delivery.status === "DRAFT" || delivery.status === "CHANGES_REQUESTED")
      .sort(sortDeliveriesByUpdatedAt)[0];
  }, [milestoneDeliveries]);
  const latestDelivery = useMemo(
    () => [...milestoneDeliveries].sort(sortDeliveriesByUpdatedAt)[0],
    [milestoneDeliveries],
  );

  const form = useForm<DeliverySubmitFormValues>({
    defaultValues: defaultFormValues,
  });

  const { register, getValues, reset } = form;

  useEffect(() => {
    if (!editableDelivery) {
      reset(defaultFormValues);
      return;
    }

    reset({
      deliveryUrl: editableDelivery.deliveryUrl ?? "",
      fileUrl: editableDelivery.fileUrl ?? "",
      fileName: editableDelivery.fileName ?? "",
      fileType: editableDelivery.fileType ?? "",
      summary: editableDelivery.summary,
      notes: editableDelivery.notes ?? "",
      noteToClient: "",
      confirmationAccepted: false,
    });
  }, [editableDelivery, reset]);

  const createDeliveryMutation = useCreateDeliveryMutation();
  const updateDeliveryMutation = useUpdateDeliveryMutation();
  const submitDeliveryMutation = useSubmitDeliveryMutation();

  const isBusy =
    createDeliveryMutation.isPending ||
    updateDeliveryMutation.isPending ||
    submitDeliveryMutation.isPending;

  async function saveDraft() {
    setErrorMessage(null);
    setFeedbackMessage(null);

    const values = getValues();
    const draftPayload = {
      deliveryUrl: values.deliveryUrl?.trim() || undefined,
      fileUrl: values.fileUrl?.trim() || undefined,
      fileName: values.fileName?.trim() || undefined,
      fileType: values.fileType?.trim() || undefined,
      summary: values.summary?.trim() ?? "",
      notes: values.notes?.trim() || undefined,
    };

    const validation = deliveryDraftSchema.safeParse(draftPayload);

    if (!validation.success) {
      setErrorMessage(validation.error.issues[0]?.message ?? "بيانات المسودة غير صالحة.");
      throw new Error("INVALID_DRAFT");
    }

    if (!milestoneId) {
      setErrorMessage("تعذر تحديد المرحلة الحالية للتسليم.");
      throw new Error("MISSING_MILESTONE");
    }

    if (editableDelivery) {
      const result = await updateDeliveryMutation.mutateAsync({
        deliveryId: editableDelivery.id,
        payload: validation.data,
      });
      setFeedbackMessage("تم تحديث المسودة بنجاح.");
      return result;
    }

    const result = await createDeliveryMutation.mutateAsync({
      milestoneId,
      payload: validation.data,
    });
    setFeedbackMessage("تم إنشاء مسودة التسليم بنجاح.");
    return result;
  }

  async function handleSaveDraft() {
    try {
      await saveDraft();
    } catch (error) {
      if (error instanceof Error && error.message === "INVALID_DRAFT") {
        return;
      }

      setErrorMessage(
        error instanceof Error ? error.message : "تعذر حفظ مسودة التسليم.",
      );
    }
  }

  async function handleSubmitDelivery() {
    try {
      const values = getValues();
      const submitValidation = deliverySubmitSchema.safeParse({
        noteToClient: values.noteToClient?.trim() || undefined,
        confirmationAccepted: values.confirmationAccepted,
      });

      if (!submitValidation.success) {
        setErrorMessage(
          submitValidation.error.issues[0]?.message ?? "تعذر إرسال التسليم.",
        );
        return;
      }

      const savedDraft = await saveDraft();
      await submitDeliveryMutation.mutateAsync({
        deliveryId: getMutationDeliveryId(savedDraft),
        payload: {
          noteToClient: submitValidation.data.noteToClient || undefined,
        },
      });

      setErrorMessage(null);
      setFeedbackMessage("تم إرسال التسليم إلى العميل بنجاح.");
    } catch (error) {
      if (error instanceof Error && error.message === "INVALID_DRAFT") {
        return;
      }

      setErrorMessage(
        error instanceof Error ? error.message : "تعذر إرسال التسليم الحالي.",
      );
    }
  }

  const workspaceHref = agreementId
    ? buildAgreementWorkspaceHref(agreementId)
    : "/agreements";
  const milestoneDetailsHref = agreementId && milestoneId
    ? buildMilestoneDetailHref(agreementId, milestoneId)
    : workspaceHref;

  return (
    <section dir="rtl" className="mx-auto max-w-[980px] space-y-4 pb-10">
      <header className="rounded-[14px] border border-[#252a42] bg-[radial-gradient(circle_at_top_right,rgba(111,82,255,0.22),transparent_42%),#15192b] p-5 text-start md:p-6">
        <Button
          asChild
          variant="link"
          className="mb-2 h-auto justify-start p-0 text-[12px] font-bold text-[#8a91ac] hover:text-white"
        >
          <Link href={workspaceHref}>
            <ArrowRight className="size-3.5" />
            {content.backLabel}
          </Link>
        </Button>
        <h1 className="text-2xl font-extrabold tracking-[-0.02em] text-white md:text-[28px]">
          {content.title}
        </h1>
        <p className="mt-1 text-sm leading-6 text-[#737b99]">{content.subtitle}</p>
      </header>

      <section className="grid gap-4 lg:grid-cols-[1.4fr_0.9fr]">
        <article className="rounded-[14px] border border-[#252a42] bg-[#15192b] p-5 text-start">
          <div className="mb-4 flex items-center gap-2 text-[14px] font-extrabold text-white">
            <FileText className="size-4 text-[#a898ff]" />
            معلومات المرحلة الحالية
          </div>
          {isMilestoneLoading ? (
            <p className="text-[13px] text-[#8a91ac]">جاري تحميل بيانات المرحلة...</p>
          ) : milestone ? (
            <dl className="grid gap-3 sm:grid-cols-2 text-[13px]">
              <div className="rounded-[10px] bg-[#101323] p-4">
                <dt className="text-[#737b99]">المرحلة</dt>
                <dd className="mt-2 font-bold text-white">{milestone.title}</dd>
              </div>
              <div className="rounded-[10px] bg-[#101323] p-4">
                <dt className="text-[#737b99]">حالة الدفعة</dt>
                <dd className="mt-2 font-bold text-white">
                  {getDeliveryPaymentStatusLabel(milestone.paymentStatus)}
                </dd>
              </div>
              <div className="rounded-[10px] bg-[#101323] p-4">
                <dt className="text-[#737b99]">حالة التسليم</dt>
                <dd className="mt-2 font-bold text-white">
                  {getDeliveryStatusLabel(milestone.deliveryStatus)}
                </dd>
              </div>
              <div className="rounded-[10px] bg-[#101323] p-4">
                <dt className="text-[#737b99]">قيمة المرحلة</dt>
                <dd className="mt-2 font-bold text-emerald-300" dir="ltr">
                  {formatMilestoneAmount(milestone.amount, milestone.currency)}
                </dd>
              </div>
            </dl>
          ) : (
            <p className="text-[13px] text-red-200">تعذر تحميل تفاصيل المرحلة الحالية.</p>
          )}
        </article>

        <article className="rounded-[14px] border border-[#252a42] bg-[#15192b] p-5 text-start">
          <div className="mb-4 flex items-center gap-2 text-[14px] font-extrabold text-[#a898ff]">
            <CheckCircle2 className="size-4" />
            حالة التسليم
          </div>
          <div className="space-y-3 text-[13px]">
            <div className="rounded-[10px] bg-[#101323] p-4">
              <span className="block text-[#737b99]">أحدث حالة</span>
              <strong className="mt-2 block text-white">
                {latestDelivery
                  ? getDeliveryStatusLabel(latestDelivery.status)
                  : "لا يوجد تسليم بعد"}
              </strong>
            </div>
            <div className="rounded-[10px] bg-[#101323] p-4">
              <span className="block text-[#737b99]">آخر ملاحظة</span>
              <p className="mt-2 leading-6 text-white/85">
                {latestDelivery?.clientFeedback ??
                  latestDelivery?.notes ??
                  "لا توجد ملاحظات محفوظة حالياً."}
              </p>
            </div>
            <Button asChild variant="secondary" className="h-10 w-full rounded-[10px] border border-[#252a42] bg-[#101323] text-[13px] font-bold text-[#c7cce0] hover:bg-[#1d2135] hover:text-white">
              <Link href={milestoneDetailsHref}>عرض تفاصيل المرحلة</Link>
            </Button>
          </div>
        </article>
      </section>

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

      <section className="grid gap-4 lg:grid-cols-[1.35fr_0.95fr]">
        <article className="space-y-4 rounded-[14px] border border-[#252a42] bg-[#15192b] p-5 text-start md:p-6">
          <div className="flex items-center gap-2 text-[15px] font-extrabold text-white">
            <Link2 className="size-4 text-[#a898ff]" />
            بيانات التسليم
          </div>

          <div>
            <label className="block text-[12px] font-bold text-[#c7cce0]">
              {content.linkLabel}
            </label>
            <Input
              dir="ltr"
              className="mt-2 h-11 rounded-[10px] border-[#252a42] bg-[#1d2135] text-start text-white"
              placeholder={content.linkPlaceholder}
              {...register("deliveryUrl")}
            />
            <p className="mt-2 text-[12px] leading-6 text-[#737b99]">{content.linkHelp}</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-[12px] font-bold text-[#c7cce0]">
                رابط الملف الاختياري
              </label>
              <Input
                dir="ltr"
                className="mt-2 h-11 rounded-[10px] border-[#252a42] bg-[#1d2135] text-start text-white"
                placeholder="https://cdn.example.com/file.zip"
                {...register("fileUrl")}
              />
            </div>
            <div>
              <label className="block text-[12px] font-bold text-[#c7cce0]">
                اسم الملف
              </label>
              <Input
                className="mt-2 h-11 rounded-[10px] border-[#252a42] bg-[#1d2135] text-start text-white"
                placeholder={content.attachmentFileName}
                {...register("fileName")}
              />
            </div>
          </div>

          <div>
            <label className="block text-[12px] font-bold text-[#c7cce0]">
              نوع الملف
            </label>
            <Input
              className="mt-2 h-11 rounded-[10px] border-[#252a42] bg-[#1d2135] text-start text-white"
              placeholder="application/pdf"
              {...register("fileType")}
            />
          </div>

          <div>
            <label className="block text-[12px] font-bold text-[#c7cce0]">
              {content.summaryLabel}
            </label>
            <textarea
              className="mt-2 min-h-[140px] w-full rounded-[10px] border border-[#252a42] bg-[#1d2135] px-4 py-3 text-start text-[13px] leading-6 text-white outline-none"
              placeholder={content.summaryPlaceholder}
              {...register("summary")}
            />
            <p className="mt-2 text-[12px] leading-6 text-[#737b99]">{content.summaryHelp}</p>
          </div>

          <div>
            <label className="block text-[12px] font-bold text-[#c7cce0]">
              {content.notesLabel}
            </label>
            <textarea
              className="mt-2 min-h-[120px] w-full rounded-[10px] border border-[#252a42] bg-[#1d2135] px-4 py-3 text-start text-[13px] leading-6 text-white outline-none"
              placeholder={content.notesPlaceholder}
              {...register("notes")}
            />
            <p className="mt-2 text-[12px] leading-6 text-[#737b99]">{content.notesHelp}</p>
          </div>

          <div>
            <label className="block text-[12px] font-bold text-[#c7cce0]">
              رسالة مرفقة للعميل عند الإرسال
            </label>
            <textarea
              className="mt-2 min-h-[100px] w-full rounded-[10px] border border-[#252a42] bg-[#1d2135] px-4 py-3 text-start text-[13px] leading-6 text-white outline-none"
              placeholder="يمكنك كتابة ملاحظة تساعد العميل أثناء المراجعة."
              {...register("noteToClient")}
            />
          </div>

          <label className="flex items-start gap-3 rounded-[10px] border border-[#252a42] bg-[#101323] px-4 py-3 text-[12px] leading-6 text-[#c7cce0]">
            <input
              type="checkbox"
              className="mt-1 size-4 rounded border-[#6f52ff] accent-[#6f52ff]"
              {...register("confirmationAccepted")}
            />
            <span>{content.confirmationLabel}</span>
          </label>

          <div className="flex flex-wrap justify-end gap-2">
            <Button
              onClick={handleSaveDraft}
              type="button"
              disabled={isBusy}
              variant="secondary"
              className="h-10 rounded-[10px] border border-[#252a42] bg-[#101323] px-4 text-[13px] font-bold text-[#c7cce0] hover:bg-[#1d2135] hover:text-white"
            >
              <Save className="size-4" />
              {editableDelivery ? "تحديث المسودة" : content.draftLabel}
            </Button>
            <Button
              onClick={handleSubmitDelivery}
              type="button"
              disabled={isBusy || !milestoneId}
              className="h-10 rounded-[10px] bg-[#6f52ff] px-5 text-[13px] font-bold text-white shadow-[0_12px_28px_rgba(111,82,255,0.26)] hover:bg-[#7b63ff]"
            >
              <Send className="size-4" />
              {content.sendLabel}
            </Button>
          </div>
        </article>

        <aside className="space-y-4">
          <article className="rounded-[14px] border border-[#252a42] bg-[#15192b] p-5 text-start">
            <div className="mb-4 flex items-center gap-2 text-[14px] font-extrabold text-[#a898ff]">
              <CheckCircle2 className="size-4" />
              {content.requirementsTitle}
            </div>
            <ul className="space-y-2 text-[12px] leading-6 text-[#c7cce0]">
              {milestone?.acceptanceCriteria?.length
                ? milestone.acceptanceCriteria.map((criterion, index) => (
                    <li key={`${criterion.description}-${index}`} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-1 size-3.5 shrink-0 text-emerald-300" />
                      <span>{criterion.description}</span>
                    </li>
                  ))
                : content.requirements.map((item) => (
                    <li key={item.label} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-1 size-3.5 shrink-0 text-emerald-300" />
                      <span>{item.label}</span>
                    </li>
                  ))}
            </ul>
          </article>

          <article className="rounded-[14px] border border-[#252a42] bg-[#15192b] p-5 text-start">
            <div className="mb-4 flex items-center gap-2 text-[14px] font-extrabold text-white">
              <LockKeyhole className="size-4 text-[#a898ff]" />
              {content.paymentStatusTitle}
            </div>
            <div className="space-y-3 text-[13px]">
              <div className="rounded-[10px] bg-[#101323] p-4">
                <span className="block text-[#737b99]">قبل الإرسال</span>
                <strong className="mt-2 block text-white">
                  {milestone
                    ? getDeliveryPaymentStatusLabel(milestone.paymentStatus)
                    : content.paymentStatus.beforeValue}
                </strong>
              </div>
              <div className="rounded-[10px] bg-[#101323] p-4">
                <span className="block text-[#737b99]">بعد الإرسال</span>
                <strong className="mt-2 block text-emerald-300">مراجعة العميل</strong>
              </div>
            </div>
          </article>

          {agreementId ? (
            <TimelineEvidencePanel
              agreementId={agreementId}
              eventTypes={[
                "DELIVERY_SUBMITTED",
                "DELIVERY_ACCEPTED",
                "DELIVERY_CHANGES_REQUESTED",
              ]}
              maxItems={3}
            />
          ) : null}
        </aside>
      </section>

      {isDeliveriesLoading && !latestDelivery ? (
        <p className="text-center text-[12px] text-[#8a91ac]">
          جاري تحميل بيانات التسليمات الحالية...
        </p>
      ) : null}
    </section>
  );
}

function sortDeliveriesByUpdatedAt(left: Delivery, right: Delivery) {
  return new Date(right.updatedAt).getTime() - new Date(left.updatedAt).getTime();
}

function getMutationDeliveryId(result: Delivery | DeliveryDetailsResponse) {
  return "data" in result ? result.data.id : result.id;
}
