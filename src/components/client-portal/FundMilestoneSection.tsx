import { ArrowRight, FileText, Info, LockKeyhole } from "lucide-react";

import { Button } from "@/components/shared/button";
import { FundMilestoneDetailsSection } from "@/components/client-portal/FundMilestoneDetailsSection";
import { clientPortalContent } from "@/constants";
import { cn } from "@/lib/utils";
import type { PortalFundMilestoneAction } from "@/types";
import { FundMileStoneOutcomeSection } from "./FundMilestoneOutcomeSection";

const actionIcons = {
  lock: LockKeyhole,
  arrow: ArrowRight,
  file: FileText,
} as const;

const actionClassNames: Record<PortalFundMilestoneAction["variant"], string> = {
  primary:
    "border-transparent bg-gradient-to-br from-[#6d5dfc] to-[#7c6cff] text-white shadow-[0_4px_14px_rgba(109,93,252,0.4)] hover:opacity-95",
  secondary:
    "border-white/[0.12] bg-[#1a1d2e] text-[#b8bdd8] hover:bg-[#20243a] hover:text-white",
  ghost:
    "border-white/[0.07] bg-transparent text-[#7f86a8] hover:bg-white/[0.04] hover:text-[#b8bdd8]",
};

export function FundMilestoneSection() {
  const { fundMilestone } = clientPortalContent;

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[#0d0f1a] px-4 py-8 text-white sm:px-6 lg:px-8"
      aria-labelledby="fund-milestone-title"
    >
      <section className="mx-auto w-full max-w-[992px]">
        <div className="text-center">
          <h1
            id="fund-milestone-title"
            className="text-[26px] font-black leading-[39px]"
          >
            {fundMilestone.title}
          </h1>
          <p className="mt-1.5 text-[13px] leading-[19.5px] text-[#7f86a8]">
            {fundMilestone.description}
          </p>
        </div>

        <div className="relative mt-6 overflow-hidden rounded-[18px] border border-[#6d5dfc]/25 bg-[linear-gradient(164deg,#12102a_0%,#1a1440_50%,#0f1222_100%)] px-5 py-6 sm:px-7 lg:min-h-[290px]">
          
          <p className="relative z-10 text-start text-[10px] uppercase leading-[15px] tracking-[0.6px] text-[#7f86a8]">
            {fundMilestone.eyebrow}
          </p>

          <div className="relative z-10 mt-5 grid gap-6 lg:grid-cols-[minmax(0,1fr)_181px] lg:items-start">
            <div className="order-2 text-start lg:order-1 lg:pt-2">
              <h2 className="text-[19px] font-black leading-[28.5px] text-white">
                {fundMilestone.milestone.title}
              </h2>
              <p className="mt-3 text-xs leading-[18px] text-[#7f86a8]">
                {fundMilestone.milestone.meta}
              </p>

              <div className="mt-4 flex flex-wrap items-center justify-start gap-1.5">
                {fundMilestone.badges.map((badge) => (
                  <span
                    key={badge.label}
                    className={cn(
                      "inline-flex min-h-6 items-center rounded-full border px-3 py-1 text-[11px] font-bold leading-none",
                      badge.className,
                    )}
                  >
                    {badge.label}
                  </span>
                ))}
              </div>

              <div className="mt-12 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap lg:mt-[49px]">
                {fundMilestone.actions.map((action) => {
                  const Icon = actionIcons[action.icon];

                  return (
                    <Button
                      key={action.label}
                      type="button"
                      variant="outline"
                      className={cn(
                        "h-[37.6px] justify-center gap-2 rounded-[10px] px-5 text-xs font-bold",
                        action.variant === "primary" &&
                          "h-[47px] min-w-[180px] rounded-[11px] text-sm font-black",
                        action.variant === "secondary" && "min-w-[157px]",
                        action.variant === "ghost" && "min-w-[120px]",
                        actionClassNames[action.variant],
                      )}
                    >
                      <Icon
                        className={cn(
                          "size-3",
                          action.variant === "primary" && "size-3.5",
                        )}
                        aria-hidden="true"
                      />
                      {action.label}
                    </Button>
                  );
                })}
              </div>
            </div>

            <div className="order-1 mx-auto flex w-full max-w-[181px] flex-col items-center gap-2.5 lg:order-2">
              <article className="w-[125px] rounded-2xl border border-[#6d5dfc]/25 bg-[#6d5dfc]/10 px-7 pb-5 pt-4 text-center">
                <p className="text-[32px] font-black leading-[48px] text-[#a78bfa]">
                  {fundMilestone.milestone.amount}
                </p>
                <p className="text-[10px] leading-[15px] text-[#7f86a8]">
                  {fundMilestone.milestone.amountLabel}
                </p>
              </article>

              <div className="flex h-[28.1px] w-full items-center justify-center gap-2">
                <span className="inline-flex h-full min-w-0 flex-1 items-center justify-center rounded-lg border border-amber-400/20 bg-amber-400/10 px-2.5 text-[11px] font-extrabold text-[#fbbf24] text-nowrap">
                  {fundMilestone.milestone.currentStatus}
                </span>
                
                <span className="text-sm leading-[21px] text-[#7f86a8]">←</span>
                <span className="inline-flex h-full items-center rounded-lg border border-[#6d5dfc]/30 bg-[#6d5dfc]/15 px-2.5 text-[11px] font-extrabold text-[#a78bfa]">
                  {fundMilestone.milestone.nextStatus}
                </span>
                
              </div>
            </div>
          </div>

          <p className="relative z-10 mt-4 flex items-start gap-1.5 text-[11px] leading-[16.5px] text-[#7f86a8] lg:justify-start">
            <Info className="mt-0.5 size-3 shrink-0" aria-hidden="true" />
            <span>{fundMilestone.notice}</span>
          </p>
        </div>

        <FundMilestoneDetailsSection details={fundMilestone.details} />
        <FundMileStoneOutcomeSection outcome={fundMilestone.fundOutcome}/>
      </section>
    </main>
  );
}
