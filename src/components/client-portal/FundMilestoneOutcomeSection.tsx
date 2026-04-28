import {
  CircleDollarSign,
  Eye,
  FileText,
  ListChecks,
  ShieldCheck,
  ShieldQuestion,
  Zap,
} from "lucide-react";
import type React from "react";

import { Button } from "@/components/shared/button";
import { cn } from "@/lib/utils";
import type { PortalPaymentSetupOutcome } from "@/types";

const summaryValueToneClassNames = {
  muted: "text-[#b8bdd8]",
  green: "text-[#4ade80]",
  purple: "text-[#a78bfa]",
  subtle: "text-[#7f86a8]",
} as const;

function OutcomeCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "rounded-2xl border border-white/[0.07] bg-[#131627] px-5 py-5 text-start sm:px-6",
        className,
      )}
    >
      {children}
    </section>
  );
}

function OutcomeTitle({
  icon: Icon,
  title,
  className,
}: {
  icon: React.ElementType;
  title: string;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <Icon className="size-[13px] shrink-0" aria-hidden="true" />
      <h2 className="text-[13px] font-extrabold leading-[19.5px]">{title}</h2>
    </div>
  );
}

function PillBadge({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex min-h-[23px] items-center gap-1.5 rounded-full border px-2.5 text-[10px] font-bold leading-[15px]",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function FundMileStoneOutcomeSection({
  outcome,
}: {
  outcome: PortalPaymentSetupOutcome;
}) {
  return (
    <section className="mt-6 space-y-0" aria-label="ملخص ما بعد الدفع">
      <OutcomeCard className="rounded-b-none border-b-0">
        <OutcomeTitle
          icon={CircleDollarSign}
          title={outcome.operationSummary.title}
          className="text-white [&_svg]:text-[#4ade80]"
        />

        <dl className="mt-5 grid gap-2.5">
          {outcome.operationSummary.rows.map((row) => (
            <div
              key={row.label}
              className="flex flex-wrap items-baseline justify-start gap-x-1.5 gap-y-1 text-start"
            >
              <dt className="text-base leading-6 text-[#f1f3fc]">
                {row.label}
              </dt>
              <dd
                className={cn(
                  "text-[11px] leading-[16.5px] text-[#b8bdd8]",
                  row.tone && summaryValueToneClassNames[row.tone],
                )}
              >
                {row.value}
              </dd>
            </div>
          ))}
        </dl>
      </OutcomeCard>

      <OutcomeCard className="rounded-none border-[#6d5dfc]/15">
        <OutcomeTitle
          icon={Zap}
          title={outcome.afterPayment.title}
          className="text-white [&_svg]:text-[#a78bfa]"
        />
        <ol className="mt-4 grid gap-2">
          {outcome.afterPayment.steps.map((step, index) => (
            <li
              key={step}
              className="flex items-center justify-start gap-2.5 text-[11px] leading-[16.5px] text-[#b8bdd8]"
            >
              <span className="inline-flex size-5 shrink-0 items-center justify-center rounded-md bg-[#6d5dfc]/15 text-[11px] font-extrabold leading-none text-[#a78bfa]">
                {index + 1}
              </span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </OutcomeCard>

      <OutcomeCard className="rounded-none">
        <OutcomeTitle
          icon={FileText}
          title={outcome.policies.title}
          className="text-white [&_svg]:text-[#60a5fa]"
        />
        <ul className="mt-4 grid gap-2">
          {outcome.policies.items.map((item) => (
            <li
              key={item}
              className="flex items-center justify-start gap-2 text-[11px] leading-[16.5px] text-[#b8bdd8]"
            >
              <span
                className="size-1.5 shrink-0 rounded-[3px] bg-[#2f80ed]/60"
                aria-hidden="true"
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <Button
          type="button"
          variant="ghost"
          className="mt-4 h-auto gap-2 rounded-lg px-0 py-1 text-[11px] font-medium leading-[16.5px] text-[#f1f3fc] hover:bg-transparent hover:text-white"
        >
          <Eye className="size-[11px]" aria-hidden="true" />
          {outcome.policies.actionLabel}
        </Button>
      </OutcomeCard>

      <OutcomeCard className="rounded-t-none border-amber-400/15">
        <OutcomeTitle
          icon={ShieldQuestion}
          title={outcome.securityNote.title}
          className="text-[#fbbf24]"
        />
        <p className="mt-3 text-base leading-6 text-[#f1f3fc]">
          {outcome.securityNote.description}
        </p>
        <PillBadge className="mt-4 border-amber-400/20 bg-amber-400/[0.08] text-[#fbbf24]">
          <ListChecks className="size-[9px]" aria-hidden="true" />
          {outcome.securityNote.badge}
        </PillBadge>
      </OutcomeCard>
    </section>
  );
}
