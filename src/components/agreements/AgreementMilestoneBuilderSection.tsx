"use client";

import Link from "next/link";
import {
  AlertTriangle,
  RefreshCw,
} from "lucide-react";

import { Button } from "@/components/shared";
import { useAgreementMilestonesQuery } from "@/hooks/milestones";
import { formatMilestoneAmount } from "@/lib/milestones/helpers/milestone-display.helper";
import { MilestoneDraftList } from "./MilestoneDraftList";

interface AgreementMilestoneBuilderSectionProps {
  agreementId: string;
}

// AR: باني مراحل الاتفاقية — يجمع بين القائمة والنموذج وعمليات الحفظ والإضافة والتحذيرات.
// EN: Agreement milestone builder — combines list, form, save, add, and warning states.
export function AgreementMilestoneBuilderSection({
  agreementId,
}: AgreementMilestoneBuilderSectionProps) {
  const {
    data: milestoneResponse,
    isLoading,
    isError,
    error,
    refetch: refetchMilestones,
  } = useAgreementMilestonesQuery(agreementId);

  const liveSummary = milestoneResponse?.data;
  const milestones = liveSummary?.milestones ?? [];

  return (
    <section dir="rtl" className="mx-auto max-w-[980px] space-y-4 pb-10">
      <header className="flex flex-col gap-4 rounded-[14px] border border-[#252a42] bg-[radial-gradient(circle_at_top_right,rgba(111,82,255,0.22),transparent_42%),#15192b] p-5 md:p-6">
        <div className="text-start">
          <Button
            asChild
            variant="link"
            className="mb-2 h-auto justify-start p-0 text-[12px] font-bold text-[#8a91ac] hover:text-white"
          >
            <Link href={`/agreements/${agreementId}`}>
              العودة لمساحة العمل
            </Link>
          </Button>
          <h1 className="text-2xl font-extrabold tracking-[-0.02em] text-white md:text-[28px]">
            تعديل مراحل الاتفاق
          </h1>
          <p className="mt-1 text-sm leading-6 text-[#737b99]">
            أضف أو عدّل أو احذف المراحل، ثم احفظ التغييرات قبل إرسال الاتفاق للعميل.
          </p>
        </div>
      </header>

      {isLoading && !liveSummary ? (
        <div className="rounded-[14px] border border-dashed border-[#252a42] bg-[#12162a] px-4 py-10 text-center text-[13px] text-[#8a91ac]">
          جاري تحميل المراحل الحالية...
        </div>
      ) : null}

      {isError ? (
        <section className="rounded-[14px] border border-red-500/20 bg-red-500/10 p-6 text-start">
          <h2 className="text-[15px] font-extrabold text-red-200">
            تعذر تحميل المراحل
          </h2>
          <p className="mt-2 text-[13px] leading-6 text-red-100/80">
            {error instanceof Error
              ? error.message
              : "حدث خطأ غير متوقع أثناء جلب قائمة المراحل."}
          </p>
          <Button
            onClick={() => refetchMilestones()}
            className="mt-4 h-9 rounded-[9px] bg-red-500/80 px-4 text-[12px] font-bold text-white hover:bg-red-500"
          >
            <RefreshCw className="size-3.5" />
            إعادة المحاولة
          </Button>
        </section>
      ) : null}

      {liveSummary && !liveSummary.amountMatch ? (
        <section className="rounded-[14px] border border-amber-500/25 bg-amber-500/10 px-4 py-4 text-start text-[12px] leading-6 text-amber-100/85 md:px-5">
          <div className="flex items-center gap-2">
            <AlertTriangle className="size-4 shrink-0 text-amber-300" />
            <strong className="text-amber-300">تنبيه توافق المبالغ</strong>
          </div>
          <p className="mt-1">
            مجموع المراحل الحالي هو{" "}
            <span className="font-bold" dir="ltr">
              {formatMilestoneAmount(
                liveSummary.totalAmount,
                liveSummary.currency,
              )}
            </span>
            {" "}بينما قيمة الاتفاق هي{" "}
            <span className="font-bold" dir="ltr">
              {formatMilestoneAmount(
                liveSummary.agreementTotalAmount,
                liveSummary.currency,
              )}
            </span>
            .
          </p>
        </section>
      ) : null}

      {liveSummary && milestones.length === 0 ? (
        <div className="rounded-[14px] border border-dashed border-[#252a42] bg-[#12162a] px-4 py-10 text-center text-[13px] text-[#8a91ac]">
          لا توجد مراحل مضافة بعد. أضف المرحلة الأولى أدناه.
        </div>
      ) : null}

      <MilestoneDraftList
        agreementId={agreementId}
        milestones={milestones}
        onChanged={() => refetchMilestones()}
      />

      {liveSummary ? (
        <div className="rounded-[14px] border border-dashed border-[#252a42] bg-[#12162a] px-4 py-4 text-center">
          <Button
            variant="secondary"
            className="h-10 w-full rounded-[10px] border border-[#252a42] bg-[#15192b] text-[13px] font-bold text-[#c7cce0] hover:bg-[#1d2135] hover:text-white"
            onClick={() => refetchMilestones()}
          >
            <RefreshCw className="size-4" />
            تحديث القائمة
          </Button>
        </div>
      ) : null}

      <article className="rounded-[14px] border border-[#6f52ff]/40 bg-gradient-to-l from-[#6f52ff] to-[#8b74ff] p-5 text-white shadow-[0_16px_34px_rgba(111,82,255,0.24)]">
        <h2 className="text-[14px] font-extrabold">المرحلة التالية</h2>
        <p className="mt-3 text-[12px] leading-6 text-white/75">
          بعد الانتهاء من توزيع المراحل والمبالغ، يمكنك متابعة المراجعة وإرسال الاتفاق للعميل.
        </p>
        <Button
          asChild
          className="mt-4 h-9 w-full rounded-[9px] bg-white text-[12px] font-extrabold text-[#4c35c7] hover:bg-white/90"
        >
          <Link href={`/agreements/${agreementId}`}>
            متابعة إلى مساحة العمل
          </Link>
        </Button>
      </article>
    </section>
  );
}
