// AR: صفحة طلبات التغيير داخل بوابة العميل باستخدام مساحة العمل الحالية.
// EN: Client portal change requests page using the current workspace view.
import { PortalWorkspaceSection } from "@/components/client-portal";

export default async function PortalTokenChangeRequestsPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;

  return <PortalWorkspaceSection token={token} />;
}
