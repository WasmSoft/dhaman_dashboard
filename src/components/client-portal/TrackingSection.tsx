import { Copy, Eye } from "lucide-react";

import { Button } from "@/components/shared";
import { clientPortalContent } from "@/constants";
import { cn } from "@/lib/utils";

const statusToneClassNames = {
  purple: "text-[#a78bfa]",
  amber: "text-[#fbbf24]",
} as const;

export function TrackingSection() {
  const { tracking } = clientPortalContent;
  const { activeProject } = tracking;

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[#0d0f1a] px-4 py-8 text-[#f1f3fc] sm:px-6 sm:py-10"
      aria-labelledby="tracking-title"
    >
      <section className="mx-auto w-full max-w-[992px]">
        <div className="text-center">
          <h1
            id="tracking-title"
            className="text-[26px] font-black leading-[1.5] tracking-normal text-white"
          >
            {tracking.title}
          </h1>
          <p className="mt-1.5 text-[13px] leading-[1.5] text-[#7f86a8]">
            {tracking.description}
          </p>
        </div>

        <div className="mt-16 space-y-14 sm:mt-[74px] sm:space-y-16">
          <div className="space-y-5 text-start">
            <div className="grid gap-6 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
              <div className="space-y-2.5 sm:order-2 sm:text-start">
                <p className="text-base leading-6">{activeProject.eyebrow}</p>
                <h2 className="text-xl font-medium leading-[1.5]">
                  {activeProject.title}
                </h2>
                <p className="text-base leading-6">
                  الفريلانسر {activeProject.freelancer} · العميل{" "}
                  {activeProject.client}
                </p>
              </div>

              <dl className="space-y-1 sm:order-1 sm:min-w-32 sm:text-start">
                <div>
                  <dt className="sr-only">{activeProject.totalLabel}</dt>
                  <dd className="text-base leading-6">{activeProject.total}</dd>
                </div>
                <div>
                  <dt className="text-base leading-6">
                    {activeProject.totalLabel}
                  </dt>
                </div>
                <div>
                  <dd className="text-base leading-6">
                    {activeProject.stagesLabel}
                  </dd>
                </div>
              </dl>
            </div>

            <div className="flex flex-wrap justify-start gap-1.5 sm:justify-end">
              {activeProject.badges.map((badge) => (
                <span
                  key={badge.label}
                  className={cn(
                    "inline-flex min-h-6 items-center rounded-full border px-2.5 text-[11px] font-bold leading-none",
                    badge.className,
                  )}
                >
                  {badge.label}
                </span>
              ))}
            </div>

            <div className="space-y-1.5">
              <p className="text-base leading-6">
                {activeProject.progressLabel}
                {activeProject.progressValue}
              </p>
              <div className="flex flex-wrap gap-x-1 text-base leading-6">
                {activeProject.stageLabels.map((stage) => (
                  <span key={stage}>{stage}</span>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
              <Button
                variant="outline"
                className="h-[38px] rounded-[10px] border-white/10 bg-[#1a1d2e] px-4 text-xs font-bold text-[#b8bdd8] hover:bg-[#20243a] hover:text-white sm:min-w-[169px]"
              >
                <Eye className="size-[13px]" aria-hidden="true" />
                {activeProject.primaryAction}
              </Button>
              <Button
                variant="outline"
                className="h-[38px] rounded-[10px] border-white/[0.07] bg-transparent px-4 text-xs font-bold text-[#7f86a8] hover:bg-white/[0.03] hover:text-[#b8bdd8] sm:min-w-[143px]"
              >
                <Copy className="size-[13px]" aria-hidden="true" />
                {activeProject.secondaryAction}
              </Button>
            </div>
          </div>

          <div className="grid gap-10 pt-14 sm:gap-12 sm:pt-20">
            {tracking.statusRows.map((row) => (
              <p key={row.label} className="text-start text-base leading-6">
                {row.label}
                <span
                  className={cn(
                    "me-2 font-bold",
                    statusToneClassNames[row.tone],
                  )}
                >
                  {row.value}
                </span>
              </p>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
