import {
  AlertTriangle,
  Apple,
  ArrowRight,
  Bot,
  Check,
  CircleDollarSign,
  CreditCard,
  Flag,
  Info,
  Landmark,
  Layers3,
  LockKeyhole,
  ReceiptText,
  ShieldCheck,
} from "lucide-react";
import type React from "react";

import { Button } from "@/components/shared/button";
import { cn } from "@/lib/utils";
import type { PortalPaymentSetupDetails } from "@/types";

type PaymentSetupDetails = PortalPaymentSetupDetails;

const valueToneClassNames = {
  default: "text-[#f1f3fc]",
  muted: "text-[#b8bdd8]",
  green: "text-[#4ade80]",
  purple: "text-[#a78bfa]",
} as const;

const stageToneClassNames = {
  purple: {
    marker: "bg-[#a78bfa]",
    amount: "text-[#a78bfa]",
  },
  blue: {
    marker: "bg-[#60a5fa]",
    amount: "text-[#60a5fa]",
  },
  green: {
    marker: "bg-[#4ade80]",
    amount: "text-[#4ade80]",
  },
} as const;

const milestoneToneClassNames = {
  purple: "border-[#6d5dfc]/30 bg-[#6d5dfc]/[0.06]",
  blue: "border-blue-400/20 bg-blue-400/[0.05]",
  green: "border-emerald-400/20 bg-emerald-400/[0.05]",
} as const;

const aiStepToneClassNames = {
  danger: "border-red-400/20 bg-red-400/[0.07] text-red-300",
  purple: "border-[#6d5dfc]/25 bg-[#6d5dfc]/[0.08] text-[#a78bfa]",
  blue: "border-blue-400/20 bg-blue-400/[0.07] text-[#60a5fa]",
  green: "border-emerald-400/20 bg-emerald-400/[0.08] text-[#4ade80]",
} as const;

const methodIcons = {
  card: CreditCard,
  apple: Apple,
  bank: Landmark,
} as const;

const aiStepIcons = {
  flag: Flag,
  bot: Bot,
  shield: ShieldCheck,
  check: Check,
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
  description,
}: {
  icon: React.ElementType;
  title: string;
  description?: string;
}) {
  return (
    <div className="text-start">
      <div className="flex items-center gap-2.5">
        <Icon className="size-[15px] text-[#4ade80]" aria-hidden="true" />
        <h2 className="text-[15px] font-extrabold leading-[22.5px] text-white">
          {title}
        </h2>
      </div>
      {description ? (
        <p className="mt-2 text-xs leading-[19.2px] text-[#7f86a8]">
          {description}
        </p>
      ) : null}
    </div>
  );
}

function PaymentSummary({
  summary,
}: {
  summary: PaymentSetupDetails["summary"];
}) {
  return (
    <Panel>
      <SectionTitle icon={ReceiptText} title={summary.title} />

      <dl className="mt-4 divide-y divide-white/[0.07]">
        {summary.rows.map((row) => (
          <div
            key={row.label}
            className="flex items-center justify-between gap-4 py-2 text-xs leading-[18px]"
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

      <div className="mt-4 rounded-xl border border-white/[0.07] bg-[#1a1d2e] p-4">
        <div className="grid gap-3">
          {summary.stages.map((stage) => (
            <div
              key={stage.label}
              className="flex items-center justify-between gap-4 text-xs"
            >
              <div className="flex items-center gap-2.5">
                <span
                  className={cn(
                    "size-2 rounded",
                    stageToneClassNames[stage.tone].marker,
                  )}
                  aria-hidden="true"
                />
                <span className="font-medium leading-[18px] text-[#b8bdd8]">
                  {stage.label}
                </span>
                <span
                  className={cn(
                    "text-[10px] font-bold leading-[15px]",
                    stage.current ? "text-[#fbbf24]" : "text-[#7f86a8]",
                  )}
                >
                  {stage.status}
                </span>
              </div>
              <span
                className={cn(
                  "font-extrabold leading-[19.5px]",
                  stageToneClassNames[stage.tone].amount,
                )}
              >
                {stage.amount}
              </span>
            </div>
          ))}
        </div>
      </div>

      <p className="mt-4 flex items-start gap-2 rounded-lg border border-emerald-400/15 bg-emerald-400/[0.06] p-3 text-[11px] leading-[16.5px] text-[#b8bdd8]">
        <ShieldCheck
          className="mt-0.5 size-3 shrink-0 text-[#4ade80]"
          aria-hidden="true"
        />
        <span>{summary.note}</span>
      </p>
    </Panel>
  );
}

function MilestonePlan({
  milestones,
}: {
  milestones: PaymentSetupDetails["milestones"];
}) {
  return (
    <Panel>
      <SectionTitle
        icon={Layers3}
        title={milestones.title}
        description={milestones.description}
      />

      <div className="mt-4 grid gap-3">
        {milestones.items.map((milestone) => (
          <article
            key={milestone.order}
            className={cn(
              "rounded-[13px] border p-4",
              milestoneToneClassNames[milestone.tone],
            )}
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="text-start">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex size-6 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.04] text-[11px] font-bold text-[#b8bdd8]">
                    {milestone.order}
                  </span>
                  <h3 className="text-[13px] font-extrabold leading-[19.5px] text-white">
                    {milestone.title}
                  </h3>
                  <span
                    className={cn(
                      "rounded-full px-2.5 py-1 text-[10px] font-bold leading-none",
                      milestone.current
                        ? "bg-amber-400/15 text-[#fbbf24]"
                        : "bg-white/[0.05] text-[#7f86a8]",
                    )}
                  >
                    {milestone.status}
                  </span>
                </div>
                <p className="mt-2 text-[11px] leading-[17px] text-[#7f86a8]">
                  {milestone.description}
                </p>
              </div>

              <div className="shrink-0 text-start sm:text-end">
                <p className="text-[18px] font-black leading-[27px] text-[#4ade80]">
                  {milestone.amount}
                </p>
                <p className="text-[10px] leading-[15px] text-[#7f86a8]">
                  {milestone.dueLabel}
                </p>
              </div>
            </div>

            <div className="mt-4 rounded-xl border border-white/[0.07] bg-[#0f1222]/70 p-3">
              <p className="text-[11px] font-bold leading-[16.5px] text-[#b8bdd8]">
                شروط القبول
              </p>
              <ul className="mt-2 grid gap-2 sm:grid-cols-3">
                {milestone.acceptanceCriteria.map((criterion) => (
                  <li
                    key={criterion}
                    className="flex items-start gap-2 text-[11px] leading-[16.5px] text-[#7f86a8]"
                  >
                    <Check
                      className="mt-0.5 size-3 shrink-0 text-[#4ade80]"
                      aria-hidden="true"
                    />
                    <span>{criterion}</span>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-4 rounded-2xl border border-white/[0.07] bg-[#1a1d2e] p-4">
        <h3 className="text-[13px] font-extrabold leading-[19.5px] text-white">
          {milestones.aiReview.title}
        </h3>
        <p className="mt-1 text-[11px] leading-[17px] text-[#7f86a8]">
          {milestones.aiReview.description}
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-4">
          {milestones.aiReview.steps.map((step) => {
            const Icon = aiStepIcons[step.icon];

            return (
              <div
                key={step.label}
                className="flex flex-col items-center gap-2 text-center"
              >
                <div
                  className={cn(
                    "flex size-11 items-center justify-center rounded-xl border",
                    aiStepToneClassNames[step.tone],
                  )}
                >
                  <Icon className="size-4" aria-hidden="true" />
                </div>
                <p className="text-[11px] font-bold leading-[15.4px] text-[#b8bdd8]">
                  {step.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </Panel>
  );
}

function PaymentMethod({
  paymentMethod,
}: {
  paymentMethod: PaymentSetupDetails["paymentMethod"];
}) {
  return (
    <Panel>
      <SectionTitle icon={CreditCard} title={paymentMethod.title} />

      <div className="mt-4 grid gap-2.5">
        {paymentMethod.options.map((option) => {
          const Icon = methodIcons[option.icon];

          return (
            <button
              key={option.label}
              type="button"
              disabled={option.disabled}
              className={cn(
                "flex w-full items-center justify-between gap-4 rounded-[10px] border px-4 py-3 text-start transition",
                option.selected
                  ? "border-[#6d5dfc]/35 bg-[#6d5dfc]/[0.09]"
                  : "border-white/[0.07] bg-[#1a1d2e]",
                option.disabled
                  ? "cursor-not-allowed opacity-45"
                  : "hover:border-[#6d5dfc]/35",
              )}
            >
              <span className="flex items-center gap-3">
                <span
                  className={cn(
                    "flex size-8 items-center justify-center rounded-lg border",
                    option.selected
                      ? "border-[#6d5dfc]/30 bg-[#6d5dfc]/15 text-[#a78bfa]"
                      : "border-white/[0.08] bg-white/[0.04] text-[#7f86a8]",
                  )}
                >
                  <Icon className="size-4" aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-xs font-bold leading-[18px] text-[#b8bdd8]">
                    {option.label}
                  </span>
                  <span className="block text-[10px] leading-[15px] text-[#7f86a8]">
                    {option.detail}
                  </span>
                </span>
              </span>
              {option.selected ? (
                <Check className="size-4 text-[#4ade80]" aria-hidden="true" />
              ) : null}
            </button>
          );
        })}
      </div>

      <p className="mt-4 flex items-start gap-2 rounded-lg border border-amber-400/15 bg-amber-400/[0.08] p-3 text-[11px] leading-[16.5px] text-[#fbbf24]">
        <AlertTriangle
          className="mt-0.5 size-3 shrink-0"
          aria-hidden="true"
        />
        <span>{paymentMethod.warning}</span>
      </p>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {paymentMethod.fields.map((field) => (
          <label key={field.label} className="grid gap-1.5 text-start">
            <span className="text-[11px] leading-[16.5px] text-[#7f86a8]">
              {field.label}
            </span>
            <span className="flex min-h-10 items-center rounded-lg border border-white/[0.07] bg-[#0f1222] px-3 text-xs leading-[18px] text-[#b8bdd8]">
              {field.value}
            </span>
          </label>
        ))}
      </div>
    </Panel>
  );
}

function Checklist({ checklist }: { checklist: PaymentSetupDetails["checklist"] }) {
  return (
    <Panel className="border-emerald-400/15">
      <SectionTitle icon={ShieldCheck} title={checklist.title} />

      <div className="mt-4 grid gap-2.5">
        {checklist.items.map((item) => (
          <label
            key={item}
            className="flex cursor-pointer items-center justify-between gap-4 rounded-[9px] px-2 py-2 text-start text-xs leading-[18px] text-[#b8bdd8] hover:bg-white/[0.03]"
          >
            <span>{item}</span>
            <input
              type="checkbox"
              className="size-[18px] rounded border-white/15 bg-transparent accent-[#6d5dfc]"
            />
          </label>
        ))}
      </div>

      <label className="mt-4 flex cursor-pointer items-center justify-between gap-4 rounded-[10px] border border-emerald-400/20 bg-emerald-400/[0.06] p-3 text-start text-xs leading-[18px] text-[#b8bdd8]">
        <span>{checklist.confirmation}</span>
        <input
          type="checkbox"
          className="size-[18px] rounded border-white/15 bg-transparent accent-[#6d5dfc]"
        />
      </label>
    </Panel>
  );
}

function Reservation({
  reservation,
}: {
  reservation: PaymentSetupDetails["reservation"];
}) {
  return (
    <Panel className="border-[#6d5dfc]/20">
      <SectionTitle icon={LockKeyhole} title={reservation.title} />

      <dl className="mt-4 rounded-xl border border-white/[0.07] bg-[#1a1d2e] p-4">
        {reservation.rows.map((row) => (
          <div
            key={row.label}
            className="flex items-center justify-between gap-4 border-b border-white/[0.07] py-2.5 last:border-b-0"
          >
            <dt className="text-[11px] leading-[16.5px] text-[#7f86a8]">
              {row.label}
            </dt>
            <dd
              className={cn(
                "text-xs font-extrabold leading-[18px] text-[#b8bdd8]",
                row.tone && valueToneClassNames[row.tone],
              )}
            >
              {row.value}
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-4 flex flex-col gap-2.5 sm:flex-row sm:justify-start">
        <Button
          type="button"
          className="h-[47px] gap-2 rounded-[11px] bg-gradient-to-br from-[#6d5dfc] to-[#7c6cff] px-5 text-sm font-black text-white shadow-[0_4px_9px_rgba(109,93,252,0.4)] hover:opacity-95"
        >
          <LockKeyhole className="size-3.5" aria-hidden="true" />
          {reservation.primaryAction}
        </Button>
        <Button
          type="button"
          variant="outline"
          className="h-[47px] gap-2 rounded-[10px] border-white/[0.07] bg-transparent px-5 text-xs font-bold text-[#7f86a8] hover:bg-white/[0.04] hover:text-[#b8bdd8]"
        >
          <ArrowRight className="size-3" aria-hidden="true" />
          {reservation.secondaryAction}
        </Button>
      </div>

      <p className="mt-4 flex items-start gap-2 rounded-lg border border-amber-400/15 bg-amber-400/[0.08] p-3 text-[11px] leading-[16.5px] text-[#fbbf24]">
        <AlertTriangle className="mt-0.5 size-3 shrink-0" aria-hidden="true" />
        <span>{reservation.warning}</span>
      </p>
      <p className="mt-3 flex items-start gap-2 text-[11px] leading-[16.5px] text-[#7f86a8]">
        <Info className="mt-0.5 size-3 shrink-0" aria-hidden="true" />
        <span>{reservation.note}</span>
      </p>
    </Panel>
  );
}

function ProtectedPaymentFooter({
  footer,
}: {
  footer: PaymentSetupDetails["footer"];
}) {
  return (
    <footer className="space-y-4 text-start">
      <div className="flex flex-col gap-3 rounded-[14px] border border-emerald-400/15 bg-emerald-400/[0.05] p-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-[13px] font-extrabold leading-[19.5px] text-[#4ade80]">
            {footer.title}
          </h2>
          <p className="mt-1 text-xs leading-[19.2px] text-[#b8bdd8]">
            {footer.description}
          </p>
          <p className="mt-1 text-[11px] leading-[16.5px] text-[#7f86a8]">
            {footer.disclaimer}
          </p>
        </div>
        <CircleDollarSign
          className="size-[18px] shrink-0 text-[#4ade80]"
          aria-hidden="true"
        />
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2 pt-1 text-[11px] leading-[16.5px] text-[#7f86a8]">
        {footer.links.map((link) => (
          <a key={link} href="#" className="hover:text-[#b8bdd8]">
            {link}
          </a>
        ))}
        <span aria-hidden="true">·</span>
        <span>{footer.copyright}</span>
      </div>
    </footer>
  );
}

export function PaymentSetupDetailsSection({
  details,
}: {
  details: PortalPaymentSetupDetails;
}) {
  return (
    <section className="mt-6 space-y-4" aria-label="تفاصيل إعداد الدفع">
      <PaymentSummary summary={details.summary} />
      <MilestonePlan milestones={details.milestones} />
      <PaymentMethod paymentMethod={details.paymentMethod} />
      <Checklist checklist={details.checklist} />
      <Reservation reservation={details.reservation} />
      <ProtectedPaymentFooter footer={details.footer} />
    </section>
  );
}
