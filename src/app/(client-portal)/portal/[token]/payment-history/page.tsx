// AR: صفحة سجل الدفعات بالحرفية المطلوبة في مسار بوابة العميل.
// EN: Payment history page using the required client portal route casing.
import { PortalPaymentHistorySection } from "@/components/payments";

export default async function PortalTokenPaymentHistoryCasedPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;

  return <PortalPaymentHistorySection token={token} />;
}
