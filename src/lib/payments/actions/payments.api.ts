import { axiosInstance } from "@/lib/axios-instance";
import { API_PATHS } from "@/lib/api-paths";
import type {
  AgreementPaymentsResponse,
  FundMilestoneInput,
  PaymentDetailsResponse,
  PaymentReceiptResponse,
  PortalFundPaymentInput,
  PortalPaymentHistoryApiResponse,
  PortalPaymentPlanApiResponse,
  PortalReleaseConfirmationInput,
  ReleasePaymentInput,
} from "@/types";

// AR: تجلب قائمة الدفعات الخاصة باتفاقية مع ملخص المبالغ.
// EN: Fetches the payments list for an agreement with amount summary.
export async function getAgreementPayments(agreementId: string) {
  const response = await axiosInstance.get<AgreementPaymentsResponse>(
    API_PATHS.PAYMENTS.AGREEMENT_PAYMENTS(agreementId),
  );
  return response.data;
}

// AR: تمول دفعة مرحلة في الوضع التجريبي.
// EN: Funds a milestone payment in demo mode.
export async function fundMilestone(input: FundMilestoneInput) {
  const response = await axiosInstance.post<PaymentDetailsResponse>(
    API_PATHS.PAYMENTS.FUND_MILESTONE,
    input,
  );
  return response.data;
}

// AR: تصدر دفعة جاهزة للإصدار.
// EN: Releases a payment that is ready for release.
export async function releasePayment(input: ReleasePaymentInput) {
  const response = await axiosInstance.post<PaymentDetailsResponse>(
    API_PATHS.PAYMENTS.RELEASE,
    input,
  );
  return response.data;
}

// AR: تجلب تفاصيل دفعة واحدة.
// EN: Fetches a single payment detail.
export async function getPaymentById(paymentId: string) {
  const response = await axiosInstance.get<PaymentDetailsResponse>(
    API_PATHS.PAYMENTS.DETAILS(paymentId),
  );
  return response.data;
}

// AR: تجلب إيصال دفعة مموّلة.
// EN: Fetches the receipt of a funded payment.
export async function getPaymentReceipt(paymentId: string) {
  const response = await axiosInstance.get<PaymentReceiptResponse>(
    API_PATHS.PAYMENTS.RECEIPT(paymentId),
  );
  return response.data;
}

// AR: تجلب خطة الدفع عبر رمز بوابة العميل.
// EN: Fetches the payment plan via a client portal token.
export async function getPortalPayments(token: string) {
  const response = await axiosInstance.get<PortalPaymentPlanApiResponse>(
    API_PATHS.PORTAL_PAYMENTS.LIST(token),
  );
  return response.data;
}

// AR: تجلب سجل دفعات العميل عبر بوابة آمنة.
// EN: Fetches payment history via a secure portal access token.
export async function getPortalPaymentHistory(token: string) {
  const response = await axiosInstance.get<PortalPaymentHistoryApiResponse>(
    API_PATHS.PORTAL_PAYMENTS.HISTORY(token),
  );
  return response.data;
}

// AR: يموّل العميل دفعة عبر رمز البوابة.
// EN: Client funds a payment via portal access token.
export async function fundPaymentFromPortal(
  token: string,
  paymentId: string,
  input: PortalFundPaymentInput,
) {
  // AR: يطلب الـ backend قيمة amount كسلسلة Decimal-safe مع تثبيت method=POST صراحة.
  // EN: The backend requires amount as a Decimal-safe string while method=POST is forced explicitly.
  const response = await axiosInstance.request<PaymentDetailsResponse>({
    method: "POST",
    url: API_PATHS.PORTAL_PAYMENTS.FUND(token, paymentId),
    data: input,
  });
  return response.data;
}

// AR: يؤكد العميل إصدار دفعة جاهزة عبر البوابة.
// EN: Client confirms release of a ready payment via portal.
export async function confirmReleaseFromPortal(
  token: string,
  paymentId: string,
  input: PortalReleaseConfirmationInput,
) {
  const response = await axiosInstance.post<PaymentDetailsResponse>(
    API_PATHS.PORTAL_PAYMENTS.RELEASE(token, paymentId),
    input,
  );
  return response.data;
}
