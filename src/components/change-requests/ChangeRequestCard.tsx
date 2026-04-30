"use client";

// AR: بطاقة عرض ملخصة لطلب تغيير داخل القائمة — تعرض العنوان والمبلغ والتاريخ والحالة.
// EN: Summary card for a change request in the list — displays title, amount, date, and status.
import type { ChangeRequestListItem } from "@/types";
import { ChangeRequestStatusBadge } from "./ChangeRequestStatusBadge";

interface ChangeRequestCardProps {
  item: ChangeRequestListItem;
  onNavigate: (id: string) => void;
}

export function ChangeRequestCard({ item, onNavigate }: ChangeRequestCardProps) {
  const formattedAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: item.currency || "USD",
    minimumFractionDigits: 2,
  }).format(Number(item.amount));

  const formattedDate = new Date(item.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <article
      role="button"
      tabIndex={0}
      onClick={() => onNavigate(item.id)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onNavigate(item.id);
      }}
      className="flex cursor-pointer flex-col gap-3 rounded-[12px] border border-[#252a42] bg-[#1a1f37] p-4 transition-colors hover:border-[#3d4472] focus:outline-none focus:ring-2 focus:ring-[#6f52ff]/50"
    >
      <div className="flex flex-col gap-1 text-start">
        <h3 className="text-[15px] font-semibold text-white line-clamp-1">
          {item.title}
        </h3>
        <span className="text-lg font-bold text-[#6f52ff]">
          {formattedAmount}
        </span>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2">
        <ChangeRequestStatusBadge status={item.status} />
        <time className="text-[13px] text-[#8b90a8]">{formattedDate}</time>
      </div>
    </article>
  );
}
