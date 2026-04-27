"use client";

import { useQueryClient } from "@tanstack/react-query";

import { createDashboardInvalidationActions } from "@/lib/dashboard/actions";

// AR: هذه hook توفر أوامر invalidate الخاصة بالـ dashboard بدون تكرار useQueryClient في المكونات.
// EN: This hook provides dashboard invalidation commands without repeating useQueryClient inside components.
export function useDashboardInvalidation() {
  const queryClient = useQueryClient();

  return createDashboardInvalidationActions(queryClient);
}
