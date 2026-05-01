// AR: صفحة معاينة التسليم في بوابة العميل عبر رمز البوابة.
// EN: Client portal delivery preview page through the portal token.
import { PortalDeliveryPreviewRouteSection } from "@/components/client-portal";

export default async function PortalTokenDeliveryPreviewPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;

  return <PortalDeliveryPreviewRouteSection token={token} />;
}
