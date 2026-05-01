// AR: هذا القسم يربط قائمة العملاء الحية بالبحث والترقيم وحالات الفراغ والأخطاء.
// EN: This section wires the live clients list to search, pagination, and empty/error states.
"use client";

import { useMemo } from "react";
import { Search, RotateCcw } from "lucide-react";

import { Button, Input } from "@/components/shared";
import { ClientEmptyState, ClientListTable } from "@/components/clients";
import { clientContent } from "@/constants";
import { useClientListState, useClientsQuery } from "@/hooks/clients";
import { getClientErrorMessage, isClientUnauthorizedError } from "@/lib/clients";

export function ClientsSection() {
  const content = clientContent.clients;
  const { search, page, params, setSearch, setPage } = useClientListState();
  const clientsQuery = useClientsQuery(params);

  const clients = useMemo(() => clientsQuery.data?.data ?? [], [clientsQuery.data?.data]);
  const totalPages = clientsQuery.data?.totalPages ?? 1;
  const totalItems = clientsQuery.data?.total ?? 0;

  const hasSearch = search.trim().length > 0;
  const showEmpty = !clientsQuery.isLoading && !clientsQuery.isError && totalItems === 0 && !hasSearch;
  const showNoResults = !clientsQuery.isLoading && !clientsQuery.isError && totalItems === 0 && hasSearch;

  return (
    <section className="space-y-4" dir="rtl">
      <header className="flex flex-col gap-3 rounded-[18px] border border-[#252a42] bg-[#15192b] p-4 shadow-[0_18px_45px_rgba(4,7,20,0.18)] md:flex-row md:items-start md:justify-between">
        <div>
          <h1 className="text-[24px] font-extrabold text-white md:text-[30px]">{content.title}</h1>
          <p className="mt-1 max-w-2xl text-[13px] leading-7 text-[#8b90a8]">{content.subtitle}</p>
        </div>
        <div className="relative w-full md:max-w-md">
          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder={content.searchPlaceholder}
            className="h-11 rounded-[10px] border-[#252a42] bg-[#1d2135] pe-10 text-right text-[13px] text-white placeholder:text-[#58607c]"
          />
          <Search className="pointer-events-none absolute end-3 top-1/2 size-4 -translate-y-1/2 text-[#58607c]" />
        </div>
      </header>

      {clientsQuery.isError ? (
        <ClientEmptyState
          title={isClientUnauthorizedError(clientsQuery.error as never) ? "تحتاج إلى تسجيل الدخول" : "تعذر تحميل العملاء"}
          description={getClientErrorMessage(clientsQuery.error as never)}
          actionLabel={content.retryLabel}
          actionHref="/clients"
        />
      ) : null}

      {showEmpty ? (
        <ClientEmptyState title={content.emptyTitle} description={content.emptyDescription} />
      ) : null}

      {showNoResults ? (
        <ClientEmptyState title={content.noResultsTitle} description={content.noResultsDescription} />
      ) : null}

      {!showEmpty && !showNoResults && !clientsQuery.isError ? (
        <ClientListTable clients={clients} isLoading={clientsQuery.isLoading} />
      ) : null}

      <div className="flex flex-col gap-3 rounded-[18px] border border-[#252a42] bg-[#15192b] p-4 text-[13px] text-[#c7cce0] md:flex-row md:items-center md:justify-between">
        <div>
          {content.pageLabel} {page} {content.ofLabel} {totalPages}
          <span className="ms-2 text-[#8b90a8]">({totalItems})</span>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button type="button" variant="secondary" className="h-9 rounded-[10px] border border-[#252a42] bg-[#1d2135] px-3 text-[12px] font-bold text-[#c7cce0]" disabled={page <= 1} onClick={() => setPage(Math.max(1, page - 1))}>
            السابق
          </Button>
          <Button type="button" variant="secondary" className="h-9 rounded-[10px] border border-[#252a42] bg-[#1d2135] px-3 text-[12px] font-bold text-[#c7cce0]" disabled={page >= totalPages} onClick={() => setPage(Math.min(totalPages, page + 1))}>
            التالي
          </Button>
          <Button type="button" variant="secondary" className="h-9 rounded-[10px] border border-[#252a42] bg-[#1d2135] px-3 text-[12px] font-bold text-[#c7cce0]" onClick={() => clientsQuery.refetch()}>
            <RotateCcw className="size-4" />
            {content.retryLabel}
          </Button>
        </div>
      </div>
    </section>
  );
}
