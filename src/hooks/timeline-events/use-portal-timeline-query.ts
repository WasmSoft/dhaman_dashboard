"use client";

import { useQuery } from "@tanstack/react-query";
import type { TimelineQueryParams } from "@/types";
import {
  getPortalTimeline,
  timelineQueryKeys,
} from "@/lib/timeline-events/actions";

// AR: هوك استعلام السجل الزمني الخاص ببوابة العميل — يجلب الأحداث الآمنة باستخدام رمز الوصول.
// EN: Portal timeline query hook — fetches client-safe events using portal access token.
export function usePortalTimelineQuery(
  token: string | undefined,
  params?: TimelineQueryParams
) {
  return useQuery({
    queryKey: timelineQueryKeys.portalTimeline(token ?? "", params),
    queryFn: () => getPortalTimeline(token!, params),
    enabled: Boolean(token),
    staleTime: 30_000,
    retry: 1,
  });
}
