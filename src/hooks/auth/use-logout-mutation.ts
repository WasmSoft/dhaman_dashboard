"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createLogoutMutationOptions } from "@/lib/auth/actions";

// AR: هذه hook توفر logout mutation وتضمن مزامنة كاش المصادقة بعد تسجيل الخروج.
// EN: This hook exposes the logout mutation and keeps auth cache synchronized after sign-out.
export function useLogoutMutation() {
  const queryClient = useQueryClient();

  return useMutation(createLogoutMutationOptions(queryClient));
}
