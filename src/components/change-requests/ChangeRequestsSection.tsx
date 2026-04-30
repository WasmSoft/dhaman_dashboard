"use client";

// AR: قسم يعرض قائمة طلبات التغيير مع زر إنشاء طلب جديد — يدمج داخل صفحة الاتفاقية.
// EN: Section displaying the change requests list with a create button — embedded inside the agreement page.
import { useRouter } from "next/navigation";
import { FileText, Plus, Loader2 } from "lucide-react";
import { Button } from "@/components/shared";
import { useChangeRequestsQuery } from "@/hooks/change-requests";
import { ChangeRequestCard } from "./ChangeRequestCard";
import { CreateChangeRequestDialog } from "./CreateChangeRequestDialog";
import { changeRequestsContent } from "@/constants";

interface ChangeRequestsSectionProps {
  agreementId: string;
}

export function ChangeRequestsSection({
  agreementId,
}: ChangeRequestsSectionProps) {
  const router = useRouter();
  const locale = "ar";
  const ct = changeRequestsContent;

  const { data, isLoading, isError } = useChangeRequestsQuery(agreementId);

  const list = data?.data ?? [];
  const isEmpty = !isLoading && !isError && list.length === 0;

  return (
    <section dir="rtl" className="flex flex-col gap-4 text-start">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xl font-semibold text-white">
          {ct.sectionTitle[locale]}
        </h2>
        <CreateChangeRequestDialog
          agreementId={agreementId}
          trigger={
            <Button>
              <Plus className="me-2 h-4 w-4" />
              {ct.createButton[locale]}
            </Button>
          }
        />
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-6 w-6 animate-spin text-[#6f52ff]" />
        </div>
      )}

      {/* Error */}
      {isError && (
        <div className="rounded-[12px] border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {ct.detail.error[locale]}
        </div>
      )}

      {/* Empty */}
      {isEmpty && (
        <div className="flex flex-col items-center justify-center gap-3 rounded-[14px] border border-dashed border-[#252a42] py-12 text-center">
          <FileText className="h-10 w-10 text-[#5a5f7a]" />
          <p className="text-[15px] font-medium text-[#8b90a8]">
            {ct.emptyState.title[locale]}
          </p>
          <p className="text-[13px] text-[#5a5f7a]">
            {ct.emptyState.description[locale]}
          </p>
        </div>
      )}

      {/* List */}
      {!isLoading && !isEmpty && (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((item) => (
            <ChangeRequestCard
              key={item.id}
              item={item}
              onNavigate={(id) =>
                router.push(`/change-requests/${id}`)
              }
            />
          ))}
        </div>
      )}
    </section>
  );
}
