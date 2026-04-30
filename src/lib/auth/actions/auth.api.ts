import { axiosInstance } from "@/lib/axios-instance";
import { API_PATHS } from "@/lib/api-paths";
import type {
  ApiItemResponse,
  AuthLogoutResponse,
  AuthSessionResponse,
  AuthUser,
  LoginPayload,
  RegisterPayload,
  SignUpPayload,
} from "@/types";

// AR: ترسل بيانات تسجيل الدخول إلى الـ API وتعيد بيانات الجلسة كما هي من الخادم.
// EN: Sends the login payload to the API and returns the session payload as provided by the backend.
export async function login(payload: LoginPayload) {
  const response = await axiosInstance.post<ApiItemResponse<AuthSessionResponse>>(
    API_PATHS.AUTH.LOGIN,
    payload,
  );

  return response.data.data;
}

// AR: تنشئ حساب مستقل جديد عبر endpoint التسجيل وتعيد الجلسة الناتجة.
// EN: Registers a new freelancer account and returns the resulting backend session.
export async function register(payload: RegisterPayload) {
  const response = await axiosInstance.post<ApiItemResponse<AuthSessionResponse>>(
    API_PATHS.AUTH.REGISTER,
    payload,
  );

  return response.data.data;
}

// AR: يحول نموذج التسجيل في الواجهة إلى عقد التسجيل الخلفي بدون إرسال حقول غير مدعومة.
// EN: Maps the UI sign-up form into the backend register contract without sending unsupported fields.
export async function signUp(payload: SignUpPayload) {
  return register({
    email: payload.email,
    name: payload.fullName,
    password: payload.password,
  });
}

// AR: تجلب بيانات المستخدم الحالي لاستخدامها في الحراسة والـ layouts والـ hydration.
// EN: Fetches the current user for guards, layouts, and hydration flows.
export async function getCurrentUser() {
  const response = await axiosInstance.get<ApiItemResponse<AuthUser>>(
    API_PATHS.AUTH.CURRENT_USER,
  );

  return response.data.data;
}

// AR: تستدعي logout endpoint فقط، بينما إدارة الكاش والتوكن تتم في mutation layer.
// EN: Calls the logout endpoint only, while cache and token cleanup happen in the mutation layer.
export async function logout() {
  const response = await axiosInstance.post<ApiItemResponse<AuthLogoutResponse>>(
    API_PATHS.AUTH.LOGOUT,
  );

  return response.data.data;
}
