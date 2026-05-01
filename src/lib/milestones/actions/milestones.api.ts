import { axiosInstance } from "@/lib/axios-instance";
import { API_PATHS } from "@/lib/api-paths";
import type {
  AgreementMilestonesResponse,
  CreateMilestonePayload,
  DeleteMilestoneResponse,
  MilestoneDetailsResponse,
  MilestoneMutationResponse,
  ReorderMilestonesPayload,
  ReorderMilestonesResponse,
  UpdateMilestonePayload,
} from "@/types";

// AR: تجلب هذه الدالة كل مراحل اتفاقية محددة مع ملخص المبالغ.
// EN: This function fetches all milestones for a specific agreement with amount totals.
export async function getAgreementMilestones(agreementId: string) {
  const response = await axiosInstance.get<AgreementMilestonesResponse>(
    API_PATHS.MILESTONES.LIST(agreementId),
  );

  return response.data;
}

// AR: تجلب هذه الدالة تفاصيل مرحلة واحدة لاستخدامها في صفحة التفاصيل أو النوافذ.
// EN: This function fetches one milestone detail for detail pages or dialogs.
export async function getMilestoneById(milestoneId: string) {
  const response = await axiosInstance.get<MilestoneDetailsResponse>(
    API_PATHS.MILESTONES.DETAILS(milestoneId),
  );

  return response.data;
}

// AR: تنشئ هذه الدالة مرحلة جديدة داخل اتفاقية موجودة.
// EN: This function creates a new milestone inside an existing agreement.
export async function createMilestone(
  agreementId: string,
  payload: CreateMilestonePayload,
) {
  const response = await axiosInstance.post<MilestoneMutationResponse>(
    API_PATHS.MILESTONES.CREATE(agreementId),
    payload,
  );

  return response.data;
}

// AR: تحدّث هذه الدالة حقول المرحلة القابلة للتعديل.
// EN: This function updates the editable fields of a milestone.
export async function updateMilestone(
  milestoneId: string,
  payload: UpdateMilestonePayload,
) {
  const response = await axiosInstance.patch<MilestoneMutationResponse>(
    API_PATHS.MILESTONES.UPDATE(milestoneId),
    payload,
  );

  return response.data;
}

// AR: تحذف هذه الدالة مرحلة واحدة عندما يسمح الخادم بذلك.
// EN: This function deletes one milestone when the backend allows it.
export async function deleteMilestone(milestoneId: string) {
  const response = await axiosInstance.delete<DeleteMilestoneResponse>(
    API_PATHS.MILESTONES.DELETE(milestoneId),
  );

  return response.data;
}

// AR: ترسل هذه الدالة قائمة إعادة ترتيب كاملة للمراحل داخل نفس الاتفاقية.
// EN: This function submits the full milestone reorder payload for the same agreement.
export async function reorderMilestones(
  milestoneId: string,
  payload: ReorderMilestonesPayload,
) {
  const response = await axiosInstance.patch<ReorderMilestonesResponse>(
    API_PATHS.MILESTONES.REORDER(milestoneId),
    payload,
  );

  return response.data;
}
