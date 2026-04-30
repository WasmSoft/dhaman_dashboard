// AR: Hook طفرة لقبول توصية AI وتطبيق تغييرات الدفعة.
// EN: Mutation hook for accepting an AI recommendation and applying payment changes.
"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { acceptAiRecommendationMutationOptions } from "@/lib/ai-review/actions";

export function useAcceptRecommendationMutation() {
  const queryClient = useQueryClient();
  return useMutation(acceptAiRecommendationMutationOptions(queryClient));
}
