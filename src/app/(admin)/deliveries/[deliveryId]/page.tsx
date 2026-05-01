import { DeliveryDetailSection } from "@/components/deliveries";

interface DeliveryDetailPageProps {
  params: Promise<{ deliveryId: string }>;
}

export default async function DeliveryDetailPage({ params }: DeliveryDetailPageProps) {
  const { deliveryId } = await params;

  return <DeliveryDetailSection deliveryId={deliveryId} />;
}