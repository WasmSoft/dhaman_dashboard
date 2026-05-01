import { PortalPaymentHistorySection } from "@/components/client-portal";

export default function PortalPaymentHistoryPage({
  params,
}: {
  params: { token: string };
}) {
  return <PortalPaymentHistorySection token={params.token} />;
}
