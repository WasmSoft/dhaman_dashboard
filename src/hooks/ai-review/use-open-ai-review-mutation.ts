// AR: Hook طفرة لفتح مراجعة AI جديدة عبر بوابة العميل.
// EN: Mutation hook for opening a new AI review via the client portal.
"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { openAiReviewMutationOptions } from "@/lib/ai-review/actions";

export function useOpenAiReviewMutation() {
  const queryClient = useQueryClient();
  return useMutation(openAiReviewMutationOptions(queryClient));
}
