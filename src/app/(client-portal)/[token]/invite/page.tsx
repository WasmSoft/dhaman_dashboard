import { PortalInviteSection } from "@/components/client-portal";

export default function PortalInvitePage({
  params,
}: {
  params: { token: string };
}) {
  return <PortalInviteSection token={params.token} />;
}
