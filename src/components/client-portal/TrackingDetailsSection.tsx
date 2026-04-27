import {
  AlertTriangle,
  CheckCircle2,
  CircleDollarSign,
  Clock3,
  Layers3,
} from "lucide-react";

import { Button } from "@/components/shared";
import { cn } from "@/lib/utils";
import type {
  PortalTrackingPaymentStat,
  PortalTrackingPaymentSummary,
  PortalTrackingRequiredAction,
  PortalTrackingTimeline,
  PortalTrackingTimelineStep,
} from "@/types";

interface TrackingDetailsSectionProps {
  paymentSummary: PortalTrackingPaymentSummary;
  requiredAction: PortalTrackingRequiredAction;
  agreementTimeline: PortalTrackingTimeline;
}

const paymentStatToneClassNames = {
  default: "text-[#f1f3fc]",
  purple: "text-[#a78bfa]",
  blue: "text-[#60a5fa]",
  green: "text-[#4ade80]",
} as const;

const timelineTrackClassNames = {
  completed: "bg-[#22c55e]",
  current: "bg-[#6d5dfc]",
  upcoming: "bg-[#2a2d42]",
} as const;

export function TrackingDetailsSection({
  paymentSummary,
  requiredAction,
  agreementTimeline,
}: TrackingDetailsSectionProps) {
  return (
    <section
      className="space-y-0 overflow-hidden rounded-2xl text-start"
      aria-label="تفاصيل متابعة الاتفاق"
    >
      <PaymentSummaryPanel summary={paymentSummary} />
      <RequiredActionPanel action={requiredAction} />
      <AgreementTimelinePanel timeline={agreementTimeline} />
    </section>
  );
}

function PaymentSummaryPanel({
  summary,
}: {
  summary: PortalTrackingPaymentSummary;
}) {
  return (
    <article className="rounded-t-2xl border border-white/[0.07] bg-[#131627] p-5 sm:p-6">
      <PanelHeader
        title={summary.title}
        description={summary.description}
        icon={<CircleDollarSign className="size-[15px] text-[#4ade80]" />}
      />

      <dl className="mt-7 grid gap-5 sm:gap-0">
        {summary.stats.map((stat) => (
          <PaymentStatRow key={stat.label} stat={stat} />
        ))}
      </dl>

      <p className="mt-8 flex items-start gap-2 text-base leading-6 text-[#f1f3fc]">
        <Clock3 className="mt-1 size-3 shrink-0 text-[#fbbf24]" aria-hidden="true" />
        <span>{summary.note}</span>
      </p>
    </article>
  );
}

function PaymentStatRow({ stat }: { stat: PortalTrackingPaymentStat }) {
  return (
    <div className="grid gap-0.5 text-base leading-6 sm:min-h-[72px]">
      <dt className="text-[#f1f3fc]">{stat.label}</dt>
      <dd className={cn("font-medium", paymentStatToneClassNames[stat.tone])}>
        {stat.value}
      </dd>
      <dd className="text-[#f1f3fc]">{stat.description}</dd>
    </div>
  );
}

function RequiredActionPanel({
  action,
}: {
  action: PortalTrackingRequiredAction;
}) {
  return (
    <article className="-mt-px border border-white/[0.07] bg-[#131627] p-5 sm:p-6">
      <PanelHeader
        title={action.title}
        icon={<AlertTriangle className="size-[15px] text-[#fbbf24]" />}
      />

      <div className="mt-7 space-y-5 text-base leading-6 text-[#f1f3fc]">
        <div className="space-y-0.5">
          <Clock3 className="size-[22px] text-[#fbbf24]" aria-hidden="true" />
          <h3>{action.heading}</h3>
          <p>{action.description}</p>
          <p className="flex flex-wrap gap-x-6 gap-y-1">
            <span className="flex items-center gap-2">
              <Clock3 className="size-2.5 text-[#fbbf24]" aria-hidden="true" />
              {action.status}
            </span>
            <span>{action.expectation}</span>
          </p>
        </div>

        <p>{action.note}</p>

        <div className="flex flex-wrap gap-x-4 gap-y-2">
          {action.actions.map((item) => (
            <Button
              key={item}
              type="button"
              variant="ghost"
              className="h-6 rounded-none px-0 text-base font-medium text-[#f1f3fc] hover:bg-transparent hover:text-white"
            >
              {item}
            </Button>
          ))}
        </div>
      </div>
    </article>
  );
}

function AgreementTimelinePanel({
  timeline,
}: {
  timeline: PortalTrackingTimeline;
}) {
  return (
    <article className="-mt-px rounded-b-2xl border border-white/[0.07] bg-[#131627] p-5 sm:p-6">
      <PanelHeader
        title={timeline.title}
        description={timeline.description}
        icon={<Layers3 className="size-[15px] text-[#a78bfa]" />}
      />

      <ol className="mt-8 space-y-0">
        {timeline.steps.map((step) => (
          <TimelineStepItem key={`${step.title}-${step.description}`} step={step} />
        ))}
      </ol>
    </article>
  );
}

function TimelineStepItem({ step }: { step: PortalTrackingTimelineStep }) {
  const isCompleted = step.state === "completed";

  return (
    <li className="grid gap-3 text-base leading-6 text-[#f1f3fc]">
      <div
        className={cn(
          "relative flex h-[13px] items-center justify-end",
          step.state === "upcoming" && "h-[3px]",
        )}
      >
        <span
          className={cn(
            "block h-[3px] flex-1",
            isCompleted && "h-[13px]",
            timelineTrackClassNames[step.state],
          )}
        />
        {isCompleted ? (
          <CheckCircle2
            className="absolute me-0 size-3 text-white"
            aria-hidden="true"
          />
        ) : null}
      </div>

      <div className={cn("pb-6", step.state === "current" && "pb-5")}>
        <h3>{step.title}</h3>
        {step.time ? <p>{step.time}</p> : null}
        <p>{step.description}</p>
        {step.status ? <p>{step.status}</p> : null}
      </div>
    </li>
  );
}

function PanelHeader({
  title,
  description,
  icon,
}: {
  title: string;
  description?: string;
  icon: React.ReactNode;
}) {
  return (
    <header>
      <div className="flex items-center justify-start gap-2">
        <h2 className="text-[15px] font-extrabold leading-[1.5] text-white">
          {title}
        </h2>
        <span aria-hidden="true">{icon}</span>
      </div>
      {description ? (
        <p className="mt-3.5 text-xs leading-[1.6] text-[#7f86a8]">
          {description}
        </p>
      ) : null}
    </header>
  );
}
