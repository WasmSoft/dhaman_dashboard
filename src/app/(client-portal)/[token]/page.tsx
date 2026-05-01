import { PortalWorkspaceSection } from "@/components/client-portal";

export default function PortalWorkspacePage({
  params,
}: {
  params: { token: string };
}) {
  return <PortalWorkspaceSection token={params.token} />;
}
