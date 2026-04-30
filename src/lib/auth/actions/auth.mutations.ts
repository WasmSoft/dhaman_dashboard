import type {
  QueryClient,
  UseMutationOptions,
} from "@tanstack/react-query";

import { clearAccessToken, setAccessToken } from "@/lib/axios-instance";
import type { LoginPayload, RegisterPayload, SignUpPayload } from "@/types";

import { login, logout, register, signUp } from "./auth.api";
import { authQueryKeys } from "./auth.keys";

// AR: هذه الدالة تبني login mutation options ليعاد استخدامها داخل hooks الخاصة بالمصادقة.
// EN: This function builds reusable login mutation options for auth-specific hooks.
export function createLoginMutationOptions(
  queryClient: QueryClient,
): UseMutationOptions<Awaited<ReturnType<typeof login>>, Error, LoginPayload> {
  return {
    mutationFn: (payload: LoginPayload) => login(payload),
    onSuccess: async (session) => {
      setAccessToken(session.accessToken);

      await queryClient.invalidateQueries({
        queryKey: authQueryKeys.currentUser(),
      });
    },
  };
}

// AR: هذه الدالة تبني register mutation options بعقد backend المباشر.
// EN: This function builds register mutation options using the direct backend contract.
export function createRegisterMutationOptions(
  queryClient: QueryClient,
): UseMutationOptions<
  Awaited<ReturnType<typeof register>>,
  Error,
  RegisterPayload
> {
  return {
    mutationFn: (payload: RegisterPayload) => register(payload),
    onSuccess: async (session) => {
      setAccessToken(session.accessToken);

      await queryClient.invalidateQueries({
        queryKey: authQueryKeys.currentUser(),
      });
    },
  };
}

// AR: هذه الدالة تبني sign-up mutation options وتوحد التعامل مع الكاش والتوكن بعد نجاح التسجيل.
// EN: This function builds sign-up mutation options and centralizes cache and token handling after registration.
export function createSignUpMutationOptions(
  queryClient: QueryClient,
): UseMutationOptions<Awaited<ReturnType<typeof signUp>>, Error, SignUpPayload> {
  return {
    mutationFn: (payload: SignUpPayload) => signUp(payload),
    onSuccess: async (session) => {
      setAccessToken(session.accessToken);

      await queryClient.invalidateQueries({
        queryKey: authQueryKeys.currentUser(),
      });
    },
  };
}

// AR: هذه الدالة تبني logout mutation options مع تنظيف التوكن وإعادة مزامنة كاش المصادقة.
// EN: This function builds logout mutation options with token cleanup and auth cache resynchronization.
export function createLogoutMutationOptions(
  queryClient: QueryClient,
): UseMutationOptions<Awaited<ReturnType<typeof logout>>, Error, void> {
  return {
    mutationFn: logout,
    onSettled: async () => {
      clearAccessToken();

      await queryClient.invalidateQueries({
        queryKey: authQueryKeys.all,
      });
    },
  };
}
