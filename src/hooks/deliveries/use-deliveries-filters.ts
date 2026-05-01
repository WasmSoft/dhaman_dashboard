"use client";

import { useMemo, useState } from "react";

import type { DeliveryListParams, DeliveryRecordStatus } from "@/types";

// AR: هوك محلي لإدارة فلاتر صفحة التسليمات المدعومة من الخادم.
// EN: Local hook to manage server-supported filters for the deliveries page.
export function useDeliveriesFilters(initial?: DeliveryListParams) {
  const [filters, setFilters] = useState<DeliveryListParams>({
    page: 1,
    limit: 20,
    ...initial,
  });

  return useMemo(
    () => ({
      filters,
      setStatus: (status?: DeliveryRecordStatus) =>
        setFilters((current) => ({ ...current, status, page: 1 })),
      setAgreementId: (agreementId?: string) =>
        setFilters((current) => ({ ...current, agreementId, page: 1 })),
      setMilestoneId: (milestoneId?: string) =>
        setFilters((current) => ({ ...current, milestoneId, page: 1 })),
      setPage: (page: number) =>
        setFilters((current) => ({ ...current, page })),
      reset: () =>
        setFilters({
          page: 1,
          limit: currentLimit(initial),
        }),
    }),
    [filters, initial],
  );
}

function currentLimit(initial?: DeliveryListParams) {
  return initial?.limit ?? 20;
}
