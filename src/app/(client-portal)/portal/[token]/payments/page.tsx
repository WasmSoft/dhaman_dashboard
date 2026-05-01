// AR: صفحة إعداد الدفعات في بوابة العميل برمز وصول آمن.
// EN: Client portal payment setup page with secure access token.
import { PortalPaymentSetupSection } from "@/components/payments";

export default async function PortalPaymentsPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;

  return <PortalPaymentSetupSection token={token} />;
}
