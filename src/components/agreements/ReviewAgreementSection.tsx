import Link from "next/link";
import { AlertTriangle, ArrowRight, Bot, CheckCircle2, Edit3, FileText, LockKeyhole, Plus, Save, Send, ShieldCheck } from "lucide-react";

import { Button } from "@/components/shared";
import { agreementsContent } from "@/constants";
import { cn } from "@/lib/utils";
import type { ReviewAgreementMilestone, ReviewAgreementPolicyCard } from "@/types";

const policyToneClasses: Record<ReviewAgreementPolicyCard["tone"], string> = {
  amber: "bg-amber-500/15 text-amber-300",
  red: "bg-red-500/15 text-red-300",
  violet: "bg-[#6f52ff]/15 text-[#a898ff]",
  blue: "bg-blue-500/15 text-blue-300",
};

const milestoneBadgeClasses: Record<ReviewAgreementMilestone["badgeTone"], string> = {
  emerald: "bg-emerald-500/15 text-emerald-300",
  amber: "bg-amber-500/15 text-amber-300",
};

function ReviewSidebar() {
  const content = agreementsContent.reviewAgreementPage;

  return (
    <aside dir="rtl" className="space-y-3 xl:w-[230px] xl:shrink-0">
      <article className="rounded-[14px] border border-[#252a42] bg-[#15192b] p-5">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="text-[14px] font-extrabold text-white">{content.checklistTitle}</h2>
          <span className="rounded-full bg-amber-500/15 px-3 py-1 text-[11px] font-bold text-amber-300">{content.warningLabel}</span>
        </div>
        <div className="space-y-2">
          {content.checklistItems.map((item) => {
            const isDone = "done" in item && item.done;

            return (
            <div key={item.label} className={cn("flex h-9 items-center justify-between rounded-[9px] border px-3 text-[12px] font-bold", isDone ? "border-emerald-500/25 bg-emerald-500/10 text-white" : "border-amber-500/25 bg-amber-500/10 text-amber-200")}>
              <span>{item.label}</span>
              {isDone ? <CheckCircle2 className="size-4 text-emerald-300" /> : <AlertTriangle className="size-4 text-amber-300" />}
            </div>
            );
          })}
        </div>
      </article>

      <article className="rounded-[14px] border border-[#252a42] bg-[#15192b] p-5">
        <h2 className="mb-4 text-[14px] font-extrabold text-white">{content.financialTitle}</h2>
        <div className="space-y-3">
          {content.financialMetrics.map((metric) => {
            const tone = "tone" in metric ? metric.tone : undefined;

            return (
            <div key={metric.label} className="flex items-center justify-between text-[12px]">
              <strong className={cn("text-white", tone === "emerald" && "text-emerald-300")}>{metric.value}</strong>
              <span className="text-[#737b99]">{metric.label}</span>
            </div>
            );
          })}
        </div>
        <div className="mt-5 space-y-2">
          {content.chartValues.map((value, index) => (
            <div key={`${value}-${index}`} className="flex items-center gap-3" dir="ltr">
              <span className="h-1.5 flex-1 rounded-full bg-[#0d1020]">
                <span className="block h-full rounded-full bg-[#6f52ff]" style={{ width: `${value * 2.2}%` }} />
              </span>
              <span className="w-8 text-[10px] text-[#737b99]">${index === 2 ? 100 : index === 1 ? 200 : 150}</span>
            </div>
          ))}
        </div>
      </article>

      <article className="rounded-[14px] border border-[#6f52ff]/25 bg-[#6f52ff]/10 p-5">
        <h2 className="mb-2 flex items-center gap-2 text-[14px] font-extrabold text-[#a898ff]">
          <Send className="size-4" />
          {content.inviteTitle}
        </h2>
        <p className="text-[12px] leading-6 text-[#a7aecb]">{content.inviteDescription}</p>
        <Button variant="secondary" className="mt-4 h-9 w-full rounded-[9px] border border-[#252a42] bg-[#0f1220] text-[12px] font-bold text-white hover:bg-[#1d2135]">
          {content.reviewAction}
        </Button>
        <span className="mt-3 block text-center text-[11px] text-[#a898ff]">{content.inviteLink}</span>
      </article>

      <div className="rounded-[10px] border border-amber-500/20 bg-amber-500/15 px-4 py-3 text-[12px] leading-6 text-amber-200">
        <AlertTriangle className="me-1 inline size-3.5 text-amber-300" />
        {content.deliveryWarning}
      </div>

      <Button className="h-10 w-full rounded-[10px] bg-[#6f52ff] text-[13px] font-bold text-white shadow-[0_12px_28px_rgba(111,82,255,0.26)] hover:bg-[#7b63ff]">
        <Send className="size-4" />
        {content.sendLabel}
      </Button>
    </aside>
  );
}

function ProjectOverviewCard() {
  const content = agreementsContent.reviewAgreementPage;

  return (
    <section className="rounded-[14px] border border-[#252a42] bg-[#15192b] p-4 md:p-6">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div className="text-start">
          <h2 className="text-[18px] font-extrabold text-white">{content.projectTitle}</h2>
          <p className="mt-2 max-w-2xl text-[13px] leading-7 text-[#a7aecb]">{content.projectDescription}</p>
        </div>
        <span className="grid size-9 shrink-0 place-items-center rounded-[10px] bg-[#6f52ff]/20 text-[#a898ff]">
          <FileText className="size-4" />
        </span>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {content.projectMetrics.map((metric) => {
          const tone = "tone" in metric ? metric.tone : undefined;

          return (
          <article key={metric.label} className="rounded-[10px] bg-[#1d2135] px-4 py-3 text-start">
            <span className="text-[11px] text-[#737b99]">{metric.label}</span>
            <strong className={cn("mt-2 block text-[14px] text-white", tone === "violet" && "text-[#a898ff]")}>{metric.value}</strong>
          </article>
          );
        })}
      </div>
    </section>
  );
}

function MilestoneCard({ milestone }: { milestone: ReviewAgreementMilestone }) {
  return (
    <article className="rounded-[12px] border border-[#252a42] bg-[#1d2135] p-4">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="flex gap-3 text-start">
          <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-[#6f52ff] text-[12px] font-bold text-white">{milestone.number}</span>
          <div>
            <h3 className="text-[14px] font-extrabold leading-6 text-white">{milestone.title}</h3>
            <div className="mt-2 flex flex-wrap gap-2 text-[11px] text-[#737b99]">
              <span>{milestone.amount}</span>
              <span>•</span>
              <span>{milestone.duration}</span>
              <span className={cn("rounded-md px-2 py-0.5 font-bold", milestoneBadgeClasses[milestone.badgeTone])}>{milestone.badge}</span>
            </div>
          </div>
        </div>
        <button className="grid size-7 shrink-0 place-items-center rounded-lg bg-[#252a42] text-[#737b99]" type="button" aria-label="تعديل المرحلة">
          <Edit3 className="size-3.5" />
        </button>
      </div>
      <ul className="space-y-1.5 pe-10 text-[12px] leading-6 text-[#a7aecb]">
        {milestone.tasks.map((task) => (
          <li key={task} className="flex items-center gap-2">
            <CheckCircle2 className="size-3.5 shrink-0 text-emerald-300" />
            {task}
          </li>
        ))}
      </ul>
    </article>
  );
}

function MilestonesSection() {
  const content = agreementsContent.reviewAgreementPage;

  return (
    <section className="rounded-[14px] border border-[#252a42] bg-[#15192b] p-4 md:p-6">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div className="text-start">
          <h2 className="text-[18px] font-extrabold text-white">{content.milestonesTitle}</h2>
          <p className="mt-1 text-[12px] leading-6 text-[#737b99]">{content.milestonesDescription}</p>
        </div>
        <span className="grid size-9 shrink-0 place-items-center rounded-[10px] bg-emerald-500/20 text-emerald-300">
          <ShieldCheck className="size-4" />
        </span>
      </div>
      <div className="space-y-3">
        {content.milestones.map((milestone) => (
          <MilestoneCard key={milestone.number} milestone={milestone} />
        ))}
      </div>
      <button className="mt-4 h-10 w-full rounded-[10px] border border-dashed border-[#252a42] bg-[#12162a] text-[12px] font-bold text-[#737b99] hover:border-[#6f52ff]/50 hover:text-[#a898ff]" type="button">
        <Plus className="me-2 inline size-4" />
        {content.addMilestoneLabel}
      </button>
    </section>
  );
}

function PoliciesSection() {
  const content = agreementsContent.reviewAgreementPage;

  return (
    <section className="rounded-[14px] border border-[#252a42] bg-[#15192b] p-4 md:p-6">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div className="text-start">
          <h2 className="text-[18px] font-extrabold text-white">{content.policiesTitle}</h2>
          <p className="mt-1 text-[12px] leading-6 text-[#737b99]">{content.policiesDescription}</p>
        </div>
        <span className="grid size-9 shrink-0 place-items-center rounded-[10px] bg-amber-500/20 text-amber-300">
          <LockKeyhole className="size-4" />
        </span>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {content.policies.map((policy) => (
          <article key={policy.title} className="rounded-[10px] bg-[#1d2135] p-4 text-start">
            <div className="mb-2 flex items-center justify-between gap-3">
              <h3 className="text-[13px] font-extrabold text-white">{policy.title}</h3>
              <span className={cn("grid size-7 shrink-0 place-items-center rounded-lg", policyToneClasses[policy.tone])}>
                <Edit3 className="size-3.5" />
              </span>
            </div>
            <p className="text-[12px] leading-6 text-[#a7aecb]">{policy.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function AiNotesSection() {
  const content = agreementsContent.reviewAgreementPage;

  return (
    <section className="rounded-[14px] border border-amber-500/25 bg-amber-500/10 p-4 md:p-5">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <h2 className="flex items-center gap-2 text-[15px] font-extrabold text-white">
          <AlertTriangle className="size-4 text-amber-300" />
          {content.aiNotesTitle}
        </h2>
        <Button variant="secondary" className="h-8 rounded-[8px] border border-amber-500/20 bg-amber-500/15 px-3 text-[12px] font-bold text-amber-300 hover:bg-amber-500/20 hover:text-amber-200">
          <Bot className="size-3.5" />
          {content.aiNotesAction}
        </Button>
      </div>
      <div className="space-y-2">
        {content.aiNotes.map((note) => (
          <p key={note.label} className="rounded-[9px] bg-amber-950/20 px-4 py-3 text-[12px] leading-6 text-amber-100/80">{note.label}</p>
        ))}
      </div>
    </section>
  );
}

export function ReviewAgreementSection() {
  const content = agreementsContent.reviewAgreementPage;

  return (
    <>
      <section dir="ltr" className="mx-auto flex max-w-[980px] flex-col gap-4 xl:flex-row xl:items-start">
        <ReviewSidebar />
        <div dir="rtl" className="min-w-0 flex-1 space-y-4">
          <ProjectOverviewCard />
          <MilestonesSection />
          <PoliciesSection />
          <AiNotesSection />
          <div className="flex flex-col gap-3 pb-10 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-sm text-[12px] leading-6 text-[#737b99]">{content.footerNote}</p>
            <div className="flex flex-wrap gap-2">
              <Button asChild variant="secondary" className="h-10 rounded-[10px] border border-[#252a42] bg-[#15192b] px-4 text-[13px] font-bold text-[#c7cce0] hover:bg-[#1d2135] hover:text-white">
                <Link href="/agreements/create">
                  <ArrowRight className="size-4" />
                  {content.footerBackLabel}
                </Link>
              </Button>
              <Button variant="secondary" className="h-10 rounded-[10px] border border-[#252a42] bg-[#15192b] px-4 text-[13px] font-bold text-[#c7cce0] hover:bg-[#1d2135] hover:text-white">
                <Save className="size-4" />
                {content.draftLabel}
              </Button>
              <Button className="h-10 rounded-[10px] bg-[#6f52ff] px-5 text-[13px] font-bold text-white shadow-[0_12px_28px_rgba(111,82,255,0.26)] hover:bg-[#7b63ff]">
                <Send className="size-4" />
                {content.sendLabel}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
