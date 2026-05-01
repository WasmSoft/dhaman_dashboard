// AR: هذا الجدول يعرض العملاء الحاليين مع بيانات التواصل وروابط التفاصيل.
// EN: This table renders the current clients with contact data and detail links.
import Link from "next/link";

import { Button } from "@/components/shared";
import { Skeleton } from "@/components/shared/skeleton";
import { cn } from "@/lib/utils";
import type { Client } from "@/types";
import { formatClientDate, getClientInitials, getOptionalClientValue } from "@/lib/clients";

type ClientListTableProps = {
  clients: Client[];
  isLoading?: boolean;
};

function ClientRowSkeleton() {
  return (
    <tr className="border-b border-[#1d2135]">
      <td className="px-4 py-4"><Skeleton className="h-10 w-full rounded-[10px]" /></td>
      <td className="px-4 py-4"><Skeleton className="h-5 w-20 rounded" /></td>
      <td className="px-4 py-4"><Skeleton className="h-5 w-24 rounded" /></td>
      <td className="px-4 py-4"><Skeleton className="h-5 w-28 rounded" /></td>
      <td className="px-4 py-4"><Skeleton className="h-9 w-24 rounded-[10px]" /></td>
    </tr>
  );
}

export function ClientListTable({ clients, isLoading }: ClientListTableProps) {
  return (
    <div className="overflow-hidden rounded-[18px] border border-[#252a42] bg-[#131729] shadow-[0_18px_45px_rgba(4,7,20,0.18)]" dir="rtl">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[860px]">
          <thead>
            <tr className="border-b border-[#252a42] text-[13px]">
              <th className="px-4 py-3 text-start font-medium text-[#636b8a]">العميل</th>
              <th className="px-4 py-3 text-start font-medium text-[#636b8a]">الهاتف</th>
              <th className="px-4 py-3 text-start font-medium text-[#636b8a]">الشركة</th>
              <th className="px-4 py-3 text-start font-medium text-[#636b8a]">آخر تحديث</th>
              <th className="px-4 py-3 text-start font-medium text-[#636b8a]">الإجراء</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              Array.from({ length: 4 }).map((_, index) => <ClientRowSkeleton key={index} />)
            ) : (
              clients.map((client) => (
                <tr key={client.id} className={cn("border-b border-[#1d2135] transition-colors hover:bg-[#1a1f33]/60") }>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="grid size-10 shrink-0 place-items-center rounded-full bg-violet-500/20 text-[13px] font-bold text-violet-400">
                        {getClientInitials(client)}
                      </div>
                      <div className="min-w-0">
                        <div className="truncate text-[13px] font-semibold text-white">{client.name}</div>
                        <div className="truncate text-[11px] text-[#636b8a]">{client.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-[13px] text-[#c8cee6]">{getOptionalClientValue(client.phone)}</td>
                  <td className="px-4 py-3 text-[13px] text-[#c8cee6]">{getOptionalClientValue(client.companyName)}</td>
                  <td className="px-4 py-3 text-[13px] text-[#c8cee6]">{formatClientDate(client.updatedAt)}</td>
                  <td className="px-4 py-3">
                    <Button asChild variant="secondary" className="h-9 rounded-[10px] border border-[#252a42] bg-[#1d2135] px-3 text-[12px] font-bold text-[#c7cce0] hover:bg-[#262b49] hover:text-white">
                      <Link href={`/clients/${client.id}`}>عرض التفاصيل</Link>
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
