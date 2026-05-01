"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/shared";
import { portalCopy } from "@/constants";
import {
  usePortalAcceptDeliveryMutation,
  usePortalDeliveryQuery,
  usePortalRequestDeliveryChangesMutation,
} from "@/hooks/client-portal";
import { ApiError } from "@/lib/axios-instance";
import { buildPortalPath, portalRequestChangesSchema } from "@/lib/client-portal";
import type { PortalRequestChangesPayload } from "@/types";

function isPortalTokenError(error: unknown) {
  return error instanceof ApiError && error.code?.startsWith("PORTAL_TOKEN");
}

export function PortalDeliverySection({
  token,
  deliveryId,
}: {
  token: string;
  deliveryId: string;
}) {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const { data, isLoading, error } = usePortalDeliveryQuery(token, deliveryId);
  const acceptMutation = usePortalAcceptDeliveryMutation(token, deliveryId);
  const requestChangesMutation = usePortalRequestDeliveryChangesMutation(
    token,
    deliveryId,
  );
  const form = useForm<PortalRequestChangesPayload>({
    resolver: zodResolver(portalRequestChangesSchema),
    defaultValues: { reason: "", requestedChanges: [] },
  });

  if (isPortalTokenError(error)) {
    throw error;
  }

  if (error instanceof ApiError && error.code === "DELIVERY_NOT_FOUND") {
    return <div className="rounded-3xl border border-white/10 bg-[#13182b] p-6 text-white">لم يتم العثور على التسليم المطلوب.</div>;
  }

  if (isLoading) {
    return <div className="h-64 animate-pulse rounded-3xl border border-white/10 bg-white/5" />;
  }

  if (!data) {
    return <div className="rounded-3xl border border-white/10 bg-[#13182b] p-6 text-white">تعذر تحميل بيانات التسليم.</div>;
  }

  const isReviewable = data.status === "PENDING_REVIEW";

  async function handleAccept() {
    await acceptMutation.mutateAsync();
    router.push(buildPortalPath(token, "releasePayment"));
  }

  async function handleRequestChanges(values: PortalRequestChangesPayload) {
    await requestChangesMutation.mutateAsync(values);
    router.push(buildPortalPath(token, "changeRequests"));
  }

  return (
    <section dir="rtl" className="space-y-6 text-start text-white">
      <header className="rounded-3xl border border-white/10 bg-[#13182b] p-6">
        <p className="text-sm text-[#8f97b6]">{portalCopy.titles.delivery.ar}</p>
        <h1 className="mt-2 text-3xl font-black">{data.milestoneName}</h1>
        <p className="mt-3 text-sm text-[#c6cbe0]">{data.content}</p>
        <div className="mt-4 flex flex-wrap gap-3 text-sm text-[#a9b0cd]">
          <span>الحالة: {portalCopy.statuses[data.status as keyof typeof portalCopy.statuses]?.ar ?? data.status}</span>
          <span>تاريخ الإرسال: {new Date(data.submittedAt).toLocaleString("ar-SA")}</span>
        </div>
      </header>

      <section className="rounded-3xl border border-white/10 bg-[#13182b] p-6">
        <h2 className="mb-4 text-xl font-bold">المرفقات</h2>
        {data.attachments.length ? (
          <ul className="space-y-2 text-sm text-[#c6cbe0]">
            {data.attachments.map((attachment) => (
              <li key={attachment} className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">{attachment}</li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-[#a9b0cd]">لا توجد مرفقات.</p>
        )}
      </section>

      {isReviewable ? (
        <div className="flex flex-col gap-3 rounded-3xl border border-white/10 bg-[#13182b] p-6 sm:flex-row">
          <Button
            onClick={() => void handleAccept()}
            disabled={acceptMutation.isPending}
            className="rounded-xl bg-[#6f52ff] px-5 text-white hover:bg-[#7b63ff]"
          >
            {portalCopy.actions.accept.ar}
          </Button>
          <Button
            variant="secondary"
            onClick={() => setShowForm((value) => !value)}
            className="rounded-xl border border-white/10 bg-white/5 px-5 text-white hover:bg-white/10"
          >
            {portalCopy.actions.requestChanges.ar}
          </Button>
        </div>
      ) : (
        <div className="rounded-3xl border border-white/10 bg-[#13182b] p-6 text-sm text-[#a9b0cd]">
          هذا التسليم لم يعد قابلاً للمراجعة المباشرة.
        </div>
      )}

      {showForm ? (
        <form
          onSubmit={form.handleSubmit((values) => void handleRequestChanges(values))}
          className="space-y-4 rounded-3xl border border-white/10 bg-[#13182b] p-6"
        >
          <h3 className="text-lg font-bold">ما التعديلات المطلوبة؟</h3>
          <textarea
            {...form.register("reason")}
            className="min-h-32 w-full rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm outline-none"
          />
          <p className="text-sm text-red-300">{form.formState.errors.reason?.message}</p>
          <Button disabled={requestChangesMutation.isPending} className="rounded-xl bg-[#6f52ff] px-5 text-white hover:bg-[#7b63ff]">
            {portalCopy.actions.submit.ar}
          </Button>
        </form>
      ) : null}
    </section>
  );
}
