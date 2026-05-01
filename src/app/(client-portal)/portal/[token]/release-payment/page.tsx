// AR: صفحة إصدار الدفعة المرتبطة بالتسليم المقبول داخل بوابة العميل.
// EN: Client portal page for releasing the payment tied to the accepted delivery.
import { PortalReleasePaymentFlowSection } from "@/components/payments";

export default async function PortalTokenReleasePaymentPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;

  return <PortalReleasePaymentFlowSection token={token} />;
}
