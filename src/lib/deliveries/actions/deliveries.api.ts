import { axiosInstance } from "@/lib/axios-instance";
import { API_PATHS } from "@/lib/api-paths";
import type {
  CreateDeliveryPayload,
  DeliveryPortalActionResponse,
  DeliveryPortalSummaryResponse,
  DeliveryPortalWorkspaceResponse,
  Delivery,
  DeliveryFilters,
  DeliveryListResponse,
  PortalRequestDeliveryChangesInput,
  SubmitDeliveryPayload,
  UpdateDeliveryPayload,
} from "@/types";

// AR: تجلب قائمة التسليمات من الـ API حسب الفلاتر الحالية.
// EN: Fetches the deliveries list from the API using the current filters.
export async function getDeliveries(filters?: DeliveryFilters) {
  const response = await axiosInstance.get<DeliveryListResponse>(
    API_PATHS.DELIVERIES.LIST,
    { params: filters },
  );

  return response.data;
}

// AR: تجلب تفاصيل تسليم واحد من الـ API لاستخدامه في صفحة التفاصيل.
// EN: Fetches a single delivery detail from the API for the detail page.
export async function getDeliveryById(deliveryId: string) {
  const response = await axiosInstance.get<Delivery>(
    API_PATHS.DELIVERIES.DETAILS(deliveryId),
  );

  return response.data;
}

// AR: تنشئ تسليم مسودة جديد لمرحلة معينة وتعيد الكائن الكامل.
// EN: Creates a new draft delivery for a milestone and returns the full object.
export async function createDelivery(
  milestoneId: string,
  payload: CreateDeliveryPayload,
) {
  const response = await axiosInstance.post<Delivery>(
    API_PATHS.DELIVERIES.CREATE_FOR_MILESTONE(milestoneId),
    payload,
  );

  return response.data;
}

// AR: تحدّث بيانات تسليم موجود عبر PATCH وتعيد النسخة المحدثة.
// EN: Updates an existing delivery via PATCH and returns the updated version.
export async function updateDelivery(
  deliveryId: string,
  payload: UpdateDeliveryPayload,
) {
  const response = await axiosInstance.patch<Delivery>(
    API_PATHS.DELIVERIES.UPDATE(deliveryId),
    payload,
  );

  return response.data;
}

// AR: ترسل التسليم لمراجعة العميل وتعيد الحالة المحدثة.
// EN: Submits the delivery for client review and returns the updated state.
export async function submitDelivery(
  deliveryId: string,
  payload?: SubmitDeliveryPayload,
) {
  const response = await axiosInstance.post<Delivery>(
    API_PATHS.DELIVERIES.SUBMIT(deliveryId),
    payload ?? {},
  );

  return response.data;
}

// AR: تجلب مساحة عمل البوابة المرتبطة بالرمز لاستخدامها في مراجعة التسليم.
// EN: Fetches the token-scoped portal workspace for delivery review context.
export async function getPortalWorkspace(token: string) {
  const response = await axiosInstance.get<DeliveryPortalWorkspaceResponse>(
    API_PATHS.PORTAL.WORKSPACE(token),
  );

  return response.data;
}

// AR: تجلب ملخص تسليم واحد ضمن نطاق رمز بوابة العميل.
// EN: Fetches one delivery summary scoped to the client portal token.
export async function getPortalDeliveryById(token: string, deliveryId: string) {
  const response = await axiosInstance.get<DeliveryPortalSummaryResponse>(
    API_PATHS.PORTAL_DELIVERIES.DETAILS(token, deliveryId),
  );

  return response.data;
}

// AR: يقبل العميل التسليم من البوابة.
// EN: Client accepts the delivery from the portal.
export async function acceptDeliveryFromPortal(
  token: string,
  deliveryId: string,
) {
  const response = await axiosInstance.post<DeliveryPortalActionResponse>(
    API_PATHS.PORTAL_DELIVERIES.ACCEPT(token, deliveryId),
    {},
  );

  return response.data;
}

// AR: يطلب العميل تعديلات على التسليم من البوابة.
// EN: Client requests changes on the delivery from the portal.
export async function requestDeliveryChangesFromPortal(
  token: string,
  deliveryId: string,
  payload: PortalRequestDeliveryChangesInput,
) {
  const response = await axiosInstance.post<DeliveryPortalActionResponse>(
    API_PATHS.PORTAL_DELIVERIES.REQUEST_CHANGES(token, deliveryId),
    payload,
  );

  return response.data;
}
