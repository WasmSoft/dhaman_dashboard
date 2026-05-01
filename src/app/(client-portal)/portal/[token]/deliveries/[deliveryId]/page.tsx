// AR: صفحة مراجعة تسليم واحدة عبر بوابة العميل برمز وصول آمن.
// EN: Portal page for reviewing one delivery using a secure access token.
import { DeliveryPreviewSection } from "@/components/client-portal";

interface PortalDeliveryReviewPageProps {
  params: { token: string; deliveryId: string };
}

export default function PortalDeliveryReviewPage({
  params,
}: PortalDeliveryReviewPageProps) {
  return (
    <DeliveryPreviewSection
      portalToken={params.token}
      deliveryId={params.deliveryId}
    />
  );
}
