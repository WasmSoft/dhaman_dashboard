// AR: صفحة تأكيد إصدار دفعة عبر بوابة العميل.
// EN: Client portal release confirmation page.
import { PortalReleasePaymentSection } from "@/components/payments";

interface PortalReleasePaymentPageProps {
  params: { token: string; paymentId: string };
}

export default function PortalReleasePaymentPage({
  params,
}: PortalReleasePaymentPageProps) {
  return (
    <PortalReleasePaymentSection
      token={params.token}
      paymentId={params.paymentId}
    />
  );
}
