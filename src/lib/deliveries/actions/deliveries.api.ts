import { axiosInstance } from "@/lib/axios-instance";
import { API_PATHS } from "@/lib/api-paths";
import type {
  CreateDeliveryInput,
  DeliveriesListResponse,
  DeliveryDetailsResponse,
  DeliveryListParams,
  PortalDeliveryActionResponse,
  PortalDeliverySummaryResponse,
  PortalRequestDeliveryChangesInput,
  PortalWorkspaceResponse,
  SubmitDeliveryInput,
  UpdateDeliveryInput,
} from "@/types";

// AR: تجلب هذه الدالة قائمة التسليمات الخاصة بالمستقل الحالي مع الفلاتر المدعومة من الخادم.
// EN: This function fetches the current freelancer delivery list with backend-supported filters.
export async function getDeliveries(params?: DeliveryListParams) {
  const response = await axiosInstance.get<DeliveriesListResponse>(
    API_PATHS.DELIVERIES.LIST,
    {
      params,
    },
  );

  return response.data;
}

// AR: تجلب هذه الدالة تفاصيل تسليم واحد ضمن نطاق المستخدم الحالي.
// EN: This function fetches one delivery detail within the current user scope.
export async function getDeliveryById(deliveryId: string) {
  const response = await axiosInstance.get<DeliveryDetailsResponse>(
    API_PATHS.DELIVERIES.DETAILS(deliveryId),
  );

  return response.data;
}

// AR: تنشئ هذه الدالة مسودة تسليم لمرحلة محددة.
// EN: This function creates a delivery draft for a specific milestone.
export async function createDelivery(
  milestoneId: string,
  payload: CreateDeliveryInput,
) {
  const response = await axiosInstance.post<DeliveryDetailsResponse>(
    API_PATHS.DELIVERIES.CREATE(milestoneId),
    payload,
  );

  return response.data;
}

// AR: تحدّث هذه الدالة مسودة تسليم قابلة للتعديل.
// EN: This function updates an editable delivery draft.
export async function updateDelivery(
  deliveryId: string,
  payload: UpdateDeliveryInput,
) {
  const response = await axiosInstance.patch<DeliveryDetailsResponse>(
    API_PATHS.DELIVERIES.UPDATE(deliveryId),
    payload,
  );

  return response.data;
}

// AR: ترسل هذه الدالة التسليم إلى العميل للمراجعة.
// EN: This function submits the delivery to the client for review.
export async function submitDelivery(
  deliveryId: string,
  payload: SubmitDeliveryInput,
) {
  const response = await axiosInstance.post<DeliveryDetailsResponse>(
    API_PATHS.DELIVERIES.SUBMIT(deliveryId),
    payload,
  );

  return response.data;
}

// AR: تجلب هذه الدالة مساحة عمل البوابة المرتبطة بالرمز لاستخدامها في سياق مراجعة التسليم.
// EN: This function fetches the token-scoped portal workspace for delivery review context.
export async function getPortalWorkspace(token: string) {
  const response = await axiosInstance.get<PortalWorkspaceResponse>(
    API_PATHS.PORTAL.WORKSPACE(token),
  );

  return response.data;
}

// AR: تجلب هذه الدالة ملخص تسليم واحد ضمن نطاق رمز بوابة العميل.
// EN: This function fetches one delivery summary scoped to the client portal token.
export async function getPortalDeliveryById(token: string, deliveryId: string) {
  const response = await axiosInstance.get<PortalDeliverySummaryResponse>(
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
  const response = await axiosInstance.post<PortalDeliveryActionResponse>(
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
  const response = await axiosInstance.post<PortalDeliveryActionResponse>(
    API_PATHS.PORTAL_DELIVERIES.REQUEST_CHANGES(token, deliveryId),
    payload,
  );

  return response.data;
}
