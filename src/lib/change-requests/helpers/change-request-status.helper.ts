import type { ChangeRequestStatus } from "@/types";

// AR: ترجع إعدادات شارة الحالة (اللون والنص باللغتين) لكل حالة من حالات طلب التغيير.
// EN: Returns badge configuration (color and bilingual label) for each change request status.
export function getStatusBadgeConfig(status: ChangeRequestStatus): {
  label: { ar: string; en: string };
  colorClass: string;
} {
  const configs: Record<
    ChangeRequestStatus,
    { label: { ar: string; en: string }; colorClass: string }
  > = {
    DRAFT: {
      label: { ar: "مسودة", en: "Draft" },
      colorClass: "bg-gray-100 text-gray-700 border-gray-300",
    },
    SENT: {
      label: { ar: "مُرسَل", en: "Sent" },
      colorClass: "bg-blue-100 text-blue-700 border-blue-300",
    },
    APPROVED: {
      label: { ar: "مقبول", en: "Approved" },
      colorClass: "bg-green-100 text-green-700 border-green-300",
    },
    DECLINED: {
      label: { ar: "مرفوض", en: "Declined" },
      colorClass: "bg-red-100 text-red-700 border-red-300",
    },
    FUNDED: {
      label: { ar: "ممول", en: "Funded" },
      colorClass: "bg-purple-100 text-purple-700 border-purple-300",
    },
    IN_PROGRESS: {
      label: { ar: "قيد التنفيذ", en: "In Progress" },
      colorClass: "bg-amber-100 text-amber-700 border-amber-300",
    },
    DELIVERED: {
      label: { ar: "مُسلَّم", en: "Delivered" },
      colorClass: "bg-teal-100 text-teal-700 border-teal-300",
    },
    COMPLETED: {
      label: { ar: "مكتمل", en: "Completed" },
      colorClass: "bg-emerald-100 text-emerald-700 border-emerald-300",
    },
  };

  return configs[status] ?? {
    label: { ar: "غير معروف", en: "Unknown" },
    colorClass: "bg-gray-100 text-gray-500 border-gray-300",
  };
}
