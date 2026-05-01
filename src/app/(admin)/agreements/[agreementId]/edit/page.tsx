// AR: صفحة تعديل مراحل الاتفاقية — تعرض باني المراحل للاتفاقية القابلة للتعديل.
// EN: Agreement milestone edit page — renders the milestone builder for editable agreements.
import { AgreementMilestoneBuilderSection } from "@/components/agreements";

interface AgreementEditPageProps {
  params: Promise<{ agreementId: string }>;
}

export default async function AgreementEditPage({ params }: AgreementEditPageProps) {
  const { agreementId } = await params;

  return <AgreementMilestoneBuilderSection agreementId={agreementId} />;
}
