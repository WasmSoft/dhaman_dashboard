"use client";

import {
  CheckCircle2,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { clientPortalContent } from "@/constants";
import { Button } from "@/components/shared";
import { AgreementSummarySection } from "@/components/client-portal/AgreementSummarySection";
import { AgreementHero } from "@/components/client-portal/AgreementHero";
import { AiDisputeSection } from "@/components/client-portal/AiDisputeSection";
import { DecisionSection } from "@/components/client-portal/DecisionSection";
import { MilestonesSection } from "@/components/client-portal/MilestonesSection";
import { PolicySection } from "@/components/client-portal/PolicySection";
import { usePortalApproveMutation, usePortalInviteQuery, usePortalRejectMutation, usePortalRequestChangesMutation } from "@/hooks/client-portal";
import { ApiError } from "@/lib/axios-instance";
import { buildPortalPath, portalRejectSchema, portalRequestChangesSchema } from "@/lib/client-portal";

import type {
  PortalAgreement,
  PortalParty,
  PortalPolicy,
  PortalProjectSummary,
  PortalRejectAgreementPayload,
  PortalRequestChangesPayload,
} from "@/types";

function formatCurrency(amount: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(amount);
}

function buildAgreement(status: string, title: string, totalAmount: string, currency: string, sender: string, milestonesCount: number): PortalAgreement {
  const badgeClasses = {
    pending: "rounded-full border border-amber-400/30 bg-amber-400/15 px-3 py-1 text-[11px] font-bold text-[#fbbf24]",
    stage: "rounded-full border border-[#6d5dfc]/30 bg-[#6d5dfc]/15 px-3 py-1 text-[11px] font-bold text-[#a78bfa]",
    escrow: "rounded-full border border-emerald-400/25 bg-emerald-400/[0.12] px-3 py-1 text-[11px] font-bold text-[#4ade80]",
    ai: "rounded-full border border-blue-400/30 bg-blue-400/15 px-3 py-1 text-[11px] font-bold text-[#60a5fa]",
  };

  const statusLabel = status === "SENT" ? "بانتظار الموافقة" : status === "CHANGE_REQUESTED" ? "تم طلب تعديل" : status;

  return {
    sender,
    title,
    total: formatCurrency(Number(totalAmount), currency),
    currency,
    stagesLabel: `${milestonesCount} مراحل`,
    paymentTiming: "بعد الموافقة مباشرة",
    badges: [
      { label: statusLabel, className: badgeClasses.pending },
      { label: `${milestonesCount} مراحل`, className: badgeClasses.stage },
      { label: "دفعات محمية", className: badgeClasses.escrow },
      { label: "AI Review متاح عند الخلاف", className: badgeClasses.ai },
    ],
  };
}

export function PortalSection({ token }: { token?: string }) {
  const router = useRouter();
  const { portal } = clientPortalContent;
  const resolvedToken = token ?? "";
  const inviteQuery = usePortalInviteQuery(resolvedToken);
  const approveMutation = usePortalApproveMutation(resolvedToken);
  const requestChangesMutation = usePortalRequestChangesMutation(resolvedToken);
  const rejectMutation = usePortalRejectMutation(resolvedToken);
  const [activeForm, setActiveForm] = useState<"changes" | "reject" | null>(null);

  const requestChangesForm = useForm<PortalRequestChangesPayload>({
    resolver: zodResolver(portalRequestChangesSchema),
    defaultValues: { reason: "", requestedChanges: [] },
  });

  const rejectForm = useForm<PortalRejectAgreementPayload>({
    resolver: zodResolver(portalRejectSchema),
    defaultValues: { reason: "" },
  });

  const mutationError =
    approveMutation.error || requestChangesMutation.error || rejectMutation.error;

  const actionError = mutationError instanceof ApiError ? mutationError.message : null;

  const mapped = useMemo(() => {
    const data = inviteQuery.data;
    if (!data) return null;

    const agreement = buildAgreement(
      data.agreement.status,
      data.agreement.title,
      String(data.paymentPlan.reduce((sum, payment) => sum + Number(payment.amount ?? 0), 0) || 0),
      data.paymentPlan[0]?.currency ?? "SAR",
      data.freelancer.name,
      data.milestones.length,
    );

    const parties: PortalParty[] = [
      {
        name: data.freelancer.name,
        role: "Freelancer",
        email: data.freelancer.email || "-",
        responsibility: "تنفيذ العمل وتسليم المراحل",
        initial: data.freelancer.name.slice(0, 1),
        className: "border-[#6d5dfc]/15 bg-[#6d5dfc]/[0.06]",
        avatarClassName: "bg-[#6d5dfc]/20",
        avatarTextClassName: "text-[#a78bfa]",
      },
      {
        name: data.client.name,
        role: "Client",
        email: data.client.email || "-",
        responsibility: "مراجعة التسليمات واعتماد الدفعات",
        initial: data.client.name.slice(0, 1),
        className: "border-[#2f80ed]/15 bg-[#2f80ed]/[0.06]",
        avatarClassName: "bg-[#2f80ed]/20",
        avatarTextClassName: "text-[#60a5fa]",
      },
    ];

    const project: PortalProjectSummary = {
      title: data.agreement.title,
      description: data.agreement.description || portal.project.description,
      details: [
        { label: "نوع الخدمة", value: portal.project.details[0]?.value ?? "-" },
        { label: "المدة المتوقعة", value: portal.project.details[1]?.value ?? "-" },
        { label: "صيغة التسليم", value: portal.project.details[2]?.value ?? "-" },
      ],
      roles: portal.project.roles,
    };

    const payments = data.paymentPlan.map((payment, index) => ({
      label: payment.milestoneName,
      amount: formatCurrency(Number(payment.amount), payment.currency),
      percent: 0,
      description: payment.status || "-",
      colorClassName: portal.payments[index % portal.payments.length]?.colorClassName,
      dotClassName: portal.payments[index % portal.payments.length]?.dotClassName,
    }));

    const milestones = data.milestones.map((milestone) => ({
      id: milestone.id,
      title: milestone.title,
      amount: formatCurrency(Number(milestone.amount ?? 0), milestone.currency ?? "SAR"),
      summary: milestone.description ?? "",
      description: milestone.description ?? "",
      acceptanceCriteria: [],
    }));

    const policies: PortalPolicy[] =
      data.policies?.map((policy, index) => ({
        title: policy.title,
        description: policy.description,
        className: portal.policies[index % portal.policies.length]?.className ?? portal.policies[0].className,
      })) ?? [];

    return { agreement, parties, project, payments, milestones, policies };
  }, [inviteQuery.data, portal]);

  async function handleApprove() {
    await approveMutation.mutateAsync();
    router.push(buildPortalPath(resolvedToken, "paymentSetup"));
  }

  if (!token) {
    return <div className="rounded-3xl border border-white/10 bg-[#13182b] p-6 text-white">رابط البوابة غير مكتمل.</div>;
  }

  if (inviteQuery.isLoading) {
    return <div className="h-64 animate-pulse rounded-3xl border border-white/10 bg-white/5" />;
  }

  if (!mapped) {
    return <div className="rounded-3xl border border-white/10 bg-[#13182b] p-6 text-white">تعذر تحميل الدعوة.</div>;
  }

  return (
    <main dir="rtl" className="min-h-screen bg-[#0d0f1a] text-white" aria-labelledby="portal-title">
      <div className="mx-auto w-full max-w-[900px] px-4 py-8 sm:px-6 lg:px-0">
        <section className="delivery text-center">
          <h1 id="portal-title" className="text-[26px] font-black leading-normal">{portal.title}</h1>
          <p className="mt-1.5 text-[13px] text-[#7f86a8]">{portal.description}</p>
        </section>

        <div className="mt-6 space-y-5">
          <AgreementHero
            agreement={mapped.agreement}
            onApprove={() => void handleApprove()}
            onRequestChanges={() => setActiveForm(activeForm === "changes" ? null : "changes")}
            onReject={() => setActiveForm(activeForm === "reject" ? null : "reject")}
            isApprovePending={approveMutation.isPending}
          />
          <AgreementSummarySection
            agreement={mapped.agreement}
            parties={mapped.parties}
            project={mapped.project}
            payments={mapped.payments}
          />
          <MilestonesSection milestones={mapped.milestones} />
          <PolicySection policies={mapped.policies} />
          <AiDisputeSection steps={portal.aiReviewSteps} />
          <DecisionSection
            agreement={mapped.agreement}
            onApprove={() => void handleApprove()}
            onRequestChanges={() => setActiveForm(activeForm === "changes" ? null : "changes")}
            onReject={() => setActiveForm(activeForm === "reject" ? null : "reject")}
            isApprovePending={approveMutation.isPending}
          />

          {actionError ? (
            <div className="rounded-2xl border border-amber-400/20 bg-amber-400/10 p-4 text-sm text-amber-200">
              {actionError}
            </div>
          ) : null}

          {activeForm === "changes" ? (
            <form onSubmit={requestChangesForm.handleSubmit((values) => requestChangesMutation.mutate(values))} className="space-y-4 rounded-2xl border border-white/[0.07] bg-[#131627] p-5 text-start">
              <h3 className="text-[15px] font-extrabold text-white">طلب تعديل</h3>
              <textarea {...requestChangesForm.register("reason")} className="min-h-32 w-full rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm outline-none" placeholder="اكتب سبب طلب التعديلات" />
              <p className="text-sm text-red-300">{requestChangesForm.formState.errors.reason?.message}</p>
              <Button disabled={requestChangesMutation.isPending} className="rounded-xl bg-[#6f52ff] px-5 text-white hover:bg-[#7b63ff]">إرسال</Button>
            </form>
          ) : null}

          {activeForm === "reject" ? (
            <form onSubmit={rejectForm.handleSubmit((values) => rejectMutation.mutate(values))} className="space-y-4 rounded-2xl border border-white/[0.07] bg-[#131627] p-5 text-start">
              <h3 className="text-[15px] font-extrabold text-white">رفض الاتفاق</h3>
              <textarea {...rejectForm.register("reason")} className="min-h-32 w-full rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm outline-none" placeholder="اكتب سبب الرفض" />
              <p className="text-sm text-red-300">{rejectForm.formState.errors.reason?.message}</p>
              <Button disabled={rejectMutation.isPending} variant="destructive" className="rounded-xl px-5">إرسال</Button>
            </form>
          ) : null}

          <aside className="flex flex-col gap-3 rounded-[14px] border border-emerald-400/15 bg-emerald-400/[0.05] p-5 text-start sm:flex-row sm:items-start sm:justify-start">
            <div>
              <div className="flex gap-1">
                <CheckCircle2 className="size-4 shrink-0 text-[#4ade80]" aria-hidden="true" />
                <h2 className="text-[13px] font-extrabold text-[#4ade80]">{portal.securityNotice.title}</h2>
              </div>
              <p className="mt-1.5 text-xs leading-5 text-[#b8bdd8]">{portal.securityNotice.description}</p>
              <p className="mt-1 text-[11px] leading-5 text-[#7f86a8]">{portal.securityNotice.disclaimer}</p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
