import {
  ArrowLeft,
  Check,
  CheckCircle2,
  Clock3,
  ExternalLink,
  FileText,
  History,
  Link2,
  MessageSquareText,
  ShieldCheck,
  User,
  WalletCards,
} from "lucide-react";
import type React from "react";

import { Button } from "@/components/shared";
import { clientPortalContent } from "@/constants";
import { cn } from "@/lib/utils";

const heroActionIcons = {
  check: CheckCircle2,
  arrow: ArrowLeft,
  history: History,
} as const;

const heroActionStyles = {
  primary:
    "border-transparent bg-[#22c55e] text-white shadow-[0_10px_24px_rgba(34,197,94,0.26)] hover:bg-[#20b957]",
  secondary:
    "border-white/[0.08] bg-[#242944] text-[#d5d8ee] hover:bg-[#2c3150]",
  ghost:
    "border-white/[0.08] bg-transparent text-[#b6bddb] hover:bg-white/[0.04]",
} as const;

const acceptedDeliveryRowIcons = {
  user: User,
  clock: Clock3,
  link: Link2,
  file: FileText,
} as const;

const recapTone = {
  title: "text-[#46e28b]",
  badge: "border-amber-400/20 bg-amber-400/[0.08] text-[#f2c84b]",
} as const;

function Panel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "rounded-[22px] border border-white/[0.07] bg-[#15192d]",
        className,
      )}
    >
      {children}
    </section>
  );
}

function SectionTitle({
  title,
  trailing,
}: {
  title: string;
  trailing?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-4 text-start">
      <div className="flex items-center gap-2">
        <ShieldCheck className="size-[15px] text-[#8b92b3]" aria-hidden="true" />
        <h2 className="text-[15px] font-extrabold leading-[22.5px] text-white">
          {title}
        </h2>
      </div>
      {trailing}
    </div>
  );
}

function HeroSection() {
  const { hero } = clientPortalContent.releasePayment;

  return (
    <Panel className="relative overflow-hidden bg-[linear-gradient(90deg,#182b10_0%,#122117_28%,#141a2d_100%)] px-6 py-7 sm:px-8 lg:px-10">
      <div
        className="pointer-events-none absolute -top-20 end-[-20px] size-56 rounded-full bg-[radial-gradient(circle,rgba(34,197,94,0.12)_0%,rgba(34,197,94,0.04)_40%,rgba(0,0,0,0)_72%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-24 start-[-30px] size-56 rounded-full bg-[radial-gradient(circle,rgba(251,191,36,0.10)_0%,rgba(251,191,36,0.03)_40%,rgba(0,0,0,0)_72%)]"
        aria-hidden="true"
      />

      <div className="relative z-10 grid gap-6 lg:grid-cols-[220px_minmax(0,1fr)]">
        <div className="order-2 rounded-[18px] border border-emerald-400/15 bg-emerald-400/[0.06] p-5 text-start lg:order-1">
          <p className="text-[11px] text-[#7f86a8]">{hero.amountLabel}</p>
          <p className="mt-3 text-[42px] font-black leading-[51px] text-[#46e28b]">
            {hero.amount}
          </p>
          <p className="mt-1 text-[12px] text-[#7f86a8]">{hero.stageLabel}</p>
          <div className="mt-4 flex items-center gap-2 text-[12px] font-bold text-[#d5d8ee]">
            <span className="inline-flex rounded-full border border-[#3b82f6]/25 bg-[#3b82f6]/12 px-2.5 py-1 text-[#67a8ff]">
              {hero.fromStatus}
            </span>
            <span className="text-[#7f86a8]">→</span>
            <span className="inline-flex rounded-full border border-[#8d63ff]/25 bg-[#8d63ff]/12 px-2.5 py-1 text-[#b58cff]">
              {hero.toStatus}
            </span>
          </div>
        </div>

        <div className="order-1 text-start lg:order-2">
          <p className="text-[11px] text-[#7f86a8]">{hero.eyebrow}</p>
          <h2 className="mt-3 text-[22px] font-black leading-[29px] text-white">
            {hero.title}
          </h2>
          <p className="mt-2 text-[13px] text-[#7f86a8]">{hero.meta}</p>

          <div className="mt-4 flex flex-wrap gap-2">
            {hero.badges.map((badge) => (
              <span
                key={badge.label}
                className={cn(
                  "inline-flex h-[30px] items-center rounded-full border px-3.5 text-[12px] font-bold",
                  badge.className,
                )}
              >
                {badge.label}
              </span>
            ))}
          </div>

          <p className="mt-5 flex items-start gap-2 text-[12px] leading-5 text-[#b8bdd8]">
            <CheckCircle2 className="mt-0.5 size-[11px] shrink-0 text-[#46e28b]" aria-hidden="true" />
            <span>{hero.note}</span>
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            {hero.actions.map((action) => {
              const Icon = heroActionIcons[action.icon];

              return (
                <Button
                  key={action.label}
                  type="button"
                  variant="outline"
                  className={cn(
                    "h-[39.5px] justify-center gap-2 rounded-[12px] px-5 text-[14px] font-bold",
                    action.variant === "primary" && "min-w-[181px]",
                    action.variant === "secondary" && "min-w-[183px]",
                    action.variant === "ghost" && "min-w-[156px]",
                    heroActionStyles[action.variant],
                  )}
                >
                  <Icon className="size-[12px]" aria-hidden="true" />
                  {action.label}
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    </Panel>
  );
}

function AcceptedDeliverySection() {
  const { acceptedDelivery } = clientPortalContent.releasePayment;

  return (
    <Panel className="p-5">
      <SectionTitle
        title={acceptedDelivery.title}
        trailing={
          <span className="rounded-full border border-emerald-400/25 bg-emerald-400/[0.12] px-2.5 py-1 text-[11px] font-bold text-[#4ade80]">
            {acceptedDelivery.statusLabel}
          </span>
        }
      />

      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {acceptedDelivery.rows.map((row) => {
          const Icon = acceptedDeliveryRowIcons[row.icon];

          return (
            <div key={row.label} className="rounded-[12px] border border-white/[0.07] bg-[#101427] px-4 py-3 text-start">
              <div className="flex items-center gap-2 text-[12px] text-[#7f86a8]">
                <Icon className="size-[11px]" aria-hidden="true" />
                <span>{row.label}</span>
              </div>
              <p className="mt-2 text-[15px] font-medium text-[#d5d8ee]">{row.value}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {acceptedDelivery.notes.map((note) => (
          <div key={note.title} className="rounded-[12px] border border-white/[0.07] bg-[#101427] px-4 py-3 text-start">
            <div className="flex items-center gap-2 text-[12px] text-[#7f86a8]">
              <MessageSquareText className="size-[11px]" aria-hidden="true" />
              <span>{note.title}</span>
            </div>
            <p className="mt-2 text-[13px] leading-[21px] text-[#d5d8ee]">{note.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {acceptedDelivery.actions.map((action) => (
          <Button
            key={action}
            type="button"
            variant="outline"
            className="h-[34.1px] rounded-[10px] border-white/[0.08] bg-white/[0.03] px-4 text-[12px] font-bold text-[#b8bdd8] hover:bg-white/[0.05]"
          >
            <ExternalLink className="size-[11px]" aria-hidden="true" />
            {action}
          </Button>
        ))}
      </div>
    </Panel>
  );
}

function ReleaseSummarySection() {
  const { releaseSummary } = clientPortalContent.releasePayment;

  return (
    <Panel className="p-5">
      <SectionTitle title={releaseSummary.title} />

      <div className="mt-4 grid gap-4 lg:grid-cols-[104px_minmax(0,1fr)]">
        <div className="rounded-[16px] border border-emerald-400/15 bg-emerald-400/[0.06] px-5 py-4 text-start">
          <p className="text-[11px] text-[#7f86a8]">قيمة الصرف</p>
          <p className="mt-2 text-[42px] font-black leading-[42px] text-[#46e28b]">
            {releaseSummary.amount}
          </p>
          <p className="mt-2 text-[12px] text-[#7f86a8]">{releaseSummary.currency}</p>
        </div>

        <div className="rounded-[16px] border border-white/[0.07] bg-[#101427] px-4 py-3">
          <dl className="divide-y divide-white/[0.07]">
            {releaseSummary.rows.map((row) => (
              <div key={row.label} className="flex items-center justify-between gap-4 py-3 text-start text-[13px]">
                <dt className="text-[#7f86a8]">{row.label}</dt>
                <dd className="font-medium text-[#d5d8ee]">{row.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="mt-4 rounded-[16px] border border-white/[0.07] bg-[#111528] px-6 py-5">
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <div className="text-center">
            <p className="text-[11px] text-[#7f86a8]">{releaseSummary.transition.fromLabel}</p>
            <span className="mt-2 inline-flex rounded-[12px] border border-[#3b82f6]/25 bg-[#3b82f6]/12 px-5 py-2 text-[18px] font-bold text-[#67a8ff]">
              {releaseSummary.transition.fromStatus}
            </span>
          </div>

          <ArrowLeft className="size-5 text-[#7f86a8]" aria-hidden="true" />

          <div className="text-center">
            <p className="text-[11px] text-[#7f86a8]">{releaseSummary.transition.toLabel}</p>
            <span className="mt-2 inline-flex rounded-[12px] border border-[#8d63ff]/25 bg-[#8d63ff]/12 px-5 py-2 text-[18px] font-bold text-[#b58cff]">
              {releaseSummary.transition.toStatus}
            </span>
          </div>
        </div>
      </div>

      <p className="mt-4 flex items-start gap-2 text-[12px] leading-5 text-[#7f86a8]">
        <Clock3 className="mt-0.5 size-[11px] shrink-0" aria-hidden="true" />
        <span>{releaseSummary.transition.note}</span>
      </p>
    </Panel>
  );
}

function AcceptanceConditionsSection() {
  const { acceptanceConditions } = clientPortalContent.releasePayment;

  return (
    <Panel className="p-5">
      <SectionTitle title={acceptanceConditions.title} />
      <p className="mt-3 text-[13px] leading-[19px] text-[#7f86a8]">
        {acceptanceConditions.description}
      </p>

      <div className="mt-4 space-y-2">
        {acceptanceConditions.items.map((item) => (
          <div key={item} className="flex items-center justify-between gap-3 rounded-[12px] border border-white/[0.07] bg-[#101427] px-4 py-3 text-start">
            <span className="rounded-full bg-emerald-400/[0.12] px-2.5 py-1 text-[11px] font-bold text-[#46e28b]">
              مقبول
            </span>
            <span className="flex-1 text-[13px] text-[#d5d8ee]">{item}</span>
            <CheckCircle2 className="size-[11px] text-[#46e28b]" aria-hidden="true" />
          </div>
        ))}
      </div>

      <p className="mt-4 flex items-start gap-2 text-[12px] leading-5 text-[#7f86a8]">
        <MessageSquareText className="mt-0.5 size-[11px] shrink-0" aria-hidden="true" />
        <span>{acceptanceConditions.note}</span>
      </p>
    </Panel>
  );
}

function ReleaseDecisionSection() {
  const { releaseDecision } = clientPortalContent.releasePayment;

  return (
    <Panel className="p-5">
      <SectionTitle title={releaseDecision.title} />

      <div className="mt-4 rounded-[16px] border border-emerald-400/15 bg-emerald-400/[0.06] px-4 py-4 text-start">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="text-[18px] font-extrabold text-white">{releaseDecision.heading}</h3>
            <p className="mt-1 text-[13px] text-[#b8bdd8]">{releaseDecision.description}</p>
          </div>
          <span className="text-[33px] font-black text-[#46e28b]">{releaseDecision.amount}</span>
        </div>
        <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-[#8d63ff]/25 bg-[#8d63ff]/12 px-3 py-1 text-[12px] font-bold text-[#b58cff]">
          <WalletCards className="size-[11px]" aria-hidden="true" />
          {releaseDecision.outcome}
        </div>
      </div>

      <label className="mt-4 block text-start text-[13px] text-[#d5d8ee]">
        {releaseDecision.noteLabel}
      </label>
      <div className="mt-2 rounded-[12px] border border-white/[0.07] bg-[#101427] px-3 py-3 text-start text-[13px] text-[#7f86a8] min-h-[79px]">
        {releaseDecision.notePlaceholder}
      </div>
      <p className="mt-2 text-start text-[11px] text-[#7f86a8]">{releaseDecision.noteCount}</p>
    </Panel>
  );
}

function ConfirmationChecklistSection() {
  const { confirmationChecklist } = clientPortalContent.releasePayment;

  return (
    <Panel className="p-5">
      <SectionTitle title={confirmationChecklist.title} />

      <div className="mt-4 space-y-3">
        {confirmationChecklist.items.map((item) => (
          <label key={item} className="flex items-center justify-between gap-3 text-start">
            <span className="flex size-5 shrink-0 rounded-[4px] border border-white/[0.12] bg-white/[0.03]" aria-hidden="true" />
            <span className="flex-1 text-[13px] text-[#d5d8ee]">{item}</span>
          </label>
        ))}
      </div>

      <div className="mt-5 rounded-[14px] border border-white/[0.07] bg-[#101427] px-4 py-4 text-start">
        <label className="flex items-start justify-between gap-3">
          <span className="flex size-[22px] shrink-0 rounded-[4px] border border-white/[0.12] bg-white/[0.03]" aria-hidden="true" />
          <span className="flex-1 text-[14px] font-medium text-[#d5d8ee]">
            {confirmationChecklist.finalConfirmation}
          </span>
        </label>
      </div>

      <p className="mt-4 flex items-start gap-2 text-[12px] leading-5 text-[#f2c84b]">
        <Clock3 className="mt-0.5 size-[12px] shrink-0" aria-hidden="true" />
        <span>{confirmationChecklist.warning}</span>
      </p>
    </Panel>
  );
}

function ConfirmReleaseSection() {
  const { confirmRelease } = clientPortalContent.releasePayment;

  return (
    <Panel className="p-5">
      <SectionTitle title={confirmRelease.title} />

      <div className="mt-4 grid gap-px overflow-hidden rounded-[16px] border border-white/[0.07] bg-white/[0.07] md:grid-cols-3">
        {confirmRelease.summary.map((item) => (
          <div key={item.label} className="bg-[#101427] px-4 py-4 text-start">
            <p className="text-[12px] text-[#7f86a8]">{item.label}</p>
            <p className="mt-2 text-[21px] font-bold text-[#d5d8ee]">{item.value}</p>
          </div>
        ))}
      </div>

      <Button
        type="button"
        className="mt-4 h-[49px] w-full rounded-[14px] bg-[#22c55e] text-[18px] font-black text-white shadow-[0_10px_24px_rgba(34,197,94,0.24)] hover:bg-[#20b957]"
      >
        <CheckCircle2 className="size-[15px]" aria-hidden="true" />
        {confirmRelease.primaryAction}
      </Button>

      <div className="mt-3 flex flex-wrap gap-2">
        {confirmRelease.secondaryActions.map((action) => (
          <Button
            key={action}
            type="button"
            variant="outline"
            className="h-[34.1px] rounded-[10px] border-white/[0.08] bg-white/[0.03] px-4 text-[12px] font-bold text-[#b8bdd8] hover:bg-white/[0.05]"
          >
            <ArrowLeft className="size-[11px]" aria-hidden="true" />
            {action}
          </Button>
        ))}
      </div>

      <p className="mt-4 flex items-start gap-2 text-[12px] leading-5 text-[#7f86a8]">
        <CheckCircle2 className="mt-0.5 size-[11px] shrink-0 text-[#46e28b]" aria-hidden="true" />
        <span>{confirmRelease.note}</span>
      </p>
    </Panel>
  );
}

function AfterConfirmationSection() {
  const { afterConfirmation } = clientPortalContent.releasePayment;

  return (
    <Panel className="p-5">
      <SectionTitle title={afterConfirmation.title} />

      <div className="mt-5 space-y-0">
        {afterConfirmation.steps.map((step, index) => (
          <div key={step.title} className="flex gap-4 text-start">
            <div className="flex flex-col items-center">
              <span
                className={cn(
                  "flex size-8 items-center justify-center rounded-full border text-[11px] font-bold",
                  step.state === "now"
                    ? "border-emerald-400/25 bg-emerald-400/[0.12] text-[#46e28b]"
                    : "border-white/[0.08] bg-white/[0.04] text-[#7f86a8]",
                )}
              >
                {step.state === "now" ? <Check className="size-3.5" aria-hidden="true" /> : index + 1}
              </span>
              {index < afterConfirmation.steps.length - 1 ? (
                <span className="mt-2 h-10 w-px bg-white/[0.08]" aria-hidden="true" />
              ) : null}
            </div>

            <div className="pb-4">
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    "rounded-full px-2 py-0.5 text-[11px] font-bold",
                    step.state === "now"
                      ? "bg-emerald-400/[0.12] text-[#46e28b]"
                      : "bg-white/[0.04] text-[#7f86a8]",
                  )}
                >
                  {step.state === "now" ? "سيحدث الآن" : "قادم"}
                </span>
                <h3 className="text-[15px] font-bold text-white">{step.title}</h3>
              </div>
              <p className="mt-1 text-[12px] text-[#b8bdd8]">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </Panel>
  );
}

function FooterNoticeSection() {
  const { footerNotice } = clientPortalContent.releasePayment;

  return (
    <>
      <section className="rounded-[18px] border border-emerald-400/15 bg-emerald-400/[0.06] px-6 py-5 text-start">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="mt-0.5 size-[18px] shrink-0 text-[#46e28b]" aria-hidden="true" />
          <div>
            <h2 className={cn("text-[20px] font-extrabold", recapTone.title)}>
              {footerNotice.title}
            </h2>
            <p className="mt-2 text-[14px] leading-6 text-[#c7cce0]">
              {footerNotice.description}
            </p>
            <p className="mt-2 text-[12px] leading-5 text-[#7f86a8]">
              {footerNotice.disclaimer}
            </p>
          </div>
        </div>
      </section>

      <footer className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 pt-2 text-[11px] text-[#7f86a8]">
        {footerNotice.links.map((link, index) => (
          <span key={link} className="contents">
            <a href="#" className="transition-colors hover:text-[#b8bdd8]">
              {link}
            </a>
            {index < footerNotice.links.length - 1 ? <span>·</span> : null}
          </span>
        ))}
        <span>·</span>
        <span>{footerNotice.copyright}</span>
      </footer>
    </>
  );
}

function RecapSection() {
  const { recap } = clientPortalContent.releasePayment;

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Panel className="p-5">
        <SectionTitle title={recap.releaseSummary.title} />
        <dl className="mt-4 space-y-2 text-start text-[14px] text-[#d5d8ee]">
          {recap.releaseSummary.rows.map((row) => (
            <div key={row.label} className="flex items-center justify-between gap-4">
              <dt className="text-[#7f86a8]">{row.label}</dt>
              <dd>{row.value}</dd>
            </div>
          ))}
        </dl>
      </Panel>

      <Panel className="p-5">
        <SectionTitle title={recap.delivery.title} />
        <dl className="mt-4 space-y-2 text-start text-[14px] text-[#d5d8ee]">
          {recap.delivery.rows.map((row) => (
            <div key={row.label} className="flex items-center justify-between gap-4">
              <dt className="text-[#7f86a8]">{row.label}</dt>
              <dd>{row.value}</dd>
            </div>
          ))}
        </dl>
        <Button
          type="button"
          variant="outline"
          className="mt-4 h-[34.1px] rounded-[10px] border-white/[0.08] bg-white/[0.03] px-4 text-[12px] font-bold text-[#b8bdd8] hover:bg-white/[0.05]"
        >
          <ExternalLink className="size-[11px]" aria-hidden="true" />
          {recap.delivery.action}
        </Button>
      </Panel>

      <Panel className="p-5">
        <SectionTitle title={recap.progress.title} />
        <dl className="mt-4 space-y-2 text-start text-[14px] text-[#d5d8ee]">
          {recap.progress.rows.map((row) => (
            <div key={row.label} className="flex items-center justify-between gap-4">
              <dt className="text-[#7f86a8]">{row.label}</dt>
              <dd>{row.value}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-4 text-[12px] text-[#8d63ff]">{recap.progress.progressLabel}</p>
      </Panel>

      <Panel className="p-5">
        <SectionTitle title={recap.rules.title} />
        <div className="mt-4 space-y-3 text-start text-[14px] text-[#d5d8ee]">
          {recap.rules.items.map((item) => (
            <div key={item} className="flex items-start gap-3">
              <span className="mt-[7px] size-1.5 shrink-0 rounded-full bg-[#3b82f6]" aria-hidden="true" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </Panel>

      <Panel className="p-5 lg:col-span-2">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-[18px] font-extrabold text-[#f2c84b]">{recap.demo.title}</h3>
          <Clock3 className="size-[13px] text-[#f2c84b]" aria-hidden="true" />
        </div>
        <p className="mt-3 text-[14px] leading-6 text-[#d5d8ee]">{recap.demo.description}</p>
        <div className={cn("mt-4 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[12px] font-bold", recapTone.badge)}>
          <Clock3 className="size-[10px]" aria-hidden="true" />
          {recap.demo.badge}
        </div>
      </Panel>
    </div>
  );
}

// AR: صفحة صرف الدفعة توثق قبول التسليم وتحويل الدفعة إلى حالة جاهزة للصرف داخل مسار البوابة.
// EN: The release payment page documents delivery acceptance and moves the payment into a ready-to-release state within the portal flow.
export function ReleasePaymentSection() {
  const { releasePayment } = clientPortalContent;

  return (
    <div dir="rtl" className="min-h-screen bg-[#0d0f1a] text-white">
      <main className="mx-auto w-full max-w-[1040px] px-4 py-8 sm:px-6 lg:px-8">
        <section className="text-center">
          <h1 className="text-[26px] font-black leading-[39px] text-white">
            {releasePayment.title}
          </h1>
          <p className="mt-1.5 text-[13px] leading-[19.5px] text-[#7f86a8]">
            {releasePayment.description}
          </p>
        </section>

        <div className="mt-6 space-y-5">
          <HeroSection />
          <AcceptedDeliverySection />
          <ReleaseSummarySection />
          <AcceptanceConditionsSection />
          <ReleaseDecisionSection />
          <ConfirmationChecklistSection />
          <ConfirmReleaseSection />
          <AfterConfirmationSection />
          <FooterNoticeSection />
          <RecapSection />
        </div>
      </main>
    </div>
  );
}
