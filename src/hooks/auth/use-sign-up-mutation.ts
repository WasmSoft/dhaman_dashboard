"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createSignUpMutationOptions } from "@/lib/auth/actions";

// AR: هذه hook توفر sign-up mutation جاهزة مع نفس سياسة الكاش والتوكن الخاصة بالمصادقة.
// EN: This hook exposes a ready sign-up mutation with the same auth cache and token policy.
export function useSignUpMutation() {
  const queryClient = useQueryClient();

  return useMutation(createSignUpMutationOptions(queryClient));
}
