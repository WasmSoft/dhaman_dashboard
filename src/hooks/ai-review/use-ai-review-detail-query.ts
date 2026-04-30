// AR: Hook مخصص لجلب تفاصيل مراجعة AI واحدة داخل مكونات العميل.
// EN: Custom hook for fetching a single AI review detail inside client components.
"use client";

import { useQuery } from "@tanstack/react-query";
import { aiReviewDetailQueryOptions } from "@/lib/ai-review/actions";

export function useAiReviewDetailQuery(reviewId: string) {
  return useQuery(aiReviewDetailQueryOptions(reviewId));
}
