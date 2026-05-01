import { axiosInstance } from "@/lib/axios-instance";
import { API_PATHS } from "@/lib/api-paths";
import type {
<<<<<<< HEAD
  CreateDeliveryPayload,
  Delivery,
  DeliveryFilters,
  DeliveryListResponse,
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
// EN: Creates a new DRAFT delivery for a milestone and returns the full object.
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
=======
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
>>>>>>> 376aec6939d214e5014cc9fa065f5e9a54ce38a7
