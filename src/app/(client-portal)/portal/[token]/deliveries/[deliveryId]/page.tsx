// AR: صفحة مراجعة تسليم بوابة العميل — تستخدم واجهة المراجعة الموحدة للحفاظ على تناسق التصميم.
// EN: Client portal delivery review page — uses the unified review UI to keep design consistent.
import { PortalDeliverySection } from "@/components/client-portal";

export default async function PortalDeliveryReviewPage({
  params,
}: {
  params: Promise<{ token: string; deliveryId: string }>;
}) {
  const { token, deliveryId } = await params;

  return <PortalDeliverySection token={token} deliveryId={deliveryId} />;
}
