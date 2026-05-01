import { PortalTimelineSection } from "@/components/client-portal";

export default function PortalTimelinePage({
  params,
}: {
  params: { token: string };
}) {
  return <PortalTimelineSection token={params.token} />;
}
