import { cn } from "@/lib/utils";
import { getPaymentStatusLabel, getPaymentStatusTone } from "@/lib/payments/helpers";
import type { PaymentStatus } from "@/types";

// AR: شارة حالة الدفع مع ترجمة ثنائية اللغة.
// EN: Payment status badge with bilingual label support.
export function PaymentStatusBadge({
  status,
  locale = "en",
  className,
}: {
  status: PaymentStatus;
  locale?: "en" | "ar";
  className?: string;
}) {
  const tone = getPaymentStatusTone(status);
  const label = getPaymentStatusLabel(status, locale);

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-bold",
        tone.badge,
        className,
      )}
    >
      {label}
    </span>
  );
}
