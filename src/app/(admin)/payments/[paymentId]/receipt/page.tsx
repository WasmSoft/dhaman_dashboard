// AR: صفحة إيصال الدفعة.
// EN: Payment receipt page.
import { PaymentReceiptSection } from "@/components/payments";

interface PaymentReceiptPageProps {
  params: { paymentId: string };
}

export default function PaymentReceiptPage({
  params,
}: PaymentReceiptPageProps) {
  return <PaymentReceiptSection paymentId={params.paymentId} />;
}
