"use client";

import { useQuery } from "@tanstack/react-query";
import type { TimelineQueryParams } from "@/types";
import {
  getAgreementTimeline,
  timelineQueryKeys,
} from "@/lib/timeline-events/actions";

// AR: هوك استعلام السجل الزمني الخاص باتفاقية — يجلب أحداث الاتفاقية مع دعم الفلاتر.
// EN: Agreement timeline query hook — fetches agreement events with filter support.
export function useAgreementTimelineQuery(
  agreementId: string | undefined,
  params?: TimelineQueryParams
) {
  return useQuery({
    queryKey: timelineQueryKeys.agreementTimeline(
      agreementId ?? "",
      params
    ),
    queryFn: () => getAgreementTimeline(agreementId!, params),
    enabled: Boolean(agreementId),
    staleTime: 30_000,
    retry: 2,
  });
}
