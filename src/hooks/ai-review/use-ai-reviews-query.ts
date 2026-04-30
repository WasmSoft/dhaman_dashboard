// AR: Hook مخصص لجلب قائمة مراجعات AI داخل مكونات العميل.
// EN: Custom hook for fetching AI reviews list inside client components.
"use client";

import { useQuery } from "@tanstack/react-query";
import { aiReviewsListQueryOptions } from "@/lib/ai-review/actions";
import type { GetAiReviewsParams } from "@/types";

export function useAiReviewsQuery(params?: GetAiReviewsParams) {
  return useQuery(aiReviewsListQueryOptions(params));
}
