"use client";

import Link from "next/link";

import {
  CalendarDays,
  Download,
  Filter,
  MoreHorizontal,
  Pencil,
  Plus,
} from "lucide-react";

import { Button } from "@/components/shared";
import { dashboardContent } from "@/constants";
import { cn } from "@/lib/utils";

import { DashboardActionsRequired } from "./DashboardActionsRequired";
import { DashboardIcon } from "./DashboardIcon";
import { DashboardOverviewCards } from "./DashboardOverviewCards";
import { DashboardRecentActivity } from "./DashboardRecentActivity";

const statusToneClasses = {
  success: "bg-emerald-500/15 text-emerald-300",
  purple: "bg-[#6f52ff]/20 text-[#a898ff]",
  blue: "bg-blue-500/20 text-blue-300",
  muted: "bg-slate-500/20 text-slate-400",
} as const;

const progressToneClasses = {
  purple: { bar: "bg-[#6f52ff]", icon: "bg-[#6f52ff]/15 text-[#a898ff]" },
  amber: { bar: "bg-amber-400", icon: "bg-amber-500/15 text-amber-300" },
  emerald: { bar: "bg-emerald-400", icon: "bg-emerald-500/15 text-emerald-300" },
} as const;

function OverviewChart() {
  const { chartBars } = dashboardContent.dashboard;
  const guideLabels = ["$40k", "$30k", "$20k", "$10k", "$0"];

  return (
    <article className="min-h-[407.6px] w-full rounded-[14px] border border-[#252a42] bg-[#15192b] p-[20.8px]">
      <div className="mb-3 flex h-[30px] items-center justify-between gap-4">
        <h2 className="text-[18px] font-bold text-white">نظرة عامة</h2>
       
        <div className="flex items-center gap-2 text-[12px] text-[#737b99]">
           <span className="h-[26px] w-[82px] rounded-lg bg-[#22264a]" />
          <span>الدفعات المحمية</span>
          <MoreHorizontal className="size-4" />
         
          
        </div>
       
      </div>

      {/* AR: الرسم البياني يحافظ على ترتيب الأشهر الظاهر في Figma مع أعمدة مرنة للجوال. EN: The chart preserves the Figma month order while keeping flexible mobile columns. */}
      <div className="relative overflow-x-auto pb-1" dir="ltr">
        <div className="absolute inset-x-0 top-0 grid h-[301px] min-w-[500px] grid-rows-5 text-[11px] text-[#58607c]">
          {guideLabels.map((label) => (
            <div key={label} className="flex items-start justify-end border-t border-[#252a42]/60">
              <span className="-mt-2 bg-[#15192b] ps-2">{label}</span>
            </div>
          ))}
        </div>
        <div className="relative z-10 grid min-w-[500px] grid-cols-12 items-end gap-[6px] pt-0">
          {chartBars.map((bar) => (
            <div key={bar.month} className="flex h-[301px] flex-col items-center justify-end gap-2">
              {"label" in bar && bar.label ? (
                <span className="mb-1 rounded-lg bg-[#6f52ff] px-3 py-2 text-[11px] font-bold text-white shadow-[0_0_22px_rgba(111,82,255,0.48)]">
                  {bar.label}
                </span>
              ) : null}
              <span
                className={cn(
                  "w-full max-w-[36.16px] rounded-t-[6px] bg-[#28275b]",
                  "active" in bar && bar.active && "bg-gradient-to-b from-[#9b87ff] to-[#6f52ff] shadow-[0_0_24px_rgba(111,82,255,0.45)]",
                )}
                style={{ height: `${bar.value}%` }}
              />
            </div>
          ))}
        </div>
        <div className="mt-2 grid min-w-[500px] grid-cols-12 gap-[6px] text-center text-[11px] text-[#737b99]">
          {chartBars.map((bar) => (
            <span key={bar.month} className={cn("active" in bar && bar.active && "font-bold text-[#a898ff]")}>{bar.month}</span>
          ))}
        </div>
      </div>
    </article>
  );
}

function AgreementsPanel() {
  const { agreements } = dashboardContent.dashboard;

  return (
    <aside className="w-full space-y-[14px]">
      <div className="grid grid-cols-2 gap-[10px]">
        <Button asChild className="h-[46.6px] rounded-[10px] bg-[#6f52ff] text-sm font-bold text-white shadow-[0_12px_28px_rgba(111,82,255,0.26)] hover:bg-[#7b63ff] xl:w-[155px]">
          <Link href="/agreements/create">
            <Plus className="size-[15px]" />
            إنشاء اتفاق
          </Link>
        </Button>
        <Button variant="secondary" className="h-[46.6px] rounded-[10px] border border-[#252a42] bg-[#1d2135] text-sm font-bold text-white hover:bg-[#262b49] xl:w-[155px]">
          <Download className="size-[15px]" />
          طلب دفعة
        </Button>
      </div>

      <article className="min-h-[347px] rounded-[14px] border border-[#252a42] bg-[#15192b] p-[16.8px]">
        <div className="mb-[14px] flex h-[21px] items-center justify-between gap-4">
          <h2 className="text-[16px] font-bold text-white">اتفاقاتي الحالية</h2>
          <button className="text-[12px] font-medium text-[#a898ff]">+ إضافة جديد</button>
        </div>
        <div className="space-y-[8px]">
          {agreements.map((agreement) => (
            <article key={agreement.id} className="flex h-[63.6px] items-center justify-between gap-3 rounded-[10px] bg-[#1d2135] px-[12.8px] py-0">
              <div className="w-[74px] shrink-0 text-start">
                <strong className="block text-[13px] text-white">{agreement.amount}</strong>
                <span className={cn("mt-1 inline-flex rounded-md px-2 py-1 text-[11px] font-bold", statusToneClasses[agreement.statusTone])}>
                  {agreement.status}
                </span>
              </div>
              <div className="ms-auto flex min-w-0 items-center gap-[10px] text-start">
                <div className="min-w-0">
                  <h3 className="text-[13px] font-bold text-white">{agreement.title}</h3>
                  <p className="mt-1 text-[11px] text-[#737b99]">{agreement.code}</p>
                </div>
                <span className="grid size-7 place-items-center rounded-lg bg-[#292d52] text-sm">{agreement.emoji}</span>
              </div>
            </article>
          ))}
        </div>
      </article>
    </aside>
  );
}

function TransactionsTable() {
  const { transactions } = dashboardContent.dashboard;

  return (
    <article className="min-h-[308.4px] w-full rounded-[14px] border border-[#252a42] bg-[#15192b] p-[20.8px]">
      <div className="mb-[14px] flex h-[31.6px] items-center justify-between gap-4">
         <h2 className="text-[18px] font-bold text-white">آخر المعاملات</h2>
       
        <Button variant="secondary" className="h-[31.6px] rounded-[9px] border border-[#252a42] bg-[#1d2135] px-[12.8px] text-[12px] text-[#a7aecb] hover:bg-[#262b49] hover:text-white xl:w-[78px]">
          <Filter className="size-[13px]" />
          تصفية
        </Button>
      
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[500px] border-collapse text-start text-[12px]">
          <thead className="text-[#737b99]">
            <tr className="h-[32.9px] border-b border-[#252a42]">
              <th className="w-[181.4px] py-0 pe-4 font-medium">النشاط</th>
              <th className="w-[89.8px] py-0 font-medium">التاريخ</th>
              <th className="w-[77.9px] py-0 font-medium">المبلغ</th>
              <th className="w-[107.1px] py-0 font-medium">الحالة</th>
              <th className="w-[43.7px] py-0" />
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.title} className="h-[60.8px] border-b border-[#252a42]/55 last:border-0">
                <td className="py-0 pe-4">
                  <div className="flex items-center gap-3">
                    <span className="grid size-[30px] place-items-center rounded-lg bg-[#292d52] text-sm">{transaction.emoji}</span>
                    <div>
                      <strong className="block text-[13px] text-white">{transaction.title}</strong>
                      <span className="text-[11px] text-[#737b99]">{transaction.description}</span>
                    </div>
                  </div>
                </td>
                <td className="py-0 text-[#8a91ac]">{transaction.date}</td>
                <td className="py-0 font-bold text-white">{transaction.amount}</td>
                <td className="py-0">
                  <span className={cn("inline-flex rounded-md px-2.5 py-1 text-[11px] font-bold", statusToneClasses[transaction.statusTone])}>
                    {transaction.status}
                  </span>
                </td>
                <td className="py-0 text-[#737b99]"><MoreHorizontal className="size-4" /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </article>
  );
}

function ReviewsPanel() {
  const { reviews } = dashboardContent.dashboard;

  return (
    <article className="min-h-[308.4px] w-full rounded-[14px] border border-[#252a42] bg-[#15192b] p-[16.8px]">
      <div className="mb-[14px] flex h-[21px] items-center justify-between gap-4">
         <h2 className="flex items-center gap-2 text-[16px] font-bold text-white">
          <Pencil className="size-4 text-[#a898ff]" />
          مراجعات AI
        </h2>
        <MoreHorizontal className="size-4 text-[#737b99]" />
       
      </div>
      <div className="space-y-[8px]">
        {reviews.map((review) => (
          <article key={review.title} className="flex h-[74.6px] items-center gap-[12px] rounded-[10px] bg-[#1d2135] px-[12.8px] py-0">
            <span className={cn("w-[28px] shrink-0 text-[12px] font-bold", review.progress === 100 ? "text-emerald-300" : "text-white")}>{review.progress}%</span>
            <div className="min-w-0 flex-1 text-start">
              <h3 className="truncate text-[13px] font-bold text-white">{review.title}</h3>
              <p className="mt-1 text-[11px] text-[#737b99]">{review.description}</p>
              <div className="mt-2 h-[5px] rounded-full bg-[#0d1020]">
                <span className={cn("block h-full rounded-full", progressToneClasses[review.tone].bar)} style={{ width: `${review.progress}%` }} />
              </div>
            </div>
            <span className={cn("grid size-[34px] place-items-center rounded-[10px]", progressToneClasses[review.tone].icon)}>
              <DashboardIcon name={review.icon} className="size-4" />
            </span>
          </article>
        ))}
      </div>
    </article>
  );
}

export function DashboardSection() {
  const { dashboard } = dashboardContent;

  return (
    <>
      <section className="mb-6 flex w-full flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="order-1 flex flex-wrap gap-2 lg:order-2">
          <Button variant="secondary" className="h-9 rounded-[10px] border border-[#252a42] bg-[#15192b] px-4 text-[13px] text-[#c7cce0] hover:bg-[#1d2135] hover:text-white">
            <Download className="size-[13px]" />
            تصدير
          </Button>
          <Button variant="secondary" className="h-9 rounded-[10px] border border-[#252a42] bg-[#15192b] px-4 text-[13px] text-[#c7cce0] hover:bg-[#1d2135] hover:text-white">
            <CalendarDays className="size-[13px]" />
            {dashboard.currentDate}
          </Button>
        </div>

        <div className="order-2 max-w-xl text-start lg:order-1">
          <h1 className="text-2xl font-extrabold tracking-[-0.02em] text-white md:text-[28px]">{dashboard.greeting}</h1>
          <p className="mt-1 text-sm text-[#737b99]">{dashboard.subtitle}</p>
        </div>
      </section>

      <div className="w-full space-y-[16px]">
        <DashboardOverviewCards />
        <DashboardActionsRequired />
        <section className="grid w-full gap-[14px] xl:grid-cols-[minmax(320px,0.72fr)_minmax(541.6px,1.28fr)] xl:items-start">
          <AgreementsPanel />
          <OverviewChart />
        </section>
        <DashboardRecentActivity />
        <section className="grid w-full gap-[14px] xl:grid-cols-[minmax(320px,0.72fr)_minmax(541.6px,1.28fr)] xl:items-start">
          <ReviewsPanel />
          <TransactionsTable />
        </section>
      </div>
    </>
  );
}
