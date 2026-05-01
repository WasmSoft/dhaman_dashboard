// AR: صفحة تسليم مرحلة محددة داخل الاتفاقية.
// EN: Delivery page for a specific milestone inside an agreement.
import { AgreementDeliverySection } from "@/components/agreements";

interface AgreementMilestoneDeliveryPageProps {
  params: {
    agreementId: string;
    milestoneId: string;
  };
}

export default function AgreementMilestoneDeliveryPage({
  params,
}: AgreementMilestoneDeliveryPageProps) {
  return (
    <AgreementDeliverySection
      agreementId={params.agreementId}
      milestoneId={params.milestoneId}
    />
  );
}
