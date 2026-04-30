import type {
  TimelineQueryParams,
  TimelineFilterValues,
} from "@/types";

// AR: مفاتيح الاستعلام المستقرة للسجل الزمني لتجنب التعارض في التخزين المؤقت.
// EN: Stable query keys for timeline events to avoid cache collisions.
export const timelineQueryKeys = {
  all: ["timeline-events"] as const,

  // AR: مفاتيح السجل الزمني الخاص باتفاقية.
  // EN: Agreement-scoped timeline keys.
  agreementTimelines: () =>
    [...timelineQueryKeys.all, "agreement"] as const,
  agreementTimeline: (
    agreementId: string,
    params?: TimelineQueryParams & TimelineFilterValues
  ) =>
    [...timelineQueryKeys.agreementTimelines(), agreementId, params ?? {}] as const,

  // AR: مفاتيح السجل الزمني الخاص ببوابة العميل.
  // EN: Portal-scoped timeline keys.
  portalTimelines: () =>
    [...timelineQueryKeys.all, "portal"] as const,
  portalTimeline: (
    token: string,
    params?: TimelineQueryParams & TimelineFilterValues
  ) =>
    [...timelineQueryKeys.portalTimelines(), token, params ?? {}] as const,
};
