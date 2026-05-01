// AR: صفحة تعديل مراحل الاتفاقية — تعرض باني المراحل للاتفاقية القابلة للتعديل.
// EN: Agreement milestone edit page — renders the milestone builder for editable agreements.
import { AgreementMilestoneBuilderSection } from "@/components/agreements";

interface AgreementEditPageProps {
  params: { agreementId: string };
}

export default function AgreementEditPage({ params }: AgreementEditPageProps) {
  return <AgreementMilestoneBuilderSection agreementId={params.agreementId} />;
}
