"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

import { usePortalPaymentsQuery } from "@/hooks/payments";
import {
  buildPortalPath,
  getFirstReleasablePortalPaymentId,
} from "@/lib/client-portal";

import { PortalReleasePaymentSection } from "./PortalReleasePaymentSection";

// AR: يربط مسار /release-payment بأول دفعة جاهزة للإصدار مع الحفاظ على واجهة الإصدار الحالية.
// EN: Connects /release-payment to the first payment ready for release while preserving the existing release UI.
export function PortalReleasePaymentFlowSection({ token }: { token: string }) {
  const router = useRouter();
  const paymentsQuery = usePortalPaymentsQuery(token);
  const paymentId = getFirstReleasablePortalPaymentId(paymentsQuery.data?.data);

  useEffect(() => {
    if (!paymentsQuery.isLoading && paymentsQuery.data?.data && !paymentId) {
      router.push(buildPortalPath(token, "tracking"));
    }
  }, [paymentId, paymentsQuery.data?.data, paymentsQuery.isLoading, router, token]);

  if (paymentId) {
    return <PortalReleasePaymentSection token={token} paymentId={paymentId} />;
  }

  return (
    <div className="flex items-center justify-center py-20">
      <Loader2 className="size-6 animate-spin text-[#6f52ff]" />
    </div>
  );
}
