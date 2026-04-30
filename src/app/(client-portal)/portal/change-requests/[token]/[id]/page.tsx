// AR: صفحة بوابة العميل لإدارة طلب التغيير (موافقة / رفض / تمويل).
// EN: Client portal page for managing a change request (approve / decline / fund).
import { ChangeRequestPortalSection } from "@/components/client-portal/ChangeRequestPortalSection";

interface PortalChangeRequestPageProps {
  params: { token: string; id: string };
}

export default function PortalChangeRequestPage({
  params,
}: PortalChangeRequestPageProps) {
  return <ChangeRequestPortalSection token={params.token} id={params.id} />;
}
