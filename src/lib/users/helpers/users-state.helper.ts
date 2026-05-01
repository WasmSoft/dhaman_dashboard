import type {
  UsersAccountResponse,
  UsersAccountUpdatePayload,
  UsersIdentity,
  UsersProfileUpdatePayload,
  UsersSettingsDraft,
  UsersUiErrorState,
} from "@/types";
import { ApiError } from "@/lib/axios-instance";

import { USERS_COPY } from "@/constants";

const PRIVATE_USER_FIELDS = new Set([
  "email",
  "role",
  "password",
  "passwordHash",
  "accessToken",
  "refreshToken",
  "id",
  "userId",
  "createdAt",
  "updatedAt",
  "token",
]);

function compactObject<T extends Record<string, unknown>>(payload: T) {
  return Object.fromEntries(
    Object.entries(payload).filter(([, value]) => value !== undefined && value !== null && value !== ""),
  ) as Partial<T>;
}

// AR: هذه الدالة تبني اسمًا آمنًا للعرض عند غياب الاسم الفعلي.
// EN: This function builds a safe display name when the real name is missing.
export function buildUserDisplayName(user: UsersIdentity | Partial<UsersAccountResponse>) {
  const name = user.name?.trim();

  if (name) {
    return name;
  }

  const email = user.email?.trim();

  if (email) {
    return email;
  }

  return USERS_COPY.fallbackDisplayName;
}

// AR: هذه الدالة تستخرج الحرف الأول لبديل الصورة بطريقة آمنة ومتوافقة مع RTL.
// EN: This function derives a safe avatar fallback initial that works well in RTL layouts.
export function buildUserAvatarFallbackInitial(user: UsersIdentity | Partial<UsersAccountResponse>) {
  const displayName = buildUserDisplayName(user);
  const initial = displayName.trim().charAt(0) || USERS_COPY.fallbackAvatarInitial;

  return initial.toUpperCase();
}

// AR: هذا helper يزيل الحقول الحساسة قبل تحويل الحمولة إلى PATCH request.
// EN: This helper removes sensitive fields before turning the payload into a PATCH request.
export function stripPrivateUserFields<T extends Record<string, unknown>>(payload: T) {
  return Object.fromEntries(
    Object.entries(payload).filter(([key, value]) => !PRIVATE_USER_FIELDS.has(key) && value !== undefined),
  ) as Partial<T>;
}

// AR: هذه الدالة تحوّل draft الحساب إلى payload نظيف لا يحتوي على قيم فارغة أو حقول محظورة.
// EN: This function converts an account draft into a clean payload without empty or forbidden fields.
export function createCurrentUserPayload(
  payload: UsersAccountUpdatePayload | UsersSettingsDraft | Record<string, unknown>,
) {
  return compactObject(stripPrivateUserFields(payload as Record<string, unknown>));
}

// AR: هذه الدالة تحوّل draft الملف المهني إلى payload نظيف مع حذف القيم الفارغة.
// EN: This function converts a profile draft into a clean payload while removing empty values.
export function createCurrentUserProfilePayload(
  payload: UsersProfileUpdatePayload | UsersSettingsDraft | Record<string, unknown>,
) {
  return compactObject(stripPrivateUserFields(payload as Record<string, unknown>));
}

// AR: هذه الدالة تصنف أخطاء API إلى حالات واجهة آمنة يمكن عرضها للمستخدم.
// EN: This function classifies API errors into safe UI states that can be shown to the user.
export function classifyUsersError(error: unknown): UsersUiErrorState {
  if (error instanceof ApiError) {
    if (error.statusCode === 401) {
      return { state: "authenticationRequired", message: USERS_COPY.authenticationRequiredTitle };
    }

    if (error.statusCode === 404) {
      return { state: "notFound", message: USERS_COPY.notFoundTitle };
    }

    if (error.statusCode === 400) {
      return { state: "validationError", message: USERS_COPY.validationErrorTitle };
    }
  }

  return { state: "unexpectedError", message: USERS_COPY.unexpectedErrorTitle };
}
