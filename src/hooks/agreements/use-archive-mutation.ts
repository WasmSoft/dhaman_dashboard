"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { archiveAgreementMutationOptions } from "@/lib/agreements/actions";

// AR: هذه hook توفر mutation جاهزة لأرشفة الاتفاقية مع إعادة جلب الحالة الأحدث من الخادم.
// EN: This hook exposes a ready archive-agreement mutation and refreshes the latest server state.
export function useArchiveMutation() {
  const queryClient = useQueryClient();

  return useMutation(archiveAgreementMutationOptions(queryClient));
}
