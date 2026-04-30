import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowLeft, ArrowRight, CalendarClock, Check, CheckCircle2, CircleHelp, ClipboardCheck, FileText, Link2, LockKeyhole, MessageSquareText, Save, Send, Upload, X } from "lucide-react";

import { Button } from "@/components/shared";
import { Input } from "@/components/shared/input";
import { TimelineEvidencePanel } from "@/components/timeline-events";
import { agreementsContent } from "@/constants";
import { cn } from "@/lib/utils";

function DeliveryHeader() {
  const content = agreementsContent.agreementDeliveryPage;

  return (
    <section className="mb-5 max-w-[904px] text-start">
      <Button asChild variant="link" className="mb-2 h-auto justify-start p-0 text-[12px] font-bold text-[#8a91ac] hover:text-white">
        <Link href="/agreements/workspace">
          <ArrowRight className="size-3.5" />
          {content.backLabel}
        </Link>
      </Button>
      <h1 className="text-2xl font-extrabold tracking-[-0.02em] text-white md:text-[28px]">{content.title}</h1>
      <p className="mt-1 text-sm leading-6 text-[#737b99]">{content.subtitle}</p>
    </section>
  );
}

function DeliveryInfoStrip() {
  const content = agreementsContent.agreementDeliveryPage;

  return (
    <section className="mb-5 rounded-[14px] border border-[#252a42] bg-[#15192b] p-4 md:p-5">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-[1.45fr_0.75fr_1.55fr_0.55fr_0.7fr] lg:divide-x lg:divide-x-reverse lg:divide-[#252a42]">
        {content.infoItems.map((item) => (
          <div key={item.label} className="text-start lg:px-4 lg:first:pe-0 lg:last:ps-0">
            <span className="block text-[11px] font-bold text-[#58607c]">{item.label}</span>
            <strong className="mt-1 flex items-center gap-1.5 text-[13px] font-extrabold leading-6 text-white">
              {item.value}
              {"icon" in item && item.icon === "calendar" ? <CalendarClock className="size-3.5 text-[#a898ff]" /> : null}
            </strong>
          </div>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap justify-start gap-2 lg:justify-end">
        {content.statusChips.map((chip, index) => (
          <span key={chip} className={cn("rounded-md px-2.5 py-1 text-[11px] font-bold", index === 0 && "bg-emerald-500/15 text-emerald-300", index === 1 && "bg-[#6f52ff]/20 text-[#a898ff]", index === 2 && "bg-amber-500/20 text-amber-300")}>{chip}</span>
        ))}
      </div>
    </section>
  );
}

function SectionCard({ children, icon, title }: { children: ReactNode; icon: ReactNode; title: string }) {
  return (
    <section className="rounded-[14px] border border-[#252a42] bg-[#15192b] p-4 shadow-[0_18px_45px_rgba(4,7,20,0.14)] md:p-6">
      <div className="mb-4 flex items-center justify-between gap-4">
        <h2 className="text-[16px] font-extrabold text-white">{title}</h2>
        <span className="grid size-9 shrink-0 place-items-center rounded-[10px] bg-[#6f52ff]/20 text-[#a898ff]">{icon}</span>
      </div>
      {children}
    </section>
  );
}

function DeliveryLinkCard() {
  const content = agreementsContent.agreementDeliveryPage;

  return (
    <SectionCard title={content.linkTitle} icon={<Link2 className="size-4" />}>
      <div className="mb-4 flex flex-wrap justify-start gap-2 lg:justify-end">
        {content.linkTypes.map((type) => {
          const isActive = "active" in type && type.active;

          return (
            <button key={type.label} className={cn("inline-flex h-7 items-center gap-1.5 rounded-full border px-3 text-[11px] font-bold transition", isActive ? "border-[#6f52ff]/50 bg-[#6f52ff]/25 text-[#cfc6ff]" : "border-[#252a42] bg-[#101323] text-[#737b99] hover:text-white")} type="button">
              <Link2 className="size-3" />
              {type.label}
            </button>
          );
        })}
      </div>
      <label className="block text-start text-[12px] font-bold text-[#c7cce0]" htmlFor="delivery-link">{content.linkLabel}</label>
      <Input id="delivery-link" dir="ltr" defaultValue={content.linkPlaceholder} className="mt-2 h-[41px] rounded-[10px] border-[#252a42] bg-[#1d2135] px-4 text-start text-[13px] text-[#c7cce0] focus-visible:ring-[#6f52ff]/25" />
      <p className="mt-2 text-start text-[12px] leading-6 text-[#737b99]">{content.linkHelp}</p>
    </SectionCard>
  );
}

function AttachmentCard() {
  const content = agreementsContent.agreementDeliveryPage;

  return (
    <SectionCard title={content.attachmentTitle} icon={<Upload className="size-4" />}>
      <div className="flex items-center gap-3 rounded-[10px] border border-[#252a42] bg-[#1d2135] p-3">
        <button className="grid size-7 shrink-0 place-items-center rounded-md bg-red-500/15 text-red-300" type="button" aria-label="حذف الملف">
          <X className="size-3.5" />
        </button>
        <div className="min-w-0 flex-1 text-start">
          <strong className="block truncate text-[12px] font-extrabold text-white">{content.attachmentFileName}</strong>
          <span className="mt-2 inline-flex w-full items-center justify-end rounded-full bg-emerald-500/15 px-2 py-1 text-[11px] font-bold text-emerald-300">
            <span className="me-1 size-1.5 rounded-full bg-emerald-300" />
            {content.attachmentStatus}
          </span>
        </div>
        <span className="grid size-9 shrink-0 place-items-center rounded-[10px] bg-[#6f52ff]/20 text-[#a898ff]">
          <FileText className="size-4" />
        </span>
      </div>
    </SectionCard>
  );
}

function TextareaField({ help, label, placeholder }: { help: string; label: string; placeholder: string }) {
  return (
    <div>
      <label className="block text-start text-[12px] font-bold text-[#c7cce0]">{label}</label>
      <textarea className="mt-2 min-h-[104px] w-full resize-none rounded-[10px] border border-[#252a42] bg-[#1d2135] px-4 py-3 text-start text-[13px] leading-6 text-white outline-none transition placeholder:text-[#636b8a] focus:border-[#6f52ff]/50 focus:ring-2 focus:ring-[#6f52ff]/20" placeholder={placeholder} />
      <p className="mt-2 text-start text-[12px] leading-6 text-[#737b99]">{help}</p>
    </div>
  );
}

function DescriptionCard() {
  const content = agreementsContent.agreementDeliveryPage;

  return (
    <SectionCard title={content.summaryTitle} icon={<FileText className="size-4" />}>
      <TextareaField label={content.summaryLabel} placeholder={content.summaryPlaceholder} help={content.summaryHelp} />
    </SectionCard>
  );
}

function NotesCard() {
  const content = agreementsContent.agreementDeliveryPage;

  return (
    <SectionCard title={content.notesTitle} icon={<MessageSquareText className="size-4" />}>
      <p className="-mt-3 mb-4 text-start text-[12px] text-[#737b99]">{content.notesOptional}</p>
      <TextareaField label={content.notesLabel} placeholder={content.notesPlaceholder} help={content.notesHelp} />
    </SectionCard>
  );
}

function ConfirmationCard() {
  const content = agreementsContent.agreementDeliveryPage;

  return (
    <SectionCard title={content.confirmationTitle} icon={<LockKeyhole className="size-4" />}>
      <label className="flex items-start gap-3 rounded-[10px] text-start text-[12px] leading-6 text-[#c7cce0]">
        <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-md border border-[#6f52ff] bg-[#6f52ff]/20 text-[#a898ff]">
          <Check className="size-3" />
        </span>
        {content.confirmationLabel}
      </label>
      <div className="mt-4 flex items-center gap-2 rounded-[9px] bg-[#101323] px-4 py-3 text-start text-[11px] leading-5 text-[#737b99]">
        <CircleHelp className="size-3.5 shrink-0 text-[#8a91ac]" />
        {content.confirmationWarning}
      </div>
    </SectionCard>
  );
}

function DeliveryFooter() {
  const content = agreementsContent.agreementDeliveryPage;

  return (
    <section className="rounded-[14px] border border-[#252a42] bg-[#15192b] p-4 md:px-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <p className="max-w-[160px] text-start text-[12px] leading-6 text-[#737b99]">{content.footerNote}</p>
        <div className="flex flex-wrap justify-start gap-2 lg:justify-end">
          <Button variant="secondary" className="h-10 rounded-[10px] border border-[#252a42] bg-[#101323] px-4 text-[13px] font-bold text-[#c7cce0] hover:bg-[#1d2135] hover:text-white">
            <X className="size-4" />
            {content.cancelLabel}
          </Button>
          <Button variant="secondary" className="h-10 rounded-[10px] border border-[#252a42] bg-[#101323] px-4 text-[13px] font-bold text-[#c7cce0] hover:bg-[#1d2135] hover:text-white">
            <Save className="size-4" />
            {content.draftLabel}
          </Button>
          <Button className="h-10 rounded-[10px] bg-[#6f52ff] px-5 text-[13px] font-bold text-white shadow-[0_12px_28px_rgba(111,82,255,0.26)] hover:bg-[#7b63ff]">
            <Send className="size-4" />
            {content.sendLabel}
          </Button>
        </div>
      </div>
    </section>
  );
}

function RequirementsCard() {
  const content = agreementsContent.agreementDeliveryPage;

  return (
    <article className="rounded-[14px] border border-[#252a42] bg-[#15192b] p-5 text-start">
      <h2 className="mb-5 flex items-center gap-2 text-[14px] font-extrabold text-white">
        <span className="grid size-7 place-items-center rounded-lg bg-[#6f52ff]/25 text-[#a898ff]"><Check className="size-3.5" /></span>
        {content.requirementsTitle}
      </h2>
      <ul className="space-y-3 text-[12px] leading-6 text-[#c7cce0]">
        {content.requirements.map((item) => (
          <li key={item.label} className="flex items-center gap-2">
            <CheckCircle2 className="size-3.5 shrink-0 text-emerald-300" />
            {item.label}
          </li>
        ))}
      </ul>
      <p className="mt-5 rounded-[10px] bg-[#1d2135] px-4 py-3 text-[12px] leading-6 text-[#8a91ac]">{content.requirementsNote}</p>
    </article>
  );
}

function ChecklistCard() {
  const content = agreementsContent.agreementDeliveryPage;

  return (
    <article className="rounded-[14px] border border-[#252a42] bg-[#15192b] p-5 text-start">
      <h2 className="mb-5 flex items-center gap-2 text-[14px] font-extrabold text-[#a898ff]">
        <ClipboardCheck className="size-4" />
        {content.checklistTitle}
      </h2>
      <ul className="space-y-3 text-[12px] leading-6">
        {content.checklist.map((item) => {
          const isDone = "done" in item && item.done;

          return (
            <li key={item.label} className={cn("flex items-center gap-2", isDone ? "text-white" : "text-[#737b99]")}> 
              <span className={cn("grid size-4 shrink-0 place-items-center rounded-full border", isDone ? "border-emerald-400 bg-emerald-500/15 text-emerald-300" : "border-[#323858] text-[#58607c]")}>{isDone ? <Check className="size-2.5" /> : null}</span>
              {item.label}
            </li>
          );
        })}
      </ul>
    </article>
  );
}

function AfterSubmitCard() {
  const content = agreementsContent.agreementDeliveryPage;

  return (
    <article className="rounded-[14px] border border-[#252a42] bg-[#15192b] p-5 text-start">
      <h2 className="mb-5 flex items-center gap-2 text-[14px] font-extrabold text-white">
        <ArrowLeft className="size-4 text-[#a898ff]" />
        {content.afterSubmitTitle}
      </h2>
      <ol className="space-y-4 text-[12px] leading-6 text-[#c7cce0]">
        {content.afterSubmitItems.map((item) => (
          <li key={item.number} className="flex items-start gap-3">
            <span className="grid size-5 shrink-0 place-items-center rounded-full bg-[#6f52ff]/25 text-[11px] font-bold text-[#cfc6ff]">{item.number}</span>
            {item.label}
          </li>
        ))}
      </ol>
    </article>
  );
}

function PaymentStatusCard() {
  const { paymentStatus } = agreementsContent.agreementDeliveryPage;
  const content = agreementsContent.agreementDeliveryPage;

  return (
    <article className="rounded-[14px] border border-[#252a42] bg-[#15192b] p-5 text-start">
      <h2 className="mb-5 flex items-center gap-2 text-[14px] font-extrabold text-[#a898ff]">
        <LockKeyhole className="size-4" />
        {content.paymentStatusTitle}
      </h2>
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 rounded-[10px] bg-[#1d2135] p-3 text-center">
        <div>
          <span className="block text-[11px] text-[#737b99]">{paymentStatus.beforeLabel}</span>
          <strong className="mt-2 inline-flex rounded-md bg-amber-500/20 px-3 py-1 text-[12px] text-amber-300">{paymentStatus.beforeValue}</strong>
        </div>
        <ArrowLeft className="size-4 text-[#8a91ac]" />
        <div>
          <span className="block text-[11px] text-[#737b99]">{paymentStatus.afterLabel}</span>
          <strong className="mt-2 inline-flex rounded-md bg-blue-500/20 px-3 py-1 text-[12px] text-blue-300">{paymentStatus.afterValue}</strong>
        </div>
      </div>
      <strong className="mt-5 block text-center text-[20px] font-extrabold text-emerald-300" dir="ltr">{paymentStatus.amount}</strong>
      <p className="mt-2 text-[12px] leading-6 text-[#737b99]">{paymentStatus.note}</p>
    </article>
  );
}

function DeliverySidebar() {
  return (
    <aside className="space-y-3 xl:w-[264px] xl:shrink-0">
      <RequirementsCard />
      <ChecklistCard />
      <AfterSubmitCard />
      <PaymentStatusCard />
    </aside>
  );
}

export function AgreementDeliverySection({
  agreementId,
}: {
  agreementId?: string;
}) {
  return (
    <>
      <DeliveryHeader />
      <DeliveryInfoStrip />
      {/* AR: نموذج التسليم يحافظ على العمود الجانبي يساراً والمحتوى الرئيسي يميناً كما في Figma داخل RTL. EN: The delivery form preserves the left sidebar and right main content from Figma in RTL. */}
      <section dir="ltr" className="mx-auto flex max-w-[904px] flex-col gap-4 xl:flex-row xl:items-start">
        <DeliverySidebar />
        <div dir="rtl" className="min-w-0 flex-1 space-y-4 pb-10">
          <DeliveryLinkCard />
          <AttachmentCard />
          <DescriptionCard />
          <NotesCard />
          <ConfirmationCard />
          <DeliveryFooter />
          {/* AR: أدلة السجل الزمني المرتبطة بالتسليم.
              EN: Timeline evidence related to the delivery. */}
          {agreementId ? (
            <TimelineEvidencePanel
              agreementId={agreementId}
              eventTypes={["DELIVERY_SUBMITTED", "DELIVERY_ACCEPTED", "DELIVERY_CHANGES_REQUESTED"]}
              maxItems={3}
            />
          ) : null}
        </div>
      </section>
    </>
  );
}
