// AR: صفحة تسليم مرحلة محددة داخل الاتفاقية.
// EN: Delivery page for a specific milestone inside an agreement.
import { AgreementDeliverySection } from "@/components/agreements";

interface AgreementMilestoneDeliveryPageProps {
  params: Promise<{
    agreementId: string;
    milestoneId: string;
  }>;
}

export default async function AgreementMilestoneDeliveryPage({
  params,
}: AgreementMilestoneDeliveryPageProps) {
  const { agreementId, milestoneId } = await params;

  return (
    <AgreementDeliverySection
      agreementId={agreementId}
      milestoneId={milestoneId}
    />
  );
}
