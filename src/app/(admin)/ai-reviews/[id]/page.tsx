// AR: صفحة تفاصيل مراجعة AI — ملف التوجيه يجلب بيانات المراجعة من API ويعرض القسم.
// EN: AI Review detail page — route file fetches review data from API and renders the section.
import { notFound } from "next/navigation";
import { aiReviewContent } from "@/constants";
import { getAiReviewById } from "@/lib/ai-review/actions";
import { mapApiReviewToRow } from "@/lib/ai-review/helpers";
import { AIReviewDetailSection } from "@/components/ai-review";
import type { AIReviewRow } from "@/types";

export default async function AIReviewDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // AR: محاولة جلب المراجعة من API أولاً.
  // EN: Attempt to fetch the review from the API first.
  let row: AIReviewRow | undefined;

  try {
    const response = await getAiReviewById(id);
    if (response.data) {
      row = mapApiReviewToRow(response.data);
    }
  } catch {
    // AR: في حال فشل API، استخدم البيانات الثابتة كاحتياط.
    // EN: If API call fails, fall back to static data.
  }

  // AR: احتياط إلى البيانات الثابتة إذا لم تنجح استجابة API.
  // EN: Fall back to static data if API response was not successful.
  if (!row) {
    row = aiReviewContent.aiReview.rows.find((r) => r.id === id);
  }

  if (!row) {
    notFound();
  }

  return <AIReviewDetailSection row={row} />;
}
