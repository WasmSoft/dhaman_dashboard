import { axiosInstance } from "@/lib/axios-instance";
import { API_PATHS } from "@/lib/api-paths";
import type {
  UsersAccountResponse,
  UsersAccountUpdatePayload,
  UsersProfileResponse,
  UsersProfileUpdatePayload,
  UsersSettingsDraft,
} from "@/types";

import { createCurrentUserPayload, createCurrentUserProfilePayload } from "../helpers";

// AR: تجلب هذه الدالة بيانات الحساب الحالية لواجهات الحساب والهيدر.
// EN: This function fetches the current account data for the account section and header.
export async function getCurrentUser() {
  const response = await axiosInstance.get<UsersAccountResponse>(API_PATHS.USERS.CURRENT_USER);

  return response.data;
}

// AR: ترسل هذه الدالة تحديثات الحساب فقط إلى PATCH endpoint المخصص للحساب.
// EN: This function sends account-only updates to the dedicated account PATCH endpoint.
export async function updateCurrentUser(
  payload: UsersAccountUpdatePayload | UsersSettingsDraft | Record<string, unknown>,
) {
  const response = await axiosInstance.patch<UsersAccountResponse>(
    API_PATHS.USERS.CURRENT_USER,
    createCurrentUserPayload(payload),
  );

  return response.data;
}

// AR: تجلب هذه الدالة الملف المهني الحالي لاستخدامه في نموذج الإعدادات.
// EN: This function fetches the current professional profile for the settings form.
export async function getCurrentUserProfile() {
  const response = await axiosInstance.get<UsersProfileResponse>(
    API_PATHS.USERS.CURRENT_USER_PROFILE,
  );

  return response.data;
}

// AR: ترسل هذه الدالة تحديثات الملف المهني فقط وتحذف أي حقول محظورة قبل الإرسال.
// EN: This function sends profile-only updates and removes any forbidden fields before sending.
export async function updateCurrentUserProfile(
  payload: UsersProfileUpdatePayload | UsersSettingsDraft | Record<string, unknown>,
) {
  const response = await axiosInstance.patch<UsersProfileResponse>(
    API_PATHS.USERS.CURRENT_USER_PROFILE,
    createCurrentUserProfilePayload(payload),
  );

  return response.data;
}
