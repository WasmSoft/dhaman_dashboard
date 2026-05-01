"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, CalendarClock, CheckCircle2, CircleDollarSign, ClipboardList, Copy, ExternalLink, FileText, History, LockKeyhole, Send, ShieldCheck, Sparkles, UserRound } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
  NotFoundState,
  Skeleton,
} from "@/components/shared";
import { agreementsContent } from "@/constants";
import {
  useActivateMutation,
  useAgreementDetailsQuery,
  useArchiveMutation,
  useSendInviteMutation,
} from "@/hooks/agreements";
import { useAgreementMilestonesQuery } from "@/hooks/milestones";
import { ApiError } from "@/lib/axios-instance";
import {
  buildPortalPath,
  buildPortalUrl,
  resolveClientPortalToken,
} from "@/lib/client-portal";
import {
  buildAgreementWorkspacePaymentRows,
  buildAgreementWorkspacePaymentSummary,
  formatMilestoneAmount,
  mapMilestoneToWorkspaceMilestone,
} from "@/lib/milestones";
import {
  buildMilestoneDeliveryHref,
  buildMilestoneDetailHref,
} from "@/lib/milestones/helpers";
import { buildCreateDeliveryHubHref } from "@/lib/deliveries/helpers";
import { cn } from "@/lib/utils";
import { AgreementTimelineSection } from "@/components/agreements/AgreementTimelineSection";
import { AgreementPoliciesSection } from "@/components/agreements/AgreementPoliciesSection";
import type {
  Agreement,
  AgreementStatus,
  AgreementWorkspaceActivityItem,
  AgreementWorkspaceMetricTone,
  AgreementWorkspaceMilestone,
  AgreementWorkspacePaymentRow,
  AgreementWorkspacePaymentSummary,
  AgreementWorkspacePaymentTone,
} from "@/types";

const metricToneClasses: Record<AgreementWorkspaceMetricTone, { icon: string; text: string; ring: string }> = {
  violet: { icon: "bg-[#6f52ff]/20 text-[#a898ff]", text: "text-[#a898ff]", ring: "border-[#6f52ff]/25" },
  emerald: { icon: "bg-emerald-500/15 text-emerald-300", text: "text-emerald-300", ring: "border-emerald-500/20" },
  amber: { icon: "bg-amber-500/15 text-amber-300", text: "text-amber-300", ring: "border-amber-500/20" },
  blue: { icon: "bg-blue-500/15 text-blue-300", text: "text-blue-300", ring: "border-blue-500/20" },
};

const paymentToneClasses: Record<AgreementWorkspacePaymentTone, { card: string; badge: string; value: string }> = {
  reserved: { card: "bg-[#6f52ff]/15", badge: "bg-[#6f52ff]/20 text-[#a898ff]", value: "text-[#a898ff]" },
  review: { card: "bg-amber-500/15", badge: "bg-amber-500/20 text-amber-300", value: "text-amber-300" },
  released: { card: "bg-emerald-500/15", badge: "bg-emerald-500/20 text-emerald-300", value: "text-emerald-300" },
  held: { card: "bg-red-500/15", badge: "bg-red-500/20 text-red-300", value: "text-red-300" },
};

const agreementStatusLabels: Record<AgreementStatus, string> = {
  DRAFT: "مسودة",
  SENT: "مرسلة",
  APPROVED: "موافق عليها",
  ACTIVE: "نشطة",
  COMPLETED: "مكتملة",
  CANCELLED: "ملغاة",
  DISPUTED: "متنازع عليها",
};

const agreementStatusBadgeClasses: Record<AgreementStatus, string> = {
  DRAFT: "bg-[#6f52ff]/15 text-[#a898ff]",
  SENT: "bg-amber-500/15 text-amber-300",
  APPROVED: "bg-blue-500/15 text-blue-300",
  ACTIVE: "bg-emerald-500/15 text-emerald-300",
  COMPLETED: "bg-slate-500/20 text-slate-300",
  CANCELLED: "bg-red-500/15 text-red-300",
  DISPUTED: "bg-violet-500/15 text-violet-300",
};

function formatAgreementAmount(amount: number, currency: string) {
  return `${new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)} ${currency}`;
}

function formatAgreementDate(dateValue: string | null | undefined) {
  if (!dateValue) {
    return "-";
  }

  const parsedDate = new Date(dateValue);

  if (Number.isNaN(parsedDate.getTime())) {
    return dateValue;
  }

  return parsedDate.toLocaleDateString("ar-SA");
}

function getAgreementProgress(status: AgreementStatus) {
  if (status === "DRAFT") return 15;
  if (status === "SENT") return 30;
  if (status === "APPROVED") return 55;
  if (status === "ACTIVE") return 75;
  if (status === "COMPLETED") return 100;
  if (status === "CANCELLED") return 100;
  return 65;
}

function resolvePrimaryDeliveryHref(
  agreementId: string | undefined,
  milestones: readonly AgreementWorkspaceMilestone[],
) {
  if (!agreementId) {
    return null;
  }

  const targetMilestone =
    milestones.find((milestone) => milestone.active && milestone.id) ??
    milestones.find((milestone) => milestone.id);

  if (!targetMilestone?.id) {
    return null;
  }

  return buildMilestoneDeliveryHref(agreementId, targetMilestone.id);
}

function getAgreementErrorMessage(error: unknown) {
  const apiError = error as ApiError;

  return (
    apiError.message ||
    "تعذر تنفيذ الإجراء الآن / Could not complete the requested action right now"
  );
}

function getSendInviteErrorMessage(error: unknown) {
  const apiError = error as ApiError;

  if (apiError.code === "AGREEMENT_CLIENT_REQUIRED") {
    return "يجب ربط عميل أولاً / A client must be linked first";
  }

  if (apiError.code === "AGREEMENT_POLICY_REQUIRED") {
    return "يجب تحديد السياسات أولاً / Policies must be set first";
  }

  if (apiError.code === "VALIDATION_ERROR") {
    return "يجب إضافة مرحلة واحدة على الأقل / At least one milestone is required";
  }

  if (apiError.code === "PAYMENT_INVALID_AMOUNT") {
    return "المبلغ الإجمالي لا يتطابق مع مجموع المراحل / Total amount does not match milestones sum";
  }

  if (apiError.code === "AGREEMENT_ALREADY_SENT") {
    return "تم إرسال الاتفاقية بالفعل / Agreement already sent";
  }

  return getAgreementErrorMessage(error);
}

function metricIcon(tone: AgreementWorkspaceMetricTone) {
  if (tone === "blue") return <UserRound className="size-4" />;
  if (tone === "emerald") return <CircleDollarSign className="size-4" />;
  if (tone === "amber") return <CalendarClock className="size-4" />;

  return <ShieldCheck className="size-4" />;
}

function WorkspaceHeader({
  agreement,
  deliveryHref,
  isSendInvitePending,
  isActivatePending,
  isArchivePending,
  onCopyInvite,
  onSendInvite,
  onActivate,
  onArchive,
}: {
  agreement: Agreement;
  deliveryHref: string | null;
  isSendInvitePending: boolean;
  isActivatePending: boolean;
  isArchivePending: boolean;
  onCopyInvite: () => void;
  onSendInvite: () => void;
  onActivate: () => void;
  onArchive: () => void;
}) {
  const content = agreementsContent.agreementWorkspacePage;
  const canSendInvite = agreement.status === "DRAFT";
  const canActivate = agreement.status === "APPROVED";
  const canArchive = agreement.status !== "COMPLETED";
  const canSubmitDelivery = agreement.status === "ACTIVE";
  const portalToken = resolveClientPortalToken(agreement);
  const portalHref = portalToken
    ? buildPortalPath(
        portalToken,
        agreement.status === "SENT" || agreement.status === "DISPUTED"
          ? "portalHome"
          : "tracking",
      )
    : null;

  return (
    <section className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
      <div className="order-2 max-w-xl text-start lg:order-1">
        <Button asChild variant="link" className="mb-2 h-auto justify-start p-0 text-[12px] font-bold text-[#8a91ac] hover:text-white">
          <Link href="/agreements">
            <ArrowRight className="size-3.5" />
            {content.backLabel}
          </Link>
        </Button>
        <h1 className="text-2xl font-extrabold tracking-[-0.02em] text-white md:text-[28px]">
          {agreement.title}
        </h1>
        <p className="mt-1 text-sm leading-6 text-[#737b99]">
          {agreement.description || content.subtitle}
        </p>
      </div>

      <div className="order-1 flex flex-wrap gap-2 lg:order-2">
        {canSendInvite ? (
          <Button
            className="h-10 rounded-[10px] bg-[#6f52ff] px-4 text-sm font-bold text-white shadow-[0_12px_28px_rgba(111,82,255,0.26)] hover:bg-[#7b63ff]"
            disabled={isSendInvitePending}
            onClick={onSendInvite}
          >
            <Send className="size-[15px]" />
            {isSendInvitePending ? "جارٍ الإرسال..." : "إرسال الدعوة"}
          </Button>
        ) : null}

        {canActivate ? (
          <Button
            className="h-10 rounded-[10px] bg-emerald-600 px-4 text-sm font-bold text-white shadow-[0_12px_28px_rgba(5,150,105,0.24)] hover:bg-emerald-500"
            disabled={isActivatePending}
            onClick={onActivate}
          >
            <ShieldCheck className="size-[15px]" />
            {isActivatePending ? "جارٍ التفعيل..." : "تفعيل الاتفاقية"}
          </Button>
        ) : null}

        {canSubmitDelivery && deliveryHref ? (
          <Button asChild className="h-10 rounded-[10px] bg-[#6f52ff] px-4 text-sm font-bold text-white shadow-[0_12px_28px_rgba(111,82,255,0.26)] hover:bg-[#7b63ff]">
            <Link href={deliveryHref}>
              <Send className="size-[15px]" />
              {content.submitLabel}
            </Link>
          </Button>
        ) : null}

        {agreement.status === "DRAFT" ? (
          <Button
            asChild
            variant="secondary"
            className="h-10 rounded-[10px] border border-[#252a42] bg-[#15192b] px-4 text-sm font-bold text-[#c7cce0] hover:bg-[#1d2135] hover:text-white"
          >
            <Link href={`/agreements/${agreement.id}/edit`}>
              <FileText className="size-[15px]" />
              تعديل الاتفاقية
            </Link>
          </Button>
        ) : null}

        {portalHref ? (
          <Button asChild variant="secondary" className="h-10 rounded-[10px] border border-[#252a42] bg-[#15192b] px-4 text-sm font-bold text-[#c7cce0] hover:bg-[#1d2135] hover:text-white">
            <Link href={portalHref}>
              <ExternalLink className="size-[15px]" />
              {content.portalLabel}
            </Link>
          </Button>
        ) : (
          <Button variant="secondary" className="h-10 rounded-[10px] border border-[#252a42] bg-[#15192b] px-4 text-sm font-bold text-[#c7cce0] hover:bg-[#1d2135] hover:text-white" disabled>
            <ExternalLink className="size-[15px]" />
            {content.portalLabel}
          </Button>
        )}
        <Button variant="secondary" className="h-10 rounded-[10px] border border-[#252a42] bg-[#15192b] px-4 text-sm font-bold text-[#c7cce0] hover:bg-[#1d2135] hover:text-white" disabled={!portalToken} onClick={onCopyInvite}>
          <Copy className="size-[15px]" />
          {content.copyInviteLabel}
        </Button>

        {canArchive ? (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="destructive"
                className="h-10 rounded-[10px] border border-red-500/20 px-4 text-sm font-bold"
                type="button"
              >
                أرشفة الاتفاقية
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent dir="rtl">
              <AlertDialogHeader>
                <AlertDialogTitle>تأكيد أرشفة الاتفاقية</AlertDialogTitle>
                <AlertDialogDescription>
                  سيتم نقل هذه الاتفاقية إلى حالة ملغاة. هل تريد المتابعة؟
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel asChild>
                  <Button variant="secondary" className="h-10 rounded-[10px] border border-[#252a42] bg-[#101323] px-4 text-sm font-bold text-[#c7cce0] hover:bg-[#1d2135] hover:text-white">
                    إلغاء
                  </Button>
                </AlertDialogCancel>
                <AlertDialogAction asChild>
                  <Button
                    variant="destructive"
                    className="h-10 rounded-[10px] border border-red-500/20 px-4 text-sm font-bold"
                    disabled={isArchivePending}
                    onClick={onArchive}
                  >
                    {isArchivePending ? "جارٍ الأرشفة..." : "تأكيد الأرشفة"}
                  </Button>
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        ) : null}
      </div>
    </section>
  );
}

function AgreementOverviewCard({ agreement }: { agreement: Agreement }) {
  const content = agreementsContent.agreementWorkspacePage;
  const progressValue = `${getAgreementProgress(agreement.status)}%`;
  const summaryMetrics = [
    {
      label: "العميل",
      value: agreement.client?.name ?? "عميل غير مرتبط",
      tone: "blue",
    },
    {
      label: "إجمالي الاتفاق",
      value: formatAgreementAmount(agreement.totalAmount, agreement.currency),
      tone: "emerald",
    },
    {
      label: "عدد المراحل",
      value: String(agreement.milestones.length),
      tone: "violet",
    },
    {
      label: agreement.sentAt ? "تاريخ الإرسال" : "تاريخ الإنشاء",
      value: formatAgreementDate(agreement.sentAt ?? agreement.createdAt),
      tone: "amber",
    },
  ] as const;

  return (
    <section className="rounded-[14px] border border-[#252a42] bg-[radial-gradient(circle_at_top_right,rgba(111,82,255,0.22),transparent_42%),#15192b] p-4 shadow-[0_18px_45px_rgba(4,7,20,0.18)] md:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="text-start">
          <h2 className="text-[18px] font-extrabold text-white md:text-[20px]">{agreement.title}</h2>
          <p className="mt-2 text-[13px] leading-6 text-[#a7aecb]">
            {agreement.description || content.projectDescription}
          </p>
        </div>
        <span
          className={cn(
            "inline-flex w-fit items-center gap-2 rounded-md px-3 py-1.5 text-[12px] font-bold",
            agreementStatusBadgeClasses[agreement.status],
          )}
        >
          <span className="size-1.5 rounded-full bg-current" />
          {agreementStatusLabels[agreement.status]}
        </span>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {summaryMetrics.map((metric) => (
          <article key={metric.label} className={cn("rounded-[10px] border bg-[#1d2135] p-4 text-start", metricToneClasses[metric.tone].ring)}>
            <span className={cn("mb-3 grid size-8 place-items-center rounded-[9px]", metricToneClasses[metric.tone].icon)}>{metricIcon(metric.tone)}</span>
            <span className="text-[11px] text-[#737b99]">{metric.label}</span>
            <strong className={cn("mt-2 block text-[14px] font-extrabold text-white", metricToneClasses[metric.tone].text)} dir={metric.tone === "emerald" || metric.tone === "amber" ? "ltr" : undefined}>{metric.value}</strong>
          </article>
        ))}
      </div>

      <div className="mt-5 space-y-2">
        <div className="flex items-center justify-between text-[12px]">
          <span className="font-bold text-white">{progressValue}</span>
          <span className="text-[#a7aecb]">{content.progressLabel}</span>
        </div>
        <div className="h-1.5 rounded-full bg-[#0d1020]">
          <span className="block h-full rounded-full bg-gradient-to-l from-emerald-400 to-[#6f52ff]" style={{ width: progressValue }} />
        </div>
      </div>
    </section>
  );
}

function MilestoneCard({
  milestone,
  agreementId,
}: {
  milestone: AgreementWorkspaceMilestone;
  agreementId?: string;
}) {
  const detailsHref =
    agreementId && milestone.id
      ? buildMilestoneDetailHref(agreementId, milestone.id)
      : null;
  const deliveryHref =
    agreementId && milestone.id
      ? buildMilestoneDeliveryHref(agreementId, milestone.id)
      : null;

  return (
    <article className={cn("relative rounded-[12px] border border-[#252a42] bg-[#1d2135] p-4 text-start", milestone.active && "border-[#6f52ff]/35 bg-[#201d42]")}> 
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex gap-3">
          <span className={cn("grid size-7 shrink-0 place-items-center rounded-lg text-[12px] font-bold", milestone.active ? "bg-[#6f52ff] text-white" : "bg-[#252a42] text-[#a7aecb]")}>{milestone.number}</span>
          <div>
            <h3 className="text-[14px] font-extrabold leading-6 text-white">{milestone.title}</h3>
            <div className="mt-2 flex flex-wrap gap-2 text-[11px]">
              <span className="font-bold text-emerald-300" dir="ltr">{milestone.amount}</span>
              <span className="text-[#737b99]">{milestone.due}</span>
              <span className={cn("rounded-md px-2 py-0.5 font-bold", milestone.active ? "bg-emerald-500/15 text-emerald-300" : "bg-amber-500/15 text-amber-300")}>{milestone.status}</span>
              <span className="rounded-md bg-[#6f52ff]/15 px-2 py-0.5 font-bold text-[#a898ff]">{milestone.paymentStatus}</span>
              <span className="rounded-md bg-blue-500/15 px-2 py-0.5 font-bold text-blue-300">{milestone.operationStatus}</span>
            </div>
          </div>
        </div>
        {detailsHref ? (
          <Button
            asChild
            size="icon-sm"
            variant="ghost"
            className="shrink-0 rounded-lg bg-[#101323] text-[#8a91ac] hover:bg-[#1d2135] hover:text-white"
          >
            <Link href={detailsHref} aria-label={contentlessAriaLabel(milestone.title)}>
              <ClipboardList className="size-3.5" />
            </Link>
          </Button>
        ) : (
          <button className="grid size-7 shrink-0 place-items-center rounded-lg bg-[#101323] text-[#8a91ac] hover:text-white" type="button" aria-label={contentlessAriaLabel(milestone.title)}>
            <ClipboardList className="size-3.5" />
          </button>
        )}
      </div>

      {milestone.active ? (
        <div className="mt-4 rounded-[10px] border border-[#252a42] bg-[#15192b] p-4">
          <h4 className="mb-3 text-[12px] font-extrabold text-white">شروط القبول</h4>
          <ul className="space-y-2 text-[12px] leading-6 text-[#a7aecb]">
            {milestone.acceptanceCriteria.map((criteria) => (
              <li key={criteria} className="flex items-center gap-2">
                <CheckCircle2 className="size-3.5 shrink-0 text-emerald-300" />
                {criteria}
              </li>
            ))}
          </ul>
          <p className="mt-4 flex items-center gap-2 text-[12px] text-[#a7aecb]">
            <LockKeyhole className="size-3.5 text-[#a898ff]" />
            {milestone.revisionLimit}
          </p>
          <div className="mt-4 flex flex-wrap justify-end gap-2">
            {detailsHref ? (
              <Button asChild variant="secondary" className="h-8 rounded-[8px] border border-[#252a42] bg-[#101323] px-3 text-[12px] font-bold text-[#c7cce0] hover:bg-[#262b49] hover:text-white">
                <Link href={detailsHref}>
                  <FileText className="size-3.5" />
                  {agreementsContent.agreementWorkspacePage.detailsLabel}
                </Link>
              </Button>
            ) : (
              <Button variant="secondary" className="h-8 rounded-[8px] border border-[#252a42] bg-[#101323] px-3 text-[12px] font-bold text-[#c7cce0] hover:bg-[#262b49] hover:text-white">
                <FileText className="size-3.5" />
                {agreementsContent.agreementWorkspacePage.detailsLabel}
              </Button>
            )}
            <Button asChild className="h-8 rounded-[8px] bg-[#6f52ff] px-3 text-[12px] font-bold text-white hover:bg-[#7b63ff]">
              <Link href={deliveryHref ?? "/agreements"}>
                <Send className="size-3.5" />
                {agreementsContent.agreementWorkspacePage.submitLabel}
              </Link>
            </Button>
          </div>
        </div>
      ) : null}
    </article>
  );
}

function contentlessAriaLabel(title: string) {
  return `عرض تفاصيل ${title}`;
}

function MilestonesSection({
  agreementId,
  milestones,
  isLoading,
  isError,
  onRetry,
}: {
  agreementId?: string;
  milestones?: readonly AgreementWorkspaceMilestone[];
  isLoading?: boolean;
  isError?: boolean;
  onRetry?: () => void;
}) {
  const content = agreementsContent.agreementWorkspacePage;
  const milestoneItems: readonly AgreementWorkspaceMilestone[] =
    milestones ?? content.milestones;

  return (
    <section className="rounded-[14px] border border-[#252a42] bg-[#15192b] p-4 md:p-6">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div className="text-start">
          <h2 className="text-[18px] font-extrabold text-white">{content.milestonesTitle}</h2>
          <p className="mt-1 text-[12px] leading-6 text-[#737b99]">{content.milestonesDescription}</p>
        </div>
        <span className="grid size-9 shrink-0 place-items-center rounded-[10px] bg-[#6f52ff]/20 text-[#a898ff]">
          <Sparkles className="size-4" />
        </span>
      </div>
      <div className="space-y-3">
        {isLoading ? (
          <div className="rounded-[10px] border border-dashed border-[#252a42] bg-[#12162a] px-4 py-5 text-center text-[12px] text-[#8a91ac]">
            جاري تحميل المراحل...
          </div>
        ) : null}

        {isError ? (
          <div className="rounded-[10px] border border-red-500/20 bg-red-500/10 px-4 py-5 text-center text-[12px] text-red-100/85">
            <p>تعذر تحميل المراحل الحالية.</p>
            {onRetry ? (
              <Button onClick={onRetry} variant="secondary" className="mt-3 h-8 rounded-[8px] border border-red-500/20 bg-red-500/10 px-3 text-[12px] font-bold text-red-100 hover:bg-red-500/20">
                إعادة المحاولة
              </Button>
            ) : null}
          </div>
        ) : null}

        {!isLoading && !isError && milestoneItems.length === 0 ? (
          <div className="rounded-[10px] border border-dashed border-[#252a42] bg-[#12162a] px-4 py-5 text-center text-[12px] text-[#8a91ac]">
            لا توجد مراحل مضافة لهذه الاتفاقية بعد.
          </div>
        ) : null}

        {!isLoading && !isError
          ? milestoneItems.map((milestone) => (
              <MilestoneCard
                key={milestone.id ?? milestone.number}
                milestone={milestone}
                agreementId={agreementId}
              />
            ))
          : null}
      </div>
    </section>
  );
}

function PaymentsSection({
  paymentSummary,
  paymentRows,
  agreementId,
}: {
  paymentSummary?: readonly AgreementWorkspacePaymentSummary[];
  paymentRows?: readonly AgreementWorkspacePaymentRow[];
  agreementId?: string;
}) {
  const content = agreementsContent.agreementWorkspacePage;
  const summaryItems = paymentSummary ?? content.paymentSummary;
  const rows = paymentRows ?? content.paymentRows;

  return (
    <section className="rounded-[14px] border border-[#252a42] bg-[#15192b] p-4 md:p-6">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div className="text-start">
          <h2 className="text-[18px] font-extrabold text-white">{content.paymentsTitle}</h2>
          <p className="mt-1 text-[12px] leading-6 text-[#737b99]">{content.paymentsDescription}</p>
        </div>
        <span className="grid size-9 shrink-0 place-items-center rounded-[10px] bg-emerald-500/15 text-emerald-300">
          <CircleDollarSign className="size-4" />
        </span>
      </div>

      {agreementId ? (
        <div className="mb-4 flex flex-wrap gap-2">
          <Button asChild variant="secondary" className="h-8 gap-1.5 rounded-[8px] border border-[#252a42] bg-[#101323] px-3 text-[11px] font-bold text-[#a898ff] hover:bg-[#1d2135] hover:text-white">
            <Link href={`/agreements/${agreementId}/payments`}>
              <CircleDollarSign className="size-3" />
              فتح الدفعات
            </Link>
          </Button>
          <Button asChild variant="secondary" className="h-8 gap-1.5 rounded-[8px] border border-[#252a42] bg-[#101323] px-3 text-[11px] font-bold text-[#c7cce0] hover:bg-[#1d2135] hover:text-white">
            <Link href={`/agreements/${agreementId}/payment-history`}>
              <History className="size-3" />
              سجل الدفعات
            </Link>
          </Button>
        </div>
      ) : null}

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {summaryItems.map((item) => (
          <article key={item.label} className={cn("rounded-[10px] p-4 text-start", paymentToneClasses[item.tone].card)}>
            <strong className={cn("block text-[18px] font-extrabold", paymentToneClasses[item.tone].value)} dir="ltr">{item.value}</strong>
            <span className="mt-2 block text-[11px] text-[#a7aecb]">{item.label}</span>
          </article>
        ))}
      </div>

      {/* AR: جدول الدفعات قابل للتمرير على الجوال ويحافظ على ترتيب الأعمدة العربي. EN: The payment table scrolls on mobile while preserving Arabic column order. */}
      <div className="mt-4 overflow-x-auto rounded-[10px] border border-[#252a42]">
        <table className="w-full min-w-[560px] border-collapse text-start text-[12px]">
          <thead className="bg-[#101323] text-[#737b99]">
            <tr className="h-10">
              {content.paymentTableHeaders.map((header) => (
                <th key={header} className="px-4 font-bold">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.milestone} className="h-12 border-t border-[#252a42] text-[#c7cce0]">
                <td className="px-4 font-bold text-white">{row.milestone}</td>
                <td className="px-4 font-bold text-emerald-300" dir="ltr">{row.amount}</td>
                <td className="px-4">
                  <span className={cn("rounded-md px-2 py-1 text-[11px] font-bold", paymentToneClasses[row.tone].badge)}>{row.status}</span>
                </td>
                <td className="px-4 text-[#8a91ac]">{row.operation}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function ActivityIcon({ activity }: { activity: AgreementWorkspaceActivityItem }) {
  return (
    <span className={cn("relative z-10 grid size-8 shrink-0 place-items-center rounded-full", metricToneClasses[activity.tone].icon)}>
      <History className="size-3.5" />
    </span>
  );
}

function ActivitySection() {
  const content = agreementsContent.agreementWorkspacePage;

  return (
    <section className="rounded-[14px] border border-[#252a42] bg-[#15192b] p-4 md:p-6">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div className="text-start">
          <h2 className="text-[18px] font-extrabold text-white">{content.activityTitle}</h2>
          <p className="mt-1 text-[12px] leading-6 text-[#737b99]">{content.activityDescription}</p>
        </div>
        <span className="grid size-9 shrink-0 place-items-center rounded-[10px] bg-blue-500/15 text-blue-300">
          <History className="size-4" />
        </span>
      </div>
      <div className="space-y-0">
        {content.activities.map((activity, index) => (
          <article key={activity.title} className="relative grid grid-cols-[1fr_32px] gap-4 pb-5 last:pb-0">
            {index < content.activities.length - 1 ? <span className="absolute end-4 top-8 h-[calc(100%-2rem)] w-px bg-[#252a42]" /> : null}
            <div className="rounded-[10px] bg-[#101323]/50 px-4 py-3 text-start">
              <h3 className="text-[13px] font-extrabold text-white">{activity.title}</h3>
              <p className="mt-1 text-[12px] leading-6 text-[#a7aecb]">{activity.description}</p>
              <span className="mt-1 block text-[11px] text-[#737b99]">{activity.time}</span>
            </div>
            <ActivityIcon activity={activity} />
          </article>
        ))}
      </div>
    </section>
  );
}

function WorkspaceSidebar({
  agreement,
  deliveryHref,
  paymentSummary,
}: {
  agreement: Agreement;
  deliveryHref: string | null;
  paymentSummary: readonly AgreementWorkspacePaymentSummary[];
}) {
  const content = agreementsContent.agreementWorkspacePage;
  const portalToken = resolveClientPortalToken(agreement);
  const portalRoute =
    agreement.status === "SENT" || agreement.status === "DISPUTED"
      ? "portalHome"
      : "tracking";
  const portalHref = portalToken ? buildPortalPath(portalToken, portalRoute) : null;
  const portalDisplayLink =
    portalToken && typeof window !== "undefined"
      ? buildPortalUrl(portalToken, portalRoute, window.location.origin)
      : portalHref ?? content.clientPortalLink;
  const quickSummaryItems = [
    {
      label: "قيمة الاتفاق",
      value: formatAgreementAmount(agreement.totalAmount, agreement.currency),
      tone: "emerald",
    },
    {
      label: "عدد المراحل",
      value: String(agreement.milestones.length),
      tone: "violet",
    },
    {
      label: "الحالة",
      value: agreementStatusLabels[agreement.status],
      tone: agreement.status === "ACTIVE" ? "emerald" : "amber",
    },
    {
      label: agreement.sentAt ? "تاريخ الإرسال" : "تاريخ الإنشاء",
      value: formatAgreementDate(agreement.sentAt ?? agreement.createdAt),
      tone: "amber",
    },
  ] as const;

  return (
    <aside className="space-y-3 xl:w-[230px] xl:shrink-0">
      <article className="rounded-[14px] border border-[#252a42] bg-[#15192b] p-5">
        <h2 className="mb-4 text-[14px] font-extrabold text-white">{content.quickSummaryTitle}</h2>
        <div className="space-y-3">
          {quickSummaryItems.map((item) => (
            <div key={item.label} className="flex items-center justify-between gap-3 text-[12px]">
              <strong className={cn("text-white", metricToneClasses[item.tone].text)} dir={item.tone === "emerald" || item.tone === "amber" ? "ltr" : undefined}>{item.value}</strong>
              <span className="text-[#737b99]">{item.label}</span>
            </div>
          ))}
        </div>
      </article>

      <article className="rounded-[14px] border border-[#252a42] bg-[#15192b] p-5">
        <h2 className="mb-4 text-[14px] font-extrabold text-white">{content.financialSummaryTitle}</h2>
        <div className="space-y-3">
          {paymentSummary.map((item) => (
            <div key={item.label} className="flex items-center justify-between gap-3 text-[12px]">
              <strong className={paymentToneClasses[item.tone].value} dir="ltr">{item.value}</strong>
              <span className="text-[#737b99]">{item.label}</span>
            </div>
          ))}
        </div>
        <div className="mt-5 h-1.5 rounded-full bg-[#0d1020]">
          <span className="block h-full w-1/3 rounded-full bg-[#6f52ff]" />
        </div>
      </article>

      <article className="rounded-[14px] border border-[#252a42] bg-[#15192b] p-5">
        <h2 className="mb-4 text-[14px] font-extrabold text-[#a898ff]">{content.quickActionsTitle}</h2>
        <div className="space-y-2">
          {content.quickActions.map((action) => {
            const isActive = "active" in action && action.active;
            const isSubmitAction = action.label === content.submitLabel;

            if (isSubmitAction) {
              return (
                <Link
                  key={action.label}
                  href={deliveryHref ?? buildCreateDeliveryHubHref()}
                  className={cn(
                    "flex h-9 w-full items-center justify-between rounded-[9px] border px-3 text-[12px] font-bold transition",
                    isActive
                      ? "border-[#6f52ff]/45 bg-[#6f52ff]/20 text-white"
                      : "border-[#252a42] bg-[#101323] text-[#8a91ac] hover:text-white",
                  )}
                >
                  {action.label}
                  <Send className="size-3.5" />
                </Link>
              );
            }

            return (
              <button key={action.label} className={cn("flex h-9 w-full items-center justify-between rounded-[9px] border px-3 text-[12px] font-bold transition", isActive ? "border-[#6f52ff]/45 bg-[#6f52ff]/20 text-white" : "border-[#252a42] bg-[#101323] text-[#8a91ac] hover:text-white")} type="button">
                {action.label}
                <Send className="size-3.5" />
              </button>
            );
          })}
        </div>
      </article>

      <article className="rounded-[14px] border border-[#6f52ff]/25 bg-[#6f52ff]/10 p-5">
        <div className="mb-3 flex items-center justify-between gap-3">
          <h2 className="text-[14px] font-extrabold text-white">{content.clientPortalTitle}</h2>
          <span className="rounded-md bg-emerald-500/15 px-2 py-1 text-[11px] font-bold text-emerald-300">{portalHref ? content.clientPortalStatus : "غير متاح"}</span>
        </div>
        <p className="text-[12px] leading-6 text-[#a7aecb]">{content.clientPortalDescription}</p>
        <span className="mt-3 block rounded-[8px] bg-[#101323] px-3 py-2 text-center text-[11px] text-[#a898ff]" dir="ltr">{portalDisplayLink}</span>
        {portalHref ? (
          <Button asChild variant="secondary" className="mt-3 h-9 w-full rounded-[9px] border border-[#252a42] bg-[#101323] text-[12px] font-bold text-white hover:bg-[#1d2135]">
            <Link href={portalHref}>
              <ExternalLink className="size-3.5" />
              {content.clientPortalAction}
            </Link>
          </Button>
        ) : (
          <Button variant="secondary" className="mt-3 h-9 w-full rounded-[9px] border border-[#252a42] bg-[#101323] text-[12px] font-bold text-white hover:bg-[#1d2135]" disabled>
            <ExternalLink className="size-3.5" />
            {content.clientPortalAction}
          </Button>
        )}
      </article>

      <article className="rounded-[14px] border border-[#6f52ff]/40 bg-gradient-to-l from-[#6f52ff] to-[#8b74ff] p-5 text-white shadow-[0_16px_34px_rgba(111,82,255,0.24)]">
        <h2 className="text-[14px] font-extrabold">{content.nextStepTitle}</h2>
        <p className="mt-3 text-[12px] leading-6 text-white/75">{content.nextStepDescription}</p>
        {agreement.status === "ACTIVE" && deliveryHref ? (
          <Button asChild className="mt-4 h-9 w-full rounded-[9px] bg-white text-[12px] font-extrabold text-[#4c35c7] hover:bg-white/90">
            <Link href={deliveryHref}>
              <Send className="size-3.5" />
              {content.nextStepAction}
            </Link>
          </Button>
        ) : (
          <Button
            className="mt-4 h-9 w-full rounded-[9px] bg-white/70 text-[12px] font-extrabold text-[#4c35c7]"
            disabled
          >
            <Send className="size-3.5" />
            {agreementStatusLabels[agreement.status]}
          </Button>
        )}
      </article>
    </aside>
  );
}

export function AgreementWorkspaceSection({
  agreementId,
}: {
  agreementId?: string;
}) {
  const content = agreementsContent.agreementWorkspacePage;
  const [workspaceFeedback, setWorkspaceFeedback] = useState<string | null>(null);
  const {
    data: agreement,
    isLoading: isAgreementLoading,
    isError: isAgreementError,
    error: agreementError,
    refetch: refetchAgreement,
  } = useAgreementDetailsQuery(agreementId ?? "");
  const sendInviteMutation = useSendInviteMutation();
  const activateMutation = useActivateMutation();
  const archiveMutation = useArchiveMutation();
  const {
    data: milestoneResponse,
    isLoading: isMilestonesLoading,
    isError: isMilestonesError,
    refetch: refetchMilestones,
  } = useAgreementMilestonesQuery(agreementId);

  const liveMilestoneSummary = milestoneResponse?.data;
  const workspaceMilestones = liveMilestoneSummary
    ? liveMilestoneSummary.milestones.map(mapMilestoneToWorkspaceMilestone)
    : content.milestones;
  const workspacePaymentSummary = liveMilestoneSummary
    ? buildAgreementWorkspacePaymentSummary(liveMilestoneSummary.milestones)
    : content.paymentSummary;
  const workspacePaymentRows = liveMilestoneSummary
    ? buildAgreementWorkspacePaymentRows(liveMilestoneSummary.milestones)
    : content.paymentRows;
  const primaryDeliveryHref = resolvePrimaryDeliveryHref(
    agreementId,
    workspaceMilestones,
  );

  async function handleCopyInvite() {
    const portalToken = agreement ? resolveClientPortalToken(agreement) : null;

    if (!portalToken || typeof navigator === "undefined") {
      return;
    }

    await navigator.clipboard.writeText(
      buildPortalUrl(portalToken, "portalHome", window.location.origin),
    );
    setWorkspaceFeedback("تم نسخ رابط الدعوة / Invite link copied");
  }

  async function handleSendInvite() {
    if (!agreementId) {
      return;
    }

    setWorkspaceFeedback(null);

    try {
      await sendInviteMutation.mutateAsync(agreementId);
      setWorkspaceFeedback("تم إرسال الاتفاقية للعميل / Agreement invite sent");
    } catch (error) {
      setWorkspaceFeedback(getSendInviteErrorMessage(error));
    }
  }

  async function handleActivateAgreement() {
    if (!agreementId) {
      return;
    }

    setWorkspaceFeedback(null);

    try {
      await activateMutation.mutateAsync(agreementId);
      setWorkspaceFeedback("تم تفعيل الاتفاقية / Agreement activated");
    } catch (error) {
      setWorkspaceFeedback(getAgreementErrorMessage(error));
    }
  }

  async function handleArchiveAgreement() {
    if (!agreementId) {
      return;
    }

    setWorkspaceFeedback(null);

    try {
      await archiveMutation.mutateAsync(agreementId);
      setWorkspaceFeedback("تمت أرشفة الاتفاقية / Agreement archived");
    } catch (error) {
      setWorkspaceFeedback(getAgreementErrorMessage(error));
    }
  }

  if (!agreementId) {
    return (
      <NotFoundState
        eyebrow="الاتفاقات"
        code="404"
        title="تعذر العثور على الاتفاقية"
        description="المعرّف المطلوب غير موجود أو لم يتم تمريره إلى مساحة العمل الحالية."
        primaryActionLabel="العودة إلى الاتفاقات"
        primaryActionHref="/agreements"
        highlights={[]}
      />
    );
  }

  if (isAgreementLoading && !agreement) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-24 w-full rounded-[14px] bg-[#1d2135]" />
        <Skeleton className="h-52 w-full rounded-[14px] bg-[#1d2135]" />
        <Skeleton className="h-64 w-full rounded-[14px] bg-[#1d2135]" />
      </div>
    );
  }

  if (isAgreementError && !agreement) {
    const apiError = agreementError as ApiError;

    if (apiError.statusCode === 404) {
      return (
        <NotFoundState
          eyebrow="الاتفاقات"
          code="404"
          title="هذه الاتفاقية غير متاحة"
          description="إما أن الاتفاقية غير موجودة أو أنها لا تخص حسابك الحالي."
          primaryActionLabel="العودة إلى الاتفاقات"
          primaryActionHref="/agreements"
          highlights={[]}
        />
      );
    }

    return (
      <section className="rounded-[14px] border border-red-500/20 bg-red-500/10 px-5 py-6 text-start text-[13px] text-red-100/90">
        <p>{getAgreementErrorMessage(agreementError)}</p>
        <Button
          variant="secondary"
          className="mt-4 h-9 rounded-[10px] border border-red-500/20 bg-red-500/10 px-4 text-[12px] font-bold text-red-50 hover:bg-red-500/20"
          onClick={() => refetchAgreement()}
        >
          إعادة المحاولة
        </Button>
      </section>
    );
  }

  if (!agreement) {
    return null;
  }

  return (
    <>
      <WorkspaceHeader
        agreement={agreement}
        deliveryHref={primaryDeliveryHref}
        isSendInvitePending={sendInviteMutation.isPending}
        isActivatePending={activateMutation.isPending}
        isArchivePending={archiveMutation.isPending}
        onCopyInvite={handleCopyInvite}
        onSendInvite={handleSendInvite}
        onActivate={handleActivateAgreement}
        onArchive={handleArchiveAgreement}
      />
      {workspaceFeedback ? (
        <section className="mb-4 rounded-[14px] border border-[#252a42] bg-[#15192b] px-4 py-3 text-start text-[12px] leading-6 text-[#c7cce0]">
          {workspaceFeedback}
        </section>
      ) : null}
      {/* AR: مساحة العمل تعرض تفاصيل الاتفاق النشط بعمود محتوى وملخص جانبي مطابق لاتجاه RTL. EN: The workspace shows active agreement details with a content column and RTL-aligned side summary. */}
      <section dir="ltr" className="mx-auto flex max-w-[980px] flex-col gap-4 xl:flex-row xl:items-start">
        <WorkspaceSidebar
          agreement={agreement}
          deliveryHref={primaryDeliveryHref}
          paymentSummary={workspacePaymentSummary}
        />
        <div dir="rtl" className="min-w-0 flex-1 space-y-4 pb-10">
          <AgreementOverviewCard agreement={agreement} />
          {agreement.status !== "DRAFT" ? (
            <section className="rounded-[14px] border border-[#252a42] bg-[#15192b] px-4 py-4 text-start text-[12px] leading-6 text-[#a7aecb] md:px-5">
              هذه الاتفاقية للقراءة فقط حالياً. التحرير متاح للمسودات فقط.
            </section>
          ) : null}
          {liveMilestoneSummary && !liveMilestoneSummary.amountMatch ? (
            <section className="rounded-[14px] border border-amber-500/25 bg-amber-500/10 px-4 py-4 text-start text-[12px] leading-6 text-amber-100/85 md:px-5">
              <strong className="block text-amber-300">تنبيه توافق المبالغ</strong>
              <p className="mt-1">
                مجموع المراحل الحالي هو{" "}
                <span className="font-bold" dir="ltr">
                  {formatMilestoneAmount(
                    liveMilestoneSummary.totalAmount,
                    liveMilestoneSummary.currency,
                  )}
                </span>
                {" "}بينما قيمة الاتفاق هي{" "}
                <span className="font-bold" dir="ltr">
                  {formatMilestoneAmount(
                    liveMilestoneSummary.agreementTotalAmount,
                    liveMilestoneSummary.currency,
                  )}
                </span>
                .
              </p>
            </section>
          ) : null}
          <AgreementPoliciesSection
            agreementId={agreementId}
            isDraft={agreement.status === "DRAFT"}
          />
          <MilestonesSection
            agreementId={agreementId}
            milestones={workspaceMilestones}
            isLoading={Boolean(agreementId) && isMilestonesLoading && !liveMilestoneSummary}
            isError={Boolean(agreementId) && isMilestonesError}
            onRetry={() => refetchMilestones()}
          />
          <PaymentsSection
            paymentSummary={workspacePaymentSummary}
            paymentRows={workspacePaymentRows}
            agreementId={agreementId}
          />
          <ActivitySection />
          {/* AR: السجل الزمني الحي للاتفاقية — يعرض أحداث الأدلة الفعلية من الخادم.
              EN: Live agreement timeline — displays actual evidence events from the backend. */}
          {agreementId ? (
            <AgreementTimelineSection agreementId={agreementId} />
          ) : null}
        </div>
      </section>
    </>
  );
}
