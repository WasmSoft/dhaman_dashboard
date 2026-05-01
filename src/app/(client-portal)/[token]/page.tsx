import { PortalWorkspaceSection } from "@/components/client-portal";

export default async function PortalWorkspacePage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;

  return <PortalWorkspaceSection token={token} />;
}
