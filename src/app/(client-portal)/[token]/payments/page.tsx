import { PortalPaymentsSection } from "@/components/client-portal";

export default function PortalPaymentsPage({
  params,
}: {
  params: { token: string };
}) {
  return <PortalPaymentsSection token={params.token} />;
}
