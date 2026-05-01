// AR: هذا المكوّن يتيح البحث عن عميل موجود أو إنشاء عميل جديد داخل إعداد الاتفاق.
// EN: This component lets users search for an existing client or create a new one inside agreement setup.
"use client";

import { useMemo, useState } from "react";
import { Search, UserPlus } from "lucide-react";

import { Button, Input } from "@/components/shared";
import { ClientForm } from "@/components/clients/ClientForm";
import { useClientsQuery, useCreateClientMutation, useClientListState } from "@/hooks/clients";
import { formatClientDate, getClientInitials, getOptionalClientValue, isClientConflictError } from "@/lib/clients";
import type { Client, ClientFormValues } from "@/types";

type ClientPickerProps = {
  selectedClient: Client | null;
  onSelectClient: (client: Client | null) => void;
  title?: string;
  description?: string;
  submitLabel?: string;
};

export function ClientPicker({
  selectedClient,
  onSelectClient,
  title = "بيانات العميل",
  description = "ابحث عن عميل موجود أو أنشئ واحدًا جديدًا دون مغادرة الاتفاق.",
  submitLabel = "إنشاء العميل واختياره",
}: ClientPickerProps) {
  const [mode, setMode] = useState<"search" | "create">("search");
  const [conflictMessage, setConflictMessage] = useState<string | null>(null);
  const { search, params, setSearch } = useClientListState();
  const clientsQuery = useClientsQuery(params);
  const createClientMutation = useCreateClientMutation({
    onSuccess: (client) => {
      onSelectClient(client);
      setMode("search");
      setConflictMessage(null);
    },
  });

  const clients = useMemo(() => clientsQuery.data?.data ?? [], [clientsQuery.data?.data]);

  async function handleCreate(values: ClientFormValues) {
    try {
      await createClientMutation.mutateAsync({
        name: values.name.trim(),
        email: values.email.trim(),
        phone: values.phone.trim() || undefined,
        companyName: values.companyName.trim() || undefined,
      });
    } catch (error) {
      if (isClientConflictError(error as never)) {
        setConflictMessage("يوجد عميل بنفس البريد الإلكتروني. اختر العميل الموجود أو عدّل البريد.");
      } else {
        setConflictMessage("تعذر إنشاء العميل الآن. حاول مرة أخرى.");
      }
    }
  }

  return (
    <section className="rounded-[18px] border border-[#252a42] bg-[#15192b] p-4 shadow-[0_18px_45px_rgba(4,7,20,0.18)]" dir="rtl">
      <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
        <div>
          <h2 className="text-[17px] font-extrabold text-white">{title}</h2>
          <p className="mt-1 text-[12px] leading-6 text-[#737b99]">{description}</p>
        </div>
        <div className="flex gap-2">
          <Button type="button" variant={mode === "search" ? "default" : "secondary"} className="h-9 rounded-[10px] px-3 text-[12px] font-bold" onClick={() => setMode("search")}>
            البحث
          </Button>
          <Button type="button" variant={mode === "create" ? "default" : "secondary"} className="h-9 rounded-[10px] px-3 text-[12px] font-bold" onClick={() => { setConflictMessage(null); setMode("create"); }}>
            <UserPlus className="size-4" />
            إنشاء
          </Button>
        </div>
      </div>

      <div className="mt-4 space-y-4">
        {mode === "search" ? (
          <>
            <div className="relative">
              <Input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="ابحث باسم العميل أو البريد الإلكتروني أو الشركة"
                className="h-11 rounded-[10px] border-[#252a42] bg-[#1d2135] pe-10 text-right text-[13px] text-white placeholder:text-[#58607c]"
              />
              <Search className="pointer-events-none absolute end-3 top-1/2 size-4 -translate-y-1/2 text-[#58607c]" />
            </div>
            {clientsQuery.isError ? (
              <div className="rounded-[12px] border border-[#252a42] bg-[#1d2135] px-4 py-5 text-[12px] leading-6 text-[#c7cce0]">
                <p>تعذر تحميل العملاء. تحقق من الاتصال ثم حاول مرة أخرى.</p>
                <Button type="button" variant="secondary" className="mt-3 h-9 rounded-[10px] border border-[#252a42] bg-[#15192b] px-3 text-[12px] font-bold text-[#c7cce0]" onClick={() => clientsQuery.refetch()}>
                  إعادة المحاولة
                </Button>
              </div>
            ) : clientsQuery.isLoading ? (
              <p className="text-[12px] text-[#8b90a8]">جارٍ البحث...</p>
            ) : clients.length > 0 ? (
              <div className="grid gap-2">
                {clients.map((client) => (
                  <button
                    key={client.id}
                    type="button"
                    className="flex items-center justify-between rounded-[12px] border border-[#252a42] bg-[#1d2135] px-3 py-3 text-start transition hover:border-[#6f52ff]/40"
                    onClick={() => {
                      setConflictMessage(null);
                      onSelectClient(client);
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="grid size-10 place-items-center rounded-full bg-violet-500/20 text-[13px] font-bold text-violet-400">
                        {getClientInitials(client)}
                      </div>
                      <div className="min-w-0">
                        <div className="truncate text-[13px] font-semibold text-white">{client.name}</div>
                        <div className="truncate text-[11px] text-[#636b8a]">{client.email}</div>
                      </div>
                    </div>
                    <div className="hidden text-end text-[11px] text-[#8b90a8] md:block">
                      <div>{getOptionalClientValue(client.companyName)}</div>
                      <div>{formatClientDate(client.updatedAt)}</div>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <p className="rounded-[12px] border border-dashed border-[#252a42] px-4 py-5 text-[12px] leading-6 text-[#8b90a8]">
                لا توجد نتائج مطابقة. جرّب البحث باسم آخر أو انتقل إلى وضع الإنشاء.
              </p>
            )}
          </>
        ) : (
          <ClientForm
            submitLabel={submitLabel}
            conflictMessage={conflictMessage}
            isPending={createClientMutation.isPending}
            onSubmit={handleCreate}
            onCancel={() => setMode("search")}
          />
        )}
      </div>

      {selectedClient ? (
        <div className="mt-4 rounded-[12px] border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-[12px] leading-6 text-emerald-100">
          العميل المحدد: {selectedClient.name} - {selectedClient.email}
        </div>
      ) : null}
    </section>
  );
}
