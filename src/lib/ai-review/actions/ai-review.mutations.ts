// AR: خيارات طفرات TanStack Query لمراجعات AI — إدارة الكاش بعد التغييرات.
// EN: TanStack Query mutation options for AI Reviews — cache management after mutations.
import type { QueryClient, UseMutationOptions } from "@tanstack/react-query";
import type {
  OpenAiReviewPayload,
  AcceptRecommendationPayload,
} from "@/types";
import {
  acceptAiRecommendation,
  openAiReviewViaPortal,
} from "./ai-review.api";
import { aiReviewsQueryKeys } from "./ai-review.keys";

// AR: خيارات طفرة فتح مراجعة AI جديدة عبر بوابة العميل.
// EN: Mutation options for opening a new AI review via client portal.
export function openAiReviewMutationOptions(
  queryClient: QueryClient,
): UseMutationOptions<
  Awaited<ReturnType<typeof openAiReviewViaPortal>>,
  Error,
  { token: string; deliveryId: string; payload: OpenAiReviewPayload }
> {
  return {
    mutationFn: ({ token, deliveryId, payload }) =>
      openAiReviewViaPortal(token, deliveryId, payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: aiReviewsQueryKeys.lists(),
      });
    },
  };
}

// AR: خيارات طفرة قبول توصية AI وتطبيق تغييرات الدفعة.
// EN: Mutation options for accepting an AI recommendation and applying payment changes.
export function acceptAiRecommendationMutationOptions(
  queryClient: QueryClient,
): UseMutationOptions<
  Awaited<ReturnType<typeof acceptAiRecommendation>>,
  Error,
  { reviewId: string; payload?: AcceptRecommendationPayload }
> {
  return {
    mutationFn: ({ reviewId, payload }) =>
      acceptAiRecommendation(reviewId, payload),
    onSuccess: async (_, variables) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: aiReviewsQueryKeys.lists(),
        }),
        queryClient.invalidateQueries({
          queryKey: aiReviewsQueryKeys.detail(variables.reviewId),
        }),
      ]);
    },
  };
}
