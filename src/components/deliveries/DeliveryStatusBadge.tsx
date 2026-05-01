import type { DeliveryStatus } from "@/types";
import { cn } from "@/lib/utils";

interface DeliveryStatusBadgeProps {
  status: DeliveryStatus | string;
  className?: string;
}

// AR: خريطة ألوان حالة التسليم مع الملصقات العربية لكل حالة.
// EN: Delivery status color map with Arabic labels for each status.
const statusConfig: Record<DeliveryStatus, { label: string; tone: string }> = {
  DRAFT: { label: "مسودة", tone: "bg-amber-500/20 text-amber-300" },
  SUBMITTED: { label: "تم الإرسال", tone: "bg-[#6f52ff]/20 text-[#a898ff]" },
  CLIENT_REVIEW: { label: "تحت مراجعة العميل", tone: "bg-[#6f52ff]/20 text-[#cfc6ff]" },
  CHANGES_REQUESTED: { label: "طلب تعديل", tone: "bg-amber-500/20 text-amber-300" },
  ACCEPTED: { label: "مقبولة", tone: "bg-emerald-500/15 text-emerald-300" },
  DISPUTED: { label: "نزاع", tone: "bg-red-500/20 text-red-300" },
};

// AR: الحالة الافتراضية لأي قيمة حالة غير معروفة من الـ backend.
// EN: Fallback for unknown backend status values.
const fallbackConfig = { label: "غير معروف", tone: "bg-gray-500/20 text-gray-400" };

export function DeliveryStatusBadge({ status, className }: DeliveryStatusBadgeProps) {
  const config = statusConfig[status as DeliveryStatus] ?? fallbackConfig;

  return (
    <span className={cn("rounded-md px-2.5 py-1 text-[11px] font-bold", config.tone, className)}>
      {config.label}
    </span>
  );
}