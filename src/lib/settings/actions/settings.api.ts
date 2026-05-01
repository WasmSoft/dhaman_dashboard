import { axiosInstance } from "@/lib/axios-instance";
import { API_PATHS } from "@/lib/api-paths";
import type {
  DefaultPoliciesResponse,
  SettingsResponse,
  UpdateDefaultPoliciesPayload,
  UpdateSettingsPayload,
} from "@/types";

// AR: تجلب هذه الدالة إعدادات الفريلانسر العامة من الخادم.
// EN: This function fetches the freelancer general settings from the backend.
export async function getSettings(): Promise<SettingsResponse> {
  const response = await axiosInstance.get<SettingsResponse>(
    API_PATHS.SETTINGS.ROOT,
  );

  return response.data;
}

// AR: تحفظ هذه الدالة تحديثات الإعدادات العامة للفريلانسر.
// EN: This function persists general settings updates for the freelancer.
export async function updateSettings(
  payload: UpdateSettingsPayload,
): Promise<SettingsResponse> {
  const response = await axiosInstance.patch<SettingsResponse>(
    API_PATHS.SETTINGS.ROOT,
    payload,
  );

  return response.data;
}

// AR: تجلب هذه الدالة السياسات الافتراضية المحفوظة للفريلانسر من إعداداته.
// EN: This function fetches the freelancer default policies from settings.
export async function getDefaultPolicies(): Promise<DefaultPoliciesResponse> {
  const response = await axiosInstance.get<DefaultPoliciesResponse>(
    API_PATHS.SETTINGS.DEFAULT_POLICIES,
  );

  return response.data;
}

// AR: تحفظ هذه الدالة تحديثات السياسات الافتراضية على مستوى الإعدادات.
// EN: This function persists default policy updates at the settings level.
export async function updateDefaultPolicies(
  payload: UpdateDefaultPoliciesPayload,
): Promise<DefaultPoliciesResponse> {
  const response = await axiosInstance.patch<DefaultPoliciesResponse>(
    API_PATHS.SETTINGS.DEFAULT_POLICIES,
    payload,
  );

  return response.data;
}
