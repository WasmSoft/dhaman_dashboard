// AR: خيارات استعلامات TanStack Query لمراجعات AI — قابلة لإعادة الاستخدام.
// EN: TanStack Query options for AI Reviews — reusable across components.
import { queryOptions } from "@tanstack/react-query";
import type { GetAiReviewsParams } from "@/types";
import { getAiReviews, getAiReviewById } from "./ai-review.api";
import { aiReviewsQueryKeys } from "./ai-review.keys";

// AR: خيارات استعلام قائمة مراجعات AI مع دعم الفلترة والصفحات.
// EN: AI reviews list query options with filtering and pagination support.
export function aiReviewsListQueryOptions(params?: GetAiReviewsParams) {
  return queryOptions({
    queryKey: aiReviewsQueryKeys.list(params),
    queryFn: () => getAiReviews(params),
  });
}

// AR: خيارات استعلام تفاصيل مراجعة AI واحدة.
// EN: AI review detail query options for a single review.
export function aiReviewDetailQueryOptions(reviewId: string) {
  return queryOptions({
    queryKey: aiReviewsQueryKeys.detail(reviewId),
    queryFn: () => getAiReviewById(reviewId),
    enabled: Boolean(reviewId),
  });
}
