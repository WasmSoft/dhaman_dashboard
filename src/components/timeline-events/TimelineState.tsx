"use client";

import { Loader2, AlertCircle, Ban, FileSearch, Inbox } from "lucide-react";

// AR: مكوّن حالات السجل الزمني المشترك — يُعرض الحالات المختلفة مثل التحميل والفارغ والخطأ.
// EN: Shared timeline state component — displays loading, empty, no-results, error, and access-denied states.
export function TimelineStateView({
  status,
  onRetry,
}: {
  status: "loading" | "empty" | "no-results" | "error" | "access-denied";
  onRetry?: () => void;
}) {
  switch (status) {
    case "loading":
      return (
        <div
          className="flex min-h-[160px] items-center justify-center rounded-[12px] border border-[#252a42] bg-[#15192b] p-5"
          role="status"
          aria-label="جاري تحميل السجل الزمني"
        >
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="size-8 animate-spin text-[#a898ff]" />
            <p className="text-[13px] text-[#737b99]">
              جاري تحميل السجل الزمني...
            </p>
          </div>
        </div>
      );

    case "empty":
      return (
        <div className="flex min-h-[160px] items-center justify-center rounded-[12px] border border-[#252a42] bg-[#15192b] p-5">
          <div className="flex flex-col items-center gap-3 text-center">
            <Inbox className="size-10 text-[#3d4569]" />
            <div>
              <p className="text-[14px] font-medium text-[#e2e3ea]">
                لا توجد أحداث حتى الآن
              </p>
              <p className="mt-1 text-[13px] text-[#737b99]">
                ستظهر هنا الأحداث المهمة عند حدوثها.
              </p>
            </div>
          </div>
        </div>
      );

    case "no-results":
      return (
        <div className="flex min-h-[160px] items-center justify-center rounded-[12px] border border-[#252a42] bg-[#15192b] p-5">
          <div className="flex flex-col items-center gap-3 text-center">
            <FileSearch className="size-10 text-[#3d4569]" />
            <div>
              <p className="text-[14px] font-medium text-[#e2e3ea]">
                لا توجد نتائج مطابقة
              </p>
              <p className="mt-1 text-[13px] text-[#737b99]">
                جرّب تغيير الفلاتر لعرض أحداث أخرى.
              </p>
            </div>
          </div>
        </div>
      );

    case "error":
      return (
        <div className="flex min-h-[160px] flex-col items-center justify-center gap-3 rounded-[12px] border border-[#252a42] bg-[#15192b] p-5">
          <AlertCircle className="size-10 text-red-400" />
          <p className="text-center text-[13px] text-red-400">
            تعذّر تحميل السجل الزمني. الرجاء المحاولة مرة أخرى.
          </p>
          {onRetry && (
            <button
              type="button"
              onClick={onRetry}
              className="rounded-lg bg-[#6f52ff] px-4 py-2 text-[13px] font-medium text-white hover:bg-[#7b63ff]"
            >
              إعادة المحاولة
            </button>
          )}
        </div>
      );

    case "access-denied":
      return (
        <div className="flex min-h-[160px] items-center justify-center rounded-[12px] border border-[#252a42] bg-[#15192b] p-5">
          <div className="flex flex-col items-center gap-3 text-center">
            <Ban className="size-10 text-[#3d4569]" />
            <div>
              <p className="text-[14px] font-medium text-[#e2e3ea]">
                لا تملك صلاحية الوصول
              </p>
              <p className="mt-1 text-[13px] text-[#737b99]">
                لا يمكنك عرض السجل الزمني لهذه الاتفاقية.
              </p>
            </div>
          </div>
        </div>
      );
  }
}
