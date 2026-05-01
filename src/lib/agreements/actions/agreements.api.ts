import { axiosInstance } from "@/lib/axios-instance";
import { API_PATHS } from "@/lib/api-paths";
import type {
  Agreement,
  AgreementListParams,
  AgreementsListResponse,
  CreateAgreementPayload,
  UpdateAgreementPayload,
} from "@/types";

type ApiEnvelope<T> = {
  success: boolean;
  data: T;
};

// AR: تجلب قائمة الاتفاقيات باستخدام params خام حتى تبقى الفلاتر والـ pagination قابلة لإعادة الاستخدام.
// EN: Fetches the agreements list with raw params so filters and pagination remain reusable.
export async function getAgreements(params?: AgreementListParams) {
  const response = await axiosInstance.get<ApiEnvelope<AgreementsListResponse>>(
    API_PATHS.AGREEMENTS.LIST,
    {
      params,
    },
  );

  return response.data.data;
}

// AR: تجلب تفاصيل اتفاقية واحدة للاستخدام في الصفحات أو server components.
// EN: Fetches a single agreement details payload for pages or server components.
export async function getAgreementById(agreementId: string) {
  const response = await axiosInstance.get<ApiEnvelope<Agreement>>(
    API_PATHS.AGREEMENTS.DETAILS(agreementId),
  );

  return response.data.data;
}

// AR: تنشئ هذه الدالة اتفاقية جديدة بصيغة DRAFT وتعيد الكائن الكامل القادم من الخادم.
// EN: This function creates a new DRAFT agreement and returns the full agreement object from the backend.
export async function createAgreement(payload: CreateAgreementPayload) {
  const response = await axiosInstance.post<ApiEnvelope<Agreement>>(
    API_PATHS.AGREEMENTS.CREATE,
    payload,
  );

  return response.data.data;
}

// AR: تحدّث هذه الدالة بيانات الاتفاقية عبر PATCH بما يطابق عقد الـ backend الحالي.
// EN: This function updates agreement fields via PATCH to match the current backend contract.
export async function updateAgreement(
  agreementId: string,
  payload: UpdateAgreementPayload,
) {
  const response = await axiosInstance.patch<ApiEnvelope<Agreement>>(
    API_PATHS.AGREEMENTS.UPDATE(agreementId),
    payload,
  );

  return response.data.data;
}

export async function deleteAgreement(agreementId: string) {
  await axiosInstance.delete(API_PATHS.AGREEMENTS.DELETE(agreementId));
}

// AR: ترسل هذه الدالة دعوة الاتفاقية للعميل وتعيد حالة الاتفاقية بعد الانتقال إلى SENT عند النجاح.
// EN: This function sends the agreement invite to the client and returns the updated agreement after the SENT transition.
export async function sendInvite(agreementId: string) {
  const response = await axiosInstance.post<ApiEnvelope<Agreement>>(
    API_PATHS.AGREEMENTS.SEND_INVITE(agreementId),
  );

  return response.data.data;
}

// AR: تفعّل هذه الدالة اتفاقية معتمدة وتعيد النسخة المحدثة بعد الانتقال إلى ACTIVE.
// EN: This function activates an approved agreement and returns the updated object after the ACTIVE transition.
export async function activateAgreement(agreementId: string) {
  const response = await axiosInstance.post<ApiEnvelope<Agreement>>(
    API_PATHS.AGREEMENTS.ACTIVATE(agreementId),
  );

  return response.data.data;
}

// AR: تؤرشف هذه الدالة الاتفاقية وتعيد النسخة المحدثة بعد الانتقال إلى CANCELLED.
// EN: This function archives the agreement and returns the updated object after the CANCELLED transition.
export async function archiveAgreement(agreementId: string) {
  const response = await axiosInstance.post<ApiEnvelope<Agreement>>(
    API_PATHS.AGREEMENTS.ARCHIVE(agreementId),
  );

  return response.data.data;
}
