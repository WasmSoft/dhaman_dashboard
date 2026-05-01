import { TrackingSection } from "@/components/client-portal";

export default async function PortalTrackingPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;

  return <TrackingSection portalToken={token} />;
}
