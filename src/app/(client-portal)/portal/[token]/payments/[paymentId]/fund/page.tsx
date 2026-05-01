// AR: صفحة تأكيد تمويل دفعة عبر بوابة العميل.
// EN: Client portal fund payment confirmation page.
import { PortalFundPaymentSection } from "@/components/payments";

interface PortalFundPaymentPageProps {
  params: { token: string; paymentId: string };
}

export default function PortalFundPaymentPage({
  params,
}: PortalFundPaymentPageProps) {
  return (
    <PortalFundPaymentSection
      token={params.token}
      paymentId={params.paymentId}
    />
  );
}
