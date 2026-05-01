import {
  paymentStatusLabels,
  paymentOperationTypeLabels,
  paymentStatusTone,
  paymentToneClasses,
  DEMO_PAYMENT_LABEL,
  DEMO_PAYMENT_LABEL_AR,
} from "@/constants";
import type { PaymentStatus, PaymentOperationType } from "@/types";

// AR: تعيد تسمية حالة الدفع حسب اللغة.
// EN: Returns the payment status label based on locale.
export function getPaymentStatusLabel(
  status: PaymentStatus,
  locale: "en" | "ar" = "en",
): string {
  return paymentStatusLabels[status]?.[locale] ?? status;
}

// AR: تعيد تسمية نوع عملية الدفع حسب اللغة.
// EN: Returns the payment operation type label based on locale.
export function getPaymentOperationTypeLabel(
  operationType: PaymentOperationType,
  locale: "en" | "ar" = "en",
): string {
  return paymentOperationTypeLabels[operationType]?.[locale] ?? operationType;
}

// AR: تعيد نغمة الشارة لحالة الدفع.
// EN: Returns the badge tone for a payment status.
export function getPaymentStatusTone(status: PaymentStatus) {
  const tone = paymentStatusTone[status] ?? "default";
  return paymentToneClasses[tone] ?? paymentToneClasses.default;
}

// AR: تعيد قيمة مالية كما وردت من الخادم — لا تحويل رقمي.
// EN: Returns the money value as received from the server — no numeric coercion.
export function formatPaymentAmount(amount: string): string {
  return amount;
}

// AR: تنسيق الإيصال ورقم العملية للعرض (LTR داخل واجهة RTL).
// EN: Formats receipt number and transaction reference for display (LTR in RTL).
export function formatReceiptNumber(receiptNumber: string | null): string {
  return receiptNumber ?? "--";
}

export function formatTransactionReference(transactionReference: string | null): string {
  return transactionReference ?? "--";
}

// AR: تعيد طابع زمني منسق للعرض.
// EN: Returns a formatted timestamp for display.
export function formatPaymentTimestamp(isoString: string | null, locale: "en" | "ar" = "en"): string {
  if (!isoString) return "--";

  try {
    const date = new Date(isoString);
    return date.toLocaleString(locale === "ar" ? "ar-SA" : "en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return isoString;
  }
}

// AR: تنشئ نص التنبيه بالدفع التجريبي.
// EN: Creates demo payment notice text.
export function getDemoPaymentLabel(locale: "en" | "ar" = "en"): string {
  return locale === "ar" ? DEMO_PAYMENT_LABEL_AR : DEMO_PAYMENT_LABEL;
}

// AR: تتحقق ما إذا كانت الدفعة في حالة تسمح بعرض الإيصال.
// EN: Checks if the payment is in a receipt-eligible state.
export function isPaymentReceiptAvailable(status: PaymentStatus): boolean {
  return status !== "WAITING" && status !== "NOT_REQUIRED";
}

// AR: تتحقق ما إذا كان يمكن تمويل الدفعة.
// EN: Checks if the payment is fundable.
export function isPaymentFundable(status: PaymentStatus): boolean {
  return status === "WAITING";
}

// AR: تتحقق ما إذا كان يمكن إصدار الدفعة.
// EN: Checks if the payment is releasable.
export function isPaymentReleasable(status: PaymentStatus): boolean {
  return status === "READY_TO_RELEASE";
}
