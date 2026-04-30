import type { TimelineQueryParams } from "@/types";
import { getAgreementTimeline, getPortalTimeline } from "./timeline-events.api";
import { timelineQueryKeys } from "./timeline-events.keys";

// AR: خيارات استعلام مُعاد استخدامها للسجل الزمني الخاص باتفاقية.
// EN: Reusable query options for agreement-scoped timeline.
export function agreementTimelineQueryOptions(
  agreementId: string,
  params?: TimelineQueryParams
) {
  return {
    queryKey: timelineQueryKeys.agreementTimeline(agreementId, params),
    queryFn: () => getAgreementTimeline(agreementId, params),
    enabled: Boolean(agreementId),
  };
}

// AR: خيارات استعلام مُعاد استخدامها للسجل الزمني الخاص ببوابة العميل.
// EN: Reusable query options for portal-scoped timeline.
export function portalTimelineQueryOptions(
  token: string,
  params?: TimelineQueryParams
) {
  return {
    queryKey: timelineQueryKeys.portalTimeline(token, params),
    queryFn: () => getPortalTimeline(token, params),
    enabled: Boolean(token),
  };
}
