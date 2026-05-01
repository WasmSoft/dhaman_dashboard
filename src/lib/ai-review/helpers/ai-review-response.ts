import type {
  AIReviewApiDetailResponse,
  AIReviewApiItem,
  AIReviewApiListResponse,
} from "@/types";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isReviewItem(value: unknown): value is AIReviewApiItem {
  return (
    isRecord(value) &&
    typeof value.id === "string" &&
    typeof value.agreementId === "string" &&
    typeof value.milestoneId === "string" &&
    typeof value.status === "string" &&
    typeof value.objection === "string"
  );
}

function isReviewArray(value: unknown): value is AIReviewApiItem[] {
  return Array.isArray(value) && value.every(isReviewItem);
}

// AR: توحّد هذه الدالة استجابة قائمة مراجعات AI بين الشكل المباشر والشكل المغلف داخل data.
// EN: This function normalizes the AI reviews list response between direct and data-wrapped API shapes.
export function resolveAiReviewsListResponse(input: unknown): AIReviewApiListResponse {
  if (isRecord(input) && isReviewArray(input.reviews)) {
    return {
      reviews: input.reviews,
      total: typeof input.total === "number" ? input.total : input.reviews.length,
    };
  }

  if (isRecord(input) && "data" in input && isRecord(input.data) && isReviewArray(input.data.reviews)) {
    return {
      reviews: input.data.reviews,
      total:
        typeof input.data.total === "number"
          ? input.data.total
          : input.data.reviews.length,
    };
  }

  return {
    reviews: [],
    total: 0,
  };
}

// AR: توحّد هذه الدالة استجابة تفاصيل مراجعة AI لتدعم العنصر المباشر أو المغلف داخل data.
// EN: This function normalizes the AI review detail response for direct or data-wrapped payloads.
export function resolveAiReviewDetailResponse(input: unknown): AIReviewApiDetailResponse | null {
  if (isReviewItem(input)) {
    return { data: input };
  }

  if (isRecord(input) && "data" in input) {
    if (isReviewItem(input.data)) {
      return { data: input.data };
    }

    if (isRecord(input.data) && "data" in input.data && isReviewItem(input.data.data)) {
      return { data: input.data.data };
    }
  }

  return null;
}
