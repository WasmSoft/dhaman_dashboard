// AR: صفحة دفعات الاتفاقية المحمية.
// EN: Agreement protected payments page.
import { AgreementPaymentsSection } from "@/components/payments";

interface AgreementPaymentsPageProps {
  params: Promise<{ agreementId: string }>;
}

export default async function AgreementPaymentsPage({
  params,
}: AgreementPaymentsPageProps) {
  const { agreementId } = await params;

  return <AgreementPaymentsSection agreementId={agreementId} />;
}
