import { ShieldCheck } from "lucide-react";
import { getDemoPaymentLabel } from "@/lib/payments/helpers";
import { cn } from "@/lib/utils";

// AR: تنبيه بصري بأن الدفع تجريبي بالكامل.
// EN: Visual notice that the payment is entirely demo-only.
export function DemoPaymentNotice({
  locale = "en",
  className,
}: {
  locale?: "en" | "ar";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-[10px] border border-amber-400/20 bg-amber-400/[0.08] px-3 py-2 text-[12px] font-bold text-[#f2c84b]",
        className,
      )}
    >
      <ShieldCheck className="size-[14px] shrink-0" aria-hidden="true" />
      <span>{getDemoPaymentLabel(locale)}</span>
    </div>
  );
}
