// AR: يعرض هذا القسم تفاصيل العميل وملخصه وأحدث اتفاقاته مع نموذج تعديل متزامن.
// EN: This section renders client details, summary, recent agreements, and a synced edit form.
"use client";

import { useMemo, useState } from "react";

import { ClientEmptyState } from "@/components/clients/ClientEmptyState";
import { ClientForm } from "@/components/clients/ClientForm";
import { ClientRecentAgreements } from "@/components/clients/ClientRecentAgreements";
import { ClientSummaryCards } from "@/components/clients/ClientSummaryCards";
import { NotFoundState, Skeleton, Button } from "@/components/shared";
import { useClientDetailsQuery, useClientSummaryQuery, useUpdateClientMutation } from "@/hooks/clients";
import { getClientErrorMessage, isClientConflictError, isClientNotFoundError, isClientUnauthorizedError } from "@/lib/clients";
import type { ClientFormValues } from "@/types";

type ClientProfileSectionProps = {
  clientId: string;
};

export function ClientProfileSection({ clientId }: ClientProfileSectionProps) {
  const detailsQuery = useClientDetailsQuery(clientId);
  const summaryQuery = useClientSummaryQuery(clientId);
  const updateMutation = useUpdateClientMutation();
  const [editMode, setEditMode] = useState(true);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const client = detailsQuery.data ?? null;
  const editDefaults = useMemo(
    () => ({
      name: client?.name ?? "",
      email: client?.email ?? "",
      phone: client?.phone ?? "",
      companyName: client?.companyName ?? "",
    }),
    [client],
  );

  if (detailsQuery.isLoading) {
    return (
      <div className="space-y-4" dir="rtl">
        <Skeleton className="h-12 w-72 rounded" />
        <Skeleton className="h-40 w-full rounded-[18px]" />
        <Skeleton className="h-64 w-full rounded-[18px]" />
      </div>
    );
  }

  if (detailsQuery.isError) {
    const error = detailsQuery.error as never;

    if (isClientNotFoundError(error)) {
      return (
        <NotFoundState
          eyebrow="العميل غير موجود"
          code="404"
          title="تعذر العثور على هذا العميل"
          description="قد يكون الرابط غير صحيح أو أن العميل لم يعد متاحًا ضمن حسابك."
          primaryActionLabel="العودة إلى العملاء"
          primaryActionHref="/clients"
          highlights={[]}
        />
      );
    }

    if (isClientUnauthorizedError(error)) {
      return (
        <ClientEmptyState
          title="تحتاج إلى تسجيل الدخول"
          description="انتهت الجلسة أو لم يتم تفويض الوصول. سجّل الدخول ثم حاول مرة أخرى."
          actionLabel="العودة إلى العملاء"
          actionHref="/clients"
        />
      );
    }

    return (
      <ClientEmptyState
        title="تعذر تحميل الملف الشخصي"
        description={getClientErrorMessage(error)}
        actionLabel="إعادة المحاولة"
        actionHref={`/clients/${clientId}`}
      />
    );
  }

  if (!client) {
    return null;
  }

  async function handleSubmit(values: ClientFormValues) {
    setStatusMessage(null);

    try {
      await updateMutation.mutateAsync({
        clientId,
        payload: {
          name: values.name.trim(),
          email: values.email.trim(),
          phone: values.phone.trim() || null,
          companyName: values.companyName.trim() || null,
        },
      });
      setEditMode(false);
      setStatusMessage("تم حفظ التغييرات بنجاح.");
    } catch (error) {
      if (isClientConflictError(error as never)) {
        setStatusMessage("يوجد عميل آخر بنفس البريد الإلكتروني.");
      } else {
        setStatusMessage(getClientErrorMessage(error as never));
      }
    }
  }

  return (
    <section className="space-y-4" dir="rtl">
      <header className="flex flex-col gap-3 rounded-[18px] border border-[#252a42] bg-[#15192b] p-4 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-[12px] text-[#8b90a8]">العميل</p>
          <h1 className="mt-1 text-[22px] font-extrabold text-white">{client.name}</h1>
          <p className="mt-1 text-[12px] text-[#8b90a8]">{client.email}</p>
        </div>
        <Button type="button" variant="secondary" className="h-10 rounded-[10px] border border-[#252a42] bg-[#1d2135] px-4 text-[13px] font-bold text-[#c7cce0]" onClick={() => setEditMode((value) => !value)}>
          {editMode ? "إغلاق التعديل" : "تعديل البيانات"}
        </Button>
      </header>

      {statusMessage ? (
        <div className="rounded-[12px] border border-[#252a42] bg-[#1d2135] px-4 py-3 text-[12px] text-[#c7cce0]">{statusMessage}</div>
      ) : null}

      {summaryQuery.data ? (
        <ClientSummaryCards summary={summaryQuery.data} />
      ) : summaryQuery.isError ? (
        <ClientEmptyState
          title="تعذر تحميل الملخص"
          description="يمكنك متابعة تعديل بيانات العميل، ثم إعادة محاولة تحميل الملخص لاحقًا."
          actionLabel="إعادة المحاولة"
          actionHref={`/clients/${clientId}`}
        />
      ) : null}

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
        <div className="rounded-[18px] border border-[#252a42] bg-[#15192b] p-4">
          <h2 className="text-[16px] font-bold text-white">بيانات العميل</h2>
          <dl className="mt-4 grid gap-3 text-[13px] text-[#c7cce0] md:grid-cols-2">
            <div><dt className="text-[#8b90a8]">البريد الإلكتروني</dt><dd className="mt-1">{client.email}</dd></div>
            <div><dt className="text-[#8b90a8]">الهاتف</dt><dd className="mt-1">{client.phone ?? "-"}</dd></div>
            <div><dt className="text-[#8b90a8]">الشركة</dt><dd className="mt-1">{client.companyName ?? "-"}</dd></div>
            <div><dt className="text-[#8b90a8]">آخر تحديث</dt><dd className="mt-1">{client.updatedAt}</dd></div>
          </dl>
        </div>

        <ClientRecentAgreements agreements={summaryQuery.data?.recentAgreements ?? []} />
      </div>

      {editMode ? (
        <section className="rounded-[18px] border border-[#252a42] bg-[#15192b] p-4">
          <h2 className="text-[16px] font-bold text-white">تعديل العميل</h2>
          <div className="mt-4">
            <ClientForm
              defaultValues={editDefaults}
              submitLabel="حفظ التغييرات"
              isPending={updateMutation.isPending}
              onSubmit={handleSubmit}
            />
          </div>
        </section>
      ) : null}
    </section>
  );
}
