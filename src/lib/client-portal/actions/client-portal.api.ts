import { axiosInstance } from "@/lib/axios-instance";
import { API_PATHS } from "@/lib/api-paths";
import type {
  ClientPortalAgreementsParams,
  ClientPortalAgreementsResponse,
  ClientPortalOverview,
  PortalActionResponse,
  PortalDelivery,
  PortalInviteResponse,
  PortalPayment,
  PortalPaymentHistoryItem,
  PortalRejectAgreementPayload,
  PortalRequestChangesPayload,
  PortalTimelineEvent,
  PortalWorkspaceResponse,
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

// AR: تجلب ملخص دعوة الاتفاق عبر رمز البوابة لإظهار تفاصيل المراجعة قبل أي إجراء.
// EN: Fetches the agreement invite summary via the portal token before any client action.
export async function getPortalInvite(token: string) {
  const response = await axiosInstance.get<PortalInviteResponse>(
    API_PATHS.PORTAL.INVITE(token),
  );

  return response.data;
}

// AR: تعتمد الاتفاق مباشرة من بوابة العميل باستخدام رمز الوصول فقط.
// EN: Approves the agreement directly from the client portal using only the access token.
export async function approveAgreement(token: string) {
  const response = await axiosInstance.post<PortalActionResponse>(
    API_PATHS.PORTAL.APPROVE(token),
  );

  return response.data;
}

// AR: ترسل طلب تعديلات على الاتفاق قبل الموافقة مع سبب واضح للعميل والفريلانسر.
// EN: Sends an agreement change request before approval with a clear client reason.
export async function requestAgreementChanges(
  token: string,
  payload: PortalRequestChangesPayload,
) {
  const response = await axiosInstance.post<PortalActionResponse>(
    API_PATHS.PORTAL.REQUEST_CHANGES(token),
    payload,
  );

  return response.data;
}

// AR: ترفض الدعوة الحالية من البوابة مع سبب مختصر موثق.
// EN: Rejects the current invite from the portal with a documented reason.
export async function rejectAgreement(
  token: string,
  payload: PortalRejectAgreementPayload,
) {
  const response = await axiosInstance.post<PortalActionResponse>(
    API_PATHS.PORTAL.REJECT(token),
    payload,
  );

  return response.data;
}

// AR: تجلب مساحة عمل العميل الكاملة مع المراحل والدفعات والتسليمات ضمن نفس الاتفاق فقط.
// EN: Fetches the full client workspace scoped to the same agreement only.
export async function getPortalWorkspace(token: string) {
  const response = await axiosInstance.get<PortalWorkspaceResponse>(
    API_PATHS.PORTAL.WORKSPACE(token),
  );

  return response.data;
}

// AR: تجلب تفاصيل تسليم واحد داخل نطاق الاتفاق المرتبط برمز البوابة.
// EN: Fetches a single delivery detail scoped to the agreement behind the portal token.
export async function getPortalDelivery(token: string, deliveryId: string) {
  const response = await axiosInstance.get<PortalDelivery>(
    API_PATHS.PORTAL.DELIVERY(token, deliveryId),
  );

  return response.data;
}

// AR: تعتمد التسليم الحالي من البوابة وتعيد الحالة الجديدة للتسليم/الاتفاق.
// EN: Accepts the current delivery from the portal and returns the updated status payload.
export async function acceptDelivery(token: string, deliveryId: string) {
  const response = await axiosInstance.post<PortalActionResponse>(
    API_PATHS.PORTAL.DELIVERY_ACCEPT(token, deliveryId),
  );

  return response.data;
}

// AR: ترسل طلب تعديلات على التسليم الحالي مع ملاحظات العميل المطلوبة.
// EN: Sends a delivery change request with the client's requested revisions.
export async function requestDeliveryChanges(
  token: string,
  deliveryId: string,
  payload: PortalRequestChangesPayload,
) {
  const response = await axiosInstance.post<PortalActionResponse>(
    API_PATHS.PORTAL.DELIVERY_REQUEST_CHANGES(token, deliveryId),
    payload,
  );

  return response.data;
}

// AR: تجلب قائمة دفعات الاتفاق الخاصة بالعميل عبر رابط البوابة.
// EN: Fetches the agreement payment list for the client through the portal link.
export async function getPortalPayments(token: string) {
  const response = await axiosInstance.get<PortalPayment[]>(
    API_PATHS.PORTAL_PAYMENTS.LIST(token),
  );

  return response.data;
}

// AR: تموّل دفعة محددة في وضع البوابة دون الحاجة لأي جسم طلب إضافي في الـ MVP.
// EN: Funds a specific payment from the portal without an additional request body in the MVP.
export async function fundPayment(token: string, paymentId: string) {
  const response = await axiosInstance.post<PortalPayment>(
    API_PATHS.PORTAL_PAYMENTS.FUND(token, paymentId),
  );

  return response.data;
}

// AR: تطلق دفعة جاهزة للإطلاق من بوابة العميل عبر مسار الإصدار النهائي.
// EN: Releases a payment that is ready to release through the final portal release endpoint.
export async function releasePayment(token: string, paymentId: string) {
  const response = await axiosInstance.post<PortalPayment>(
    API_PATHS.PORTAL_PAYMENTS.RELEASE(token, paymentId),
  );

  return response.data;
}

// AR: تجلب سجل دفعات الاتفاق بترتيب زمني آمن للعميل.
// EN: Fetches client-safe agreement payment history in chronological order.
export async function getPortalPaymentHistory(token: string) {
  const response = await axiosInstance.get<PortalPaymentHistoryItem[]>(
    API_PATHS.PORTAL_PAYMENTS.HISTORY(token),
  );

  return response.data;
}

// AR: تجلب الخط الزمني الخاص بالاتفاق كما يظهر للعميل داخل البوابة.
// EN: Fetches the agreement timeline as exposed to the client inside the portal.
export async function getPortalTimeline(token: string) {
  const response = await axiosInstance.get<PortalTimelineEvent[]>(
    API_PATHS.PORTAL.TIMELINE(token),
  );

  return response.data;
}
