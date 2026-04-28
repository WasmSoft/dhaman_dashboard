import {
  AlertTriangle,
  ArrowRight,
  Check,
  CircleDollarSign,
  CreditCard,
  Info,
  Layers3,
  LockKeyhole,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import type React from "react";

import { Button } from "@/components/shared/button";
import { cn } from "@/lib/utils";
import type { PortalFundMilestoneDetails } from "@/types";

const valueToneClassNames = {
  default: "text-[#b8bdd8]",
  muted: "text-[#7f86a8]",
  warning: "text-[#fbbf24]",
  green: "text-[#4ade80]",
  purple: "text-[#a78bfa]",
} as const;

const impactToneClassNames = {
  purple: "border-[#6d5dfc]/20 bg-[#6d5dfc]/[0.07] text-[#a78bfa]",
  warning: "border-amber-400/20 bg-amber-400/[0.07] text-[#fbbf24]",
  green: "border-emerald-400/20 bg-emerald-400/[0.07] text-[#4ade80]",
  blue: "border-blue-400/20 bg-blue-400/[0.07] text-[#60a5fa]",
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
        "rounded-2xl border border-white/[0.07] bg-[#131627] p-5 text-start sm:p-6",
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
  iconClassName,
}: {
  icon: React.ElementType;
  title: string;
  iconClassName?: string;
}) {
  return (
    <div className="flex items-center gap-2.5">
      <Icon
        className={cn("size-[15px] text-[#4ade80]", iconClassName)}
        aria-hidden="true"
      />
      <h2 className="text-[15px] font-extrabold leading-[22.5px] text-white">
        {title}
      </h2>
    </div>
  );
}

function Note({
  children,
  tone = "default",
}: {
  children: React.ReactNode;
  tone?: "default" | "warning" | "green";
}) {
  const Icon = tone === "warning" ? AlertTriangle : Info;

  return (
    <p
      className={cn(
        "mt-4 flex items-start gap-2 rounded-lg p-3 text-[11px] leading-[16.5px]",
        tone === "green" &&
          "border border-emerald-400/15 bg-emerald-400/[0.06] text-[#b8bdd8]",
        tone === "warning" &&
          "border border-amber-400/15 bg-amber-400/[0.08] text-[#fbbf24]",
        tone === "default" &&
          "border border-white/[0.07] bg-[#1a1d2e] text-[#7f86a8]",
      )}
    >
      <Icon className="mt-0.5 size-3 shrink-0" aria-hidden="true" />
      <span>{children}</span>
    </p>
  );
}

function DetailRows({
  rows,
}: {
  rows: Array<{
    label: string;
    value: string;
    tone?: "default" | "muted" | "warning" | "green" | "purple";
  }>;
}) {
  return (
    <dl className="mt-4 divide-y divide-white/[0.07]">
      {rows.map((row) => (
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
  );
}

function SelectedMilestone({
  selectedMilestone,
}: {
  selectedMilestone: PortalFundMilestoneDetails["selectedMilestone"];
}) {
  return (
    <Panel>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <SectionTitle icon={Layers3} title="المرحلة المحددة" />
          <div className="mt-4 flex flex-wrap gap-2">
            {selectedMilestone.badges.map((badge) => (
              <span
                key={badge.label}
                className={cn(
                  "inline-flex min-h-[23px] items-center rounded-full border px-3 py-1 text-[10px] font-extrabold leading-none",
                  badge.className,
                )}
              >
                {badge.label}
              </span>
            ))}
          </div>
        </div>
        <p className="text-[22px] font-black leading-[33px] text-[#4ade80]">
          {selectedMilestone.amount}
        </p>
      </div>

      <h3 className="mt-3 text-[15px] font-extrabold leading-[22.5px] text-white">
        {selectedMilestone.title}
      </h3>
      <DetailRows rows={selectedMilestone.rows} />
      <Note>{selectedMilestone.note}</Note>
    </Panel>
  );
}

function AmountSummary({
  amountSummary,
}: {
  amountSummary: PortalFundMilestoneDetails["amountSummary"];
}) {
  return (
    <Panel className="border-emerald-400/15">
      <SectionTitle
        icon={CircleDollarSign}
        title={amountSummary.title}
        iconClassName="text-[#4ade80]"
      />

      <div className="mt-4 rounded-xl border border-white/[0.07] bg-[#1a1d2e] p-4">
        <DetailRows rows={amountSummary.rows} />
        <div className="mt-3 border-t border-white/[0.12] pt-4">
          <div className="flex items-center justify-between gap-4">
            <span className="text-[13px] font-extrabold leading-[19.5px] text-white">
              {amountSummary.totalLabel}
            </span>
            <span className="text-xl font-black leading-[30px] text-[#4ade80]">
              {amountSummary.total}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-xl border border-emerald-400/15 bg-emerald-400/[0.05] p-5 text-center">
        <p className="text-[40px] font-black leading-[60px] text-[#4ade80]">
          {amountSummary.total}
        </p>
        <p className="text-[11px] leading-[16.5px] text-[#7f86a8]">
          {amountSummary.totalHint}
        </p>
      </div>
      <Note>{amountSummary.note}</Note>
    </Panel>
  );
}

function PaymentMethod({
  paymentMethod,
}: {
  paymentMethod: PortalFundMilestoneDetails["paymentMethod"];
}) {
  return (
    <Panel>
      <SectionTitle icon={CreditCard} title={paymentMethod.title} />
      <div className="mt-4 rounded-xl border border-[#6d5dfc]/25 bg-[linear-gradient(90deg,rgba(109,93,252,0.22),rgba(26,29,46,0.9))] p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[13px] font-extrabold leading-[19.5px] text-white">
              {paymentMethod.method}
            </p>
            <p className="mt-1 text-[10px] leading-[15px] text-[#7f86a8]">
              {paymentMethod.detail}
            </p>
          </div>
          <span className="inline-flex w-fit items-center rounded-full border border-emerald-400/20 bg-emerald-400/[0.08] px-3 py-1 text-[10px] font-bold text-[#4ade80]">
            {paymentMethod.status}
          </span>
        </div>
      </div>
      <Note tone="warning">{paymentMethod.warning}</Note>
    </Panel>
  );
}

function Impact({
  impact,
}: {
  impact: PortalFundMilestoneDetails["impact"];
}) {
  return (
    <Panel>
      <SectionTitle icon={Sparkles} title={impact.title} />
      <p className="mt-2 text-xs leading-[19.2px] text-[#7f86a8]">
        {impact.description}
      </p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {impact.items.map((item) => (
          <article
            key={item.title}
            className={cn(
              "rounded-[10px] border p-4",
              impactToneClassNames[item.tone],
            )}
          >
            <h3 className="text-[12px] font-extrabold leading-[18px]">
              {item.title}
            </h3>
            <p className="mt-1 text-[11px] leading-[16.5px] text-[#7f86a8]">
              {item.description}
            </p>
          </article>
        ))}
      </div>
      <Note>{impact.note}</Note>
    </Panel>
  );
}

function StatusChange({
  statusChange,
}: {
  statusChange: PortalFundMilestoneDetails["statusChange"];
}) {
  return (
    <Panel>
      <SectionTitle icon={ShieldCheck} title={statusChange.title} />
      <div className="mt-4 grid items-center gap-4 sm:grid-cols-[1fr_auto_1fr]">
        <div className="rounded-xl border border-amber-400/20 bg-amber-400/[0.07] p-4 text-center">
          <p className="text-[10px] font-bold uppercase leading-[15px] tracking-[0.5px] text-[#7f86a8]">
            {statusChange.beforeLabel}
          </p>
          <p className="mt-2 inline-flex rounded-[10px] border border-amber-400/25 bg-amber-400/10 px-4 py-2 text-[13px] font-extrabold leading-[19.5px] text-[#fbbf24]">
            {statusChange.beforeStatus}
          </p>
          <p className="mt-3 text-base font-black leading-6 text-white">
            {statusChange.amount}
          </p>
        </div>
        <ArrowRight
          className="mx-auto size-5 rotate-180 text-[#7f86a8] sm:rotate-0"
          aria-hidden="true"
        />
        <div className="rounded-xl border border-[#6d5dfc]/25 bg-[#6d5dfc]/[0.08] p-4 text-center">
          <p className="text-[10px] font-bold uppercase leading-[15px] tracking-[0.5px] text-[#7f86a8]">
            {statusChange.afterLabel}
          </p>
          <p className="mt-2 inline-flex rounded-[10px] border border-[#6d5dfc]/25 bg-[#6d5dfc]/10 px-4 py-2 text-[13px] font-extrabold leading-[19.5px] text-[#a78bfa]">
            {statusChange.afterStatus}
          </p>
          <p className="mt-3 text-base font-black leading-6 text-[#4ade80]">
            {statusChange.amount}
          </p>
        </div>
      </div>
      <Note>{statusChange.note}</Note>
    </Panel>
  );
}

function Checklist({
  checklist,
}: {
  checklist: PortalFundMilestoneDetails["checklist"];
}) {
  return (
    <Panel className="border-emerald-400/15">
      <SectionTitle icon={ShieldCheck} title={checklist.title} />
      <div className="mt-4 grid gap-2.5">
        {checklist.items.map((item) => (
          <label
            key={item}
            className="flex cursor-pointer items-center justify-between gap-4 rounded-[9px] px-2 py-2 text-xs leading-[18px] text-[#b8bdd8] hover:bg-white/[0.03]"
          >
            <span>{item}</span>
            <input
              type="checkbox"
              className="size-[18px] rounded border-white/15 bg-transparent accent-[#6d5dfc]"
            />
          </label>
        ))}
      </div>
      <label className="mt-4 flex cursor-pointer items-center justify-between gap-4 rounded-[10px] border border-emerald-400/20 bg-emerald-400/[0.06] p-3 text-xs font-extrabold leading-[18px] text-white">
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
  reservation: PortalFundMilestoneDetails["reservation"];
}) {
  return (
    <Panel className="border-[#6d5dfc]/20">
      <SectionTitle
        icon={LockKeyhole}
        title={reservation.title}
        iconClassName="text-[#a78bfa]"
      />
      <DetailRows rows={reservation.rows} />
      <Note tone="warning">{reservation.warning}</Note>
      <div className="mt-4 flex flex-col gap-2.5 sm:flex-row">
        <Button
          type="button"
          className="h-[47px] flex-1 gap-2 rounded-[11px] bg-gradient-to-br from-[#6d5dfc] to-[#7c6cff] text-sm font-black text-white shadow-[0_4px_9px_rgba(109,93,252,0.4)] hover:opacity-95"
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
      <p className="mt-3 flex items-start gap-2 text-[11px] leading-[16.5px] text-[#7f86a8]">
        <Info className="mt-0.5 size-3 shrink-0" aria-hidden="true" />
        <span>{reservation.note}</span>
      </p>
    </Panel>
  );
}

function FundMilestoneFooter({
  footer,
}: {
  footer: PortalFundMilestoneDetails["footer"];
}) {
  return (
    <div className="flex flex-col gap-3 rounded-[14px] border border-emerald-400/15 bg-emerald-400/[0.05] p-5 text-start sm:flex-row sm:items-start sm:justify-between">
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
      <Check className="size-[18px] shrink-0 text-[#4ade80]" aria-hidden="true" />
    </div>
  );
}

export function FundMilestoneDetailsSection({
  details,
}: {
  details: PortalFundMilestoneDetails;
}) {
  return (
    <section className="mt-6 space-y-4" aria-label="تفاصيل حجز دفعة المرحلة">
      <SelectedMilestone selectedMilestone={details.selectedMilestone} />
      <AmountSummary amountSummary={details.amountSummary} />
      <PaymentMethod paymentMethod={details.paymentMethod} />
      <Impact impact={details.impact} />
      <StatusChange statusChange={details.statusChange} />
      <Checklist checklist={details.checklist} />
      <Reservation reservation={details.reservation} />
      <FundMilestoneFooter footer={details.footer} />
    </section>
  );
}
