import { axiosInstance } from "@/lib/axios-instance";
import { API_PATHS } from "@/lib/api-paths";
import type {
  ClientPortalAgreementsParams,
  ClientPortalAgreementsResponse,
  ClientPortalOverview,
} from "@/types";

// AR: تجلب نظرة عامة سريعة لبوابة العميل لاستخدامها في الصفحة الرئيسية والـ widgets.
// EN: Fetches the client portal overview for the main page and related widgets.
export async function getClientPortalOverview() {
  const response = await axiosInstance.get<ClientPortalOverview>(
    API_PATHS.CLIENT_PORTAL.OVERVIEW,
  );

  return response.data;
}

// AR: تجلب اتفاقيات العميل مع دعم params الخاصة بالبحث والصفحات.
// EN: Fetches client agreements with query params for search and pagination.
export async function getClientPortalAgreements(
  params?: ClientPortalAgreementsParams,
) {
  const response = await axiosInstance.get<ClientPortalAgreementsResponse>(
    API_PATHS.CLIENT_PORTAL.AGREEMENTS,
    {
      params,
    },
  );

  return response.data;
}
