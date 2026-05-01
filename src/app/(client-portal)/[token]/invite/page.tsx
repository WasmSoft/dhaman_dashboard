import { PortalInviteSection } from "@/components/client-portal";

export default async function PortalInvitePage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;

  return <PortalInviteSection token={token} />;
}
