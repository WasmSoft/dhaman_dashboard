// AR: دوال API الخام لمراجعات الذكاء الاصطناعي — تستخدم axios و API_PATHS فقط.
// EN: Raw API functions for AI Reviews — uses axios and API_PATHS only.
import { axiosInstance } from "@/lib/axios-instance";
import { API_PATHS } from "@/lib/api-paths";
import type {
  AIReviewApiItem,
  AIReviewApiListResponse,
  AIReviewApiDetailResponse,
  AcceptRecommendationApiResponse,
  OpenAiReviewPayload,
  GetAiReviewsParams,
  AcceptRecommendationPayload,
} from "@/types";

// AR: تجلب قائمة مراجعات AI مع دعم الفلترة والصفحات.
// EN: Fetches the AI reviews list with filtering and pagination support.
export async function getAiReviews(params?: GetAiReviewsParams) {
  const response = await axiosInstance.get<AIReviewApiListResponse>(
    API_PATHS.AI_REVIEWS.LIST,
    { params },
  );
  return response.data;
}

// AR: تجلب تفاصيل مراجعة AI واحدة.
// EN: Fetches a single AI review by ID.
export async function getAiReviewById(reviewId: string) {
  const response = await axiosInstance.get<AIReviewApiDetailResponse>(
    API_PATHS.AI_REVIEWS.DETAILS(reviewId),
  );
  return response.data;
}

// AR: يفتح مراجعة AI جديدة على تسليم عبر بوابة العميل.
// EN: Opens a new AI review on a delivery via the client portal.
export async function openAiReviewViaPortal(
  token: string,
  deliveryId: string,
  payload: OpenAiReviewPayload,
) {
  const response = await axiosInstance.post<AIReviewApiDetailResponse>(
    API_PATHS.AI_REVIEWS.PORTAL_OPEN_REVIEW(token, deliveryId),
    payload,
  );
  return response.data;
}

// AR: يقبل توصية AI ويطبق تغييرات حالة الدفعة.
// EN: Accepts the AI recommendation and applies payment status changes.
export async function acceptAiRecommendation(
  reviewId: string,
  payload?: AcceptRecommendationPayload,
) {
  const response = await axiosInstance.post<AcceptRecommendationApiResponse>(
    API_PATHS.AI_REVIEWS.ACCEPT_RECOMMENDATION(reviewId),
    payload ?? {},
  );
  return response.data;
}
