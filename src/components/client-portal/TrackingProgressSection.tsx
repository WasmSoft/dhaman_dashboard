"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import {
  AlertTriangle,
  Bot,
  CheckCircle2,
  ChevronDown,
  Clock3,
  FileText,
  GitPullRequestArrow,
  Layers3,
  Scale,
  ShieldCheck,
  XCircle,
} from "lucide-react";

import {
  Button,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/shared";
import { cn } from "@/lib/utils";
import type {
  PortalTrackingDisputeStep,
  PortalTrackingMilestone,
  PortalTrackingPolicy,
  PortalTrackingProgressDetails,
} from "@/types";

interface TrackingProgressSectionProps {
  progressDetails: PortalTrackingProgressDetails;
}

const policyToneClassNames = {
  warning: "text-[#fbbf24]",
  danger: "text-[#f87171]",
  blue: "text-[#60a5fa]",
  purple: "text-[#a78bfa]",
} as const;

const policyIcons = {
  warning: AlertTriangle,
  danger: XCircle,
  blue: GitPullRequestArrow,
  purple: Scale,
} as const;

const disputeStepClassNames = {
  danger: "bg-red-500/20 text-[#f87171]",
  purple: "bg-[#6d5dfc]/20 text-[#a78bfa]",
  blue: "bg-blue-500/20 text-[#60a5fa]",
  green: "bg-emerald-500/20 text-[#4ade80]",
} as const;

export function TrackingProgressSection({
  progressDetails,
}: TrackingProgressSectionProps) {
  const defaultOpenMilestone =
    progressDetails.milestones.items.find((milestone) => milestone.defaultOpen)
      ?.order ?? progressDetails.milestones.items[0]?.order;
  const [openMilestone, setOpenMilestone] = useState<number | undefined>(
    defaultOpenMilestone,
  );

  return (
    <section
      className="overflow-hidden rounded-2xl text-start"
      aria-label="تفاصيل مراحل وسياسات الاتفاق"
    >
      <MilestonesPanel
        milestones={progressDetails.milestones.items}
        title={progressDetails.milestones.title}
        description={progressDetails.milestones.description}
        openMilestone={openMilestone}
        onOpenMilestoneChange={setOpenMilestone}
      />
      <PoliciesPanel
        title={progressDetails.policies.title}
        description={progressDetails.policies.description}
        actionLabel={progressDetails.policies.actionLabel}
        policies={progressDetails.policies.items}
      />
      <DisputePanel
        title={progressDetails.dispute.title}
        description={progressDetails.dispute.description}
        steps={progressDetails.dispute.steps}
      />
    </section>
  );
}

function MilestonesPanel({
  title,
  description,
  milestones,
  openMilestone,
  onOpenMilestoneChange,
}: {
  title: string;
  description: string;
  milestones: PortalTrackingMilestone[];
  openMilestone?: number;
  onOpenMilestoneChange: (order?: number) => void;
}) {
  return (
    <article className="rounded-t-2xl border border-white/[0.07] bg-[#131627] p-5 sm:p-6">
      <PanelHeader
        title={title}
        description={description}
        icon={<Layers3 className="size-[15px] text-[#60a5fa]" />}
      />

      <div className="mt-4 overflow-hidden rounded-[10px] border border-white/[0.05]">
        {milestones.map((milestone) => {
          const isOpen = openMilestone === milestone.order;

          return (
            <Collapsible
              key={milestone.order}
              open={isOpen}
              onOpenChange={(nextOpen) =>
                onOpenMilestoneChange(nextOpen ? milestone.order : undefined)
              }
              className="border-t border-white/[0.06] first:border-t-0"
            >
              <CollapsibleTrigger className="group flex w-full items-start gap-3 bg-[#151827] px-3 py-3 text-start outline-none transition-colors hover:bg-[#191d31] focus-visible:ring-2 focus-visible:ring-[#6d5dfc]/60 sm:px-4">
                <span className="min-w-4 text-base leading-6 text-[#7f86a8]">
                  {milestone.order}
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="text-base leading-6 text-[#f1f3fc]">
                    {milestone.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-base leading-6 text-[#b8bdd8]">
                    <span>{milestone.status}</span>
                    <span className="text-[#7f86a8]">{milestone.escrowStatus}</span>
                    <span>{milestone.amount}</span>
                  </div>
                  <p className="mt-1 flex items-center gap-1.5 text-base leading-6 text-[#b8bdd8]">
                    <Clock3
                      className="size-2.5 shrink-0 text-[#7f86a8]"
                      aria-hidden="true"
                    />
                    <span>{milestone.dueLabel}</span>
                  </p>
                </div>
                <span className="mt-[76px] flex size-7 shrink-0 items-center justify-center rounded-lg border border-white/[0.07] bg-[#171a2d] text-[#7f86a8] transition-colors group-hover:text-white sm:mt-[74px]">
                  <ChevronDown
                    className={cn(
                      "size-[13px] transition-transform duration-300",
                      isOpen && "rotate-180",
                    )}
                    aria-hidden="true"
                  />
                </span>
              </CollapsibleTrigger>

              <CollapsibleContent
                forceMount
                className="grid overflow-hidden bg-[#151827] opacity-100 transition-[grid-template-rows,opacity] duration-300 ease-out data-[state=closed]:grid-rows-[0fr] data-[state=closed]:opacity-0 data-[state=open]:grid-rows-[1fr]"
              >
                <MilestoneDetails milestone={milestone} />
              </CollapsibleContent>
            </Collapsible>
          );
        })}
      </div>
    </article>
  );
}

function MilestoneDetails({ milestone }: { milestone: PortalTrackingMilestone }) {
  if (!milestone.deliveryLabel && !milestone.acceptanceCriteria?.length) {
    return <div className="min-h-0 overflow-hidden" />;
  }

  return (
    <div className="min-h-0 overflow-hidden">
      <div className="px-3 pb-4 pt-3 sm:px-4">
        {milestone.deliveryLabel || milestone.deliveryStatus ? (
          <dl className="space-y-0 text-base leading-6 text-[#f1f3fc]">
            {milestone.deliveryLabel ? <dt>{milestone.deliveryLabel}</dt> : null}
            {milestone.deliveryStatus ? <dd>{milestone.deliveryStatus}</dd> : null}
          </dl>
        ) : null}

        {milestone.acceptanceTitle ? (
          <h4 className="mt-3 text-base leading-6 text-[#f1f3fc]">
            {milestone.acceptanceTitle}
          </h4>
        ) : null}

        {milestone.acceptanceCriteria?.length ? (
          <ul className="mt-1 space-y-1.5">
            {milestone.acceptanceCriteria.map((criterion) => (
              <li
                key={criterion}
                className="flex items-start gap-2 text-base leading-6 text-[#b8bdd8]"
              >
                <CheckCircle2
                  className="mt-1 size-3 shrink-0 text-[#4ade80]"
                  aria-hidden="true"
                />
                <span>{criterion}</span>
              </li>
            ))}
          </ul>
        ) : null}

        {milestone.revisionPrefix ? (
          <p className="mt-4 bg-white/[0.04] px-3 py-1 text-base leading-6 text-[#b8bdd8]">
            {milestone.revisionPrefix}
            {milestone.revisionHighlight ? (
              <strong className="font-bold text-[#a78bfa]">
                {milestone.revisionHighlight}
              </strong>
            ) : null}
            {milestone.revisionSuffix}
          </p>
        ) : null}
      </div>
    </div>
  );
}

function PoliciesPanel({
  title,
  description,
  actionLabel,
  policies,
}: {
  title: string;
  description: string;
  actionLabel: string;
  policies: PortalTrackingPolicy[];
}) {
  return (
    <article className="-mt-px border border-white/[0.07] bg-[#131627] p-5 sm:p-6">
      <PanelHeader
        title={title}
        description={description}
        icon={<ShieldCheck className="size-[15px] text-[#60a5fa]" />}
      />

      <div className="mt-5 space-y-4">
        {policies.map((policy) => (
          <PolicyRow key={policy.title} policy={policy} />
        ))}
      </div>

      <Button
        type="button"
        variant="ghost"
        className="mt-5 h-9 rounded-none px-0 text-base font-medium text-[#f1f3fc] hover:bg-transparent hover:text-white"
      >
        <FileText className="size-3 text-[#60a5fa]" aria-hidden="true" />
        {actionLabel}
      </Button>
    </article>
  );
}

function PolicyRow({ policy }: { policy: PortalTrackingPolicy }) {
  const Icon = policyIcons[policy.tone];

  return (
    <article className="grid gap-1 text-base leading-6 text-[#f1f3fc]">
      <Icon
        className={cn("size-3", policyToneClassNames[policy.tone])}
        aria-hidden="true"
      />
      <div>
        <h3>{policy.title}</h3>
        <p>{policy.description}</p>
      </div>
    </article>
  );
}

function DisputePanel({
  title,
  description,
  steps,
}: {
  title: string;
  description: string;
  steps: PortalTrackingDisputeStep[];
}) {
  return (
    <article className="-mt-px rounded-b-2xl border border-white/[0.07] bg-[#131627] p-5 sm:p-6">
      <PanelHeader
        title={title}
        description={description}
        icon={<Bot className="size-[15px] text-[#a78bfa]" />}
      />

      <ol className="mt-5 space-y-2">
        {steps.map((step, index) => (
          <li key={step.order}>
            <div
              className={cn(
                "grid min-h-[31px] grid-cols-[2rem_minmax(0,1fr)] items-center gap-2 px-3 text-base leading-6",
                disputeStepClassNames[step.tone],
              )}
            >
              <span className="font-medium">{step.order}</span>
              <span>{step.label}</span>
            </div>
            {index < steps.length - 1 ? (
              <div className="px-3 text-base leading-6 text-[#b8bdd8]">←</div>
            ) : null}
          </li>
        ))}
      </ol>
    </article>
  );
}

function PanelHeader({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: ReactNode;
}) {
  return (
    <header>
      <div className="flex items-center justify-start gap-2">
        <h2 className="text-[15px] font-extrabold leading-[1.5] text-white">
          {title}
        </h2>
        <span aria-hidden="true">{icon}</span>
      </div>
      <p className="mt-3.5 text-xs leading-[1.6] text-[#7f86a8]">
        {description}
      </p>
    </header>
  );
}
