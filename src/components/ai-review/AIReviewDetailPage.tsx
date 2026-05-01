"use client";

import { NotFoundState, Skeleton } from "@/components/shared";
import { useAiReviewDetailQuery, useAiReviewsQuery } from "@/hooks/ai-review";
import { mapApiReviewToRow, mapApiReviewsToRows } from "@/lib/ai-review/helpers";

import { AIReviewDetailSection } from "./AIReviewDetailSection";

interface AIReviewDetailPageProps {
  reviewId: string;
}

// AR: صفحة عميلة لتفاصيل مراجعة AI حتى تستخدم توكن المتصفح وتتفادى فشل الجلب على الخادم.
// EN: Client-side AI review detail page so it can use the browser token and avoid server-side auth fetch failures.
export function AIReviewDetailPage({ reviewId }: AIReviewDetailPageProps) {
  const detailQuery = useAiReviewDetailQuery(reviewId);
  const listQuery = useAiReviewsQuery({ page: 1, limit: 100 });

  const detailRow = detailQuery.data?.data
    ? mapApiReviewToRow(detailQuery.data.data)
    : undefined;
  const listRow = listQuery.data?.reviews
    ? mapApiReviewsToRows(listQuery.data.reviews).find((review) => review.id === reviewId)
    : undefined;
  const row = detailRow ?? listRow;

  if (detailQuery.isLoading && listQuery.isLoading && !row) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-24 w-full rounded-[14px] bg-[#1d2135]" />
        <Skeleton className="h-64 w-full rounded-[14px] bg-[#1d2135]" />
        <Skeleton className="h-72 w-full rounded-[14px] bg-[#1d2135]" />
      </div>
    );
  }

  if (!row && detailQuery.isError && listQuery.isError) {
    return (
      <NotFoundState
        eyebrow="مراجعات AI"
        code="404"
        title="تعذر العثور على مراجعة الذكاء الاصطناعي"
        description="قد يكون الرابط غير صحيح أو أن هذه المراجعة لم تعد متاحة داخل حسابك الحالي."
        primaryActionLabel="العودة إلى مراجعات AI"
        primaryActionHref="/ai-reviews"
        highlights={[]}
      />
    );
  }

  if (!row) {
    return (
      <NotFoundState
        eyebrow="مراجعات AI"
        code="404"
        title="هذه المراجعة غير متاحة حالياً"
        description="لم نتمكن من تحميل تفاصيل المراجعة المطلوبة من البيانات الحية بعد."
        primaryActionLabel="العودة إلى مراجعات AI"
        primaryActionHref="/ai-reviews"
        highlights={[]}
      />
    );
  }

  return <AIReviewDetailSection row={row} />;
}
