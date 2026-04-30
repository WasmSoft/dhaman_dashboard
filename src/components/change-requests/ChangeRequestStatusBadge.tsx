"use client";

// AR: شارة حالة ملونة لطلبات التغيير تدعم العربية والإنجليزية.
// EN: Color-coded status badge for change requests, supporting Arabic and English.
import type { ChangeRequestStatus } from "@/types";
import { getStatusBadgeConfig } from "@/lib/change-requests/helpers";
import { cn } from "@/lib/utils";

interface ChangeRequestStatusBadgeProps {
  status: ChangeRequestStatus;
  locale?: "ar" | "en";
  className?: string;
}

export function ChangeRequestStatusBadge({
  status,
  locale = "ar",
  className,
}: ChangeRequestStatusBadgeProps) {
  const { label, colorClass } = getStatusBadgeConfig(status);

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border px-2.5 py-1 text-[13px] font-medium leading-none",
        colorClass,
        className,
      )}
    >
      {label[locale]}
    </span>
  );
}
