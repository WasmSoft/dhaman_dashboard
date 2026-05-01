"use client";

import Link from "next/link";
import {
  ArrowRight,
  CalendarClock,
  CircleDollarSign,
  ClipboardList,
  RefreshCw,
  Send,
  ShieldCheck,
} from "lucide-react";

import { Button } from "@/components/shared";
import { useMilestoneDetailsQuery } from "@/hooks/milestones";
import {
  formatMilestoneAmount,
  getMilestoneDeliveryStatusLabel,
  getMilestonePaymentStatusLabel,
  getMilestoneStatusLabel,
} from "@/lib/milestones";
import { isDeliveryEditable } from "@/lib/deliveries/helpers/delivery-status.helper";

interface MilestoneDetailSectionProps {
  agreementId: string;
  milestoneId: string;
}

const statusToneClasses = {
  milestone: "bg-[#6f52ff]/15 text-[#a898ff]",
  payment: "bg-emerald-500/15 text-emerald-300",
  delivery: "bg-amber-500/15 text-amber-300",
} as const;

// AR: صفحة تفاصيل المرحلة تعرض البيانات الفعلية القادمة من API مع الحفاظ على نفس لغة واجهة الاتفاقيات.
// EN: The milestone detail page renders live API data while staying consistent with the agreements UI language.
export function MilestoneDetailSection({
  agreementId,
  milestoneId,
}: MilestoneDetailSectionProps) {
  const { data, isLoading, isError, error, refetch } =
    useMilestoneDetailsQuery(milestoneId);

  const milestone = data?.data;

  return (
    <section dir="rtl" className="mx-auto max-w-[980px] space-y-4 pb-10">
      <header className="flex flex-col gap-4 rounded-[14px] border border-[#252a42] bg-[radial-gradient(circle_at_top_right,rgba(111,82,255,0.22),transparent_42%),#15192b] p-5 md:p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="text-start">
            <Button
              asChild
              variant="link"
              className="mb-2 h-auto justify-start p-0 text-[12px] font-bold text-[#8a91ac] hover:text-white"
            >
              <Link href={`/agreements/${agreementId}`}>
                <ArrowRight className="size-3.5" />
                العودة لمساحة العمل
              </Link>
            </Button>
            <h1 className="text-2xl font-extrabold tracking-[-0.02em] text-white md:text-[28px]">
              {milestone?.title ?? "تفاصيل المرحلة"}
            </h1>
            <p className="mt-1 text-sm leading-6 text-[#737b99]">
              عرض حالة المرحلة، شروط القبول، وحالة الدفعة المرتبطة بها.
            </p>
          </div>
          {milestone ? (
            <span className="inline-flex w-fit items-center gap-2 rounded-md bg-[#6f52ff]/15 px-3 py-1.5 text-[12px] font-bold text-[#a898ff]">
              <span className="size-1.5 rounded-full bg-[#a898ff]" />
              المرحلة {milestone.orderIndex}
            </span>
          ) : null}
        </div>
      </header>

      {isLoading && !milestone ? (
        <section className="rounded-[14px] border border-[#252a42] bg-[#15192b] p-6 text-center text-[13px] text-[#a7aecb]">
          جاري تحميل بيانات المرحلة...
        </section>
      ) : null}

      {isError ? (
        <section className="rounded-[14px] border border-red-500/20 bg-red-500/10 p-6 text-start">
          <h2 className="text-[15px] font-extrabold text-red-200">
            تعذر تحميل تفاصيل المرحلة
          </h2>
          <p className="mt-2 text-[13px] leading-6 text-red-100/80">
            {error instanceof Error ? error.message : "حدث خطأ غير متوقع أثناء جلب البيانات."}
          </p>
          <Button
            onClick={() => refetch()}
            className="mt-4 h-9 rounded-[9px] bg-red-500/80 px-4 text-[12px] font-bold text-white hover:bg-red-500"
          >
            <RefreshCw className="size-3.5" />
            إعادة المحاولة
          </Button>
        </section>
      ) : null}

      {milestone ? (
        <>
          <section className="grid gap-4 md:grid-cols-3">
            <article className="rounded-[14px] border border-[#252a42] bg-[#15192b] p-5 text-start">
              <span className="mb-3 grid size-9 place-items-center rounded-[10px] bg-[#6f52ff]/20 text-[#a898ff]">
                <ClipboardList className="size-4" />
              </span>
              <p className="text-[12px] text-[#737b99]">حالة المرحلة</p>
              <strong className="mt-2 block text-[16px] font-extrabold text-white">
                {getMilestoneStatusLabel(milestone.status)}
              </strong>
              <span className={`mt-3 inline-flex rounded-md px-2 py-1 text-[11px] font-bold ${statusToneClasses.milestone}`}>
                {milestone.status}
              </span>
            </article>

            <article className="rounded-[14px] border border-[#252a42] bg-[#15192b] p-5 text-start">
              <span className="mb-3 grid size-9 place-items-center rounded-[10px] bg-emerald-500/15 text-emerald-300">
                <CircleDollarSign className="size-4" />
              </span>
              <p className="text-[12px] text-[#737b99]">الدفعة المرتبطة</p>
              <strong className="mt-2 block text-[16px] font-extrabold text-white" dir="ltr">
                {formatMilestoneAmount(milestone.amount, milestone.currency)}
              </strong>
              <span className={`mt-3 inline-flex rounded-md px-2 py-1 text-[11px] font-bold ${statusToneClasses.payment}`}>
                {getMilestonePaymentStatusLabel(milestone.paymentStatus)}
              </span>
            </article>

            <article className="rounded-[14px] border border-[#252a42] bg-[#15192b] p-5 text-start">
              <span className="mb-3 grid size-9 place-items-center rounded-[10px] bg-amber-500/15 text-amber-300">
                <CalendarClock className="size-4" />
              </span>
              <p className="text-[12px] text-[#737b99]">حالة التسليم</p>
              <strong className="mt-2 block text-[16px] font-extrabold text-white">
                {getMilestoneDeliveryStatusLabel(milestone.deliveryStatus)}
              </strong>
              <span className={`mt-3 inline-flex rounded-md px-2 py-1 text-[11px] font-bold ${statusToneClasses.delivery}`}>
                {milestone.dueDate
                  ? new Date(milestone.dueDate).toLocaleDateString("ar-SA")
                  : "بدون موعد محدد"}
              </span>
            </article>
          </section>

          <section className="grid gap-4 lg:grid-cols-[1.4fr_0.9fr]">
            <article className="rounded-[14px] border border-[#252a42] bg-[#15192b] p-5 text-start md:p-6">
              <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-[18px] font-extrabold text-white">
                    شروط القبول
                  </h2>
                  <p className="mt-1 text-[12px] leading-6 text-[#737b99]">
                    العناصر التي يجب أن يراجعها العميل عند تسليم هذه المرحلة.
                  </p>
                </div>
                <span className="grid size-9 shrink-0 place-items-center rounded-[10px] bg-emerald-500/15 text-emerald-300">
                  <ShieldCheck className="size-4" />
                </span>
              </div>

              <div className="space-y-3">
                {milestone.acceptanceCriteria.map((criterion, index) => (
                  <article
                    key={`${criterion.description}-${index}`}
                    className="rounded-[10px] border border-[#252a42] bg-[#1d2135] px-4 py-3"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <strong className="text-[13px] font-bold text-white">
                        {criterion.description}
                      </strong>
                      <span className="rounded-md bg-[#6f52ff]/15 px-2 py-1 text-[11px] font-bold text-[#a898ff]">
                        {criterion.required === false ? "اختياري" : "إلزامي"}
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            </article>

            <article className="rounded-[14px] border border-[#252a42] bg-[#15192b] p-5 text-start md:p-6">
              <h2 className="text-[18px] font-extrabold text-white">
                ملخص سريع
              </h2>
              <div className="mt-4 space-y-3 text-[13px]">
                <div className="flex items-center justify-between gap-3">
                  <strong className="text-white">{milestone.orderIndex}</strong>
                  <span className="text-[#737b99]">ترتيب المرحلة</span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <strong className="text-white">{milestone.revisionLimit}</strong>
                  <span className="text-[#737b99]">حد المراجعات</span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <strong className="text-white">
                    {milestone.createdAt
                      ? new Date(milestone.createdAt).toLocaleDateString("ar-SA")
                      : "-"}
                  </strong>
                  <span className="text-[#737b99]">تاريخ الإنشاء</span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <strong className="text-white">
                    {milestone.updatedAt
                      ? new Date(milestone.updatedAt).toLocaleDateString("ar-SA")
                      : "-"}
                  </strong>
                  <span className="text-[#737b99]">آخر تحديث</span>
                </div>
              </div>

              {milestone.description ? (
                <div className="mt-5 rounded-[10px] bg-[#1d2135] px-4 py-3">
                  <p className="text-[12px] font-bold text-[#a7aecb]">وصف المرحلة</p>
                  <p className="mt-2 text-[13px] leading-6 text-white/85">
                    {milestone.description}
                  </p>
                </div>
              ) : null}
            </article>
          </section>

          {/* AR: رابط إنشاء أو تعديل التسليم لحالات DRAFT و CHANGES_REQUESTED. */}
          {/* EN: Create or edit delivery link for DRAFT and CHANGES_REQUESTED milestone delivery statuses. */}
          {(milestone.deliveryStatus === "DRAFT" || milestone.deliveryStatus === "CHANGES_REQUESTED") && (
            <div className="flex items-center justify-end pt-2">
              <Button
                asChild
                className="h-10 rounded-[10px] bg-[#6f52ff] px-6 text-[13px] font-bold text-white hover:bg-[#7b63ff]"
              >
                <Link href={`/agreements/${agreementId}?createDelivery=${milestoneId}`}>
                  <Send className="me-2 size-4" />
                  {milestone.deliveryStatus === "DRAFT" ? "تقديم تسليم" : "تعديل التسليم"}
                </Link>
              </Button>
            </div>
          )}
        </>
      ) : null}
    </section>
  );
}
