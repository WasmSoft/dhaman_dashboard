// AR: صفحة دفعات الاتفاقية المحمية.
// EN: Agreement protected payments page.
import { AgreementPaymentsSection } from "@/components/payments";

interface AgreementPaymentsPageProps {
  params: { agreementId: string };
}

export default function AgreementPaymentsPage({
  params,
}: AgreementPaymentsPageProps) {
  return <AgreementPaymentsSection agreementId={params.agreementId} />;
}
