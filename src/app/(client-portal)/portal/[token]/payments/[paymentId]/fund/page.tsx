// AR: صفحة تأكيد تمويل دفعة عبر بوابة العميل.
// EN: Client portal fund payment confirmation page.
import { PortalFundPaymentSection } from "@/components/payments";

export default async function PortalFundPaymentPage({
  params,
}: {
  params: Promise<{ token: string; paymentId: string }>;
}) {
  const { token, paymentId } = await params;

  return <PortalFundPaymentSection token={token} paymentId={paymentId} />;
}
