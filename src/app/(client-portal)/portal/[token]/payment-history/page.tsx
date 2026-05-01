// AR: صفحة سجل الدفعات في بوابة العميل.
// EN: Client portal payment history page.
import { PortalPaymentHistorySection } from "@/components/payments";

interface PortalPaymentHistoryPageProps {
  params: { token: string };
}

export default function PortalPaymentHistoryPage({
  params,
}: PortalPaymentHistoryPageProps) {
  return <PortalPaymentHistorySection token={params.token} />;
}
