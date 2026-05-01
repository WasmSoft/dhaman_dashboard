// AR: صفحة تمويل أول دفعة مطلوبة داخل بوابة العميل.
// EN: Client portal page for funding the first required payment.
import { PortalFundMilestoneSection } from "@/components/payments";

export default async function PortalTokenFundMilestonePage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;

  return <PortalFundMilestoneSection token={token} />;
}
