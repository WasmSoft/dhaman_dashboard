"use client";

import { useState, useCallback, useMemo } from "react";

import type { DeliveryStatus } from "@/types";

// AR: حالة الفلاتر الافتراضية لقائمة التسليمات — صفحة أولى وحد الصفحة.
// EN: Default filter state for the deliveries list — first page and page size.
const DEFAULT_LIMIT = 10;
const DEFAULT_PAGE = 1;

interface UseDeliveryFiltersOptions {
  defaultAgreementId?: string;
  defaultMilestoneId?: string;
  defaultStatus?: DeliveryStatus;
}

// AR: hook يدير فلاتر التسليمات — اتفاقية، مرحلة، حالة، صفحة، مع إعادة التعيين.
// EN: Hook managing delivery filters — agreement, milestone, status, page — with reset.
export function useDeliveryFilters(options?: UseDeliveryFiltersOptions) {
  const [agreementId, setAgreementId] = useState(
    options?.defaultAgreementId ?? "",
  );
  const [milestoneId, setMilestoneId] = useState(
    options?.defaultMilestoneId ?? "",
  );
  const [status, setStatus] = useState<DeliveryStatus | "">(
    options?.defaultStatus ?? "",
  );
  const [page, setPage] = useState(DEFAULT_PAGE);
  const [limit] = useState(DEFAULT_LIMIT);

  const resetFilters = useCallback(() => {
    setAgreementId("");
    setMilestoneId("");
    setStatus("");
    setPage(DEFAULT_PAGE);
  }, []);

  const filters = useMemo(
    () => ({
      agreementId: agreementId || undefined,
      milestoneId: milestoneId || undefined,
      status: (status || undefined) as DeliveryStatus | undefined,
      page,
      limit,
    }),
    [agreementId, milestoneId, status, page, limit],
  );

  return {
    agreementId,
    setAgreementId,
    milestoneId,
    setMilestoneId,
    status,
    setStatus,
    page,
    setPage,
    limit,
    filters,
    resetFilters,
  };
}