import { axiosInstance } from "@/lib/axios-instance";
import { API_PATHS } from "@/lib/api-paths";
import type {
  ChangeRequestDetailsResponse,
  ChangeRequestListParams,
  ChangeRequestsListResponse,
  CreateChangeRequestPayload,
  DeclineChangeRequestPayload,
  FundChangeRequestPayload,
  UpdateChangeRequestPayload,
} from "@/types";

// AR: تجلب قائمة طلبات التغيير لاتفاقية معينة.
// EN: Fetches the list of change requests for a given agreement.
export async function getChangeRequests(
  agreementId: string,
  params?: ChangeRequestListParams,
) {
  const response = await axiosInstance.get<ChangeRequestsListResponse>(
    API_PATHS.CHANGE_REQUESTS.LIST(agreementId),
    { params },
  );
  return response.data;
}

// AR: تنشئ طلب تغيير جديد داخل اتفاقية.
// EN: Creates a new change request inside an agreement.
export async function createChangeRequest(
  agreementId: string,
  payload: CreateChangeRequestPayload,
) {
  const response = await axiosInstance.post<ChangeRequestDetailsResponse>(
    API_PATHS.CHANGE_REQUESTS.CREATE(agreementId),
    payload,
  );
  return response.data;
}

// AR: تجلب تفاصيل طلب تغيير واحد.
// EN: Fetches a single change request detail.
export async function getChangeRequestById(id: string) {
  const response = await axiosInstance.get<ChangeRequestDetailsResponse>(
    API_PATHS.CHANGE_REQUESTS.DETAILS(id),
  );
  return response.data;
}

// AR: تحدث طلب تغيير موجود (مسموح فقط في حالة المسودة).
// EN: Updates an existing change request (only allowed in DRAFT state).
export async function updateChangeRequest(
  id: string,
  payload: UpdateChangeRequestPayload,
) {
  const response = await axiosInstance.patch<ChangeRequestDetailsResponse>(
    API_PATHS.CHANGE_REQUESTS.UPDATE(id),
    payload,
  );
  return response.data;
}

// AR: ترسل طلب التغيير إلى العميل للموافقة.
// EN: Sends the change request to the client for approval.
export async function sendChangeRequest(id: string) {
  const response = await axiosInstance.post<ChangeRequestDetailsResponse>(
    API_PATHS.CHANGE_REQUESTS.SEND(id),
  );
  return response.data;
}

// AR: يوافق العميل على طلب التغيير عبر رابط البوابة.
// EN: Client approves the change request via the portal link.
export async function approveChangeRequestFromPortal(
  token: string,
  id: string,
) {
  const response = await axiosInstance.post<ChangeRequestDetailsResponse>(
    API_PATHS.CHANGE_REQUESTS.PORTAL_APPROVE(token, id),
  );
  return response.data;
}

// AR: يرفض العميل طلب التغيير عبر رابط البوابة.
// EN: Client declines the change request via the portal link.
export async function declineChangeRequestFromPortal(
  token: string,
  id: string,
  payload: DeclineChangeRequestPayload,
) {
  const response = await axiosInstance.post<ChangeRequestDetailsResponse>(
    API_PATHS.CHANGE_REQUESTS.PORTAL_DECLINE(token, id),
    payload,
  );
  return response.data;
}

// AR: يمول العميل طلب التغيير المعتمد عبر رابط البوابة.
// EN: Client funds the approved change request via the portal link.
export async function fundChangeRequestFromPortal(
  token: string,
  id: string,
  payload: FundChangeRequestPayload,
) {
  const response = await axiosInstance.post<ChangeRequestDetailsResponse>(
    API_PATHS.CHANGE_REQUESTS.PORTAL_FUND(token, id),
    payload,
  );
  return response.data;
}
