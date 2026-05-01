import { axiosInstance } from "@/lib/axios-instance";
import { API_PATHS } from "@/lib/api-paths";
import type { AgreementPolicy, PolicyMutationPayload } from "@/types";

// AR: تجلب هذه الدالة سياسة اتفاق محدد لاستخدامها داخل مساحة العمل والنماذج.
// EN: This function fetches one agreement policy for workspace and form usage.
export async function getAgreementPolicy(
  agreementId: string,
): Promise<AgreementPolicy> {
  const response = await axiosInstance.get<AgreementPolicy>(
    API_PATHS.AGREEMENT_POLICIES.BY_AGREEMENT(agreementId),
  );

  return response.data;
}

// AR: ترسل هذه الدالة تحديثات سياسة الاتفاق بنمط upsert على نفس المسار.
// EN: This function submits agreement policy updates using the shared upsert endpoint.
export async function upsertAgreementPolicy(
  agreementId: string,
  payload: PolicyMutationPayload,
): Promise<AgreementPolicy> {
  const response = await axiosInstance.patch<AgreementPolicy>(
    API_PATHS.AGREEMENT_POLICIES.BY_AGREEMENT(agreementId),
    payload,
  );

  return response.data;
}
