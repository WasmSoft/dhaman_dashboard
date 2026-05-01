"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  ExternalLink,
  FileText,
  Filter,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/shared";
import { deliveriesContent } from "@/constants";
import {
  useDeliveriesFilters,
  useDeliveriesQuery,
  useDeliveryDetailsQuery,
} from "@/hooks/deliveries";
import { useMilestoneDetailsQuery } from "@/hooks/milestones";
import {
  buildDeliveryMetrics,
  buildDeliverySelectedSummary,
  buildDeliveryTableItems,
} from "@/lib/deliveries";
import { cn } from "@/lib/utils";
import type {
  DeliveryMetricTone,
  DeliveryPaymentTone,
  DeliveryRecordStatus,
  DeliveryStatusTone,
} from "@/types";

const metricToneClasses: Record<
  DeliveryMetricTone,
  { card: string; icon: string; badge: string; value: string }
> = {
  amber: {
    card: "border-amber-500/25 bg-amber-500/10",
    icon: "bg-amber-500/15 text-amber-300",
    badge: "bg-amber-500/20 text-amber-300",
    value: "text-white",
  },
  violet: {
    card: "border-[#6f52ff]/25 bg-[#6f52ff]/10",
    icon: "bg-[#6f52ff]/20 text-[#a898ff]",
    badge: "bg-[#6f52ff]/20 text-[#a898ff]",
    value: "text-white",
  },
  emerald: {
    card: "border-emerald-500/25 bg-emerald-500/10",
    icon: "bg-emerald-500/15 text-emerald-300",
    badge: "bg-emerald-500/20 text-emerald-300",
    value: "text-white",
  },
  red: {
    card: "border-red-500/25 bg-red-500/10",
    icon: "bg-red-500/15 text-red-300",
    badge: "bg-red-500/20 text-red-300",
    value: "text-white",
  },
};

const deliveryToneClasses: Record<DeliveryStatusTone, string> = {
  review: "bg-[#6f52ff]/20 text-[#cfc6ff]",
  change: "bg-amber-500/20 text-amber-300",
  accepted: "bg-emerald-500/15 text-emerald-300",
  pending: "bg-amber-500/20 text-amber-300",
  ai: "bg-[#6f52ff]/20 text-[#a898ff]",
  draft: "bg-slate-500/20 text-slate-200",
  disputed: "bg-red-500/20 text-red-300",
};

const paymentToneClasses: Record<DeliveryPaymentTone, string> = {
  client: "bg-blue-500/20 text-blue-300",
  hold: "bg-red-500/20 text-red-300",
  ready: "bg-emerald-500/15 text-emerald-300",
  reserved: "bg-amber-500/20 text-amber-300",
  ai: "bg-[#6f52ff]/20 text-[#a898ff]",
  released: "bg-emerald-500/20 text-emerald-200",
};

const statusFilters: Array<{ label: string; value?: DeliveryRecordStatus }> = [
  { label: "الكل" },
  { label: "مسودة", value: "DRAFT" },
  { label: "تحت مراجعة العميل", value: "CLIENT_REVIEW" },
  { label: "تم الإرسال", value: "SUBMITTED" },
  { label: "طلب تعديل", value: "CHANGES_REQUESTED" },
  { label: "مقبولة", value: "ACCEPTED" },
];

function metricIcon(tone: DeliveryMetricTone) {
  if (tone === "red") return <AlertTriangle className="size-4" />;
  if (tone === "emerald") return <CheckCircle2 className="size-4" />;
  if (tone === "violet") return <FileText className="size-4" />;

  return <Filter className="size-4" />;
}

// AR: صفحة التسليمات الحية — تعرض القائمة والفلاتر والملخص المرتبط بالتسليم المحدد.
// EN: Live deliveries page — shows the list, filters, and the summary tied to the selected delivery.
export function DeliveriesSection() {
  const { filters, setStatus } = useDeliveriesFilters();
  const [selectedDeliveryId, setSelectedDeliveryId] = useState<string | undefined>();

  const { data, isLoading, isError, error } = useDeliveriesQuery(filters);
  const deliveries = useMemo(() => data?.data.deliveries ?? [], [data]);

  const metricCards = useMemo(() => buildDeliveryMetrics(deliveries), [deliveries]);
  const tableItems = useMemo(() => buildDeliveryTableItems(deliveries), [deliveries]);
  const resolvedSelectedDeliveryId =
    selectedDeliveryId && deliveries.some((delivery) => delivery.id === selectedDeliveryId)
      ? selectedDeliveryId
      : deliveries[0]?.id;

  const selectedDeliveryQuery = useDeliveryDetailsQuery(resolvedSelectedDeliveryId);
  const selectedDelivery = selectedDeliveryQuery.data?.data;
  const selectedMilestoneQuery = useMilestoneDetailsQuery(selectedDelivery?.milestoneId);

  const selectedSummary = selectedDelivery
    ? buildDeliverySelectedSummary(
        selectedDelivery,
        selectedMilestoneQuery.data?.data.acceptanceCriteria.map(
          (criterion) => criterion.description,
        ) ?? [],
      )
    : null;

  return (
    <section dir="rtl" className="mx-auto max-w-[1230px] space-y-4 pb-10">
      <header className="flex flex-col gap-4 rounded-[14px] border border-[#252a42] bg-[radial-gradient(circle_at_top_right,rgba(111,82,255,0.22),transparent_42%),#15192b] p-5 text-start md:p-6 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold tracking-[-0.02em] text-white md:text-[28px]">
            {deliveriesContent.title}
          </h1>
          <p className="mt-1 text-sm leading-6 text-[#737b99]">
            {deliveriesContent.subtitle}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button asChild className="h-10 rounded-[10px] bg-[#6f52ff] px-4 text-[13px] font-bold text-white hover:bg-[#7b63ff]">
            <Link href="/agreements">
              <ExternalLink className="size-4" />
              ابدأ من مساحة العمل
            </Link>
          </Button>
        </div>
      </header>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {metricCards.map((metric) => (
          <article
            key={metric.label}
            className={cn(
              "relative min-h-[109px] rounded-[12px] border p-[18px] text-start",
              metricToneClasses[metric.tone].card,
            )}
          >
            <span
              className={cn(
                "absolute end-4 top-3 rounded-md px-2 py-1 text-[10px] font-bold",
                metricToneClasses[metric.tone].badge,
              )}
            >
              {metric.badge}
            </span>
            <span
              className={cn(
                "grid size-10 place-items-center rounded-[10px]",
                metricToneClasses[metric.tone].icon,
              )}
            >
              {metricIcon(metric.tone)}
            </span>
            <strong
              className={cn(
                "mt-3 block text-[24px] font-extrabold",
                metricToneClasses[metric.tone].value,
              )}
            >
              {metric.value}
            </strong>
            <span className="mt-1 block text-[13px] font-bold text-white">
              {metric.label}
            </span>
            <span className="mt-1 block text-[11px] text-[#737b99]">
              {metric.helper}
            </span>
          </article>
        ))}
      </section>

      <section className="flex flex-wrap gap-2 rounded-[14px] border border-[#252a42] bg-[#15192b] p-4">
        {statusFilters.map((filter) => {
          const count = filter.value
            ? deliveries.filter((delivery) => delivery.status === filter.value).length
            : deliveries.length;
          const isActive = filters.status === filter.value || (!filters.status && !filter.value);

          return (
            <button
              key={filter.label}
              type="button"
              onClick={() => setStatus(filter.value)}
              className={cn(
                "inline-flex h-8 items-center gap-2 rounded-[9px] border px-3 text-[12px] font-bold transition",
                isActive
                  ? "border-[#6f52ff]/50 bg-[#6f52ff]/25 text-[#cfc6ff]"
                  : "border-[#252a42] bg-[#101323] text-[#8a91ac] hover:text-white",
              )}
            >
              <span>{filter.label}</span>
              <span className="rounded-full bg-[#262b49] px-1.5 text-[10px] text-[#a898ff]">
                {count}
              </span>
            </button>
          );
        })}
      </section>

      <section dir="ltr" className="flex flex-col gap-4 xl:flex-row xl:items-start">
        <aside className="space-y-3 xl:w-[290px] xl:shrink-0">
          <article className="rounded-[14px] border border-[#252a42] bg-[#15192b] p-5 text-start">
            <h2 className="mb-4 flex items-center gap-2 text-[14px] font-extrabold text-white">
              <FileText className="size-4 text-[#a898ff]" />
              ملخص التسليم المحدد
            </h2>
            {selectedDelivery && selectedSummary ? (
              <div className="space-y-3 text-[12px] leading-6 text-[#c7cce0]">
                <p className="font-bold text-white">{selectedSummary.project}</p>
                <p className="text-[#a898ff]">{selectedSummary.milestone}</p>
                <div className="rounded-[10px] bg-[#101323] p-3">
                  <span className="block text-[#737b99]">{selectedSummary.statusLabel}</span>
                  <strong className="mt-2 block text-white">{selectedSummary.status}</strong>
                </div>
                <div className="rounded-[10px] bg-[#101323] p-3">
                  <span className="block text-[#737b99]">{selectedSummary.paymentLabel}</span>
                  <strong className="mt-2 block text-white">{selectedSummary.payment}</strong>
                </div>
                <div className="rounded-[10px] bg-[#101323] p-3">
                  <span className="block text-[#737b99]">{selectedSummary.deliveryTimeLabel}</span>
                  <strong className="mt-2 block text-white">{selectedSummary.deliveryTime}</strong>
                </div>
                {selectedSummary.criteria.length > 0 ? (
                  <div className="rounded-[10px] bg-[#101323] p-3">
                    <span className="block text-[#737b99]">{selectedSummary.criteriaTitle}</span>
                    <ul className="mt-2 space-y-2">
                      {selectedSummary.criteria.map((criterion) => (
                        <li key={criterion} className="flex items-start gap-2">
                          <CheckCircle2 className="mt-1 size-3.5 shrink-0 text-emerald-300" />
                          <span>{criterion}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
                <p className="rounded-[10px] bg-[#101323] p-3 text-[#8a91ac]">
                  {selectedSummary.note}
                </p>
              </div>
            ) : (
              <p className="text-[12px] text-[#8a91ac]">
                اختر تسليماً من الجدول لعرض ملخصه هنا.
              </p>
            )}
          </article>

          <article className="rounded-[10px] border border-[#6f52ff]/25 bg-[#6f52ff]/10 px-4 py-3 text-start text-[12px] leading-6 text-[#c7cce0]">
            <Sparkles className="me-2 inline size-3.5 text-[#a898ff]" />
            {deliveriesContent.aiNotice}
          </article>
        </aside>

        <div dir="rtl" className="min-w-0 flex-1 rounded-[14px] border border-[#252a42] bg-[#15192b]">
          {isLoading ? (
            <div className="px-4 py-10 text-center text-[13px] text-[#8a91ac]">
              جاري تحميل قائمة التسليمات...
            </div>
          ) : null}

          {isError ? (
            <div className="px-4 py-10 text-center text-[13px] text-red-200">
              {error instanceof Error
                ? error.message
                : "تعذر تحميل قائمة التسليمات الحالية."}
            </div>
          ) : null}

          {!isLoading && !isError && tableItems.length === 0 ? (
            <div className="px-4 py-10 text-center text-[13px] text-[#8a91ac]">
              لا توجد تسليمات مطابقة للفلاتر الحالية.
            </div>
          ) : null}

          {!isLoading && !isError && tableItems.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[860px] border-collapse text-start">
                <thead className="text-[11px] text-[#737b99]">
                  <tr className="h-10 border-b border-[#252a42]">
                    {deliveriesContent.tableHeaders.map((header) => (
                      <th key={header} className="px-4 font-bold">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tableItems.map((item) => (
                    <tr
                      key={item.id}
                      className={cn(
                        "border-t border-[#252a42] text-[12px] text-[#c7cce0] cursor-pointer",
                        resolvedSelectedDeliveryId === item.id &&
                          "bg-[#6f52ff]/10 shadow-[inset_0_0_0_1px_rgba(111,82,255,0.4)]",
                      )}
                      onClick={() => setSelectedDeliveryId(item.id)}
                    >
                      <td className="px-4 py-4">
                        <div className="text-start">
                          <strong className="block text-[13px] font-extrabold text-white">
                            {item.project}
                          </strong>
                          <span className="mt-1 block text-[11px] text-[#737b99]">
                            {item.client}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-start">{item.milestone}</td>
                      <td className="px-4 py-4 text-start">{item.delivery}</td>
                      <td className="px-4 py-4">
                        <span
                          className={cn(
                            "rounded-md px-2.5 py-1 text-[11px] font-bold",
                            deliveryToneClasses[item.deliveryTone],
                          )}
                        >
                          {item.deliveryStatus}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <span
                          className={cn(
                            "rounded-md px-2.5 py-1 text-[11px] font-bold",
                            paymentToneClasses[item.paymentTone],
                          )}
                        >
                          {item.paymentStatus}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-white/80">--</td>
                      <td className="px-4 py-4 text-[#8a91ac]">{item.lastUpdate}</td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          {item.actionHref ? (
                            <Button
                              asChild
                              variant="secondary"
                              className="h-8 rounded-[8px] border border-[#6f52ff]/25 bg-[#6f52ff]/20 px-3 text-[11px] font-bold text-[#cfc6ff] hover:bg-[#6f52ff]/30 hover:text-white"
                            >
                              <Link href={item.actionHref}>{item.actionLabel}</Link>
                            </Button>
                          ) : (
                            <span className="text-[11px] text-[#8a91ac]">{item.actionLabel}</span>
                          )}
                          {item.detailHref ? (
                            <Button
                              asChild
                              size="icon-xs"
                              variant="secondary"
                              className="rounded-[7px] border border-[#252a42] bg-[#101323] text-[#8a91ac] hover:text-white"
                            >
                              <Link href={item.detailHref} aria-label="عرض تفاصيل المرحلة">
                                <ExternalLink className="size-3.5" />
                              </Link>
                            </Button>
                          ) : null}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : null}
        </div>
      </section>
    </section>
  );
}
