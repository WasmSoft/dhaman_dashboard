// AR: صفحة مساحة عمل الاتفاقية الحية — تعالج طلب إنشاء التسليم ثم تمرر معرف الاتفاقية للقسم.
// EN: Live agreement workspace page — handles delivery-create requests before rendering the agreement workspace.
import { AgreementWorkspaceSection } from "@/components/agreements";
import { buildMilestoneDeliveryHref } from "@/lib/milestones/helpers";
import { redirect } from "next/navigation";

interface AgreementWorkspaceDetailPageProps {
  params: Promise<{ agreementId: string }>;
  searchParams?: Promise<{ createDelivery?: string | string[] }>;
}

export default async function AgreementWorkspaceDetailPage({
  params,
  searchParams,
}: AgreementWorkspaceDetailPageProps) {
  const { agreementId } = await params;
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const createDelivery = Array.isArray(resolvedSearchParams?.createDelivery)
    ? resolvedSearchParams?.createDelivery[0]
    : resolvedSearchParams?.createDelivery;

  if (createDelivery) {
    redirect(buildMilestoneDeliveryHref(agreementId, createDelivery));
  }

  return <AgreementWorkspaceSection agreementId={agreementId} />;
}
