import {
  CheckCircle2,
  CircleHelp,
  Clock3,
  Copy,
  Eye,
  FileText,
  LockKeyhole,
  ShieldCheck,
  Zap,
} from "lucide-react";
import type { ReactNode } from "react";

import { Button } from "@/components/shared";
import { cn } from "@/lib/utils";
import type { PortalTrackingFinalSummary, PortalTrackingFooter } from "@/types";

interface TrackingFinalSectionProps {
  finalSummary: PortalTrackingFinalSummary;
  footer: PortalTrackingFooter;
}

const actionIcons = {
  eye: Eye,
  copy: Copy,
  help: CircleHelp,
  review: CheckCircle2,
} as const;

const actionClassNames = {
  primary:
    "border-white/10 bg-[#1a1d2e] text-[#b8bdd8] hover:bg-[#20243a] hover:text-white",
  secondary:
    "border-white/[0.07] bg-transparent text-[#7f86a8] hover:bg-white/[0.03] hover:text-[#b8bdd8]",
  ghost:
    "border-transparent bg-transparent text-[#f1f3fc] hover:bg-transparent hover:text-white disabled:opacity-100",
} as const;

export function TrackingFinalSection({
  finalSummary,
  footer,
}: TrackingFinalSectionProps) {
  return (
    <section className="space-y-5 text-start" aria-label="ملخص متابعة الاتفاق">
      <div className="overflow-hidden rounded-2xl">
        <AgreementSummaryPanel summary={finalSummary.agreement} />
        <NextStepPanel nextStep={finalSummary.nextStep} />
        <AvailableActionsPanel actions={finalSummary.actions} />
        <SecurityPanel security={finalSummary.security} />
      </div>

      <TrackingFooter footer={footer} />
    </section>
  );
}

function AgreementSummaryPanel({
  summary,
}: {
  summary: PortalTrackingFinalSummary["agreement"];
}) {
  return (
    <article className="rounded-t-2xl border border-white/[0.07] bg-[#131627] p-5 sm:p-6">
      <PanelTitle
        title={summary.title}
        icon={<FileText className="size-[13px] text-[#a78bfa]" />}
      />

      <dl className="mt-4 space-y-1 text-base leading-6">
        {summary.rows.map((row) => (
          <div key={row.label} className="flex flex-wrap justify-start gap-x-1">
            <dt className="text-[#f1f3fc]">{row.label}</dt>
            <dd
              className={cn(
                "text-[#b8bdd8]",
                row.tone === "green" && "text-[#4ade80]",
              )}
            >
              {row.value}
            </dd>
          </div>
        ))}
      </dl>
    </article>
  );
}

function NextStepPanel({
  nextStep,
}: {
  nextStep: PortalTrackingFinalSummary["nextStep"];
}) {
  return (
    <article className="-mt-px border border-white/[0.07] bg-[#131627] p-5 sm:p-6">
      <PanelTitle
        title={nextStep.title}
        icon={<Zap className="size-[13px] text-[#fbbf24]" />}
      />

      <div className="mt-5 space-y-4 text-base leading-6 text-[#f1f3fc]">
        <div className="space-y-1">
          <Clock3 className="size-4 text-[#fbbf24]" aria-hidden="true" />
          <p>{nextStep.description}</p>
          <p className="flex items-center gap-1.5">
            <Clock3 className="size-2.5 text-[#7f86a8]" aria-hidden="true" />
            {nextStep.expectation}
          </p>
        </div>
        <p className="flex items-center gap-1.5">
          <CheckCircle2 className="size-2.5 text-[#7f86a8]" aria-hidden="true" />
          {nextStep.note}
        </p>
      </div>
    </article>
  );
}

function AvailableActionsPanel({
  actions,
}: {
  actions: PortalTrackingFinalSummary["actions"];
}) {
  return (
    <article className="-mt-px border border-white/[0.07] bg-[#131627] p-5 sm:p-6">
      <PanelTitle
        title={actions.title}
        icon={<CircleHelp className="size-[13px] text-[#60a5fa]" />}
      />

      <div className="mt-4 space-y-0">
        {actions.items.map((item) => {
          const Icon = actionIcons[item.icon];

          return (
            <Button
              key={item.label}
              type="button"
              variant="outline"
              disabled={item.disabled}
              className={cn(
                "h-[38px] w-full rounded-[10px] border px-4 text-xs font-bold",
                "disabled:pointer-events-none",
                item.variant === "ghost" && "mt-1 h-9 justify-start text-base font-medium",
                actionClassNames[item.variant],
              )}
            >
              <Icon className="size-3" aria-hidden="true" />
              {item.label}
            </Button>
          );
        })}
      </div>
    </article>
  );
}

function SecurityPanel({
  security,
}: {
  security: PortalTrackingFinalSummary["security"];
}) {
  return (
    <article className="-mt-px rounded-b-2xl border border-white/[0.07] bg-[#131627] p-5 sm:p-6">
      <PanelTitle
        title={security.title}
        titleClassName="text-[#4ade80]"
        icon={<LockKeyhole className="size-[13px] text-[#4ade80]" />}
      />

      <p className="mt-4 text-base leading-6 text-[#f1f3fc]">
        {security.description}
      </p>
      <p className="mt-3 flex items-center gap-1.5 text-base leading-6 text-[#f1f3fc]">
        <LockKeyhole className="size-2.5 text-[#7f86a8]" aria-hidden="true" />
        {security.tokenLabel}
      </p>
    </article>
  );
}

function TrackingFooter({ footer }: { footer: PortalTrackingFooter }) {
  return (
    <footer className="space-y-3">
      <div className="flex flex-col gap-3 rounded-[14px] border border-[#22c55e]/15 bg-[#22c55e]/[0.05] p-5 sm:flex-row sm:items-start sm:justify-between sm:p-6">
        <div className="space-y-1.5">
          <h2 className="text-[13px] font-extrabold leading-[1.5] text-[#4ade80]">
            {footer.notice.title}
          </h2>
          <p className="text-xs leading-[1.6] text-[#b8bdd8]">
            {footer.notice.description}
          </p>
          <p className="text-[11px] leading-[1.5] text-[#7f86a8]">
            {footer.notice.disclaimer}
          </p>
        </div>
        <ShieldCheck
          className="size-[18px] shrink-0 text-[#4ade80] sm:order-first"
          aria-hidden="true"
        />
      </div>

      <nav
        className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[11px] leading-[1.5] text-[#7f86a8]"
        aria-label="روابط التذييل"
      >
        {footer.links.map((link) => (
          <a key={link} href="#" className="hover:text-[#b8bdd8]">
            {link}
          </a>
        ))}
        <span aria-hidden="true">·</span>
        <span>{footer.copyright}</span>
      </nav>
    </footer>
  );
}

function PanelTitle({
  title,
  icon,
  titleClassName,
}: {
  title: string;
  icon: ReactNode;
  titleClassName?: string;
}) {
  return (
    <header className="flex items-center justify-start gap-2">
      <h2
        className={cn(
          "text-[13px] font-extrabold leading-[1.5] text-white",
          titleClassName,
        )}
      >
        {title}
      </h2>
      <span aria-hidden="true">{icon}</span>
    </header>
  );
}
