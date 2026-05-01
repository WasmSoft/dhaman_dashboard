"use client";

import { useMemo, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/shared";
import { portalCopy } from "@/constants";
import {
  usePortalApproveMutation,
  usePortalInviteQuery,
  usePortalRejectMutation,
  usePortalRequestChangesMutation,
} from "@/hooks/client-portal";
import { ApiError } from "@/lib/axios-instance";
import { portalRejectSchema, portalRequestChangesSchema } from "@/lib/client-portal";
import type {
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

function isPortalTokenError(error: unknown) {
  return error instanceof ApiError && error.code?.startsWith("PORTAL_TOKEN");
}

export function PortalInviteSection({ token }: { token: string }) {
  const [activeForm, setActiveForm] = useState<"changes" | "reject" | null>(null);
  const { data, isLoading, error } = usePortalInviteQuery(token);
  const approveMutation = usePortalApproveMutation(token);
  const requestChangesMutation = usePortalRequestChangesMutation(token);
  const rejectMutation = usePortalRejectMutation(token);

  const requestChangesForm = useForm<PortalRequestChangesPayload>({
    resolver: zodResolver(portalRequestChangesSchema),
    defaultValues: { reason: "", requestedChanges: [] },
  });

  const rejectForm = useForm<PortalRejectAgreementPayload>({
    resolver: zodResolver(portalRejectSchema),
    defaultValues: { reason: "" },
  });

  const actionError = useMemo(() => {
    const mutationError =
      approveMutation.error || requestChangesMutation.error || rejectMutation.error;

    if (!(mutationError instanceof ApiError)) {
      return null;
    }

    if (
      mutationError.code === "AGREEMENT_NOT_APPROVABLE" ||
      mutationError.code === "AGREEMENT_NOT_CHANGEABLE" ||
      mutationError.code === "AGREEMENT_NOT_REJECTABLE"
    ) {
      return mutationError.message;
    }

    return null;
  }, [approveMutation.error, rejectMutation.error, requestChangesMutation.error]);

  if (isPortalTokenError(error)) {
    throw error;
  }

  if (isLoading) {
    return <div className="h-64 animate-pulse rounded-3xl border border-white/10 bg-white/5" />;
  }

  if (!data) {
    return <div className="rounded-3xl border border-white/10 bg-[#13182b] p-6 text-white">تعذر تحميل الدعوة.</div>;
  }

  return (
    <section dir="rtl" className="space-y-6 text-start text-white">
      <header className="space-y-3 rounded-3xl border border-white/10 bg-[#13182b] p-6">
        <p className="text-sm text-[#8f97b6]">{portalCopy.titles.invite.ar}</p>
        <h1 className="text-3xl font-black">{data.agreement.title}</h1>
        <p className="text-sm leading-7 text-[#c6cbe0]">{data.agreement.description}</p>
        <div className="flex flex-wrap gap-3 text-sm text-[#a9b0cd]">
          <span>الحالة: {portalCopy.statuses[data.agreement.status as keyof typeof portalCopy.statuses]?.ar ?? data.agreement.status}</span>
          <span>الفريلانسر: {data.freelancer.name}</span>
          <span>العميل: {data.client.name}</span>
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-[#13182b] p-6">
          <h2 className="mb-4 text-xl font-bold">المراحل</h2>
          <div className="space-y-4">
            {data.milestones.map((milestone) => (
              <article key={milestone.id} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-bold">{milestone.title}</h3>
                    <p className="mt-1 text-sm text-[#a9b0cd]">{milestone.description}</p>
                  </div>
                  {milestone.amount && milestone.currency ? (
                    <span className="text-sm font-semibold text-[#7fd7a2]">
                      {formatCurrency(milestone.amount, milestone.currency)}
                    </span>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-3xl border border-white/10 bg-[#13182b] p-6">
            <h2 className="mb-4 text-xl font-bold">خطة الدفع</h2>
            <div className="space-y-3">
              {data.paymentPlan.map((payment) => (
                <div key={payment.id} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <div>
                    <p className="font-semibold">{payment.milestoneName}</p>
                    <p className="text-sm text-[#a9b0cd]">{portalCopy.statuses[payment.status as keyof typeof portalCopy.statuses]?.ar ?? payment.status ?? "-"}</p>
                  </div>
                  <span className="font-bold text-[#7fd7a2]">{formatCurrency(payment.amount, payment.currency)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-[#13182b] p-6">
            <h2 className="mb-4 text-xl font-bold">السياسات</h2>
            <div className="space-y-3 text-sm leading-7 text-[#c6cbe0]">
              {data.policies?.map((policy, index) => (
                <div key={`${policy.title}-${index}`} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <p className="font-semibold text-white">{policy.title}</p>
                  <p>{policy.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {actionError ? (
        <div className="rounded-2xl border border-amber-400/20 bg-amber-400/10 p-4 text-sm text-amber-200">
          {actionError}
        </div>
      ) : null}

      <div className="flex flex-col gap-3 rounded-3xl border border-white/10 bg-[#13182b] p-6 sm:flex-row">
        <Button
          onClick={() => approveMutation.mutate()}
          disabled={approveMutation.isPending}
          className="rounded-xl bg-[#6f52ff] px-5 text-white hover:bg-[#7b63ff]"
        >
          {approveMutation.isPending ? "جارٍ التنفيذ..." : portalCopy.actions.approve.ar}
        </Button>
        <Button
          variant="secondary"
          onClick={() => setActiveForm(activeForm === "changes" ? null : "changes")}
          className="rounded-xl border border-white/10 bg-white/5 px-5 text-white hover:bg-white/10"
        >
          {portalCopy.actions.requestChanges.ar}
        </Button>
        <Button
          variant="destructive"
          onClick={() => setActiveForm(activeForm === "reject" ? null : "reject")}
          className="rounded-xl px-5"
        >
          {portalCopy.actions.reject.ar}
        </Button>
      </div>

      {activeForm === "changes" ? (
        <form
          onSubmit={requestChangesForm.handleSubmit((values) =>
            requestChangesMutation.mutate(values),
          )}
          className="space-y-4 rounded-3xl border border-white/10 bg-[#13182b] p-6"
        >
          <h3 className="text-lg font-bold">طلب تعديلات</h3>
          <textarea
            {...requestChangesForm.register("reason")}
            className="min-h-32 w-full rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm outline-none"
            placeholder="اكتب سبب طلب التعديلات"
          />
          <p className="text-sm text-red-300">{requestChangesForm.formState.errors.reason?.message}</p>
          <Button disabled={requestChangesMutation.isPending} className="rounded-xl bg-[#6f52ff] px-5 text-white hover:bg-[#7b63ff]">
            {portalCopy.actions.submit.ar}
          </Button>
        </form>
      ) : null}

      {activeForm === "reject" ? (
        <form
          onSubmit={rejectForm.handleSubmit((values) => rejectMutation.mutate(values))}
          className="space-y-4 rounded-3xl border border-white/10 bg-[#13182b] p-6"
        >
          <h3 className="text-lg font-bold">رفض الاتفاق</h3>
          <textarea
            {...rejectForm.register("reason")}
            className="min-h-32 w-full rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm outline-none"
            placeholder="اكتب سبب الرفض"
          />
          <p className="text-sm text-red-300">{rejectForm.formState.errors.reason?.message}</p>
          <Button disabled={rejectMutation.isPending} variant="destructive" className="rounded-xl px-5">
            {portalCopy.actions.submit.ar}
          </Button>
        </form>
      ) : null}
    </section>
  );
}
