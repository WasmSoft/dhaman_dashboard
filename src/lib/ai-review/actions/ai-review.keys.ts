// AR: مفاتيح TanStack Query لمراجعات AI — تضمن استقرار الكاش والتحديث الصحيح.
// EN: TanStack Query keys for AI Reviews — ensures stable cache and correct invalidation.
import type { GetAiReviewsParams } from "@/types";

export const aiReviewsQueryKeys = {
  all: ["ai-reviews"] as const,
  lists: () => [...aiReviewsQueryKeys.all, "list"] as const,
  list: (params?: GetAiReviewsParams) =>
    [...aiReviewsQueryKeys.lists(), params ?? {}] as const,
  details: () => [...aiReviewsQueryKeys.all, "details"] as const,
  detail: (reviewId: string) =>
    [...aiReviewsQueryKeys.details(), reviewId] as const,
} as const;
