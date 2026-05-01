import { PortalDeliverySection } from "@/components/client-portal";

export default function PortalDeliveryPage({
  params,
}: {
  params: { token: string; deliveryId: string };
}) {
  return (
    <PortalDeliverySection
      token={params.token}
      deliveryId={params.deliveryId}
    />
  );
}
