import { axiosInstance } from "@/lib/axios-instance";
import { API_PATHS } from "@/lib/api-paths";
import type { DefaultPolicies, DefaultPoliciesMutationPayload } from "@/types";

// AR: تجلب هذه الدالة السياسات الافتراضية المحفوظة للفريلانسر من إعداداته.
// EN: This function fetches the freelancer default policies from settings.
export async function getDefaultPolicies(): Promise<DefaultPolicies> {
  const response = await axiosInstance.get<DefaultPolicies>(
    API_PATHS.SETTINGS.DEFAULT_POLICIES,
  );

  return response.data;
}

// AR: تحفظ هذه الدالة تحديثات السياسات الافتراضية على مستوى الإعدادات.
// EN: This function persists default policy updates at the settings level.
export async function updateDefaultPolicies(
  payload: DefaultPoliciesMutationPayload,
): Promise<DefaultPolicies> {
  const response = await axiosInstance.patch<DefaultPolicies>(
    API_PATHS.SETTINGS.DEFAULT_POLICIES,
    payload,
  );

  return response.data;
}
