"use client";

import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import {
  portalPaymentHistoryQueryOptions,
  paymentsQueryKeys,
  getPortalPaymentHistory,
} from "@/lib/payments/actions";
import {
  buildPaymentHistoryRows,
  buildPaymentHistorySummary,
} from "@/lib/payments/helpers/payment-history.helper";

// AR: هوك جلب سجل دفعات البوابة مع صفوف العرض.
// EN: Hook for fetching portal payment history with display rows.
export function usePortalPaymentHistoryQuery(
  token: string | undefined,
  locale: "en" | "ar" = "en",
) {
  const query = useQuery({
    ...(token
      ? portalPaymentHistoryQueryOptions(token)
      : {
          queryKey: paymentsQueryKeys.portalHistoryList(""),
          queryFn: () => getPortalPaymentHistory(token!),
        }),
    enabled: Boolean(token),
    staleTime: 30_000,
  });

  const rows = useMemo(() => {
    const events = query.data?.data?.events ?? [];
    return buildPaymentHistoryRows(events, locale);
  }, [query.data, locale]);

  const summary = useMemo(() => {
    const s = query.data?.data?.summary;
    return s
      ? buildPaymentHistorySummary(
          s.totalFunded,
          s.totalReleased,
          s.currency,
        )
      : null;
  }, [query.data]);

  return {
    ...query,
    rows,
    summary,
  };
}
