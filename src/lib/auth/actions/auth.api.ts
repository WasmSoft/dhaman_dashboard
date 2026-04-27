import { axiosInstance } from "@/lib/axios-instance";
import { API_PATHS } from "@/lib/api-paths";
import type {
  AuthSessionResponse,
  AuthUser,
  LoginPayload,
  SignUpPayload,
} from "@/types";

// AR: ترسل بيانات تسجيل الدخول إلى الـ API وتعيد بيانات الجلسة كما هي من الخادم.
// EN: Sends the login payload to the API and returns the session payload as provided by the backend.
export async function login(payload: LoginPayload) {
  const response = await axiosInstance.post<AuthSessionResponse>(
    API_PATHS.AUTH.LOGIN,
    payload,
  );

  return response.data;
}

// AR: تنشئ حسابًا جديدًا عبر endpoint التسجيل ثم تعيد الجلسة الناتجة من الخادم.
// EN: Creates a new account through the sign-up endpoint and returns the resulting backend session.
export async function signUp(payload: SignUpPayload) {
  const response = await axiosInstance.post<AuthSessionResponse>(
    API_PATHS.AUTH.SIGN_UP,
    payload,
  );

  return response.data;
}

// AR: تجلب بيانات المستخدم الحالي لاستخدامها في الحراسة والـ layouts والـ hydration.
// EN: Fetches the current user for guards, layouts, and hydration flows.
export async function getCurrentUser() {
  const response = await axiosInstance.get<AuthUser>(API_PATHS.AUTH.CURRENT_USER);

  return response.data;
}

// AR: تستدعي logout endpoint فقط، بينما إدارة الكاش والتوكن تتم في mutation layer.
// EN: Calls the logout endpoint only, while cache and token cleanup happen in the mutation layer.
export async function logout() {
  await axiosInstance.post(API_PATHS.AUTH.LOGOUT);
}
