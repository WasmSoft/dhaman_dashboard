import { axiosInstance } from "@/lib/axios-instance";
import { API_PATHS } from "@/lib/api-paths";
import type {
  AgreementDetailsResponse,
  AgreementListParams,
  AgreementMutationPayload,
  AgreementsListResponse,
} from "@/types";

// AR: تجلب قائمة الاتفاقيات باستخدام params خام حتى تبقى الفلاتر والـ pagination قابلة لإعادة الاستخدام.
// EN: Fetches the agreements list with raw params so filters and pagination remain reusable.
export async function getAgreements(params?: AgreementListParams) {
  const response = await axiosInstance.get<AgreementsListResponse>(
    API_PATHS.AGREEMENTS.LIST,
    {
      params,
    },
  );

  return response.data;
}

// AR: تجلب تفاصيل اتفاقية واحدة للاستخدام في الصفحات أو server components.
// EN: Fetches a single agreement details payload for pages or server components.
export async function getAgreementById(agreementId: string) {
  const response = await axiosInstance.get<AgreementDetailsResponse>(
    API_PATHS.AGREEMENTS.DETAILS(agreementId),
  );

  return response.data;
}

export async function createAgreement(payload: AgreementMutationPayload) {
  const response = await axiosInstance.post<AgreementDetailsResponse>(
    API_PATHS.AGREEMENTS.CREATE,
    payload,
  );

  return response.data;
}

export async function updateAgreement(
  agreementId: string,
  payload: AgreementMutationPayload,
) {
  const response = await axiosInstance.put<AgreementDetailsResponse>(
    API_PATHS.AGREEMENTS.UPDATE(agreementId),
    payload,
  );

  return response.data;
}

export async function deleteAgreement(agreementId: string) {
  await axiosInstance.delete(API_PATHS.AGREEMENTS.DELETE(agreementId));
}
