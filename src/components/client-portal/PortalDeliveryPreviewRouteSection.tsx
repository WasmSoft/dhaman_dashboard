"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

import { usePortalWorkspaceQuery } from "@/hooks/deliveries";
import { buildPortalPath, getPortalDeliveryPreviewId } from "@/lib/client-portal";

import { DeliveryPreviewSection } from "./DeliveryPreviewSection";

// AR: يربط مسار /delivery-preview بأحدث تسليم قابل للمراجعة داخل نفس بوابة العميل.
// EN: Connects /delivery-preview to the latest reviewable delivery within the same client portal.
export function PortalDeliveryPreviewRouteSection({ token }: { token: string }) {
  const router = useRouter();
  const workspaceQuery = usePortalWorkspaceQuery(token);
  const deliveryId = getPortalDeliveryPreviewId(workspaceQuery.data?.data);

  useEffect(() => {
    if (!workspaceQuery.isLoading && workspaceQuery.data?.data && !deliveryId) {
      router.push(buildPortalPath(token, "tracking"));
    }
  }, [deliveryId, router, token, workspaceQuery.data?.data, workspaceQuery.isLoading]);

  if (deliveryId) {
    return <DeliveryPreviewSection portalToken={token} deliveryId={deliveryId} />;
  }

  return (
    <div className="flex items-center justify-center py-20">
      <Loader2 className="size-6 animate-spin text-[#6f52ff]" />
    </div>
  );
}
