"use client";

import { useQuery } from "@tanstack/react-query";
import { useAgreementTimelineQuery } from "@/hooks/timeline-events";
import {
  buildPaymentHistoryRows,
  buildPaymentHistorySummary,
} from "@/lib/payments/helpers/payment-history.helper";
import { useMemo } from "react";

// AR: هوك جلب سجل الدفعات لاتفاقية عبر السجل الزمني.
// EN: Hook for fetching an agreement's payment history via timeline events.
export function useAgreementPaymentHistoryQuery(
  agreementId: string | undefined,
  locale: "en" | "ar" = "en",
) {
  const timeline = useAgreementTimelineQuery(agreementId);

  const rows = useMemo(() => {
    const events = timeline.data?.items ?? [];
    return buildPaymentHistoryRows(events, locale);
  }, [timeline.data, locale]);

  const summary = useMemo(() => {
    const events = timeline.data?.items ?? [];
    const fundedEvents = events.filter((e) =>
      e.type?.includes("PAYMENT_RESERVED"),
    );
    const releasedEvents = events.filter((e) =>
      e.type?.includes("PAYMENT_RELEASED"),
    );
    return buildPaymentHistorySummary(
      String(fundedEvents.length),
      String(releasedEvents.length),
      "USD",
    );
  }, [timeline.data]);

  return {
    ...timeline,
    rows,
    summary,
  };
}
