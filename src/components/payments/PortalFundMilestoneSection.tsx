"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

import { usePortalPaymentsQuery } from "@/hooks/payments";
import {
  buildPortalPath,
  getFirstFundablePortalPaymentId,
} from "@/lib/client-portal";

import { PortalFundPaymentSection } from "./PortalFundPaymentSection";

// AR: يربط مسار /fund-milestone بأول دفعة تحتاج تمويلاً بدون تغيير واجهة التمويل الحالية.
// EN: Connects /fund-milestone to the first payment that needs funding without changing the existing funding UI.
export function PortalFundMilestoneSection({ token }: { token: string }) {
  const router = useRouter();
  const paymentsQuery = usePortalPaymentsQuery(token);
  const paymentId = getFirstFundablePortalPaymentId(paymentsQuery.data?.data);

  useEffect(() => {
    if (!paymentsQuery.isLoading && paymentsQuery.data?.data && !paymentId) {
      router.push(buildPortalPath(token, "tracking"));
    }
  }, [paymentId, paymentsQuery.data?.data, paymentsQuery.isLoading, router, token]);

  if (paymentId) {
    return <PortalFundPaymentSection token={token} paymentId={paymentId} />;
  }

  return (
    <div className="flex items-center justify-center py-20">
      <Loader2 className="size-6 animate-spin text-[#6f52ff]" />
    </div>
  );
}
