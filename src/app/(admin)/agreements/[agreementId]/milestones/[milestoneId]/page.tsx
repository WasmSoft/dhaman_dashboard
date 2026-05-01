// AR: صفحة تفاصيل المرحلة داخل الاتفاقية — تعرض تفاصيل المرحلة الحية عبر الـ API.
// EN: Agreement milestone detail page — renders live milestone details from the API.
import { MilestoneDetailSection } from "@/components/agreements";

interface AgreementMilestoneDetailPageProps {
  params: {
    agreementId: string;
    milestoneId: string;
  };
}

export default function AgreementMilestoneDetailPage({
  params,
}: AgreementMilestoneDetailPageProps) {
  return (
    <MilestoneDetailSection
      agreementId={params.agreementId}
      milestoneId={params.milestoneId}
    />
  );
}
