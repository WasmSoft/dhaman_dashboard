// AR: صفحة مساحة عمل الاتفاقية الحية — تمرر معرف الاتفاقية للقسم حتى يجلب المراحل والسجل الزمني.
// EN: Live agreement workspace page — passes the agreement ID so the section can load milestones and timeline data.
import { AgreementWorkspaceSection } from "@/components/agreements";

interface AgreementWorkspaceDetailPageProps {
  params: { agreementId: string };
}

export default function AgreementWorkspaceDetailPage({
  params,
}: AgreementWorkspaceDetailPageProps) {
  return <AgreementWorkspaceSection agreementId={params.agreementId} />;
}
