// AR: صفحة سجل الدفعات للاتفاقية.
// EN: Agreement payment history page.
import { AuthenticatedPaymentHistorySection } from "@/components/payments";

interface AgreementPaymentHistoryPageProps {
  params: Promise<{ agreementId: string }>;
}

export default async function AgreementPaymentHistoryPage({
  params,
}: AgreementPaymentHistoryPageProps) {
  const { agreementId } = await params;

  return <AuthenticatedPaymentHistorySection agreementId={agreementId} />;
}
