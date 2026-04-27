import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, Bot, CalendarDays, CheckCircle2, Circle, ClipboardList, CreditCard, FileText, LockKeyhole, Save, Sparkles, UsersRound } from "lucide-react";

import { Button } from "@/components/shared";
import { Input } from "@/components/shared/input";
import { agreementsContent } from "@/constants";
import { cn } from "@/lib/utils";
import type { CreateAgreementStep } from "@/types";

const stepClasses: Record<CreateAgreementStep["status"], string> = {
  active: "border-[#6f52ff]/35 bg-[#6f52ff]/10 text-white",
  done: "border-emerald-500/25 bg-emerald-500/10 text-white",
  upcoming: "border-[#252a42] bg-[#0f1220] text-[#8a91ac]",
};

function FieldLabel({ children }: { children: ReactNode }) {
  return <label className="mb-2 block text-[12px] font-bold text-[#a7aecb]">{children}</label>;
}

function FormCard({ icon, title, description, children }: { icon: ReactNode; title: string; description: string; children: ReactNode }) {
  return (
    <section className="rounded-[14px] border border-[#252a42] bg-[#15192b] p-4 shadow-[0_18px_45px_rgba(4,7,20,0.18)] md:p-6">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div className="text-start">
          <h2 className="text-[17px] font-extrabold text-white">{title}</h2>
          <p className="mt-1 text-[12px] leading-6 text-[#737b99]">{description}</p>
        </div>
        <span className="grid size-9 shrink-0 place-items-center rounded-[10px] bg-[#6f52ff]/20 text-[#a898ff]">{icon}</span>
      </div>
      {children}
    </section>
  );
}

function CreateAgreementHeader() {
  const content = agreementsContent.createAgreementPage;

  return (
    <header className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
      <Button asChild variant="secondary" className="order-1 h-10 w-fit rounded-[10px] border border-[#252a42] bg-[#15192b] px-4 text-[13px] font-bold text-[#c7cce0] hover:bg-[#1d2135] hover:text-white lg:order-2">
        <Link href="/agreements">
          <ArrowRight className="size-4" />
          {content.backLabel}
        </Link>
      </Button>
      <div className="order-2 text-start lg:order-1">
        <p className="mb-2 text-[12px] text-[#58607c]">{content.eyebrow}</p>
        <h1 className="text-2xl font-extrabold tracking-[-0.02em] text-white md:text-[28px]">{content.title}</h1>
        <p className="mt-1 max-w-xl text-sm leading-6 text-[#737b99]">{content.subtitle}</p>
      </div>
    </header>
  );
}

function ProjectDetailsCard() {
  const section = agreementsContent.createAgreementPage.sections.project;

  return (
    <FormCard icon={<FileText className="size-4" />} title={section.title} description={section.description}>
      {/* AR: حقول المشروع تضبط عرض المدخلات واتجاه النص كما يظهر في Figma. EN: Project fields keep input sizing and text direction aligned with Figma. */}
      <div className="space-y-4">
        <div>
          <FieldLabel>{section.nameLabel}</FieldLabel>
          <Input className="h-11 rounded-[10px] border-[#252a42] bg-[#1d2135] text-right text-[13px] text-white placeholder:text-[#58607c] focus-visible:ring-[#6f52ff]/20" placeholder={section.namePlaceholder} />
        </div>
        <div>
          <FieldLabel>{section.descriptionLabel}</FieldLabel>
          <textarea className="min-h-[118px] w-full resize-none rounded-[10px] border border-[#252a42] bg-[#1d2135] px-3 py-3 text-right text-[13px] leading-6 text-white outline-none placeholder:text-[#58607c] focus:border-[#6f52ff]/60 focus:ring-2 focus:ring-[#6f52ff]/20" placeholder={section.descriptionPlaceholder} />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <FieldLabel>{section.durationLabel}</FieldLabel>
            <Input className="h-11 rounded-[10px] border-[#252a42] bg-[#1d2135] text-right text-[13px] text-white placeholder:text-[#58607c] focus-visible:ring-[#6f52ff]/20" placeholder={section.durationPlaceholder} />
          </div>
          <div>
            <FieldLabel>{section.serviceLabel}</FieldLabel>
            <Input className="h-11 rounded-[10px] border-[#252a42] bg-[#1d2135] text-right text-[13px] text-white placeholder:text-[#58607c] focus-visible:ring-[#6f52ff]/20" placeholder={section.servicePlaceholder} />
          </div>
        </div>
        <div>
          <FieldLabel>{section.deliveryLabel}</FieldLabel>
          <div className="relative">
            <Input className="h-11 rounded-[10px] border-[#252a42] bg-[#1d2135] pe-10 text-right text-[13px] text-white placeholder:text-[#58607c] focus-visible:ring-[#6f52ff]/20" />
            <CalendarDays className="pointer-events-none absolute end-3 top-1/2 size-4 -translate-y-1/2 text-[#58607c]" />
          </div>
        </div>
      </div>
    </FormCard>
  );
}

function ClientDetailsCard() {
  const section = agreementsContent.createAgreementPage.sections.client;

  return (
    <FormCard icon={<UsersRound className="size-4" />} title={section.title} description={section.description}>
      <div className="space-y-4">
        <div>
          <FieldLabel>{section.nameLabel}</FieldLabel>
          <Input className="h-11 rounded-[10px] border-[#252a42] bg-[#1d2135] text-right text-[13px] text-white placeholder:text-[#58607c] focus-visible:ring-[#6f52ff]/20" placeholder={section.namePlaceholder} />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <FieldLabel>{section.emailLabel}</FieldLabel>
            <Input className="h-11 rounded-[10px] border-[#252a42] bg-[#1d2135] text-right text-[13px] text-white placeholder:text-[#58607c] focus-visible:ring-[#6f52ff]/20" placeholder={section.emailPlaceholder} />
          </div>
          <div>
            <FieldLabel>{section.phoneLabel}</FieldLabel>
            <Input className="h-11 rounded-[10px] border-[#252a42] bg-[#1d2135] text-right text-[13px] text-white placeholder:text-[#58607c] focus-visible:ring-[#6f52ff]/20" placeholder={section.phonePlaceholder} />
          </div>
        </div>
      </div>
    </FormCard>
  );
}

function PaymentDetailsCard() {
  const section = agreementsContent.createAgreementPage.sections.payment;

  return (
    <FormCard icon={<CreditCard className="size-4" />} title={section.title} description={section.description}>
      <div className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <FieldLabel>{section.amountLabel}</FieldLabel>
            <Input className="h-11 rounded-[10px] border-[#252a42] bg-[#1d2135] text-right text-[13px] text-white placeholder:text-[#58607c] focus-visible:ring-[#6f52ff]/20" placeholder={section.amountPlaceholder} />
          </div>
          <div>
            <FieldLabel>{section.currencyLabel}</FieldLabel>
            <Input className="h-11 rounded-[10px] border-[#252a42] bg-[#1d2135] text-right text-[13px] text-white focus-visible:ring-[#6f52ff]/20" />
          </div>
        </div>
        <div>
          <FieldLabel>{section.methodsLabel}</FieldLabel>
          <div className="grid gap-2 sm:grid-cols-3">
            {section.methods.map((method) => (
              <button key={method.label} className={cn("h-10 rounded-[10px] border border-[#252a42] bg-[#1d2135] px-3 text-[12px] font-bold text-[#a7aecb] transition hover:border-[#6f52ff]/50", "active" in method && method.active && "border-[#6f52ff] bg-[#6f52ff]/10 text-[#a898ff]")} type="button">
                {method.label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <FieldLabel>{section.milestonesLabel}</FieldLabel>
          <div className="flex flex-wrap gap-2">
            {section.milestones.map((milestone, index) => (
              <button key={milestone} className={cn("h-9 min-w-10 rounded-[9px] border border-[#252a42] bg-[#1d2135] px-3 text-[12px] font-bold text-[#8a91ac]", index === 0 && "border-[#6f52ff] bg-[#6f52ff]/10 text-[#a898ff]")} type="button">
                {milestone}
              </button>
            ))}
          </div>
        </div>
      </div>
    </FormCard>
  );
}

function PoliciesCard() {
  const section = agreementsContent.createAgreementPage.sections.policies;

  return (
    <FormCard icon={<LockKeyhole className="size-4" />} title={section.title} description={section.description}>
      <div className="flex flex-wrap gap-2">
        {section.options.map((option) => (
          <button key={option.label} className={cn("h-9 rounded-full border border-[#252a42] bg-[#1d2135] px-4 text-[12px] font-bold text-[#8a91ac] transition hover:border-[#6f52ff]/50", "active" in option && option.active && "border-[#6f52ff] bg-[#6f52ff]/10 text-[#a898ff]")} type="button">
            {option.label}
          </button>
        ))}
      </div>
      <p className="mt-4 rounded-[10px] bg-[#1d2135] px-4 py-3 text-[12px] leading-6 text-[#737b99]">{section.note}</p>
    </FormCard>
  );
}

function CreateAgreementSidebar() {
  const content = agreementsContent.createAgreementPage;

  return (
    <aside dir="rtl" className="space-y-4 xl:w-[230px] xl:shrink-0">
      <article className="rounded-[14px] border border-[#252a42] bg-[#15192b] p-5">
        <div className="mb-4 flex items-center justify-between text-[12px] font-bold">
          <span className="text-[#a898ff]">{content.progressValue}</span>
          <span className="text-white">{content.progressTitle}</span>
        </div>
        <div className="mb-4 h-[5px] rounded-full bg-[#0d1020]">
          <span className="block h-full w-1/2 rounded-full bg-[#6f52ff]" />
        </div>
        <div className="space-y-2">
          {content.steps.map((step) => (
            <div key={step.label} className={cn("flex h-9 items-center justify-between rounded-[9px] border px-3 text-[12px] font-bold", stepClasses[step.status])}>
              <span>{step.label}</span>
              {step.status === "done" ? <CheckCircle2 className="size-4 text-emerald-300" /> : <Circle className="size-4 text-[#58607c]" />}
            </div>
          ))}
        </div>
      </article>

      <article className="rounded-[14px] border border-[#252a42] bg-[#15192b] p-5">
        <h2 className="mb-4 text-[14px] font-extrabold text-white">{content.helpTitle}</h2>
        <ul className="space-y-2 text-[12px] text-[#a7aecb]">
          {content.helpItems.map((item) => (
            <li key={item.label} className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-[#6f52ff]" />
              {item.label}
            </li>
          ))}
        </ul>
      </article>

      <article className="rounded-[14px] border border-[#252a42] bg-[#0f1220] p-5">
        <h2 className="mb-4 flex items-center gap-2 text-[14px] font-extrabold text-white">
          <ClipboardList className="size-4 text-[#737b99]" />
          {content.summaryTitle}
        </h2>
        <div className="space-y-3">
          {content.summaryItems.map((item) => (
            <div key={item.label} className="flex items-center justify-between text-[12px]">
              <strong className="text-white">{item.value}</strong>
              <span className="text-[#737b99]">{item.label}</span>
            </div>
          ))}
        </div>
        <Button className="mt-5 h-10 w-full rounded-[10px] bg-[#6f52ff] text-[13px] font-bold text-white shadow-[0_12px_28px_rgba(111,82,255,0.26)] hover:bg-[#7b63ff]">
          <Sparkles className="size-4" />
          {content.aiButtonLabel}
        </Button>
      </article>
    </aside>
  );
}

export function CreateAgreementSection() {
  const content = agreementsContent.createAgreementPage;

  return (
    <>
      <CreateAgreementHeader />
      <section dir="ltr" className="flex flex-col gap-4 xl:flex-row xl:items-start">
        <CreateAgreementSidebar />
        <div dir="rtl" className="min-w-0 flex-1 space-y-4">
          <ProjectDetailsCard />
          <ClientDetailsCard />
          <PaymentDetailsCard />
          <PoliciesCard />
          <div className="flex flex-col gap-3 pb-10 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-sm text-[12px] leading-6 text-[#737b99]">{content.footerNote}</p>
            <div className="flex flex-wrap gap-2">
              <Button variant="secondary" className="h-10 rounded-[10px] border border-[#252a42] bg-[#15192b] px-4 text-[13px] font-bold text-[#c7cce0] hover:bg-[#1d2135] hover:text-white">
                <Save className="size-4" />
                {content.saveDraftLabel}
              </Button>
              <Button asChild className="h-10 rounded-[10px] bg-[#6f52ff] px-5 text-[13px] font-bold text-white shadow-[0_12px_28px_rgba(111,82,255,0.26)] hover:bg-[#7b63ff]">
                <Link href="/agreements/review">
                  <Bot className="size-4" />
                  {content.generateLabel}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
