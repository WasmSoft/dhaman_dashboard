import { PortalSection } from "@/components/client-portal";

export default async function PortalReviewPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;

  return <PortalSection token={token} />;
}
