// AR: صفحة تفاصيل طلب التغيير في لوحة المستقل.
// EN: Change request detail page in the freelancer admin panel.
import { ChangeRequestDetailSection } from "@/components/change-requests";

interface ChangeRequestDetailPageProps {
  params: { id: string };
}

export default function ChangeRequestDetailPage({
  params,
}: ChangeRequestDetailPageProps) {
  return <ChangeRequestDetailSection id={params.id} />;
}
