// AR: صفحة سجل الدفعات للاتفاقية.
// EN: Agreement payment history page.
import { AuthenticatedPaymentHistorySection } from "@/components/payments";

interface AgreementPaymentHistoryPageProps {
  params: { agreementId: string };
}

export default function AgreementPaymentHistoryPage({
  params,
}: AgreementPaymentHistoryPageProps) {
  return <AuthenticatedPaymentHistorySection agreementId={params.agreementId} />;
}
