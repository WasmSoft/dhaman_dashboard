// AR: صفحة إعداد الدفعات في بوابة العميل برمز وصول آمن.
// EN: Client portal payment setup page with secure access token.
import { PortalPaymentSetupSection } from "@/components/payments";

interface PortalPaymentsPageProps {
  params: { token: string };
}

export default function PortalPaymentsPage({
  params,
}: PortalPaymentsPageProps) {
  return <PortalPaymentSetupSection token={params.token} />;
}
