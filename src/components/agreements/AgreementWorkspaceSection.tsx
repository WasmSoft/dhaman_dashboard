import Link from "next/link";
import { ArrowRight, CalendarClock, CheckCircle2, CircleDollarSign, ClipboardList, Copy, ExternalLink, FileText, History, LockKeyhole, Send, ShieldCheck, Sparkles, UserRound } from "lucide-react";

import { Button } from "@/components/shared";
import { agreementsContent } from "@/constants";
import { cn } from "@/lib/utils";
import { AgreementTimelineSection } from "@/components/agreements/AgreementTimelineSection";
import type { AgreementWorkspaceActivityItem, AgreementWorkspaceMetricTone, AgreementWorkspaceMilestone, AgreementWorkspacePaymentTone } from "@/types";

const metricToneClasses: Record<AgreementWorkspaceMetricTone, { icon: string; text: string; ring: string }> = {
  violet: { icon: "bg-[#6f52ff]/20 text-[#a898ff]", text: "text-[#a898ff]", ring: "border-[#6f52ff]/25" },
  emerald: { icon: "bg-emerald-500/15 text-emerald-300", text: "text-emerald-300", ring: "border-emerald-500/20" },
  amber: { icon: "bg-amber-500/15 text-amber-300", text: "text-amber-300", ring: "border-amber-500/20" },
  blue: { icon: "bg-blue-500/15 text-blue-300", text: "text-blue-300", ring: "border-blue-500/20" },
};

const paymentToneClasses: Record<AgreementWorkspacePaymentTone, { card: string; badge: string; value: string }> = {
  reserved: { card: "bg-[#6f52ff]/15", badge: "bg-[#6f52ff]/20 text-[#a898ff]", value: "text-[#a898ff]" },
  review: { card: "bg-amber-500/15", badge: "bg-amber-500/20 text-amber-300", value: "text-amber-300" },
  released: { card: "bg-emerald-500/15", badge: "bg-emerald-500/20 text-emerald-300", value: "text-emerald-300" },
  held: { card: "bg-red-500/15", badge: "bg-red-500/20 text-red-300", value: "text-red-300" },
};

function metricIcon(tone: AgreementWorkspaceMetricTone) {
  if (tone === "blue") return <UserRound className="size-4" />;
  if (tone === "emerald") return <CircleDollarSign className="size-4" />;
  if (tone === "amber") return <CalendarClock className="size-4" />;

  return <ShieldCheck className="size-4" />;
}

function WorkspaceHeader() {
  const content = agreementsContent.agreementWorkspacePage;

  return (
    <section className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
      <div className="order-2 max-w-xl text-start lg:order-1">
        <Button asChild variant="link" className="mb-2 h-auto justify-start p-0 text-[12px] font-bold text-[#8a91ac] hover:text-white">
          <Link href="/agreements">
            <ArrowRight className="size-3.5" />
            {content.backLabel}
          </Link>
        </Button>
        <h1 className="text-2xl font-extrabold tracking-[-0.02em] text-white md:text-[28px]">{content.title}</h1>
        <p className="mt-1 text-sm leading-6 text-[#737b99]">{content.subtitle}</p>
      </div>

      <div className="order-1 flex flex-wrap gap-2 lg:order-2">
        <Button asChild className="h-10 rounded-[10px] bg-[#6f52ff] px-4 text-sm font-bold text-white shadow-[0_12px_28px_rgba(111,82,255,0.26)] hover:bg-[#7b63ff]">
          <Link href="/agreements/delivery">
            <Send className="size-[15px]" />
            {content.submitLabel}
          </Link>
        </Button>
        <Button variant="secondary" className="h-10 rounded-[10px] border border-[#252a42] bg-[#15192b] px-4 text-sm font-bold text-[#c7cce0] hover:bg-[#1d2135] hover:text-white">
          <ExternalLink className="size-[15px]" />
          {content.portalLabel}
        </Button>
        <Button variant="secondary" className="h-10 rounded-[10px] border border-[#252a42] bg-[#15192b] px-4 text-sm font-bold text-[#c7cce0] hover:bg-[#1d2135] hover:text-white">
          <Copy className="size-[15px]" />
          {content.copyInviteLabel}
        </Button>
      </div>
    </section>
  );
}

function AgreementOverviewCard() {
  const content = agreementsContent.agreementWorkspacePage;

  return (
    <section className="rounded-[14px] border border-[#252a42] bg-[radial-gradient(circle_at_top_right,rgba(111,82,255,0.22),transparent_42%),#15192b] p-4 shadow-[0_18px_45px_rgba(4,7,20,0.18)] md:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="text-start">
          <h2 className="text-[18px] font-extrabold text-white md:text-[20px]">{content.projectTitle}</h2>
          <p className="mt-2 text-[13px] leading-6 text-[#a7aecb]">{content.projectDescription}</p>
        </div>
        <span className="inline-flex w-fit items-center gap-2 rounded-md bg-emerald-500/15 px-3 py-1.5 text-[12px] font-bold text-emerald-300">
          <span className="size-1.5 rounded-full bg-emerald-300" />
          {content.statusLabel}
        </span>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {content.summaryMetrics.slice(0, 4).map((metric) => (
          <article key={metric.label} className={cn("rounded-[10px] border bg-[#1d2135] p-4 text-start", metricToneClasses[metric.tone].ring)}>
            <span className={cn("mb-3 grid size-8 place-items-center rounded-[9px]", metricToneClasses[metric.tone].icon)}>{metricIcon(metric.tone)}</span>
            <span className="text-[11px] text-[#737b99]">{metric.label}</span>
            <strong className={cn("mt-2 block text-[14px] font-extrabold text-white", metricToneClasses[metric.tone].text)}>{metric.value}</strong>
          </article>
        ))}
      </div>

      <div className="mt-5 space-y-2">
        <div className="flex items-center justify-between text-[12px]">
          <span className="font-bold text-white">{content.progressValue}</span>
          <span className="text-[#a7aecb]">{content.progressLabel}</span>
        </div>
        <div className="h-1.5 rounded-full bg-[#0d1020]">
          <span className="block h-full w-1/3 rounded-full bg-gradient-to-l from-emerald-400 to-[#6f52ff]" />
        </div>
      </div>
    </section>
  );
}

function MilestoneCard({ milestone }: { milestone: AgreementWorkspaceMilestone }) {
  return (
    <article className={cn("relative rounded-[12px] border border-[#252a42] bg-[#1d2135] p-4 text-start", milestone.active && "border-[#6f52ff]/35 bg-[#201d42]")}> 
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex gap-3">
          <span className={cn("grid size-7 shrink-0 place-items-center rounded-lg text-[12px] font-bold", milestone.active ? "bg-[#6f52ff] text-white" : "bg-[#252a42] text-[#a7aecb]")}>{milestone.number}</span>
          <div>
            <h3 className="text-[14px] font-extrabold leading-6 text-white">{milestone.title}</h3>
            <div className="mt-2 flex flex-wrap gap-2 text-[11px]">
              <span className="font-bold text-emerald-300" dir="ltr">{milestone.amount}</span>
              <span className="text-[#737b99]">{milestone.due}</span>
              <span className={cn("rounded-md px-2 py-0.5 font-bold", milestone.active ? "bg-emerald-500/15 text-emerald-300" : "bg-amber-500/15 text-amber-300")}>{milestone.status}</span>
              <span className="rounded-md bg-[#6f52ff]/15 px-2 py-0.5 font-bold text-[#a898ff]">{milestone.paymentStatus}</span>
            </div>
          </div>
        </div>
        <button className="grid size-7 shrink-0 place-items-center rounded-lg bg-[#101323] text-[#8a91ac] hover:text-white" type="button" aria-label={contentlessAriaLabel(milestone.title)}>
          <ClipboardList className="size-3.5" />
        </button>
      </div>

      {milestone.active ? (
        <div className="mt-4 rounded-[10px] border border-[#252a42] bg-[#15192b] p-4">
          <h4 className="mb-3 text-[12px] font-extrabold text-white">شروط القبول</h4>
          <ul className="space-y-2 text-[12px] leading-6 text-[#a7aecb]">
            {milestone.acceptanceCriteria.map((criteria) => (
              <li key={criteria} className="flex items-center gap-2">
                <CheckCircle2 className="size-3.5 shrink-0 text-emerald-300" />
                {criteria}
              </li>
            ))}
          </ul>
          <p className="mt-4 flex items-center gap-2 text-[12px] text-[#a7aecb]">
            <LockKeyhole className="size-3.5 text-[#a898ff]" />
            {milestone.revisionLimit}
          </p>
          <div className="mt-4 flex flex-wrap justify-end gap-2">
            <Button variant="secondary" className="h-8 rounded-[8px] border border-[#252a42] bg-[#101323] px-3 text-[12px] font-bold text-[#c7cce0] hover:bg-[#262b49] hover:text-white">
              <FileText className="size-3.5" />
              {agreementsContent.agreementWorkspacePage.detailsLabel}
            </Button>
            <Button asChild className="h-8 rounded-[8px] bg-[#6f52ff] px-3 text-[12px] font-bold text-white hover:bg-[#7b63ff]">
              <Link href="/agreements/delivery">
                <Send className="size-3.5" />
                {agreementsContent.agreementWorkspacePage.submitLabel}
              </Link>
            </Button>
          </div>
        </div>
      ) : null}
    </article>
  );
}

function contentlessAriaLabel(title: string) {
  return `عرض تفاصيل ${title}`;
}

function MilestonesSection() {
  const content = agreementsContent.agreementWorkspacePage;

  return (
    <section className="rounded-[14px] border border-[#252a42] bg-[#15192b] p-4 md:p-6">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div className="text-start">
          <h2 className="text-[18px] font-extrabold text-white">{content.milestonesTitle}</h2>
          <p className="mt-1 text-[12px] leading-6 text-[#737b99]">{content.milestonesDescription}</p>
        </div>
        <span className="grid size-9 shrink-0 place-items-center rounded-[10px] bg-[#6f52ff]/20 text-[#a898ff]">
          <Sparkles className="size-4" />
        </span>
      </div>
      <div className="space-y-3">
        {content.milestones.map((milestone) => (
          <MilestoneCard key={milestone.number} milestone={milestone} />
        ))}
      </div>
    </section>
  );
}

function PaymentsSection() {
  const content = agreementsContent.agreementWorkspacePage;

  return (
    <section className="rounded-[14px] border border-[#252a42] bg-[#15192b] p-4 md:p-6">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div className="text-start">
          <h2 className="text-[18px] font-extrabold text-white">{content.paymentsTitle}</h2>
          <p className="mt-1 text-[12px] leading-6 text-[#737b99]">{content.paymentsDescription}</p>
        </div>
        <span className="grid size-9 shrink-0 place-items-center rounded-[10px] bg-emerald-500/15 text-emerald-300">
          <CircleDollarSign className="size-4" />
        </span>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {content.paymentSummary.map((item) => (
          <article key={item.label} className={cn("rounded-[10px] p-4 text-start", paymentToneClasses[item.tone].card)}>
            <strong className={cn("block text-[18px] font-extrabold", paymentToneClasses[item.tone].value)} dir="ltr">{item.value}</strong>
            <span className="mt-2 block text-[11px] text-[#a7aecb]">{item.label}</span>
          </article>
        ))}
      </div>

      {/* AR: جدول الدفعات قابل للتمرير على الجوال ويحافظ على ترتيب الأعمدة العربي. EN: The payment table scrolls on mobile while preserving Arabic column order. */}
      <div className="mt-4 overflow-x-auto rounded-[10px] border border-[#252a42]">
        <table className="w-full min-w-[560px] border-collapse text-start text-[12px]">
          <thead className="bg-[#101323] text-[#737b99]">
            <tr className="h-10">
              {content.paymentTableHeaders.map((header) => (
                <th key={header} className="px-4 font-bold">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {content.paymentRows.map((row) => (
              <tr key={row.milestone} className="h-12 border-t border-[#252a42] text-[#c7cce0]">
                <td className="px-4 font-bold text-white">{row.milestone}</td>
                <td className="px-4 font-bold text-emerald-300" dir="ltr">{row.amount}</td>
                <td className="px-4">
                  <span className={cn("rounded-md px-2 py-1 text-[11px] font-bold", paymentToneClasses[row.tone].badge)}>{row.status}</span>
                </td>
                <td className="px-4 text-[#8a91ac]">{row.operation}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function ActivityIcon({ activity }: { activity: AgreementWorkspaceActivityItem }) {
  return (
    <span className={cn("relative z-10 grid size-8 shrink-0 place-items-center rounded-full", metricToneClasses[activity.tone].icon)}>
      <History className="size-3.5" />
    </span>
  );
}

function ActivitySection() {
  const content = agreementsContent.agreementWorkspacePage;

  return (
    <section className="rounded-[14px] border border-[#252a42] bg-[#15192b] p-4 md:p-6">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div className="text-start">
          <h2 className="text-[18px] font-extrabold text-white">{content.activityTitle}</h2>
          <p className="mt-1 text-[12px] leading-6 text-[#737b99]">{content.activityDescription}</p>
        </div>
        <span className="grid size-9 shrink-0 place-items-center rounded-[10px] bg-blue-500/15 text-blue-300">
          <History className="size-4" />
        </span>
      </div>
      <div className="space-y-0">
        {content.activities.map((activity, index) => (
          <article key={activity.title} className="relative grid grid-cols-[1fr_32px] gap-4 pb-5 last:pb-0">
            {index < content.activities.length - 1 ? <span className="absolute end-4 top-8 h-[calc(100%-2rem)] w-px bg-[#252a42]" /> : null}
            <div className="rounded-[10px] bg-[#101323]/50 px-4 py-3 text-start">
              <h3 className="text-[13px] font-extrabold text-white">{activity.title}</h3>
              <p className="mt-1 text-[12px] leading-6 text-[#a7aecb]">{activity.description}</p>
              <span className="mt-1 block text-[11px] text-[#737b99]">{activity.time}</span>
            </div>
            <ActivityIcon activity={activity} />
          </article>
        ))}
      </div>
    </section>
  );
}

function WorkspaceSidebar() {
  const content = agreementsContent.agreementWorkspacePage;

  return (
    <aside className="space-y-3 xl:w-[230px] xl:shrink-0">
      <article className="rounded-[14px] border border-[#252a42] bg-[#15192b] p-5">
        <h2 className="mb-4 text-[14px] font-extrabold text-white">{content.quickSummaryTitle}</h2>
        <div className="space-y-3">
          {content.quickSummaryItems.map((item) => (
            <div key={item.label} className="flex items-center justify-between gap-3 text-[12px]">
              <strong className={cn("text-white", metricToneClasses[item.tone].text)}>{item.value}</strong>
              <span className="text-[#737b99]">{item.label}</span>
            </div>
          ))}
        </div>
      </article>

      <article className="rounded-[14px] border border-[#252a42] bg-[#15192b] p-5">
        <h2 className="mb-4 text-[14px] font-extrabold text-white">{content.financialSummaryTitle}</h2>
        <div className="space-y-3">
          {content.financialSummaryItems.map((item) => (
            <div key={item.label} className="flex items-center justify-between gap-3 text-[12px]">
              <strong className={paymentToneClasses[item.tone].value} dir="ltr">{item.value}</strong>
              <span className="text-[#737b99]">{item.label}</span>
            </div>
          ))}
        </div>
        <div className="mt-5 h-1.5 rounded-full bg-[#0d1020]">
          <span className="block h-full w-1/3 rounded-full bg-[#6f52ff]" />
        </div>
      </article>

      <article className="rounded-[14px] border border-[#252a42] bg-[#15192b] p-5">
        <h2 className="mb-4 text-[14px] font-extrabold text-[#a898ff]">{content.quickActionsTitle}</h2>
        <div className="space-y-2">
          {content.quickActions.map((action) => {
            const isActive = "active" in action && action.active;

            return (
            <button key={action.label} className={cn("flex h-9 w-full items-center justify-between rounded-[9px] border px-3 text-[12px] font-bold transition", isActive ? "border-[#6f52ff]/45 bg-[#6f52ff]/20 text-white" : "border-[#252a42] bg-[#101323] text-[#8a91ac] hover:text-white")} type="button">
                {action.label}
                <Send className="size-3.5" />
              </button>
            );
          })}
        </div>
      </article>

      <article className="rounded-[14px] border border-[#6f52ff]/25 bg-[#6f52ff]/10 p-5">
        <div className="mb-3 flex items-center justify-between gap-3">
          <h2 className="text-[14px] font-extrabold text-white">{content.clientPortalTitle}</h2>
          <span className="rounded-md bg-emerald-500/15 px-2 py-1 text-[11px] font-bold text-emerald-300">{content.clientPortalStatus}</span>
        </div>
        <p className="text-[12px] leading-6 text-[#a7aecb]">{content.clientPortalDescription}</p>
        <span className="mt-3 block rounded-[8px] bg-[#101323] px-3 py-2 text-center text-[11px] text-[#a898ff]" dir="ltr">{content.clientPortalLink}</span>
        <Button variant="secondary" className="mt-3 h-9 w-full rounded-[9px] border border-[#252a42] bg-[#101323] text-[12px] font-bold text-white hover:bg-[#1d2135]">
          <ExternalLink className="size-3.5" />
          {content.clientPortalAction}
        </Button>
      </article>

      <article className="rounded-[14px] border border-[#6f52ff]/40 bg-gradient-to-l from-[#6f52ff] to-[#8b74ff] p-5 text-white shadow-[0_16px_34px_rgba(111,82,255,0.24)]">
        <h2 className="text-[14px] font-extrabold">{content.nextStepTitle}</h2>
        <p className="mt-3 text-[12px] leading-6 text-white/75">{content.nextStepDescription}</p>
        <Button asChild className="mt-4 h-9 w-full rounded-[9px] bg-white text-[12px] font-extrabold text-[#4c35c7] hover:bg-white/90">
          <Link href="/agreements/delivery">
            <Send className="size-3.5" />
            {content.nextStepAction}
          </Link>
        </Button>
      </article>
    </aside>
  );
}

export function AgreementWorkspaceSection({
  agreementId,
}: {
  agreementId?: string;
}) {
  return (
    <>
      <WorkspaceHeader />
      {/* AR: مساحة العمل تعرض تفاصيل الاتفاق النشط بعمود محتوى وملخص جانبي مطابق لاتجاه RTL. EN: The workspace shows active agreement details with a content column and RTL-aligned side summary. */}
      <section dir="ltr" className="mx-auto flex max-w-[980px] flex-col gap-4 xl:flex-row xl:items-start">
        <WorkspaceSidebar />
        <div dir="rtl" className="min-w-0 flex-1 space-y-4 pb-10">
          <AgreementOverviewCard />
          <MilestonesSection />
          <PaymentsSection />
          <ActivitySection />
          {/* AR: السجل الزمني الحي للاتفاقية — يعرض أحداث الأدلة الفعلية من الخادم.
              EN: Live agreement timeline — displays actual evidence events from the backend. */}
          {agreementId ? (
            <AgreementTimelineSection agreementId={agreementId} />
          ) : null}
        </div>
      </section>
    </>
  );
}
