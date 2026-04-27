import type {
  QueryClient,
  UseMutationOptions,
} from "@tanstack/react-query";

import { clearAccessToken, setAccessToken } from "@/lib/axios-instance";
import type { LoginPayload, SignUpPayload } from "@/types";

import { login, logout, signUp } from "./auth.api";
import { authQueryKeys } from "./auth.keys";

// AR: هذه الدالة تبني login mutation options ليعاد استخدامها داخل hooks الخاصة بالمصادقة.
// EN: This function builds reusable login mutation options for auth-specific hooks.
export function createLoginMutationOptions(
  queryClient: QueryClient,
): UseMutationOptions<Awaited<ReturnType<typeof login>>, Error, LoginPayload> {
  return {
    mutationFn: (payload: LoginPayload) => login(payload),
    onSuccess: async (session) => {
      if (session.tokens?.accessToken) {
        setAccessToken(session.tokens.accessToken);
      }

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
      if (session.tokens?.accessToken) {
        setAccessToken(session.tokens.accessToken);
      }

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
): UseMutationOptions<void, Error, void> {
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
