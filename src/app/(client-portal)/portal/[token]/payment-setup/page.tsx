// AR: صفحة إعداد الدفع داخل بوابة العميل باستخدام رمز البوابة الحالي.
// EN: Client portal payment setup page using the current portal token.
import { PortalPaymentSetupSection } from "@/components/payments";

export default async function PortalTokenPaymentSetupPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;

  return <PortalPaymentSetupSection token={token} />;
}
