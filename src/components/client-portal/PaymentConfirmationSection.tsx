import {
  ArrowLeft,
  Check,
  CheckCheck,
  CheckCircle2,
  CircleAlert,
  Copy,
  CreditCard,
  Download,
  ExternalLink,
  ReceiptText,
  Share2,
  ShieldCheck,
  Sparkles,
  WalletCards,
} from "lucide-react";
import type React from "react";

import { Button } from "@/components/shared";
import { clientPortalContent } from "@/constants";
import { cn } from "@/lib/utils";
import type {
  PortalPaymentConfirmationAction,
  PortalPaymentConfirmationActionCard,
  PortalPaymentConfirmationContent,
} from "@/types";

const heroActionIcons = {
  receipt: ReceiptText,
  copy: Copy,
  arrow: ArrowLeft,
} as const;

const heroActionClassNames: Record<
  PortalPaymentConfirmationAction["variant"],
  string
> = {
  primary:
    "border-transparent bg-gradient-to-br from-[#6d5dfc] to-[#7c6cff] text-white shadow-[0_4px_14px_rgba(109,93,252,0.35)] hover:opacity-95",
  secondary:
    "border-white/[0.12] bg-[#1a1d2e] text-[#b8bdd8] hover:bg-[#20243a] hover:text-white",
  ghost:
    "border-white/[0.07] bg-transparent text-[#7f86a8] hover:bg-white/[0.04] hover:text-[#b8bdd8]",
};

const actionCardIcons: Record<
  PortalPaymentConfirmationActionCard["icon"],
  React.ElementType
> = {
  download: Download,
  copy: Copy,
  share: Share2,
  arrow: ExternalLink,
};

const valueToneClassNames = {
  default: "text-[#f1f3fc]",
  muted: "text-[#b8bdd8]",
  green: "text-[#4ade80]",
  purple: "text-[#a78bfa]",
} as const;

const previewToneClassNames = {
  green: "border-emerald-400/20 bg-emerald-400/[0.08] text-[#4ade80]",
  blue: "border-[#2f80ed]/20 bg-[#2f80ed]/[0.08] text-[#60a5fa]",
  purple: "border-[#6d5dfc]/20 bg-[#6d5dfc]/[0.08] text-[#a78bfa]",
  default: "border-white/[0.08] bg-white/[0.04] text-[#b8bdd8]",
} as const;

const nextStepStateClassNames = {
  completed: {
    badge: "bg-emerald-400/12 text-[#4ade80]",
    marker: "border-emerald-400/25 bg-emerald-400/[0.14] text-[#4ade80]",
  },
  current: {
    badge: "bg-[#6d5dfc]/15 text-[#a78bfa]",
    marker: "border-[#6d5dfc]/25 bg-[#6d5dfc]/[0.14] text-[#a78bfa]",
  },
  upcoming: {
    badge: "bg-white/[0.05] text-[#7f86a8]",
    marker: "border-white/[0.08] bg-white/[0.04] text-[#b8bdd8]",
  },
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
        "rounded-2xl border border-white/[0.07] bg-[#131627] p-5 sm:p-6",
        className,
      )}
    >
      {children}
    </section>
  );
}

function SectionTitle({
  icon: Icon,
  title,
  trailing,
}: {
  icon: React.ElementType;
  title: string;
  trailing?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-4 text-start">
      <div className="flex items-center gap-2.5">
        <span className="flex size-8 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.04] text-[#4ade80]">
          <Icon className="size-4" aria-hidden="true" />
        </span>
        <h2 className="text-[15px] font-extrabold leading-[22.5px] text-white">
          {title}
        </h2>
      </div>
      {trailing}
    </div>
  );
}

function DetailRows({
  rows,
}: {
  rows: Array<{
    label: string;
    value: string;
    tone?: "default" | "muted" | "green" | "purple";
  }>;
}) {
  return (
    <dl className="divide-y divide-white/[0.07]">
      {rows.map((row) => (
        <div
          key={row.label}
          className="flex items-center justify-between gap-4 py-3 text-xs leading-[18px]"
        >
          <dt className="text-[#7f86a8]">{row.label}</dt>
          <dd
            className={cn(
              "font-bold",
              valueToneClassNames[row.tone ?? "default"],
            )}
          >
            {row.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

function ReceiptSummary({
  receipt,
}: {
  receipt: PortalPaymentConfirmationContent["receipt"];
}) {
  return (
    <Panel>
      <SectionTitle
        icon={ReceiptText}
        title={receipt.title}
        trailing={
          <span className="text-[11px] font-bold text-[#7f86a8]">
            {receipt.receiptId}
          </span>
        }
      />

      <div className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(260px,320px)]">
        <div className="rounded-xl border border-white/[0.07] bg-[#0f1222]/80 p-4">
          <DetailRows rows={receipt.rows} />
        </div>

        <div className="space-y-4">
          <div className="rounded-xl border border-white/[0.07] bg-[#0f1222]/80 p-4">
            <DetailRows rows={receipt.totals} />
          </div>

          <div className="flex flex-wrap gap-2">
            {receipt.badges.map((badge) => (
              <span
                key={badge}
                className="inline-flex items-center rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1 text-[11px] font-bold text-[#b8bdd8]"
              >
                {badge}
              </span>
            ))}
          </div>

          <p className="flex items-start gap-2 rounded-xl border border-amber-400/15 bg-amber-400/[0.06] p-3 text-[11px] leading-[16.5px] text-[#b8bdd8]">
            <CircleAlert
              className="mt-0.5 size-3 shrink-0 text-[#fbbf24]"
              aria-hidden="true"
            />
            <span>{receipt.note}</span>
          </p>
        </div>
      </div>
    </Panel>
  );
}

function FundedMilestoneDetails({
  milestone,
}: {
  milestone: PortalPaymentConfirmationContent["fundedMilestone"];
}) {
  return (
    <Panel>
      <SectionTitle icon={ShieldCheck} title={milestone.title} />

      <div className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1fr)_112px] lg:items-start">
        <div className="order-2 text-start lg:order-1">
          <h3 className="text-[18px] font-black leading-[27px] text-white">
            {milestone.heading}
          </h3>
          <p className="mt-1.5 text-xs leading-[18px] text-[#7f86a8]">
            {milestone.project}
          </p>

          <div className="mt-4 rounded-xl border border-white/[0.07] bg-[#0f1222]/80 p-4">
            <DetailRows rows={milestone.rows} />
          </div>

          <div className="mt-4 rounded-xl border border-white/[0.07] bg-[#0f1222]/80 p-4">
            <p className="text-[11px] font-bold leading-[16.5px] text-[#b8bdd8]">
              شروط القبول
            </p>
            <div className="mt-3 grid gap-2 sm:grid-cols-3">
              {milestone.acceptanceCriteria.map((criterion, index) => (
                <div
                  key={criterion}
                  className="flex items-start gap-2 rounded-lg border border-white/[0.07] bg-white/[0.03] p-3 text-[11px] leading-[16.5px] text-[#b8bdd8]"
                >
                  <span className="inline-flex size-5 shrink-0 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.05] text-[10px] font-bold text-[#f1f3fc]">
                    {index + 1}
                  </span>
                  <span>{criterion}</span>
                </div>
              ))}
            </div>
          </div>

          <p className="mt-4 flex items-start gap-2 rounded-xl border border-emerald-400/15 bg-emerald-400/[0.06] p-3 text-[11px] leading-[16.5px] text-[#b8bdd8]">
            <CheckCircle2
              className="mt-0.5 size-3 shrink-0 text-[#4ade80]"
              aria-hidden="true"
            />
            <span>{milestone.note}</span>
          </p>
        </div>

        <div className="order-1 mx-auto w-full max-w-[112px] rounded-2xl border border-emerald-400/20 bg-emerald-400/[0.08] px-4 py-5 text-center lg:order-2">
          <p className="text-[30px] font-black leading-[45px] text-[#4ade80]">
            {milestone.amount}
          </p>
          <p className="text-[10px] leading-[15px] text-[#7f86a8]">محجوز</p>
        </div>
      </div>
    </Panel>
  );
}

function ProtectionStatus({
  protection,
}: {
  protection: PortalPaymentConfirmationContent["protection"];
}) {
  return (
    <Panel>
      <SectionTitle icon={WalletCards} title={protection.title} />

      <div className="mt-5 rounded-xl border border-white/[0.07] bg-[#0f1222]/80 p-5">
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <div className="text-center">
            <p className="text-[11px] font-bold text-[#7f86a8]">
              {protection.beforeLabel}
            </p>
            <div className="mt-2 rounded-xl border border-white/[0.08] bg-white/[0.04] px-5 py-3 text-sm font-bold text-[#b8bdd8]">
              {protection.beforeStatus}
            </div>
          </div>

          <ArrowLeft className="size-5 text-[#7f86a8]" aria-hidden="true" />

          <div className="text-center">
            <p className="text-[11px] font-bold text-[#7f86a8]">
              {protection.currentLabel}
            </p>
            <div className="mt-2 rounded-xl border border-emerald-400/20 bg-emerald-400/[0.08] px-5 py-3 text-sm font-black text-[#4ade80]">
              {protection.currentStatus}
            </div>
          </div>
        </div>
      </div>

      <p className="mt-4 flex items-start gap-2 text-[11px] leading-[16.5px] text-[#b8bdd8]">
        <CircleAlert className="mt-0.5 size-3 shrink-0 text-[#60a5fa]" aria-hidden="true" />
        <span>{protection.note}</span>
      </p>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {protection.items.map((item) => (
          <article
            key={item.title}
            className="rounded-xl border border-white/[0.07] bg-[#0f1222]/80 p-4 text-start"
          >
            <div className="flex items-center gap-2">
              <span className="flex size-8 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.04] text-[#4ade80]">
                <Check className="size-4" aria-hidden="true" />
              </span>
              <h3 className="text-[13px] font-extrabold leading-[19.5px] text-white">
                {item.title}
              </h3>
            </div>
            <p className="mt-2 text-[11px] leading-[16.5px] text-[#7f86a8]">
              {item.description}
            </p>
          </article>
        ))}
      </div>
    </Panel>
  );
}

function NextStepsTimeline({
  nextSteps,
}: {
  nextSteps: PortalPaymentConfirmationContent["nextSteps"];
}) {
  return (
    <Panel>
      <SectionTitle icon={Sparkles} title={nextSteps.title} />

      <div className="mt-5 space-y-4">
        {nextSteps.steps.map((step, index) => {
          const stateClasses = nextStepStateClassNames[step.state];

          return (
            <div key={step.title} className="flex gap-4 text-start">
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "flex size-8 items-center justify-center rounded-full border",
                    stateClasses.marker,
                  )}
                >
                  {step.state === "completed" ? (
                    <Check className="size-4" aria-hidden="true" />
                  ) : step.state === "current" ? (
                    <span className="size-2.5 rounded-full bg-current" aria-hidden="true" />
                  ) : (
                    <span className="text-[11px] font-bold">{index + 1}</span>
                  )}
                </div>
                {index < nextSteps.steps.length - 1 ? (
                  <div className="mt-2 h-10 w-px bg-white/[0.08]" aria-hidden="true" />
                ) : null}
              </div>

              <div className="flex-1 pb-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-[13px] font-extrabold leading-[19.5px] text-white">
                    {step.title}
                  </h3>
                  <span
                    className={cn(
                      "rounded-full px-2.5 py-1 text-[10px] font-bold leading-none",
                      stateClasses.badge,
                    )}
                  >
                    {step.state === "completed"
                      ? "مكتمل"
                      : step.state === "current"
                        ? "الحالي"
                        : "قادم"}
                  </span>
                </div>
                <p className="mt-1.5 text-[11px] leading-[16.5px] text-[#7f86a8]">
                  {step.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </Panel>
  );
}

function ReceiptActions({
  receiptActions,
}: {
  receiptActions: PortalPaymentConfirmationContent["receiptActions"];
}) {
  return (
    <Panel>
      <SectionTitle icon={ReceiptText} title={receiptActions.title} />

      <div className="mt-5 space-y-3">
        {receiptActions.items.map((item) => {
          const Icon = actionCardIcons[item.icon];

          return (
            <article
              key={item.title}
              className="flex flex-col gap-4 rounded-xl border border-white/[0.07] bg-[#0f1222]/80 p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-start gap-3 text-start">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.04] text-[#a78bfa]">
                  <Icon className="size-4" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-[13px] font-extrabold leading-[19.5px] text-white">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-[11px] leading-[16.5px] text-[#7f86a8]">
                    {item.description}
                  </p>
                </div>
              </div>

              <Button
                type="button"
                variant="outline"
                className="h-9 rounded-[10px] border-white/[0.08] bg-white/[0.04] px-4 text-xs font-bold text-[#b8bdd8] hover:bg-white/[0.08] hover:text-white"
              >
                {item.actionLabel}
              </Button>
            </article>
          );
        })}
      </div>
    </Panel>
  );
}

function PortalPreview({
  portalPreview,
}: {
  portalPreview: PortalPaymentConfirmationContent["portalPreview"];
}) {
  return (
    <Panel>
      <SectionTitle icon={WalletCards} title={portalPreview.title} />

      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {portalPreview.stats.map((stat) => (
          <article
            key={stat.label}
            className={cn(
              "rounded-xl border px-4 py-4 text-start",
              previewToneClassNames[stat.tone],
            )}
          >
            <p className="text-[22px] font-black leading-[33px]">{stat.value}</p>
            <p className="mt-1 text-[11px] leading-[16.5px]">{stat.label}</p>
          </article>
        ))}
      </div>

      <p className="mt-4 flex items-start gap-2 text-[11px] leading-[16.5px] text-[#b8bdd8]">
        <CheckCircle2
          className="mt-0.5 size-3 shrink-0 text-[#4ade80]"
          aria-hidden="true"
        />
        <span>{portalPreview.note}</span>
      </p>

      <div className="mt-4 inline-flex rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1 text-[11px] font-bold text-[#b8bdd8]">
        {portalPreview.statusLabel}
      </div>
    </Panel>
  );
}

function TrustFooter({
  trustFooter,
}: {
  trustFooter: PortalPaymentConfirmationContent["trustFooter"];
}) {
  return (
    <section className="rounded-2xl border border-emerald-400/15 bg-[linear-gradient(180deg,rgba(20,46,31,0.88)_0%,rgba(18,24,36,0.95)_100%)] p-5 text-start sm:p-6">
      <div className="flex items-start gap-3">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-emerald-400/20 bg-emerald-400/[0.08] text-[#4ade80]">
          <ShieldCheck className="size-5" aria-hidden="true" />
        </span>
        <div>
          <h2 className="text-[15px] font-extrabold leading-[22.5px] text-white">
            {trustFooter.title}
          </h2>
          <p className="mt-2 text-xs leading-[19.2px] text-[#b8bdd8]">
            {trustFooter.description}
          </p>
          <p className="mt-2 text-[11px] leading-[16.5px] text-[#7f86a8]">
            {trustFooter.disclaimer}
          </p>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-center gap-3 text-[11px] text-[#7f86a8]">
        {trustFooter.links.map((link) => (
          <span key={link}>{link}</span>
        ))}
        <span>{trustFooter.copyright}</span>
      </div>
    </section>
  );
}

function QuickSummary({
  quickSummary,
}: {
  quickSummary: PortalPaymentConfirmationContent["quickSummary"];
}) {
  const summaryPanels = [
    {
      icon: ReceiptText,
      title: quickSummary.operationSummary.title,
      rows: quickSummary.operationSummary.rows,
    },
    {
      icon: CreditCard,
      title: quickSummary.paymentMethod.title,
      rows: quickSummary.paymentMethod.rows,
    },
    {
      icon: WalletCards,
      title: quickSummary.agreementSummary.title,
      rows: quickSummary.agreementSummary.rows,
    },
  ] as const;

  return (
    <div className="space-y-4">
      {summaryPanels.map((panel) => (
        <Panel key={panel.title} className="p-4 sm:p-5">
          <SectionTitle icon={panel.icon} title={panel.title} />
          <div className="mt-4">
            <DetailRows rows={panel.rows} />
          </div>
        </Panel>
      ))}

      <Panel className="p-4 sm:p-5">
        <SectionTitle icon={Sparkles} title={quickSummary.nextStep.title} />
        <p className="mt-4 text-sm leading-6 text-[#f1f3fc]">
          {quickSummary.nextStep.description}
        </p>
        <p className="mt-2 flex items-center gap-2 text-[11px] leading-[16.5px] text-[#7f86a8]">
          <CircleAlert className="size-3 text-[#60a5fa]" aria-hidden="true" />
          <span>{quickSummary.nextStep.note}</span>
        </p>
        <Button
          type="button"
          className="mt-4 h-10 w-full rounded-[10px] bg-gradient-to-br from-[#6d5dfc] to-[#7c6cff] text-sm font-black text-white hover:opacity-95"
        >
          {quickSummary.nextStep.actionLabel}
        </Button>
      </Panel>

      <Panel className="p-4 sm:p-5">
        <SectionTitle icon={CircleAlert} title={quickSummary.demoNote.title} />
        <p className="mt-4 text-sm leading-6 text-[#b8bdd8]">
          {quickSummary.demoNote.description}
        </p>
        <div className="mt-4 inline-flex rounded-full border border-amber-400/15 bg-amber-400/[0.08] px-3 py-1 text-[11px] font-bold text-[#fbbf24]">
          {quickSummary.demoNote.badge}
        </div>
      </Panel>
    </div>
  );
}

export function PaymentConfirmationSection() {
  const { paymentConfirmation } = clientPortalContent;

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[#0d0f1a] px-4 py-8 text-white sm:px-6 lg:px-8"
      aria-labelledby="payment-confirmation-title"
    >
      <section className="mx-auto w-full max-w-[992px]">
        <div className="flex items-start justify-end gap-4 text-start">
          <span className="mt-3 shrink-0 text-[#22d36f]">
            <CheckCircle2 className="size-8" aria-hidden="true" />
          </span>

          <div className="max-w-[430px]">
            <h1
              id="payment-confirmation-title"
              className="text-[26px] font-black leading-[39px] text-[#38e47c]"
            >
              {paymentConfirmation.title}
            </h1>
            <p className="mt-1.5 text-[13px] leading-[19.5px] text-[#8c93b5]">
              {paymentConfirmation.description}
            </p>
          </div>
        </div>

        {/* AR: بطاقة النجاح الرئيسية تعرض حالة الحجز والمبلغ والإجراءات السريعة.
            EN: The main success card shows the reservation status, amount, and quick actions. */}
        <section className="relative mt-8 overflow-hidden rounded-[24px] border border-emerald-500/20 bg-[linear-gradient(90deg,#062712_0%,#082916_22%,#0f1d2c_100%)] px-6 py-7 shadow-[0_16px_40px_rgba(3,14,10,0.28)] sm:px-10 sm:py-8 lg:px-12">
          <div
            className="pointer-events-none absolute start-0 top-0 h-full w-[44%] bg-[radial-gradient(circle_at_20%_40%,rgba(33,197,94,0.18)_0%,rgba(33,197,94,0.08)_28%,rgba(0,0,0,0)_68%)]"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute end-6 top-7 hidden size-[72px] items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/[0.08] lg:flex"
            aria-hidden="true"
          >
            <CheckCheck className="size-9 text-[#d8ffe8]" />
          </div>

          <p className="relative z-10 text-start text-[11px] leading-[15px] text-[#7f86a8] lg:pe-24">
            {paymentConfirmation.hero.eyebrow}
          </p>

          <div className="relative z-10 mt-5 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between lg:gap-8">
            <div className="order-1 min-w-0 flex-1 text-start lg:pe-24 lg:pt-4">
              <h2 className="text-[20px] font-black leading-[30px] text-white sm:text-[22px] sm:leading-[33px]">
                {paymentConfirmation.hero.heading}
              </h2>
              <p className="mt-1.5 text-xs leading-[18px] text-[#8b92b1]">
                {paymentConfirmation.hero.meta}
              </p>

              <p className="mt-5 max-w-[670px] text-[13px] leading-5 text-[#c2c8de]">
                {paymentConfirmation.hero.description}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {paymentConfirmation.hero.badges.map((badge) => (
                  <span
                    key={badge.label}
                    className={cn(
                      "inline-flex h-[30px] items-center rounded-full border px-3.5 text-[12px] font-bold leading-none",
                      badge.className,
                    )}
                  >
                    {badge.label}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:justify-start">
                <Button
                  type="button"
                  variant="outline"
                  className="h-[50px] min-w-[238px] justify-center gap-2 rounded-[14px] border-transparent bg-[#22c55e] px-6 text-base font-black text-white shadow-[0_10px_26px_rgba(34,197,94,0.26)] hover:bg-[#20bb58]"
                >
                  <ArrowLeft className="size-4" aria-hidden="true" />
                  {paymentConfirmation.hero.primaryAction}
                </Button>

                {paymentConfirmation.hero.secondaryActions.map((action) => {
                  const Icon = heroActionIcons[action.icon];

                  return (
                    <Button
                      key={action.label}
                      type="button"
                      variant="outline"
                      className={cn(
                        "h-[40px] justify-center gap-2 rounded-[12px] px-5 text-sm font-bold",
                        heroActionClassNames[action.variant],
                      )}
                    >
                      <Icon className="size-3.5" aria-hidden="true" />
                      {action.label}
                    </Button>
                  );
                })}
              </div>
            </div>

            <article className="order-2 mx-auto w-full max-w-[136px] shrink-0 rounded-[18px] border border-emerald-500/20 bg-emerald-500/[0.08] px-6 pb-6 pt-5 text-center lg:mx-0 lg:mt-3">
              <p className="text-[10px] leading-[15px] text-[#7f86a8]">
                {paymentConfirmation.hero.amountLabel}
              </p>
              <p className="mt-3 text-[34px] font-black leading-[40px] text-[#43ea80] sm:text-[42px] sm:leading-[48px]">
                {paymentConfirmation.hero.amount}
              </p>
              <p className="mt-4 inline-flex items-center gap-1.5 text-[12px] font-bold leading-[15px] text-[#a78bfa]">
                <span className="size-2 rounded-full bg-[#a78bfa]" aria-hidden="true" />
                {paymentConfirmation.hero.amountStatus}
              </p>
            </article>
          </div>
        </section>

        <div className="mt-6 space-y-6">
          <ReceiptSummary receipt={paymentConfirmation.receipt} />
          <FundedMilestoneDetails milestone={paymentConfirmation.fundedMilestone} />
          <ProtectionStatus protection={paymentConfirmation.protection} />
          <NextStepsTimeline nextSteps={paymentConfirmation.nextSteps} />
          <ReceiptActions receiptActions={paymentConfirmation.receiptActions} />
          <PortalPreview portalPreview={paymentConfirmation.portalPreview} />
          <TrustFooter trustFooter={paymentConfirmation.trustFooter} />
          <QuickSummary quickSummary={paymentConfirmation.quickSummary} />
        </div>
      </section>
    </main>
  );
}
