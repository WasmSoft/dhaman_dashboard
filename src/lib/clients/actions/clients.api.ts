import { axiosInstance } from "@/lib/axios-instance";
import { API_PATHS } from "@/lib/api-paths";
import type {
  ClientListParams,
  ClientListResponse,
  ClientProfileSummary,
  CreateClientPayload,
  UpdateClientPayload,
  Client,
} from "@/types";

// AR: تجلب هذه الدالة قائمة العملاء من الخادم مع معاملات page/limit/search فقط.
// EN: This function fetches the clients list from the backend using page/limit/search only.
export async function getClients(params?: ClientListParams) {
  const response = await axiosInstance.get<ClientListResponse>(
    API_PATHS.CLIENTS.LIST,
    {
      params,
    },
  );

  return response.data;
}

// AR: تجلب هذه الدالة تفاصيل عميل واحد لصفحة الملف الشخصي ونموذج التعديل.
// EN: This function fetches one client for the profile page and edit form.
export async function getClientById(clientId: string) {
  const response = await axiosInstance.get<Client>(
    API_PATHS.CLIENTS.DETAILS(clientId),
  );

  return response.data;
}

// AR: تنشئ هذه الدالة عميلًا جديدًا للاستخدام داخل صفحة العملاء أو إعداد الاتفاق.
// EN: This function creates a new client for the clients page or agreement setup.
export async function createClient(payload: CreateClientPayload) {
  const response = await axiosInstance.post<Client>(
    API_PATHS.CLIENTS.CREATE,
    payload,
  );

  return response.data;
}

// AR: تحدّث هذه الدالة حقول العميل القابلة للتعديل باستخدام PATCH.
// EN: This function updates editable client fields using PATCH.
export async function updateClient(
  clientId: string,
  payload: UpdateClientPayload,
) {
  const response = await axiosInstance.patch<Client>(
    API_PATHS.CLIENTS.UPDATE(clientId),
    payload,
  );

  return response.data;
}

// AR: تجلب هذه الدالة ملخص الملف الشخصي للعميل بما فيه الاتفاقات والمدفوعات الأخيرة.
// EN: This function fetches the client profile summary including agreements and payment context.
export async function getClientSummary(clientId: string) {
  const response = await axiosInstance.get<ClientProfileSummary>(
    API_PATHS.CLIENTS.SUMMARY(clientId),
  );

  return response.data;
}
