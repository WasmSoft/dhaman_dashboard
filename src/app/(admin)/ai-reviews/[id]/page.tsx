// AR: صفحة تفاصيل مراجعة AI — ملف التوجيه يجلب بيانات المراجعة ويعرض القسم.
// EN: AI Review detail page — route file fetches review data and renders the section.
import { notFound } from "next/navigation";
import { aiReviewContent } from "@/constants";
import { AIReviewDetailSection } from "@/components/ai-review";

export default async function AIReviewDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const row = aiReviewContent.aiReview.rows.find((r) => r.id === id);

  if (!row) {
    notFound();
  }

  return <AIReviewDetailSection row={row} />;
}