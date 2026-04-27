import { axiosInstance } from "@/lib/axios-instance";
import { API_PATHS } from "@/lib/api-paths";
import type {
  ClientDetailsResponse,
  ClientListParams,
  ClientMutationPayload,
  ClientsListResponse,
} from "@/types";

// AR: تجلب قائمة العملاء من الخادم مع params خام حتى تبقى طبقة البيانات مستقلة عن الـ UI.
// EN: Fetches the clients list with raw params so the data layer stays independent from the UI.
export async function getClients(params?: ClientListParams) {
  const response = await axiosInstance.get<ClientsListResponse>(
    API_PATHS.CLIENTS.LIST,
    {
      params,
    },
  );

  return response.data;
}

export async function getClientById(clientId: string) {
  const response = await axiosInstance.get<ClientDetailsResponse>(
    API_PATHS.CLIENTS.DETAILS(clientId),
  );

  return response.data;
}

export async function createClient(payload: ClientMutationPayload) {
  const response = await axiosInstance.post<ClientDetailsResponse>(
    API_PATHS.CLIENTS.CREATE,
    payload,
  );

  return response.data;
}

export async function updateClient(
  clientId: string,
  payload: ClientMutationPayload,
) {
  const response = await axiosInstance.put<ClientDetailsResponse>(
    API_PATHS.CLIENTS.UPDATE(clientId),
    payload,
  );

  return response.data;
}

export async function deleteClient(clientId: string) {
  await axiosInstance.delete(API_PATHS.CLIENTS.DELETE(clientId));
}
