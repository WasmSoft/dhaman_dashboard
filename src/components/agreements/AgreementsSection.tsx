import Link from "next/link";
import { CircleDollarSign, Clock3, Download, FileText, Filter, MoreHorizontal, Plus, Search, Sparkles } from "lucide-react";

import { Button } from "@/components/shared";
import { Input } from "@/components/shared/input";
import { agreementsContent } from "@/constants";
import { cn } from "@/lib/utils";
import type { AgreementsMetricCard, AgreementsMetricTone, AgreementsStatusTone, AgreementsTableItem } from "@/types";

const metricToneClasses: Record<AgreementsMetricTone, { icon: string; value: string }> = {
  purple: { icon: "bg-[#6f52ff]/20 text-[#a898ff]", value: "text-white" },
  amber: { icon: "bg-amber-500/20 text-amber-300", value: "text-amber-300" },
  violet: { icon: "bg-[#6f52ff]/20 text-[#a898ff]", value: "text-[#a898ff]" },
  emerald: { icon: "bg-emerald-500/20 text-emerald-300", value: "text-emerald-300" },
};

const statusToneClasses: Record<AgreementsStatusTone, string> = {
  active: "bg-emerald-500/15 text-emerald-300",
  review: "bg-[#6f52ff]/20 text-[#a898ff]",
  pending: "bg-amber-500/20 text-amber-300",
  ready: "bg-blue-500/20 text-blue-300",
  closed: "bg-slate-500/20 text-slate-400",
};

const clientToneClasses: Record<AgreementsTableItem["clientTone"], string> = {
  violet: "bg-[#6f52ff] text-white",
  blue: "bg-blue-500 text-white",
  emerald: "bg-emerald-500 text-white",
  amber: "bg-amber-500 text-white",
};

function AgreementMetricIcon({ metric }: { metric: AgreementsMetricCard }) {
  const className = "size-4";

  if (metric.icon === "clock") return <Clock3 className={className} />;
  if (metric.icon === "sparkles") return <Sparkles className={className} />;
  if (metric.icon === "dollar") return <CircleDollarSign className={className} />;

  return <FileText className={className} />;
}

function AgreementsHeader() {
  const content = agreementsContent.agreementsPage;

  return (
    <section className="mb-6 flex w-full flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
      <div className="order-2 max-w-xl text-start lg:order-1">
        <h1 className="text-2xl font-extrabold tracking-[-0.02em] text-white md:text-[28px]">{content.title}</h1>
        <p className="mt-1 text-sm leading-6 text-[#737b99]">{content.subtitle}</p>
      </div>

      <div className="order-1 flex flex-wrap gap-2 lg:order-2">
        <Button asChild className="h-10 rounded-[10px] bg-[#6f52ff] px-4 text-sm font-bold text-white shadow-[0_12px_28px_rgba(111,82,255,0.26)] hover:bg-[#7b63ff]">
          <Link href="/agreements/create">
            <Plus className="size-[15px]" />
            {content.createLabel}
          </Link>
        </Button>
        <Button variant="secondary" className="h-10 rounded-[10px] border border-[#252a42] bg-[#15192b] px-4 text-sm font-bold text-[#c7cce0] hover:bg-[#1d2135] hover:text-white">
          <Download className="size-[15px]" />
          {content.exportLabel}
        </Button>
        <Button variant="secondary" className="h-10 rounded-[10px] border border-[#252a42] bg-[#15192b] px-4 text-sm font-bold text-[#c7cce0] hover:bg-[#1d2135] hover:text-white">
          <Filter className="size-[15px]" />
          {content.filterLabel}
        </Button>
      </div>
    </section>
  );
}

function AgreementsMetrics() {
  const { metrics } = agreementsContent.agreementsPage;

  return (
    <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {metrics.map((metric) => (
        <article key={metric.key} className="min-h-[126px] rounded-[12px] border border-[#252a42] bg-[#15192b] p-5 text-start shadow-[0_18px_45px_rgba(4,7,20,0.18)]">
          <div className="flex justify-end">
            <span className={cn("grid size-[34px] place-items-center rounded-[10px]", metricToneClasses[metric.tone].icon)}>
              <AgreementMetricIcon metric={metric} />
            </span>
          </div>
          <p className="mt-3 text-[13px] font-medium text-[#a7aecb]">{metric.label}</p>
          <strong className={cn("mt-2 block text-[24px] font-extrabold tracking-[-0.02em]", metricToneClasses[metric.tone].value)}>{metric.value}</strong>
          <span className="mt-2 block text-[11px] text-[#58607c]">{metric.helper}</span>
        </article>
      ))}
    </section>
  );
}

function AgreementsFilters() {
  const content = agreementsContent.agreementsPage;

  return (
    <section className="mt-4 space-y-3">
      <div className="grid gap-2 md:grid-cols-[1fr_78px_92px_78px_78px]">
        <div className="relative md:order-first" dir="ltr">
          <Input
            aria-label={content.searchPlaceholder}
            placeholder={content.searchPlaceholder}
            className="h-10 rounded-[10px] border-[#252a42] bg-[#15192b] ps-10 pe-4 text-right text-[13px] text-white placeholder:text-[#636b8a] focus-visible:ring-violet-500/20"
            dir="rtl"
          />
          <Search className="pointer-events-none absolute end-3 top-1/2 size-4 -translate-y-1/2 text-[#636b8a]" />
        </div>
        <span className="hidden h-10 rounded-[10px] border border-[#252a42] bg-[#15192b] md:block" />
        <span className="hidden h-10 rounded-[10px] border border-[#252a42] bg-[#15192b] md:block" />
        <span className="hidden h-10 rounded-[10px] border border-[#252a42] bg-[#15192b] md:block" />
        <span className="hidden h-10 rounded-[10px] border border-[#252a42] bg-[#15192b] md:block" />
      </div>
      <div className="flex flex-wrap justify-start gap-2 lg:justify-end">
        {content.filterChips.map((chip, index) => (
          <button
            key={chip}
            className={cn(
              "h-8 rounded-full border border-[#252a42] bg-[#15192b] px-4 text-[12px] font-medium text-[#8a91ac] transition hover:border-[#6f52ff]/50 hover:text-white",
              index === 0 && "border-[#6f52ff] bg-[#6f52ff]/10 text-[#a898ff]",
            )}
            type="button"
          >
            {chip}
          </button>
        ))}
      </div>
    </section>
  );
}

function AgreementsTable() {
  const content = agreementsContent.agreementsPage;

  return (
    <article className="rounded-[14px] border border-[#252a42] bg-[#15192b] p-4 md:p-6">
      <div className="mb-3 flex items-center justify-between gap-4">
        <h2 className="text-[18px] font-bold text-white">{content.tableTitle}</h2>
        <span className="rounded-full bg-[#242a45] px-3 py-1 text-[11px] font-medium text-[#8a91ac]">{content.tableBadge}</span>
      </div>

      {/* AR: الجدول يستخدم تمريراً أفقياً للجوال مع الحفاظ على محاذاة RTL للبيانات. EN: The table uses horizontal mobile scrolling while preserving RTL data alignment. */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] border-collapse text-start text-[12px]">
          <thead className="text-[#58607c]">
            <tr className="h-[38px] border-b border-[#252a42]">
              {content.tableHeaders.map((header) => (
                <th key={header} className="py-0 pe-4 font-medium first:w-[198px] last:w-[86px] last:pe-0">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {content.agreements.map((agreement) => (
              <tr key={agreement.id} className="h-[94px] border-b border-[#252a42]/55 last:border-0">
                <td className="py-0 pe-4">
                  <strong className="block max-w-[145px] text-[14px] font-extrabold leading-5 text-white">{agreement.project}</strong>
                  <span className="mt-1 block text-[11px] text-[#58607c]">{agreement.code}</span>
                </td>
                <td className="py-0 pe-4">
                  <div className="flex items-center gap-3">
                    <span className={cn("grid size-[30px] shrink-0 place-items-center rounded-[9px] text-[13px] font-bold", clientToneClasses[agreement.clientTone])}>{agreement.clientInitial}</span>
                    <span className="max-w-[86px] text-[13px] leading-5 text-[#c7cce0]">{agreement.client}</span>
                  </div>
                </td>
                <td className="py-0 pe-4 font-extrabold text-white" dir="ltr">{agreement.amount}</td>
                <td className="py-0 pe-4 text-[#c7cce0]">{agreement.stage}</td>
                <td className="py-0 pe-4">
                  <span className={cn("inline-flex rounded-md px-2.5 py-1 text-[11px] font-bold", statusToneClasses[agreement.statusTone])}>{agreement.status}</span>
                </td>
                <td className="py-0 pe-4 text-[#737b99]">{agreement.lastUpdate}</td>
                <td className="py-0 pe-0">
                  <div className="flex items-center gap-2">
                    <Button asChild variant="secondary" className="h-8 rounded-[8px] border border-transparent bg-[#6f52ff]/20 px-3 text-[12px] font-bold text-[#a898ff] hover:bg-[#6f52ff]/30 hover:text-white">
                      <Link href="/agreements/workspace">تفاصيل</Link>
                    </Button>
                    <Button size="icon-sm" variant="ghost" className="text-[#737b99] hover:bg-[#1d2135] hover:text-white">
                      <MoreHorizontal className="size-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </article>
  );
}

function AgreementsInsights() {
  const content = agreementsContent.agreementsPage;

  return (
    <aside className="space-y-3 xl:w-[230px] xl:shrink-0">
      <article className="rounded-[14px] border border-[#252a42] bg-[#15192b] p-5">
        <h2 className="mb-4 flex items-center gap-2 text-[15px] font-extrabold text-white">
          {content.aiTitle}
          <Sparkles className="size-4 text-amber-300" />
        </h2>
        <div className="space-y-4">
          {content.aiTips.map((tip) => (
            <p key={tip.label} className="flex gap-3 text-[12px] leading-6 text-[#a7aecb]">
              <span className={cn("mt-2 size-1.5 shrink-0 rounded-full", tip.tone === "amber" ? "bg-amber-300" : "bg-emerald-300")} />
              {tip.label}
            </p>
          ))}
        </div>
      </article>

      <article className="rounded-[14px] border border-[#252a42] bg-[#15192b] p-5">
        <h2 className="mb-4 text-[15px] font-extrabold text-white">{content.goalsTitle}</h2>
        <div className="space-y-4">
          {content.monthlyGoals.map((goal) => (
            <div key={goal.label}>
              <div className="mb-2 flex items-center justify-between text-[12px]">
                <span className="font-bold text-white">{goal.value}</span>
                <span className="text-[#a7aecb]">{goal.label}</span>
              </div>
              <div className="h-[5px] rounded-full bg-[#0d1020]">
                <span className={cn("block h-full rounded-full", goal.tone === "violet" ? "bg-[#6f52ff]" : "bg-emerald-400")} style={{ width: `${goal.progress}%` }} />
              </div>
            </div>
          ))}
        </div>
      </article>

      <article className="rounded-[14px] border border-[#6f52ff]/45 bg-[#6f52ff]/15 p-5 shadow-[0_18px_45px_rgba(111,82,255,0.12)]">
        <h2 className="text-[15px] font-extrabold text-[#a898ff]">{content.activityTitle}</h2>
        <strong className="mt-5 block text-[22px] font-extrabold text-white">{content.activityValue}</strong>
        <p className="mt-2 text-[12px] text-[#8a91ac]">{content.activityDescription}</p>
      </article>
    </aside>
  );
}

export function AgreementsSection() {
  return (
    <>
      <AgreementsHeader />
      <AgreementsMetrics />
      <AgreementsFilters />
      <section className="mt-4 flex flex-col gap-4 xl:flex-row xl:items-start">
        <div className="min-w-0 flex-1">
          <AgreementsTable />
        </div>
        <AgreementsInsights />
      </section>
    </>
  );
}
