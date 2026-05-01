// AR: صفحة تفاصيل مراجعة AI — ملف التوجيه يمرر المعرّف فقط إلى صفحة عميلة تستخدم جلب المتصفح.
// EN: AI Review detail page — route file only passes the id into a client page that uses browser-authenticated fetching.
import { AIReviewDetailPage } from "@/components/ai-review";

export default async function AIReviewDetailRoute({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <AIReviewDetailPage reviewId={id} />;
}
