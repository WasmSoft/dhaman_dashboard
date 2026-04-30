import { axiosInstance } from "@/lib/axios-instance";
import { API_PATHS } from "@/lib/api-paths";
import type {
  TimelineResponse,
  TimelineQueryParams,
} from "@/types";

// AR: تجلب السجل الزمني الخاص باتفاقية معينة مع دعم الفلاتر والصفحات.
// EN: Fetches the timeline events for a specific agreement with filters and pagination support.
export async function getAgreementTimeline(
  agreementId: string,
  params?: TimelineQueryParams
): Promise<TimelineResponse> {
  const response = await axiosInstance.get<TimelineResponse>(
    API_PATHS.TIMELINE.AGREEMENT_TIMELINE(agreementId),
    { params }
  );

  return response.data;
}

// AR: تجلب السجل الزمني الخاص ببوابة العميل باستخدام رمز الوصول الآمن.
// EN: Fetches the portal-scoped timeline using a secure access token.
export async function getPortalTimeline(
  token: string,
  params?: TimelineQueryParams
): Promise<TimelineResponse> {
  const response = await axiosInstance.get<TimelineResponse>(
    API_PATHS.PORTAL.TIMELINE(token),
    { params }
  );

  return response.data;
}
