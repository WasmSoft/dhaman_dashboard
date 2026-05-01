import { queryOptions } from "@tanstack/react-query";

import {
  getAgreementPayments,
  getPaymentById,
  getPaymentReceipt,
  getPortalPayments,
  getPortalPaymentHistory,
} from "./payments.api";
import { paymentsQueryKeys } from "./payments.keys";

// AR: تبني خيارات استعلام قائمة دفعات الاتفاقية.
// EN: Builds query options for the agreement payment list.
export function agreementPaymentsQueryOptions(agreementId: string) {
  return queryOptions({
    queryKey: paymentsQueryKeys.agreementList(agreementId),
    queryFn: () => getAgreementPayments(agreementId),
  });
}

// AR: تبني خيارات استعلام تفاصيل دفعة واحدة.
// EN: Builds query options for a single payment detail.
export function paymentDetailsQueryOptions(paymentId: string) {
  return queryOptions({
    queryKey: paymentsQueryKeys.detail(paymentId),
    queryFn: () => getPaymentById(paymentId),
  });
}

// AR: تبني خيارات استعلام إيصال الدفعة.
// EN: Builds query options for a payment receipt.
export function paymentReceiptQueryOptions(paymentId: string) {
  return queryOptions({
    queryKey: paymentsQueryKeys.receipt(paymentId),
    queryFn: () => getPaymentReceipt(paymentId),
  });
}

// AR: تبني خيارات استعلام خطة دفع البوابة.
// EN: Builds query options for the portal payment plan.
export function portalPaymentsQueryOptions(token: string) {
  return queryOptions({
    queryKey: paymentsQueryKeys.portalList(token),
    queryFn: () => getPortalPayments(token),
  });
}

// AR: تبني خيارات استعلام سجل دفعات البوابة.
// EN: Builds query options for portal payment history.
export function portalPaymentHistoryQueryOptions(token: string) {
  return queryOptions({
    queryKey: paymentsQueryKeys.portalHistoryList(token),
    queryFn: () => getPortalPaymentHistory(token),
  });
}
