"use client";

import { useQueryClient } from "@tanstack/react-query";

import { createClientPortalInvalidationActions } from "@/lib/client-portal/actions";

// AR: هذه hook توفر أوامر invalidate الجاهزة لبوابة العميل من دون وضع useQueryClient في الـ components.
// EN: This hook provides ready client-portal invalidation commands without placing useQueryClient inside components.
export function useClientPortalInvalidation() {
  const queryClient = useQueryClient();

  return createClientPortalInvalidationActions(queryClient);
}
